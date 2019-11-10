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