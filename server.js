const app = require("./src/modules/route");
const config = {
    controllers: [],
    port: 3000,
    defaultPath: "index",
    defaultController: "principal"
};
app(config);