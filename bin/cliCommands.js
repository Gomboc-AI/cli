export var ActionCommand;
(function (ActionCommand) {
    ActionCommand["SCAN"] = "scan";
})(ActionCommand || (ActionCommand = {}));
export var ServiceCommand;
(function (ServiceCommand) {
    ServiceCommand["CLOUDFORMATION"] = "cloudformation";
    ServiceCommand["TERRAFORM"] = "terraform";
})(ServiceCommand || (ServiceCommand = {}));
export var ClientCommand;
(function (ClientCommand) {
    ClientCommand["GITHUB"] = "github";
    ClientCommand["GITLAB"] = "gitlab";
})(ClientCommand || (ClientCommand = {}));
