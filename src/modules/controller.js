function returnHTML(action, resp){
    if (!typeof action.html === "function"){
        return action.html;
    }

    return new Promise(send=>{
        action.html(send);
    }).then((html)=>{
        resp.send(html);
    });
}

module.exports = (app,actions,path,config)=>{
    for(let i=0;i<actions.length;i++){
        let action = actions[i].method || "get";
        let sendAction = (req, resp)=>{returnHTML(actions[i], resp)};
        actions[i].path = actions[i].path.replace(/\//g, "");
        path = `/${path}/`;
        
        app[action](path+actions[i].path, sendAction);

        if (actions[i].path==config.defaultPath && action.toLowerCase()=="get"){
            app.get(path, sendAction);

            if (path==config.defaultController){
                app.get("/", sendAction);
            }
        }
    }
};