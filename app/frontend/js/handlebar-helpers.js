/* A set of templating helpers for printing out the correct setting type */
Handlebars.registerHelper("isPower", function(settingName, options) {
    var fnTrue=options.fn, fnFalse=options.inverse;
    return settingName == 'Power' ? fnTrue() : fnFalse();
});
Handlebars.registerHelper("isColour", function(settingName, options) {
    var fnTrue=options.fn, fnFalse=options.inverse;
    return settingName == 'Colour' ? fnTrue() : fnFalse();
});
Handlebars.registerHelper("isRow", function(index, options) {
    var fnTrue=options.fn, fnFalse=options.inverse;
    return index % 2 == 0 ? fnTrue() : fnFalse();
});
Handlebars.registerHelper("isntRow", function(index, options) {
    var fnTrue=options.fn, fnFalse=options.inverse;
    return index % 2 == 1 ? fnTrue() : fnFalse();
});