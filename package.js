const app = require("./src/modules/route");
const StaticFolder = require("./src/classes/StaticFolder");

const defaultConfig = {
    controllers: [],
    port: 3000,
    defaultPath: "index",
    defaultController: "default",
    sessionSecret: "my_secret_here",
    sessionDuration: 2,
    staticFolders: [
    ]
};

exports.DefaultConfig = defaultConfig;
exports.Action = require("./src/classes/Action");
exports.StaticFolder = require("./src/classes/StaticFolder");
exports.Config = require("./src/classes/Config");
exports.Run = (config)=>{
    if (!config){
        config = defaultConfig;
    }

    app(config);
}
