var vvar1;
var vers_ix = {
	status: 0,//alpha
	major: 9,
	minor: 8,
	version: function() {return this.status.toString()+"."+this.major.toString()+"."+this.minor.toString();},
    changelog: {
        "0.5.0": "Initial Setup, Versioning",
        "0.7.5": "Added Dependencies (JS): (jquery.min, angular-touch.min, angular.min[Update],bootstrap.min), Carousel for slides, real-time reactivity",
        "0.7.7": "Retooled carousel buttons, added page count checker",
        "0.7.8": "Minor Modifications, page is aligned to center, index.html is cleaned up",
        "0.8.2": "caruso updated, controls are now hid automatically, date is now formated, appifying the stage",
        "0.9.8": "stage.html template created, index html cleaned up, added isrc(imaginary source) attribute to preload images but not implemented yet",
    },
}
var vers_wr = {
	status: 0,//alpha
	major: 9,
	minor: 6,
	version: function() {return this.status.toString()+"."+this.major.toString()+"."+this.minor.toString();},
    changelog: {
        "0.5.0": "Initial Setup, Versioning",
        "0.8.0": "Huge implementations, Object config by dynamic form injection for Page and Chapter, Setting config compartmentalized, design config added",
        "0.9.0": "added pyoofreader configuration, added continue a config file, but its not implemented script wise yet, pyoofreader not fully implemented yet",
        "0.9.6": "pyoofreader gets its own version, continue config fully implemented, cosmetic changes, now able to download a stage and a template index.html",
    },
}
var vers_pr = {
	status: 0,//alpha
	major: 1,
	minor: 0,
	version: function() {return this.status.toString()+"."+this.major.toString()+"."+this.minor.toString();},
    changelog: {
        "0.1.0": "Implemented version, counts page dif and warns of Mismatch",
    },
}