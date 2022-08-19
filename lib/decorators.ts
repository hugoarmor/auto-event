import { Descriptor } from "./interfaces";
import eventsContainer from "./events";

/**
 * Generates a new event to be trigerred
 *
 * @param eventName name of the event you are creating
 */
export function Event(eventName: string) {
  eventsContainer.registerEvent(eventName);

  return function decorator(target, name, descriptor: Descriptor) {
    const fn = descriptor.value;
    if(!fn) {
      return
    }
    descriptor.value = (...args) => {
      return fn(...args).then((eventResponse) => {
        if (!!eventResponse) {
          eventsContainer.callEvents(eventName, eventResponse);
        }
        return eventResponse;
      });
    };
  };
}
