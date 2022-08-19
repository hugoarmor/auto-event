# How to use

    import eventsContainer, {Event} from "auto-event";
	
	class MyClass {
		@Event("eventName")
		async function trigger() {
			return "Hello World!";	
		}
	};
	
	eventsContainer.on("eventName", res => {
		console.log(res);
	});
	
	const myClass = new MyClass();
	
	myClass.trigger()
	
	// Expected output: Hello World!
