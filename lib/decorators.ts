import { DescriptorAsync, DescriptorSync } from "./interfaces";
import eventsContainer from "./events";

/**
 * Generates a new event to be trigerred
 *
 * @param eventName name of the event you are creating
 */
export function Event(eventName: string) {
  eventsContainer.registerEvent(eventName);

  return function decorator(target, name, descriptor: DescriptorAsync) {
    const fn = descriptor.value;
    if (!fn) {
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

/**
 * Generates a new event listener wich will execute the function passing the event response as only paramater
 * 
 * @param eventName name of the event to listen
 */
export function EventListener(eventName: string) {
  return function decorator(target, name, descriptor: DescriptorSync) {

    const fn = (res) => descriptor.value ? descriptor.value(res) : null

    if (!fn) {
      return
    }

    eventsContainer.on(eventName, res => fn(res));
  };
}
