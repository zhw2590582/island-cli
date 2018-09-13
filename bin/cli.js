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
      $ island -a <name>
      $ island add <name>

    Delete an article
      $ island -x <name>
      $ island del <name>

    Reset all data
      $ island -r
      $ island reset

    Update a theme
      $ island -u <name>
      $ island update <name>

    Development
      $ island -d
      $ island dev

    Production
      $ island -b
      $ island build

    Travis CI
      $ island -c
      $ island ci      
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
      },
      ci: {
        type: "boolean",
        alias: "c"
      }
    }
  }
);

run(cli);
