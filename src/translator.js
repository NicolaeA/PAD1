var jsonxml = require('jsontoxml');

module.exports= function(message){
    return jsonxml({
        mesaj: [{ text:message }]
    })
}