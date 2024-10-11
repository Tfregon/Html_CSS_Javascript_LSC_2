loadFromStorage();

function loadFromStorage() {
    let cookies = document.cookie.split("; ");
    cookies.sort();
    if (cookies.length === 0 || cookies[0] === "") {
        return;
    }

    let listOfTasks = new Array();
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let [cookieName, cookieValue] = cookie.split("=");
        if (cookieName.startsWith("task")) {
            let cookieValueDecode = decodeURIComponent(cookieValue);
            let task = JSON.parse(cookieValueDecode);
            listOfTasks.push(task);
        }
    }

    displayLoadedTasks(listOfTasks);
}

function saveToStorage(task, callback) {
    let expirationDays = 7; // Number of days until the cookie expires
    saveCookie(task, expirationDays);
    callback();
}

function saveCookie(task, expirationDays) {
    let cookieName = "task" + task.taskNumber;

    let cookieValue = JSON.stringify(task);
    let cookieValueEncode = encodeURIComponent(cookieValue);

    let expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + expirationDays);
    let expirationDateUTC = expirationDate.toUTCString();

    let cookieString = cookieName + "=" + cookieValueEncode + "; expires=" + expirationDateUTC;
    document.cookie = cookieString;
}

function deleteFromStorage(task, callback) {
    let expirationDays = -1; // setting the expiration to yesterday (today -1) will force the browser to remove the expired cookie
    saveCookie(task, expirationDays);
    callback();
}