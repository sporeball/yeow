/*
  index.js
  yeow core
  copyright (c) 2021 sporeball
  MIT license
*/

yeow = obj => {
  let args = process.argv.slice(2); // arguments as passed
  let a = {}; // arguments we return
  let idxs = {};

  for (key of Object.keys(obj)) {
    try {
      let K = obj[key];
      let aliases;
      if (K.aliases) aliases = K.aliases.split(" / ");

      // argument is positional
      if (K.position !== undefined) {
        if (!args[K.position] || (aliases && !aliases.some(x => args[K.position] == x))) {
          throw new Error(`missing required argument ${key}`);
        }
        let o = (aliases !== undefined) ? 1 : 0;
        if (K.type && type(args[K.position + o]) != K.type) {
          throw new Error(`argument ${key} has invalid type (expected ${K.type}, got ${type(args[K.position + o])})`)
        }
        a[key] = +args[K.position + o] || args[K.position + o];
      // otherwise
      } else {
        aliases = (aliases || []).concat(`--${key}`);

        if (K.required && !args.some(x => aliases.includes(x))) {
          throw new Error(`missing required argument ${key}`);
        }

        idxs[key] = args.findIndex(x => aliases.includes(x));

        if (K.type && idxs[key] != -1 && type(args[idxs[key] + 1]) != K.type) {
          throw new Error(`argument ${args[idxs[key]]} has invalid type (expected ${K.type}, got ${type(args[idxs[key] + 1])})`);
        }

        switch (K.type) {
          case undefined:
            a[key] = (idxs[key] != -1);
            break;
          case "string":
            a[key] = (idxs[key] != -1) ? args[idxs[key] + 1] : K.default;
            break;
          case "number":
            a[key] = (idxs[key] != -1) ? +args[idxs[key] + 1] : +K.default;
        }
      }
    } catch (e) {
      console.log(`${red("error:")} ${e.message}`);
      process.exit(1);
    }
  }

  return a;
}

red = str => `\u001B[31m${str}\u001B[39m`;

type = v => {
  if (v === undefined || v.startsWith("-")) return "none";
  return (isNaN(v)) ? "string" : "number";
}

module.exports = yeow;
