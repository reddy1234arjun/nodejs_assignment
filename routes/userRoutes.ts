import { IncomingMessage, ServerResponse } from "http";
import { loadData, deleteAllUsers, deleteUser, getUser, putUser } from "../controllers/userController";

export async function router(req: IncomingMessage, res: ServerResponse) {
  const url = req.url || "";
  const method = req.method || "GET";

  if (method === "GET" && url === "/load") return await loadData(req, res);
  if (method === "DELETE" && url === "/users") return await deleteAllUsers(req, res);
  if (method === "PUT" && url === "/users") return await putUser(req, res);

  const userIdMatch = url.match(/^\/users\/(\d+)$/);
  if (userIdMatch) {
    const userId = userIdMatch[1];
    if (method === "DELETE") return await deleteUser(req, res, userId);
    if (method === "GET") return await getUser(req, res, userId);
  }

  res.writeHead(404);
  res.end("Route not found");
}
