#!/usr/bin/env node
const meow = require("meow");
const run = require(".");

const cli = meow(
  `
    Initialize a blog
      $ island
    
    Show current version
      $ island -v

    Add a new article
      $ island -a

    Remove an article
      $ island -r

    Development model
      $ island -d

    Production model
      $ island -p
`,
  {
    flags: {
      version: {
        type: "boolean",
        alias: "v"
      },
      add: {
        type: "boolean",
        alias: "a"
      },
      remove: {
        type: "boolean",
        alias: "r"
      },
      dev: {
        type: "boolean",
        alias: "d"
      },
      prod: {
        type: "boolean",
        alias: "p"
      }
    }
  }
);

run(cli);
