export class EventsContainer {
  public events: { name: string; callbacks: ((...args) => any)[] }[] = [];

  /**
   * It register a new event
   *
   * @param eventName
   * @param callbacks
   * @returns index of the new created event
   */
  registerEvent(eventName: string, callbacks?: ((...args) => any)[]) {
    const eventIndex = this.events.findIndex(
      (event) => event.name === eventName
    );

    const eventExist = eventIndex >= 0;

    if (eventExist) {
      return this.getEventIndex(eventName);
    }

    const newArraySize = this.events.push({
      name: eventName,
      callbacks: callbacks ?? [],
    });

    const newEventIndex = newArraySize - 1;

    return newEventIndex;
  }

  /**
   * It removes the created event
   *
   * @param eventName
   */
  removeEvent(eventName: string) {
    const eventIndex = this.events.findIndex(
      (event) => event.name === eventName
    );

    this.events.splice(eventIndex, 1);
  }

  /**
   * It gets the event index
   *
   * @param eventName
   * @returns event index
   */
  private getEventIndex(eventName: string) {
    const eventIndex = this.events.findIndex(
      (event) => event.name === eventName
    );

    return eventIndex;
  }

  /**
   * Creates a new callback and attach to an event. If the event doesnt exist, it generates a new one.
   *
   * @param eventName
   * @param callback
   * @returns index of the new callback
   */
  private saveCallback(eventName: string, callback: (...args) => any) {
    const eventIndex = this.getEventIndex(eventName);

    const eventExist = eventIndex >= 0;

    if (!eventExist) {
      const newCallbackIndex = 0;
      this.registerEvent(eventName, [callback]);

      return newCallbackIndex;
    }

    const newArraySize = this.events[eventIndex].callbacks.push(callback);

    const newCallbackIndex = newArraySize - 1;

    return newCallbackIndex;
  }

  /**
   * It removes the callback created callback function, preventing it from being executed again
   *
   * @param eventName
   * @param callbackIndex
   */
  removeCallback(eventName: string, callbackIndex: number) {
    const eventIndex = this.events.findIndex(
      (event) => event.name === eventName
    );
    this.events[eventIndex].callbacks.splice(callbackIndex, 1);
  }

  /**
   * It resolves all of the listeners, executing each callback
   *
   * @param eventName
   * @param eventResponse
   */
  callEvents(eventName: string, eventResponse: any) {
    this.events.forEach(async (event) => {
      if (event.name === eventName) {
        Promise.all(event.callbacks.map((callback) => callback(eventResponse)));
      }
    });
  }

  /**
   * It declares a new listener
   *
   * @param eventName
   * @param callback
   * @returns
   */
  on(eventName: string, callback: (e: any) => any) {
    const calbackIndex = this.saveCallback(eventName, callback);

    const end = () => this.removeCallback(eventName, calbackIndex);

    return { end };
  }
}

const eventsContainer = new EventsContainer();

export default eventsContainer;
