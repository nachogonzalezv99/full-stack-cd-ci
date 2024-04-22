import { PrismaClient } from "@prisma/client";
import express, { Express, Request, Response, json, urlencoded } from "express";
import cors from "cors";

const app: Express = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());

app.get("/", (req: Request, res: Response) => {
  res.json("Hello from the server!!!");
});

app.get("/users", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json({ users });
});

app.post("/users", async (req: Request, res: Response) => {

  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
    },
  });

  res.json({ message: "Success creating user" });
});

app.listen(process.env.VITE_BACKEND_PORT, () => {
  console.log(`App is listening on port ${process.env.VITE_BACKEND_PORT}`);
});
