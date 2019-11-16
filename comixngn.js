import direction from './lib/directionx.js';
import pegasus from './lib/pegasus.min.js';
import Path from './lib/path.min.js';
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
        if (input) {
            if (typeof input === 'string') {
                url = [input];
            }
            else {
                url = input;
            }
            Object.assign(this, Object.assign({}, config, { url }));
        }
        else {
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
    constructor(start, title, description) {
        this.start = start;
        this.title = title;
        this.description = description;
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
        this.pageChapterMap = new Map();
        try {
            let raw;
            if (typeof script === 'string') {
                raw = JSON.parse(script);
            }
            else {
                raw = script;
            }
            if (raw.pages.length) {
                raw.pages = raw.pages.map((e) => {
                    if (e.url) {
                        return new Page(null, e);
                    }
                    return new Page(e);
                });
            }
            if (raw.chapters.length) {
                raw.chapters = raw.chapters.map((e) => new Chapter(e.start, e.title, e.description)).sort((a, b) => a.start - b.start);
            }
            Object.assign(this, raw);
        }
        catch (e) {
            const error = 'Failed to create script\n';
            throw error + e;
        }
    }
    exportPages(ids = []) {
        if (ids.length) {
            let idMap = new Map();
            ids.reduce((map, key) => map.set(key, true), new Map());
            return this.pages.filter((page, id) => idMap.set(id, true)).map((page) => page.collapse());
        }
        return this.pages.map((page) => page.collapse());
    }
    mapPageChapter(indicies) {
        this.chapters = this.chapters.sort((a, b) => a.start - b.start);
        const chapters = this.chapters.filter((e, index) => !indicies || indicies.includes(index));
        chapters.forEach((chapter, chapterID, chapters) => {
            const next = chapters[chapterID + 1];
            const start = chapter.start;
            const end = (next) ? next.start : this.pages.length;
            if (start >= end)
                return;
            for (let pageID = start; pageID < end; pageID++) {
                this.pageChapterMap.set(pageID, chapterID);
            }
        });
    }
    pageToChapter(id = 0) {
        return this.pageChapterMap.get(id) || 0;
    }
    chapterToPage(id = 0) {
        const chapter = this.chapters[id];
        return (chapter) ? chapter.start : 0;
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
        //SINGLETON
        this.coreVersion = new Version(2, 0, 0);
        this.cxxVersion = new Version(0, 0, 2);
        this.bookMap = new Map();
        this._priority = false;
        this._sysmsg = `%c %c %c comix-ngn v${this.coreVersion} %c \u262F %c \u00A9 2020 Oluwaseun Ogedengbe %c`;
        this._sysclr = ["color:white; background:#2EB531", "background:purple", "color:white; background:#32E237", 'color:red; background:black', "color:white; background:#2EB531", "color:white; background:purple"];
        this.defRoute = "#/:v1(/:v2/:v3/:v4/:v5/:v6/:v7/:v8/:v9)";
        const { defRoute, routing } = this;
        console.log(this._sysmsg, ...this._sysclr);
        Path.map(defRoute).to(routing);
    }
    get setting() {
        return this._setting;
    }
    routing() { }
    priorityConfig(setting) {
        this.config(setting, true);
    }
    config(setting, priority) {
        if (this._priority || priority) {
            if (priority) {
                this._priority = true;
            }
            else {
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
    setCore(configPath) {
        const core = this._core;
        if (configPath) {
            try {
                core.priorityConfig(JSON.parse(configPath));
            }
            catch (_a) {
                pegasus(configPath).then(core.priorityConfig);
            }
        }
    }
    static get observedAttributes() {
        return ['config'];
    }
    attributeChangedCallback(name, oldVal, newVal) {
        this.setCore(newVal);
    }
}
class CmxBook extends HTMLElement {
    constructor() {
        super();
        this._active = false;
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
    get core() { return this._core; }
    ;
    convertToDirectionSetting() {
        const { _schema, _core } = this;
        const setting = _core.setting;
        const { config, loading } = _schema;
        const { dir, imgprebuffer, imgpostbuffer, startPage } = config;
        const { diameter, lines, rate } = loading;
        const back = config.back.toString();
        const loaderback = loading.back.toString();
        const color = loading.color.toString();
        const overwrite = startPage;
        return Object.assign({ overwrite,
            dir,
            imgprebuffer,
            imgpostbuffer,
            diameter,
            lines,
            rate,
            back,
            loaderback,
            color }, setting);
    }
    initializeDisplay() {
        // DIRECTION specific
        const { shadow } = this;
        //call custom constructor
        const pages = this._schema ? this._schema.exportPages() : [];
        const settings = this._schema ? this.convertToDirectionSetting() : {};
        const base = new direction(pages, Object.assign({}, settings, { anchor: shadow }));
        this.defineMethods(base);
        console.log('Intialize Display');
        this._active = true;
        const ctrlPath = this.getAttribute('controller');
        if (ctrlPath) {
            pegasus(ctrlPath).then(this.initializeControls.bind(this));
        }
        else {
            /*this.controller = <CmxCtrl>document.createElement('comix-ctrl');
            this.insertAdjacentElement('afterend', this.controller);*/
            this.initializeControls();
        }
    }
    initializeControls(data) {
        this.controller = new CmxCtrl(this, data);
        this.insertAdjacentElement('afterend', this.controller);
    }
    defineMethods(base) {
        // DIRECTION specific
        let pageToChapter = (a) => 0;
        let chapterToPage = (a) => 0;
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
        this.ch_go = (to) => pageToChapter(this.go(pageToChapter(to)));
        this.ch_prev = () => pageToChapter(this.go(chapterToPage(this.ch_current() - 1)));
        this.ch_next = () => pageToChapter(this.go(chapterToPage(this.ch_current() + 1)));
        this.ch_frst = () => pageToChapter(this.go(chapterToPage(0)));
        this.ch_last = () => pageToChapter(this.go(chapterToPage(this._schema ? this._schema.chapters.length : 0)));
        this.update = () => {
            const swap = base.swap;
            const pages = this._schema ? this._schema.exportPages() : [];
            const settings = this._schema ? this.convertToDirectionSetting(this._schema) : {};
            swap(pages, Object.assign({}, settings, { anchor: this.shadow }));
        };
        this.current = base.current;
        this.ch_current = () => { pageToChapter(this.current()); };
        this.rawData = base.data;
        this.pg_data = (to) => {
            if (this._schema && this._schema.pages.length) {
                return this._schema.pages[to || this.current() || 0];
            }
        };
        this.ch_data = (to) => {
            if (this._schema && this._schema.chapters.length) {
                return this._schema.chapters[to || this.ch_current() || 0];
            }
        };
    }
    exportSchema() {
        return JSON.stringify(this._schema);
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
    set schema(input) {
        const setUpdate = (data) => {
            if (!(data instanceof Schema)) {
                data = new Schema(data);
            }
            this._schema = data;
            if (this._active) {
                this.update();
            }
            else {
                this.initializeDisplay();
            }
        };
        if (typeof input === 'string') {
            try {
                setUpdate(JSON.parse(input));
            }
            catch (_a) {
                pegasus(input).then(setUpdate);
            }
        }
        else {
            setUpdate(input);
        }
    }
    set config(configPath) {
        if (configPath) {
            try {
                this.core.config(JSON.parse(configPath));
            }
            catch (_a) {
                pegasus(configPath).then(this.core.config.bind(this.core));
            }
        }
    }
    get uid() { return this._uid; }
    ;
    get cid() { return this._cid; }
    ;
    get config() { return this.getAttribute('config'); }
    get schema() { return this._schema; }
    ;
    static get observedAttributes() {
        return ['cid', 'uid', 'schema', 'config'];
    }
    attributeChangedCallback(name, oldVal, newVal) {
        oldVal;
        this[name] = newVal;
    }
    //_oldAttributeValue: any;
    rand() { }
    ;
    go(to) { }
    ;
    prev() { }
    ;
    next() { }
    ;
    frst() { }
    ;
    last() { }
    ;
    ch_go(to) { }
    ;
    ch_prev() { }
    ;
    ch_next() { }
    ;
    ch_frst() { }
    ;
    ch_last() { }
    ;
    update() { }
    ;
    current() { }
    ;
    ch_current() { }
    ;
    rawData(to) { }
    pg_data(to) { }
    ch_data(to) { }
}
class CmxCtrl extends HTMLElement {
    makeButton(txt, classes, click) {
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
    btnAssign() {
        const book = this._book;
        if (book) {
            const cmdarray = [book.frst, book.prev, book.rand, book.next, book.last];
            this._ctrlarray.map((e, i) => {
                e.onclick = cmdarray[i];
            });
        }
    }
    constructor(book, template) {
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
        const { makeButton } = this;
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
        }
        else {
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
    attributeChangedCallback(name, oldVal, newVal) {
        oldVal;
        this[name] = newVal;
    }
    set book(id) {
        const core = comixngn();
        this._book = core.bookMap.get(id);
        this.btnAssign();
    }
    get book() {
        return this._book;
    }
    bookId() { return this._book ? this._book.uid : void (0); }
}
customElements.define('comix-core', CmxCore);
customElements.define('comix-ngn', CmxBook);
customElements.define('comix-ctrl', CmxCtrl);
//# sourceMappingURL=comixngn.js.map