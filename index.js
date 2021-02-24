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
      // argument is positional
      if (K.position !== undefined) {
        if (!args[K.position]) {
          throw new Error(`missing required argument ${key}`);
        }
        if (K.type && type(args[K.position]) != K.type) {
          throw new Error(`argument ${key} has invalid type (expected ${K.type}, got ${type(args[K.position])})`)
        }
        a[key] = +args[K.position] || args[K.position];
      // otherwise
      } else {
        let aliases = [`--${key}`];
        if (K.aliases) aliases = aliases.concat(K.aliases.split(" / "));

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
