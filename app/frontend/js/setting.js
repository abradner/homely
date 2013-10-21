$.Class.extend("Setting", {
    // constructor function
    init: function(deviceId, capId, id, name, value, min, max, serverUrl){
        this.capId = capId;
        this.deviceId = deviceId;
        this.id = id;
        this.name = name;
        this.value = value;

        this.div = this.deviceId + "_" + this.capId + "_" + this.id;
        this.divId = "#" + this.div;
        this.min = min;
        this.max = max;

        deviceType = devices[this.deviceId].type;
        capType = devices[this.deviceId].capabilities[this.capId].type;

        this.url = serverUrl + '/devices/' + this.deviceId + '/capabilities/' + this.capId + '/' + capType.toLowerCase() + '_set_' + this.name.toLowerCase();
    },

    sanitise: function(v) {
        v = Math.max(this.min, v);
        v = Math.min(v, this.max);
        return v;
    },

    set: function(v) {
        v = this.sanitise(v);
        this.value = v;
    },

    updateDisplay: function () {
        $(this.divId).val(this.value);
    },

    displayString: function () {
        return "<input type='range' class='changeableSetting' name='slider' id='"+this.div+"' data-capability-id='"+this.capId+"' data-device-id = '"+this.deviceId+"' data-id='"+this.id+"' value='"+this.value+"' min='"+this.min+"' max='"+this.max+"'";
    },

    getChangedValue: function () {
        return $(this.divId).val();
    },

    /* Send the new state to the server */
    updateToServer: function (f, newValue) {
        var success = true;
        var serverResponse = $.ajax({
            type: 'GET',
            url: this.url,
            data: {
                // Consider changing 'value': to be this.name:
                'value': newValue
            },
            timeout: 600000 // sets timeout to 1 second
        })
        .fail($.proxy(function(data, textStatus, jqXHR){
            alert(textStatus +","+ jqXHR.errorThrown);
            Android.serverError(this.deviceId, this.name);
        }, this))
        .done($.proxy(function(){
            this.updateFromServer.call(this, newValue);
            Android.serverSuccess(this.deviceId, this.name);
        }, this));
    },

    /* Update the setting & display after we receive an update from the server */
    updateFromServer: function (value) {
        this.set(value);
        this.updateDisplay();
    }
});