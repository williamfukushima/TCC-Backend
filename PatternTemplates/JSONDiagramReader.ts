import fs from "fs";
import archiver from 'archiver';
import CodeGenerator from "./CodeGenerator";
import generateUniqueId from "generate-unique-id";

class JSONDiagramReader {
  pascalCaseRegex = /^[A-Z][a-z]+(?:[A-Z][a-z]+)*$/;
  validFileRegex = /[a-zA-Z0-9_]/;

  constructor() { }

  async generateProjectFiles(jsonFile: any, folderID: string){

    const templateGenerator = new CodeGenerator();
    const projectFolder = `public/${folderID}/project`;

    // Prepare directory for project download
    await templateGenerator.makeDirectory(`public/${folderID}`);
    await templateGenerator.makeDirectory(projectFolder);
    await templateGenerator.makeDirectory(`${projectFolder}/Classes`);
    await templateGenerator.makeDirectory(`${projectFolder}/Interfaces`);
    await templateGenerator.makeDirectory(`${projectFolder}/Enumerations`);

    
    // Read JSON file of Apollon diagram project
    const diagramElements: any = jsonFile.elements;
    const diagramRelationships:any[] = jsonFile.relationships;
    
    // list of classes
    var classesList: any[] = [];


    Object.keys(diagramElements).forEach(async (key: any) => {
      // Search element Relationships

      // Check if is a class
      switch(diagramElements[key].type)
      {
        case "Class":
          classesList.push(diagramElements[key]);
          break;
        case "AbstractClass":
          await templateGenerator.makeDirectory(diagramElements[key].name);
          break;
        case "ClassInterface":
          await templateGenerator.createFile("PatternTemplates/Interface/Interface.ts", `${projectFolder}/Interfaces/${diagramElements[key].name}.ts`, diagramElements[key], diagramElements);
          break;
        case "Enumeration":
          await templateGenerator.createFile("PatternTemplates/Enumeration/Enumeration.ts", `${projectFolder}/Enumerations/${diagramElements[key].name}.ts`, diagramElements[key], diagramElements);
          break;
        case "ClassMethod":
          break;
        case "ClassAttribute":
          break;
        default:
          break;
      }

      classesList.forEach(async element => {
          await templateGenerator.createFile("PatternTemplates/GenericClass/GenericClass.ts", `${projectFolder}/Classes/${element.name}.ts`, element, diagramElements);
      });

    });
  }
}

export default JSONDiagramReader;
