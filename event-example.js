// Import events module
var events = require('events');

// Create eventEmitter object
var eventEmitter = new events.EventEmitter();

// Bind second event handler with the anonymous function
eventEmitter.on('secondEvent', function(){
   console.log('Second event handler');
});

// Create a function for first event handler
var firstEventHandler = function handleFirstEvent() {
   console.log('First event handler');
  
   // Fire the second event 
   eventEmitter.emit('secondEvent');
}

// Bind the first event with the handler
eventEmitter.on('firstEvent', firstEventHandler);

// Fire the first event 
eventEmitter.emit('firstEvent');

console.log("Program is ended");