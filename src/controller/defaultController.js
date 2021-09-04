const Action = require("../classes/Action");

module.exports = (View) =>{
    return [
        new Action(
            (send, formData)=>{
                send("oi");
            }
        )
    ]
}