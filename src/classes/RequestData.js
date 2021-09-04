class RequestData{
    form;
    files;
    queryString;
    session;

    constructor(){
        this.queryString = "";
        this.files = "";
        this.form = "";
        this.session = undefined;
    }

    process(req){
        this.queryString = req.query;
        this.files = req.files;
        this.form = req.fields;
        this.session = req.session;

        return this;
    }
}

module.exports = RequestData;