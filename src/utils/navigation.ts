import { router } from "../modules/router/Router";

export function route(e: Event & { target: HTMLElement}): void {
    const t = e.target;
    if(t && t.getAttribute('href')) {
      router.go((t.getAttribute('href') as string));

      e.preventDefault();
      e.stopPropagation();
    }
  }
