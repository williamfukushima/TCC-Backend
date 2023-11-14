import express from "express";
import createTemplateRoute from "./routes/template.route";

const runServer = () => {
  const app = express();
  const port = process.env.PORT || 3000;

  // Add endpoints for the server
  app.get("/template", createTemplateRoute);

  // Run app
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

runServer();
