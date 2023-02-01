import  EventBus  from "../../utils/eventBus";
import { nanoid } from 'nanoid';
import { validate } from "../../utils/validation";

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

  setInputsAttributes(el, id, input_name, type, placeholder, value ='' ) {
    const attrs = {
      id, 
      name: input_name ,
		  type,
      placeholder,
      value
    };
    Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
  }

  setLabelsAttributes(el, label , id ) {
    el.getContent().setAttribute('for', id );
    el.getContent().textContent = label;
  }

  getFormValue(e) {
    e.preventDefault();
    const form = document.querySelector('form');
    let form2 = document.forms[0];

    const dataForm = Object.fromEntries(new FormData(form).entries());
   
    if (validate(dataForm, form2)) {
      const values = form2.elements;

      Object.entries(values).forEach( ([key , value]) => {
        if (!value.classList.contains('user_settings')) {
          value.value = '';
        } 
      })
      console.log(dataForm);
      e.target.setAttribute('disabled', '')
    } 
    return false;
  }

  focus(e) {
    let errorDiv = document.getElementById('error_'+e.target.name);
    let parent = e.target.parentNode;
    if(errorDiv) {
      errorDiv.remove();
      parent.classList.remove('error_input');
      e.target.classList.remove('error_input');
    } 
  };

  valid(e) {
    const error = (e, text) => {
      let errorDiv = document.getElementById('error_'+e.target.name);
      let parent = e.target.parentNode;
        if(!errorDiv) {
          let errorDiv = document.createElement("div");
          errorDiv.setAttribute('id', 'error_'+e.target.name);
          errorDiv.innerHTML=`Поле ${e.target.placeholder} ${text}`;
          if(e.target.classList.contains('user_settings')) {
            errorDiv.classList.add('error_settings');
            parent.classList.add('error_input');
            parent.after(errorDiv)
          } else {
            errorDiv.classList.add('error');
            e.target.classList.add('error_input');
            e.target.after(errorDiv);
          }
        
        } 
    }
    
    const reEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const reLogin = /^[a-zA-ZА-Яа-я0-9\-\_]{2,20}[a-zA-ZА-Яа-я]+$/;
    const reNameAndSurname = /^[A-ZА-Я][A-ZА-Яa-zа-я\-]+$/;
    const rePhone = /^(?:\+|[\+7|8])[\d]{10,15}$/;
    const rePassword = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/;

    if(e.target.name === 'email') {
      if (reEmail.test(e.target.value)) {
        this.focus(e);
      } else {
        error(e, 'заполненно неверно');
      }
  
    } else if(e.target.name === 'login') {
        if (reLogin.test(e.target.value)) {
          this.focus(e);
        } else {
          error(e, 'должно содержать от 3 до 20 латинских букв, может содержать цифры, дефис, нижнее подчёркивание, без пробелов');
        }
    } else if(e.target.name === 'first_name' || e.target.name === 'second_name' ) {
      if (reNameAndSurname.test(e.target.value)) {
        this.focus(e);
      } else {
        error(e, 'должно содержать латиницу или кириллицу, первая буква должна быть заглавной, без пробелов и без цифр, допустим только дефис');
      }
    } else if(e.target.name === 'phone') {
        if (rePhone.test(e.target.value)) {
          this.focus(e);
        } else {
          error(e, 'должно содержать от 10 до 15 символов, состоять из цифр, может начинается с +');
        }
    } else if(e.target.name === 'password') {
      if (rePassword.test(e.target.value)) {
        this.focus(e);
      } else {
        error(e, 'должно содержать от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра');
      }  
    } else if(e.target.name === 'display_name') {
      if (!e.target.value.trim().length === 0) {
        this.focus(e);
      } else {
        error(e, ' Имя в чате должно содержать хотя бы один символ');
      }
    } else if(e.target.name === 'newPassword' || e.target.name === 'newPasswordRepeat') {
      if (rePassword.test(e.target.value)) {
        this.focus(e);
      } else {
        error(e, 'Пароль должно содержать от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра');
      }
    }
  }
}

export default Block;
