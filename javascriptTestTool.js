var load = "21:27:20,CPU,%user,%nice,%sys,%iowait,%irq,%soft,%steal,%idle,intr\/s\r\n21:27:20,all,0.37,0.01,0.33,0.37,0.02,0.22,0.00,98.69,1156.11\r\n21:27:20,0,0.49,0.02,0.50,0.94,0.09,0.10,0.00,97.85,1156.11\r\n21:27:20,1,0.44,0.00,0.31,0.17,0.00,0.13,0.00,98.11,0.00\r\n21:27:20,2,0.20,0.00,0.19,0.17,0.00,0.37,0.00,98.17,0.00\r\n21:27:20,3,0.33,0.00,0.32,0.17,0.00,0.26,0.00,97.93,0.00\r\n"
      
csvToJSON(load)

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
          if (/%idle|%sys|%user/.test(headers[j].trim())){
            if (/%idle/.test(headers[j].trim())){
              obj['%usage'] = (100 - parseFloat(words[j])).toFixed(2);
              continue;
            }
            obj[headers[j].trim()] = parseFloat(words[j]);
          }
      }

      result.push(obj);
  }
  console.log(result);
}

var string = '["This is what"]'
let jsonDataStr = string.replace(/'/g, '\"');
console.log(JSON.parse(jsonDataStr))


var output = ["---------------------------------------------Time: [21:27:28] 26/1/2021---------------------------------------------\"gw1 - getCurrentCpu\"  succeeded  (100%)  {  \"tasks\" : [ {    \"uid\" : \"c3b8e7d9-aa11-4450-99bd-08df20d23fdc\",    \"name\" : \"gw1 - getCurrentCpu\",    \"type\" : \"CdmTaskNotification\",    \"domain\" : {      \"uid\" : \"41e821a0-3720-11e3-aa6e-0800200c9fde\",      \"name\" : \"SMC User\",      \"domain-type\" : \"domain\"    },    \"task-id\" : \"b37e019a-d6bc-46fa-8fa5-eb07904fdbef\",    \"task-name\" : \"gw1 - getCurrentCpu\",    \"status\" : \"succeeded\",    \"progress-percentage\" : 100,    \"start-time\" : {      \"posix\" : 1611714447412,      \"iso-8601\" : \"2021-01-26T21:27-0500\"    },    \"last-update-time\" : {      \"posix\" : 1611714448276,      \"iso-8601\" : \"2021-01-26T21:27-0500\"    },    \"suppressed\" : false,    \"task-details\" : [ {      \"uid\" : \"f0296b06-9703-4ca8-bd53-3319b5c4ea5e\",      \"name\" : null,      \"domain\" : {        \"uid\" : \"41e821a0-3720-11e3-aa6e-0800200c9fde\",        \"name\" : \"SMC User\",        \"domain-type\" : \"domain\"      },      \"color\" : \"black\",      \"statusCode\" : \"succeeded\",      \"statusDescription\" : \"Linux 3.10.0-957.21.3cpx86_64 (gw1) 01/26/21 _x86_64_ (4 CPU),  21:27:28 CPU %u, r %nice %, y,  %iowait %irq %, oft %, teal %gue, t %gnice %idle, 21:27:28 all 1.07 0.01 0.69 0.1...\",      \"taskNotification\" : \"c3b8e7d9-aa11-4450-99bd-08df20d23fdc\",      \"gatewayId\" : \"39eb8e10-ef52-418c-9150-7bb293fb904a\",      \"gatewayName\" : \"\",      \"transactionId\" : 946828683,      \"responseMessage\" : \"TGludXggMy4xMC4wLTk1Ny4yMS4zY3B4ODZfNjQgKGd3MSkgCTAxLzI2LzIxIAlfeDg2XzY0XwkoNCBDUFUpCgoyMToyNzoyOCAgICAgQ1BVICAgICV1LHIgICAlbmljZSAgICAlLHksICVpb3dhaXQgICAgJWlycSAgICUsb2Z0ICAlLHRlYWwgICVndWUsdCAgJWduaWNlICAgJWlkbGUKMjE6Mjc6MjggICAgIGFsbCAgICAxLjA3ICAgIDAuMDEgICAgMC42OSAgICAwLjE4ICAgIDAuNDYgICAgMC4yNyAgICAwLjAwICAgIDAuMDAgICAgMC4wMCAgIDk3LjMyCjIxOjI3OjI4ICAgICAgIDAgICAgMC42NSAgICAwLjAxICAgIDAuMjEgICAgMC4xNyAgICAwLjE2ICAgIDAuMjkgICAgMC4wMCAgICAwLjAwICAgIDAuMDAgICA5OC41MQoyMToyNzoyOCAgICAgICAxICAgIDEuNDggICAgMC4wMSAgICAxLjEwICAgIDAuMTUgICAgMC41NyAgICAwLjI0ICAgIDAuMDAgICAgMC4wMCAgICAwLjAwICAgOTYuNDQKMjE6Mjc6MjggICAgICAgMiAgICAwLjgzICAgIDAuMDEgICAgMC41NSAgICAwLjE5ICAgIDAuNTggICAgMC4zMCAgICAwLjAwICAgIDAuMDAgICAgMC4wMCAgIDk3LjU0CjIxOjI3OjI4ICAgICAgIDMgICAgMS4zMiAgICAwLjAxICAgIDAuOTAgICAgMC4yMiAgICAwLjUyICAgIDAuMjQgICAgMC4wMCAgICAwLjAwICAgIDAuMDAgICA5Ni43OQpDUFUgMCwKQ1BVIDEsCWZ3XzIKCWZ3ZCBpbi5hc2Vzc2lvbmQgbXBkYWVtb24gY3ByaWQgY3BkCkNQVSAyLAlmd18xCglmd2QgaW4uYXNlc3Npb25kIG1wZGFlbW9uIGNwcmlkIGNwZApDUFUgMywJZndfMAoJZndkIGluLmFzZXNzaW9uZCBtcGRhZW1vbiBjcHJpZCBjcGQKQWxsLApJbnRlcmZhY2UgZXRoMCwgaGFzIG11bHRpIHF1ZXVlIGVuYWJsZWQKSW50ZXJmYWNlIGV0aDEsIGhhcyBtdWx0aSBxdWV1ZSBlbmFibGVkCkludGVyZmFjZSBldGgyLCBoYXMgbXVsdGkgcXVldWUgZW5hYmxlZApJbnRlcmZhY2UgZXRoMywgaGFzIG11bHRpIHF1ZXVlIGVuYWJsZWQK\",      \"responseError\" : \"\",      \"meta-info\" : {        \"validation-state\" : \"ok\",        \"last-modify-time\" : {          \"posix\" : 1611714448356,          \"iso-8601\" : \"2021-01-26T21:27-0500\"        },        \"last-modifier\" : \"admin\",        \"creation-time\" : {          \"posix\" : 1611714447484,          \"iso-8601\" : \"2021-01-26T21:27-0500\"        },        \"creator\" : \"admin\"      },      \"tags\" : [ ],      \"icon\" : \"General/globalsNa\",      \"comments\" : \"\",      \"display-name\" : \"\",      \"customFields\" : null    } ],    \"comments\" : \"Completed\",    \"color\" : \"black\",    \"icon\" : \"General/globalsNa\",    \"tags\" : [ ],    \"meta-info\" : {      \"lock\" : \"unlocked\",      \"validation-state\" : \"ok\",      \"last-modify-time\" : {        \"posix\" : 1611714448313,        \"iso-8601\" : \"2021-01-26T21:27-0500\"      },      \"last-modifier\" : \"admin\",      \"creation-time\" : {        \"posix\" : 1611714447466,        \"iso-8601\" : \"2021-01-26T21:27-0500\"      },      \"creator\" : \"admin\"    },    \"read-only\" : false  } ]}"]
console.log(JSON.parse(output[0].replace(/.*?{/, '{').replace(/}/, '}')))
