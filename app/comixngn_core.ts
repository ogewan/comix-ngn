import Path from '../lib/path.min.js';
import pegasus from '../lib/pegasus.min.js';

import {CmxBook} from './cmxbook.js';
import {CmxCtrl} from './cmxctrl.js';
import {Version} from './util.js';

console.log('comix-ngn v2');

export let comixngn: () => Comixngn;
// generate_comixngn
(() => {
  let core: Comixngn;
  comixngn = () => {
    if (core) return core;
    return new Comixngn();
  };
})();

export class Comixngn {
  // SINGLETON
  coreVersion = new Version(2, 1, 0);
  cxxVersion = new Version(0, 0, 2);
  bookMap: Map<string, CmxBook> = new Map();

  private _priority = false;
  private _sysmsg =
      `%c %c %c comix-ngn v${this.coreVersion} %c \u262F %c \u00A9 2020 Oluwaseun Ogedengbe %c`;
  private _sysclr = [
    'color:white; background:#2EB531', 'background:purple', 'color:white; background:#32E237',
    'color:red; background:black', 'color:white; background:#2EB531',
    'color:white; background:purple'
  ];
  private _setting: any = {pageSave: true, pagePush: false};
  get setting() {
    return this._setting;
  }

  private defRoute = '#/:v1(/:v2/:v3/:v4/:v5/:v6/:v7/:v8/:v9)';
  // TODO: Support html5pushstate routing, and route decode in general
  private routing() {}

  constructor() {
    const {defRoute, routing} = this;
    console.log(this._sysmsg, ...this._sysclr);
    Path.map(defRoute).to(routing);
  }

  priorityConfig(setting: any) {
    this.config(setting, true);
  }
  config(setting: any, priority?: boolean) {
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

export class CmxCore extends HTMLElement {
  private _core: Comixngn;
  get core() {
    return this._core;
  }
  get initialized() {
    return true;
  }
  constructor() {
    super();
    this.innerHTML = '';
    this._core = comixngn();
    this.setCore(this.getAttribute('config'));
  }
  setCore(configPath: string|null) {
    const core = this._core;
    if (configPath) {
      try {
        core.priorityConfig(JSON.parse(configPath));
      } catch {
        (<any>pegasus)(configPath).then(core.priorityConfig);
      }
    }
  }
  static get observedAttributes() {
    return ['config'];
  }
  attributeChangedCallback(name: string, oldVal: string, newVal: string) {
    this.setCore(newVal);
  }
  set config(val: string|null) {
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

customElements.define('comix-core', CmxCore);
customElements.define('comix-ngn', CmxBook);
customElements.define('comix-ctrl', CmxCtrl);