module.exports = (app,actions,name,config)=>{
    for(let i=0;i<actions.length;i++){
        if (actions[i].path.substr(actions[i].path.length-1,1)=="/"){
            actions[i].path = actions[i].path.substr(0,actions[i].path.length-1);
        }

        let html="";
        if (typeof actions[i].html === "function"){
            html=actions[i].html();
        }else{
            html=actions[i].html;
        }

        app.get("/"+name+"/"+actions[i].path,function(req,resp){resp.send(html);});

        if (actions[i].path==config.defaultPath){
            app.get("/"+name+"/",function(req,resp){resp.send(html);});

            if (name==config.defaultController){
                app.get("/",function(req,resp){resp.send(html);});
            }
        }
    }
};