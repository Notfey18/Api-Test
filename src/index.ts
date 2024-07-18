import express, { Request, Response } from "express";
import { createClient } from "@vercel/postgres";

const client = createClient({
  connectionString:
    "postgres://default:e6cSzRiubk9h@ep-shiny-violet-a4dhk14t.us-east-1.aws.neon.tech:5432/verceldb",
});

client.connect();

const app = express();

const port = 3000;

const server = express.json();

app.use(server);

// Lista dei post
app.get("/posts", function (request: Request, response: Response) {
  client.query(`SELECT * FROM posts`, function (err, res) {
    if (err) return response.status(500).json(err);
    else return response.status(200).json(res.rows);
  });
});

// Dettaglio di un post
app.get("/posts/:idPosts", function (request: Request, response: Response) {
  client.query(
    `SELECT * FROM posts WHERE id = $1`,
    [request.params.idPosts],
    function (err, res) {
      if (err) response.status(500).json({ message: "error" });
      else return response.status(200).json({ message: "success" });
    }
  );
});

// Cancella un post

app.delete("/posts/:idPost", function (request: Request, response: Response) {
  client.query(
    `DELETE FROM posts WHERE id=$1`,
    [request.params.idPost],
    function (err, res) {
      if (err) response.status(500).json({ message: "error" });
      else return response.status(200).json({ message: "success" });
      {
      }
    }
  );
});

// Aggiorna un post
app.put("/posts/:idPost", function (request: Request, response: Response) {
  client.query(
    `UPDATE posts SET title = $1, content = $2 WHERE id = $3`,
    [request.body.title, request.body.content, request.params.idPost],
    function (err, res) {
      if (err) response.status(500).json({ message: "error" });
      else return response.status(200).json({ message: "success" });
    }
  );
});
// Crea un post
app.post("/posts", function (request: Request, response: Response) {
  client.query(
    `INSERT INTO posts (title, content) VALUES($1, $2)`,
    [request.body.title, request.body.content],
    function (err, res) {
      if (err) return response.status(500).json({ message: "error" });
      else return response.status(200).json({ message: "success" });
    }
  );
});

app.listen(port, function () {
  console.log(`Server is running on port http://localhost:${port}`);
});
