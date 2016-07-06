// Import events module
var events = require('events');

// Create eventEmitter object
var eventEmitter = new events.EventEmitter();

// Create a function for first listener handler
var firstListener = function triggerFirstListener() {
   console.log('First listener handler');
}

// Create a function for second listener handler
var secondListener = function triggerSecondListener() {
   console.log('Second listener handler');
}

// Bind the first listener with the handler
eventEmitter.on('sampleEvent', firstListener);

// Bind the second listener with the handler
// addListener(eventName, listener) is alias for on(eventName, listener)
eventEmitter.addListener('sampleEvent', secondListener);

// Print the number of listeners listening to sample event
var listenerCounter = eventEmitter.listenerCount('sampleEvent');
console.log(listenerCounter + " listener(s) listening to sample event");

// Fire the sample event 
eventEmitter.emit('sampleEvent');

// Remove the binding of firstListener function
eventEmitter.removeListener('sampleEvent', firstListener);
console.log("First listener will not listen now");

// Print the number of listeners listening to sample event
var listenerCounter = eventEmitter.listenerCount('sampleEvent');
console.log(listenerCounter + " listener(s) listening to sample event");

// Fire the sample event 
eventEmitter.emit('sampleEvent');

console.log("Program is ended");