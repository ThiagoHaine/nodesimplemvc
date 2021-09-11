const app = require("./src/modules/route");
const StaticFolder = require("./src/classes/StaticFolder");

const config = {
    controllers: ["default"],
    port: 3000,
    defaultPath: "index",
    defaultController: "default",
    sessionSecret: "my_secret_here",
    sessionDuration: 2,
    staticFolders: [
        new StaticFolder("static", "/lib")
    ]
};

app(config);