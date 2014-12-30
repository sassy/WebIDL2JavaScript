/*
 * Copyright (c) 2014, Satoshi Watanabe
 * All rights reserved.
 */


if (process.argv.length < 3) {
    console.log('missing argument.');
    return;
}
if (!process.argv[2].match(/\.idl$/)) {
    console.log('not idl file');
    return;
} 

var idl_file = process.argv[2];
var converter = require("./webidl2javascript");
converter.convertWebIDLFile(idl_file);


