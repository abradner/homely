/* Capability Object - stores the settings */
$.Class.extend("Capability", {
    // constructor function
    init : function(id, deviceId, type, name){
        this.id = id;
        this.deviceId = deviceId;
        this.type = type;
        this.name = name;
        this.settings = {};
    },

    /* Creates a setting based on the json/dict and stores it in the capability's setting dict */
    makeSetting: function(settingInfo, serverUrl) {
        var type = settingInfo['name'];
        var id = settingInfo['id'];
        var value = settingInfo['value'];
        var min = settingInfo['min'];
        var max = settingInfo['max'];
        var setting;
        // The only hard coding of setting names - different setting types have different functions
        switch (type) {
            case 'Power':
                setting = new Power(this.deviceId, this.id, id, type, value, min, max, serverUrl);
                break;
            case 'Colour':
                setting = new Colour(this.deviceId, this.id, id, type, value, min, max, serverUrl);
                break;
            default:
                setting = new Setting(this.deviceId, this.id, id, type, value, min, max, serverUrl);
        }
        this.settings[settingInfo['id']] = setting;
    },

    /* Gets the string output for displaying on screen */
    stringDisplay: function () {
        var box = "\
        <!-- New Capability Accordion -->\
            <div class='accordion-group'>\
                <div class='accordion-heading'>\
                <a class='accordion-toggle' data-toggle='collapse' data-parent='#device"+this.deviceId+"'\ href='#capability"+this.id+"'>\
                <strong><span>"+this.name+"</span></strong>\
                        -\
                        <em><span>"+this.type+"</span></em>\
                    </a>\
                </div>\
                <div id='capability"+this.id+"' class='accordion-body collapse'>\
                    <div class='accordion-inner span10 offset1 center'>\
                        <!-- Start Capability Box -->";

        // For each setting within the capability, add its display on
        $.each(this.settings, function(id, setting) {
            box = box + setting.displayString() + '<br/>';
        });

        box = box + "   <!-- End Capability Box -->\
                    </div>\
                </div>\
            </div>\
            <!-- End Capability Accordion -->";

        return box;
    },

    /* Updates the visual display of each setting
    Usually only used on first set up to sync with the server. */
    updateDisplays: function () {
        $.each(this.settings, function(id, object) {
            object.updateDisplay();
        });
    },

});