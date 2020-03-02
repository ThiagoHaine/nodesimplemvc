let fs = require("fs");

module.exports = (name,action,model)=>{
    let text = fs.readFileSync("src/view/"+name+"/"+action+".html","utf8");
    let layout = "";
    model = model || undefined;

    if (model!=undefined && model.layout!=undefined){
        layout = fs.readFileSync("src/layout/"+model.layout+".html","utf8");
    }

    if (model!=undefined){
        let t = text.split("{{");
        if (t.length!=1){
            t.filter((v)=>{
                return v.indexOf("}}") > -1
            }).map((v)=>{
                let argm = v.split("}}")[0];
                let resp = "";

                argm = argm.trim();
                if (model[argm]!=undefined && (model[argm].constructor === Array)){
                    for(let j=0;j<model[argm].length;j++){
                        resp += model[argm][j];
                    }
                }else{
                    resp = model[argm];
                }

                text = text.replace("{{ "+argm+" }}",(resp || ""));
            });
        }

    }

    if (layout!="" && layout!=undefined){
        text = layout.replace("@content", text);
    }
    return text;
}