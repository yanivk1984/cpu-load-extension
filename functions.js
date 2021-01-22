function datePickerConfig() {

    const myInput = document.querySelector("#rangeDate");
    const fp = flatpickr(myInput, {
            altInput: true,
            altFormat: "F j, Y",
            dateFormat: "Y-m-d",
            maxDate: "today",
            defaultDate: "today",
    });
}

function runCurrentCpuFetch(element) {
    goButtonSpin(element)
    runScript("getCurrentCpu", "mpstat -P ALL | sed -r 's/\s+/,/g' ; fw ctl affinity -l -r | sed -r 's/:/,/g'", "getProgress")
    goButtonSpinDisable(element)
}

function goButtonSpin(element) {
    element.disabled = true;
    var child = element.childNodes[0];
    child.setAttribute("class", "spinner-border spinner-border-sm");

    var child2 = element.childNodes[1];
    child2.setAttribute("class", "spinner")
    child2.innerText = "Loading..."
}

function goButtonSpinDisable(element) {
    element.disabled = false;
    var child = element.childNodes[0];
    child.setAttribute("class", "");

    var child2 = element.childNodes[1];
    child2.setAttribute("class", "")
    child2.innerText = "Go"
}

function runScript(scriptName, scriptCommands, runWhenFinished) {
        smxProxy.sendRequest("request-commit", {"commands" : [`run-script script-name "${scriptName}" script "${scriptCommands}"`]}, `${runWhenFinished}`);
    }

function getProgress(value) {
    if (Header) { document.getElementById('header').innerText = Status }
    if (!isTask) { Taskid = value[0].tasks[0]["task-id"] }
    smxProxy.sendRequest("run-readonly-command", {"command" : "show task","parameters" : {"task-id":""+Taskid+"","details-level":"full"}}, "onReadOnlyCommand");
}

function csvToJSON(csv) {
    var lines = csv.split("\n");
    /* console.log(lines) */
    var result = [];
    var headers;
    headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
        var obj = {};

        if(lines[i] == undefined || lines[i].trim() == "") {
            continue;
        }

        var words = lines[i].split(",");
        for(var j = 0; j < words.length; j++) {
            obj[headers[j].trim()] = words[j];
        }

        result.push(obj);
    }
    console.log(result);
}

function console() {
    console.log = function (message) {
        if (typeof message == 'object') {
            var logger = document.getElementById('console');
            logger.value += (JSON && JSON.stringify ? JSON.stringify(message) : message);
        } else {
            var logger = document.getElementById('console');
            logger.value += message + "\n";
        }
    }
};

function consoleError() {
    console.error = function (message) {
        if (typeof message == 'object') {
            var logger = document.getElementById('console');
            logger.value += (JSON && JSON.stringify ? JSON.stringify(message) : message);
        } else {
            var logger = document.getElementById('console');
            logger.value += message + "\n";
        }
    }
};

window.addEventListener("error", handleError, true);
function handleError(evt) {
    if (evt.message) { // Chrome sometimes provides this
      console.log("error: "+evt.message +" at linenumber: "+evt.lineno+" of file: "+evt.filename);
    } else {
      console.log("error: "+evt.type+" from element: "+(evt.srcElement || evt.target));
    }
}

console();
consoleError;