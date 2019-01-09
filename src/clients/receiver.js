var net = require('net');
var JsonSocket = require('json-socket');
var client = new JsonSocket(new net.Socket());
var readlineSync = require('readline-sync');

//deschiere interfata scrirer
var format = readlineSync.question('In ce format alegi xml/json?');
var abonat = readlineSync.question('La care abonat?');
client.connect(5000, '127.0.0.1');

    client.on('connect', function () {
        client.sendMessage({ "command": format,
                            "abonat":abonat });
        
        client.on('message', function (message) {
            client.sendMessage({"mes":"ok"});
            console.log(message.sms);
        });
    });


    client.on('close', function () {
        process.exit();
    });


