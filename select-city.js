import { TownID } from "https://code4fukui.github.io/TownID/TownID.js";

class SelectCity extends HTMLElement {
  constructor(opts) {
    super();
    this.init(opts);
  }
  async init(opts) {
    const prefs = await TownID.getPrefs();
    const cr = (tag) => document.createElement(tag);

    const sel = cr("select");
    const opt = cr("option");
    opt.textContent = this.getAttribute("defaultpref") || opts?.defaultpref || "都道府県";
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
      opt2.textContent = this.getAttribute("defaultcity") || opts?.defaultcity || "市区町村";
      opt2.value = "";
      sel2.appendChild(opt2);
      for (const city of cities) {
        const opt = cr("option");
        opt.textContent = city;
        sel2.appendChild(opt);
      }
      this.inlgcode.value = await TownID.getLGCode(this.getPrefCity());
    };

    const sel2 = cr("select");
    this.appendChild(sel2);
    this.sel2 = sel2;
    const opt2 = cr("option");
    opt2.textContent = this.getAttribute("defaultcity") || "市区町村";
    opt2.value = "";
    sel2.appendChild(opt2);

    this.inlgcode = cr("input");
    this.inlgcode.disabled = "disabled";
    //this.appendChild(this.inlgcode);

    this.sel2.onchange = async () => {
      this.inlgcode.value = await TownID.getLGCode(this.getPrefCity());
      console.log("set", this.inlgcode.value);
    };
  }
  getPrefCity() {
    return (this.sel.selectedIndex == 0 ? null : this.sel.value) + (this.sel2.selectedIndex == 0 ? "" : this.sel2.value);
  }
  get value() {
    return this.getPrefCity();
  }
  get lgcode() {
    return this.inlgcode.value;
  }
  set lgcode(code) {
    (async () => {
      const [pref, city] = await TownID.fromLGCode(code);
      this.sel.value = pref;
      await this.sel.onchange();
      this.sel2.value = city;
      this.sel2.onchange();
    })();
  }
}

customElements.define("select-city", SelectCity);

export { SelectCity };
