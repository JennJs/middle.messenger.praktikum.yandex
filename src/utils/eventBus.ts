type Func = () => boolean | void;
interface Listener  {
  [key: string | number]: Array<Func>;
}

export default class EventBus {
  listeners: Listener;
  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: Func): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event: string, callback: Func): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    );
  }

  emit(event: string, ...args: unknown[]): void {
    if (!this.listeners[event]) {
      throw new Event(`Нет события: ${event}`);
    }

    this.listeners[event].forEach((listener) => {
      listener.apply(null,...args);
    });
  }
}
