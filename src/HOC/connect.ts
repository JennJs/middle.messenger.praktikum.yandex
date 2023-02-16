import Block from "../modules/block/Block";
import store, { StoreEvents } from "../utils/Store";

// export default function connect(Component: typeof Block, mapStateToProps) {
//     // используем class expression
//   return class extends Component {
//     constructor(...args: any) {
//      // не забываем передать все аргументы конструктора
//       super(...args);

//       // подписываемся на событие
//         store.on(StoreEvents.Updated, () => {
//           // вызываем обновление компонента, передав данные из хранилища
//           this.setProps({...store.getState()});
//         });
//     }
//   } 
// }

export default function connect(Component: typeof Block, mapStateToProps) {
	return class extends Component {
		constructor(props = {}) {
			
			// const store = new Store();

			super( {...props, ...mapStateToProps(store.getState()) });
            console.log('mapStateToProps', mapStateToProps);

			store.on(Store.EVENT_UPDATE, () => {
				this.setProps({ ...mapStateToProps(store.getState()) });
			});
		}
	};
}
