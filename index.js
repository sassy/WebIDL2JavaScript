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
var fs = require('fs');
var idl = fs.readFileSync(idl_file, 'utf-8');

var WebIDL2 = require("webidl2");
try {
    var tree = WebIDL2.parse(idl);
} catch(e) {
    console.log(e);
    return;
}

tree.forEach(function(interface) {
    //console.log(interface);
    switch(interface.type) {
    case 'interface':
	generateClass(interface.name, interface.members);
	break;
    case 'partial interface':
    case 'exception':
    case 'dictionary':
    case 'partial dictionary':
    case 'enum':
    case 'callback':
    default:
	break;
    }
});


function generateClass(name, members) {
    var ejs = require('ejs');
    
    var template = fs.readFileSync('classTemplate.ejs', 'utf-8');
    var attributes = new Array();
    members.forEach(function(member) {
	if (member.type === 'attribute') {
	    attributes.push(member.name);
	}
    });
    var output = ejs.render(template, {name: name, 
				       attributes: attributes
				      });
    console.log(output);    
}
