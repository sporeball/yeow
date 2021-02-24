/*
  index.js
  yeow core
  copyright (c) 2021 sporeball
  MIT license
*/

yeow = obj => {
  let v = process.argv.slice(2);
  let a = i = {};

  for (k of Object.keys(obj)) {
    try {
      let K = obj[k];
      let A;
      if (K.aliases) A = K.aliases.split(" / ");

      if (K.position !== undefined) {
        if (!v[K.position] || (A && !A.some(x => v[K.position] == x))) {
          X(`missing required argument ${k}`);
        }
        let o = (A !== undefined) ? 1 : 0;
        if (K.type && type(v[K.position + o]) != K.type) {
          X(`argument ${k} has invalid type (expected ${K.type}, got ${type(v[K.position + o])})`)
        }
        a[k] = +v[K.position + o] || v[K.position + o];
      } else {
        A = (A || []).concat(`--${k}`);

        if (K.required && !v.some(x => A.includes(x))) {
          X(`missing required argument ${k}`);
        }

        i[k] = v.findIndex(x => A.includes(x));

        if (K.type && i[k] != -1 && type(v[i[k] + 1]) != K.type) {
          X(`argument ${v[i[k]]} has invalid type (expected ${K.type}, got ${type(v[i[k] + 1])})`);
        }

        switch (K.type) {
          case undefined:
            a[k] = (i[k] != -1);
            break;
          case "string":
            a[k] = (i[k] != -1) ? v[i[k] + 1] : K.default;
            break;
          case "number":
            a[k] = (i[k] != -1) ? +v[i[k] + 1] : +K.default;
        }
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
