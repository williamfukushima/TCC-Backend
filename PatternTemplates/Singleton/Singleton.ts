export class Singleton {
  static Instance: Singleton;

  constructor() {
    if (Singleton.Instance != null) {
      throw new Error("You can only create one instance!");
    }
    Singleton.Instance = this;
  }
 
  getInstance() {
    return this;
  }
}