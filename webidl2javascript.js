/*
 * Copyright (c) 2014, Satoshi Watanabe
 * All rights reserved.
 */

var fs = require('fs');

exports.generateClass = function(name, members) {
    var ejs = require('ejs');
    
    var template = fs.readFileSync('template/classTemplate.ejs', 'utf-8');
    var attributes = [];
    members.forEach(function(member) {
        if (member.type === 'attribute') {
            attributes.push(member.name);
        }
    });
    var output = ejs.render(template, {name: name, 
                                       attributes: attributes
                                      });
    return output;
};

exports.convertWebIDL = function(idl) {
    var WebIDL2 = require("webidl2");
    try {
        var tree = WebIDL2.parse(idl);
    } catch(e) {
        console.log(e);
        return;
    }

    var output = "";
    tree.forEach(function(interface) {
        //console.log(interface);
        switch(interface.type) {
        case 'interface':
            output += exports.generateClass(interface.name, interface.members);
	    break;
        case 'partial interface':
        case 'exception':
        case 'dictionary':
        case 'partial dictionary':
        case 'enum':
        case 'callback':
            break;
        default:
            break;
        }
    });
    console.log(output);
    return output;
};

exports.convertWebIDLFile = function(filename) {
    var idl = fs.readFileSync(filename, 'utf-8');
    return this.convertWebIDL(idl);
};
