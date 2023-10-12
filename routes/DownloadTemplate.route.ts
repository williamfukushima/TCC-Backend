import path from "path";

const downloadTemplateRoute = (req: any, res: any) => {
  const { filename } = req.params;
  const filenameRegex = /^[^\\/?%*:|"<>\.\ ]+$/;
  const filePath = `public/${filename}.ts`;
  if(filenameRegex.test(filename)){
    res.download(filePath, filename, (err: Error) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      }
    });
  }
  else {
    res.status(500).send("Internal Server Error");
  }
};
export default downloadTemplateRoute;
