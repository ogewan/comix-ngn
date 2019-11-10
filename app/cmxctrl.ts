import { CmxBook } from "./cmxbook";
import { comixngn } from "./comixngn.core";

export class CmxCtrl extends HTMLElement {
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
customElements.define('comix-ctrl', CmxCtrl);