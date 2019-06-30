"use strict";
//TODO: --rewrite_polyfills=false
/*TODO:
(()=>{return this['cG'] = this['cG'] || new (function cG(){
this.voice = "Welcome to the World";
})()})();
TODO: consider using data attribute on html
TODO: webcomponent script and control
TODO: function documenation
*/
///INITIALIZE///
/*The namespace of comix-ngn
all variables should be properties of this to prevent global namespace pollution*/
var cG = cG || {}; /*Instantiate cG if not*/
/*comix-ngn default properties*/
/*IMMUTABLE*/
cG.N = () => { return 0; }; /*null function*/
if (void 0 === cG.$GPC) {
    cG.$GPC = 0;
} /*Global Plugin Counter (no longer global)*/
cG.root = ''; /*current default settings of cng, overwritten by plugins*/
cG.cPanel = cG.cPanel || {}; /*cG control panel, all stages are stored here*/
(function () {
    var deft = { fstrun: true, pgepsh: true, pgesve: true, rtepge: true, protect: true, noverwrite: true, arrow: true, vscript: false, click: true };
    if (cG.fBox) {
        for (var u in deft) {
            if (!cG.fBox.hasOwnProperty(u))
                cG.fBox[u] = deft[u];
        }
    }
    else {
        cG.fBox = deft;
    }
})(); /*cG fuse box, toggles various options
* fstrun - toggles automatic stage injection on document ready
* pgepsh - toggles page url push to urlbar and history
* pgesve - toggles page saving in localstorage
* rtepge - toggles routing
* protect - toggles comix settings
* noverwrite - by default, stageInjection cannot overwrite already inserted comics, set to false to allow overwriting
* arrow - toggles arrow key navigation
* click - toggles click navigation
TODO: DEPRECATE vscript and addme
* vscript - virtual script allows, a script defined as a JS variable to overwrite the script request (Writer)
*/
cG.info = { vix: "1.3.7", vwr: "2.0.0", vpr: "0.1.0", vxx: "0.0.2" }; /*version settings*/
cG.dis = cG.dis || {}; //disables statistic and error reporting
cG.recyclebin = cG.recyclebin || {}; //variables that are used in initialization, disposed at stage injection
cG.queue = cG.queue || {}; //stores functions that are called incertain events
cG.comicID = cG.comicID || window.location.host; //unique comic ID, defaults to host
cG.prePage = cG.prePage || -1; //page given to the engine before initialization finishes, navigates if 0 or higher
cG.controllers = cG.controllers || {}; //stores all nav bars that control stages here
cG.avx = cG.avx || cG.info.vix.split(".");
cG.info.vrb = 1;
Object.defineProperty(cG, 'script$', {
    get() { return cG.script; },
    set(script) {
        if (typeof script === 'string') {
            try {
                script = JSON.parse(script);
            }
            catch (e) {
                console.error("Script must be valid JSON");
            }
            ;
        }
        //TODO: validate JSON schema
        cG.comix.internals = script;
        cG.comix.frst();
    },
});
//TODO: ES6 shorthand function support
cG.verbose = function (a) {
    var submit = [];
    var b = 1, c, d = 1;
    if (a === null || a === void 0 || isNaN(parseInt(a, 10)))
        d = 0;
    else
        b = a;
    for (var k = d; k < arguments.length; k++) {
        submit.push(arguments[k]);
    }
    if (cG.info.vrb === null || cG.info.vrb === void 0)
        c = 0;
    else
        c = cG.info.vrb;
    if (c >= b)
        console.log([].concat(submit).join(" "));
};
/*MUTABLE REPOS*/
/*Repos are objects that assign a key to a plug-in's version of function*/
/*Check repo existence*/
cG.REPO = cG.REPO || {};
/*Set repo defaults - ASSUMES defaults aren't set, will overwrite them*/
//TODO: REPLACE pegasus and domReady to support electron app
cG.REPO.rdy = { def: /*domready (c) Dustin Diaz 2014 - License MIT _ogewan fork*/ (a => ("undefined" != typeof module && module.exports ? module.exports = a() : "function" == typeof define && "object" == define.amd && define(a), a()))(() => { var a, b = [], c = "object" == typeof document && document, d = c && c.documentElement.doScroll, e = c && (d ? /^loaded|^c/ : /^loaded|^i|^c/).test(c.readyState); return !e && c && c.addEventListener("DOMContentLoaded", a = () => { for (c.removeEventListener("DOMContentLoaded", a), e = 1; a = b.shift();)
        a(); }), a => { e ? setTimeout(a, 0) : b.push(a); }; }) };
cG.REPO.agent = { def: /*pegasus.js*/ function (t, e) { return e = new XMLHttpRequest, e.open("GET", t), t = [], e.onreadystatechange = e.then = function (n, o, i) { if (n && n.call && (t = [, n, o]), 4 == e.readyState && (i = t[0 | e.status / 200]))
        try {
            i(JSON.parse(e.responseText), e);
        }
        catch (r) {
            i(e.responseText, e);
        } }, e.send(), e; } };
cG.REPO.director = { def: (() => { var Path = { version: "0.8.4", map: function (a) { if (Path.routes.defined.hasOwnProperty(a)) {
            return Path.routes.defined[a];
        }
        else {
            return new Path.core.route(a);
        } }, root: function (a) { Path.routes.root = a; }, rescue: function (a) { Path.routes.rescue = a; }, history: { initial: {}, pushState: function (a, b, c) { if (Path.history.supported) {
                if (Path.dispatch(c)) {
                    history.pushState(a, b, c);
                }
            }
            else {
                if (Path.history.fallback) {
                    window.location.hash = "#" + c;
                }
            } }, popState: function (a) { var b = !Path.history.initial.popped && location.href == Path.history.initial.URL; Path.history.initial.popped = true; if (b)
                return; Path.dispatch(document.location.pathname); }, listen: function (a) { Path.history.supported = !!(window.history && window.history.pushState); Path.history.fallback = a; if (Path.history.supported) {
                Path.history.initial.popped = "state" in window.history, Path.history.initial.URL = location.href;
                window.onpopstate = Path.history.popState;
            }
            else {
                if (Path.history.fallback) {
                    for (route in Path.routes.defined) {
                        if (route.charAt(0) != "#") {
                            Path.routes.defined["#" + route] = Path.routes.defined[route];
                            Path.routes.defined["#" + route].path = "#" + route;
                        }
                    }
                    Path.listen();
                }
            } } }, match: function (a, b) { var c = {}, d = null, e, f, g, h, i; for (d in Path.routes.defined) {
            if (d !== null && d !== undefined) {
                d = Path.routes.defined[d];
                e = d.partition();
                for (h = 0; h < e.length; h++) {
                    f = e[h];
                    i = a;
                    if (f.search(/:/) > 0) {
                        for (g = 0; g < f.split("/").length; g++) {
                            if (g < i.split("/").length && f.split("/")[g].charAt(0) === ":") {
                                c[f.split("/")[g].replace(/:/, "")] = i.split("/")[g];
                                i = i.replace(i.split("/")[g], f.split("/")[g]);
                            }
                        }
                    }
                    if (f === i) {
                        if (b) {
                            d.params = c;
                        }
                        return d;
                    }
                }
            }
        } return null; }, dispatch: function (a) { var b, c; if (Path.routes.current !== a) {
            Path.routes.previous = Path.routes.current;
            Path.routes.current = a;
            c = Path.match(a, true);
            if (Path.routes.previous) {
                b = Path.match(Path.routes.previous);
                if (b !== null && b.do_exit !== null) {
                    b.do_exit();
                }
            }
            if (c !== null) {
                c.run();
                return true;
            }
            else {
                if (Path.routes.rescue !== null) {
                    Path.routes.rescue();
                }
            }
        } }, listen: function () { var a = function () { Path.dispatch(location.hash); }; if (location.hash === "") {
            if (Path.routes.root !== null) {
                location.hash = Path.routes.root;
            }
        } if ("onhashchange" in window && (!document.documentMode || document.documentMode >= 8)) {
            window.onhashchange = a;
        }
        else {
            setInterval(a, 50);
        } if (location.hash !== "") {
            Path.dispatch(location.hash);
        } }, core: { route: function (a) { this.path = a; this.action = null; this.do_enter = []; this.do_exit = null; this.params = {}; Path.routes.defined[a] = this; } }, routes: { current: null, root: null, rescue: null, previous: null, defined: {} } }; Path.core.route.prototype = { to: function (a) { this.action = a; return this; }, enter: function (a) { if (a instanceof Array) {
            this.do_enter = this.do_enter.concat(a);
        }
        else {
            this.do_enter.push(a);
        } return this; }, exit: function (a) { this.do_exit = a; return this; }, partition: function () { var a = [], b = [], c = /\(([^}]+?)\)/g, d, e; while (d = c.exec(this.path)) {
            a.push(d[1]);
        } b.push(this.path.split("(")[0]); for (e = 0; e < a.length; e++) {
            b.push(b[b.length - 1] + a[e]);
        } return b; }, run: function () { var a = false, b, c, d; if (Path.routes.defined[this.path].hasOwnProperty("do_enter")) {
            if (Path.routes.defined[this.path].do_enter.length > 0) {
                for (b = 0; b < Path.routes.defined[this.path].do_enter.length; b++) {
                    c = Path.routes.defined[this.path].do_enter[b]();
                    if (c === false) {
                        a = true;
                        break;
                    }
                }
            }
        } if (!a) {
            Path.routes.defined[this.path].action();
        } } }; return Path; })() };
