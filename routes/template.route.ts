import CodeGenerator from "../PatternTemplates/CodeGenerator";
import { Request, Response } from "express";
import generateUniqueId from 'generate-unique-id';

const createTemplateRoute = async (req: Request, res: Response) => {
  const classname = req.query.classname;
  const template = req.query.template;
  const folderID = generateUniqueId();

  const projectFolder = `public/${folderID}/project`;
  const app = new CodeGenerator();
  await app.makeDirectory(`public/${folderID}`);
  await app.makeDirectory(`public/${folderID}/project`);
  // await app.createFile(`PatternTemplates/${template}/${template}.ts`, projectFolder + `/${classname}.ts`,`${classname}`);
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
