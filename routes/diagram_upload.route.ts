import FilesystemOperations from "../PatternTemplates/FilesystemOperations";
import { Request, Response } from "express";
import generateUniqueId from 'generate-unique-id';
import JSONDiagramReader from "../PatternTemplates/JSONDiagramReader";

const createTemplateRoute = async (req: Request, res: Response) => {
  const jsonData = req.body;
  const fsOps = new FilesystemOperations();

  if(!fsOps.checkIfExists("public")){
    fsOps.makeDirectory("public");
  }

  const folderID = generateUniqueId();
  const projectFolder = `public/${folderID}/project`;


  const jsonReader = new JSONDiagramReader();
  await jsonReader.generateProjectFiles(jsonData, folderID);

  await fsOps.zipFolder(projectFolder,`public/${folderID}/GeneratedProject.zip`, () => 
  res.download(`public/${folderID}/GeneratedProject.zip`, "GeneratedProject.zip", (err: Error) => {
    res.status(200);
    if (err) {
      console.log(err)
      res.status(500).send("Internal Server Error");
    }
    fsOps.deleteDir(`public/${folderID}`);
  }))
}
export default createTemplateRoute;
