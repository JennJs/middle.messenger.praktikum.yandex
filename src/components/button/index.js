// import Handlebars from 'handlebars';
// import tpl from 'bundle-text:./tpl.hbs';
// import './style.css';
// // У кнопки есть index.js, который экспортирует только нужное
// import Button from "./Button";
// import { render } from "../../utils/renderDOM";

// const button = new Button({
//         className: 'my-class',
//         child: 'Click me',
// });

// // app — это class дива в корне DOM
// render(".root", button);

// // Через секунду контент изменится сам, достаточно обновить пропсы
// setTimeout(() => {
//   button.setProps({
//     className: 'otherClass',
//     child: 'Click me, please',
//   });
// }, 1000);
// console.log(button);



// export default (className, child, type, id, value, clas) => {
	// return Handlebars.compile(tpl)({ className, child, type, id, value, clas });
// }


// import Block from '../../utils/Block';
import Block from '../../modules/block/Block';

import template from './tpl.hbs';
import './style.css';
// console.log(template);
// const buttonProps = {
//   label: '',
//   events: {
//     click: ''
//   }
// }

export class Button extends Block {
  constructor(props) {
    super( 'button', props );
     console.log(props);
  
  }

  render() {

    return this.compile(template,  this.props);
  }
 
}
