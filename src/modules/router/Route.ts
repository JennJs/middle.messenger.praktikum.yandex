import { SignInForm } from '../../pages/signInForm';
import {isEqualStr} from '../../utils/isEqualStr';
import renderDom from '../../utils/renderDom'

// interface IRoute  {
//   pathname: string,
//   view: HTMLElement,
//   props: Record<string , any>
//   _pathname: string;
//   _blockClass: HTMLElement ;
//   _block: HTMLElement | null;
//   _props: Record<string, any>
// }
// type RouteProps = { 
//   pathname: string,
//   view: HTMLElement,
  // props: Record<string , any>
  // _pathname: string;
  // _blockClass: HTMLElement ;
  // _block: HTMLElement | null;
  // _props: Record<string, any>
// };

export default class Route  {
  _pathname: string;
  _blockClass: HTMLElement ;
  _block: HTMLElement | null;
  _props: Record<string, any>

  constructor(pathname: string, view: HTMLElement, props = {}) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
    // console.log('view from Route:',  this._blockClass);
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      console.log('navigate')
      // this._pathname = pathname;
      this.render();
    }
    console.log('navigate')

  }
  leave() {
    if (this._block) {
      console.log('leave')

      // this._block.hide();
      this._block.getContent().remove()
    }
  }

  match(pathname: string) {
    // console.log('pathname:', pathname)
    // console.log('this._pathname:', this._pathname)

    // if(this.props.withId)
    // return pathname.includes(this._pathname);
  return pathname == this._pathname;

    // return isEqualStr(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block =  this._blockClass;
      // console.log('this._block from render Route', this._block);
      
      renderDom(this._props.rootQuery, this._block);
    //  this._props.rootQuery.append(this._block.getContent());

        return;
    }
    // if (this._block._element.getAttribute('id') === 'signin_form' || this._block._element.getAttribute('id') === 'login_form') {
    //   this._block.getContent().style.display = "block";
    // } else {
      // this._block.show();
    // }
    renderDom(this._props.rootQuery, this._block);
  }
}
