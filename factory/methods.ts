///METHODS///
//TODO: Only called by stage injection; evaluate necessity
cG.addRender = function(addme, dest, name) {
    //dest = script obj
    var pushonpages = function(tget) {
        //convert data to page array
        var work;
        for (var i = 0; i < tget.length; i++) {
            if (Array.isArray(tget[i]))
                work = {
                    alt: "",
                    hover: "",
                    title: "",
                    url: tget[i],
                    release: 0,
                    note: "",
                    perm: !1,
                    anim8: !1
                };
            else
                work = {
                    alt: "",
                    hover: "",
                    title: "",
                    url: [tget[i]],
                    release: 0,
                    note: "",
                    perm: !1,
                    anim8: !1
                };
            if (dest !== void 0 && dest !== null)
                dest.pages.push(work);
            else
                cG.REPO.script.def.pages.push(work);
        }
        //this overwrites cG.script, if it it changed by something other than def
        if (dest === void 0 || dest === null)
            cG.script = cG.REPO.script.def;
        else
            return dest;
        return cG.script;
    }
    if (void 0 === addme || addme === null) {
        if (void 0 === name || name === null) name = "additive";
        //TODO: syncJSON is deprecated  
        var data = syncJSON(cG.REPO.scReq.address + name + '.json');
        return pushonpages(data.p);
        /*cG.REPO.scReq.getAdd = cG.agent(cG.REPO.scReq.address+name+'.json');
        cG.REPO.scReq.getAdd.then(
            function(data, xhr) {
                return pushonpages(data.p);
            },
            function(data, xhr) {
                console.error(data, xhr.status);
                console.log("addRender has failed")
                //cG.script = cG.REPO.script.def = 0;
            });*/
    } else return pushonpages(addme.p);
};
cG.controlInjection = function(SPECIFIC) {
    if (!cG.documentcontrolkeyset && cG.fBox.arrow) {
        cG.documentcontrolkeyset = true;
        document.onkeyup = function(e) {
            //console.log("keydown");
            e = e || window.event;
            if (e.keyCode == '37') cG.comix.prev()
            else if (e.keyCode == '39') cG.comix.next();
            else if (e.keyCode == '82') cG.comix.rand();
        }
    }
    var stages = [],
        ctrls = (cG.ctrls) ? cG.ctrls : '<ul><li style="display: inline;"><button class="frst" >|&lt;</button></li><li style="display: inline;"><button class="prev" rel="prev" accesskey="p">&lt; Prev</button></li><li style="display: inline;"><button class="rand" >Random</button></li><li style="display: inline;"><button class="next" rel="next" accesskey="n">Next &gt;</button></li><li style="display: inline;"><button class="last" >&gt;|</button></li></ul>',
        antictrl = '<ul><li style="display: inline;"><button class="last" >&lt;|</button></li><li style="display: inline;"><button class="next" rel="next" accesskey="n">Next &lt;</button></li><li style="display: inline;"><button class="rand" >Random</button></li><li style="display: inline;"><button class="prev" rel="prev" accesskey="p">&gt; Prev</button></li><li style="display: inline;"><button class="frst" >|&gt;</button></li></ul>',
        pod, podling,
        errr = "controlInjection can only operate on elements or arrays of elements",
        eventer = function(par, chd) {
            par.setAttribute("mind", 1);
            document.getElementById(par.id + "_location").title = cG.cPanel[par.id].data().hover;
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
        };
    if (void 0 === SPECIFIC) stages = document.getElementsByClassName("venue"); /*get all entry points*/
    else if (Array.isArray(SPECIFIC)) {
        if (SPECIFIC.length <= 0)
            if (void 0 === SPECIFIC[0].nodeName) return console.error(errr);
            else return console.error(errr);
        stages = stages.concat(SPECIFIC);
    } else {
        if (void 0 === SPECIFIC.nodeName) return console.error(errr);
        stages.push(SPECIFIC); /*if not array and not undefined, assume it is a Element*/
    }
    var exist = document.querySelectorAll('[cglink]'),
        linkcg;
    //console.log(exist)
    for (var v = 0; v < exist.length; v++) {
        linkcg = exist[v].getAttribute("cglink");
        if (cG.cPanel[linkcg] !== void 0 && cG.cPanel[linkcg] !== null) {
            cG.cPanel[linkcg].brains = cG.cPanel[linkcg].brains || [];
            cG.cPanel[linkcg].brains.push(exist[v]);
            eventer(document.getElementById(linkcg), exist[v]);
        }
    }
    for (var u = 0; u < stages.length; u++) {
        if (!stages[u].getAttribute("mind")) { //add event handlers
            pod = document.createElement("DIV");
            pod.innerHTML = ((stages[u].getAttribute("readdir") || cG.script.config.readdir) && !cG.ctrls) ? antictrl : ctrls;
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
    /*if (attempts === void 0 || attempts === null) attempts = 0;
    else if (attempts > 20) {
        console.error("cG.stageInjection has timed out");
        if (cG.script !== '') {
            console.error("OVERRIDE: Ignore other preferences")
            cG.decor = cG.decor || 0;
            cG.ctrls = cG.ctrls || 0;
        } else return cG.cPanel;
    }
    if (cG.script === '' || cG.decor === '' || cG.ctrls === '') { //although we don't need decor, if there is a template, we prioritize it
        //if are stuff isn't ready yet we are going to wait for it
        setTimeout(cG.stageInjection, 300, SPECIFIC, ++attempts);
        return cG.cPanel;
    }
    if (!cG.script && !cG.fBox.vscript) return console.error("No script.JSON found. script.JSON is REQUIRED to create any stage. Please create a script.JSON or move it to the directory specified in the script tag for comix-ngn or bellerophon if it is added.");
    else if (!cG.script && cG.fBox.vscript) {
        cG.script = cG.fBox.vscript; //'';
        //cG.fBox.vscript = false;
        setTimeout(cG.stageInjection, 300, SPECIFIC, 0); //reset attempts
        return cG.cPanel;
    }
    var stages = [],
        errr = "stageInjection can only operate on elements or arrays of elements";
    if (void 0 === SPECIFIC) stages = document.getElementsByClassName("venue"); //get all entry points
    else if (Array.isArray(SPECIFIC)) {
        if (SPECIFIC.length <= 0)
            if (void 0 === SPECIFIC[0].nodeName) return console.error(errr);
            else return console.error(errr);
        stages = stages.concat(SPECIFIC);
    } else {
        if (void 0 === SPECIFIC.nodeName) return console.error(errr);
        stages.push(SPECIFIC); //if not array and not undefined, assume it is a Element
    }
    */
    var stages = document.getElementsByClassName("venue"); //get all entry points
    //auto-preload
    //if(stages.length>=0) cG.preloadonpage();

    //
    if (cG.recyclebin.air != "" && cG.recyclebin.air !== void 0 && cG.recyclebin.air !== null) cG.script.config.dir = cG.recyclebin.air;
    //console.log(cG.script.config.dir,cG.recyclebin.air);
    cG.REPO.scReq.address = cG.REPO.scReq.address || cG.recyclebin.dir;
    for (var p in cG.recyclebin)
        if (cG.recyclebin.hasOwnProperty(p) && p !== null)
            cG.recyclebin[p] = null;

    var final_res = cG.cPanel,
        decor = (cG.decor) ? cG.decor : '<div id="location"></div><div id="archive">Archive</div><div id="me">About Me</div>',
        ctrls = (cG.ctrls) ? cG.ctrls : '<div>NOT IMPLEMENTED YET</div>',
        reqQueue = [],
        request = function(iD, source) { //,srcScript,srcScriptReq){            
            /*initial setup*/
            /*////get attributes */
            /*////////async request the script if it is specified, else use default*/
            if (!cG.fBox.noverwrite) stages[iD].innerHTML = "";
            var myScript = (!iD) ? cG.script: {};
            if (source === null || source === void 0) {
                var script_attr = stages[iD].getAttribute("script");
                if (script_attr == "" || script_attr == "script.json" || void 0 === script_attr || script_attr === null) { /*if no script, use the default*/
                    myScript = cG.script;
                } else {
                    reqQueue.push(cG.agent(script_attr).then(
                        function(data, xhr) {
                            request(iD, data);
                        },
                        function(data, xhr) {
                            console.error(data, xhr.status);
                            request(iD, "");
                        }));
                    return 0; //stop execution
                }
            } else if (source == "") myScript = cG.script;
            else myScript = source;
            //TODO: all script sections should be optional
            if (myScript.config.additive && cG.fBox.addme) {
                cG.addRender(null, null, myScript.config.additive);
                myScript.config.additive = "";
            }
            /*////////get the rest of the attributes*/
            var id_attr = stages[iD].getAttribute("id"),
                use_attr = stages[iD].getAttribute("use"),
                config_attr = stages[iD].getAttribute("config"),
                add_attr = stages[iD].getAttribute("additive");
            /*////attribute processing */
            //cgcij tells cG that a stage has already been injectted on this element, and you should skip it normally
            if (add_attr != "" && void 0 !== add_attr && add_attr !== null && cG.fBox.addme) {
                if (source === null || source === void 0) {
                    myScript = cG.addRender(null, null, add_attr);
                    stages[iD].removeAttribute("additive");
                } else {
                    myScript = cG.addRender(null, source, add_attr)
                }
            }
            stages[iD].setAttribute("cgcij", 1);
            if (id_attr == "" || void 0 === id_attr || id_attr === null) { /*if no ID, make one*/
                var name = "STG" + iD;
                var j = 1;
                while (document.getElementById(name)) name = "STG" + (iD + j++);
                id_attr = name.toString();
                stages[iD].setAttribute("id", id_attr);
            }
            if (use_attr == "" || void 0 === use_attr || use_attr === null) use_attr = "def"; /*if no use specified, use current*/
            if (config_attr != "") {
                try {
                    config_attr = JSON.parse(config_attr);
                } catch (err) {
                    console.debug("The following configuration settings are malformed for plugin[" + use_attr + "]: ", config_attr, "\nIt has been ignored");
                    config_attr = {};
                }
            } else config_attr = {};
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
            cG.HELPERS.renameEles(false, stages[iD], id_attr);
            var anchorto = document.getElementById(id_attr + "_location");
            if (anchorto === void 0 || anchorto === null) anchorto = stages[iD];
            else { //we only use the helpers if anchorto is actually correctly set
                cG.HELPERS.smartAttrib(stages[iD], {
                    div: {
                        style: "display: none;"
                    }
                }, 1);
            }
            anchorto.style.display = "block";
            //if(cG.avx[0]>1&&cG.avx[1]>0){}
            var archival = document.getElementById(id_attr + "_archive");
            if (archival !== void 0 && archival !== null) {
                var transcriptPG = "<ul>";
                var transcriptCH = "<ul>";
                var transcriptBH = "<ul>";
                var chpapp = 0;
                var pagapp = 0;
                if (myScript.config.pagestartnum) pagapp = 1;
                if (myScript.config.chapterstartnum) chpapp = 1;
                for (var y = 0; y < myScript.pages.length; y++) {
                    transcriptPG = transcriptPG + '<li onclick="cG.cPanel[' + "'" /*+'def_'*/ + id_attr + "'" + '].go(' + y + ');this.parentElement.parentElement.style.display=' + "'none'" + ';document.getElementById(' + "'" + id_attr + "_location'" + ').style.display=' + "'block'" + ';" style="display:block;">' + (y + pagapp) + '</li>';
                    //console.log(transcriptPG)
                }
                for (var x = 0; x < myScript.chapters.length; x++) {
                    transcriptCH = transcriptCH + '<li onclick="cG.cPanel[' + "'" /*+'def_'*/ + id_attr + "'" + '].ch_go(' + x + ');this.parentElement.parentElement.style.display=' + "'none'" + ';document.getElementById(' + "'" + id_attr + "_location'" + ').style.display=' + "'block'" + ';" style="display:block;">' + (x + chpapp) + '</li>';
                    transcriptBH = transcriptBH + '<li onclick="cG.cPanel[' + "'" /*+'def_'*/ + id_attr + "'" + '].ch_go(' + x + ');this.parentElement.parentElement.style.display=' + "'none'" + ';document.getElementById(' + "'" + id_attr + "_location'" + ').style.display=' + "'block'" + ';" style="display:block;">' + (x + chpapp) + '<ul>';
                    for (var u = myScript.chapters[x].start; u < myScript.chapters[x].end + 1; u++) {
                        transcriptBH = transcriptBH + '<li onclick="cG.cPanel[' + "'" /*+'def_'*/ + id_attr + "'" + '].go(' + u + ');this.parentElement.parentElement.parentElement.style.display=' + "'none'" + ';document.getElementById(' + "'" + id_attr + "_location'" + ').style.display=' + "'block'" + ';" style="display:block;">' + (u + pagapp) + '</li>';
                    }
                    transcriptBH = transcriptBH + '</ul></li>';
                }
                transcriptPG = transcriptPG + '</ul>';
                transcriptCH = transcriptCH + '</ul>';
                transcriptBH = transcriptBH + '</ul>';
                if (archival.innerHTML == '' || archival.innerHTML == 'Archive') archival.innerHTML = transcriptBH + transcriptPG + transcriptCH;
            }
            var srch = /*use_attr+"_"+*/ id_attr;
            final_res[srch] = cG.stage.construct(id_attr, myScript, anchorto, config_attr);
            //console.log(sbvenue,nstpost)
            //if(cG.avx[0]>1&&cG.avx[1]>0){}
            //console.log(stages[iD])
            if (!cG.fBox.protect) stages[iD].setAttribute("comix", -1); //comix protection disabled, all stages are comix
            else if (stages[iD].getAttribute("id") == cG.comix.name) stages[iD].setAttribute("comix", 1);
            var chl = stages[iD].children;
            for (var t = 1; t < chl.length; t++) {
                if (chl[t] == anchorto) continue;
                final_res[srch].pg.push(chl[t]);
            }
            for (var y = 0; y < nstpost.length; y++) {
                nstpost[y].style = "display: none;"
                stages[iD].appendChild(nstpost[y]);
                final_res[srch].pg.push(nstpost[y]);
            }
            //console.log(sbvenue,nstpost);
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
                final_res[srch + "_" + z] = cG.stage.construct(sia || id_attr + "_" + z, sua || myScript, childling, sca || config_attr);
                stages[iD].appendChild(childling);
                final_res[srch].pg.push(childling);
                final_res[srch + "_" + z].my = z;
                //console.log()
            }
            for (var r = 0; r < final_res[srch].pg.length; r++) {
                var frspr = cG.HELPERS.stick(final_res[srch].pg[r], final_res[srch].pg, final_res[srch], r);
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