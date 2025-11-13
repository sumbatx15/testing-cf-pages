import { setupPrefetch } from "./lib/utils/prefetch";
import { element } from "./lib/utils/selector";
import { createSignal } from "./lib/utils/signal";

setupPrefetch();

const incBtn = element<HTMLButtonElement>("#inc-button");
const decBtn = element<HTMLButtonElement>("#dec-button");
const display = element("#count-display");
const displayDouble = element("#count-display-double");

const count = createSignal(0, {
  onUpdate: (v) => {
    display.textContent = `count is ${v}`;
    displayDouble.textContent = `count is ${v * 2}`;
  },
});

incBtn.addEventListener("click", () => count.value++);
decBtn.addEventListener("click", () => count.value--);
