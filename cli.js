#!/usr/bin/env node
const meow = require("meow");
const run = require(".");

const cli = meow(
  `
    Initialize a blog
      $ island-cli
    
    Show current version
      $ island-cli -v

    Add a new article
      $ island-cli -a

    Delete an article
      $ island-cli -r

    Development model
      $ island-cli -d

    Production model
      $ island-cli -p
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
      delete: {
        type: "boolean",
        alias: "r"
      },
      dev: {
        type: "boolean",
        alias: "d"
      },
      build: {
        type: "boolean",
        alias: "p"
      }
    }
  }
);

run(cli.flags);
