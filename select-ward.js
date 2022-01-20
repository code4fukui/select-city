import { LGCode } from "https://code4fukui.github.io/LGCode/LGCode.js";

class SelectWard extends HTMLElement {
  constructor(opts) {
    super();
    this.init(opts);
  }
  init(opts) {
    if (opts) {
      for (const name in opts) {
        if (opts[name] != null) {
          this.setAttribute(name, opts[name]);
        }
      }
    }

    const prefs = LGCode.getPrefs();
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
    this.sel.onchange = (e) => {
      /*
      if (this.onchange) {
        this.onchange();
      }
      */
      const pref = this.sel.value;
      this.sel2.init();
      this.sel3.init();
      const cities = pref ? LGCode.getCities(pref) : null;
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

      if (e) {
        const value = this.getPrefCity();
        const lgcode = LGCode.encode(value);
        this.inlgcode.value = lgcode;
        if (this.onchange) {
          this.onchange();
        }
      }
    };
    this.sel.className = this.getAttribute("required") == "required" ? "required" : "";//  && sel2.disabled ? "required" : "";
    //console.log(this.getAttribute("required"), this.sel.className);

    const sel2 = cr("select");
    this.appendChild(sel2);
    this.sel2 = sel2;
    sel2.init = () => {
      sel2.innerHTML = "";
      const opt2 = cr("option");
      opt2.textContent = this.getAttribute("defaultcity") || opts?.defaultcity || "市区町村";
      opt2.value = "";
      sel2.appendChild(opt2);
      sel2.disabled = true;
    };
    sel2.init();

    this.sel2.onchange = async () => {
      const value = this.getPrefCity();
      const lgcode = LGCode.encode(value);
      //console.log("set", this.inlgcode.value);
      this.inlgcode.value = lgcode;
      const prefcity = value;

      this.sel3.init();
      const wards = prefcity ? LGCode.getWards(prefcity) : null;
      if (wards) {
        for (const ward of wards) {
          const opt = cr("option");
          opt.textContent = ward;
          sel3.appendChild(opt);
        }
        sel3.disabled = false;
      } else {
        sel3.disabled = true;
      }
      //this.sel.className = this.getAttribute("required") == "required" && sel2.disabled ? "required" : "";

      if (this.onchange) {
        this.onchange();
      }
    };

    // 区用
    const sel3 = cr("select");
    this.appendChild(sel3);
    this.sel3 = sel3;
    sel3.init = () => {
      sel3.innerHTML = "";
      const opt3 = cr("option");
      opt3.textContent = this.getAttribute("defaultward") || opts?.defaultward || "区";
      opt3.value = "";
      sel3.appendChild(opt3);
      sel3.disabled = true;
    };
    sel3.init();
    
    this.sel3.onchange = async () => {
      const value = this.getPrefCity();
      console.log(value);
      const lgcode = LGCode.encode(value);
      //console.log("set", this.inlgcode.value);
      this.inlgcode.value = lgcode;

      if (this.onchange) {
        this.onchange();
      }
    };

    // 自治体コード表示
    this.inlgcode = cr("input");
    this.inlgcode.disabled = true; // "disabled";
    //this.appendChild(this.inlgcode);

  }
  getPrefCity() {
    if (!this.sel || !this.sel2) {
      return "";
    }
    return (this.sel.selectedIndex == 0 ? "" : this.sel.value) + (this.sel2.selectedIndex == 0 ? "" : this.sel2.value) + (this.sel3.selectedIndex == 0 ? "" : this.sel3.value);
  }
  get value() {
    return this.getPrefCity();
  }
  _setValue(v) {
    if (Array.isArray(v)) {
      v = v.join("");
    }
    const lgcode = LGCode.encode(v);
    this.inlgcode.value = lgcode;
    const dec = LGCode.decode(lgcode);
    const pref = dec[0];
    const city = dec[1];
    const ward = dec[2];

    this.sel.value = pref;
    this.sel.onchange();
    if (city) {
      this.sel2.value = city;
      this.sel2.onchange();
      if (ward) {
          this.sel3.value = ward;
      }
    }

    if (this.onchange) {
      this.onchange();
    }
  }
  set value(v) {
    this._setValue(v);
  }
  get lgcode() {
    return this.inlgcode.value;
  }
  set lgcode(code) {
    const v = LGCode.decode(code);
    if (!v) {
      return;
    }
    this._setValue(v.filter(v => !v.endsWith("郡") && v != "特別区部" && !v.endsWith("振興局")));
    /*
    code = LGCode.normalize(code);

    if (!code) {
      return;
    }
    this.setAttribute("lgcode", code);
    const pc = LGCode.decode(code);
    console.log(pc, code);
    if (!pc) {
      return;
    }
    const [pref, city] = pc;
    this.sel.value = pref;
    this.sel.onchange();
    this.sel2.value = city;
    if (this.onchange) {
      this.onchange();
    }
    */
  }
}

customElements.define("select-ward", SelectWard);

export { SelectWard };
