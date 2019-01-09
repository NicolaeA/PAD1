var net = require('net');
//var queue = require('queue');
var JsonSocket = require('json-socket');
var transalteToXML = require('./translator')
//var q = queue();
var publishers = [];
// Keep track of the chat clients
var clients = [];
var results = [];
var abonati = [];
var count = 0;
var port1 = 5000;
var port2 = 6000;

var server = net.createServer();
server.listen(port1);


server.on('connection', function (socket) {

    socket = new JsonSocket(socket);

    // Put this new client in the list
    clients.push(socket);

    socket.on('message', function (message) {
        if (message.mes != "ok") { }
        //Notification
        if (message.functia == "publica")
            for (i = 0; i < abonati.length; i++)
                if (abonati[i].abonat == "1") abonati[i].socket.sendMessage({ "sms": message.message, "id": abonati[i].id });

        //Transmision de mesages    
        if (message.functia == "transmite") {
            results.push(message.message.toString());
            var fs = require('fs');
            fs.writeFile("./mesaje.txt",message.message.toString(), function (err) {
                if (err) {
                    return console.log(err);
                }

                console.log("");
            });
            console.log(results);
        } else if (message.command) {
            abonati.push({ "id": count++, "socket": socket, "abonat": message.abonat });
            var mesaj = results.shift();
            var mesajXml = transalteToXML(mesaj);

            if (message.command == "xml")
                socket.sendMessage(mesajXml);
            else
                socket.sendMessage({ "sms": mesaj });
        }
    });



    socket.on('end', function () {
        clients.splice(clients.indexOf(socket), 1);
        console.log("Disconnected\n");
    });

});


console.log("Server running at 127.0.0.1:5000");

module.exports.abonati = abonati;