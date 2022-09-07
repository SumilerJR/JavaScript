console.log(globalThis);

function getMessage() {
    this.a = 1;
    return 'this is a message';
}

var msg = new getMessage();

console.log(msg.a); // {}
console.log(typeof msg); // "object"