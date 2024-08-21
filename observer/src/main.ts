// IMPLEMENTUJEMY WZORZEC!

import { createPublisher, Observer } from "./createPublisher";
import { createObserverUI, getButtons, registerClick } from "./dom";

const publisher = createPublisher<string>();

registerClick(getButtons().emitBtn, () => {
  publisher.publish(crypto.randomUUID());
});

let id = 0;

registerClick(getButtons().addObserverBtn, () => {
  id = id + 1;
  const observerId = id;
  const uuidObserver: Observer<string> = (uuid) => {
    console.log(`#${observerId}`, uuid);
  };

  const unsubcribe = publisher.subscribe(uuidObserver);

  createObserverUI(observerId.toString(), () => {
    unsubcribe();
  });
});
