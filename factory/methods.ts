///METHODS///
cG.controlInjection = function(stages?: HTMLCollectionOf<Element>) {
    if (!cG.documentcontrolkeyset && cG.fBox.arrow) {
        //Arrow must be enabled and documentcontrol cannot be already set
        cG.documentcontrolkeyset = true;
        document.onkeyup = function(e) {
            //console.log("keydown");
            e = e || window.event;
            if (e.keyCode == 37) cG.comix.prev();
            else if (e.keyCode == 39) cG.comix.next();
            else if (e.keyCode == 82) cG.comix.rand();
        }
    }
    var ctrls = (cG.ctrls) ? cG.ctrls : 
            '<ul>'+
                '<li style="display: inline;"><button class="frst" >|&lt;</button></li>'+
                '<li style="display: inline;"><button class="prev" rel="prev" accesskey="p">&lt; Prev</button></li>'+
                '<li style="display: inline;"><button class="rand" >Random</button></li>'+
                '<li style="display: inline;"><button class="next" rel="next" accesskey="n">Next &gt;</button></li>'+
                '<li style="display: inline;"><button class="last" >&gt;|</button></li>'+
            '</ul>',
        antictrl = '<ul>'+
                '<li style="display: inline;"><button class="last" >&lt;|</button></li>'+
                '<li style="display: inline;"><button class="next" rel="next" accesskey="n">Next &lt;</button></li>'+
                '<li style="display: inline;"><button class="rand" >Random</button></li>'+
                '<li style="display: inline;"><button class="prev" rel="prev" accesskey="p">&gt; Prev</button></li>'+
                '<li style="display: inline;"><button class="frst" >|&gt;</button></li>'+
            '</ul>',
        pod, podling,
        eventer = function(par, chd) {
            par.setAttribute("mind", 1);
            //TODO: INSPECT
            (<HTMLElement> document.getElementById(par.id + "_location")).title = cG.cPanel[par.id].data().hover || "";
            var classstuff = (par.getAttribute("comix")) ? document.getElementsByClassName("cgtitle") : [],
                working,
                classdate = (par.getAttribute("comix")) ? document.getElementsByClassName("cgdate") : [];

            for (var eq = 0; eq < classstuff.length; eq++)
                classstuff[eq].innerHTML = cG.cPanel[par.id].data().title;
            for (var eq = 0; eq < classdate.length; eq++) {
                working = new Date(cG.cPanel[par.id].data().release * 1000);
                classdate[eq].innerHTML = working.toDateString();
            }
            
            var q = document.getElementsByClassName("frst"),
                w = document.getElementsByClassName("prev"),
                e = document.getElementsByClassName("rand"),
                r = document.getElementsByClassName("next"),
                t = document.getElementsByClassName("last"),
                getme = "" + par.id;
            //console.log(q,w,e,r,t,cG.cPanel["def_"+name]);
            //console.log(arguments.callee,chd);
            for (var y = 0; y < q.length; y++) {
                if (chd.getAttribute("cglink") == getme && !q[y].getAttribute("cgae")) q[y].addEventListener("click", function() {
                    var box = cG.cPanel[getme].data(cG.cPanel[getme].frst());
                    document.getElementById(getme + "_location").title = box.hover;
                    var boe = document.getElementById(getme);
                    classstuff = (boe.getAttribute("comix")) ? document.getElementsByClassName("cgtitle") : [];
                    for (var eq = 0; eq < classstuff.length; eq++) classstuff[eq].innerHTML = box.title;
                    classdate = (boe.getAttribute("comix")) ? document.getElementsByClassName("cgdate") : [];
                    for (var eq = 0; eq < classdate.length; eq++) {
                        working = new Date(cG.cPanel[par.id].data().release * 1000);
                        classdate[eq].innerHTML = working.toDateString();
                    }
                });
                q[y].setAttribute("cgae", "1");
            }
            for (var y = 0; y < w.length; y++) {
                if (chd.getAttribute("cglink") == getme && !w[y].getAttribute("cgae")) w[y].addEventListener("click", function() {
                    var box = cG.cPanel[getme].data(cG.cPanel[getme].prev());
                    document.getElementById(getme + "_location").title = box.hover;
                    var boe = document.getElementById(getme);
                    classstuff = (boe.getAttribute("comix")) ? document.getElementsByClassName("cgtitle") : [];
                    for (var eq = 0; eq < classstuff.length; eq++) classstuff[eq].innerHTML = box.title;
                    classdate = (boe.getAttribute("comix")) ? document.getElementsByClassName("cgdate") : [];
                    for (var eq = 0; eq < classdate.length; eq++) {
                        working = new Date(cG.cPanel[par.id].data().release * 1000);
                        classdate[eq].innerHTML = working.toDateString();
                    }
                });
                w[y].setAttribute("cgae", "1");
            }
            for (var y = 0; y < e.length; y++) {
                if (chd.getAttribute("cglink") == getme && !e[y].getAttribute("cgae")) e[y].addEventListener("click", function() {
                    var box = cG.cPanel[getme].data(cG.cPanel[getme].rand());
                    document.getElementById(getme + "_location").title = box.hover;
                    var boe = document.getElementById(getme);
                    classstuff = (boe.getAttribute("comix")) ? document.getElementsByClassName("cgtitle") : [];
                    for (var eq = 0; eq < classstuff.length; eq++) classstuff[eq].innerHTML = box.title;
                    classdate = (boe.getAttribute("comix")) ? document.getElementsByClassName("cgdate") : [];
                    for (var eq = 0; eq < classdate.length; eq++) {
                        working = new Date(cG.cPanel[par.id].data().release * 1000);
                        classdate[eq].innerHTML = working.toDateString();
                    }
                });
                e[y].setAttribute("cgae", "1");
            }
            for (var y = 0; y < r.length; y++) {
                if (chd.getAttribute("cglink") == getme && !r[y].getAttribute("cgae")) r[y].addEventListener("click", function() {
                    var box = cG.cPanel[getme].data(cG.cPanel[getme].next());
                    document.getElementById(getme + "_location").title = box.hover;
                    var boe = document.getElementById(getme);
                    classstuff = (boe.getAttribute("comix")) ? document.getElementsByClassName("cgtitle") : [];
                    for (var eq = 0; eq < classstuff.length; eq++) classstuff[eq].innerHTML = box.title;
                    classdate = (boe.getAttribute("comix")) ? document.getElementsByClassName("cgdate") : [];
                    for (var eq = 0; eq < classdate.length; eq++) {
                        working = new Date(cG.cPanel[par.id].data().release * 1000);
                        classdate[eq].innerHTML = working.toDateString();
                    }
                });
                r[y].setAttribute("cgae", "1");
            }
            for (var y = 0; y < t.length; y++) {
                if (chd.getAttribute("cglink") == getme && !t[y].getAttribute("cgae")) t[y].addEventListener("click", function() {
                    var box = cG.cPanel[getme].data(cG.cPanel[getme].last());
                    document.getElementById(getme + "_location").title = box.hover;
                    var boe = document.getElementById(getme);
                    classstuff = (boe.getAttribute("comix")) ? document.getElementsByClassName("cgtitle") : [];
                    for (var eq = 0; eq < classstuff.length; eq++) classstuff[eq].innerHTML = box.title;
                    classdate = (boe.getAttribute("comix")) ? document.getElementsByClassName("cgdate") : [];
                    for (var eq = 0; eq < classdate.length; eq++) {
                        working = new Date(cG.cPanel[par.id].data().release * 1000);
                        classdate[eq].innerHTML = working.toDateString();
                    }
                });
                t[y].setAttribute("cgae", "1");
            }
        }, 
        exist = document.querySelectorAll('[cglink]'),
        linkcg;
    
    stages = document.getElementsByClassName("venue") /*get all entry points*/;
    for (var v = 0; v < exist.length; v++) {
        linkcg = <string> exist[v].getAttribute("cglink");
        if (setValid(cG.cPanel[linkcg])) {
            cG.cPanel[linkcg].brains = cG.cPanel[linkcg].brains || [];
            cG.cPanel[linkcg].brains.push(exist[v]);
            eventer(document.getElementById(linkcg), exist[v]);
        }
    }

    for (var u = 0; u < stages.length; u++) {
        if (!stages[u].getAttribute("mind")) { //add event handlers
            pod = document.createElement("DIV");
            //check if read direction is reversed
            let { config } = cG.script;
            pod.innerHTML = ((stages[u].getAttribute("readdir") || (config && config.readdir)) && !cG.ctrls) ? antictrl : ctrls;
            podling = pod.children[0];
            if (!stages[u].getAttribute("comix")) podling.setAttribute("style", "display:none;");
            else podling.setAttribute("style", "display:block;");
            podling.setAttribute("cglink", stages[u].id);
            stages[u].parentNode.insertBefore(podling, stages[u].nextSibling);
            //console.log(stages[u],stages[u].nextSibling)
            if (cG.fBox.click) {
                cG.cPanel[stages[u].id].canvi[1].style.cursor = 'pointer';
                cG.cPanel[stages[u].id].canvi[1].addEventListener("click", cG.cPanel[stages[u].id].next);
            }
            cG.cPanel[stages[u].id].brains = cG.cPanel[stages[u].id].brains || [];
            cG.cPanel[stages[u].id].brains.push(podling);
            eventer(stages[u], podling);
        }
    }
}

