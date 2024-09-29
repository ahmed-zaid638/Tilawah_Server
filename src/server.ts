import express, { Request, Response, json } from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
app.use(json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World from TypeScript!");
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
