let gwObject = {};
toastr.options.progressBar = true;
toastr.options.positionClass = "toast-bottom-right";

function parseCurrentCPUOutput(value) {
    console.log(`parseCurrentCPUOutput => Parsing the following value: ${JSON.stringify(value)}`)
    let task = JSON.parse(value[0].replace(/.*?{/, '{').replace(/}/, '}'))
    let cpuLoad = atob(task.tasks[0]['task-details'][0].responseMessage)
    let jsonFromCsv = csvToJSON(cpuLoad)
    convertIdle(jsonFromCsv)
    let [x, y] = parseCurrentCpuChart(jsonFromCsv)
    createBar(x, y)
}

function convertIdle(cpuLoad) {
    console.log(`convertIdle => Converting the idle of the following data: ${JSON.stringify(cpuLoad)}`)
    for (var i = 0; i < cpuLoad.length; i++) {
        cpuLoad[i]['%idle'] = 100 - cpuLoad[i]['%idle']
    }
}

function onContext(value) {
    console.log(`onContext => ${JSON.stringify(value)}`)
    gwObject.name = value.event.objects[0].name
    console.log(`onContext => Clicked on: '${gwObject.name}'`)
    document.getElementById('gw-name').innerHTML = gwObject.name
    gwObject.type = value.event.objects[0].type
    gwObject["ipv4-address"] = value.event.objects[0]["ipv4-address"]
    toastr.success(`${gwObject.name} LOADED`, 'Object Loading status')
    enableButtons()
}

function parseCurrentCpuChart(data) {
    let x = [];
    let y = [];
    for (var i = 0; i < data.length; i++) {
        x.push("CPU_" + data[i]['CPU']);
        y.push(data[i]['%idle']);
    }
    console.log(`parseCharts => x: ${x}, y:${y}`)
    return [x, y]
}

function csvToJSON(csv) {
    console.log(`csvToJSON => Parsing the following csv: ${(csv)}`)
    var lines = csv.split("\n");
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
    console.log(`csvToJSON => The following data has been parsed: ${JSON.stringify(result)}`)
    return result;
}

function parseCpviewCpuChart(cpuNum, value) {
    console.log(`parseCpviewCpuChart => Parsing the following value into charts data: ${JSON.stringify(value)}`)
    let data_list = []

    for (let cpu = 0; cpu < cpuNum; cpu++) {
        let x = [];
        let y = [];
        for (var i = 0; i < value.length; i++) {
            if (cpu == value[i].cpu) {
                var date = new Date(value[i].time *1000);
                x.push(date);
                y.push(value[i].usage);
            }
        }
        data_list.push({"name": cpu, "x": x, "y": y})
    }
    console.log(`parseCpviewCpuChart => Parsed data: ${JSON.stringify(data_list)}`)
    return data_list
}

function checkNumOfCpus(data) {
    console.log(`checkNumOfCpus => Checking the number of CPUs in the following output: ${JSON.stringify(data)}`);
    let maxCpuNum = 0;
    for (var i = 0; i < data.length; i++){
        console.log(JSON.stringify(data[i]))
        let cpu = parseInt(data[i].cpu)
        console.log(cpu)
        if (data[i].cpu >= maxCpuNum) {
            maxCpuNum = data[i].cpu;
        } else {
            maxCpuNum += 1
            console.log(`checkNumOfCpus => The number of CPUs is ${maxCpuNum}`)
            return maxCpuNum
        }
    }
}

function parseCpviewOutput(value){
    console.log(`parseCpviewOutput => Parsing the following value: ${JSON.stringify(value)}`)
    let task = JSON.parse(value[0].replace(/.*?{/, '{').replace(/}/, '}'))
    let response = atob(task.tasks[0]['task-details'][0].responseMessage)
    let jsonFromCsv = csvToJSON(response)
    let cpuNum = checkNumOfCpus(jsonFromCsv)
    let scatterData = parseCpviewCpuChart(cpuNum, jsonFromCsv)
    createScatter(scatterData)
}

// todo: use this function later on
function parseOutput(data) {
    let response = atob(data.tasks[0]['task-details'][0].responseMessage)
    let error = atob(task.tasks[0]['task-details'][0].responseError)
}