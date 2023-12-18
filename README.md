# Hephaestus
Code generation server
Final paper project for the Computer Engineering Course at the Polytechnic School of the University of São Paulo.

# Environment vars
This project uses the following environment variables:

| Name                          | Description                         | Default Value                                  |
| ----------------------------- | ------------------------------------| -----------------------------------------------|
|port           | Port used for app lauch            | 3000      |


# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version 18.16.1


# Getting started
- Clone the repository
```
git clone  <git lab template url> <project_name>
```
- Install dependencies
```
cd <project_name>
npm install
```
- Build and run the project
```
npm start
```
  Navigate to `http://localhost:3000`


## Project Structure
The folder structure of this app is explained below:

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **node_modules**         | Contains all  npm dependencies                                                            |
| **PatternTemplates**           | Contains scaffolding packages with templates for classes and customization scripts. |                       
| **PatternTemplates**/FilesystemOperations.ts  | Class for filesystem operations |
| **PatternTemplates**/JSONDiagramReader.ts  | JSON diagram decoder for project generation |
| **routes**           | Contain all express routes. |                       
| **public**      | Folder used to store temporary files |
| main.ts         | Entry point to express app                                                               |
| package.json             | Contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped)   |
| package-lock.json             | Contains locked versions of the packages |
| tsconfig.json            | Config settings for compiling source code only written in TypeScript    |
| webpack.config.js            | Webpack config for compiling code into bundle |