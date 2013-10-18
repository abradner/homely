//Capability.js
//

var capabilityId = '1';
var deviceId = '1';
var settingColourId = '1';
var settingPowerId = '2';
var initialPower = 0;
var initialColour = 0;
var minPower = 0;
var maxPower = 1;
var initialColour = 0;
var minColour = 0;
var maxColour = 999;
    
var c = new Capability(capabilityId, deviceId, 'Light', 'c', 'http://localhost:3000');
var power = {'type':'Power', 'value':initialPower, 'id':settingPowerId, 'min':minPower, 'max':maxPower};
var colour = {'type':'Colour', 'value':initialColour, 'id':settingColourId, 'min':minColour, 'max':maxColour};
c.makeSetting(power);
c.makeSetting(colour);

//capability.js
describe("Capability Initialisation", function() {
    it("Initialises the device ID correctly", function() {
        expect(c.deviceId).toBe(deviceId);
    });

    it("Initialised the capability ID correctly", function() {
        expect(c.id).toBe(capabilityId);
    });

    it("Initialises the capability name correctly", function() {
        expect(c.name).toBe("c");
    });

    it("Initialises the capability type correctly", function() {
        expect(c.type).toBe("Light");
    });

    it("Initialises the url correctly", function() {
        expect(c.server).toBe("http://localhost:3000");
    });

    it("Initialises the power to 0", function() {
        expect(c.settings[settingPowerId].value).toBe(initialPower);
    });

    it("Initialises the colour to 0", function() {
        expect(c.settings[settingColourId].value).toBe(initialColour);
    });
    
});

//setting.js
describe("Settings Initialisation", function() {
    it("Initialises the capability ID correctly", function() {
        expect(c.settings[settingColourId].cap).toBe(capabilityId);
        expect(c.settings[settingPowerId].cap).toBe(capabilityId);
    });

    it("Initialises the setting ID correctly", function() {
        expect(c.settings[settingColourId].id).toBe(settingColourId);
        expect(c.settings[settingPowerId].id).toBe(settingPowerId);
    });

    it("Initialises the setting type correctly", function() {
        expect(c.settings[settingColourId].type).toBe('Colour');
        expect(c.settings[settingPowerId].type).toBe('Power');
    });

    it("Initialises the value correctly", function() {
        expect(c.settings[settingColourId].value).toBe(initialColour);
        expect(c.settings[settingPowerId].value).toBe(initialPower);
    });

    it("Initialises the div value correctly", function() {
        expect(c.settings[settingColourId].div).toBe(deviceId+'_'+capabilityId+'_'+settingColourId);
        expect(c.settings[settingPowerId].div).toBe(deviceId+'_'+capabilityId+'_'+settingPowerId);
    });

    it("Initialises the divID correctly", function() {
        expect(c.settings[settingColourId].divId).toBe('#'+deviceId+'_'+capabilityId+'_'+settingColourId);
        expect(c.settings[settingPowerId].divId).toBe('#'+deviceId+'_'+capabilityId+'_'+settingPowerId);
        
    });

    it("Initialises the minimum correctly", function() {
        expect(c.settings[settingColourId].min).toBe(minColour);
        expect(c.settings[settingPowerId].min).toBe(minPower);
    });

    it("Initalises the maximum correctly", function() {
        expect(c.settings[settingColourId].max).toBe(maxColour);
        expect(c.settings[settingPowerId].max).toBe(maxPower);
    });

});

//capability.js - TODO stringDisplays, updateToServer, updateDisplays
describe("Capability Functions", function() {
    beforeEach(function() {
        c.settings[settingPowerId].set(initialPower);
        c.settings[settingColourId].set(initialColour);
    });

    it("'updateFromServer' function applies settings correctly", function() {
        c.updateFromServer(settingPowerId, 1);
        expect(c.settings[settingPowerId].value).toBe(1);
    });
 
});

  
//settings.js TODO displayString
describe("Settings Functions", function() {
    beforeEach(function() {
        c.settings[settingPowerId].set(initialPower);
        c.settings[settingColourId].set(initialColour);
    });

    it("'sanitise' function applies settings correctly", function() {
        c.settings[settingPowerId].set(5);
        expect(c.settings[settingPowerId].value).toBe(maxPower);
        c.settings[settingPowerId].set(-2);
        expect(c.settings[settingPowerId].value).toBe(minPower);
        c.settings[settingColourId].set(1111);
        expect(c.settings[settingColourId].value).toBe(maxColour);
        c.settings[settingColourId].set(-50);
        expect(c.settings[settingColourId].value).toBe(minColour);
    });

    it("'set' function sets values correctly", function() {
        expect(c.settings[settingPowerId].value).toBe(initialPower);
        c.settings[settingPowerId].set(maxPower);
        expect(c.settings[settingPowerId].value).toBe(maxPower);
        expect(c.settings[settingColourId].value).toBe(initialColour);
        c.settings[settingColourId].set(111);
        expect(c.settings[settingColourId].value).toBe(111);
    });

    it("'updateDisplay' updates display correctly", function() {
        loadFixtures('slider.html');
        expect($(c.settings[settingColourId].divId)).toHaveValue('0');
        c.settings[settingColourId].set(54);
        c.settings[settingColourId].updateDisplay;
        expect($(c.settings[settingColourId].divId)).toHaveValue('54');
    });
    
    //WHERE FROM?
    
    it("'getValue' function returns correct value from div", function() {
        loadFixtures('slider.html')
        c.settings[settingColourId].set(54);
        c.settings[settingColourId].updateDisplay;
        expect(c.settings[settingColourId].getValue()).toBe('54');
    }); 

}); 

