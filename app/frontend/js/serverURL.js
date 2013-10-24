/* Collection of functions for setting the server url */

/* Passes the results to the Android app for storage */
var handleNewServerUrl = function(e) {
    if (e.keyCode == 13) {
        Android.setServerUrl($('#serverUrl').val());
    }
    return true;
}
