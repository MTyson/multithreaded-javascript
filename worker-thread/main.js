const { Worker } = require('worker_threads');

function fetchPersonWithWorker(id) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./worker.js', { workerData: id });

    worker.on('message', (data) => {
      if (data.error) {
        reject(data.error);
      } else {
        resolve(data);
      }
      worker.terminate();
    });

    worker.on('error', (error) => reject(error));

    let url = `https://swapi.dev/api/people/${id}`;
    worker.postMessage({ url });
  });
}

const lukeId = 1;
const leiaId = 5;

console.log("Fetching Star Wars characters with worker threads...");

Promise.all([fetchPersonWithWorker(lukeId), fetchPersonWithWorker(leiaId)])
  .then(data => {
    console.log("Characters received: "+ JSON.stringify(data) );
    console.log(data[0]); // Data for Luke Skywalker (ID: 1)
    console.log(data[1]); // Data for Leia Organa (ID: 5)
  })
  .catch(error => console.error("Error fetching characters:", error));

console.log("Moving on to other things...");