cG.REPO.producer = { "def": cG.N };
cG.REPO.scReq = cG.REPO.scReq || {};
cG.REPO.ctrls = cG.REPO.ctrls || { def: "" };
cG.REPO.decor = cG.REPO.decor || { def: "" };
cG.REPO.script = cG.REPO.script || { def: "" };
/*SHORTCUTS*/
cG.agent = cG.REPO.agent.def;
cG.director = cG.REPO.director.def;
cG.producer = cG.REPO.producer.def;
cG.ctrls = cG.REPO.ctrls.def;
cG.decor = cG.REPO.decor.def;
cG.script = cG.REPO.script.def;
cG.rdy = cG.REPO.rdy.def;
/*END comix-ngn properties*/
/*STAGE creation-REDACTED*/
//jstagecreate = cG.N;
///RETRIEVAL//
//Retrieve additional parameters from script tag
!function () {
    //get all scripts
    var selfScript = document.getElementsByTagName("SCRIPT"), pass = 0; //checks if search is succesful
    //if no scripts can be found ATM, simply quit
    if (void 0 !== selfScript || selfScript !== null) {
        //iterate over all scripts till you find this one, (comixngn.min) matches as well
        for (var q = 0; q < selfScript.length; q++) {
            if (selfScript[q].src.indexOf("comixngn") >= 0) { //found one
                selfScript = selfScript[q];
                pass = 1;
                break;
            }
        }
        if (!pass)
            return -1; //return if not found
        //check for comicID, no getAttribute if we have cG.comicID
        cG.comicID = cG.comicID || selfScript.getAttribute("comicID");
        //change default plugin
        if (selfScript.getAttribute("plugin") !== void 0 && selfScript.getAttribute("plugin") !== null) {
            var plugin = selfScript.getAttribute("plugin").replace(/\s+/g, '').split(',');
            cG.root = plugin;
            /*mutliplugin priority not implemented*/
            /*for(var w = 0;w<disables.length;w++){
                if(disables[w]==""||disables[w]===void 0||disables[w]==" ") continue;
                cG.dis[disables[w]]=true;
            }*/
        }
        if (selfScript.getAttribute("disable") !== void 0 && selfScript.getAttribute("disable") !== null) {
            var disables = selfScript.getAttribute("disable").replace(/\s+/g, '').split(',');
            for (var w = 0; w < disables.length; w++) {
                if (disables[w] == "" || disables[w] === void 0 || disables[w] == " ")
                    continue;
                cG.dis[disables[w]] = true;
            }
        }
        if (selfScript.getAttribute("VERSION") !== void 0 && selfScript.getAttribute("VERSION") !== null) {
            cG.info.vix = selfScript.getAttribute("VERSION"); //version override
        }
        if (selfScript.getAttribute("air") !== void 0 && selfScript.getAttribute("air") !== null) {
            cG.recyclebin.air = selfScript.getAttribute("air"); //asset path override
        }
        if (selfScript.getAttribute("fBox") !== void 0 && selfScript.getAttribute("fBox") !== null) {
            cG.fBox = JSON.parse(selfScript.getAttribute("fBox")); //asset path override
        }
    }
}();
!function () {
    /*AJAX Calls*/
    /*debugging: ensures cG is correctly instaniated*/ /*console.log(cG);*/
    var dir, tir, src = document.getElementsByTagName("SCRIPT");
    for (var i = 0; i < src.length; i++) {
        if (src[i].src.indexOf("comixngn") >= 0 || src[i].src.indexOf(".cng.") >= 0) {
            dir = src[i].getAttribute("dir");
            tir = src[i].getAttribute("tir");
            break;
        }
    }
    dir = dir || "";
    tir = tir || "";
    if (cG.root == "")
        cG.root = "def";
    if (void 0 === cG.REPO.scReq.getScript) { /*create script.json promise if not already created*/
        cG.REPO.scReq.getScript = cG.agent(dir + 'script.json');
        cG.REPO.scReq.getScript.then(function (data, xhr) {
            cG.script = cG.REPO.script.def = data;
        }, function (data, xhr) {
            if (cG.info.vrb >= 4)
                console.error(data, xhr.status);
            else if (cG.info.vrb >= 1)
                cG.verbose(1, dir + 'script.json not found');
            cG.script = cG.REPO.script.def = 0;
        });
    }
    if (void 0 === cG.REPO.scReq.getDecor) {
        cG.REPO.scReq.getDecor = cG.agent(tir + 'decor.html');
        cG.REPO.scReq.getDecor.then(function (data, xhr) {
            cG.decor = cG.REPO.decor.def = data;
        }, function (data, xhr) {
            if (cG.info.vrb >= 4)
                console.error(data, xhr.status);
            cG.decor = cG.REPO.decor.def = 0;
        });
    }
    if (void 0 === cG.REPO.scReq.getCtrls) {
        cG.REPO.scReq.getCtrls = cG.agent(tir + 'ctrls.html');
        cG.REPO.scReq.getCtrls.then(function (data, xhr) {
            cG.ctrls = cG.REPO.ctrls.def = data;
        }, function (data, xhr) {
            if (cG.info.vrb >= 4)
                console.error(data, xhr.status);
            cG.ctrls = cG.REPO.ctrls.def = 0;
        });
    }
    /*END AJAX calls*/
}();
///DEF_STAGE///
cG.setupStage = (id, direction) => {
    return {
        [id]: {
            id,
            construct: function (name, scriptt, anchor, options) {
                let { config, loading, pages } = scriptt;
                var chek = function (truth, fals, iimg) {
                    //console.log((iimg.absolute||iimg.url[0].indexOf('https://')+1||iimg.url[0].indexOf('http://')+1),iimg.absolute,iimg.url[0].indexOf('https://')+1,iimg.url[0].indexOf('http://')+1);
                    if (iimg.url[0] === void 0)
                        return '';
                    if (iimg.absolute || iimg.url[0].indexOf('https://') + 1 || iimg.url[0].indexOf('http://') + 1) {
                        return truth;
                    }
                    else
                        return fals;
                }, overwrite = -1, pageArr = (pages) ? pages.map((val) => {
                    return val.url[0];
                }) : [], settings = {};
                if (setValid(scriptt)) {
                    if (setValid(config)) {
                        let { dir, imgprebuffer, imgpostbuffer } = config;
                        settings = Object.assign({ dir, imgprebuffer, imgpostbuffer }, settings);
                    }
                    if (setValid(loading)) {
                        let { lines, rate, diameter, back, color } = loading;
                        settings = Object.assign({ lines, rate, diameter, back, color }, settings);
                    }
                }
                if (typeof (Storage) !== "undefined") {
                    overwrite = parseInt(localStorage.getItem(cG.comicID + "|" + name + "|curPage"), 10);
                    cG.verbose(1, cG.comicID + "|" + name + "|curPage", ":", overwrite);
                }
                //prepage, which is from router, overwrites localStorage if over -1, only works on comix
                if (setValid(cG.comix))
                    overwrite = cG.prePage;
                if (overwrite < 0)
                    overwrite = config.startpage;
                var main = new direction(pageArr, Object.assign({ anchor, overwrite }, settings));
                main.name = name;
                main.type = "def";
                main.pg = [anchor];
                main.at = 0;
                main.my = 0;
                main.internals = scriptt || { pages: [], chapters: [], config: {}, loading: {} };
                main.commitSwap = () => {
                    var tmp = main.internals, internalPages = tmp.pages.map((val) => {
                        return val.url[0];
                    }), internalSettings = {};
                    let { config, loading } = tmp;
                    if (setValid(tmp)) {
                        if (setValid(config)) {
                            if (config.dir !== void (0))
                                internalSettings.dir = config.dir;
                            if (config.imgprebuffer !== void (0))
                                internalSettings.imgprebuffer = config.imgprebuffer;
                            if (config.imgpostbuffer !== void (0))
                                internalSettings.imgpostbuffer = config.imgpostbuffer;
                        }
                        if (tmp.loading !== void (0) && tmp.loading !== null) {
                            if (loading.lines !== void (0))
                                internalSettings.lines = loading.lines;
                            if (loading.rate !== void (0))
                                internalSettings.rate = loading.rate;
                            if (loading.diameter !== void (0))
                                internalSettings.diameter = loading.diameter;
                            if (loading.back !== void (0))
                                internalSettings.loaderback = loading.back;
                            if (loading.color !== void (0))
                                internalSettings.color = loading.color;
                        }
                    }
                    main.swap(internalPages, internalSettings);
                };
                var _dataOriginal = main.data;
                main.data = function (to) {
                    //wrap direction data function with error handlers
                    var data = _dataOriginal(to);
                    return setValid(data) ? data : {};
                };
                main.navto = function (a) {
                    if (a !== null && a !== void 0 && a < main.pg.length)
                        return main.pg[a]._nav();
                    else
                        return main.pg[main.my]._nav();
                };
                main.ch_data = function (a) {
                    var c = main.internals.chapters;
                    var sre = (a === null || void 0 === a) ? main.ch_current() : a; //parseInt(a, 10);
                    return (main.ch_current() == -1) ? {} : (isNaN(sre)) ? c[main.ch_current()] : c[sre];
                };
                main.ch_count = function () {
                    return main.internals.chapters.length;
                };
                main.ch_current = function () {
                    var c = main.internals.chapters, d = main.current();
                    for (var a = 0; a < c.length; a++) {
                        if (c[a].start <= d && d <= c[a].end)
                            return a;
                    }
                    return -1;
                };
                main.ch_go = function (a, b) {
                    var sre = (a === null || void 0 === a) ? 0 : a; //parseInt(a, 10);
                    sre = (isNaN(sre)) ? 0 : sre;
                    var g;
                    if (b === null && b === void 0)
                        g = "start";
                    else
                        g = "end";
                    if (main.ch_current() == -1)
                        return main.go();
                    return main.go(main.internals.chapters[Math.floor(Math.max(0, Math.min(main.internals.chapters.length - 1, sre)))][g]);
                };
                main.ch_prev = function (b) {
                    if (main.ch_current() == -1)
                        return main.go();
                    var g;
                    if (b === null && b === void 0)
                        g = "start";
                    else
                        g = "end";
                    return main.go(main.internals.chapters[Math.max(0, main.ch_current() - 1)][g]);
                };
                main.ch_next = function (b) {
                    if (main.ch_current() == -1)
                        return main.go();
                    var g;
                    if (b === null && b === void 0)
                        g = "start";
                    else
                        g = "end";
                    return main.go(main.internals.chapters[Math.min(main.ch_count() - 1, main.ch_current() + 1)][g]);
                };
                main.ch_frst = function (b) {
                    if (main.ch_current() == -1)
                        return main.go();
                    var g;
                    if (b === null && b === void 0)
                        g = "start";
                    else
                        g = "end";
                    return main.go(main.internals.chapters[0][g]);
                };
                main.ch_last = function (b) {
                    if (main.ch_current() == -1)
                        return main.go();
                    var g;
                    if (b === null && b === void 0)
                        g = "start";
                    else
                        g = "end";
                    return main.go(main.internals.chapters[main.ch_count() - 1][g]);
                };
                var lscurrent = function () {
                    if (typeof (Storage) !== void 0 && cG.fBox.pgesve) {
                        localStorage.setItem(cG.comicID + "|" + name + "|curPage", cG.cPanel[ /*"def_"+*/name].current().toString());
                    }
                    if (cG.comix === cG.cPanel[ /*"def_"+*/name] && cG.script.config) { //if comic is the comix, then push its state
                        let { chapterstartnum, pagestartnum, orderby, dateformat } = cG.script.config;
                        var chpmod = (chapterstartnum) ? 1 : 0, modify = (pagestartnum) ? 1 : 0, result = cG.cPanel[ /*"def_"+*/name].current();
                        switch (orderby) {
                            case 1:
                                console.log(result);
                                var mechp = cG.cPanel[ /*"def_"+*/name].ch_current();
                                result = (mechp + chpmod) + "/" + (result - cG.cPanel[ /*"def_"+*/name].internals.chapters[mechp].start + modify);
                                break;
                            case 2:
                                var nT = new Date(cG.cPanel[ /*"def_"+*/name].data().release * 1000);
                                var guide = dateformat.split("/");
                                for (var tim = 0; tim < 3; tim++) {
                                    if (guide[tim].indexOf("Y") + 1)
                                        guide[tim] = nT.getFullYear() - 100 + 2000; //TODO: what is this?
                                    else if (guide[tim].indexOf("M") + 1)
                                        guide[tim] = nT.getMonth() + 1;
                                    else if (guide[tim].indexOf("D") + 1)
                                        guide[tim] = nT.getDate();
                                }
                                result = guide.join("/");
                                //console.log(result,guide,nT);
                                break;
                            default:
                                result += modify;
                        }
                        //if(cG.avx[0]>0&&cG.avx[1]>0) 
                        cG.verbose(1, name, "Pushing state:", result);
                        if (cG.fBox.pgepsh)
                            history.pushState({}, '', "#/" + result);
                    }
                    if (cG.queue.stageChange !== void 0)
                        for (var ftn in cG.queue.stageChange) {
                            if (cG.queue.stageChange.hasOwnProperty(ftn))
                                cG.queue.stageChange[ftn](cG.cPanel[ /*"def_"+*/name]);
                        }
                    var strct = cG.cPanel[ /*"def_"+*/name].data(cG.cPanel[ /*"def_"+*/name].current()).special;
                    var zombie = document.getElementById(name + "_tempScript"); //fetch zombie child
                    var preload = stick(cG.cPanel[ /*"def_"+*/name].canvi[0], null, null, 0);
                    var display = stick(cG.cPanel[ /*"def_"+*/name].canvi[1], null, null, 1);
                    if (zombie !== void 0 && zombie !== null) {
                        anchor.removeChild(zombie); //kill the zombie
                        //if(cG.avx[0]>1&&cG.avx[1]>0){}
                        preload._show();
                        display._show();
                    }
                    if (strct !== null && strct !== void 0 && strct != "") {
                        //anchor.innerHTML += anchor.innerHTML+strct;//this breaks the cavases
                        var spanr = document.createElement("SPAN");
                        spanr.setAttribute("id", name + "_tempScript");
                        spanr.innerHTML = strct;
                        anchor.appendChild(spanr);
                        //if(cG.avx[0]>1&&cG.avx[1]>0){}
                        preload._hide();
                        display._hide();
                    }
                };
                main.callback(1, lscurrent);
                cG.comix = (cG.fBox.protect) ? cG.comix || main : main;
                //if protect is true - set the comix on the first call
                //else always overwrite comix
                return main;
            }
        }
    };
};
{
    let direction;
    /** @preserve directionX.js (c) 2019 Ogewan, MIT*/
    /**
     * @suppress {globalThis}
     */
    /**
     * @function direction
     * @param {string|string[]} [input] - An space delimited list of image sources, or an array of image sources
     * @param {Object}          [config] - Configuration options
     * @param {number}          [config.overwrite] - Integer ID of starting page. [1].
     * @param {HTMLElement}     [config.anchor] - HTMLElement to append the carousel to. [document.body]
     * @param {string}          [config.dir] - The directory containing the images.
     * @param {number}          [config.imgprebuffer] - The # of images to preload that precede the displayed image. [5]
     * @param {number}          [config.imgpostbuffer] - The # of images to preload that follow the displayed image. [5]
     * @param {string}          [config.back] - Hexstring for the display canvas's color. ["#373737"]
     * @param {GPU}             [config.gpu] - GPU class constructor [Requires GPU.js]
     * @param {Function}        [config.shader] - Kernel function that manipulates pixel data [Requires GPU.js]
     * @param {Function}        [config.pixelfn] - Function to manually compute pixel data if GPU.js is not avaliable.
     * [Spinner]
     * @param {boolean}         [config.hideSpin] - Remove the spinner from the page temporarily. [false]
     * @param {boolean}         [config.disableSpin] - Deactivate the spinner forever. [false]
     * @param {number}          [config.lines] - The # of lines for the spinner. [16]
     * @param {number}          [config.rate] - Speed of spinner relative to refresh rate. [1000/30]
     * @param {number}          [config.diameter] - The diameter of the spinner. [250]
     * @param {string}          [config.loaderback] - Hexstring for the spinner background's color. ["#FFF"]
     * @param {string}          [config.color] - Hexstring for the spinner's color. ["#FFF"]
     *
     */
    //TODO: Shader change mechanism for pixelfn and shader, including iimg.shaderTime change when shader is changed
    //TODO: Redraw on resize canvas, clear canvas and then draw imageBitmap again with scale equaling new canvas size
    //TODO: reduce size from 6 to under 5 kb
    //only body has resize event; <body onresize="myFunction()">, tie canvas size to body size perhaps?
    direction = function d(input = [], config = {}) {
        //METHODS - private
        const spin = () => {
            if (!spinner)
                return;
            layers[0].style.paddingLeft = (layers[1].width - 300) / 2 + "px";
            let rotation = Math.floor((Date.now() - spinner.str) / (1000) * spinner.lne) / spinner.lne, color = spinner.clr;
            spinner.ctx.save();
            spinner.ctx.clearRect(0, 0, 300, layers[1].height);
            spinner.ctx.translate(150, layers[1].height / 2);
            spinner.ctx.rotate((Math.PI * 2 * rotation) % (Math.PI * 2));
            //spinner.ctx.rotate(rotation);
            if (color.length == 3) {
                color = `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`;
            }
            else {
                pi(color, 16).toString();
            }
            for (let i = 0; i < spinner.lne; i++) {
                spinner.ctx.beginPath();
                spinner.ctx.rotate(Math.PI * 2 / spinner.lne);
                spinner.ctx.moveTo(spinner.dia / 10, 0);
                spinner.ctx.lineTo(spinner.dia / 4, 0);
                spinner.ctx.lineWidth = spinner.dia / 30;
                spinner.ctx.strokeStyle = color;
                spinner.ctx.stroke();
            }
            spinner.ctx.restore();
            if (spinning)
                raf(spin);
            else
                spinner.ctx.clearRect(0, 0, 300, layers[1].height);
        }, scrollit = (to, time) => {
            //format inputs
            if (to === null || void 0 === to)
                to = { x: 0, y: 0 };
            else if (!isNaN(to))
                to = { x: 0, y: to };
            //if to is num assume its y
            else {
                if (to.y === null || void 0 === to.y)
                    to.y = 0;
                if (to.x === null || void 0 === to.x)
                    to.x = 0;
            }
            if (time === null || void 0 === time || time <= 0)
                time = 400; //ignore given zero time
            //if x or y is less than 0 then go to the bottom
            if (to.y < 0)
                to.y =
                    window.innerHeight ||
                        de.clientHeight ||
                        db.clientHeight;
            if (to.x < 0)
                to.x =
                    window.innerWidth ||
                        de.clientWidth ||
                        db.clientWidth;
            //calculate distance needed to travel
            let dis = {
                x: window.pageXOffset !== void 0 ? to.x - window.pageXOffset : to.x - de.scrollLeft,
                y: window.pageYOffset !== void 0 ? to.y - window.pageYOffset : to.y - de.scrollTop
            };
            //console.log("to", to, "dis" ,dis, "(x", window.pageXOffset, de.scrollLeft, "| y", window.pageYOffset, de.scrollTop, ")" , time, time/5);
            //if that distance is 0 on both x and y, no scrolling required
            if (dis == { x: 0, y: 0 })
                return dis;
            let clock = function (c, b, a) {
                window.scrollBy(Math.floor(c.x) / b, Math.floor(c.y) / b);
                if (a + 1 < b * 5)
                    scrolling = window.setTimeout(clock, 5, c, b, a + 1);
            };
            scrolling = window.setTimeout(clock, 5, dis, Math.floor(time / 5), 0);
            //window.clearInterval(clock);
            return dis;
        }, draw = img => {
            let siz = [0, 0];
            ctx.clearRect(0, 0, layers[1].width, layers[1].height); //clear the canvas based on its size
            cb.run("slidn");
            if (options.sz)
                siz = [options.sz.w, options.sz.h];
            else {
                switch (options.scl) { //scales to canvas
                    case 1: //scale width
                        dif = layers[1].width / img.width;
                        siz = [layers[1].width, img.height * dif];
                        break;
                    case 2: //scale height
                        dif = layers[1].height / img.height;
                        siz = [img.width * dif, layers[1].height];
                        break;
                    default:
                        if (options.scl)
                            siz = [layers[1].width, layers[1].height]; //scale both
                        else
                            siz = [img.width, img.height]; //scale canvas
                }
            }
            layers[1].width = siz[0];
            layers[1].height = siz[1];
            if (spinner)
                layers[0].height = siz[1];
            ctx.drawImage(img, 0, 0, ...siz);
            spinning = false;
            if (skroll)
                scrollit();
            cb.run("slidd");
        }, offload = img => {
            let siz = [img.width, img.height], vimg = iimg[img.virID], storeImgbit = imgbit => {
                if (vimg)
                    vimg.ib = imgbit;
                if (img.master)
                    draw(imgbit);
            };
            if (!img.ui) {
                off.clearRect(0, 0, layers[2].width, layers[2].height);
                layers[2].width = siz[0];
                layers[2].height = siz[1];
                off.drawImage(img, 0, 0);
                try {
                    vimg.ui = off.getImageData(0, 0, ...siz);
                }
                catch (e) {
                    console.log("Cannot get imageData from cross-origin");
                    let ib = layers[2].transferToImageBitmap();
                    return storeImgbit(ib);
                }
            }
            else {
                vimg = img;
            }
            //Does not work with CORS, limited to Electron for now (new BrowserWindow({webPreferences: {webSecurity: false}});)
            if (gpu) {
                const shader = config.shader || function (data) {
                    var x = this.thread.x;
                    var y = this.thread.y;
                    var n = 4 * (x + this.constants.w * (this.constants.h - y));
                    var red = data[n] / 256;
                    var green = data[n + 1] / 256;
                    var blue = data[n + 2] / 256;
                    var alpha = data[n + 3] / 256;
                    this.color(red, green, blue, alpha);
                }, 
                // the kernel runs for each pixel, with:
                // - this.thread.x = horizontal position in pixels from the left edge
                // - this.thread.y = vertical position in pixels from the bottom edge (*opposite of canvas*)
                render = gpu.createKernel(shader)
                    .setConstants({ w: siz[0], h: siz[1] }).setOutput(siz).setGraphical(true);
                //RESET canvas to deal with bug
                render.canvas.width = 1;
                render.canvas.height = 1;
                render.maxTexSize = [1, 1];
                render(vimg.ui.data);
                createImageBitmap(render.canvas).then(storeImgbit);
            }
            else {
                let pixelfn = config.pixelfn;
                createImageBitmap((pixelfn) ? pixelfn(vimg.ui) : vimg.ui).then(storeImgbit);
            }
        }, assign = idd => {
            /**
             * iimg = {
             *  s: (image source url),
             *  d: (image order: -1 = first, 0 = mid, 1 = last),
             *  ui: (imageData Uint8ClampedArray),
             *  ib: (imageBitmap drawn image)
             * }
             */
            if (!iimg.length)
                return;
            spinning = true;
            raf(spin);
            cb.run("start");
            //clamp between 0 and iimg len
            idd = Math.min(Math.max(0, idd), iimg.length - 1);
            //if not loaded, clear top layer to show spinner
            if (!iimg[idd].ib) {
                ctx.clearRect(0, 0, layers[1].width, layers[1].height);
                master.virID = idd;
                master.src = options.dir + iimg[idd].s;
            }
            else {
                if (iimg[idd].st != iimg.shaderTime) {
                    offload(iimg[idd]);
                }
                else {
                    draw(iimg[idd].ib);
                }
            }
            current = idd;
            let q, r = 0;
            for (q = idd - 1; (r < options.irb) && (q >= 0); q--) {
                if (iimg[q].ib)
                    continue;
                else if (iimg[q].st != iimg.shaderTime) {
                    offload(iimg[q]);
                    continue;
                }
                setPreload(r, q, options.dir + iimg[q].s);
                r++;
            }
            for (q = idd + 1; (r < options.itb) && (q < iimg.length); q++) {
                if (iimg[q].ib)
                    continue;
                else if (iimg[q].st != iimg.shaderTime) {
                    offload(iimg[q]);
                    continue;
                }
                setPreload(r, q, options.dir + iimg[q].s);
                r++;
            }
        }, xtndLmt = (org, src) => {
            //add value from src if its key exists in org
            if (!org)
                return;
            for (var key in src)
                if (org.hasOwnProperty(key))
                    org[key] = src[key];
        }, setupLoader = count => Array(count).fill(1).map((e, i) => {
            let img = new Image();
            img.unique = i;
            img.virID = -1;
            img.addEventListener("load", offload.bind(null, img));
            return img;
        }), format_iimg = raw => {
            let st = Date.now(), form = ((typeof raw == "string") ? raw.split(" ") : raw).map((v, i, a) => ({ s: v, st: st, d: (i ? (i == a.length - 1 ? 1 : 0) : -1) }));
            form.shaderTime = st;
            return form;
        }, setPreload = (pid, id, src) => {
            preload[pid].virID = id;
            preload[pid].src = src;
        }, jq = () => {
            try {
                jQuery.fn.direction = function (a, c) {
                    return this.each(function () {
                        c.anchor = $(this);
                        d(a, c);
                    });
                };
            }
            catch (e) {
                console.log(e);
            }
        }, 
        //GLOBAL shortcuts
        du = document, db = du.body, de = du.documentElement, pi = parseInt, raf = window.requestAnimationFrame;
        //PROPERTIES - private
        let owrite = config.overwrite || 0, anchor = config.anchor || db, iimg = format_iimg(input), 
        //is the spinner spinning?
        spinning = true, 
        //scroll ID
        scrolling = -1, 
        //-1 for unset, corresponds to current page
        current = -1, layers = {
            0: config.disableSpin ? null : du.createElement("canvas"),
            1: du.createElement("canvas"),
            2: new OffscreenCanvas(640, 480)
        }, spinner = layers[0] ? {
            ctx: layers[0].getContext("2d"),
            clr: config.color || "#373737",
            str: Date.now(),
            lne: config.lines || 16,
            rte: config.rate || 1000 / 30,
            dia: config.diameter || 250,
            lbk: config.loaderback || "#FFF",
            dat: Date.now(),
            sav: []
        } : null, options = {
            dir: config.dir || "",
            irb: config.imgprebuffer || 5,
            itb: config.imgpostbuffer || 5,
            bck: config.back || "#FFF",
            sz: config.size || 0,
            scl: 0
        }, 
        //MASTER = directly draws, preload only request image
        preload = setupLoader(options.itb + options.irb), master = setupLoader(1)[0], skroll = true, ctx = layers[1].getContext("2d"), off = layers[2].getContext("2d"), cb = {
            run: a => {
                for (var b = 0; b < cb[a].length; b++) {
                    cb[a][b]();
                }
            },
            start: [],
            slidn: [],
            slidd: []
        }, gpu;
        //Library extensions
        if (window.jQuery)
            jq();
        //PROPERTIES - public
        this.canvi = layers;
        this.cb = cb;
        //METHODS - public
        //TODO: temp patch for shader setup
        this.setupShaders = (opts) => {
            if (opts.gpu) {
                const canvas = new OffscreenCanvas(640, 480), webGl = canvas.getContext('webgl2', { premultipliedAlpha: false });
                gpu = new opts.gpu({ canvas, webGl });
            }
            if (opts.shader)
                config.shader = opts.shader;
            if (opts.pixelfn)
                config.pixelfn = opts.pixelfn;
        },
            this.cnl = () => {
                //stop scrolling
                window.clearTimeout(scrolling);
            };
        this.swap = (arr, opts, start) => {
            iimg = Array.isArray(arr) ? format_iimg(arr) : iimg;
            if (opts) {
                xtndLmt(spinner, opts);
                xtndLmt(options, opts);
            }
            this.go(start || 0);
        };
        this.count = () => {
            return iimg.length;
        };
        this.current = () => {
            return current;
        };
        this.callback = (type, callback, index, remove) => {
            if (type === null || void 0 === type)
                return cb.slidn;
            var typeMap = { "-1": cb.start, "0": cb.slidn, "1": cb.slidd }, select = typeMap[index || 0];
            if (remove) {
                return select.splice(index || select.length - 1, 1);
            }
            if (callback === null || void 0 === callback) {
                return index === null || void 0 === index
                    ? select
                    : select[index];
            }
            if (index === null || void 0 === index) {
                select.push(callback);
            }
            else
                select[index] = callback;
            return 1;
        };
        this.go = (to) => {
            var sre = to === null || void 0 === to ? 0 : pi(to, 10);
            //console.log(sre);
            sre = isNaN(sre) ? 0 : sre;
            assign(Math.floor(Math.max(0, Math.min(iimg.length - 1, sre))));
            return sre;
        };
        this.prev = () => {
            var sre = current - 1; //avoids possible race condition, assign loads in new image which can call draw which can change self.current before it gets to the return call. storing it premptively will preserve the value
            if (sre >= 0)
                assign(sre);
            return sre;
        };
        this.next = () => {
            //console.log("Hello");
            var sre = current + 1;
            if (sre < iimg.length)
                assign(sre);
            return sre;
        };
        this.frst = () => {
            if (current >= 0)
                assign(0);
            return 0;
        };
        this.last = () => {
            assign(iimg.length - 1);
            return iimg.length - 1;
        };
        this.rand = () => {
            var sre = Math.floor(Math.random() * (iimg.length - 1));
            //console.log(sre);
            assign(sre);
            return sre;
        };
        this.data = (to) => {
            //returns info about slide
            var sre = to === null || void 0 === to ? current : pi(to, 10);
            return isNaN(sre)
                ? iimg[current]
                : iimg[Math.floor(Math.max(0, Math.min(iimg.length - 1, sre)))];
        };
        this.scroll = (bool) => {
            //toggles Auto Scrolling
            if (!(bool === null || void 0 === bool))
                skroll = bool;
            return skroll;
        };
        this.scrollTo = (to, time) => {
            return scrollit(to, time);
        }; //public wrapper for scrollit
        if (spinner) {
            //LOADER - setup
            layers[0].height = 480;
            layers[0].style.background = spinner.lbk;
            layers[0].style.paddingLeft = "170px";
            layers[0].style.zIndex = 0;
            layers[0].style.position = "absolute";
            anchor.appendChild(layers[0]);
        }
        //init
        master.master = true;
        master.unique = -1;
        assign(options.startpage || owrite);
        //end init
        layers[1].height = 480;
        layers[1].width = 640;
        layers[1].background = options.bck;
        layers[1].style.zIndex = 1;
        layers[1].style.position = "relative";
        //layers[1].style.visibility="hidden";
        //if (anchor) anchor.appendChild(layers[1]);
        //else du.body.appendChild(layers[1]);
        anchor.appendChild(layers[1]);
    };
    cG.REPO.stage = cG.setupStage("def", direction);
}
///////
cG.stage = cG.REPO.stage.def;
///DEF_STAGECHANGE//
cG.queue.stageChange = cG.queue.stageChange || {};
cG.queue.stageChange.hotcontent = function () {
    var hotstuff = document.getElementsByClassName("cg-hot");
    var hotqueue = []; //window.hotqueue||[];
    for (var i = 0; i < hotstuff.length; i++) {
        hotqueue.push({ place: hotstuff[i].parentNode, time: hotstuff[i] });
    }
    while (hotstuff.length) {
        let { parentNode } = hotstuff[0];
        if (parentNode)
            parentNode.removeChild(hotstuff[0]);
    }
    for (var j = 0; j < hotqueue.length; j++) {
        console.log("queued stuff", cG.info.vrb, hotqueue[j]);
        let { place } = hotqueue[0];
        if (place)
            place.appendChild(hotqueue[j].time); /*
        if(cG.info.vrb!=500){
            hotqueue[j].place.appendChild(hotqueue[j].time);
        } else window.hotqueue = hotqueue;*/
    }
};
cG.queue.stageChange.controller = function (target) {
    //console.log(target.data().d);
    var b, c, key, mykey, bcollect = [], check = target.data().d;
    for (var o = 0; o < target.brains.length; o++) {
        bcollect = FindClassesInside(target.brains[o], ["frst", "last", "prev", "next", "rand"]);
        //console.log(bcollect);
        for (var p = 0; p < bcollect.length; p++) {
            b = bcollect[p];
            c = b.getAttribute("class");
            //console.log(b,p,bcollect);
            //console.log(target.brains[o],b.getAttribute("nohide"))
            key = target.brains[o].getAttribute("nohide");
            if (key)
                mykey = key;
            else
                mykey = "disable";
            //console.log(check)
            //TODO: investigate for bugs
            if ((c == "frst" || c == "prev") && check == -1) {
                if (c == "frst")
                    b.setAttribute("class", "frst " + mykey);
                else
                    b.setAttribute("class", "prev " + mykey);
                if (!key)
                    b.setAttribute("style", "display:none;");
            }
            else if ((c == "frst " + mykey || c == "prev " + mykey)) {
                if (c == "frst " + mykey)
                    b.setAttribute("class", "frst");
                else
                    b.setAttribute("class", "prev");
                if (!key)
                    b.setAttribute("style", "display:inline;");
            }
            if ((c == "last" || c == "next") && check == 1) {
                if (c == "last")
                    b.setAttribute("class", "last " + mykey);
                else
                    b.setAttribute("class", "next " + mykey);
                if (!key)
                    b.setAttribute("style", "display:none;");
            }
            else if ((c == "last " + mykey || c == "next " + mykey)) {
                if (c == "last " + mykey)
                    b.setAttribute("class", "last");
                else
                    b.setAttribute("class", "next");
                if (!key)
                    b.setAttribute("style", "display:inline;");
            }
        }
    }
};
///HELPERS///
/** @function setValid
 * @param element If element is null, void, empty string, or -1 it is unset or set to unset
 */
