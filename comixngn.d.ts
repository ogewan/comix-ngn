declare var Path: {
    version: string;
    map: (a: any) => any;
    root: (a: any) => void;
    rescue: (a: any) => void;
    history: {
        initial: {};
        pushState: (a: any, b: any, c: any) => void;
        popState: (a: any) => void;
        listen: (a: any) => void;
    };
    match: (a: any, b: any) => any;
    dispatch: (a: any) => true | undefined;
    listen: () => void;
    core: {
        route: (a: any) => void;
    };
    routes: {
        current: null;
        root: null;
        rescue: null;
        previous: null;
        defined: {};
    };
};
declare function syncJSON(filePath: any): any;
declare function loadTextFileAjaxSync(filePath: any, mimeType: any): string | null;
/** @preserve comix-ngn v1.4.0 | (c) 2015 Oluwaseun Ogedengbe| ogewan.github.io/comix-ngn/ |License: MIT|
embeds domReady: github.com/ded/domready (MIT) (c) 2013 Dustin Diaz, pegasus: typicode.github.io/pegasus (MIT) (c) 2014 typicode, pathjs (MIT) (c) 2011 Mike Trpcic, direction.js*/
declare var cG: any;
