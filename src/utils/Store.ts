import EventBus from "./eventBus";

export enum StoreEvents {
    Updated = 'updated',
}

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

		Store._instance = this as Store;

		this.on(
			StoreEvents.Updated, 
			() => { localStorage.setItem(Store.STORE_NAME, JSON.stringify(this._state)); }
		);
	}

	getState() {
		return this._state;
	}

	removeAllState() {
		this._state = {};
		this.emit(StoreEvents.Updated);
	}
	
	removeState(id: string) {
		this._state[id] = {};
		this.emit(StoreEvents.Updated);
	}

	set(id: string, value: any) {
		this._state[id] = value;
		this.emit(StoreEvents.Updated);
		return this;
	}
}
export default new Store();
