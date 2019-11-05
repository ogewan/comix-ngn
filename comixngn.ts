import direction from './directionx.js';
import pegasus from './pegasus.min.js';
console.log('comix-ngn v2');

class Hexstring {
    value: number;
    toString = () => this.value.toString(16);
    constructor(input: string | number) {
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
    constructor(input: string | string[] | null, config?: any) {
        let url;
        if (input) {
            if (typeof input === 'string') {
                url = [input];
            } else {
                url = input;
            }
            Object.assign(this, { ...config, url });
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
    constructor(public start: number, public title?: string, public description?: string) { }
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
        rate: 1000 / 30,
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
                raw.chapters = (<any[]>raw.chapters).map((e: any) => new Chapter(e.start, e.title, e.description)).sort((a: Chapter, b: Chapter) => a.start - b.start);
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
    private sysclr = ["color:white; background:#2EB531", "background:purple", "color:white; background:#32E237", 'color:red; background:black', "color:white; background:#2EB531", "color:white; background:purple"];

    constructor() {
        console.log(this.sysmsg, ...this.sysclr);
    }
}
class CmxBook extends HTMLElement {
    [key: string]: any;
    controller?: CmxCtrl;
    _schema?: Schema;
    _uid: string;
    _cid: string;
    core: Comixngn;
    shadow: ShadowRoot;
    constructor() {
        super();
        this.core = comixngn();
        const { core } = this;

        let j = 1;
        let uid = `STG${j}`;
        while (core.bookMap.get(uid)) {
            uid = `STG${++j}`;
        }
        this._uid = uid;
        core.bookMap.set(uid, this);

        this._cid = window.location.host;
        this.shadow = this.attachShadow({ mode: 'open' });

        const schemaPath = this.getAttribute('schema');
        if (schemaPath) {
            (<any>pegasus)(schemaPath).then(this.initializeDisplay.bind(this));
        } else {
            this.initializeDisplay();
        }
        console.log('construct cmxbook');
    }
    private convertToDirectionSetting(data: Schema) {

    }
    private pageChapterMap(chapterID?: number) {
        
    }
    private initializeDisplay(data?: any) {
        // DIRECTION specific
        if (data) this._schema = new Schema(data);
        const { shadow } = this;
        //call custom constructor
        const pages = this._schema ? this._schema.exportPages() : [];
        const settings = this._schema ? this.convertToDirectionSetting(this._schema) : {};
        const base = new (<any>direction)(pages, { ...settings, anchor: shadow });
        this.defineMethods(base);
        console.log('Intialize Display');
        const ctrlPath = this.getAttribute('controller');
        if (ctrlPath) {
            (<any>pegasus)(ctrlPath).then(this.initializeControls.bind(this));
        } else {
            this.controller = <CmxCtrl>document.createElement('comix-ctrl');
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
        // DIRECTION specific
        const { pageToChapter, chapterToPage } = this;
        const chapterNavigation = (method: Function, to?: number) => {
            if (to !== 0 && !to) {
                to = this.current() || 0;
            }
            return chapterToPage(method(pageToChapter(to)));
        }
        this.rand = base.rand;
        this.go = base.go;
        this.prev = base.prev;
        this.next = base.next;
        this.frst = base.first;
        this.last = base.last;
        this.ch_go = (to?: number) => pageToChapter(this.go(pageToChapter(to)));
        {
            // if (this.ch_current() == -1) return this.go()
            // return this.go(this._schema.chapters[Math.floor(Math.max(0, Math.min(main.internals.chapters.length - 1, sre)))][g]);
        };
        this.ch_prev = () => pageToChapter(this.go(chapterToPage((<number>this.ch_current()) - 1)));
        this.ch_next = () => pageToChapter(this.go(chapterToPage((<number>this.ch_current()) + 1)));
        this.ch_frst = () => pageToChapter(this.go(chapterToPage(0)));
        this.ch_last = () => pageToChapter(this.go(chapterToPage(this._schema ? this._schema.chapters.length : 0)));
        this.update = () => {
            const swap = <(arr: string[], opts: any, start?: number) => void>base.swap;
            const pages = this._schema ? this._schema.exportPages() : [];
            const settings = this._schema ? this.convertToDirectionSetting(this._schema) : {};
            swap(pages, { ...settings, anchor: this.shadow });
        };
        this.current = base.current;
        this.ch_current = () => { pageToChapter(this.current()) };
        this.rawData = base.data;
        this.pg_data = (to?: number) => {
            if (this._schema && this._schema.pages.length) {
                return this._schema.pages[to || this.current() || 0];
            }
        }
        this.ch_data = (to?: number) => {
            if (this._schema && this._schema.chapters.length) {
                return this._schema.chapters[to || this.ch_current() || 0];
            }
        }
    }

    exportSchema() {
        return JSON.stringify(this._schema);
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
    set schema(input: any) {
        if (!(input instanceof Schema)) {
            input = new Schema(input);
        }
        Object.assign(this._schema, input);
        this.update();
    }
    get uid() { return this._uid; };
    get cid() { return this._cid; };
    get schema() { return this._schema; };
    static get observedAttributes() {
        return ['cid', 'uid'];
    }
    attributeChangedCallback(name: string, oldVal: string, newVal: string) {
        oldVal;
        this[name] = newVal;
    }
    _oldAttributeValue: any;

    rand(): number | void { };
    go(to?: number): number | void { };
    prev(): number | void { };
    next(): number | void { };
    frst(): number | void { };
    last(): number | void { };
    ch_go(to?: number): number | void { };
    ch_prev(): number | void { };
    ch_next(): number | void { };
    ch_frst(): number | void { };
    ch_last(): number | void { };
    update(): void { };
    current(): number | void { };
    ch_current(): number | void { };
    rawData(to?: number): any | void { }
    data(to?: number): Page | void { }
    ch_data(to?: number): Chapter | void { }
}
class CmxCtrl extends HTMLElement {
    constructor(public book: CmxBook) {
        super();
    }
}
customElements.define('comix-ngn', CmxBook);
customElements.define('comix-ctrl', CmxCtrl);