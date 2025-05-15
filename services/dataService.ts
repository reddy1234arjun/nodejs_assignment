import { usersCollection, postsCollection, commentsCollection } from "../models/userModel";

export async function insertUserData(users: any[]) {
  await usersCollection().deleteMany({});
  await postsCollection().deleteMany({});
  await commentsCollection().deleteMany({});

  for (const user of users) {
    await usersCollection().insertOne(user);

    for (const post of user.posts) {
      await postsCollection().insertOne({ ...post, userId: user.id });

      for (const comment of post.comments) {
        await commentsCollection().insertOne({ ...comment, postId: post.id });
      }
    }
  }
}



