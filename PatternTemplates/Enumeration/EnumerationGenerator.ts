import fs from "fs";
import archiver from 'archiver';
import FilesystemOperations from "../FilesystemOperations";

class EnumerationGenerator {
  pascalCaseRegex = /^[A-Z][a-z]+(?:[A-Z][a-z]+)*$/;
  validFileRegex = /[a-zA-Z0-9_]/;
  enumRegex = /enum (.*?) /g;
  attributesRegionRegex = /(\/\/#region Attributes)/g;
  public static instance: EnumerationGenerator;

  constructor() {
    if(EnumerationGenerator.instance == null)
    {
      EnumerationGenerator.instance = this;
    }
   }

  createFileFromTemplate(diagramElement: any, diagramElements: any): string {
    const fileContent = fs.readFileSync("PatternTemplates/Enumeration/Enumeration.ts", "utf-8");
    const lines = fileContent.split("\n");
    var modifiedFileContent = "";

    // Change content to match user specs

    for (const line of lines) {
      var newLine = line;
      {
        // Change class name
        var matches = this.enumRegex.exec(line);
        if (matches != null && matches.length > 1) {
          if (matches[1]) {
            newLine = line.replace(matches[1], diagramElement.name);
          }
        }

        // Add attributes
        var matches = this.attributesRegionRegex.exec(line);
        if (matches != null && diagramElement.attributes.length > 0) {
          diagramElement.attributes.forEach((attribute: string) => {
            newLine += "\n" + "    " + diagramElements[attribute].name + ",";
          })
        }

        modifiedFileContent += newLine + "\n";

      }
    }
    return modifiedFileContent;
  }

//#region Utils
  replaceEncapsulationString(encapsulationString: string)
  {
    return encapsulationString.replace('+', "public").replace('#', "protected").replace('-', "private");
  }
//#endregion
}

export default EnumerationGenerator;
