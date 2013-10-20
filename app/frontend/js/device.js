$.Class.extend("Device", {
    // constructor function
    init : function(id, type, name){
        this.id = id;
        this.type = type;
        this.name = name;
        this.capabilities = {};
    },

    makeCapability: function(capId, capType, capName) {
        this.capabilities[capId] = new Capability(capId, this.id, capType, capName);
    },

/*    stringDisplays: function () {
        var str = '';
        $.each(this.capabilities, function(id, object) {
            str = str + object.displayStrings() + '<br/>';
            // MAKE THIS A NEW ACCORDION??
        });
        return str;
    },*/

    updateDisplays: function () {
        $.each(this.capabilities, function(id, object) {
            object.updateDisplays();
        });
    }

});