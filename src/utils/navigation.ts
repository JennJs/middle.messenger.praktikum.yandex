import Router from "../modules/router/Router";

export default function route(e: Event & { target: HTMLElement}): void {
    const t = e.target;
    if(t && t.getAttribute('href')) {
      (new Router()).go((t.getAttribute('href') as string));

      e.preventDefault();
      e.stopPropagation();
    }
  }
