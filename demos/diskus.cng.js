/** @preserve Diskus: Comix-Ngn plugin
Adds DISQUS support
[[License/dependency licenses]]
Order: after comixngn.js
*/
!function(){
    if(cG !== void 0){
        if(cG.$GPC === void 0) cG.$GPC = 1;/*Global Plug in count*/
        else cG.$GPC++;
        var slfScr = document.getElementsByTagName("SCRIPT");
        console.log(cG.disqus);
        if((void 0!==slfScr||slfScr!==null)&&(void 0===cG.disqus.shortname||cG.disqus.shortname===null)){
            for(var q = 0;q<slfScr.length;q++){
                if(slfScr[q].src.indexOf("diskus")>=0){
                    cG.disqus = {shortname:slfScr[q]};
                    break;
                }
            }
            return console.error("CNG Plug-in: Diskus requires a disqus_shortname");
        }
        var ready = function(){/*runs once the DOM is ready*/
            console.log("diskus ready running");
            var dsq = document.createElement('script');
            dsq.type = 'text/javascript'; dsq.async = true;
            dsq.src = '//' + cG.disqus.shortname + '.disqus.com/embed.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
            //cG.disqus.disqus_identifier = '';
            //cG.disqus.disqus_title = '';
            //cG.disqus.disqus_url = '';
            cG.queue=cG.queue||{};
            cG.queue.stageChange=cG.queue.stageChange||{};
            cG.queue.stageChange.diskus = function(a,c){
                console.log(c,a.data(),cG.disqus,window.DISQUS);
                if(c){
                    
                }
                else{
                    var b = a.data();
                    cG.disqus.identifier = b.disqus_identifier;
                    cG.disqus.url = b.disqus_url;
                }
                var settheRESET = function(){
                    console.log(window.DISQUS,"setTHERESET");
                    if(window.DISQUS===void 0||window.DISQUS===null){
                        window.DISQUS.reset({
                            reload: true,
                            config: function(){  
                                this.page.identifier = cG.disqus.identifier;  
                                this.page.url = cG.disqus.url;  
                            }
                        });
                    } else setTimeout(settheRESET, 400);
                }
                settheRESET();
            };
            console.log(cG.queue.stageChange.diskus);
            /*cG.queue=cG.queue||[];
            cG.queue.stageInjection=cG.queue.stageInjection||[];
            cG.queue.stageInjection.push("disqus");*/
        }
        window.addEventListener?window.addEventListener("load",ready,!1):window.attachEvent?window.attachEvent("onload",ready):window.onload=ready;
        ready();
    }
    else console.error("CNG Plug-in: Diskus must be loaded after comixngn.js");
    /*If you can, minify the plug-in. 
/*Including this file (plugin.cng.js) in to the HTML will have no effect.*/
}();