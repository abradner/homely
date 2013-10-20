$.Class.extend("Setting", {
    // constructor function
    init: function(deviceId, cap, id, name, value, min, max, serverUrl){
        this.cap = cap;
        this.deviceId = deviceId;
        this.id = id;
        this.name = name;
        this.value = value;

        this.div = this.cap.deviceId + "_" + this.cap.id + "_" + this.id;
        this.divId = "#" + this.div;
        this.min = min;
        this.max = max;

        deviceType = devices[this.deviceId].type;
        this.url = serverUrl + '/devices/' + this.deviceId + '/capabilities/' + this.cap.id + '/' + this.cap.type.toLowerCase() + '_set_' + this.name.toLowerCase();
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
        var capId = this.cap.id;
        return "<input type='range' class='changeableSetting' name='slider' id='"+this.div+"' data-capability-id='"+this.cap.id+"' data-device-id = '"+this.deviceId+"' data-id='"+this.id+"' value='"+this.value+"' min='"+this.min+"' max='"+this.max+"'";
    },

    getValue: function () {
        return $(this.divId).val();
    },


    /* Send the new state to the server */
    updateToServer: function (f, newValue) {
        var success = true;

        var serverResponse = $.ajax({
            type: 'POST',
            url: this.url,
            data: {
                // Consider changing 'value': to be this.name:
                'value': newValue //'value': newValue
            },
            timeout: 60000 // sets timeout to 3 seconds
        })
        .fail($.proxy(function(data, textStatus, jqXHR){
            alert(textStatus +","+ jqXHR.errorThrown);
            Android.serverError(this.deviceId, this.name);
        }, this))
        .done($.proxy(function(){
            updateFromServer.call(this, newValue);
            Android.serverSuccess(this.deviceId, this.name);
        }, this));
    },
    /* Update the setting & display after we receive an update from the server */
    updateFromServer: function (value) {
        this.set(value);
        this.updateDisplay();
    }
});