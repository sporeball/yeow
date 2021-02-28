/*
  index.js
  yeow core
  copyright (c) 2021 sporeball
  MIT license
*/

yeow = obj => {
  let v = process.argv.slice(2);
  let a = {};
  let O = Object.keys(obj).reduce((a, c, i) => (a[(x => obj[x].required)(c) ? 0 : 1].push(c), a), [[], []]).flat();

  for (k of O) {
    try {
      let K = obj[k];
      let c, D, E;

      if (K.required) {
        if (t(v[(D = O.indexOf(k))]) == "none") {
          X(K.missing || `missing required argument ${k}`);
        }
        c = true;
      } else {
        c = (D = K.aliases ? v.findIndex(x => K.aliases.split(" / ").includes(x)) + 1 : -1) > 0;
      }

      if (K.extensions) E = K.extensions.split(" / ");

      if (K.type && c && (t(v[D]) == "none" || (K.type != "string" && t(v[D]) != K.type))) {
        X(K.invalid || `argument ${k} has invalid type (expected ${K.type}, got ${t(v[D])})`);
      }

      if (K.type == "file" && E && !E.some(x => v[D].endsWith(x))) {
        X(K.invalid || `argument ${k} has invalid extension (expected ${E.length > 1 ? "one of " : ""}${K.extensions})`);
      }

      a[k] = K.type === undefined ? D > 0 :
        K.type == "number" ? c ? +v[D] : +K.default :
        c ? v[D] : K.default;
    } catch (e) {
      console.log(`\u001B[31merror:\u001B[39m ${e.message}`);
      process.exit(1);
    }
  }

  return a;
}

X = e => { throw Error(e); };
t = v => v === undefined || v.startsWith("-") ? "none" : v.match(/\w+\.\w+/) ? "file" : v.match(/^0$|^[1-9]+[0-9]*$/) ? "number" : "string";

module.exports = yeow;
