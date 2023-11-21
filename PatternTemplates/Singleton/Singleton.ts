const ws = require("ws");
const https = require('https');

export class Singleton {
  static Instance: Singleton;
  //#region Attributes
  websocketServer: any;
  //#endregion

  constructor() {
    if (Singleton.Instance != null) {
      throw new Error("You can only create one instance!");
    }
    Singleton.Instance = this;


    const server = https.createServer();
    this.websocketServer = new ws.Server({ server })
  }
 
  getInstance() {
    return this;
  }

  //#region Methods
  //#endregion
  
}