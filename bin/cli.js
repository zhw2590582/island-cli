#!/usr/bin/env node
const meow = require("meow");
const run = require("../");

const cli = meow(
  `
    Initialize a blog
      $ island -i
    
    Show current version
      $ island -v

    Add a new article
      $ island -a

    Delete an article
      $ island -x

    Reset all data
      $ island -r

    Update a theme
      $ island -u     

    Development
      $ island -d

    Build production
      $ island -b
`,
  {
    flags: {
      init: {
        type: "boolean",
        alias: "i"
      },
      version: {
        type: "boolean",
        alias: "v"
      },
      add: {
        type: "boolean",
        alias: "a"
      },
      del: {
        type: "boolean",
        alias: "x"
      },
      reset: {
        type: "boolean",
        alias: "r"
      },
      update: {
        type: "boolean",
        alias: "u"
      },
      dev: {
        type: "boolean",
        alias: "d"
      },
      build: {
        type: "boolean",
        alias: "b"
      }
    }
  }
);

run(cli);
