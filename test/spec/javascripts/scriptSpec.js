//Tests: homely/app/frontend/js/ capability.js colour-setting.js power-setting.js setting.js
//TODO: devices.js mockAndroid.js script.js

var capabilityId = '1';
var deviceId = '1';
var settingColourId = '1';
var settingPowerId = '2';
var initialPower = 0;
var minPower = 0;
var maxPower = 1;
var initialColour = "FFFFFF";
var minColour = 0;
var maxColour = 999;
var divColour = '1_1_1';
var divPower = '1_1_2';

var d = new Device(deviceId, "Arduino", "Emulated Arduino");
devices[deviceId] = d;
var c = new Capability(capabilityId, deviceId, 'Light', 'c');
d.capabilities[capabilityId] = c;
var serverUrl = 'http://localhost:3000';
var power = {'name':'Power', 'value':initialPower, 'id':settingPowerId, 'min':minPower, 'max':maxPower};
var colour = {'name':'Colour', 'value':initialColour, 'id':settingColourId, 'min':minColour, 'max':maxColour};
c.makeSetting(power, serverUrl);


//capability.js
describe("Capability Initialisation:", function() {
    
    /*beforeEach(function() {
        loadFixtures("colourwheel.html");
        c.makeSetting(colour, serverUrl);
    });*/

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

    it("Initialises the power to 0", function() {
        expect(c.settings[settingPowerId].value).toBe(initialPower);
    });

    it("Initialises the colour to FFFFFF", function() {
        loadFixtures("colourwheel.html");
        c.makeSetting(colour, serverUrl);
        expect(c.settings[settingColourId].value).toBe(initialColour);
    });

});

//setting.js
describe("Settings Initialisation:", function() {
    it("Initialises the capability ID correctly", function() {
        expect(c.settings[settingColourId].capId).toBe(capabilityId);
        expect(c.settings[settingPowerId].capId).toBe(capabilityId);
    });

    it("Initialises the device ID correctly", function() {
        expect(c.settings[settingColourId].deviceId).toBe(deviceId);
        expect(c.settings[settingPowerId].deviceId).toBe(deviceId);
    });

    it("Initialises the setting ID correctly", function() {
        expect(c.settings[settingColourId].id).toBe(settingColourId);
        expect(c.settings[settingPowerId].id).toBe(settingPowerId);
    });

    it("Initialises the setting type correctly", function() {
        expect(c.settings[settingColourId].name).toBe('Colour');
        expect(c.settings[settingPowerId].name).toBe('Power');
    });

    it("Initialises the value correctly", function() {
        expect(c.settings[settingColourId].value).toBe(initialColour);
        expect(c.settings[settingPowerId].value).toBe(initialPower);
    });

    it("Initialises the div value correctly", function() {
        expect(c.settings[settingColourId].div).toBe(divColour);
        expect(c.settings[settingPowerId].div).toBe(divPower);
    });

    it("Initialises the divID correctly", function() {
        expect(c.settings[settingColourId].divId).toBe('#'+ divColour);
        expect(c.settings[settingPowerId].divId).toBe('#'+ divPower);

    });

    it("Initialises the minimum correctly", function() {
        expect(c.settings[settingColourId].min).toBe(minColour);
        expect(c.settings[settingPowerId].min).toBe(minPower);
    });

    it("Initalises the maximum correctly", function() {
        expect(c.settings[settingColourId].max).toBe(maxColour);
        expect(c.settings[settingPowerId].max).toBe(maxPower);
    });

    it("Initalises the update URL correctly", function() {
    expect(c.settings[settingColourId].url).toBe(serverUrl+"/devices/1/capabilities/1/light_set_colour");
    expect(c.settings[settingPowerId].url).toBe(serverUrl+"/devices/1/capabilities/1/light_set_power");
    });

});

//colour-setting.js 
describe("Colour setting initalisation:", function() {
    it("Displays the colour wheel", function() {
        loadFixtures("colourwheel.html");
        c.makeSetting(colour, serverUrl);
        expect($('#'+divColour)).toExist();
        expect($('#'+divColour+'_input')).toExist();
        expect($('#'+divColour)).toContain('svg');
    });
});

//capability.js - TODO makeSetting, updateDisplays
describe("Capability Functions:", function() {
    beforeEach(function() {
    });

    it("'updateDisplays' function correctly updates setting displays", function() {
        loadFixtures('powercolour.html');
        c.makeSetting(colour, serverUrl);
        //c.settings[settingPowerId].set(initialPower);
        //c.settings[settingColourId].set(initialColour);
        expect($('#'+divPower)).toHaveClass('btn-inverse');
        expect($('#'+divPower)).toHaveClass('homely-off');
        expect($('#'+divPower)).not.toHaveClass('btn-success');
        expect($('#'+divPower)).not.toHaveClass('homely-on');
        expect($('#'+divColour+'_input')).toHaveValue('#ffffff');
        c.settings[settingPowerId].set(maxPower);
        c.settings[settingPowerId].set('#112233');
        c.updateDisplays();
        expect($('#'+divPower)).not.toHaveClass('btn-inverse');
        expect($('#'+divPower)).not.toHaveClass('homely-off');
        expect($('#'+divPower)).toHaveClass('btn-success');
        expect($('#'+divPower)).toHaveClass('homely-on');
        //expect($('#'+divColour+'_input')).toHaveValue('#112233');
    });

});


