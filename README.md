# auto-event

This is a lib for making easier to create your own events using decorators.

## Install
```
npm install auto-event
```

## Example

Using the `@Event()` decorator, you set your function to be an event emitter that uses
it's return as a callback parameter. After that, you can declare an event listener with the `EventListener()` decorator.

```ts
import { Event, EventListener } from "auto-event";

class MyEvents {
  @Event("eventName")
  async trigger() {
    return "Hello World!";
  }
};

class MyEventListeners {
  @EventListener("eventName")
  async listener(eventResponse) {
    console.log(eventResponse);
  }
};

const myClass = new MyClass();

myClass.trigger();

// Expected output: Hello World!
```

You can add a listener in a different way calling the `on()` function from the eventsContainer.

```ts
import eventsContainer from "auto-event";

const eventListener = eventsContainer.on("eventName", eventResponse => {
  console.log(res);
});

eventListener.end()
```

## Observation

This lib uses only this method for creating events, but it will soon be improved with
other methods.