cG.stageInjection = function() {
    var stages = document.getElementsByClassName("venue"); //get all entry points
    //if(stages.length>=0) cG.preloadonpage();//auto-preload
    
    if (setValid(cG.recyclebin.air)) cG.script.config.dir = cG.recyclebin.air;
    //console.log(cG.script.config.dir,cG.recyclebin.air);
    cG.REPO.scReq.address = cG.REPO.scReq.address || cG.recyclebin.dir;
    for (var p in cG.recyclebin)
        if (cG.recyclebin.hasOwnProperty(p) && p !== null)
            cG.recyclebin[p] = null;

    var final_res = cG.cPanel,
        decor = (cG.decor) ? cG.decor : '<div id="location"></div><div id="archive">Archive</div><div id="me">About Me</div>',
        ctrls = (cG.ctrls) ? cG.ctrls : '<div>NOT IMPLEMENTED YET</div>',
        reqQueue:Promise<void>[] = [],
        request = function(iD: number, source?: script | {}) { //,srcScript,srcScriptReq){            
            /*initial setup*/
            /*////get attributes */
            /*////////async request the script if it is specified, else use default*/
            if (!cG.fBox.noverwrite) stages[iD].innerHTML = "";
            var myScript, configSet = {}; 

            if (!setValid(source)) {
                var script_attr = stages[iD].getAttribute("script");
                if (setValid(!script_attr) || !iD) { /*if no script or first comic, use the default*/
                    myScript = cG.script;
                } else {
                    reqQueue.push(<Promise<void>> cG.agent(script_attr).then(
                        function(data: string, xhr: XMLHttpRequest) {
                            request(iD, JSON.stringify(data));
                        },
                        function(data: string, xhr: XMLHttpRequest) {
                            console.error(data, xhr.status);
                            request(iD, {});
                        }));
                    return 0; //stop execution
                }
            } 
            else myScript = source;
            let {config, pages, chapters} = myScript;

            /*////////get the rest of the attributes*/
            var id_attr = stages[iD].getAttribute("id"),
                use_attr = stages[iD].getAttribute("use"),
                config_attr = stages[iD].getAttribute("config");
            /*////attribute processing */
            //cgcij tells cG that a stage has already been injected on this element, and you should skip it normally
            stages[iD].setAttribute("cgcij", "1");
            if (!setValid(id_attr)) { /*if no ID, make one*/
                var name = "STG" + iD;
                var j = 1;
                while (document.getElementById(name)) name = "STG" + (iD + j++);
                id_attr = name.toString();
                stages[iD].setAttribute("id", id_attr);
            }
            if (!setValid(use_attr)) use_attr = "def"; /*if no use specified, use current*/
            if (config_attr !== "") {
                try {
                    configSet = JSON.parse(<string> config_attr);
                } catch (err) {
                    console.debug("The following configuration settings are malformed for plugin[" + use_attr + "]: ", config_attr, "\nIt has been ignored");
                }
            }
            /*END initial set up*/
            //if(cG.avx[0]>1&&cG.avx[1]>0){}
            var sbvenue = [],
                nstpost = [],
                nestcom = stages[iD].children;
            for (var h = 0; h < nestcom.length; h++) {
                if (nestcom[h].getAttribute("class") == "venue") sbvenue.push(nestcom[h]);
                else nstpost.push(nestcom[h]);
            }
            stages[iD].innerHTML = decor;
            //console.log(stages[iD],decor)
            renameEles(false, stages[iD], <string> id_attr);

            //If stage doesn't have explict anchor point, anchor it to the venue it was created
            //TODO: investigate _location's purpose here
            var anchorto = <HTMLElement> document.getElementById(id_attr + "_location");
            if (setValid(anchorto)) anchorto = <HTMLElement> stages[iD];
            else { //we only use the helpers if anchorto is actually correctly set
                smartAttrib(stages[iD], {
                    div: {
                        style: "display: none;"
                    }
                }, 1);
            }
            anchorto.style.display = "block";
            //if(cG.avx[0]>1&&cG.avx[1]>0){}

            var archival = <HTMLElement> document.getElementById(id_attr + "_archive");
            if (setValid(archival)) {
                var transcriptPG = "<ul>", 
                    transcriptCH = "<ul>",
                    transcriptBH = "<ul>",
                    chpapp = 0,
                    pagapp = 0;

                if (config && config.pagestartnum) pagapp = 1;
                if (config && config.chapterstartnum) chpapp = 1;
                //Create Page Based Table of Contents/Archive
                for (var y = 0; pages && y < pages.length; y++) {
                    transcriptPG = transcriptPG + '<li onclick="cG.cPanel[' + "'" /*+'def_'*/ + id_attr + "'" + '].go(' + y + ');'+
                    'this.parentElement.parentElement.style.display=' + "'none'" + ';document.getElementById(' + "'" + id_attr + "_location'" +
                    ').style.display=' + "'block'" + ';" style="display:block;">' + (y + pagapp) + '</li>';
                    //console.log(transcriptPG)
                }
                //Create Chapter Based Table of Contents/Archive
                for (var x = 0; chapters && x < chapters.length; x++) {
                    transcriptCH = transcriptCH + '<li onclick="cG.cPanel[' + "'" /*+'def_'*/ + id_attr + "'" + '].ch_go(' + x + ');'+
                    'this.parentElement.parentElement.style.display=' + "'none'" + ';document.getElementById(' + "'" + id_attr + "_location'" + 
                    ').style.display=' + "'block'" + ';" style="display:block;">' + (x + chpapp) + '</li>';

                    transcriptBH = transcriptBH + '<li onclick="cG.cPanel[' + "'" /*+'def_'*/ + id_attr + "'" + '].ch_go(' + x + ');'+
                    'this.parentElement.parentElement.style.display=' + "'none'" + ';document.getElementById(' + "'" + id_attr + "_location'" +
                    ').style.display=' + "'block'" + ';" style="display:block;">' + (x + chpapp) + '<ul>';
                    
                    for (var u = chapters[x].start; u < chapters[x].end + 1; u++) {
                        transcriptBH = transcriptBH + '<li onclick="cG.cPanel[' + "'" /*+'def_'*/ + id_attr + "'" + '].go(' + u + ');'+
                        'this.parentElement.parentElement.parentElement.style.display=' + "'none'" + ';document.getElementById(' + "'" + 
                        id_attr + "_location'" + ').style.display=' + "'block'" + ';" style="display:block;">' + (u + pagapp) + '</li>';
                    }
                    transcriptBH = transcriptBH + '</ul></li>';
                }
                transcriptPG = transcriptPG + '</ul>';
                transcriptCH = transcriptCH + '</ul>';
                transcriptBH = transcriptBH + '</ul>';
                if (setValid(archival.innerHTML)) archival.innerHTML = transcriptBH + transcriptPG + transcriptCH;
            }
            var srch = <string> id_attr;
            final_res[srch] = cG.stage.construct(id_attr, myScript, anchorto, configSet);
            //console.log(sbvenue,nstpost)
            //if(cG.avx[0]>1&&cG.avx[1]>0){}
            //console.log(stages[iD])
            if (!cG.fBox.protect) stages[iD].setAttribute("comix", "-1"); //comix protection disabled, all stages are comix
            else if (stages[iD].getAttribute("id") == cG.comix.name) stages[iD].setAttribute("comix", "1");
            
            //Push child elements as PGes (Subordinate Elements)
            var chl = stages[iD].children;
            for (var t = 1; t < chl.length; t++) {
                if (chl[t] == anchorto) continue;
                final_res[srch].pg.push(chl[t]);
            }
            
            //Hide Non Venue Subordinate Elements
            for (var y = 0; y < nstpost.length; y++) {
                nstpost[y].style = "display: none;"
                stages[iD].appendChild(nstpost[y]);
                final_res[srch].pg.push(nstpost[y]);
            }
            
            //Set up Childings (Venu Subordinate Elements/ Sub Venues)
            for (var z = 0; z < sbvenue.length; z++) {
                var sia = sbvenue[z].getAttribute("id"),
                    sua = sbvenue[z].getAttribute("use"),
                    sca = sbvenue[z].getAttribute("config");
                //console.log(sia,sia||id_attr+"_"+z,id_attr+"_"+z)
                //console.log(final_res[srch])
                var childling = document.createElement("DIV");
                childling.setAttribute("id", sia || id_attr + "_" + z)
                childling.setAttribute("style", "display:none;");
                childling.my = z;
                final_res[srch + "_" + z] = cG.stage.construct(sia || id_attr + "_" + z, sua || myScript, childling, sca || configSet);
                stages[iD].appendChild(childling);
                final_res[srch].pg.push(childling);
                final_res[srch + "_" + z].my = z;
            }
            for (var r = 0; r < final_res[srch].pg.length; r++) {
                var frspr = stick(final_res[srch].pg[r], final_res[srch].pg, final_res[srch], r);
            }
        };
    for (var i = 0; i < stages.length; i++)
        if (!stages[i].getAttribute("cgcij") == true || !cG.fBox.noverwrite) request(i);
    cG.cPanel = final_res;
    cG.controlInjection(stages);
    return final_res;
};
/*end STAGE creation*/
/*cG.preloadonpage = function(){
    
};*/
/*ROUTING*/
//TODO: Reduce/remove set timeout make the code reslient and async by not requiring anything
cG.route2page = cG.route2page || function (this: any) {
    //var com = cG.script.config.orderby,
    if (!cG.fBox.rtepge) return 0; //routing is turned off
    console.log("Routing is currently Disabled"); return 0;
    var routeVal: string[] = this.params;
    
    if (cG.script) {
        var chpmod = (cG.script.config.chapterstartnum) ? 1 : 0,
            modify = (cG.script.config.pagestartnum) ? 1 : 0,
            query: any = {}, value: number = 0, pages: page[] = cG.script.pages;
        
            switch (routeVal.length) {
                case 1: //Can be a name 
                    if (!isNaN(<any>routeVal[0]) && Number(routeVal[0]) >= cG.script.pages.length) {
                        value = Number(routeVal[0]);
                    } else query.key1 = routeVal[0];
                    break;
                case 2: //Expected to be a chapter/page
                    if (!isNaN(<any>routeVal[0]) && Number(routeVal[0]) >= cG.script.pages.length) {
                        value = cG.script.chapters[Number(routeVal[0])].start + Number(routeVal[1]) - modify;// + modify;
                    } else {
                        query.key1 = routeVal[0];
                        query.key2 = routeVal[1];
                    }
                    break;
                case 3: //3 part date
                    var guide = cG.script.config.dateformat.split("/");
                    if (isNaN(value[0] % 1) || isNaN(value[1] % 1) || isNaN(value[2] % 1)) {
                        value = -1
                        b = [];
                        break;
                    }
                    for (var tim = 0; tim < 3; tim++) {
                        if (guide[tim].indexOf("Y") + 1) guide[tim] = 0;
                        else if (guide[tim].indexOf("M") + 1) guide[tim] = 1;
                        else if (guide[tim].indexOf("D") + 1) guide[tim] = 2; //2,1,0
                    }
                    if (value[guide[0]].length > 1900) value[guide[0]] += 2000;
                    var timme = new Date(value[guide[0]], value[guide[1]], value[guide[2]]);
                    value = timme.getTime();
                    break;
            }

            query = String(value);
            for (var a = 0; a < b.length; a++) {
                if (b[a].alt.indexOf(query) + 1 || b[a].hover.indexOf(query) + 1 || b[a].title.indexOf(query) + 1 || b[a].release == Number(query)) {
                    //console.log(b[a].alt.indexOf(query),b[a].hover.indexOf(query),b[a].title.indexOf(query),b[a].release==Number(query))
                    value = a + modify;
                    break;
                }
            }
        
        cG.prePage = value - modify;
        //search for page mismatch
        if (cG.comix !== void 0 && cG.prePage != cG.comix.current()) {
            cG.comix.go(cG.prePage);
            var box = cG.comix.data(cG.prePage);
            document.getElementById(cG.comix.name + "_location").title = box.hover;
            var boe = document.getElementById(cG.comix.name + "_location");
            var csf = document.getElementsByClassName("cgtitle");
            for (var eq = 0; eq < csf.length; eq++) csf[eq].innerHTML = box.title;
            //console.log(cG.comix.name+"_location");
        }
        /*if(cG.avx[0]>1&&cG.avx[1]>0)*/
        cG.verbose(1, "AutoPage: " + cG.prePage)
    } else cG.verbose(1, "AutoPage unset due to missing cG.script");
}
/*end routing*/