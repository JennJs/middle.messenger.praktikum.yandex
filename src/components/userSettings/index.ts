import Block, { T }  from '../../modules/block/Block';
import template from './tpl.hbs';
import './style.css';
import store, { StoreEvents } from '../../utils/Store';


export class UserSettings extends Block<T> {
  constructor(props: T) {
    super('div', props);

    store.on(StoreEvents.Updated, () => {
      this.setProps((store as Record<string, any>).getStateUserSettings());
      });
  }

  render() {
    // console.log('UserSettings props>>', this.props)
    return this.compile(template, this.props);
  }
}
