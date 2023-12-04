import FilesystemOperations from "../PatternTemplates/FilesystemOperations";
import { Request, Response } from "express";
import generateUniqueId from 'generate-unique-id';

const createTemplateRoute = async (req: Request, res: Response) => {
  const classname = req.query.classname;
  const template = req.query.template;

  const fsOps = new FilesystemOperations();

  const folderID = generateUniqueId();
  if(!fsOps.checkIfExists("public")){
    fsOps.makeDirectory("public");
  }

  const projectFolder = `public/${folderID}/project`;
  await fsOps.makeDirectory(`public/${folderID}`);
  await fsOps.makeDirectory(`public/${folderID}/project`);
  // await fsOps.createFile(`PatternTemplates/${template}/${template}.ts`, projectFolder + `/${classname}.ts`,`${classname}`);
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
