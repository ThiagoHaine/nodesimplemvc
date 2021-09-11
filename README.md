# Node Simple MVC
A simple MVC implementation usind Node and Express based on ASP NET MVC.

## Features
1. ASP NET MVC like folder structure
2. Sessions
3. Static files
4. Form handling
5. Template files
6. Angular like data binding with view
7. Examples to help the understanding

## How to use

### Download and start app
Just download one of the releases and run in your powershell: ```npm install``` to install dependencies. Then, to start your app, run ```node server.js```

### Project settings

The project settings are specified inside the **./server.js**, in the **config** constant.

The config structure must be like this:
```
class Config{
    controllers; //a array of strings, with the name of the controllers
    port; //the port that your project will run
    defaultPath; //the default path, here the value normally are 'index'
    defaultController; //the default controller, if no folder are requested by the user
    sessionSecret; //any secret value, to encrypt the session
    sessionDuration; //the session duration, in days
    staticFolders; //a array of static folders
}
```

- Static folders:

To set static folders, just import the `StaticFolder` class in your server.js file:
```
const StaticFolder = require("./src/classes/StaticFolder");
```

The constructor of this class must be like this:
```
new StaticFolder("folderInYourComputer", "/folderInTheRequest");
```

### Creating controllers
To add a controller named **example**, follow these steps:
1. Create a file named **exampleController.js** in the ./src/controller project folder
2. Add **example** to the *controllers* array in the ./server.js file, inside the config
3. Create a **example** folder in the ./src/view project folder

To make the **exampleController.js** work, just import the `Action` class, and your controller file must export a function that returns a array of `Action`:
1. Import the `Action` class:
```
const Action = require("../classes/Action");
``` 
2. Make your controller export a function, the only parameter that you will receive is the `View` function, and your return must be a array:
```
module.exports = (View) =>{
    return [

    ];
}
```
- The constructor of the `Action` class must be like this:
```
new Action(
    (Send, RequestData) => {
        //Your action script here
    },
    "yourPathHere",
    "get" //Here you can pass a single method like this, or a array of methods, like ["get", "post", "put"...]
)
```
- The params `Send` and `RequestData` are used, respectively, to send a response to the request and access the information of the request, this is the `RequestData` structure:
```
class RequestData{
    form;
    files;
    queryString;
    session;
}
```
- The `View` function received by the controller are necessary to return a view file with your action, example, guessing you have a **exampleFile.html** in your ./src/view/example folder, you can do that:
```
...
(Send, RequestData) => {
    Send(
        View("exampleFile",
            {
                //Your model here
            }
        );
    )
}
...
```

### Creating Views

To create view just create a .html file with the name of your view inside the ./src/view/**yourController** folder.

- Data binding

To bind a information sended by your controller with your model, in your html file, just do that:
```
{{ yourModelParamNameHere }}
```

- Layout files

To create a layout file, just add a .html file in the ./src/layout project folder. Inside the layout .html file the marker **@content** will be replaced by your action specific content.

In your controller, to specify a layout in your Action, just add a parameter in your model named "layout". The value of this parameter must be the layout file name without the .html part.