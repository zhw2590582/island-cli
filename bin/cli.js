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
      $ island -d

    Reset all article data
      $ island -r

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
        alias: "d"
      },
      reset: {
        type: "boolean",
        alias: "r"
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
