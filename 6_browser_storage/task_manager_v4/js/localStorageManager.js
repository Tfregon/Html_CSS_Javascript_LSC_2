loadFromStorage();

function loadFromStorage() {
    let listOfTasks = new Array();

    let allKeys = Object.keys(localStorage);
    allKeys.sort();

    for (let i = 0; i < allKeys.length; i++) {
        let key = allKeys[i];
        if (key.startsWith("task")) {
            let value = localStorage.getItem(key);
            let task = JSON.parse(value);
            listOfTasks.push(task);
        }
    }

    displayLoadedTasks(listOfTasks);
}

function saveToStorage(task, callback) {
    let key = "task" + task.taskNumber;
    let value = JSON.stringify(task);
    localStorage.setItem(key, value);
    callback();
}

function deleteFromStorage(task, callback) {
    let key = "task" + task.taskNumber;
    localStorage.removeItem(key);
    callback();
}