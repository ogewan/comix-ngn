/** @preserve Bellerophon: Comix-Ngn plugin
Wraps pegasus.js to load files asynchronously
pegasus: typicode.github.io/pegasus (MIT) (c) 2014 typicode
Order: before comixNgn.js
*/
!function(){
    if(typeof cG === 'undefined'){
        var dir = "";
        var tir = "";
        var src = document.getElementsByTagName("SCRIPT");
        //console.log(src);
        for (i = 0; i < src.length; i++) { 
            dir=src[i].getAttribute("dir");
            if(dir!="") break;
        }
        for (i = 0; i < src.length; i++) { 
            tir=src[i].getAttribute("template");
            if(tir!="") break;
        }
        if (1||void 0==dir) dir="";
        //if (dir[dir.length-1]!="/") dir +="/";
        if (1||void 0==tir) tir="";
        //if (tir[tir.length-1]!="/") tir =bse+tir+"/";
        if(void 0===$GPC) var $GPC = 1;
        else $GPC++;
        var cG = {/*comic-ng pre everything here will be overwritten*/
            agent: function(t,e){return e=new XMLHttpRequest,e.open("GET",t),t=[],e.onreadystatechange=e.then=function(n,o,i){if(n&&n.call&&(t=[,n,o]),4==e.readyState&&(i=t[0|e.status/200]))try{i(JSON.parse(e.responseText),e)}catch(r){i(e.responseText,e)}},e.send(),e},
            REPO: {}
        };
        var getScript = cG.agent(dir+'script.json'),
            getDecor = cG.agent(tir+'decor.html');
        getScript.then(
            function(data, xhr) {
                if(void 0===cG.REPO.script) cG.REPO.script = {def:data};
                else cG.REPO.script.def = data;
                cG.script = cG.REPO.script.def;
            },
            function(data, xhr) {
                console.error(data, xhr.status);
                if(void 0===cG.REPO.script) cG.REPO.script = {def:0};
                else cG.REPO.script.def = data;
                cG.script = cG.REPO.script.def;
            });
        getDecor.then(
            function(data, xhr) {
                if(void 0===cG.REPO.decor) cG.REPO.decor = {def:data};
                else cG.REPO.decor.def = data;
                cG.decor = cG.REPO.decor.def;
            },
            function(data, xhr) {
                console.error(data, xhr.status);
                if(void 0===cG.REPO.decor) cG.REPO.decor = {def:0};
                else cG.REPO.decor.def = 0;
                cG.decor = cG.REPO.decor.def;
            });
    }
    else window.console.debug("CNG Plug-in: Bellerophon must be loaded before comixngn.js");
}();