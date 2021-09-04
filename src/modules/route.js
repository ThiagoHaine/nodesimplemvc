const express = require("express");
const app = express();
const controllerBase = require("./controller");
const viewBase = require("./view");



module.exports = (config)=>{
    const port = (config.port || 3000);
    var ac = ""; //actual controller

    function view(name,model){
        return viewBase(ac,name,model);
    }
    
    for(let i=0;i<config.controllers.length;i++){
        ac = config.controllers[i];
        let actionBase = require("../controller/"+ac+"Controller.js");
        let actions = actionBase(view);
        controllerBase(app,actions,ac,config);
    }
    
    app.listen(port, function(){
        console.log("The server is running at port "+port);
    });
};