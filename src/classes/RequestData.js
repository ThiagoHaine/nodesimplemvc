class RequestData{
    form;
    files;
    queryString;
    session;
    params;

    constructor(){
        this.queryString = "";
        this.files = "";
        this.form = "";
        this.session = undefined;
        this.params = {};
    }

    Process(req){
        this.queryString = req.query;
        this.files = req.files;
        this.form = req.fields;
        this.session = req.session;
        this.params = req.params;

        return this;
    }
}

module.exports = RequestData;