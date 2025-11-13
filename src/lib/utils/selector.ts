export const element = <T extends HTMLElement>(selector: string): T => {
  return document.querySelector(selector) as T;
};
