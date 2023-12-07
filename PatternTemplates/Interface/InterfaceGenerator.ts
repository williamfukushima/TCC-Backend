import fs from "fs";


class InterfaceGenerator {
  pascalCaseRegex = /^[A-Z][a-z]+(?:[A-Z][a-z]+)*$/;
  validFileRegex = /[a-zA-Z0-9_]/;
  interfaceRegex = /interface (.*?) /g;
  attributesRegionRegex = /(\/\/#region Attributes)/g;
  methodsRegionRegex = /(\/\/#region Methods)/;
  public static instance: InterfaceGenerator;

  constructor() {
    if(InterfaceGenerator.instance == null)
    {
      InterfaceGenerator.instance = this;
    }
   }

  createFileFromTemplate(diagramElement: any, diagramElements: any): string {
    const fileContent = fs.readFileSync("PatternTemplates/Interface/Interface.ts", "utf-8");
    const lines = fileContent.split("\n");
    var modifiedFileContent = "";

    // Change content to match user specs

    for (const line of lines) {
      var newLine = line;
      {
        // Change class name
        var matches = this.interfaceRegex.exec(line);
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
            newLine += "\n" + "    " + this.replaceEncapsulationString(diagramElements[method].name) + ";";
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
    return encapsulationString.replace('+ ', "").replace('# ', "").replace('- ', "");
  }
//#endregion
}

export default InterfaceGenerator;