var setValid = (element) => {
    if (element == -1 || element === "" || element === void 0 || element == null)
        return false;
    return true;
}, 
/** @function smartAttrib
 * @param source
 * @param mapper
 * @param ignore
 */
smartAttrib = (source, mapper, ig) => {
    var base;
    ig = (isNaN(ig)) ? 0 : ig;
    var srch = mapper[source.nodeName.toLowerCase()];
    if (void 0 !== srch && ig <= 0) {
        if (srch.count === void 0 || srch.count != 0) { /*as long as count != 0 we can set the attribute*/
            base = Object.keys(srch);
            for (var y = 0; y < base.length; y++) {
                if (base[y] == "count")
                    continue;
                if (base[y] == "innerHTML") {
                    source.innerHTML = srch[base[y]];
                    continue;
                }
                source.setAttribute(base[y], srch[base[y]]);
            }
            if (srch.count > 0)
                mapper[source.nodeType].count--; /*if count is above 0, decrement it (this limits the amount of sets)*/
        }
    }
    else
        ig--;
    for (var x = 0; x < source.children.length; x++)
        smartAttrib(source.children[x], mapper, ig);
}, 
/** @function stick
 * @param obj
 * @param parent
 * @param sauce
 * @param pos
 */
stick = function (obj, parent, sauce, pos) {
    var ftns = [
        function (a) {
            if (parent !== void 0 || parent !== null) {
                parent.splice(a, 0, this);
                this._pos = a;
                return a;
            }
        },
        function (a) {
            if (parent !== void 0 || parent !== null) {
                var b = parent[this._pos];
                parent[this._pos] = parent[a];
                parent[a] = b;
                this._pos = a;
                return a;
            }
        },
        function () {
            if (sauce !== void 0 || sauce !== null) {
                sauce.at = this._pos;
                this._show();
                var b = this._pos;
                for (var y = 0; y < parent.length; y++) {
                    if (this._pos == y)
                        continue;
                    parent[y]._hide();
                }
                if (this._chain.length)
                    b = [b];
                for (var x = 0; x < this._chain.length; x++) {
                    //console.log(this,this._chain,x,this._chain[x]);
                    this._chain[x]._show();
                    b.push(x);
                }
                return b;
            }
        },
        function () {
            if (this.style.display === null || this.style.display === void 0)
                this.setAttribute("style", this.getAttribute("style") + "display: block;");
            else
                this.style.display = "block";
            return this._pos;
        },
        function () {
            if (this.style.display === null || this.style.display === void 0)
                this.setAttribute("style", this.getAttribute("style") + "display: none;");
            else
                this.style.display = "none";
            return this._pos;
        },
        function () {
            if (this.style.visibility === null || this.style.visibility === void 0)
                this.setAttribute("style", this.getAttribute("style") + "visibility:hidden;");
            else
                this.style.visibility = "hidden";
            return this._pos;
        },
        function () {
            if (this.style.visibility === null || this.style.visibility === void 0)
                this.setAttribute("style", this.getAttribute("style") + "visibility: visible;");
            else
                this.style.visibility = "visible";
            return this._pos;
        },
        function (a) {
            if (parent !== void 0 || parent !== null) {
                this._chain.push(parent[a]);
                return a;
            }
        },
        function (a) {
            if (parent !== void 0 || parent !== null) {
                return this._chain.splice(this._chain.indexOf(parent[a]), 1);
            }
        },
        function (a) {
            if (parent !== void 0 || parent !== null) {
                this._chain.push(parent[a]);
                parent[a]._chain.push(this);
                return [a, this._pos];
            }
        },
        function (a) {
            if (parent !== void 0 || parent !== null) {
                return this._chain.splice(this._chain.indexOf(parent[a]), 1).concat(parent[a]._chain.splice(parent[a]._chain.indexOf(this._pos), 1));
            }
        }
    ];
    obj._order = ftns[0];
    obj._switch = ftns[1];
    obj._nav = ftns[2];
    obj._show = ftns[3];
    obj._hide = ftns[4];
    obj._cloak = ftns[5];
    obj._uncloak = ftns[6];
    obj._link = ftns[7];
    obj._unlink = ftns[8];
    obj._bind = ftns[9];
    obj._unbind = ftns[10];
    obj._pos = pos;
    obj._chain = [];
    return obj;
}, 
/** @function FEbyIDAI
 * @param source
 * @param ids
 * @param inner
 */
