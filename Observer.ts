class Observer {
    constructor() {
      this.observers = []
    }
   
    OnEventTriggered(func: Function) {
      this.observers.push(func);
    }
   
    unsubscribe(func) {
      this.observers = this.observers.filter((observer) => observer !== func);
    }
   
    notify(data) {
      this.observers.forEach((observer) => observer(data));
    }
  }