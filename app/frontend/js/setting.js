/* Setting object - contains the current value of a setting */
$.Class.extend("Setting", {

    /* Constructor function */
    init: function(data, serverUrl, roomId, deviceId){
        this.id = data["id"];
        this.name = data["name"];
        this.value = data["value"];
        this.min = data["min"];
        this.max = data["max"];
        this.capId = data["capability_id"];
        this.deviceId = deviceId;
        this.roomId = roomId;
        // Div ID for display updates
        this.div = this.id;
        this.divId = "#" + this.div;
        // URL for updating to the server
        capType = "P9813";
        this.url = serverUrl + '/devices/' + this.deviceId + '/capabilities/' + this.capId + '/' + capType.toLowerCase() + '_set_' + this.name.toLowerCase();
        alert(this.url);
    },

    /* Sanitise the input to prevent errors */
    sanitise: function(v) {
        v = Math.max(this.min, v);
        v = Math.min(v, this.max);
        return v;
    },

    /* Set the value */
    set: function(v) {
        v = this.sanitise(v);
        this.value = v;
    },

    /* Update the display with the new value */
    updateDisplay: function () {
        $(this.divId).val(this.value);
    },

    /* Get the user-updated value. Sliders have inbuilt data sores. */
    getChangedValue: function () {
        return $(this.divId).val();
    },

    /* Send the new state to the server */
    updateToServer: function (newValue) {
        var success = true;
        var serverResponse = $.ajax({
            type: 'GET',
            url: this.url,
            data: {
                // Consider changing 'value': to be this.name:
                'value': newValue,
                'id': uuid,
		        'auth_token': Android.getToken()
            },
            timeout: 600000, // sets timeout to 1 second
        })
        .fail($.proxy(function(data, textStatus, jqXHR){
            alert(textStatus +":"+ jqXHR.errorThrown);
            Android.serverError(this.deviceId, this.name);
        }, this));
    },

    /* Update the setting & display after we receive an update from the server */
    updateFromServer: function (value) {
        this.set(value);
        this.updateDisplay();
    }
});
