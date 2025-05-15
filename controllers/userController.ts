import { IncomingMessage, ServerResponse } from "http";
import { usersCollection, postsCollection, commentsCollection } from "../models/userModel";
import { insertUserData } from "../services/dataService";
import https from "https";

function fetchJson(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => data += chunk);
      res.on("end", () => resolve(JSON.parse(data)));
    }).on("error", reject);
  });
}

export async function loadData(req: IncomingMessage, res: ServerResponse) {
  try {
    const [users, posts, comments] = await Promise.all([
      fetchJson("https://jsonplaceholder.typicode.com/users"),
      fetchJson("https://jsonplaceholder.typicode.com/posts"),
      fetchJson("https://jsonplaceholder.typicode.com/comments")
    ]);

    const userData = users.slice(0, 10).map((user: any) => ({
      ...user,
      posts: posts.filter((p: any) => p.userId === user.id).map((post: any) => ({
        ...post,
        comments: comments.filter((c: any) => c.postId === post.id)
      }))
    }));

    await insertUserData(userData);
    res.writeHead(200);
    res.end();
  } catch (err) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: "Internal server error" }));
  }
}

export async function deleteAllUsers(req: IncomingMessage, res: ServerResponse) {
  await usersCollection().deleteMany({});
  res.writeHead(200);
  res.end(JSON.stringify({ message: "All users deleted" }));
}

export async function deleteUser(req: IncomingMessage, res: ServerResponse, userId: string) {
  const user = await usersCollection().findOne({ id: parseInt(userId) });
  if (!user) {
    res.writeHead(404);
    res.end("User not found");
    return;
  }
  await usersCollection().deleteOne({ id: parseInt(userId) });
  res.writeHead(200);
  res.end("User deleted");
}

export async function getUser(req: IncomingMessage, res: ServerResponse, userId: string) {
  const user = await usersCollection().findOne({ id: parseInt(userId) });
  if (!user) {
    res.writeHead(404);
    res.end("User not found");
    return;
  }
  const posts = await postsCollection().find({ userId: parseInt(userId) }).toArray();
  for (const post of posts) {
    post.comments = await commentsCollection().find({ postId: post.id }).toArray();
  }
  user.posts = posts;
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(user));
}

export async function putUser(req: IncomingMessage, res: ServerResponse) {
  let body = "";
  req.on("data", chunk => body += chunk);
  req.on("end", async () => {
    const newUser = JSON.parse(body);
    const existing = await usersCollection().findOne({ id: newUser.id });
    if (existing) {
      res.writeHead(409);
      res.end("User already exists");
      return;
    }
    await usersCollection().insertOne({ ...newUser, posts: [] });
    res.writeHead(201, { "Location": `/users/${newUser.id}` });
    res.end("User created");
  });
}
