interface page {
    alt: string,
    anim8: boolean,
    hover: string,
    note: string,
    perm: boolean,
    release: number,//time in ms
    title: string,
    url: string[],
    special: string,
    absolute?: boolean
}
interface chapter {
    description: string,
    end: number,
    start: number,
    title: string
}
interface script {
    chapters: chapter[],
    config: {
        chapterstartnum: boolean,
        dir: string,
        imgpostbuffer: number,
        imgprebuffer: number,
        pagestartnum: boolean,
        startpage: number,
        back: string,
    },
    loading: {
        diameter: number,
        lines: number,
        rate: number,
        xpos: number,
        ypos: number,
        back: string,
        color: string
    },
    offset: number,
    pages: page[],
    parent: any,
}
interface settings {
    overwrite?: boolean,
    anchor?: number,
    dir?: string,
    imgprebuffer?: number,
    imgpostbuffer?: number,
    back?: string,
    lines?: number,
    rate?: number,
    diameter?: number,
    loaderback?: string,
    color?: string,
}
interface direction {
    new ( input:string|string[], config?:object ) : any;
}
///DEF_STAGE///
cG.setupStage = (id: string, direction: direction) => {
    return {
        [id]: {
            id,
            construct: function (name: string, scriptt: script, anchor: HTMLElement, options: object) {
                let { config, loading, pages } = scriptt;
                var chek = function (truth:any, fals:any, iimg:page) {
                    //console.log((iimg.absolute||iimg.url[0].indexOf('https://')+1||iimg.url[0].indexOf('http://')+1),iimg.absolute,iimg.url[0].indexOf('https://')+1,iimg.url[0].indexOf('http://')+1);
                    if (iimg.url[0] === void 0) return '';
                    if (iimg.absolute || iimg.url[0].indexOf('https://') + 1 || iimg.url[0].indexOf('http://') + 1) {
                        return truth;
                    } else
                        return fals;
                },
                overwrite = -1,
                pageArr = (pages) ? pages.map((val: page) => {
                    return val.url[0];
                }) : [],
                settings:settings = {};

                if (setValid(scriptt)) {
                    if (setValid(config)) {
                        let {dir, imgprebuffer, imgpostbuffer} = config;
                        settings = {dir, imgprebuffer, imgpostbuffer, ...settings};
                    }
                    if (setValid(loading)) {
                        let {lines, rate, diameter, back, color} = loading;
                        settings = {lines, rate, diameter, back, color, ...settings};
                    }
                }

                if (typeof (Storage) !== "undefined") {
                    overwrite = parseInt(localStorage.getItem(cG.comicID + "|" + name + "|curPage") as string, 10);
                    cG.verbose(1, cG.comicID + "|" + name + "|curPage", ":", overwrite);
                }

                //prepage, which is from router, overwrites localStorage if over -1, only works on comix
                if (setValid(cG.comix)) overwrite = cG.prePage;
                if (overwrite < 0 ) overwrite = config.startpage; 

                var main = new direction(pageArr, {anchor, overwrite, ...settings});
                main.name = name;
                main.type = "def";
                main.pg = [anchor];
                main.at = 0;
                main.my = 0;
                main.internals = scriptt || {pages:[], chapters:[], config:{}, loading:{}};
                main.commitSwap = () => {
                    var tmp = main.internals,
                        internalPages = tmp.pages.map((val: page) => {
                            return val.url[0];
                        }),
                        internalSettings:settings = {};
                    let { config, loading } = tmp;
                        if (setValid(tmp)) {
                            if (setValid(config)) {
                                if (config.dir !== void(0)) internalSettings.dir = config.dir;
                                if (config.imgprebuffer !== void(0)) internalSettings.imgprebuffer = config.imgprebuffer;
                                if (config.imgpostbuffer !== void(0)) internalSettings.imgpostbuffer = config.imgpostbuffer;
                            }
                            if (tmp.loading !== void(0) && tmp.loading !== null) {
                                if (loading.lines !== void(0)) internalSettings.lines = loading.lines;
                                if (loading.rate !== void(0)) internalSettings.rate = loading.rate;
                                if (loading.diameter !== void(0)) internalSettings.diameter = loading.diameter;
                                if (loading.back !== void(0)) internalSettings.loaderback = loading.back;
                                if (loading.color !== void(0)) internalSettings.color = loading.color;
                            }
                        }
                    main.swap(internalPages, internalSettings);
                }
                var _dataOriginal = main.data;
                main.data = function (to?: number) {
                    //wrap direction data function with error handlers
                    var data = _dataOriginal(to);
                    return setValid(data) ? data : {};
                };
                main.navto = function (a?:number) {
                    if (a !== null && a !== void 0 && a < main.pg.length) return main.pg[a]._nav();
                    else return main.pg[main.my]._nav();
                }
                main.ch_data = function (a?:number) {
                    var c = main.internals.chapters;
                    var sre = (a === null || void 0 === a) ? main.ch_current() : a;//parseInt(a, 10);
                    return (main.ch_current() == -1) ? {} : (isNaN(sre)) ? c[main.ch_current()] : c[sre];
                }
                main.ch_count = function () {
                    return main.internals.chapters.length;
                }
                main.ch_current = function () {
                    var c = main.internals.chapters,
                        d = main.current();
                    for (var a = 0; a < c.length; a++) {
                        if (c[a].start <= d && d <= c[a].end) return a;
                    }
                    return -1;
                }
                main.ch_go = function (a?:number, b?:number) {
                    var sre = (a === null || void 0 === a) ? 0 : a;//parseInt(a, 10);
                    sre = (isNaN(sre)) ? 0 : sre;
                    var g;
                    if (b === null && b === void 0) g = "start";
                    else g = "end"
                    if (main.ch_current() == -1) return main.go()
                    return main.go(main.internals.chapters[Math.floor(Math.max(0, Math.min(main.internals.chapters.length - 1, sre)))][g]);
                }
                main.ch_prev = function (b?:number) {
                    if (main.ch_current() == -1) return main.go();
                    var g;
                    if (b === null && b === void 0) g = "start";
                    else g = "end"
                    return main.go(main.internals.chapters[Math.max(0, main.ch_current() - 1)][g]);
                }
                main.ch_next = function (b?:number) {
                    if (main.ch_current() == -1) return main.go();
                    var g;
                    if (b === null && b === void 0) g = "start";
                    else g = "end"
                    return main.go(main.internals.chapters[Math.min(main.ch_count() - 1, main.ch_current() + 1)][g]);
                }
                main.ch_frst = function (b?:number) {
                    if (main.ch_current() == -1) return main.go();
                    var g;
                    if (b === null && b === void 0) g = "start";
                    else g = "end"
                    return main.go(main.internals.chapters[0][g]);
                }
                main.ch_last = function (b?:number) {
                    if (main.ch_current() == -1) return main.go();
                    var g;
                    if (b === null && b === void 0) g = "start";
                    else g = "end"
                    return main.go(main.internals.chapters[main.ch_count() - 1][g]);
                }
                var lscurrent = function () {
                    if (typeof (Storage) !== void 0 && cG.fBox.pgesve) {
                        localStorage.setItem(cG.comicID + "|" + name + "|curPage", cG.cPanel[/*"def_"+*/name].current().toString());
                    }
                    if (cG.comix === cG.cPanel[/*"def_"+*/name] && cG.script.config) {//if comic is the comix, then push its state
                        let { chapterstartnum, pagestartnum, orderby, dateformat } = cG.script.config;
                        var chpmod = (chapterstartnum) ? 1 : 0,
                            modify = (pagestartnum) ? 1 : 0,
                            result = cG.cPanel[/*"def_"+*/name].current();
                        switch (orderby) {
                            case 1:
                                console.log(result);
                                var mechp = cG.cPanel[/*"def_"+*/name].ch_current();
                                result = (mechp + chpmod) + "/" + (result - cG.cPanel[/*"def_"+*/name].internals.chapters[mechp].start + modify)
                                break;
                            case 2:
                                var nT = new Date(cG.cPanel[/*"def_"+*/name].data().release * 1000);
                                var guide = dateformat.split("/");
                                for (var tim = 0; tim < 3; tim++) {
                                    if (guide[tim].indexOf("Y") + 1) guide[tim] = nT.getFullYear() - 100 + 2000; //TODO: what is this?
                                    else if (guide[tim].indexOf("M") + 1) guide[tim] = nT.getMonth() + 1;
                                    else if (guide[tim].indexOf("D") + 1) guide[tim] = nT.getDate();
                                }
                                result = guide.join("/");
                                //console.log(result,guide,nT);
                                break;
                            default:
                                result += modify;
                        }
                        //if(cG.avx[0]>0&&cG.avx[1]>0) 
                        cG.verbose(1, name, "Pushing state:", result);
                        if (cG.fBox.pgepsh) history.pushState({}, '', "#/" + result);
                    }
                    if (cG.queue.stageChange !== void 0)
                        for (var ftn in cG.queue.stageChange) {
                            if (cG.queue.stageChange.hasOwnProperty(ftn)) cG.queue.stageChange[ftn](cG.cPanel[/*"def_"+*/name]);
                        }
                    var strct = cG.cPanel[/*"def_"+*/name].data(cG.cPanel[/*"def_"+*/name].current()).special;
                    var zombie = document.getElementById(name + "_tempScript");//fetch zombie child
                    var preload = stick(cG.cPanel[/*"def_"+*/name].canvi[0], null, null, 0);
                    var display = stick(cG.cPanel[/*"def_"+*/name].canvi[1], null, null, 1);
                    if (zombie !== void 0 && zombie !== null) {
                        anchor.removeChild(zombie);//kill the zombie
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
                }
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
    /*#PASTE:https://raw.githubusercontent.com/ogewan/direction.js/master/directionx.js#*/
    cG.REPO.stage = cG.setupStage("def", direction);
}
///////
cG.stage = cG.REPO.stage.def;