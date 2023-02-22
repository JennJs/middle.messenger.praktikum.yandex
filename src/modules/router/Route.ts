import renderDom from '../../utils/renderDom'



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
