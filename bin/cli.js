#!/usr/bin/env node
const meow = require("meow");
const run = require("../");

const cli = meow(
  `
    Initialize a blog
      $ island -i
      $ island init
    
    Show current version
      $ island -v
      $ island version

    Add a new article
      $ island -a
      $ island add

    Delete an article
      $ island -x
      $ island del

    Reset all data
      $ island -r
      $ island reset

    Update a theme
      $ island -u
      $ island update

    Development
      $ island -d
      $ island dev

    Build production
      $ island -b
      $ island build
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
