import FilesystemOperations from "../PatternTemplates/FilesystemOperations";
import { Request, Response } from "express";
import generateUniqueId from 'generate-unique-id';
import JSONDiagramReader from "../PatternTemplates/JSONDiagramReader";

const createTemplateRoute = async (req: Request, res: Response) => {
  const jsonData = req.body;

  const folderID = generateUniqueId();
  const projectFolder = `public/${folderID}/project`;

  const app = new FilesystemOperations();

  const jsonReader = new JSONDiagramReader();
  await jsonReader.generateProjectFiles(jsonData, folderID);

  await app.zipFolder(projectFolder,`public/${folderID}/GeneratedProject.zip`, () => 
  res.download(`public/${folderID}/GeneratedProject.zip`, "GeneratedProject.zip", (err: Error) => {
    res.status(200);
    if (err) {
      console.log(err)
      res.status(500).send("Internal Server Error");
    }
    app.deleteDir(`public/${folderID}`);
  }))
}
export default createTemplateRoute;
