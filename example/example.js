'use strict';

var clock = document.querySelector('.clock');
var component = document.querySelector('.component');
var webComponentElement = document.createElement('web-component');

setInterval(function render () {
  // typical usage
  diferente(clock, '<span>' + new Date().toLocaleString() + '</span>');

  // update an element and then render that element directly
  webComponentElement.innerText = new Date().toLocaleString();
  diferente(component, webComponentElement.outerHTML);
}, 1000);
