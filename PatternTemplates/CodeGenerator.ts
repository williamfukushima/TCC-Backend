import fs from "fs";
import archiver from 'archiver';

class CodeGenerator {
  pascalCaseRegex = /^[A-Z][a-z]+(?:[A-Z][a-z]+)*$/;
  validFileRegex = /[a-zA-Z0-9_]/;
  classRegex = /class (.*?) /g;
  attributesRegionRegex = /(\/\/#region Attributes)/g;
  methodsRegionRegex = /(\/\/#region Methods)/;

  constructor() { }

  makeDirectory(directory:string){
        
    try
    {
      fs.mkdirSync(directory);
    }
    catch(err)
    {
      console.error(`Error creating directory ${directory}: ${err}`);
    }
  }

  createFile(templatePath: string, destinationPath: string, diagramElement:any, diagramElements: any) {
    const fileContent = this.readTemplate(templatePath, diagramElement, diagramElements);

    try
    {
      fs.writeFileSync(destinationPath, fileContent);
      console.log(`Successfully created and wrote to ${destinationPath}`);
    }
    catch(err)
    {
      console.error(`Error writing to ${destinationPath}: ${err}`);
    }
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

  readTemplate(path: string, diagramElement: any, diagramElements: any): string {
    const fileContent = fs.readFileSync(path, "utf-8");
    const lines = fileContent.split("\n");
    var modifiedFileContent = "";

    // Change content to match user specs

    for (const line of lines) {
      var newLine = line;
      {
        // Change class name
        var matches = this.classRegex.exec(line);
        if (matches != null && matches.length > 1) {
          if (matches[1]) {
            newLine = line.replace(matches[1], diagramElement.name);
          }
        }

        // Add attributes
        var matches = this.attributesRegionRegex.exec(line);
        if (matches != null && diagramElement.attributes.length > 0) {
          diagramElement.attributes.forEach((attribute: string) => {
            newLine += "\n" + "    " + this.replaceEncapsulationString(diagramElements[attribute].name) + ";";
          })
        }

        // Add methods
        var matches = this.methodsRegionRegex.exec(line);
        if (matches != null && diagramElement.methods.length > 0) {
          diagramElement.methods.forEach((method: string) => {
            newLine += "\n" + "    " + this.replaceEncapsulationString(diagramElements[method].name) + "(){\n      # Implement This Method\n    };";
          })
        }

        modifiedFileContent += newLine + "\n";

      }
    }
    return modifiedFileContent;
  }

  replaceEncapsulationString(encapsulationString: string)
  {
    return encapsulationString.replace('+', "public").replace('#', "protected").replace('-', "private");
  }

  deleteDir(filepath: string) {
    if (this.validFileRegex.test(filepath)) {
      fs.rm(filepath, {recursive: true}, (err) => {
        console.error(`Error deleting from ${filepath}: ${err}`);
      })
    }
    console.log(`Successfully deleted file ${filepath}`);

    }

  deleteFile(filepath: string) {
    if (this.validFileRegex.test(filepath)) {
      fs.rm(filepath, (err) =>
      {
        console.error(`Error deleting from ${filepath}: ${err}`);
      });
      console.log(`Successfully deleted file ${filepath}`);
    }
  }
}

export default CodeGenerator;
