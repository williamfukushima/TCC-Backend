import express from "express";
import createTemplateRoute from "./routes/template.route";
import uploadTestRoute from "./routes/upload_test.route";
import bodyParser from 'body-parser';

const runServer = () => {
  const app = express();
  app.use(bodyParser.json());
  
  const port = process.env.PORT || 3000;

  // Add endpoints for the server
  app.get("/template", createTemplateRoute);
  app.post('/jsontest', uploadTestRoute);

  
  // Run app
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

runServer();
