import direction from '../lib/directionx.js';
import pegasus from '../lib/pegasus.min.js';
import { CmxCtrl } from './cmxctrl.js';
import { Comixngn, comixngn } from './comixngn.core.js';

export class CmxBook extends HTMLElement {
    [key: string]: any;
    controller?: CmxCtrl;
    private _schema?: Schema;
    private _uid: string;
    private _cid: string;
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
        return {};
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
    data(to?: number): Page | void { }
    ch_data(to?: number): Chapter | void { }
}
customElements.define('comix-ngn', CmxBook);