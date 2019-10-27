//import direction from './directionx.js';
console.log('comix-ngn v2');
class Hexstring {
    constructor(input) {
        this.toString = () => this.value.toString(16);
        if (typeof input === 'string') {
            this.value = parseInt(input, 16);
        }
        else {
            this.value = input;
        }
    }
}
class Version {
    constructor(major = 0, minor = 0, patch = 0) {
        this.major = major;
        this.minor = minor;
        this.patch = patch;
    }
    toString() {
        const { major, minor, patch } = this;
        return `${major}.${minor}.${patch}`;
    }
}
class Page {
    constructor(input, config) {
        this.url = [];
        let url;
        if (typeof input === 'string') {
            url = [input];
        }
        else {
            url = input;
        }
        Object.assign(this, Object.assign({}, config, { url }));
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
    constructor(start, end) {
        this.start = start;
        this.end = end;
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
    constructor(script) {
        this.pages = [];
        this.chapters = [];
        this.config = {
            chapterStartAt: 0,
            pageStartAt: 0,
            dir: '',
            imgpostbuffer: 5,
            imgprebuffer: 5,
            startPage: 0,
            back: new Hexstring(0)
        };
        this.loading = {
            diameter: 250,
            lines: 16,
            rate: 1000 / 30,
            back: new Hexstring("#FFF"),
            color: new Hexstring("#373737")
        };
        try {
            const raw = JSON.parse(script);
            if (raw.pages && raw.pages.length) {
                raw.pages = raw.pages.map((e) => {
                    if (e.url) {
                        return new Page(null, e);
                    }
                    return new Page(e);
                });
            }
            if (raw.chapters && raw.chapters.length) {
                raw.chapters = raw.chapters.map((e) => new Chapter(e.start, e.end));
            }
            Object.assign(this, raw);
        }
        catch (_a) {
            const error = 'Failed to create script';
            throw error;
        }
    }
}
let comixngn;
//generate_comixngn
(() => {
    let core;
    comixngn = () => {
        if (core)
            return core;
        return new Comixngn();
    };
})();
class Comixngn {
    constructor() {
        //_id = "";
        this.coreVersion = new Version(2, 0, 0);
        this.cxxVersion = new Version(0, 0, 2);
        this.bookMap = new Map();
        /* get id () {
             return this._id;
         }
         set id (_id: string) {
             this._id = _id;
         }*/
        this.sysmsg = `%c %c %c comix-ngn v${this.coreVersion} %c \u262F %c \u00A9 2015 Oluwaseun Ogedengbe %c`;
        this.sysclr = ["color:white; background:#2EB531", "background:purple", "color:white; background:#32E237", 'color:red; background:black', "color:white; background:#2EB531", "color:white; background:purple"];
        console.log(this.sysmsg, ...this.sysclr);
    }
}
class CmxBook extends HTMLElement {
    constructor() {
        super();
        this.core = comixngn();
        const { core } = this;
        let j = 1;
        let uid = `STG${j}`;
        while (!core.bookMap.get(uid)) {
            uid = `STG${++j}`;
        }
        this._uid = uid;
        core.bookMap.set(uid, this);
        this._cid = window.location.host;
        //call custom constructor
        //const base = new direction();
        console.log('construct cmxbook');
    }
    set uid(val) {
        if (this.core.bookMap.has(val)) {
            console.error(`CmxBook with uid ${val} already exist.`);
        }
        else {
            this.core.bookMap.set(val, this);
            this.core.bookMap.delete(this._uid);
            this._uid = val;
        }
    }
    set cid(val) {
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
    attributeChangedCallback(name, oldVal, newVal) {
        oldVal;
        this[name] = newVal;
    }
    go(to) { }
    prev() { }
    next() { }
    frst() { }
    last() { }
    ch_go(to) { }
    ch_prev() { }
    ch_next() { }
    ch_frst() { }
    ch_last() { }
}
class CmxCtrl extends HTMLElement {
    constructor(book) {
        super();
        this.book = book;
    }
}
customElements.define('comix-ngn', CmxBook);
//# sourceMappingURL=comixngn.js.map