FEbyIdAI = function (source, ids, inner) {
    var ret = [];
    var w;
    var j;
    var q = ids.indexOf(source.getAttribute("id")) + 1;
    if (!q) {
        w = source.className.split(" ");
        //console.log(q,w);
        for (b = 0; b < w.length; b++) {
            //console.log(ids,w,ids.indexOf(w[b]));
            q = ids.indexOf(w[b]);
            if (q >= 0)
                break;
        }
        q++;
    }
    if (q) {
        source.innerHTML = inner[q - 1];
        ret.push(source);
    }
    for (var a = 0; a < source.children.length; a++) {
        ret = ret.concat(FEbyIdAI(source.children[a], ids, inner));
    }
    //console.log(q,ret,source);
    return ret;
}, 
/** @function FindClassesInside
 * @param source
 * @param class
 */
FindClassesInside = function (source, cls) {
    //console.log(source);
    var ret = [], q, w = source.className.split(" ");
    for (var u = 0; u < w.length; u++) {
        //console.log(cls,w[u]);
        q = cls.indexOf(w[u]) + 1;
        if (q)
            break;
    }
    if (q) {
        ret.push(source);
    }
    for (var a = 0; a < source.children.length; a++) {
        ret = ret.concat(FindClassesInside(source.children[a], cls));
    }
    return ret;
}, 
/** @function renameEles
 * @param bool
 * @param source
 * @param prepend
 * @param append
 */
