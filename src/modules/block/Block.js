import  EventBus  from "../../utils/eventBus";
import { nanoid } from 'nanoid';

class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: "flow:render"
  };

  id = nanoid(6);
  _element = null;
  _meta ;

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(tagName = "div", propsWithChildren ={}) {
    const eventBus = new EventBus();

    const {props, children} = this._getChildrenAndProps(propsWithChildren);

    this._meta = {
      tagName,
      props
    };
    this.children = children;
    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildrenAndProps(childrenAndProps) {
    const props = {};
    const children = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });
    return {props, children};
  }

  _addEvents() {
    const {events = {}} = this.props;
    
    Object.keys(events).forEach(eventName => {
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  _registerEvents(eventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    // console.log(tagName);
    this._element = this._createDocumentElement(tagName);
  }

  _init() {
    this.init();
    this._createResources();
   
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }
  init() {}

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
   
    Object.values(this.children).forEach(child => child.dispatchComponentDidMount());
  }

  _componentDidUpdate(oldProps, newProps) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps, newProps) {
    return true;
  }

  setProps = nextProps => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }
  
  _render() {
    const fragment = this.render();
    this._element.innerHTML = '';
    this._element.append(fragment);
    this._addEvents();
  }

  render() {
    return new DocumentFragment();
  }

  compile(template, context) {

    const contextAndStubs = { ...context };

    Object.entries(this.children).forEach(([name, component]) => {
      contextAndStubs[name] = `<div data-id="${component.id}"></div>`;

    });

    const html = template(contextAndStubs);

    const temp = document.createElement('template');
    temp.innerHTML = html;

    Object.entries(this.children).forEach(([_, component]) => {
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

      if (!stub) {
        return;
      }

      component.getContent().append(...Array.from(stub.childNodes));
      stub.replaceWith(component.getContent());

    });

    return temp.content;
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props) {
    const self = this;
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = {...target}
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      }
    });
  }

  _createDocumentElement(tagName) {
    return document.createElement(tagName);
  }

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }

  setAttributes(el, attrs) {   
     Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value)); 
  }

}

export default Block;
