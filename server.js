const app = require("./src/modules/route");
const config = {
    controllers: ["default"],
    port: 3000,
    defaultPath: "index",
    defaultController: "default"
};
app(config);