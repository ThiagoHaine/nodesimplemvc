function parseData(data){
    let obj = {};
    let infos = data.split("&");

    for(let i=0;i<infos.length;i++){
        let info = infos[i].split("=");

        obj[info[0]]=info[1];
    }

    return obj;
}

function returnHTML(action,data){
    data = data || undefined;
    if (typeof action.html === "function"){
        if (data==undefined){
            return action.html();
        }else{
            return action.html(parseData(data));
        }
    }else{
        return action.html;
    }
}

module.exports = (app,actions,name,config)=>{
    for(let i=0;i<actions.length;i++){
        if (actions[i].path.substr(actions[i].path.length-1,1)=="/"){
            actions[i].path = actions[i].path.substr(0,actions[i].path.length-1);
        }


        let action = actions[i].method || "get";

        switch(action.toLowerCase()){
            case "get":
            default:
                app.get("/"+name+"/"+actions[i].path,function(req,resp){ resp.send(returnHTML(actions[i]));});
                break;
            case "post":
                app.post("/"+name+"/"+actions[i].path,function(req,resp){ 
                    let data = "";
                    req.on("data",function(chunk){
                        data += chunk;
                    });
                    req.on("end",function(){
                        resp.send(returnHTML(actions[i],data));
                    });
                });
                break;
        }
        

        if (actions[i].path==config.defaultPath && action.toLowerCase()=="get"){
            app.get("/"+name+"/",function(req,resp){resp.send(returnHTML(actions[i]));});

            if (name==config.defaultController){
                app.get("/",function(req,resp){resp.send(returnHTML(actions[i]));});
            }
        }
    }
};