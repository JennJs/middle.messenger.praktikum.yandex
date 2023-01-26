import  EventBus  from "../../utils/eventBus";
import { nanoid } from 'nanoid';

// Нельзя создавать экземпляр данного класса
class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: "flow:render"
  };

  id = nanoid(6);
  // children = [];
  // props;
  _element = null;
  // _meta = {tagName, props };
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

    // Object.entries(childrenAndProps).forEach(([key, value]) => {
    //   if (Array.isArray(value) && value.length > 0 && value.every(v => v instanceof Block)) {
    //     children[key] = value;
    //   } else if (value instanceof Block) {
    //     children[key] = value;
    //   } else {
    //     props[key] = value;
    //   }
    // });
    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });
    // console.log(props, children);
    return {props, children};
  }

  _addEvents() {
    const {events = {}} = this.props;
    // console.log(this._element);

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
    console.log(tagName);
    this._element = this._createDocumentElement(tagName);
  }

  _init() {
    this.init();
    this._createResources();
   
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }
  init() {}
  // init() {
  //   this._createResources();
  //   this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  // }

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
    console.log(this._element);

    return this._element;
  }
  
  _render() {
    // const block = this.render();
    // Это небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно компилировать не в строку (или делать это правильно),
    // либо сразу превращать в DOM-элементы и возвращать из compile DOM-ноду
    // this._element.innerHTML = block;

    // const newElement = block.firstElementChild;

    // if (this._element && newElement) {
    //   this._element.replaceWith(newElement);
    // }

    // this._element = newElement;

    // this._addEvents();

    const fragment = this.render();

    this._element.innerHTML = '';

    this._element.append(fragment);

    this._addEvents();
  }

    // Переопределяется пользователем. Необходимо вернуть разметку
  render() {
    return new DocumentFragment();
  }

  // compile(template, context) {
  //   console.log(template);

  //   const contextAndStubs = {...context};

  //   Object.entries(this.children).forEach(([name, component]) => {
  //     // if (Array.isArray(component)) {
  //     //   contextAndStubs[name] = component.map(child => `<div data-id="${child.id}"></div>`)
  //     // } else {
  //       contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
  //     // console.log(contextAndStubs[name]);

  //     // }
  //   });

  //   const html = template(contextAndStubs);
  //   console.log(html);

  //   const temp = document.createElement('template');
    

  //   temp.innerHTML = html;
  //   // console.log(temp.content);
  //   // const replaceStub = component => {
  //   //   const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

  //   //   if (!stub) {
  //   //     return;
  //   //   }

  //   //   component.getContent()?.append(...Array.from(stub.childNodes));

  //   //   stub.replaceWith(component.getContent());
  //   // }

  //   // Object.entries(this.children).forEach(([_, component]) => {
  //   //   if (Array.isArray(component)) {
  //   //     component.forEach(replaceStub);
  //   //   } else {
  //   //     replaceStub(component);
  //   //   }
  //   // });

  //   Object.entries(this.children).forEach(([_, component]) => {
  //     const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

  //     if (!stub) {
  //       return;
  //     }

  //     component.getContent().append(...Array.from(stub.childNodes));

  //     stub.replaceWith(component.getContent());

  //   });
  //   return temp.content;
  // }

  compile(template, context) {
    // console.log(template);

    const contextAndStubs = { ...context };
    // console.log(contextAndStubs);


    Object.entries(this.children).forEach(([name, component]) => {
      contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
      // console.log(contextAndStubs[name]);

    });

    const html = template(contextAndStubs);
    console.log(html);


    const temp = document.createElement('template');

    temp.innerHTML = html;

    Object.entries(this.children).forEach(([_, component]) => {
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

      if (!stub) {
        return;
      }

      component.getContent()?.append(...Array.from(stub.childNodes));

      stub.replaceWith(component.getContent());

    });

    return temp.content;
  }


  getContent() {
    console.log(this.element);

    return this.element;
  }

  _makePropsProxy(props) {
    // Ещё один способ передачи this, но он больше не применяется с приходом ES6+
    const self = this;
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = {...target}

        target[prop] = value;

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      }
    });
  }

  _createDocumentElement(tagName) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  // show() {
  //   this.getContent().style.display = "block";
  // }

  // hide() {
  //   this.getContent().style.display = "none";
  // }
}

export default Block;