//power-setting.js TODO displayString
describe("Power Setting Functions", function() {
    beforeEach(function() {
        c.settings[settingPowerId].set(initialPower);
    });
    
    it("'updateDisplay' updates power classes correctly", function() {
        loadFixtures('button.html')
        expect($(c.settings[settingPowerId].divId)).toHaveClass('btn-inverse');
        expect($(c.settings[settingPowerId].divId)).toHaveClass('homely-off');
        expect($(c.settings[settingPowerId].divId)).not.toHaveClass('btn-success');
        expect($(c.settings[settingPowerId].divId)).not.toHaveClass('homely-on');
        c.settings[settingPowerId].set(maxPower);
        c.settings[settingPowerId].updateDisplay();
        expect($(c.settings[settingPowerId].divId)).not.toHaveClass('btn-inverse');
        expect($(c.settings[settingPowerId].divId)).not.toHaveClass('homely-off');
        expect($(c.settings[settingPowerId].divId)).toHaveClass('btn-success');
        expect($(c.settings[settingPowerId].divId)).toHaveClass('homely-on');

    });

    it("'togglePower' function works correctly", function() {
        expect(c.settings[settingPowerId].value).toBe(0);
        c.settings[settingPowerId].togglePower();
        expect(c.settings[settingPowerId].value).toBe(1);
    });

    it("'getValue' function returns value", function() {
        expect(c.setting[settingPowerId].getValue()).toBe(0);
        c.settings[settingPowerId].set(1);
        expect(c.setting[settingPowerId].getValue()).toBe(1);
    });
});
/*
describe("Light Object Functions", function() {
    it("Toggles power correctly", function() {
        l.togglePower();
        expect(l.power).toBe(1);
        //l.togglePower();
        //expect(l.power).toBe(0);
    });

    it ("Sets power correctly", function() {
        l.setPower(1);
        expect(l.power).toBe(1);
    });

    it ("Bounds power correctly", function() {
        l.setPower(12);
        expect(l.power).toBe(1);
        l.setPower(-3);
        expect(l.power).toBe(0);
    });

    it ("Sets brightness correctly", function() {
        l.setBrightness(5);
        expect(l.brightness).toBe(5);
    });

    it ("Bounds brightness correctly", function() {
        l.setBrightness(12);
        expect(l.brightness).toBe(9);
        l.setBrightness(-3);
        expect(l.brightness).toBe(0);
    });

    it ("Sets colour correctly", function() {
        l.setColour(32);
        expect(l.colour).toBe(32);
    });
    
    it ("Bounds colour correctly", function() {
        l.setColour(10001);
        expect(l.colour).toBe(999);
        l.setColour(-36);
        expect(l.colour).toBe(0);
    });

});

var kitchenLight = new Light('1', 'Light', 'kitchenLight', 'http://192.168.0.3:3000');

describe ("Test", function() {
        //dom = $('<button type="button" class="btn btn-inverse homely-btn changeableSetting light power homely-off" id="kitchenLight_Power" data-capability-type="Light" data-device-id = "1" data-capability-name="kitchenLight" data-setting-type="Power" data-toggle="button">');

    it("Updates power display correctly", function() {
        loadFixtures('button.html')
        expect($("#kitchenLight_Power")).toHaveClass('btn-inverse');
        expect($("#kitchenLight_Power")).toHaveClass('homely-off');
        expect($("#kitchenLight_Power")).not.toHaveClass('btn-success');
        expect($("#kitchenLight_Power")).not.toHaveClass('homely-on');
        kitchenLight.setPower(1);
        kitchenLight.updatePowerDisplay();
        expect($("#kitchenLight_Power")).not.toHaveClass('btn-inverse');
        expect($("#kitchenLight_Power")).not.toHaveClass('homely-off');
        expect($("#kitchenLight_Power")).toHaveClass('btn-success');
        expect($("#kitchenLight_Power")).toHaveClass('homely-on');
        
    });
});

*//*
var bathroomLight = new Light('1', 'Light', 'bathroomLight', 'http://192.168.0.3:3000');
var livingRoomLight = new Light('1', 'Light', 'livingRoomLight', 'http://192.168.0.3:3000');
describe("Handling clicks", function() {

    it ("Changes the value of the power status when the button is clicked", function() {
        bathroomLight.setPower(0);
        $("#bathroomLight_Power").click();
        expect(bathroomLight.power).toBe(1);

    });

    it("Only affects the element that is clicked", function() {
        bathroomLight.setPower(0);
        livingRoomLight.setPower(0);
        $("#bathroomLight_Power").click();
        expect(bathroomLight.power).toBe(1);
        expect(livingRoomLight.power).toBe(0);
    });

    it("Adjusts the power classes for turning off", function() {
        bathroomLight.setPower(0);
        expect($('#bathroomLight_Power')).toHaveClass('btn-inverse');
        expect($('#bathroomLight_Power')).not.toHaveClass('btn-success');
    });

    it("Adjusts the power classes for turning on", function() {
        bathroomLight.setPower(1);
        expect($('#bathroomLight_Power')).toHaveClass('btn-success');
        expect($('#bathroomLight_Power')).not.toHaveClass('btn-inverse');
    });

});*/
