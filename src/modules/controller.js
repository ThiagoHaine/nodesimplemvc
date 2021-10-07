const RequestData = require("../classes/RequestData");

function returnHTML(action, response, request){
    if (!typeof action.html === "function"){
        response.send(action.html);
    }

    return new Promise(send=>{
        action.html(send, new RequestData().Process(request));
    }).then((html)=>{
        let redirect = html.match(/^redirect: ((?:https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b)?\/{0,1}(?:[-a-zA-Z0-9@:%_\+.~#?&//=]*))$/);

        if (redirect)
            response.redirect(redirect[1]);
        else
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