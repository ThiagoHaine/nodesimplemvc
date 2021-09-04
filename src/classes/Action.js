class Action{
    path;
    method;
    html;

    constructor(html, path, method){
        this.html = html || "";
        this.path = path || "index";

        if (method){
            if (typeof method === "string"){
                this.method = [method];
            }else{
                this.method = method
            }
        }else{
            this.method = ["get"];
        }
    }
}

module.exports = Action;