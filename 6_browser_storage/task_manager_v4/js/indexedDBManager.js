let db = null;

initialize();

function initialize() {
    let request = window.indexedDB.open("TasksDB");

    request.onsuccess = function (event) {
        db = event.target.result;
        loadFromStorage();
    };

    request.onerror = function (event) {
        console.error("Error while opening IndexedDB connection:", event.target.error);
    };

    request.onupgradeneeded = function (event) {
        db = event.target.result;
        db.createObjectStore("Tasks", { keyPath: "taskNumber" });
    };
}

function loadFromStorage() {

    let transaction = db.transaction("Tasks", "readonly");
    let request = transaction.objectStore("Tasks").getAll();

    request.onsuccess = function () {
        displayLoadedTasks(request.result);
    };

    request.onerror = function (event) {
        console.error("Error retrieving data:", event.target.error);
    };
}

function findByTaskNumber(taskNumber, callback) {
    let transaction = db.transaction("Tasks", "readonly");
    let request = transaction.objectStore("Tasks").get(taskNumber);

    request.onsuccess = function (event) {
        let task = event.target.result;
        callback(task);
    };
}

function saveToStorage(task, callback) {
    findByTaskNumber(task.taskNumber, function (foundTask) {

        let transaction = db.transaction("Tasks", "readwrite");
        let request;

        if (foundTask == null) 
            request = transaction.objectStore("Tasks").add(task);
        else
            request = transaction.objectStore("Tasks").put(task);

        request.onsuccess = function () {
            callback();
        };

        request.onerror = function () {
            console.error("Error updating task: " + request.error);
        };
    });
}

function deleteFromStorage(task, callback) {
    let transaction = db.transaction("Tasks", "readwrite");
    let request = transaction.objectStore("Tasks").delete(task.taskNumber);

    request.onsuccess = function () {
        callback();
    };

    request.onerror = function () {
        console.error("Error deleting task: " + request.error);
    };
}