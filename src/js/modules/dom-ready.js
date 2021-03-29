'use strict';

/**
 * Run event after the DOM is ready
 * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
 * MODIFED based on https://github.com/jquery/jquery/issues/2100 for IE <= 10
 * @module
 * @param {function} fn Callback function
 * @return {void}
 */
function domReady(fn) {
  // Sanity check
  if (typeof fn !== 'function') return;

  // If document is already loaded, run method
  if (
    document.readyState === 'complete' ||
    (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    return fn();
  }

  // Otherwise, wait until document is loaded
  document.addEventListener('DOMContentLoaded', fn, false);

};

export default domReady;
