'use strict';

var nodeTypeNames = {
  1: 'tag',
  2: 'attribute',
  3: 'text',
  4: 'cdata',
  8: 'comment'
};

function readNode (node) {
  var entry = {};
  var nodeName = node.nodeName;
  var nodeValue = node.nodeValue;
  var childNodes = node.childNodes;

  if (nodeName === 'style') {
    entry.type = 'style';
  } else if (nodeName === 'script') {
    entry.type = 'script';
  } else {
    entry.type = nodeTypeNames[node.nodeType];
  }

  entry.name = nodeName;
  entry.text = nodeValue || null;
  entry.attribs = {};

  if (entry.type === 'text') {
    return entry;
  }

  var attrs = node.attributes;

  for (var i = 0; i < attrs.length; i++) {
    if (attrs[i].name.indexOf('-') > 0) {
      entry.attribs.attributes = entry.attribs.attributes || {};
      entry.attribs.attributes[attrs[i].name] = attrs[i].value;
    } else {
      entry.attribs[attrs[i].name] = attrs[i].value;
    }
  }

  entry.children = readNodes(childNodes);

  return entry;
}

function readNodes (nodes) {
  return Array.prototype.map.call(nodes, readNode).filter(Boolean);
}

module.exports = readNodes;
