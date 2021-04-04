

async function getContext() {
    console.log("getContext => Getting current context")
    smxProxy.sendRequest("get-context", null, "onContext");
}

function runScript(scriptName, scriptCommands, runWhenFinished) {
    hideShowTable()
    console.log(`runScript => running script with the following args: scriptName: '${scriptName}', scriptCommands: '${scriptCommands}', runWhenFinished: '${runWhenFinished}', gwObject: '${gwObject.name}'`);
    smxProxy.sendRequest("request-commit", {"commands" : [`run-script script-name '${scriptName}' script '${scriptCommands}' targets '${gwObject.name}' --format json`]}, `${runWhenFinished}`);
}


