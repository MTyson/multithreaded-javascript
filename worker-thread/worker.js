const { parentPort } = require('worker_threads');

parentPort.on('message', (msg) => {
	console.log("message(worker): " + msg.url);

  fetch(msg.url)
    .then(response => response.json())
    .then(data => parentPort.postMessage(data))
    .catch(error => parentPort.postMessage({ error }));
});

