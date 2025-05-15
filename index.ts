import http from "http";
import { router } from "./routes/userRoutes";
import { connectToDatabase } from "./utils/db";

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  await router(req, res);
});

connectToDatabase().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
