const Action = require("../classes/Action");

module.exports = (View) =>{
    return [
        new Action(
            (Send)=>{
                let randomNumber = Math.round(Math.random() * 1000);

                Send(View("index", {
                    layout: "simple",
                    title: "index",
                    randomNumber: randomNumber
                }));
            }
        ),
        new Action(
            (Send, formData)=>{
                let numbers = ["1", "2", "3", "4", "5"];
                let list = `<ul><li>${numbers.join("</li><li>")}</li></ul>`;

                Send(View("list", {
                    layout: "simple",
                    title: "list",
                    list: list
                }))
            },
            "list"
        )
    ]
}