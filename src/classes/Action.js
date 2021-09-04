class Action{
    path;
    method;
    html;

    constructor(html, path, method){
        this.html = html || "";
        this.path = path || "index";
        this.method = method || "get";
    }
}

module.exports = Action;