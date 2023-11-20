import fs from "fs";
import archiver from 'archiver';
class TemplateGenerator {
  pascalCaseRegex = /^[A-Z][a-z]+(?:[A-Z][a-z]+)*$/;
  validFileRegex = /[a-zA-Z0-9_]/;
  classRegex = /(class)/;
  
  constructor() { }

  async makeDirectory(projectFolder:string){
    await fs.mkdir(projectFolder,(err) => null);
  }

  async createFile(templatePath: string, destinationPath: string, className: string): Promise<void> {
    const fileContent = this.readTemplate(templatePath, className);

    fs.writeFile(destinationPath, fileContent, (err: any) => {
      if (err) {
        console.error(`Error writing to ${destinationPath}: ${err}`);
      } else {
        console.log(`Successfully created and wrote to ${destinationPath}`);
      }
    });
  }

  async zipFolder(folderPath: string, destinationFile: string, OnClose: Function)
  {
    const sourceFolder = folderPath;
    const zipFilePath = destinationFile;
    
    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver('zip');
    
    output.on('close', () => {
      console.log(`Successfully created ${zipFilePath}`);
      OnClose();
    });
    
    archive.on('error', (err) => {
      throw err;
    });
    
    archive.pipe(output);    
    archive.directory(sourceFolder, false);
    await archive.finalize();
  }
  
  readTemplate(path: string, className: string): string {
    const fileContent = fs.readFileSync(path, "utf-8");
    const lines = fileContent.split("\n");
    var modifiedFileContent = "";

    // Change content to match user specs

    for (const line of lines) {
      var newLine = line;
      {
        // Change class name

        var matches = /class (.*?) /g.exec(line);
        if (matches != null && matches.length > 1) {
          if (matches[1]) {
            newLine = line.replace(matches[1], className);
          }
        }
        modifiedFileContent += newLine + "\n";
      }
    }
    return modifiedFileContent;
  }

  

  deleteFile(filepath: string) {
    if (this.validFileRegex.test(filepath)) {
      fs.rmdir(filepath, { recursive: true }, (err: any) => {
        if (err) {
          console.error(`Error deleting from ${filepath}: ${err}`);
        } else {
          console.log(`Successfully deleted file ${filepath}`);
        }
      })
    }
  }
}

export default TemplateGenerator;
