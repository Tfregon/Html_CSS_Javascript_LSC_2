let db = null;
console.log("indexedDBManager loaded")
initialize();

function initialize() {
    let request = window.indexedDB.open("LoginsDB");

    request.onsuccess = function (event) {
        db = event.target.result;
        loadFromStorage();
    };

    request.onerror = function (event) {
        console.error("Error while opening IndexedDB connection:", event.target.error);
    };

    request.onupgradeneeded = function (event) {
        db = event.target.result;
        db.createObjectStore("Logins", { keyPath: "numberId" });
    };
}

function loadFromStorage() {

    let transaction = db.transaction("Logins", "readonly");
    let request = transaction.objectStore("Logins").getAll();

    request.onsuccess = function () {
        displayLoadedLogin(request.result);
    };

    request.onerror = function (event) {
        console.error("Error retrieving data:", event.target.error);
    };
}

function findByLoginNumber(numberId, callback) {
    let transaction = db.transaction("Logins", "readonly");
    let request = transaction.objectStore("Logins").get(numberId);

    request.onsuccess = function (event) {
        let login = event.target.result;
        callback(login);
    };
}

function saveToStorage(login, callback) {
    findByLoginNumber(login.numberId, function (foundLogin) {

        let transaction = db.transaction("Logins", "readwrite");
        let request;

        if (foundLogin == null)
            request = transaction.objectStore("Logins").add(login);
        else
            request = transaction.objectStore("Logins").put(login);

        request.onsuccess = function () {
            callback();
        };

        request.onerror = function () {
            console.error("Error updating login: " + request.error);
        };
    });
}

function deleteFromStorage(login, callback) {
    let transaction = db.transaction("Logins", "readwrite");
    let request = transaction.objectStore("Logins").delete(login.numberId);

    request.onsuccess = function () {
        callback();
    };

    request.onerror = function () {
        console.error("Error deleting Login: " + request.error);
    };
}