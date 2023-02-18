import EventBus from "./eventBus";
import { set } from '../utils/set&merge';

export enum StoreEvents {
    Updated = 'updated',
}

// class Store extends EventBus {
//     private state: Record <string, any> = {};
  
//     public getState() {
//      console.log(this.state);

//       return this.state;
//     }
  
//     public set(path: string, value: unknown) {
//       set(this.state, path, value);

//       this.emit(StoreEvents.Updated);
//     };
// }

// export default new Store();

 class Store extends EventBus {

	static EVENT_UPDATE = 'updated';
	static _instance: Store;
	static STORE_NAME = 'myAppStore';

	_state: Record<string, any> = {};

	constructor() {
		
		if(Store._instance)
			return Store._instance;

		super();

		const savedState = localStorage.getItem(Store.STORE_NAME);
		
		this._state = savedState ? (JSON.parse(savedState) ?? {}) : {} 

		Store._instance = this;

		this.on(
			StoreEvents.Updated, 
			() => { localStorage.setItem(Store.STORE_NAME, JSON.stringify(this._state)); }
		);
	}

	getState() {
		return this._state;
	}

	removeState(id: string) {
		this._state[id] = {};
		// this.emit(Store.EVENT_UPDATE);
		this.emit(StoreEvents.Updated);

	}

	set(id: string, value) {
		this._state[id] = value;
		// this.emit(Store.EVENT_UPDATE);
		this.emit(StoreEvents.Updated);
		return this;
	}
}
export default new Store();
