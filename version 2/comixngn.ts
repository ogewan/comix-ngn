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

class Schema {
    pages: page[];
    chapters: chapter[];
    config: {
        chapterstartnum: boolean,
        dir: string,
        imgpostbuffer: number,
        imgprebuffer: number,
        pagestartnum: boolean,
        startpage: number,
        back: string,
    };
    loading: {
        diameter: number,
        lines: number,
        rate: number,
        xpos: number,
        ypos: number,
        back: string,
        color: string
    };
    offset: number;
    parent: any;

    constructor(script: string) {
        try {
            const raw = JSON.parse(script);
            Object.assign(this, raw);
        } catch {
            const error = 'Failed to create script';
            throw error;
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
    constructor() {
    }
}
class CmxBook extends HTMLElement {
    [key: string]: any;
    schema?: Schema;
    controller?: CmxCtrl;
    _uid: string;
    _cid: string;
    core: Comixngn;
    constructor() {
        super();
        this.core = comixngn();
        const {core} = this;

        let j = 1;
        let uid = `STG${j}`;
        while (!core.bookMap.get(uid)) {
            uid = `STG${++j}`;
        }
        this._uid = uid;
        core.bookMap.set(uid, this);

        this._cid = window.location.host;

        //call custom constructor
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
}
class CmxCtrl extends HTMLElement {
    constructor(public book: CmxBook) {
        super();
    }
}
customElements.define('comix-ngn', CmxBook);

/* 
class Page {
    altText: string;
    hover: string;
    note: string;
    release: number;//time in ms
    title: string;
    url: string[];
    special: string;
    absolute?: boolean;
    animated: boolean;
    permanent: boolean;
}

class Chapter {
    description: string;
    end: number;
    start: number;
    title: string
}
*/