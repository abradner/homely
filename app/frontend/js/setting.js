/* Setting object - contains the current value of a setting */
$.Class.extend("Setting", {

    /* Constructor function */
    init: function(data, serverUrl){
        this.capId = data["capability_id"];
        this.deviceId = data["device_id"];
        this.roomId = data["room_id"];
        this.id = data["id"];
        this.name = data["name"];
        this.value = data["value"];
        this.min = data["min"];
        this.max = data["max"];

        // Div ID for display updates
        this.div = this.deviceId + "_" + this.capId + "_" + this.id;
        this.divId = "#" + this.div;

        // URL for updating to the server
        capType = devices[this.deviceId].capabilities[this.capId].type;
        this.url = serverUrl + '/devices/' + this.deviceId + '/capabilities/' + this.capId + '/' + capType.toLowerCase() + '_set_' + this.name.toLowerCase();
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
                'id': uuid
		'auth_token': Android.getToken()
            },
            timeout: 600000, // sets timeout to 1 second
        })
        .fail($.proxy(function(data, textStatus, jqXHR){
            alert(textStatus +":"+ jqXHR.errorThrown);
            Android.serverError(this.deviceId, this.name);
        }, this))
        .done($.proxy(function(){
            //this.updateFromServer.call(this, newValue);
            //Android.serverSuccess(this.deviceId, this.name);
        }, this));
    },

    /* Update the setting & display after we receive an update from the server */
    updateFromServer: function (value) {
        this.set(value);
        this.updateDisplay();
    }
});
