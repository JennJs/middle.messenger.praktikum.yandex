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

  setAttributes(el, attrs) {   
     Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value)); 
  }

  getFormValue(e) {
    e.preventDefault();
    const form = document.querySelector('form');
    let form2 = document.forms[0];

    const dataForm = Object.fromEntries(new FormData(form).entries());
    // console.log(dataForm);
    // // form.reset();
    // Object.entries(dataForm).forEach((entry) => {
    //   // const [key, value] = entry;
    //   // if (key === 'email') {
        if (validate(dataForm, form2)) {
          console.log('форма успешно проверена');
          const values = form2.elements;
          Object.entries(values).forEach( ([key , value]) => {
             value.value = '';
          })
          
        };
    return false;
  }

  valid(e) {
    // console.log(e, 'valid');
    // console.log(e.target.name);
   
    const reEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const reLogin = /^[\w\-]{3,20}$/;
    const reNameAndSurname = /^[A-ZА-Я][A-ZА-Яa-zа-я\-]+$/;
    const rePhone = /^(?:\+|[\+7|8])[\d]{10,15}$/;
    const rePassword = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/;

        // if(e.target.name === 'email') {
        //     value.style.border = "";
        //     if (reEmail.test(value.value )) {
        //         let errorDiv = document.getElementById('error_'+e.target.name);
        //         if(errorDiv) {
        //             errorDiv.innerHTML='';
        //         }
        //         value.classList.remove('error_input');
        //         return true;
        //     }
        //     else {
                
        //         value.classList.add('error_input');
        //         let errorDiv = document.createElement("div");
        //         errorDiv.setAttribute('id', 'error_'+e.target.name);
        //         errorDiv.classList.add('error');
        //         errorDiv.innerHTML='email введен неверно';
        //         value.after(errorDiv);
        //         return false;
        //     }
         if(e.target.name === 'login') {
            if (reLogin.test(e.target.value )) {
                let errorDiv = document.getElementById('error_'+e.target.name);
                if(errorDiv) {
                    errorDiv.innerHTML='';
                } 
                e.target.classList.remove('error_input');
            }
            else {
              let errorDiv = document.getElementById('error_'+e.target.name);
              if(!errorDiv) {
                e.target.classList.add('error_input');
                let errorDiv = document.createElement("div");
                errorDiv.setAttribute('id', 'error_'+e.target.name);
                errorDiv.classList.add('error');
                errorDiv.innerHTML=`логин должен быть от 3 до 20 латинских букв, может содержать цифры, дефис, нижнее подчёркивание, без пробелов`;
                e.target.after(errorDiv);
              } 
            }
        }

        // } else if(e.target.name === 'first_name' || e.target.name === 'second_name' ) {
        //     value.style.border = "";
        //     if (reNameAndSurname.test(value.value )) {
        //         let errorDiv = document.getElementById('error_'+e.target.name);
        //         if(errorDiv) {
        //             errorDiv.innerHTML='';
        //         } 
        //         value.classList.remove('error_input');
        //         return true;
        //     } else {

        //         value.classList.add('error_input');
        //         let errorDiv = document.createElement("div");
        //         errorDiv.setAttribute('id', 'error_'+e.target.name);
        //         errorDiv.classList.add('error');
        //         errorDiv.innerHTML=`поле ${value.placeholder} должно содержать латиницу или кириллицу, первая буква должна быть заглавной, без пробелов и без цифр, допустим только дефис`;
        //         value.after(errorDiv);
        //         return false;
        //     }
        // } else if(e.target.name === 'phone') {
        //     value.style.border = "";
        //     if (rePhone.test(value.value )) {
        //         let errorDiv = document.getElementById('error_'+e.target.name);
        //         if(errorDiv) {
        //             errorDiv.innerHTML='';
        //         }  
        //         value.classList.remove('error_input');
        //         return true;
        //     } else {

        //         value.classList.add('error_input');
        //         let errorDiv = document.createElement("div");
        //         errorDiv.setAttribute('id', 'error_'+e.target.name);
        //         errorDiv.classList.add('error');
        //         errorDiv.innerHTML=`поле ${value.placeholder} должно содержать от 10 до 15 символов, состоять из цифр, может начинается с плюса`;
        //         value.after(errorDiv);
        //         return false;
        //     }
        // } else if(e.target.name === 'password') {
        //     value.style.border = "";
        //     if (rePassword.test(value.value )) {
        //         let errorDiv = document.getElementById('error_'+e.target.name);
        //         if(errorDiv) {
        //             errorDiv.innerHTML='';
        //         }
        //         value.classList.remove('error_input');
        //         return true;
        //     } else {
        //         let errorDiv = document.getElementById('error_'+e.target.name);
        //         if(!errorDiv) {
    
        //             value.classList.add('error_input');
        //             let errorDiv = document.createElement("div");
        //             errorDiv.setAttribute('id', 'error_'+e.target.name);
        //             errorDiv.classList.add('error');
        //             errorDiv.innerHTML=`поле ${value.placeholder} должно содержать от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.`;
        //             value.after(errorDiv);
        //             return false;
        //         }     
        //     }

}
  
  focus(e) {
    console.log('focus');
    // console.log(this.element.value);
  };

}

export default Block;
