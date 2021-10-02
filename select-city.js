import { TownID } from "https://code4fukui.github.io/TownID/TownID.js";

class SelectCity extends HTMLElement {
  constructor() {
    super();
    this.init();
  }
  async init() {
    const prefs = await TownID.getPrefs();
    const cr = (tag) => document.createElement(tag);

    const sel = cr("select");
    const opt = cr("option");
    opt.textContent = "都道府県";
    opt.value = "";
    sel.appendChild(opt);
    for (const pref of prefs) {
      const opt = cr("option");
      opt.textContent = pref;
      sel.appendChild(opt);
    }
    this.appendChild(sel);
    this.sel = sel;
    this.sel.onchange = async () => {
      /*
      if (this.onchange) {
        this.onchange();
      }
      */
      const pref = this.sel.value;
      const cities = await TownID.getCities(pref);
      this.sel2.innerHTML = "";
      const opt2 = cr("option");
      opt2.textContent = "市区町村";
      opt2.value = "";
      sel2.appendChild(opt2);
      for (const city of cities) {
        const opt = cr("option");
        opt.textContent = city;
        sel2.appendChild(opt);
      }
      this._lgcode = null;
    };

    const sel2 = cr("select");
    this.appendChild(sel2);
    this.sel2 = sel2;
    const opt2 = cr("option");
    opt2.textContent = "市区町村";
    opt2.value = "";
    sel2.appendChild(opt2);

    this.sel2.onchange = async () => {
      this._lgcode = await TownID.getLGCode(this.value);
    };
    this._lgcode = null;
  }
  get value() {
    return (this.sel.selectedIndex == 0 ? null : this.sel.value) + (this.sel2.selectedIndex == 0 ? "" : this.sel2.value);
  }
  get lgcode() {
    return this._lgcode;
  }
  set lgcode(code) {
    (async () => {
      const [pref, city] = await TownID.fromLGCode(code);
      this.sel.value = pref;
      await this.sel.onchange();
      console.log(pref, city);
      this.sel2.value = city;
    })();
  }
}

customElements.define("select-city", SelectCity);

export { SelectCity };
