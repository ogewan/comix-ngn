import { CmxBook } from "./cmxbook";

console.log('comix-ngn v2');

export let comixngn: () => Comixngn;
//generate_comixngn 
(() => {
    let core: Comixngn;
    comixngn = () => {
        if (core) return core;
        return new Comixngn();
    };
})();

export class Comixngn {
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