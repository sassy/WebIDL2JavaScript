/*
 * Copyright (c) 2014, Satoshi Watanabe
 * All rights reserved.
 */

var fs = require('fs');

exports.generateClass = function(name, members, inheritance) {
    var ejs = require('ejs');
    
    var template = fs.readFileSync('template/classTemplate.ejs', 'utf-8');
    var attributes = [];
    var operations = [];
    members.forEach(function(member) {
        switch (member.type) {
        case 'attribute':
            attributes.push(member.name);
            break;
        case 'operation':
            operation = new Object();
            operation.name = member.name;
            operation.args = [];
            member.arguments.forEach(function(arg, i) {
                operation.args[i] = arg.name;
            });
            operations.push(operation);
            break;
        }
    });
    var output = ejs.render(template, {name: name, 
                                       attributes: attributes,
                                       operations: operations,
                                       inheritance: inheritance
                                      });
    return output;
};

exports.convertWebIDL = function(idl) {
    var WebIDL2 = require("webidl2");
    var tree = null;
    try {
        tree = WebIDL2.parse(idl);
    } catch(e) {
        console.log(e);
        return;
    }

    var output = "";
    tree.forEach(function(interface) {
        //console.log(interface);
        switch(interface.type) {
        case 'interface':
            output += exports.generateClass(interface.name, interface.members, interface.inheritance);
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
    //console.log(output);
    
    return output;
};

exports.convertWebIDLFile = function(filename) {
    var idl = fs.readFileSync(filename, 'utf-8');
    return this.convertWebIDL(idl);
};

exports.writeJSFile = function(filename, output) {
    fs.writeFileSync(filename + ".js", output);
};

