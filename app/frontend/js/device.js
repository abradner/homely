/* Device Object - Stores the capabilities */
$.Class.extend("Device", {
    // constructor function
    init : function(id, type, name){
        this.id = id;
        this.type = type;
        this.name = name;
        this.capabilities = {};
    },

    /* Creates a new capability and saves it in this.capabilities */
    makeCapability: function(capId, capType, capName) {
        this.capabilities[capId] = new Capability(capId, this.id, capType, capName);
    },

    /* Returns the string for a device box/accordion */
    stringDisplay: function () {
        var box = "<div class='container-fluid device'>\
                    <!-- Start Device Accordion !-->\
                    <div class='accordion-heading'>\
                        <a class='accordion-toggle' data-toggle='collapse' data-parent='#devices'\ href='#device"+this.id+"'>\
                            <strong><span>"+this.name+"</span></strong>\
                            -\
                            <em><span>"+this.type+"</span></em>\
                        </a>\
                    </div>\
                    <div id='device"+this.id+"' class='accordion-body collapse'>\
                        <div class='accordion-inner' span10 offset1' id='device'" + this.id + ">";

        $.each(this.capabilities, function (key, cap) {
            box = box + cap.stringDisplay();
        });

        box = box + "   </div>\
                    </div>\
                    <!-- End Device Accordion -->\
                </div>";
        return box;
    },

    /* Update the display of each setting */
    updateDisplays: function () {
        $.each(this.capabilities, function(id, object) {
            object.updateDisplays();
        });
    }

});