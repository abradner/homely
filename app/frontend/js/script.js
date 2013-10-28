/* General Script File*/
var onMobile = false;
var uuid;

$(document).ready(function() {
    // If Android exists then we're on the mobile app, in which case we use touch
    if (window.Android) {
        onMobile = true;
    // If it doesn't then we set up a mock android (to remove errors if its called)
    } else {
        window.Android = new MockAndroid();
    }

    uuid = Math.floor((Math.random()*1000000000000000000000)+1);

    var server = Android.getServerUrl();
    var serverUrl = 'http://'+ server + ':3000';
    var fayeUrl = 'http://'+ server + ':9292/faye';

    // Displays the data from the server
    initialiseData(serverUrl);
    // Connects to the server for updates
    startFaye(fayeUrl);
});

/* Callback for when settings are changed. Updates the server and the display appropriately. */
var handleSettingUpdate = function (event) {
    var id = $(this).attr('id');
    var value = settings[id].getChangedValue();
    settings[id].updateToServer(value);
}

/* Adding content to the page with server JSON and a template
Also creates the device objects for our use*/
var initialiseData = function(serverUrl) {

    // Update the JSON object describing the devices we have access to; if not online it'll skip
    $.getJSON(serverUrl+'/rooms.json', function(data) {
        Android.storeData(data);
    });

    // JSON object describing just the objects we are going to display
    var data = Android.getData();
    data = $.parseJSON(data);
    var params = $.url($(location).attr('href')).param();
    if ('roomId' in params && 'capId' in params) {
        data = filterData(data, params['roomId'], params['capId']);
    } else if ('roomId' in params) {
        data = filterData(data, params['roomId']);
    }

    // JSON object describing just the objects we are going to display
    $.getJSON(serverUrl+'/devices.json?auth_token='+Android.getToken(), function(data) {
        //Get the Template and compile it
        var source   = $("#appTemplate").html();
        var template = Handlebars.compile(source);
        //Replace the body section with the new code.
        var html = template(data);
        document.body.innerHTML = html;
    });
    // Update the page display - initially blank values
    displayTemplate(data);

    // If we're on the settings page we make them (and set them to the right values)
    if ('capId' in params) {
        // Make setting objects
        $.each(data, function (val) {
            //addDevice(data[val], serverUrl);
            addSetting(data[val], serverUrl);
        });
        // Enable callbacks for devices - must be done here because classes don't exist on page load
        if (onMobile) {
            $('#devices').on('touchend', '.changeableSetting', handleSettingUpdate);
        } else {
            $('#devices').on('click change', '.changeableSetting', handleSettingUpdate);
        }
    }
}

/* Display the data on screen - load values into the template */
var displayTemplate = function(data) {
    //Get the Template and compile it
    var source   = $("#appTemplate").html();
    var template = Handlebars.compile(source);
    //Replace the body section with the new code.
    var html = template(data);
    document.body.innerHTML = html;
}

/* Receives broadcasts from the server each time it updates */
var startFaye = function(fayeUrl) {
    var client = new Faye.Client(fayeUrl);
    var subscription = client.subscribe('/connect', function(message) {
        message = $.parseJSON(message);
        var deviceId = message["device"];
        var capabilityId = message["capability"];
        var settingId = message["setting"];
        var value = message["value"];
        var id = message["id"];
        if (id != uuid) {
            settings[settingId].updateFromServer(value);
        }
    });
}


/* Return only the jsonArray we want - e.g. the correct capabilities or settings */
var filterData = function(data, roomId, capId) {
    var retVal = data;
    if(typeof roomId != 'undefined' && typeof capId != 'undefined') {
        $.each(data, function (val) {
            if (data[val]["id"] == roomId) {
                cap = data[val]["capabilities"];
                $.each(cap, function (capVal) {
                    if (cap[capVal]["id"] == capId) {
                        retVal = cap[capVal]["settings"];
                    }
                });
            }
        });
    } else if (typeof roomId != 'undefined') {
        $.each(data, function (val) {
            if (data[val]["id"] == roomId) {
                retVal = data[val]["capabilities"];
            }
        });
    }

    return retVal;
}