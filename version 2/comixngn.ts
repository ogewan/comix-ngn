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

class page {
    altText: string;
    animated: boolean;
    hover: string;
    note: string;
    permanent: boolean;
    release: number;//time in ms
    title: string;
    url: string[];
    special: string;
    absolute?: boolean;
}

class chapter {
    
}

class schema {
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
}


class version {
    constructor(public major = 0, public minor = 0, public patch = 0) { }
    toString() {
        const { major, minor, patch } = this;
        return `${major}.${minor}.${patch}`;
    }
}
class comixngn {
    coreVersion = new version(2, 0, 0);
    cxxVersion = new version(0, 0, 2);
    bookMap: Map<string, cmxBook> = new Map();
    constructor() {
    }
}
class cmxBook extends HTMLElement {
    schema: schema;
    controller?: cmxCtrl;
    constructor() {
        super();
    }
}
class cmxCtrl extends HTMLElement {
    book: cmxBook;
    constructor() {
        super();
    }
}
customElements.define('comix-ngn', cmxBook);