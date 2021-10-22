import { TownID } from "https://code4fukui.github.io/TownID/TownID.js";
import { LGCode } from "https://code4fukui.github.io/LGCode/LGCode.js";

// todo remove TownID
class SelectCity extends HTMLElement {
  constructor(opts) {
    super();
    this.init(opts);
  }
  async init(opts) {
    if (opts) {
      for (const name in opts) {
        if (opts[name] != null) {
          this.setAttribute(name, opts[name]);
        }
      }
    }

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
      this.sel2.innerHTML = "";
      const opt2 = cr("option");
      opt2.textContent = this.getAttribute("defaultcity") || opts?.defaultcity || "市区町村";
      opt2.value = "";
      sel2.appendChild(opt2);
      const cities = await TownID.getCities(pref);
      if (cities) {
        for (const city of cities) {
          const opt = cr("option");
          opt.textContent = city;
          sel2.appendChild(opt);
        }
        sel2.disabled = false;
      } else {
        sel2.disabled = true;
      }
      this.sel.className = this.getAttribute("required") == "required" && sel2.disabled ? "required" : "";
      this.inlgcode.value = LGCode.normalize(await TownID.getLGCode(this.getPrefCity()));
    };
    this.sel.className = this.getAttribute("required") == "required" ? "required" : "";//  && sel2.disabled ? "required" : "";
    //console.log(this.getAttribute("required"), this.sel.className);

    const sel2 = cr("select");
    this.appendChild(sel2);
    this.sel2 = sel2;
    const opt2 = cr("option");
    opt2.textContent = this.getAttribute("defaultcity") || opts?.defaultcity || "市区町村";
    opt2.value = "";
    sel2.appendChild(opt2);
    sel2.disabled = true;

    this.inlgcode = cr("input");
    this.inlgcode.disabled = true; // "disabled";
    //this.appendChild(this.inlgcode);

    this.sel2.onchange = async () => {
      this.inlgcode.value = LGCode.normalize(await TownID.getLGCode(this.getPrefCity()));
      //console.log("set", this.inlgcode.value);
    };
  }
  getPrefCity() {
    if (!this.sel || !this.sel2) {
      return "";
    }
    return (this.sel.selectedIndex == 0 ? "" : this.sel.value) + (this.sel2.selectedIndex == 0 ? "" : this.sel2.value);
  }
  get value() {
    return this.getPrefCity();
  }
  set value(v) {
    if (!this.sel || !this.sel2) {
      return;
    }
    (async () => {
      const opts = this.sel.querySelectorAll("option");
      for (const opt of opts) {
        if (v.startsWith(opt.textContent)) {
          opt.selected = true;
          await this.sel.onchange();
          const city = v.substring(opt.textContent.length);
          this.sel2.value = city;
          if (this.onchange) {
            this.onchange();
          }
        }
      }
    })();
  }
  get lgcode() {
    return this.inlgcode.value;
  }
  set lgcode(code) {
    code = LGCode.parse(code);
    (async () => {
      const pc = await TownID.fromLGCode(code);
      //console.log(pc, code);
      if (!pc) {
        return;
      }
      const [pref, city] = pc;
      this.sel.value = pref;
      await this.sel.onchange();
      this.sel2.value = city;
      if (this.onchange) {
        this.onchange();
      }
    })();
  }
}

customElements.define("select-city", SelectCity);

export { SelectCity };
