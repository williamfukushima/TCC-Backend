import express from "express";
import createTemplateRoute from "./routes/template.route";
import uploadTestRoute from "./routes/upload_test.route";
import diagramUploadRoute from "./routes/diagram_upload.route";
import bodyParser from 'body-parser';
import cors from 'cors';
import FilesystemOperations from "./PatternTemplates/FilesystemOperations";
import ClassGenerator from "./PatternTemplates/GenericClass/ClassGenerator";
import EnumerationGenerator from "./PatternTemplates/Enumeration/EnumerationGenerator";
import InterfaceGenerator from "./PatternTemplates/Interface/InterfaceGenerator";

new FilesystemOperations();
new ClassGenerator();
new EnumerationGenerator();
new InterfaceGenerator();

const runServer = () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(cors());

  const port = process.env.PORT || 3000;

  // Add endpoints for the server
  app.get("/template", createTemplateRoute);
  app.post('/jsontest', uploadTestRoute);
  app.post('/generate_project', diagramUploadRoute);

  // Run app
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

runServer();


