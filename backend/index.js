#!/usr/bin/env node
const {execSync} = require('child_process');

execSync("git clone https://github.com/AmeerHeiba/Express-Mongo-Skeleton",{stdio: "inherit"});
execSync("cd Express-Mongo-Skeleton && npm install",{stdio:"inherit"});
