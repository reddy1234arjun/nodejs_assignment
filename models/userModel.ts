import { db } from "../utils/db";

export const usersCollection = () => db.collection("users");
export const postsCollection = () => db.collection("posts");
export const commentsCollection = () => db.collection("comments");
