
const endpoint = "http://sandboxserver-001-site1.atempurl.com/SimpleTask";

$(document).ready(function () {
    loadFromStorage();
});

function loadFromStorage() {
    $.ajax({
        url: endpoint + "/GetList?studentNumber=2332294",
        type: "GET",
        dataType: "json",
        crossDomain: true,
        success: function (listOfTasks) {
            displayLoadedTasks(listOfTasks);
        },
        error: function (error) {
            console.log("Error: " + JSON.stringify(error));
        }
    });
}

function saveToStorage(task, callback) {
    $.ajax({
        url: endpoint + "/Save?studentNumber=2332294",
        type: "POST",
        data: task, // Send the data object
        success: function (response) {
            console.log(response.message);
            callback();
        },
        error: function (error) {
            console.log("Error: " + JSON.stringify(error));
        }
    });
}

function deleteFromStorage(task, callback) {
    $.ajax({
        url: endpoint + "/Delete?studentNumber=2332294",
        type: "POST",
        data: task, // Send the data object
        success: function (response) {
            if (response.success) {
                console.log(response.message);
                callback();
            }
            else
                console.log("Errors: " + response.errors.join(", "));
        },
        error: function (error) {
            console.log("Error: " + JSON.stringify(error));
        }
    });
}