renameEles = function (bool, source, prepend, append) {
    for (var x = 0; x < source.children.length; x++)
        renameEles(true, source.children[x], prepend, append);
    if (bool) {
        var pre = (void 0 === prepend) ? '' : prepend + "_";
        var app = (void 0 === append) ? '' : "_" + append;
        source.setAttribute("id", pre + source.getAttribute("id") + app);
        if (source.className !== "")
            source.className = " " + pre + source.className;
    }
};
/* setup complete
/////////////////////////////////////////////////*/ 
///METHODS///
cG.controlInjection = function (stages) {
    if (!cG.documentcontrolkeyset && cG.fBox.arrow) {
        //Arrow must be enabled and documentcontrol cannot be already set
        cG.documentcontrolkeyset = true;
        document.onkeyup = function (e) {
            //console.log("keydown");
            e = e || window.event;
            cG.comix.cnl(); // cancel scrolling on key press
            if (e.keyCode == 37)
                cG.comix.prev();
            else if (e.keyCode == 39)
                cG.comix.next();
            else if (e.keyCode == 82)
                cG.comix.rand();
        };
        document.onwheel = function (e) {
            //console.log("scroll detected");
            //e = e || window.event;
            cG.comix.cnl(); // cancel scrolling on movement
        };
    }
    var ctrls = (cG.ctrls) ? cG.ctrls :
        '<ul>' +
            '<li style="display: inline;"><button class="frst" >|&lt;</button></li>' +
            '<li style="display: inline;"><button class="prev" rel="prev" accesskey="p">&lt; Prev</button></li>' +
            '<li style="display: inline;"><button class="rand" >Random</button></li>' +
            '<li style="display: inline;"><button class="next" rel="next" accesskey="n">Next &gt;</button></li>' +
            '<li style="display: inline;"><button class="last" >&gt;|</button></li>' +
            '</ul>', antictrl = '<ul>' +
        '<li style="display: inline;"><button class="last" >&lt;|</button></li>' +
        '<li style="display: inline;"><button class="next" rel="next" accesskey="n">Next &lt;</button></li>' +
        '<li style="display: inline;"><button class="rand" >Random</button></li>' +
        '<li style="display: inline;"><button class="prev" rel="prev" accesskey="p">&gt; Prev</button></li>' +
        '<li style="display: inline;"><button class="frst" >|&gt;</button></li>' +
        '</ul>', pod, podling, ctrlSetup = function (key, parent, childTarget) {
        var myself = "" + parent.id, clickHandler = () => {
            var box = cG.cPanel[myself].data(cG.cPanel[myself][key]()), working, boe = document.getElementById(myself), titleBar = document.getElementById(myself + "_location"), titleTar = [], dateTar = [];
            if (titleBar)
                titleBar.title = box.hover;
            if (boe && boe.getAttribute("comix")) {
                titleTar = document.getElementsByClassName("cgtitle");
                dateTar = document.getElementsByClassName("cgdate");
            }
            for (var eq = 0; eq < titleTar.length; eq++) {
                titleTar[eq].innerHTML = box.title;
            }
            for (var eq = 0; eq < dateTar.length; eq++) {
                working = new Date(cG.cPanel[parent.id].data().release * 1000);
                dateTar[eq].innerHTML = working.toDateString();
            }
        }, buttons = document.getElementsByClassName(key);
        for (var y = 0; y < buttons.length; y++) {
            if (childTarget.getAttribute("cglink") == myself && !buttons[y].getAttribute("cgae")) {
                buttons[y].addEventListener("click", clickHandler);
                buttons[y].setAttribute("cgae", "1");
            }
        }
    }, eventer = function (par, chd) {
        par.setAttribute("mind", "1");
        document.getElementById(par.id + "_location").title = cG.cPanel[par.id].data().hover || "";
        var classstuff = (par.getAttribute("comix")) ? document.getElementsByClassName("cgtitle") : [], working, classdate = (par.getAttribute("comix")) ? document.getElementsByClassName("cgdate") : [];
        for (var eq = 0; eq < classstuff.length; eq++)
            classstuff[eq].innerHTML = cG.cPanel[par.id].data().title;
        for (var eq = 0; eq < classdate.length; eq++) {
            working = new Date(cG.cPanel[par.id].data().release * 1000);
            classdate[eq].innerHTML = working.toDateString();
        }
        ["frst", "prev", "rand", "next", "last"].forEach(val => { ctrlSetup(val, par, chd); });
    }, exist = document.querySelectorAll('[cglink]'), linkcg;
    stages = document.getElementsByClassName("venue") /*get all entry points*/;
    for (var v = 0; v < exist.length; v++) {
        linkcg = exist[v].getAttribute("cglink");
        if (setValid(cG.cPanel[linkcg])) {
            cG.cPanel[linkcg].brains = cG.cPanel[linkcg].brains || [];
            cG.cPanel[linkcg].brains.push(exist[v]);
            eventer(document.getElementById(linkcg), exist[v]);
        }
    }
    for (var u = 0; u < stages.length; u++) {
        if (!stages[u].getAttribute("mind")) { //add event handlers
            let { id, parentNode, nextSibling } = stages[u];
            pod = document.createElement("DIV");
            //check if read direction is reversed
            let { config } = cG.script;
            pod.innerHTML = ((stages[u].getAttribute("readdir") || (config && config.readdir)) && !cG.ctrls) ? antictrl : ctrls;
            podling = pod.children[0];
            if (!stages[u].getAttribute("comix"))
                podling.setAttribute("style", "display:none;");
            else
                podling.setAttribute("style", "display:block;");
            podling.setAttribute("cglink", id);
            if (parentNode)
                parentNode.insertBefore(podling, nextSibling);
            //console.log(stages[u],nextSibling)
            if (cG.fBox.click) {
                cG.cPanel[id].canvi[1].style.cursor = 'pointer';
                cG.cPanel[id].canvi[1].addEventListener("click", cG.cPanel[id].next);
            }
            cG.cPanel[id].brains = cG.cPanel[id].brains || [];
            cG.cPanel[id].brains.push(podling);
            eventer(stages[u], podling);
        }
    }
};
cG.stageInjection = function () {
    var stages = document.getElementsByClassName("venue"); //get all entry points
    //if(stages.length>=0) cG.preloadonpage();//auto-preload
    if (setValid(cG.recyclebin.air))
        cG.script.config.dir = cG.recyclebin.air;
    //console.log(cG.script.config.dir,cG.recyclebin.air);
    cG.REPO.scReq.address = cG.REPO.scReq.address || cG.recyclebin.dir;
    for (var p in cG.recyclebin)
        if (cG.recyclebin.hasOwnProperty(p) && p !== null)
            cG.recyclebin[p] = null;
    var final_res = cG.cPanel, decor = (cG.decor) ? cG.decor : '<div id="location"></div><div id="archive">Archive</div><div id="me">About Me</div>', ctrls = (cG.ctrls) ? cG.ctrls : '<div>NOT IMPLEMENTED YET</div>', reqQueue = [], miniRequest = function (iD, item, id_attr, promiseArr, parentID, source) {
        if (!setValid(source)) {
            var script_attr = item.getAttribute("script");
            promiseArr.push(cG.agent(script_attr).then(function (data, xhr) {
                miniRequest(iD, item, id_attr, promiseArr, parentID, JSON.stringify(data));
            }, function (data, xhr) {
                console.error(data, xhr.status);
                miniRequest(iD, item, id_attr, promiseArr, parentID, {});
            }));
            return 0; //stop execution
        }
        let { config, pages, chapters } = source;
        var sia = item.getAttribute("id"), sua = item.getAttribute("use"), sca = item.getAttribute("config"), configSet = {}, childling = document.createElement("DIV");
        //console.log(sia,sia||id_attr+"_"+z,id_attr+"_"+z)
        //console.log(final_res[parentID])
        childling.setAttribute("id", sia || id_attr + "_" + iD);
        childling.setAttribute("style", "display:none;");
        final_res[parentID + "_" + iD] = cG.stage.construct(sia || id_attr + "_" + iD, source, childling, sca || configSet);
        stages[iD].appendChild(childling);
        final_res[parentID].pg.push(childling);
        final_res[parentID + "_" + iD].my = iD;
    }, request = function (iD, source) {
        /*initial setup*/
        /*////get attributes */
        /*////////async request the script if it is specified, else use default*/
        if (!cG.fBox.noverwrite)
            stages[iD].innerHTML = "";
        var myScript, configSet = {};
        if (!setValid(source)) {
            var script_attr = stages[iD].getAttribute("script");
            if (setValid(!script_attr) || !iD) { /*if no script or first comic, use the default*/
                myScript = cG.script;
            }
            else {
                reqQueue.push(cG.agent(script_attr).then(function (data, xhr) {
                    request(iD, JSON.stringify(data));
                }, function (data, xhr) {
                    console.error(data, xhr.status);
                    request(iD, {});
                }));
                return 0; //stop execution
            }
        }
        else
            myScript = source;
        let { config, pages, chapters } = myScript;
        /*////////get the rest of the attributes*/
        var id_attr = stages[iD].getAttribute("id"), use_attr = stages[iD].getAttribute("use"), config_attr = stages[iD].getAttribute("config");
        /*////attribute processing */
        //cgcij tells cG that a stage has already been injected on this element, and you should skip it normally
        stages[iD].setAttribute("cgcij", "1");
        if (!setValid(id_attr)) { /*if no ID, make one*/
            var name = "STG" + iD;
            var j = 1;
            while (document.getElementById(name))
                name = "STG" + (iD + j++);
            id_attr = name.toString();
            stages[iD].setAttribute("id", id_attr);
        }
        if (!setValid(use_attr))
            use_attr = "def"; /*if no use specified, use current*/
        if (config_attr !== "") {
            try {
                configSet = JSON.parse(config_attr);
            }
            catch (err) {
                console.debug("The following configuration settings are malformed for plugin[" + use_attr + "]: ", config_attr, "\nIt has been ignored");
            }
        }
        /*END initial set up*/
        //if(cG.avx[0]>1&&cG.avx[1]>0){}
        var sbvenue = [], nstpost = [], nestcom = stages[iD].children;
        /*
        for (var h = 0; h < nestcom.length; h++) {
            if (nestcom[h].getAttribute("class") == "venue") sbvenue.push(nestcom[h]);
            else nstpost.push(<HTMLElement> nestcom[h]);
        }*/
        stages[iD].innerHTML = decor;
        //console.log(stages[iD],decor)
        renameEles(false, stages[iD], id_attr);
        //If stage doesn't have explict anchor point, anchor it to the venue it was created
        //TODO: investigate _location's purpose here
        var anchorto = document.getElementById(id_attr + "_location");
        if (setValid(anchorto))
            anchorto = stages[iD];
        else { //we only use the helpers if anchorto is actually correctly set
            smartAttrib(stages[iD], {
                div: {
                    style: "display: none;"
                }
            }, 1);
        }
        anchorto.style.display = "block";
        //if(cG.avx[0]>1&&cG.avx[1]>0){}
        var archival = document.getElementById(id_attr + "_archive");
        if (setValid(archival)) {
            var transcriptPG = "<ul>", transcriptCH = "<ul>", transcriptBH = "<ul>", chpapp = 0, pagapp = 0;
            if (config && config.pagestartnum)
                pagapp = 1;
            if (config && config.chapterstartnum)
                chpapp = 1;
            //Create Page Based Table of Contents/Archive
            for (var y = 0; pages && y < pages.length; y++) {
                transcriptPG = transcriptPG + '<li onclick="cG.cPanel[' + "'" /*+'def_'*/ + id_attr + "'" + '].go(' + y + ');' +
                    'this.parentElement.parentElement.style.display=' + "'none'" + ';document.getElementById(' + "'" + id_attr + "_location'" +
                    ').style.display=' + "'block'" + ';" style="display:block;">' + (y + pagapp) + '</li>';
                //console.log(transcriptPG)
            }
            //Create Chapter Based Table of Contents/Archive
            for (var x = 0; chapters && x < chapters.length; x++) {
                transcriptCH = transcriptCH + '<li onclick="cG.cPanel[' + "'" /*+'def_'*/ + id_attr + "'" + '].ch_go(' + x + ');' +
                    'this.parentElement.parentElement.style.display=' + "'none'" + ';document.getElementById(' + "'" + id_attr + "_location'" +
                    ').style.display=' + "'block'" + ';" style="display:block;">' + (x + chpapp) + '</li>';
                transcriptBH = transcriptBH + '<li onclick="cG.cPanel[' + "'" /*+'def_'*/ + id_attr + "'" + '].ch_go(' + x + ');' +
                    'this.parentElement.parentElement.style.display=' + "'none'" + ';document.getElementById(' + "'" + id_attr + "_location'" +
                    ').style.display=' + "'block'" + ';" style="display:block;">' + (x + chpapp) + '<ul>';
                for (var u = chapters[x].start; u < chapters[x].end + 1; u++) {
                    transcriptBH = transcriptBH + '<li onclick="cG.cPanel[' + "'" /*+'def_'*/ + id_attr + "'" + '].go(' + u + ');' +
                        'this.parentElement.parentElement.parentElement.style.display=' + "'none'" + ';document.getElementById(' + "'" +
                        id_attr + "_location'" + ').style.display=' + "'block'" + ';" style="display:block;">' + (u + pagapp) + '</li>';
                }
                transcriptBH = transcriptBH + '</ul></li>';
            }
            transcriptPG = transcriptPG + '</ul>';
            transcriptCH = transcriptCH + '</ul>';
            transcriptBH = transcriptBH + '</ul>';
            if (setValid(archival.innerHTML))
                archival.innerHTML = transcriptBH + transcriptPG + transcriptCH;
        }
        //HTML Collections are dynamic, move lower so we can capture the new inputs
        for (var h = 0; h < nestcom.length; h++) {
            if (nestcom[h].getAttribute("class") == "venue")
                sbvenue.push(nestcom[h]);
            else
                nstpost.push(nestcom[h]);
        }
        var srch = id_attr;
        final_res[srch] = cG.stage.construct(id_attr, myScript, anchorto, configSet);
        //console.log(sbvenue,nstpost)
        //if(cG.avx[0]>1&&cG.avx[1]>0){}
        //console.log(stages[iD])
        if (!cG.fBox.protect)
            stages[iD].setAttribute("comix", "-1"); //comix protection disabled, all stages are comix
        else if (stages[iD].getAttribute("id") == cG.comix.name)
            stages[iD].setAttribute("comix", "1");
        //Push child elements as PGes (Subordinate Elements)
        var chl = stages[iD].children;
        for (var t = 1; t < chl.length; t++) {
            if (chl[t] == anchorto)
                continue;
            final_res[srch].pg.push(chl[t]);
        }
        //Hide Non Venue Subordinate Elements
        for (var y = 0; y < nstpost.length; y++) {
            //nstpost[y].style = "display: none;"
            nstpost[y].style.display = "none";
            stages[iD].appendChild(nstpost[y]);
            final_res[srch].pg.push(nstpost[y]);
        }
        //Set up Childings (Venu Subordinate Elements/ Sub Venues)
        var childlingReq = [];
        for (var z = 0; z < sbvenue.length; z++) {
            //TODO: Investigate why this exists
            //childling.my = z;
            miniRequest(z, sbvenue[z], id_attr, childlingReq, srch);
        }
        for (var r = 0; r < final_res[srch].pg.length; r++) {
            var frspr = stick(final_res[srch].pg[r], final_res[srch].pg, final_res[srch], r);
        }
    };
    for (var i = 0; i < stages.length; i++)
        if (!stages[i].getAttribute("cgcij") == true || !cG.fBox.noverwrite)
            request(i);
    cG.cPanel = final_res;
    cG.controlInjection(stages);
    return final_res;
};
/*end STAGE creation*/
/*cG.preloadonpage = function(){
    
};*/
/*ROUTING*/
//TODO: Reduce/remove set timeout make the code reslient and async by not requiring anything
cG.route2page = cG.route2page || function () {
    //var com = cG.script.config.orderby,
    if (!cG.fBox.rtepge)
        return 0; //routing is turned off
    console.log("Routing is currently Disabled");
    return 0;
    var routeVal = this.params;
    if (cG.script) {
        var chpmod = (cG.script.config.chapterstartnum) ? 1 : 0, modify = (cG.script.config.pagestartnum) ? 1 : 0, query = {}, value = 0, pages = cG.script.pages;
        switch (routeVal.length) {
            case 1: //Can be a name 
                if (!isNaN(routeVal[0]) && Number(routeVal[0]) >= cG.script.pages.length) {
                    value = Number(routeVal[0]);
                }
                else
                    query.key1 = routeVal[0];
                break;
            case 2: //Expected to be a chapter/page
                if (!isNaN(routeVal[0]) && Number(routeVal[0]) >= cG.script.pages.length) {
                    value = cG.script.chapters[Number(routeVal[0])].start + Number(routeVal[1]) - modify; // + modify;
                }
                else {
                    query.key1 = routeVal[0];
                    query.key2 = routeVal[1];
                }
                break;
            case 3: //3 part date
                var guide = cG.script.config.dateformat.split("/");
                if (isNaN(value[0] % 1) || isNaN(value[1] % 1) || isNaN(value[2] % 1)) {
                    value = -1;
                    b = [];
                    break;
                }
                for (var tim = 0; tim < 3; tim++) {
                    if (guide[tim].indexOf("Y") + 1)
                        guide[tim] = 0;
                    else if (guide[tim].indexOf("M") + 1)
                        guide[tim] = 1;
                    else if (guide[tim].indexOf("D") + 1)
                        guide[tim] = 2; //2,1,0
                }
                if (value[guide[0]].length > 1900)
                    value[guide[0]] += 2000;
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
            for (var eq = 0; eq < csf.length; eq++)
                csf[eq].innerHTML = box.title;
            //console.log(cG.comix.name+"_location");
        }
        /*if(cG.avx[0]>1&&cG.avx[1]>0)*/
        cG.verbose(1, "AutoPage: " + cG.prePage);
    }
    else
        cG.verbose(1, "AutoPage unset due to missing cG.script");
};
/*end routing*/ 
///START///
cG.director.map("#/:v1(/:v2/:v3/:v4/:v5/:v6/:v7/:v8/:v9)").to(cG.route2page);
cG.rdy(function () {
    cG.director.listen();
    //cG.director.history.listen(true);
    /*everything else occurs here*/
    if (!document.getElementById("$COMICXX$$$")) { /*prints version information*/
        console.log("%c %c %c comix-ngn v" + cG.info.vix + " %c \u262F %c \u00A9 2015 Oluwaseun Ogedengbe %c Plugins: " + cG.$GPC, "color:white; background:#2EB531", "background:purple", "color:white; background:#32E237", 'color:red; background:black', "color:white; background:#2EB531", "color:white; background:purple");
    }
    //console.log(JSON.stringify(cG, null, 2) );
    var a = document.getElementsByTagName("SCRIPT"), b, c;
    for (var i = 0; i < a.length; i++) {
        c = a[i].getAttribute("src") || null;
        if (c == null)
            continue;
        if (c.indexOf("comixngn") >= 0) {
            b = a[i].getAttribute("auto");
            break;
        }
        ;
    }
    //console.log(cG.script.config.dir);
    if ((b === null || b || b === void 0 || b == "") && cG.fBox.fstrun) {
        //jstagecreate();
        //cG.cPanel=cG.stageInjection();
        cG.stageInjection();
        //console.log(cG.cPanel);
    }
});
//# sourceMappingURL=comixngn.js.map