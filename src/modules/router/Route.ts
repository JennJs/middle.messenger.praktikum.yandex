import renderDom from '../../utils/renderDom'
import Block from '../block/Block';



export  class Route  {
  private _pathname: string;
  private _blockClass: Block<Record<string,any>> ;
  private _block: Block<Record<string,any>> | null;
  private _props: Record<string, any>

  constructor(pathname: string, view: Block<Record<string,any>>, props = {}) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      console.log('navigate')
      this.render();
    }
  }
  leave() {
    if (this._block) {
      (this._block as any).getContent().remove()
    }
  }

  match(pathname: string) {
    return pathname == this._pathname;
  }

  render() {
    if (!this._block) {
      this._block =  this._blockClass;
      renderDom(this._props.rootQuery, this._block);
        return;
    }
    renderDom(this._props.rootQuery, this._block);
  }
}
