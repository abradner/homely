//Tests: homely/app/frontend/js/ capability.js colour-setting.js power-setting.js setting.js
//TODO: devices.js mockAndroid.js script.js

var capabilityId = '1';
var deviceId = '1';
var roomId = '1';
var settingColourId = '1';
var settingPowerId = '2';
var initialPower = 0;
var minPower = 0;
var maxPower = 1;
var initialColour = "FFFFFF";
var minColour = 0;
var maxColour = 999;
var divColour = '1';
var divPower = '2';

var serverUrl = 'http://localhost:3000';
var power = {'name':'Power', 'value':initialPower, 'id':settingPowerId, 'min':minPower, 'max':maxPower, 'capability_id':capabilityId};
var colour = {'name':'Colour', 'value':initialColour, 'id':settingColourId, 'min':minColour, 'max':maxColour, 'capability_id':capabilityId};
var settings = {};
addSetting(power, serverUrl, roomId, deviceId, 'Light');

//setting.js
describe("Settings Initialisation:", function() {

    beforeEach(function() {
        loadFixtures("colourwheel.html");
    });

    it("Initialises the capability ID correctly", function() {
        addSetting(colour, serverUrl, roomId, deviceId, 'Light');

        expect(settings[settingColourId].capId).toBe(capabilityId);
        expect(settings[settingPowerId].capId).toBe(capabilityId);
    });

    it("Initialises the device ID correctly", function() {
        expect(settings[settingColourId].deviceId).toBe(deviceId);
        expect(settings[settingPowerId].deviceId).toBe(deviceId);
    });

    it("Initialises the setting ID correctly", function() {
        expect(settings[settingColourId].id).toBe(settingColourId);
        expect(settings[settingPowerId].id).toBe(settingPowerId);
    });

    it("Initialises the setting type correctly", function() {
        expect(settings[settingColourId].name).toBe('Colour');
        expect(settings[settingPowerId].name).toBe('Power');
    });

    it("Initialises the value correctly", function() {
        expect(settings[settingColourId].value).toBe(initialColour);
        expect(settings[settingPowerId].value).toBe(initialPower);
    });

    it("Initialises the div value correctly", function() {
        expect(settings[settingColourId].div).toBe(divColour);
        expect(settings[settingPowerId].div).toBe(divPower);
    });

    it("Initialises the divID correctly", function() {
        expect(settings[settingColourId].divId).toBe('#'+ divColour);
        expect(settings[settingPowerId].divId).toBe('#'+ divPower);

    });

    it("Initialises the minimum correctly", function() {
        expect(settings[settingColourId].min).toBe(minColour);
        expect(settings[settingPowerId].min).toBe(minPower);
    });

    it("Initalises the maximum correctly", function() {
        expect(settings[settingColourId].max).toBe(maxColour);
        expect(settings[settingPowerId].max).toBe(maxPower);
    });

    it("Initalises the update URL correctly", function() {
    expect(settings[settingColourId].url).toBe(serverUrl+"/devices/1/capabilities/1/light_set_colour");
    expect(settings[settingPowerId].url).toBe(serverUrl+"/devices/1/capabilities/1/light_set_power");
    });

});

//colour-setting.js
describe("Colour setting initalisation:", function() {
    it("Displays the colour wheel", function() {
        loadFixtures("colourwheel.html");
        addSetting(colour, serverUrl, roomId, deviceId, 'Light');
        expect($('#'+divColour)).toExist();
        expect($('#'+divColour+'_input')).toExist();
        expect($('#'+divColour)).toContain('svg');
    });
});


