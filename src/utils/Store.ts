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

		// const savedState = localStorage.getItem(Store.STORE_NAME);
		
		// this._state = savedState ? (JSON.parse(savedState) ?? {}) : {} 

		this._state = {} 

		Store._instance = this as Store;

		this.on(StoreEvents.Updated, () => {
				console.log('Store updated', this._state);
			}
		);

		// this.on(
		// 	StoreEvents.Updated, 
		// 	() => { localStorage.setItem(Store.STORE_NAME, JSON.stringify(this._state)); }
		// );
	}

	getState() {
		return this._state;
	}
    getStateAvatar() {
		return {
			storeUrl: this._state.user ? this._state.user.avatar : '',	
	    }
	}
	getChatTitle() {
		return {
			chat_title: this._state.currentChat ? this._state.currentChat[0].title : '',
	    }
	}
	getUsername() {
		return {
			name: this._state.user ? this._state.user.first_name : ''
	    }
	}
	getStateChats() {
		return {
			chat_title: this._state.currentChat ? this._state.currentChat[0].title : '',
	    }
	}
	getStateUserSettings() {
		return {
			first_name: this._state.user ? this._state.user.first_name : '',
			user_email: this._state.user ? this._state.user.email : '',
			user_login: this._state.user ? this._state.user.login : '',
			user_name: this._state.user ? this._state.user.first_name : '',
			user_surname: this._state.user ? this._state.user.second_name : '',
			user_name_in_chat: this._state.user ? this._state.user.display_name : '',
			user_phone: this._state.user ? this._state.user.phone : '',
	    }
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
