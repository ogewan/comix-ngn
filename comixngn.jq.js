(function() {
    var attempts = 0;
    var cngjq = function(){
        if(window.jQuery===void 0||cG===void 0){
            if(attempts>20){
                if(window.jQuery===void 0) console.error("jQuery is taking to long to load, are you sure it is included?")
                if(cG===void 0) console.error("comix-ngn is taking to long to load, are you sure it is included?")
                return -1
            }
            attempts++;
            return window.setTimeout(cngjq,300);
        }
        jQuery.fn.stageInjection = function() {
            return this.each( function() {
                //console.log($(this).context)
                cG.cPanel=cG.stageInjection($(this).context);
            });
        }
    }
    cngjq();
}());