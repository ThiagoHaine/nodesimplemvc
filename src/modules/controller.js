const RequestData = require("../classes/RequestData");

function returnHTML(action, response, request){
    if (!typeof action.html === "function"){
        response.send(action.html);
    }

    return new Promise(send=>{
        action.html(send, new RequestData().process(request));
    }).then((html)=>{
        response.send(html);
    });
}

module.exports = (app,actions,path,config)=>{
    path = `/${path}/`;

    for(let i=0;i<actions.length;i++){
        let methods = actions[i].method;
        let sendAction = (req, resp)=>{returnHTML(actions[i], resp, req)};
        actions[i].path = actions[i].path.replace(/\//g, "");
        
        methods.forEach(method=>{
            app[method](path+actions[i].path, sendAction);
        })
        
        if (actions[i].path==config.defaultPath && !!methods.find(a=>a=="get")){
            app.get(path, sendAction);

            if (path==`/${config.defaultController}/`){
                app.get("/", sendAction);
            }
        }
    }
};