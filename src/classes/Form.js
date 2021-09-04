class Form{
    data;
    files;
    queryString;

    constructor(){
        this.queryString = "";
        this.files = "";
        this.data = "";
    }

    process(req){
        this.queryString = req.query;
        this.files = req.files;
        this.data = req.fields;

        return this;
    }
}

module.exports = Form;