declare var cG: any;
interface page {
    alt: string;
    anim8: boolean;
    hover: string;
    note: string;
    perm: boolean;
    release: number;
    title: string;
    url: string[];
    special: string;
    absolute?: boolean;
}
interface chapter {
    description: string;
    end: number;
    start: number;
    title: string;
}
interface script {
    chapters: chapter[];
    config: {
        chapterstartnum: boolean;
        dir: string;
        imgpostbuffer: number;
        imgprebuffer: number;
        pagestartnum: boolean;
        startpage: number;
        back: string;
    };
    loading: {
        diameter: number;
        lines: number;
        rate: number;
        xpos: number;
        ypos: number;
        back: string;
        color: string;
    };
    offset: number;
    pages: page[];
    parent: any;
}
interface settings {
    dir?: string;
    lines?: number;
    rate?: number;
    diameter?: number;
    loaderback?: string;
    color?: string;
    imgprebuffer?: number;
    imgpostbuffer?: number;
}
