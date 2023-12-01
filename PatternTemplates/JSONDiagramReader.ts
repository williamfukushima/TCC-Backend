import ClassGenerator from "./GenericClass/ClassGenerator";
import FilesystemOperations from "./FilesystemOperations";
import EnumerationGenerator from "./Enumeration/EnumerationGenerator";
import InterfaceGenerator from "./Interface/InterfaceGenerator";

class JSONDiagramReader {
  pascalCaseRegex = /^[A-Z][a-z]+(?:[A-Z][a-z]+)*$/;
  validFileRegex = /[a-zA-Z0-9_]/;
  
  constructor() { }

  async generateProjectFiles(jsonFile: any, folderID: string){

    const templateGenerator = new FilesystemOperations();
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
    var content: string

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
          content = await InterfaceGenerator.instance.createFileFromTemplate(diagramElements[key], diagramElements);
          await templateGenerator.createFile(`${projectFolder}/Interfaces/${diagramElements[key].name}.ts`, content);
          break;
        case "Enumeration":
          content = await EnumerationGenerator.instance.createFileFromTemplate( diagramElements[key], diagramElements);
          await templateGenerator.createFile(`${projectFolder}/Classes/${diagramElements[key].name}.ts`, content);
          break;
        case "ClassMethod":
          break;
        case "ClassAttribute":
          break;
        default:
          break;
      }
    });

    classesList.forEach(async element => {
      content = await ClassGenerator.instance.createFileFromTemplate(element, diagramElements);
      await templateGenerator.createFile(`${projectFolder}/Classes/${element.name}.ts`, content);
  });
  }
}

export default JSONDiagramReader;
