// worker.js

onmessage = function(event) {
  console.log("!!! worker onmessage: " + JSON.stringify(event.data))
  const { url } = event.data;
  fetch(url)
    .then(response => response.json())
    .then(data => postMessage(data))
    .catch(error => postMessage({ error }));
}

