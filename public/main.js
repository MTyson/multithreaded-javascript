const BASE_URL = 'https://swapi.dev/api';

function fetchPersonWithWorker(id) {
	console.log("BEGIN fetchPersonWithWorker: " + id);
  return new Promise((resolve, reject) => {
    const worker = new Worker('worker.js');

    worker.onmessage = function(event) {
	    console.log("BEGIN onmessage");
      if (event.data.error) {
        reject(event.data.error);
      } else {
        resolve(event.data);
      }
      worker.terminate(); // Clean up the worker after receiving the data
    }

    worker.postMessage({ url: `${BASE_URL}/people/${id}` });
  });
}

const lukeId = 1;
const leiaId = 5;

console.log("Fetching Star Wars characters with web worker...");

// Fetch character data concurrently (truly parallel)
Promise.all([fetchPersonWithWorker(lukeId), fetchPersonWithWorker(leiaId)])
  .then(data => {
    console.log("Characters received:");
    console.log(data[0]); // Data for Luke Skywalker (ID: 1)
    console.log(data[1]); // Data for Leia Organa (ID: 5)
  })
  .catch(error => console.error("Error fetching characters:", error));

console.log("Moving on to other things...");

