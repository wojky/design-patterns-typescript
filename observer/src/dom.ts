const emitBtn = document.getElementById("emit");
const addObserverBtn = document.getElementById("add");
const observerContainerEl = document.querySelector("section");
const template = document.getElementById("observerTemplate") as HTMLTemplateElement;

export function getButtons() {
  if (!emitBtn || !addObserverBtn) {
    throw new Error("Wtf kamil?");
  }
  return { emitBtn, addObserverBtn };
}

export function registerClick(el: HTMLElement, handler: VoidFunction) {
  el.addEventListener("click", () => {
    handler();
  });
}

export function createObserverUI(name: string, handler: VoidFunction) {
  if (!observerContainerEl || !template) {
    throw new Error("Wtf kamil?");
  }

  const tmpl = template.content.cloneNode(true) as HTMLDivElement;

  tmpl.querySelector("span")!.textContent = name;
  tmpl.querySelector("button")!.addEventListener("click", () => {
    handler();
  });

  observerContainerEl.append(tmpl);
}
