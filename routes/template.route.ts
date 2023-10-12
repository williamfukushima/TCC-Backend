import path from "path";
import TemplateGenerator from "../PatternTemplates/CodeGenerator";

const createTemplateRoute = (req: any, res: any) => {
  const classname = req.query.classname;
  const template = req.query.template;
  const filePath = path.join(__dirname, `${classname}.ts`);

  const app = new TemplateGenerator();
  app.createFile(`PatternTemplates/${template}/${template}.ts`, `public/${classname}.ts`,`${classname}`)
  res.status(200);
  res.send(200, "Successfully created and wrote to ObservableTest.ts");
}
export default createTemplateRoute;
