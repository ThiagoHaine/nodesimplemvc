const Form = require("../classes/Form");

function returnHTML(action, response, request){
    if (!typeof action.html === "function"){
        response.send(action.html);
    }

    return new Promise(send=>{
        action.html(send, new Form().process(request));
    }).then((html)=>{
        response.send(html);
    });
}

module.exports = (app,actions,path,config)=>{
    for(let i=0;i<actions.length;i++){
        let action = actions[i].method;
        let sendAction = (req, resp)=>{returnHTML(actions[i], resp, req)};
        actions[i].path = actions[i].path.replace(/\//g, "");
        path = `/${path}/`;
        
        app[action](path+actions[i].path, sendAction);

        if (actions[i].path==config.defaultPath && action.toLowerCase()=="get"){
            app.get(path, sendAction);

            if (path==`/${config.defaultController}/`){
                app.get("/", sendAction);
            }
        }
    }
};