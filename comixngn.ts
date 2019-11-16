import direction from './lib/directionx.js';
import pegasus from './lib/pegasus.min.js';
import Path from './lib/path.min.js';
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
    private pageChapterMap = new Map<number, number>();

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
    mapPageChapter(indicies?: number[]) {
        this.chapters = this.chapters.sort((a, b) => a.start - b.start);
        const chapters = this.chapters.filter((e, index) => !indicies || indicies.includes(index));
        chapters.forEach((chapter, chapterID, chapters) => {
            const next = chapters[chapterID + 1];
            const start = chapter.start;
            const end = (next) ? next.start : this.pages.length;
            if (start >= end) return;
            for (let pageID = start; pageID < end; pageID++) {
                this.pageChapterMap.set(pageID, chapterID);
            }
        });
    }
    pageToChapter(id: number = 0) {
        return this.pageChapterMap.get(id) || 0;
    }
    chapterToPage(id: number = 0) {
        const chapter = this.chapters[id];
        return (chapter) ? chapter.start : 0;
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
    //SINGLETON
    coreVersion = new Version(2, 0, 0);
    cxxVersion = new Version(0, 0, 2);
    bookMap: Map<string, CmxBook> = new Map();
    
    private _priority = false;
    private _sysmsg = `%c %c %c comix-ngn v${this.coreVersion} %c \u262F %c \u00A9 2020 Oluwaseun Ogedengbe %c`;
    private _sysclr = ["color:white; background:#2EB531", "background:purple", "color:white; background:#32E237", 'color:red; background:black', "color:white; background:#2EB531", "color:white; background:purple"];
    private _setting: any;
    get setting() {
        return this._setting;
    }

    private defRoute = "#/:v1(/:v2/:v3/:v4/:v5/:v6/:v7/:v8/:v9)";
    private routing() {}

    constructor() {
        const {defRoute, routing} = this;
        console.log(this._sysmsg, ...this._sysclr);
        Path.map(defRoute).to(routing);
    }

    priorityConfig(setting: any) {
        this.config(setting, true);
    }
    config(setting: any, priority?: boolean) {
        if (this._priority || priority) {
            if (priority) {
                this._priority = true;
            } else {
                return;
            }
        }
        this._setting = setting;
    }
    reset() {
        this._priority = false;
    }
}
class CmxCore extends HTMLElement {
    private _core: Comixngn;
    get core() { return this._core; }
    get initialized() {
        return true;
    }
    constructor() {
        super();
        this.innerHTML = '';
        this._core = comixngn();
        this.setCore(this.getAttribute('config'));
    }
    setCore(configPath: string|null) {
        const core = this._core;
        if (configPath) {
            try {
                core.priorityConfig(JSON.parse(configPath));
            } catch {
                (<any>pegasus)(configPath).then(core.priorityConfig);
            }
        }
    }
    static get observedAttributes() {
        return ['config'];
    }
    attributeChangedCallback(name: string, oldVal: string, newVal: string) {
        this.setCore(newVal);
    }
}
class CmxBook extends HTMLElement {
    [key: string]: any;
    controller?: CmxCtrl;
    private _schema?: Schema;
    private _uid: string;
    private _cid: string;
    private _core: Comixngn;
    private _active = false;
    get core() { return this._core; };
    shadow: ShadowRoot;
    constructor() {
        super();
        this._core = comixngn();
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

        /*const schemaPath = this.getAttribute('schema');
        if (schemaPath) {
            (<any>pegasus)(schemaPath).then(this.initializeDisplay.bind(this));
        } else {
            this.initializeDisplay();
        }
        this._setconfig(this.getAttribute('config'));*/
        console.log('construct cmxbook');
    }
    private convertToDirectionSetting() {
        const {_schema, _core} = this;
        const setting = _core.setting;
        const {config, loading} = _schema!;
        const {dir, imgprebuffer, imgpostbuffer, startPage} = config;
        const {diameter, lines, rate} = loading;
        const back = config.back.toString();
        const loaderback = loading.back.toString();
        const color = loading.color.toString();
        const overwrite = startPage;

        return {
            overwrite,
            dir,
            imgprebuffer,
            imgpostbuffer,
            diameter,
            lines,
            rate,
            back,
            loaderback,
            color,
            ...setting
        };
    }
    private initializeDisplay() {
        // DIRECTION specific
        const { shadow } = this;
        //call custom constructor
        const pages = this._schema ? this._schema.exportPages() : [];
        const settings = this._schema ? this.convertToDirectionSetting() : {};
        const base = new (<any>direction)(pages, { ...settings, anchor: shadow });
        this.defineMethods(base);
        console.log('Intialize Display');
        this._active = true;
        const ctrlPath = this.getAttribute('controller');
        if (ctrlPath) {
            (<any>pegasus)(ctrlPath).then(this.initializeControls.bind(this));
        } else {
            /*this.controller = <CmxCtrl>document.createElement('comix-ctrl');
            this.insertAdjacentElement('afterend', this.controller);*/
            this.initializeControls();
        }
    }
    private initializeControls(data?: any) {
        this.controller = new CmxCtrl(this, data);
        this.insertAdjacentElement('afterend', this.controller);
    }
    private defineMethods(base: any) {
        // DIRECTION specific
        let pageToChapter = (a: any) => 0;
        let chapterToPage = (a: any) => 0;
        if (this._schema) {
            pageToChapter = this._schema.pageToChapter;
            chapterToPage = this._schema.chapterToPage;
        }
        this.rand = base.rand;
        this.go = base.go;
        this.prev = base.prev;
        this.next = base.next;
        this.frst = base.frst;
        this.last = base.last;
        this.ch_go = (to?: number) => pageToChapter(this.go(pageToChapter(to)));
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
        const setUpdate = (data: any) => {
            if (!(data instanceof Schema)) {
                data = new Schema(data);
            }
            this._schema = data;
            if (this._active) {
                this.update();
            } else {
                this.initializeDisplay();
            }
        }
        if (typeof input === 'string') {
            try {
                setUpdate(JSON.parse(input));
            } catch {
                (<any>pegasus)(input).then(setUpdate);
            }
        } else {
            setUpdate(input);
        }
    }
    set config(configPath: string|null) {
        if (configPath) {
            try {
                this.core.config(JSON.parse(configPath));
            } catch {
                (<any>pegasus)(configPath).then(this.core.config.bind(this.core));
            }
        }
    }
    get uid() { return this._uid; };
    get cid() { return this._cid; };
    get config() { return this.getAttribute('config');}
    get schema() { return this._schema; };
    static get observedAttributes() {
        return ['cid', 'uid', 'schema', 'config'];
    }
    attributeChangedCallback(name: string, oldVal: string, newVal: string) {
        oldVal;
        this[name] = newVal;
    }
    //_oldAttributeValue: any;

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
    pg_data(to?: number): Page | void { }
    ch_data(to?: number): Chapter | void { }
}
class CmxCtrl extends HTMLElement {
    shadow: ShadowRoot;
    private _ctrlarray: HTMLElement[];
    private _book?: CmxBook;
    [key: string]: any;
    private makeButton(txt?: string|null, classes?: string[]|null, click?: (this: GlobalEventHandlers, ev: MouseEvent) => any) {
        const liNode = document.createElement('li');
        const button = document.createElement('button');
        button.innerText = txt || '';
        if (classes) {
            button.classList.add(...classes);
        }
        if (click) {
            button.onclick = click;
        }
        liNode.appendChild(button);
        return liNode;
    }
    private btnAssign() {
        const book = this._book;
        if (book) {
            const cmdarray = [book.frst, book.prev, book.rand, book.next, book.last];
            this._ctrlarray.map((e, i) => {
                e.onclick = cmdarray[i];
            });
        }
    }
    constructor(book: CmxBook|null, template?: any) {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.innerHTML = `<style>
        ol {
            list-style-type: none;
        }
        li {
            display: inline;
        }
        </style>`;
        const defaultCtrl = document.createElement('ol');
        const {makeButton} = this;
        this._ctrlarray = [
            makeButton('|<', ['frst']),
            makeButton('< Prev', ['prev']),
            makeButton('Random', ['rand']),
            makeButton('Next >', ['next']),
            makeButton('>|', ['last'])
        ];
        if (book) {
            this._book = book;
            this.btnAssign();
        } else {
            const bookId = this.getAttribute('book');
            if (bookId) {
                this.book = bookId;
            }
        }
        defaultCtrl.append(...this._ctrlarray);
        this.shadow.appendChild(defaultCtrl);
    }
    static get observedAttributes() {
        return ['book'];
    }
    attributeChangedCallback(name: string, oldVal: string, newVal: string) {
        oldVal;
        this[name] = newVal;
    }
    set book(id: string) {
        const core = comixngn();
        this._book = core.bookMap.get(id);
        this.btnAssign();
    }
    get book() {
        return <any> this._book;
    }
    bookId() { return this._book ? this._book.uid : void(0)}
}
customElements.define('comix-core', CmxCore);
customElements.define('comix-ngn', CmxBook);
customElements.define('comix-ctrl', CmxCtrl);