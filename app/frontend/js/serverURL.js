var getServerUrl = function() {
    var ret = Android.getServerUrl();
    return ret;
}

var newServerURLField = function() {
    var ret = "<form name='serverUrlLForm'>";

    ret += "<input type='text' id='serverUrl' value="+getServerUrl()+" onkeypress='return handleNewServerUrl(event)'/>";
    ret += "</form>";

    return ret;
}

var handleNewServerUrl = function(e) {
    if (e.keyCode == 13) {
        Android.setServerUrl($('#serverUrl').val());
    }
    return true;
}
