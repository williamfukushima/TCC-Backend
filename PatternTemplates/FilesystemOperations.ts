import fs from "fs";
import archiver from 'archiver';

class FilesystemOperations {
  validFileRegex = /[a-zA-Z0-9_]/;
  public static instance: FilesystemOperations;

  constructor() {
    if(FilesystemOperations.instance == null)
    {
      FilesystemOperations.instance = this;
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
  
//#region Filesystem Utils
  createFile(destinationPath: string, fileContent: string) {
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
  
  checkIfExists(filepath: string) {
    return fs.existsSync(filepath);
    }
  //#endregion
}

export default FilesystemOperations;
