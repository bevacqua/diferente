'use strict';

var vdom = require('virtual-dom');
var readNodes = require('./lib/readNodes');
var namespace = 'http://www.w3.org/1999/xhtml';
var hidden = document.implementation.createHTMLDocument(namespace, 'html');

function parseHTML (markup) {
  var fragment = hidden.createElement('div');
  fragment.innerHTML = markup;
  return readNodes(fragment.childNodes);
}

function parseElement (el) {
  var hasAttribs = Object.keys(el.attribs).length;
  var args = ['"' + el.name + '"'];

  if (el.name === '#text') {
    return JSON.stringify(el.text);
  }

  if (hasAttribs) {
    var old = el.attribs.class;
    el.attribs.className = old;
    delete el.attribs.class;
  }

  args.push(hasAttribs ? JSON.stringify(el.attribs) : null);

  if (el.children) {
    args.push('[' + el.children.map(parseElement).join(',') + ']');
  }

  return 'h(' + args.filter(Boolean).join(',') + ')';
}

function htmlIntoHScript (markup) {
  return parseHTML(markup).map(parseElement).join(',');
}

function diferente (el, html) {
  var diff = el.__diff || {};
  var oldHTML = el.innerHTML;
  var newH = htmlIntoHScript(html.outerHTML || html);
  var newRender = new Function('h', 'return ' + newH);

  if (!diff.tree) {
    var oldH = htmlIntoHScript(oldHTML);
    var oldRender = new Function('h', 'return ' + (oldH || 'null'));

    diff.tree = oldRender(vdom.h);
    diff.branch = vdom.create(diff.tree);

    if (!diff.branch) {
      diff.tree = newRender(vdom.h);
      diff.branch = vdom.create(diff.tree);
    }

    el.innerHTML = '';
    el.appendChild(diff.branch);
  }

  var newTree = newRender(vdom.h);
  var patches = vdom.diff(diff.tree, newTree);

  el.__diff = diff;

  vdom.patch(diff.branch, patches);
}

module.exports = diferente;
