import fs from "fs";
import path from "path";
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { createServer } from "vite";
import { getApiRouter } from "@next-viz/api";

const __dirname = path
  .dirname(fileURLToPath(import.meta.url))
  .split(path.sep)
  .slice(0, -1)
  .join(path.sep);

export const createViteServer = async (options: any) => {
  const app = express();
  const router = getApiRouter(options);

  app.use(cors());
  app.use(express.static(path.join(__dirname, "client", "public")));

  const viteServer = await createServer({
    configFile: path.resolve(__dirname, "client", "vite.config.ts"),
    root: path.resolve(__dirname, "client"),
    server: {
      middlewareMode: true,
    },
    appType: "custom",
    optimizeDeps: {
      include: ["react", "react-dom", "react/jsx-runtime"],
    },
  });

  app.use(viteServer.middlewares);

  app.get("app/*", (_req, res) => {
    const index = fs.readFileSync(
      path.resolve(__dirname, "client", "public", "index.html"),
      "utf-8"
    );
    res.status(200).set({ "Content-Type": "text/html" }).end(index);
  });

  app.use("/api", router);

  return new Promise((resolve, reject) => {
    const server = app
      .listen(3001, () => {
        resolve(server);
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};
