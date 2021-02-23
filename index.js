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
      let aliases = [`--${key}`];
      if (obj[key].aliases) aliases = aliases.concat(obj[key].aliases.split(" / "));

      idxs[key] = args.findIndex(x => aliases.includes(x));

      if (idxs[key] != -1 && obj[key].type) {
        if (type(args[idxs[key] + 1]) != obj[key].type) {
          throw new Error(`argument ${args[idxs[key]]} has invalid type (expected ${obj[key].type}, got ${type(args[idxs[key] + 1])})`);
        }
      }

      switch (obj[key].type) {
        case undefined:
          a[key] = (idxs[key] != -1);
          break;
        case "string":
          if (idxs[key] != -1) a[key] = args[idxs[key] + 1];
          break;
        case "number":
          if (idxs[key] != -1) a[key] = +args[idxs[key] + 1];
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
