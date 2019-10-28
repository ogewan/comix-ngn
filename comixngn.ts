import direction from './directionx.js';
import pegasus from './pegasus.min.js';
console.log('comix-ngn v2');

class Hexstring {
    value: number;
    toString = () => this.value.toString(16);
    constructor(input: string|number) {
        if (typeof input === 'string') {
            this.value = parseInt(input, 16);
        } else {
            this.value = input;
        }
    }
}
class Version {
    constructor(public major = 0, public minor = 0, public patch = 0) { }
    toString() {
        const { major, minor, patch } = this;
        return `${major}.${minor}.${patch}`;
    }
}
class Page {
    url: string[] = [];
    altText?: string;
    hover?: string;
    note?: string;
    title?: string;
    script?: string;
    absolute?: boolean;
    animate?: boolean;
    permanent?: boolean;
    release?: number;
    constructor(input: string|string[]|null, config?: any) {
        let url;
        if (input) {
            if (typeof input === 'string') {
                url = [input];
            } else {
                url = input;
            }
            Object.assign(this, {...config, url});
        } else {
            Object.assign(this, config);
        }
    }
    collapse() {
        return this.url.length ? this.url[0] : '';
    }
    toString() {
        const keys = Object.keys(this);
        if (keys.length === 1) {
            return JSON.stringify(this.url);
        }
        return JSON.stringify(this);
    }
}
class Chapter {
    title?: string;
    description?: string;
    constructor(public start: number, public end: number) {
        if (start > end) {
            let tmp = start;
            start = end;
            end = tmp;
        }
    }
    toString() {
        return JSON.stringify(this);
    }
}
class Schema {
    pages: Page[] = [];
    chapters: Chapter[] = [];
    config = {
        chapterStartAt: 0,
        pageStartAt: 0,
        dir: '',
        imgpostbuffer: 5,
        imgprebuffer: 5,
        startPage: 0,
        back: new Hexstring(0)
    };
    loading = {
        diameter: 250,
        lines: 16,
        rate: 1000/30,
        back: new Hexstring("#FFF"),
        color: new Hexstring("#373737")
    };

    constructor(script: any) {
        try {
            let raw;
            if (typeof script === 'string') {
                raw = JSON.parse(script);
            }
            else {
                raw = script;
            }
            if (raw.pages.length) {
                raw.pages = raw.pages.map((e: any) => {
                    if (e.url) {
                        return new Page(null, e);
                    }
                    return new Page(e);
                });
            }
            if (raw.chapters.length) {
                raw.chapters = raw.chapters.map((e: any) => new Chapter(e.start, e.end));
            }
            Object.assign(this, raw);
        } catch (e) {
            const error = 'Failed to create script\n';
            throw error + e;
        }
    }
    exportPages(ids: number[] = []) {
        if (ids.length) {
            let idMap = new Map<number, boolean>();
            ids.reduce((map, key) => map.set(key, true), new Map<number, boolean>());
            return this.pages.filter((page, id) => idMap.set(id, true)).map((page: Page) => page.collapse());
        }
        return this.pages.map((page: Page) => page.collapse());
    }
}

let comixngn: () => Comixngn;
//generate_comixngn
(() => {
    let core: Comixngn;
    comixngn = () => {
        if (core) return core;
        return new Comixngn();
    };
})();

class Comixngn {
    //_id = "";
    coreVersion = new Version(2, 0, 0);
    cxxVersion = new Version(0, 0, 2);
    bookMap: Map<string, CmxBook> = new Map();
   /* get id () {
        return this._id;
    }
    set id (_id: string) {
        this._id = _id;
    }*/
    private sysmsg = `%c %c %c comix-ngn v${this.coreVersion} %c \u262F %c \u00A9 2020 Oluwaseun Ogedengbe %c`;
    private sysclr = ["color:white; background:#2EB531", "background:purple","color:white; background:#32E237", 'color:red; background:black', "color:white; background:#2EB531", "color:white; background:purple"];

    constructor() {
        console.log(this.sysmsg, ...this.sysclr);
    }
}
class CmxBook extends HTMLElement {
    [key: string]: any;
    schema?: Schema;
    controller?: CmxCtrl;
    _uid: string;
    _cid: string;
    core: Comixngn;
    shadow: ShadowRoot;
    constructor() {
        super();
        this.core = comixngn();
        const {core} = this;

        let j = 1;
        let uid = `STG${j}`;
        while (core.bookMap.get(uid)) {
            uid = `STG${++j}`;
        }
        this._uid = uid;
        core.bookMap.set(uid, this);

        this._cid = window.location.host;
        this.shadow = this.attachShadow({mode: 'open'});

        const schemaPath = this.getAttribute('schema');
        if (schemaPath) {
            (<any>pegasus)(schemaPath).then(this.initializeDisplay.bind(this));
        } else {
            this.initializeDisplay();
        }
        console.log('construct cmxbook');
    }
    private initializeDisplay(data?: any) {
        if (data) this.schema = new Schema(data);
        const { shadow } = this;
        //call custom constructor
        const pages = this.schema ? this.schema.exportPages() : [];
        const base = new (<any>direction)(pages, {anchor: shadow});
        this.defineMethods(base);
        console.log('Intialize Display');
        const ctrlPath = this.getAttribute('controller');
        if (ctrlPath) {
            (<any>pegasus)(ctrlPath).then(this.initializeControls.bind(this));
        } else {
            this.controller = <CmxCtrl> document.createElement('comix-ctrl');
            this.insertAdjacentElement('afterend', this.controller);
        }
    }
    private initializeControls(data?: any) {
        if (data) {
            this.controller = new CmxCtrl(data);
            this.insertAdjacentElement('afterend', this.controller);
        }
    }

    private defineMethods(base: any) {
        this.go = base.go;
        this.prev = base.prev;
        this.next = base.next;
        this.frst = base.first;
        this.last = base.last;
        this.ch_go = () => {};
        this.ch_prev
        this.ch_next
        this.ch_frst
        this.ch_last
        /*
        
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
                }*/
    }

    set uid(val: string) {
        if (this.core.bookMap.has(val)) {
            console.error(`CmxBook with uid ${val} already exist.`);
        } else {
            this.core.bookMap.set(val, this);
            this.core.bookMap.delete(this._uid);
            this._uid = val;
        }
    }
    set cid(val: string) {
        //delete old local storage
        this._cid;
        //add new local storage
        this._cid = val;

    }
    get uid() { return this._uid; }
    get cid() { return this._cid; }
    static get observedAttributes() {
        return ['cid', 'uid'];
    }
    attributeChangedCallback(name: string, oldVal: string, newVal: string) {
        oldVal;
        this[name] = newVal;
    }
    _oldAttributeValue: any;

    go(to?: number): number|void{}
    prev(): number|void {}
    next(): number|void {}
    frst(): number|void {}
    last(): number|void {}
    ch_go(to?:number): number|void {}
    ch_prev(): number|void {}
    ch_next(): number|void {}
    ch_frst(): number|void {}
    ch_last(): number|void {}
    /*
    count(): number|void {}
    current(): number|void {}
    ch_count(): number|void {}
    ch_current(): number|void {}
    data(to?: number): page|void {}
    ch_data(to?: number): chapter|void {}
    */
}
class CmxCtrl extends HTMLElement {
    constructor(public book: CmxBook) {
        super();
    }
}
customElements.define('comix-ngn', CmxBook);
customElements.define('comix-ctrl', CmxCtrl);