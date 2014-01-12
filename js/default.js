// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }

            args.setPromise(WinJS.UI.processAll().then(function() {
                var rating_control = document.getElementById("rating_control").winControl;
                rating_control.addEventListener("change", rating_change_handler, false);

                var hello_button = document.getElementById("hello_button");
                hello_button.addEventListener("click", hello_button_click_handler, false);

                var name_input = document.getElementById("name");
                name_input.addEventListener("change", name_input_changed);

                /* Updating Application State */
                var roaming_settings = Windows.Storage.ApplicationData.current.roamingSettings;

                var stored_name = roaming_settings.values["nameInput"];
                if (stored_name) {
                    name_input.value = stored_name;
                    var hello_output = document.getElementById("hello_output");
                    hello_output.innerText = "Hello " + stored_name + "!";
                }

                var stored_rating = roaming_settings.values["rating"];
                if (stored_rating) {
                    rating_control.userRating = stored_rating;
                    var rating_output = document.getElementById("rating_output");
                    rating_output.innerText = stored_rating;
                }
            }));
        }
    };

    function add_to_app_context(key, value) {
        var roaming_settings = Windows.Storage.ApplicationData.current.roamingSettings;
        roaming_settings.values[key] = value;
    }

    function name_input_changed(eventInfo) {
        add_to_app_context("nameInput", eventInfo.srcElement.value);
    }

    function hello_button_click_handler(eventInfo) {
        var name = document.getElementById("name").value;
        if (name.trim().length > 0) {
            document.getElementById("hello_output").innerText = "Hello " + name + "!";
        }
    }

    function rating_change_handler(eventInfo) {
        var rating_value = eventInfo.detail.tentativeRating;
        document.getElementById("rating_output").innerText = rating_value;
        add_to_app_context("rating", rating_value);
    }

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    app.start();
})();
