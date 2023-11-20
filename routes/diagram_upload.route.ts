import TemplateGenerator from "../PatternTemplates/CodeGenerator";
import { Request, Response } from "express";

const createTemplateRoute = async (req: Request, res: Response) => {
  const classname = req.query.classname;
  const template = req.query.template;

  const projectFolder = `public/${folderID}`;
  const app = new TemplateGenerator();
  await app.makeDirectory(projectFolder);
  await app.createFile(`PatternTemplates/${template}/${template}.ts`, projectFolder + `/${classname}.ts`,`${classname}`);
  await app.zipFolder(`public/${folderID}`,`public/GeneratedProject.zip`, () => 
  res.download(`public/GeneratedProject.zip`, "GeneratedProject.zip", (err: Error) => {
    res.status(200);
    if (err) {
      console.log(err)
      res.status(500).send("Internal Server Error");
    }
    app.deleteFile(projectFolder);
  }))
// app.deleteFile(projectFolder););

  
}
export default createTemplateRoute;
