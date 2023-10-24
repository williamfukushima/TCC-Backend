import fs from "fs";
import path from "path";

class TemplateGenerator {
  pascalCaseRegex = /^[A-Z][a-z]+(?:[A-Z][a-z]+)*$/;
  validFileRegex = /[a-zA-Z0-9_]/;
  classRegex = /(class)/;

  constructor() { }
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
      fs.rm(filepath, (err: any) => {
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
