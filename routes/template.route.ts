import TemplateGenerator from "../PatternTemplates/CodeGenerator";
import { Request, Response } from "express";
import fs from "fs";

import archiver from 'archiver';

const createTemplateRoute = async (req: Request, res: Response) => {
  const classname = req.query.classname;
  const template = req.query.template;
  const filePath = `public/${classname}.ts`;

  const app = new TemplateGenerator();
  await app.createFile(`PatternTemplates/${template}/${template}.ts`, filePath,`${classname}`);

  res.download(filePath, classname + ".ts", (err: Error) => {
      res.status(200);
      if (err) {
        res.status(500).send("Internal Server Error");
      }
    });
  app.deleteFile(filePath);
}
export default createTemplateRoute;
