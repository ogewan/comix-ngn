import direction from './lib/directionx.js';
import pegasus from './lib/pegasus.min.js';
console.log('comix-ngn v2');
class Hexstring {
  constructor(input) {
    this.toString = () => this.value.toString(16);
    if (typeof input === 'string') {
      this.value = parseInt(input, 16);
    } else {
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
    const {major, minor, patch} = this;
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
      } else {
        url = input;
      }
      Object.assign(this, Object.assign(Object.assign({}, config), {url}));
    } else {
      Object.assign(this, config);
    }
    if (this.release) {
      this.release = new Date(this.release);
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
      format: 'C/PP',
      startDate: void (0),
      chapterStartAt: 1,
      pageStartAt: 1,
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
      back: new Hexstring('#FFF'),
      color: new Hexstring('#373737')
    };
    this.pageChapterMap = new Map();
    try {
      let raw;
      if (typeof script === 'string') {
        raw = JSON.parse(script);
      } else if (script.length) {
        const pageWriter = (typeof script[0] === 'string') ? (link) => {
          return {url: link};
        } : (data) => {
          return Object.assign(Object.assign({}, data), {url: [data.link], link: undefined});
        };
        raw = {pages: script.map(pageWriter)};
      } else {
        raw = (script && script.length === undefined) ? script : {};
      }
      if (raw.pages && raw.pages.length) {
        raw.pages = raw.pages.map((e) => {
          if (e.url) {
            return new Page(null, e);
          }
          return new Page(e);
        });
      }
      if (raw.chapters && raw.chapters.length) {
        raw.chapters = raw.chapters.map((e) => new Chapter(e.start, e.title, e.description))
                           .sort((a, b) => a.start - b.start);
      }
      if (raw.config && raw.config.startDate) {
        // TODO: make more robust
        raw.config.startDate = new Date(raw.config.startDate);
      }
      Object.assign(this, raw);
    } catch (e) {
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
      if (start >= end) return;
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
// generate_comixngn
(() => {
  let core;
  comixngn = () => {
    if (!core) core = new Comixngn();
    return core;
  };
})();
class Comixngn {
  constructor() {
    // SINGLETON
    this.coreVersion = new Version(2, 0, 0);
    this.cxxVersion = new Version(0, 0, 2);
    this.bookMap = new Map();
    this._priority = false;
    this._sysmsg =
        `%c %c %c comix-ngn v${this.coreVersion} %c \u262F %c \u00A9 2020 Oluwaseun Ogedengbe %c`;
    this._sysclr = [
      'color:white; background:#2EB531', 'background:purple', 'color:white; background:#32E237',
      'color:red; background:black', 'color:white; background:#2EB531',
      'color:white; background:purple'
    ];
    this._setting = {pageSave: true, pagePush: false};
    this.defRoute = '#/:v1(/:v2/:v3/:v4/:v5/:v6/:v7/:v8/:v9)';
    const {defRoute, routing} = this;
    console.log(this._sysmsg, ...this._sysclr);
    Path.map(defRoute).to(routing);
  }
  get setting() {
    return this._setting;
  }
  // TODO: Support html5pushstate routing, and route decode in general
  routing() {}
  priorityConfig(setting) {
    this.config(setting, true);
  }
  config(setting, priority) {
    if (this._priority || priority) {
      if (priority) {
        this._priority = true;
      } else {
        return;
      }
    }
    //
    setting.gpu = (setting.gpu) ? window[setting.gpu] : setting.GPU;
    //
    this._setting = setting;
  }
  reset() {
    this._priority = false;
  }
}
class CmxCore extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = '';
    this._core = comixngn();
    this.setCore(this.getAttribute('config'));
  }
  get core() {
    return this._core;
  }
  get initialized() {
    return true;
  }
  setCore(configPath) {
    const core = this._core;
    if (configPath) {
      try {
        core.priorityConfig(JSON.parse(configPath));
      } catch (_a) {
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
  set config(val) {
    if (this.getAttribute('config') !== val) {
      if (val) {
        this.setAttribute('config', val);
      } else {
        this.removeAttribute('config');
      }
    }
  }
  get config() {
    return this.getAttribute('config');
  }
}
class CmxBook extends HTMLElement {
  constructor() {
    super();
    this._active = false;
    this._core = comixngn();
    const {core} = this;
    let uid = this.getAttribute('uid');
    if (!uid) {
      let j = 0;
      uid = `STG${j}`;
      while (core.bookMap.get(uid)) {
        uid = `STG${++j}`;
      }
    }
    this._uid = uid;
    core.bookMap.set(uid, this);
    this._cid = window.location.host;
    this.shadow = this.attachShadow({mode: 'open'});
    console.log('construct cmxbook');
  }
  get core() {
    return this._core;
  };
  convertToDirectionSetting() {
    const {_schema, _core} = this;
    const setting = _core.setting;
    const {config, loading} = _schema;
    const {dir, imgprebuffer, imgpostbuffer, startPage} = config;
    const {diameter, lines, rate} = loading;
    const back = (config.back) ? config.back.toString() : undefined;
    const loaderback = (loading.back) ? loading.back.toString() : undefined;
    const color = (loading.color) ? loading.color.toString() : undefined;
    const overwrite = startPage;
    return Object.assign(
        {
          overwrite,
          dir,
          imgprebuffer,
          imgpostbuffer,
          diameter,
          lines,
          rate,
          back,
          loaderback,
          color
        },
        setting);
  }
  initializeDisplay() {
    // DIRECTION specific
    const {shadow} = this;
    // call custom constructor
    const pages = this._schema ? this._schema.exportPages() : [];
    const settings = this._schema ? this.convertToDirectionSetting() : {};
    const base = new direction(pages, Object.assign(Object.assign({}, settings), {anchor: shadow}));
    this.defineMethods(base);
    console.log('Intialize Display');
    this._active = true;
    const ctrlPath = this.getAttribute('controller');
    if (ctrlPath) {
      pegasus(ctrlPath).then(this.initializeControls.bind(this));
    } else {
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
    let options = Object.assign({}, this._core.setting);
    let pageToChapter = (a) => 0;
    let chapterToPage = (a) => 0;
    if (this._schema) {
      pageToChapter = this._schema.pageToChapter;
      chapterToPage = this._schema.chapterToPage;
      options = Object.assign(Object.assign({}, options), this._schema);
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
    this.ch_last = () =>
        pageToChapter(this.go(chapterToPage(this._schema ? this._schema.chapters.length : 0)));
    this.update = () => {
      const swap = base.swap;
      const pages = this._schema ? this._schema.exportPages() : [];
      const settings = this._schema ? this.convertToDirectionSetting() : {};
      swap(pages, Object.assign(Object.assign({}, settings), {anchor: this.shadow}));
      base.setupShaders(settings);
    };
    this.resize = base.resize;
    this.current = base.current;
    this.ch_current = () => {
      pageToChapter(this.current());
    };
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
    base.callback(1, () => {
      const currentPageId = this.current();
      const currentPage = this._schema.pages[currentPageId];
      if (localStorage && options.pageSave) {
        const {_cid, _uid} = this;
        localStorage.setItem(`${_cid}|${_uid}|current`, currentPageId.toString());
      }
      if (options.pagePush) {
        /* FORMAT STRING
        Numbers form fill, that is, a number will fill as many spots as it needs
        if the template is bigger than that it is zero padded
        Y - Year (defaults to two form year, until 3 digits)
        M - Month (#)
        D - Day
        H - Hour
        U - Minute
        S - Second
        //Standard
        N - Month (Name full)/n - Month (Name acroynm)
        C - Chapter (#)/c - Chapter (Title), fallback to number
        P - Page (#)/p - Page (Title), fallback to number
        F - Filename
        ex: 2017//05/04
        YYY/MM/DD
         */
        let state = '';
        if (options.config.format) {
          const {format, chapterStartAt, pageStartAt, startDate} = options.config;
          const releaseDate = currentPage.release;
          const pageName = currentPage.title;
          const pageURL = currentPage.url[0];
          const pageNum = currentPageId + pageStartAt;
          const chpNum = this._schema.pageToChapter(currentPageId) + chapterStartAt;
          const chpName = this.ch_data() ? this.ch_data().title : '';
          const calendar = [
            'january', 'febuary', 'march', 'april', 'may', 'june', 'july', 'august', 'september',
            'october', 'november', 'december'
          ];
          const evaluate = (cmd, size) => {
            if (!cmd) return '';
            const uppercase = cmd === cmd.toUpperCase();
            cmd = cmd.toLowerCase();
            const rs = () => size = 0;
            const dateProc = (action) => () => {
              if (!releaseDate) throw new Error(`Date required for format of ${format}`);
              // TODO: fallback calculate release date by startdate if consecutive release is set
              return action();
            };
            const raw = {
              'y': dateProc(() => {
                let year = releaseDate.getFullYear().toString();
                return (size < 3) ? year.slice(2) : year;
              }),
              'm': dateProc(() => releaseDate.getMonth().toString()),
              'd': dateProc(() => releaseDate.getDay().toString()),
              'h': dateProc(() => releaseDate.getHours().toString()),
              'u': dateProc(() => releaseDate.getMinutes().toString()),
              's': dateProc(() => releaseDate.getSeconds().toString()),
              'n': dateProc(() => {
                rs();
                let month = calendar[releaseDate.getMonth()];
                return uppercase ? month : month.slice(0, 3);
              }),
              'c': () => {
                rs();
                return (!uppercase && chpName) ? chpName : chpNum.toString();
              },
              'p': () => {
                rs();
                return (!uppercase && pageName) ? pageName : pageNum.toString();
              },
              'f': () => {
                rs();
                return pageURL.slice(pageURL.lastIndexOf('/') + 1);
              },
              '': () => ''
            };
            const short = (raw[cmd] || raw[''])();
            if (!short.length) return cmd;
            return short.padStart(size - short.length, '0');
          };
          let command = [];
          let result = [];
          for (let i = 0; i < format.length; i++) {
            if (command[0] !== format[i]) {
              try {
                result.push(evaluate(command[0], command.length));
              } catch (e) {
                console.log(e);
                return '';
              }
              command = [format[i]];
            } else {
              command.push(format[i]);
            }
          }
          result.push(evaluate(command[0], command.length));
          state = result.join('');
        }
        console.log(`Pushing state: ${state}`);
        history.pushState({}, '', `#/${state}`);
      }
    });
  }
  exportSchema() {
    return JSON.stringify(this._schema);
  }
  changeId(key, value) {
    const {_cid, _uid} = this;
    const oldKey = `${_cid}|${_uid}|current`;
    this[key] = value;
    const newKey = `${_cid}|${_uid}|current`;
    const data = localStorage.getItem(oldKey);
    if (data) {
      localStorage.removeItem(oldKey);
      localStorage.setItem(newKey, data);
    }
  }
  set uid(val) {
    if (this.core.bookMap.has(val)) {
      console.error(`CmxBook with uid ${val} already exists.`);
    } else {
      this.core.bookMap.set(val, this);
      this.core.bookMap.delete(this._uid);
      this.changeId('_uid', val);
      if (this.getAttribute('uid') !== val) this.setAttribute('uid', val);
    }
  }
  set cid(val) {
    this.changeId('_cid', val);
    if (this.getAttribute('cid') !== val) this.setAttribute('cid', val);
  }
  set schema(input) {
    const setUpdate = (data) => {
      if (!(data instanceof Schema)) {
        data = new Schema(data);
      }
      this._schema = data;
      if (this._active) {
        this.update();
      } else {
        this.initializeDisplay();
      }
    };
    if (typeof input === 'string') {
      try {
        setUpdate(JSON.parse(input));
      } catch (_a) {
        pegasus(input).then(setUpdate);
      }
      // if (this.getAttribute('schema') !== input) this.setAttribute('schema', input);
    } else {
      setUpdate(input);
      // if (this.getAttribute('schema') !== JSON.stringify(input)) this.setAttribute('schema',
      // JSON.stringify(input));
    }
  }
  set config(configPath) {
    const setUpdate = (data) => {
      this.core.config(data);
      if (this._active) {
        this.update();
      }
    };
    if (configPath) {
      try {
        setUpdate(JSON.parse(configPath));
      } catch (_a) {
        pegasus(configPath).then(setUpdate);
      }
      if (this.getAttribute('config') !== configPath) this.setAttribute('config', configPath);
    }
  }
  get uid() {
    return this._uid;
  };
  get cid() {
    return this._cid;
  };
  get config() {
    return this.getAttribute('config');
  }
  get schema() {
    return this._schema;
  };
  static get observedAttributes() {
    return ['cid', 'uid', 'schema', 'config'];
  }
  attributeChangedCallback(name, oldVal, newVal) {
    oldVal;
    if (this[name] !== newVal) this[name] = newVal;
  }
  rand() {};
  go(to) {};
  prev() {};
  next() {};
  frst() {};
  last() {};
  ch_go(to) {};
  ch_prev() {};
  ch_next() {};
  ch_frst() {};
  ch_last() {};
  update() {};
  current() {};
  ch_current() {};
  rawData(to) {};
  pg_data(to) {};
  ch_data(to) {};
  setupShaders(options) {};
  resize(sz, redraw = true, reset = false) {};
}
class CmxCtrl extends HTMLElement {
  constructor(book, template) {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
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
      makeButton('|<', ['frst']), makeButton('< Prev', ['prev']), makeButton('Random', ['rand']),
      makeButton('Next >', ['next']), makeButton('>|', ['last'])
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
  bookId() {
    return this._book ? this._book.uid : void (0);
  }
}
customElements.define('comix-core', CmxCore);
customElements.define('comix-ngn', CmxBook);
customElements.define('comix-ctrl', CmxCtrl);
//# sourceMappingURL=comixngn.js.map