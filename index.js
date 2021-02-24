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
        if (v[D] === undefined) {
          X(`missing required argument ${k}`);
        }
        c = true;
      } else {
        let A = [];
        if (K.aliases) A = K.aliases.split(" / ");
        i[k] = v.findIndex(x => A.includes(x));
        c = (i[k] != -1);
        D = i[k] + 1;
      }

      if (K.type && c && type(v[D]) != K.type) {
        X(`argument ${k} has invalid type (expected ${K.type}, got ${type(v[D])})`);
      }

      switch (K.type) {
        case undefined:
          a[k] = (i[k] != -1);
          break;
        case "string":
          a[k] = (i[k] != -1) ? v[D] : K.default;
          break;
        case "number":
          a[k] = (i[k] != -1) ? +v[D] : +K.default;
      }
    } catch (e) {
      console.log(`\u001B[31merror:\u001B[39m ${e.message}`);
      process.exit(1);
    }
  }

  return a;
}

X = e => { throw Error(e); };
type = v => {
  if (v === undefined || v.startsWith("-")) return "none";
  return (isNaN(v)) ? "string" : "number";
};

module.exports = yeow;
