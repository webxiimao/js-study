var worker = new Worker("./js/worker1.js");

worker.onmessage = function (event) {
    console.log("workder",event);
}

worker.postMessage("Mark");
