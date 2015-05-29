var vers_ix = {
	status: 0,//alpha
	major: 7,
	minor: 7,
	version: function() {return this.status.toString()+"."+this.major.toString()+"."+this.minor.toString();},
    changelog: {
        "0.5.0": "Initial Setup, Versioning",
        "0.7.5": "Added Dependencies (JS): (jquery.min, angular-touch.min, angular.min[Update],bootstrap.min), Carousel for slides, real-time reactivity",
        "0.7.7": "Retooled carousel buttons, added page count checker",
    },
}
var vers_wr = {
	status: 0,//alpha
	major: 5,
	minor: 0,
	version: function() {return this.status.toString()+"."+this.major.toString()+"."+this.minor.toString();},
    changelog: {
        "0.5.0": "Initial Setup, Versioning",
    },
}