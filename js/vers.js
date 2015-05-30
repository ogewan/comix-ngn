var vers_ix = {
	status: 0,//alpha
	major: 7,
	minor: 8,
	version: function() {return this.status.toString()+"."+this.major.toString()+"."+this.minor.toString();},
    changelog: {
        "0.5.0": "Initial Setup, Versioning",
        "0.7.5": "Added Dependencies (JS): (jquery.min, angular-touch.min, angular.min[Update],bootstrap.min), Carousel for slides, real-time reactivity",
        "0.7.7": "Retooled carousel buttons, added page count checker",
        "0.7.8": "Minor Modifications, page is aligned to center, index.html is cleaned up",
    },
}
var vers_wr = {
	status: 0,//alpha
	major: 8,
	minor: 0,
	version: function() {return this.status.toString()+"."+this.major.toString()+"."+this.minor.toString();},
    changelog: {
        "0.5.0": "Initial Setup, Versioning",
        "0.8.0": "Huge implementations, Object config by dynamic form injection for Page and Chapter, Setting config compartmentalized, design config added",
    },
}