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
        if(void 0!==slfScr||slfScr!==null||void 0!==cG.disqus.disqus_shortname||cG.disqus.disqus_shortname!==null){
            for(var q = 0;q<slfScr.length;q++){
                if(slfScr[q].src.indexOf("diskus")>=0){
                    cG.disqus = {disqus_shortname:slfScr[q]};
                    break;
                }
            }
            return console.error("CNG Plug-in: Diskus requires a disqus_shortname");
        }
        domReady(function(){/*runs once the DOM is ready*/
            var dsq = document.createElement('script');
            dsq.type = 'text/javascript'; dsq.async = true;
            dsq.src = '//' + cG.disqus.disqus_shortname + '.disqus.com/embed.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
            //cG.disqus.disqus_identifier = '';
            //cG.disqus.disqus_title = '';
            //cG.disqus.disqus_url = '';
            cG.disqus.reset = function(a,b){
                DISQUS.reset({
                    reload: true,
                    config: function(){  
                        this.page.identifier = a;  
                        this.page.url = b;
                    }
                });
            };
            /*cG.queue=cG.queue||[];
            cG.queue.stageInjection=cG.queue.stageInjection||[];
            cG.queue.stageInjection.push("disqus");*/
        });
    }
    else console.error("CNG Plug-in: Diskus must be loaded after comixngn.js");
    /*If you can, minify the plug-in. 
/*Including this file (plugin.cng.js) in to the HTML will have no effect.*/
}();