//setting.js
describe("Settings Functions:", function() {
    beforeEach(function() {
        loadFixtures("colourwheel.html");
        addSetting(colour, serverUrl, roomId, deviceId, 'Light');
        settings[settingPowerId].set(initialPower);
        settings[settingColourId].set(initialColour);
    });

    it("'sanitise' function applies settings correctly", function() {
        settings[settingPowerId].set(5);
        expect(settings[settingPowerId].value).toBe(maxPower);
        settings[settingPowerId].set(-2);
        expect(settings[settingPowerId].value).toBe(minPower);
    });

    it("'set' function sets values correctly", function() {
        expect(settings[settingPowerId].value).toBe(initialPower);
        settings[settingPowerId].set(maxPower);
        expect(settings[settingPowerId].value).toBe(maxPower);
        expect(settings[settingColourId].value).toBe(initialColour);
        settings[settingColourId].set("#ABABAB");
        expect(settings[settingColourId].value).toBe("ABABAB");
    });

    /*
    it("'updateDisplay' updates display correctly", function() {
        loadFixtures('slider.html');
        expect($(settings[settingColourId].divId)).toHaveValue('0');
        settings[settingColourId].set(54);
        settings[settingColourId].updateDisplay();
        expect($(settings[settingColourId].divId)).toHaveValue('54');
    });


    it("'getValue' function returns correct value from div", function() {
        loadFixtures('slider.html')
        settings[settingColourId].set(54);
        settings[settingColourId].updateDisplay();
        expect(settings[settingColourId].getChangedValue()).toBe('54');
    });*/

    it("'updateFromServer' function applies settings correctly", function() {
        settings[settingPowerId].updateFromServer(1);
        expect(settings[settingPowerId].value).toBe(1);
    });

    it("'updateToSever' function sends correct data accross", function() {
        var val = 1;
        spyOn($,'ajax').andCallFake( function (params) { 
            expect(params.type).toBe('GET');
            expect(params.url).toBe(settings[settingPowerId].url);
            expect(params.data['value']).toBe(val);
            return {fail: function(){}};
        });
        settings[settingPowerId].updateToServer(val);
        val = 0;
        settings[settingPowerId].updateToServer(val);
    });
    
    it ("'updateToServer' function's error function has correct behaviour", function() {
        var wasCalled = false;
        spyOn(Android, 'serverError').andCallFake (function (id, name) {
            expect(id).not.toBe(undefined);
            expect(name).not.toBe(undefined);
            expect(id).toBe(settings[settingPowerId].deviceId);
            expect(name).toBe(settings[settingPowerId].name);
            wasCalled = true;
        });
        spyOn($,'ajax').andCallFake( function (params) { 
            return {fail: function(fail_func){
                expect(fail_func).not.toBe(undefined);
                expect(typeof fail_func).toBe("function");
                fail_func("", "Something went wrong", {errorThrown: "Like this"});
            }};
        });
        settings[settingPowerId].updateToServer(0);
        expect(wasCalled).toBe(true);
    });


});

//colour-setting.js
describe("Colour Setting Functions:", function() {

    it("'sanitise' function adjusts values correctly", function() {
        settings[settingColourId].set("#000000");
        expect(settings[settingColourId].value).toBe("000000");
        settings[settingColourId].set("#ABABAB");
        expect(settings[settingColourId].value).toBe("ABABAB");
        settings[settingColourId].set("#FFFFFF");
        expect(settings[settingColourId].value).toBe("FFFFFF");
        settings[settingColourId].set("AAAAAA");
        expect(settings[settingColourId].value).toBe("AAAAAA");
        settings[settingColourId].set(-5);
        expect(settings[settingColourId].value).toBe("000");
        settings[settingColourId].set(54);
        expect(settings[settingColourId].value).toBe("000");
        settings[settingColourId].set("GGGGGG");
        expect(settings[settingColourId].value).toBe("000");
        settings[settingColourId].set("AAAAiA");
        expect(settings[settingColourId].value).toBe("000");
    });

    it("'updateToServer' function sends the correct data", function() {
        var val = 'AAAAAA';
        spyOn($,'ajax').andCallFake( function (params) { 
            expect(params.type).toBe('GET');
            expect(params.url).toBe(settings[settingColourId].url);
            expect(params.data['value']).toBe(val);
            return {fail: function(){return {done: function(){}}}};
        });
        settings[settingColourId].updateToServer(val);
        val = 'BBBBBB';
        settings[settingColourId].updateToServer(val);
    });
    
    it ("'updateToServer' function's error function has correct behaviour", function() {
        var wasCalled = false;
        spyOn(Android, 'serverError').andCallFake (function (id, name) {
            expect(id).not.toBe(undefined);
            expect(name).not.toBe(undefined);
            expect(id).toBe(settings[settingColourId].deviceId);
            expect(name).toBe(settings[settingColourId].name);
            wasCalled = true;
        });
        spyOn($,'ajax').andCallFake( function (params) { 
            return {fail: function(fail_func){
                expect(fail_func).not.toBe(undefined);
                expect(typeof fail_func).toBe("function");
                fail_func("", "Something went wrong", {errorThrown: "Like this"});
                return {done: function(){}};
            }};
        });
        settings[settingColourId].updateToServer(0);
        expect(wasCalled).toBe(true);
    });

    it ("'updateToServer' function's done function has correct behaviour", function() {
        var newVal = '0F0F0F';
        spyOn($,'ajax').andCallFake( function (params) { 
            return {fail: function(){
                return {done: function(done_func){
                    expect(done_func).not.toBe(undefined);
                    expect(typeof done_func).toBe("function");
                    done_func();
                    expect(settings[settingColourId].value).toBe(newVal);
                }};
            }};
        });
        settings[settingColourId].updateToServer(newVal);
        newVal = 'B0B0B0';
        settings[settingColourId].updateToServer(newVal);
    });
});


