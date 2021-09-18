const express = require("express");
const app = express();
const controllerBase = require("./controller");
const viewBase = require("./view");
//Request Processing
const formidable = require('express-formidable');
app.use(formidable());

//Session Processing
const cookieParser = require('cookie-parser');
const session = require('express-session');
const sqlite = require("better-sqlite3");
const SqliteStore = require("better-sqlite3-session-store")(session)
const db = new sqlite("sessions.db");


module.exports = (config)=>{
    const port = (config.port || 3000);

    //Session processing
    const oneDay = 1000 * 60 * 60 * 24;
    app.use(session({
        secret: config.sessionSecret || "no secret key",
        saveUninitialized:true,
        store: new SqliteStore({
            client: db, 
            expired: {
              clear: true,
              intervalMs: 900000 //ms = 15min
            }
          }),
        cookie: { maxAge: oneDay * (config.sessionDuration || 1) },
        resave: false 
    }));
    app.use(cookieParser());
    
    //Static folders processing
    if (config.staticFolders){
        config.staticFolders.forEach(staticFolder=>{
            app.use(staticFolder.path, express.static(process.cwd()+staticFolder.folder));
        });
    }
    
    //Controller and View processing
    for(let i=0;i<config.controllers.length;i++){
        let ac = config.controllers[i];
        let dir = process.cwd();
        let actionBase = require(dir + "/src/controller/" + ac + "Controller.js");
        let actions = actionBase((name,model)=>viewBase(ac,name,model));
        controllerBase(app,actions,ac,config);
    }
    
    app.listen(port, function(){
        console.log("The server is running at port "+port);
    });
};