
function enableButtons(){
    console.log("enableButtons => Enabling buttons")
    let buttons = document.querySelectorAll("button");
    buttons.forEach(button => button.disabled = false)

}

function datePickerConfig() {
const picker = new Litepicker({
    element: document.getElementById('rangeDate'),
    plugins: ['ranges'],
    minDate:new Date(new Date().setDate(new Date().getDate()-29)),
    maxDate:new Date(new Date().setDate(new Date().getDate())),
    maxDays: 7,
    ranges: {
        customRanges: {
            'Today': [new Date(new Date().setDate(new Date().getDate())), new Date(new Date().setDate(new Date().getDate()))], // first start date then end date.
            'Yesterday': [new Date(new Date().setDate(new Date().getDate()-1)), new Date(new Date().setDate(new Date().getDate()-1))], // first start date then end date.
            '4 days ago': [new Date(new Date().setDate(new Date().getDate())), new Date(new Date().setDate(new Date().getDate()-4))] // first start date then end date.
        }
    }
});
}


function console() {
    console.log = function (message) {
        if (typeof message == 'object') {
            var logger = document.getElementById('console');
            logger.value += (JSON && JSON.stringify ? JSON.stringify(message) : message);
            logger.value += "========\n========\n"
        } else {
            var logger = document.getElementById('console');
            logger.value += message + "\n";
            logger.value += "========\n========\n"
        }
    }
};

function consoleError() {
    console.error = function (message) {
        if (typeof message == 'object') {
            var logger = document.getElementById('console');
            logger.value += (JSON && JSON.stringify ? JSON.stringify(message) : message);
            logger.value += "========\n========\n"
        } else {
            var logger = document.getElementById('console');
            logger.value += message + "\n";
            logger.value += "========\n========\n"
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

  function hideShowTable() {
    let button = document.getElementById('show-hide-table')
    let table = document.getElementById('main-table')
    console.log(button)
    if (button.innerHTML == 'Hide table'){
        table.style.display = 'none'
        button.innerHTML = 'Show table'
    }

    else if (button.innerHTML == 'Show table'){
        table.style.display = 'table'
        table.style.width = '100%'
        button.innerHTML = 'Hide table'
    }
}



function showConsole() {
    document.getElementById('console').style.display = 'block'
}

document.onkeyup = function(e) {
    if (e.ctrlKey && e.which == 68) {
      showConsole();
    } 
  };

console();
consoleError();
datePickerConfig()
