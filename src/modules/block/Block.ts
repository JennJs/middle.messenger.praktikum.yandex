import  EventBus  from "../../utils/eventBus";
import { v4 as uuidv4 } from 'uuid';

export type T = Record<string, any>;
type Children = Record<string, Block<T>>;

class Block <Props extends Record<string, any>>  {
  
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: "flow:render"
  };


  public id: string = uuidv4();
  private _element: HTMLElement;
  protected children: Children = {};
  protected props: Props;
  protected tagName: string;
  protected eventBus: () => EventBus;
  private _meta: { 
    tagName: string; 
    props: Props; 
  };

  constructor(tagName = "div", propsWithChildren: Props ) {
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

  private _getChildrenAndProps(childrenAndProps: Props): {props: Props, children: Children} {
    const props = {}  as T;
    const children: Children = {};
    if (childrenAndProps) {
        Object.entries(childrenAndProps).forEach(([key, value]) => {
            if (value instanceof Block) {
              children[key] = value;
            } else {
              props[key] = value;
            }
        });
    }
    
    return {props: (props as Props), children};
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }


  private _addEvents():void {
    const {events = {}} = this.props;
   
    Object.keys(events).forEach(eventName => {
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  private _removeEvents(): void {
    const events: { [event: string]: () => void } = (this.props).events;
    if (!events || !this._element) {
        return;
    }

    Object.entries(events).forEach(([event, listener]) => {
        this._element.removeEventListener(event, listener);
    });
}

  private _createResources(): void {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  private _init(): void {
    this.init();
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }
  protected init(): void {}

  private _componentDidMount(): void {
    this.componentDidMount();
  }

  protected componentDidMount(): void {}

  public dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
   
    Object.values(this.children).forEach(child => child.dispatchComponentDidMount());
  }

  private _componentDidUpdate(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);

  }

  public setProps = (nextProps: Props): void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  public get element(): HTMLElement {
    return this._element;
  }
  
  private _render(): void {
    const fragment = this.render(); 
    if(fragment) {
        this._removeEvents();
        this._element.innerHTML = '';
        this._element.append(fragment);
    }
    this._addEvents();
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  protected compile(template: (context: any) => string, context: Props): DocumentFragment {

    const contextAndStubs: T = { ...context };

    Object.entries(this.children).forEach(([name, component]) => {
      contextAndStubs[name] = `<div data-id="${component.id}"></div>`;

    });

    const html = template(contextAndStubs);
    const temp = document.createElement('template');
    temp.innerHTML = html;

    Object.entries(this.children).forEach(([, component]) => {
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

      if (!stub) {
        return;
      }

      component.getContent().append(...Array.from(stub.childNodes));
      stub.replaceWith(component.getContent());

    });

    return temp.content;
  }

  public getContent(): HTMLElement {
    return this.element;
  }

  private _makePropsProxy(props: Props): Props {
    const self = this;
    return new Proxy(props, {
      get(target: any, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = {...target}
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty(): never {
        throw new Error('Нет доступа');
      }
    });
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  public show(): void {
    this.getContent().style.display = "flex";
  }

  public hide(): void {
    this.getContent().style.display = "none";
  }

  public setInputsAttributes(el: HTMLElement, id: string, name: string, type: string, placeholder: string, value: string ='' ) {
    const attrs = {
      id, 
      name,
		type,
      placeholder,
      value
    };
    Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
  }

  protected setLabelsAttributes(el: Block<T>, label: string , id: string ) {
    el.getContent().setAttribute('for', id );
    el.getContent().textContent = label;
  }

  focus(e: Event & { target: HTMLInputElement}): void {
    let errorDiv = document.getElementById('error_'+e.target.name) ;
    let parent = e.target.parentNode as HTMLElement;
    if(errorDiv) {
      errorDiv.remove();
      parent.classList.remove('error_input');
      e.target.classList.remove('error_input');
    } 
  }

  valid(e: Event & { target: HTMLInputElement}): void {
    const error = (e:Event & { target: HTMLInputElement }, text: string) => {
      let errorDiv = document.getElementById('error_'+e.target .name);
      let parent = e.target.parentNode as HTMLElement;
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
    const reLogin = /^[a-zA-ZА-Яа-я0-9\-_]{2,20}[a-zA-ZА-Яа-я]+$/;
    const reNameAndSurname = /^[A-ZА-Я][A-ZА-Яa-zа-я-]+$/;
    const rePhone = /^(?:\+|[+7|8])[\d]{10,15}$/;
    const rePassword = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/;

    if((e.target as HTMLInputElement).name === 'email') {
      if (reEmail.test((e.target as HTMLInputElement).value)) {
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
      if ((e.target.value as string).trim().length  === 0) {
        error(e, ' Имя в чате должно содержать хотя бы один символ');
      } else {
        this.focus(e);
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
