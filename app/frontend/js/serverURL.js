/* Collection of functions for setting the server url */

/* Creates a form for input */
var newServerURLField = function() {
    var ret = "<form name='serverUrlForm'>";

    ret += "<input type='text' id='serverUrl' value="+Android.getServerUrl()+" onkeypress='return handleNewServerUrl(event)'/>";
    ret += "</form>";

    return ret;
}

/* Passes the results to the Android app for storage */
var handleNewServerUrl = function(e) {
    if (e.keyCode == 13) {
        Android.setServerUrl($('#serverUrl').val());
    }
    return true;
}
