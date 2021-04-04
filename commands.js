
function runCurrentCpuFetch() {
    let command = String.raw`mpstat -P ALL 1 1 | grep -v Average | sed -r "s/\s+/,/g" | grep -v all | grep -A 100 idle`
    // console.log(`getCpuLoadFromCpview => Running the following command ${command}`)

    runScript("getCurrentCpu", command, "parseCurrentCPUOutput", gwObject.name)
}

function getCpuLoadFromCpview() {
    let command = String.raw`echo "time,cpu,usage" ; sqlite3 -csv /var/log/opt/CPshrd-R80.40/cpview_services/cpview_services.dat "SELECT Timestamp, name_of_cpu, cpu_usage from UM_STAT_UM_CPU_UM_CPU_ORDERED_TABLE" | tail -n 10000; echo !`
    console.log(`getCpuLoadFromCpview => Running the following command ${command}`)
    runScript("getCpviewData", command, "parseCpviewOutput", gwObject.name)
}