//setting.js
describe("Settings Functions:", function() {
    beforeEach(function() {
        loadFixtures("colourwheel.html");
        c.makeSetting(colour, serverUrl);
        c.settings[settingPowerId].set(initialPower);
        c.settings[settingColourId].set(initialColour);
    });
    
    it("'sanitise' function applies settings correctly", function() {
        c.settings[settingPowerId].set(5);
        expect(c.settings[settingPowerId].value).toBe(maxPower);
        c.settings[settingPowerId].set(-2);
        expect(c.settings[settingPowerId].value).toBe(minPower);
    });
    
    it("'set' function sets values correctly", function() {
        expect(c.settings[settingPowerId].value).toBe(initialPower);
        c.settings[settingPowerId].set(maxPower);
        expect(c.settings[settingPowerId].value).toBe(maxPower);
        expect(c.settings[settingColourId].value).toBe(initialColour);
        c.settings[settingColourId].set("#ABABAB");
        expect(c.settings[settingColourId].value).toBe("ABABAB");
    });
    
    /*
    it("'updateDisplay' updates display correctly", function() {
        loadFixtures('slider.html');
        expect($(c.settings[settingColourId].divId)).toHaveValue('0');
        c.settings[settingColourId].set(54);
        c.settings[settingColourId].updateDisplay();
        expect($(c.settings[settingColourId].divId)).toHaveValue('54');
    });


    it("'getValue' function returns correct value from div", function() {
        loadFixtures('slider.html')
        c.settings[settingColourId].set(54);
        c.settings[settingColourId].updateDisplay();
        expect(c.settings[settingColourId].getChangedValue()).toBe('54');
    });*/

    it("'updateFromServer' function applies settings correctly", function() {
        c.settings[settingPowerId].updateFromServer(1);
        expect(c.settings[settingPowerId].value).toBe(1);
    });


});

//colour-setting.js
describe("Colour Setting Functions:", function() {
   
    it("'sanitise' function adjusts values correctly", function() {
        c.settings[settingColourId].set("#000000");
        expect(c.settings[settingColourId].value).toBe("000000");
        c.settings[settingColourId].set("#ABABAB");
        expect(c.settings[settingColourId].value).toBe("ABABAB");
        c.settings[settingColourId].set("#FFFFFF");
        expect(c.settings[settingColourId].value).toBe("FFFFFF");
        c.settings[settingColourId].set("AAAAAA");
        expect(c.settings[settingColourId].value).toBe("AAAAAA");
        c.settings[settingColourId].set(-5);
        expect(c.settings[settingColourId].value).toBe("000");
        c.settings[settingColourId].set(54);
        expect(c.settings[settingColourId].value).toBe("000");
        c.settings[settingColourId].set("GGGGGG");
        expect(c.settings[settingColourId].value).toBe("000");
        c.settings[settingColourId].set("AAAAiA");
        expect(c.settings[settingColourId].value).toBe("000");
    });
});

        
//power-setting.js
describe("Power Setting Functions:", function() {
    beforeEach(function() {
        c.settings[settingPowerId].set(initialPower);
    });

    it("'updateDisplay' updates power classes correctly - turn on", function() {
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

    it("'updateDisplay' updates power classes correctly - turn off", function() {
        c.settings[settingPowerId].set(maxPower);
        loadFixtures('button.html')
        c.settings[settingPowerId].updateDisplay();
        expect($(c.settings[settingPowerId].divId)).not.toHaveClass('btn-inverse');
        expect($(c.settings[settingPowerId].divId)).not.toHaveClass('homely-off');
        expect($(c.settings[settingPowerId].divId)).toHaveClass('btn-success');
        expect($(c.settings[settingPowerId].divId)).toHaveClass('homely-on');
        c.settings[settingPowerId].set(minPower);
        c.settings[settingPowerId].updateDisplay();
        expect($(c.settings[settingPowerId].divId)).toHaveClass('btn-inverse');
        expect($(c.settings[settingPowerId].divId)).toHaveClass('homely-off');
        expect($(c.settings[settingPowerId].divId)).not.toHaveClass('btn-success');
        expect($(c.settings[settingPowerId].divId)).not.toHaveClass('homely-on');

    });

    it("'togglePower' function works correctly", function() {
        expect(c.settings[settingPowerId].value).toBe(0);
        c.settings[settingPowerId].togglePower();
        expect(c.settings[settingPowerId].value).toBe(1);
    });

    it("'getValue' function returns value", function() {
        c.settings[settingPowerId].set(1);
        expect(c.settings[settingPowerId].getChangedValue()).toBe(0);
        c.settings[settingPowerId].set(0);
        expect(c.settings[settingPowerId].getChangedValue()).toBe(1);
    });
});

describe("Power button object:", function() {
    it("Changes the value of power when the button is clicked", function() {
        loadFixtures('button.html');
        expect(c.settings[settingPowerId].value).toBe(minPower);
        $(c.settings[settingPowerId].divId).click();
        // Changes the changedValue, not necessarily the actual value (that only happens on server confirmation
        expect(c.settings[settingPowerId].getChangedValue()).toBe(maxPower);
    });
});


/*
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

});*/
