# auto-event

This is a lib for making easier to create your own events using decorators.

## Install
```
npm install auto-event
```

## Example

Using the `@Event()` decorator, you set your function to be an event emitter that uses
it's return as a callback parameter. After that, you can declare an event listener.

```ts
import eventsContainer, { Event } from "auto-event";

class MyClass {
  @Event("eventName")
  async trigger() {
    return "Hello World!";
  }
};

eventsContainer.on("eventName", res => {
  console.log(res);
});

const myClass = new MyClass();

myClass.trigger();

// Expected output: Hello World!
```

To end a listener, you can just use the `end()` function.

```ts
const eventListener = eventsContainer.on("eventName", res => {
  console.log(res);
});

eventListener.end()
```

## Observation

This lib uses only this method for creating events, but it will soon be improved with
other methods.
