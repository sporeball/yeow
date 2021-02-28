/*
  index.js
  yeow core
  copyright (c) 2021 sporeball
  MIT license
*/

yeow = obj => {
  let v = process.argv.slice(2);
  let a = i = {};
  let O = Object.keys(obj).reduce((a, c, i) => (a[(x => obj[x].required)(c) ? 0 : 1].push(c), a), [[], []]).flat();

  for (k of O) {
    try {
      let K = obj[k];
      let c, D;

      if (K.required) {
        D = O.indexOf(k);
        if (t(v[D]) == "none") {
          X(K.missing || `missing required argument ${k}`);
        }
        c = true;
      } else {
        let A = [];
        if (K.aliases) A = K.aliases.split(" / ");
        i[k] = v.findIndex(x => A.includes(x));
        c = (i[k] != -1);
        D = i[k] + 1;
      }

      if (K.type && c && (t(v[D]) == "none" || (K.type == "number" && t(v[D]) != K.type))) {
        X(K.invalid || `argument ${k} has invalid type (expected ${K.type}, got ${t(v[D])})`);
      }

      switch (K.type) {
        case undefined:
          a[k] = (i[k] != -1);
          break;
        case "number":
          a[k] = (i[k] != -1) ? +v[D] : +K.default;
          break;
        default:
          a[k] = (i[k] != -1) ? v[D] : K.default;
      }
    } catch (e) {
      console.log(`\u001B[31merror:\u001B[39m ${e.message}`);
      process.exit(1);
    }
  }

  return a;
}

X = e => { throw Error(e); };
t = v => {
  if (v === undefined || v.startsWith("-")) return "none";
  if (v.match(/\w+\.\w+/)) return v.slice(v.indexOf("."));
  return (v.match(/^0$|^[1-9]+[0-9]*$/)) ? "number" : "string";
};

module.exports = yeow;