//power-setting.js
describe("Power Setting Functions:", function() {
    beforeEach(function() {
        settings[settingPowerId].set(initialPower);
    });

    it("'updateDisplay' updates power classes correctly - turn on", function() {
        loadFixtures('button.html')
        expect($(settings[settingPowerId].divId)).toHaveClass('btn-inverse');
        expect($(settings[settingPowerId].divId)).toHaveClass('homely-off');
        expect($(settings[settingPowerId].divId)).not.toHaveClass('btn-success');
        expect($(settings[settingPowerId].divId)).not.toHaveClass('homely-on');
        settings[settingPowerId].set(maxPower);
        settings[settingPowerId].updateDisplay();
        expect($(settings[settingPowerId].divId)).not.toHaveClass('btn-inverse');
        expect($(settings[settingPowerId].divId)).not.toHaveClass('homely-off');
        expect($(settings[settingPowerId].divId)).toHaveClass('btn-success');
        expect($(settings[settingPowerId].divId)).toHaveClass('homely-on');
    });

    it("'updateDisplay' updates power classes correctly - turn off", function() {
        settings[settingPowerId].set(maxPower);
        loadFixtures('button.html')
        settings[settingPowerId].updateDisplay();
        expect($(settings[settingPowerId].divId)).not.toHaveClass('btn-inverse');
        expect($(settings[settingPowerId].divId)).not.toHaveClass('homely-off');
        expect($(settings[settingPowerId].divId)).toHaveClass('btn-success');
        expect($(settings[settingPowerId].divId)).toHaveClass('homely-on');
        settings[settingPowerId].set(minPower);
        settings[settingPowerId].updateDisplay();
        expect($(settings[settingPowerId].divId)).toHaveClass('btn-inverse');
        expect($(settings[settingPowerId].divId)).toHaveClass('homely-off');
        expect($(settings[settingPowerId].divId)).not.toHaveClass('btn-success');
        expect($(settings[settingPowerId].divId)).not.toHaveClass('homely-on');
    });

    it("'togglePower' function works correctly", function() {
        expect(settings[settingPowerId].value).toBe(0);
        settings[settingPowerId].togglePower();
        expect(settings[settingPowerId].value).toBe(1);
    });

    it("'getValue' function returns value", function() {
        settings[settingPowerId].set(1);
        expect(settings[settingPowerId].getChangedValue()).toBe(0);
        settings[settingPowerId].set(0);
        expect(settings[settingPowerId].getChangedValue()).toBe(1);
    });
});

describe("Power button object:", function() {
    it("Changes the value of power when the button is clicked", function() {
        loadFixtures('button.html');
        expect(settings[settingPowerId].value).toBe(minPower);
        $(settings[settingPowerId].divId).click();
        // Changes the changedValue, not necessarily the actual value (that only happens on server confirmation
        expect(settings[settingPowerId].getChangedValue()).toBe(maxPower);
    });
});
