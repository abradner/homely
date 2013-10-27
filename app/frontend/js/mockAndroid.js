/* Class that implements everything the JSI does for the backend
Useful for testing in a browser - this removes errors for 'Android not defined' */
$.Class.extend("MockAndroid", {

    serverSuccess: function (deviceId, name) {
    },

    serverError: function (deviceId, name) {
    },

    getServerUrl: function() {
        return 'localhost';
    },

    getToken: function() {
        return '';
    }
});
