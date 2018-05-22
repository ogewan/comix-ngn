///RETRIEVAL//
//Retrieve additional parameters from script tag
!function(){
    //get all scripts
    var selfScript = document.getElementsByTagName("SCRIPT"),
        pass=0;//checks if search is succesful
    //if no scripts can be found ATM, simply quit
    if(void 0!==selfScript||selfScript!==null){
        //iterate over all scripts till you find this one, (comixngn.min) matches as well
        for(var q = 0;q<selfScript.length;q++){
            if(selfScript[q].src.indexOf("comixngn")>=0){//found one
                selfScript = selfScript[q];
                pass=1;
                break;
            }
        }
        if(!pass) return -1;//return if not found
        //check for comicID, no getAttribute if we have cG.comicID
        cG.comicID = cG.comicID||selfScript.getAttribute("comicID");
        //change default plugin
        if(selfScript.getAttribute("plugin") !== void 0&&selfScript.getAttribute("plugin")!==null){
            var plugin = selfScript.getAttribute("plugin").replace(/\s+/g, '').split(',');
            cG.root = plugin;
            /*mutliplugin priority not implemented*/
            /*for(var w = 0;w<disables.length;w++){
                if(disables[w]==""||disables[w]===void 0||disables[w]==" ") continue;
                cG.dis[disables[w]]=true;
            }*/
        }
        if(selfScript.getAttribute("disable") !== void 0&&selfScript.getAttribute("disable")!==null){
            var disables = selfScript.getAttribute("disable").replace(/\s+/g, '').split(',');
            for(var w = 0;w<disables.length;w++){
                if(disables[w]==""||disables[w]===void 0||disables[w]==" ") continue;
                cG.dis[disables[w]]=true;
            }
        }
        if(selfScript.getAttribute("VERSION") !== void 0&&selfScript.getAttribute("VERSION")!==null){
            cG.info.vix=selfScript.getAttribute("VERSION");//version override
        }
        if(selfScript.getAttribute("air") !== void 0&&selfScript.getAttribute("air")!==null){
            cG.recyclebin.air=selfScript.getAttribute("air");//asset path override
        }
        if(selfScript.getAttribute("fBox") !== void 0&&selfScript.getAttribute("fBox")!==null){
            cG.fBox = JSON.parse(selfScript.getAttribute("fBox"));//asset path override
        }
    }
}();
!function(){
    /*AJAX Calls*/
    /*debugging: ensures cG is correctly instaniated*//*console.log(cG);*/
    var dir,
        tir,
        src = document.getElementsByTagName("SCRIPT");
    for (var i = 0; i < src.length; i++) {
        if(src[i].src.indexOf("comixngn")>=0||src[i].src.indexOf(".cng.")>=0){
            dir=src[i].getAttribute("dir");
            tir=src[i].getAttribute("tir");
            break;
        }
    }
    dir=dir||"";
    tir=tir||"";
    if(cG.root=="") cG.root="def";
    if(void 0===cG.REPO.scReq.getScript){/*create script.json promise if not already created*/
        cG.REPO.scReq.getScript = cG.agent(dir+'script.json');
        cG.REPO.scReq.getScript.then(
            function(data, xhr) {
                cG.script = cG.REPO.script.def = data;
            },
            function(data, xhr) {
                if(cG.info.vrb>=4) console.error(data, xhr.status);
                else if(cG.info.vrb>=1) cG  .verbose(1,dir+'script.json not found')
                cG.script = cG.REPO.script.def = 0;
            });
    }
    if(void 0===cG.REPO.scReq.getDecor){
        cG.REPO.scReq.getDecor = cG.agent(tir+'decor.html');
        cG.REPO.scReq.getDecor.then(
            function(data, xhr) {
                cG.decor = cG.REPO.decor.def = data;
            },
            function(data, xhr) {
                if(cG.info.vrb>=4) console.error(data, xhr.status);
                cG.decor = cG.REPO.decor.def = 0;
            });
    }
    if(void 0===cG.REPO.scReq.getCtrls){
        cG.REPO.scReq.getCtrls = cG.agent(tir+'ctrls.html');
        cG.REPO.scReq.getCtrls.then(
            function(data, xhr) {
                cG.ctrls = cG.REPO.ctrls.def = data;
            },
            function(data, xhr) {
                if(cG.info.vrb>=4) console.error(data, xhr.status);
                cG.ctrls = cG.REPO.ctrls.def = 0;
            });
    }
    /*END AJAX calls*/
}();