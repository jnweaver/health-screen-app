'use strict';

/**
 * Handle settings cookie behavior: read/route or set
 * @module
 * @return {void}
 */
const Settings = {

  cookiesEnabled: function() {
    return window.navigator.cookieEnabled;
  },

  readCookie: function(name) {
    if (document.cookie) {
      let value = '; ' + document.cookie;
      let parts = value.split('; ' + name + '=');
      return parts.length < 2
        ? undefined
        : parts
            .pop()
            .split(';')
            .shift();
    }
  },

  get: function() {
    const settings = {
      locale: this.readCookie('locale'),
      role: this.readCookie('role')
    }
    return settings;
  },

  set: function(locale, role) {
    const exdate = new Date(),
      secure = false;

    exdate.setDate(exdate.getDate() + 1);

    var localeCookie = [
      'locale=' + locale,
      'expires=' + exdate.toUTCString(),
      'path=/',
      'samesite=lax'
    ];

    document.cookie = localeCookie.join(';');

    var roleCookie = [
      'role=' + role,
      'expires=' + exdate.toUTCString(),
      'path=/',
      'samesite=lax'
    ];

    document.cookie = roleCookie.join(';');
  },

  clear: function() {
    document.cookie = "locale=;expires=" + new Date(0).toUTCString() + ';path=/;samesite=lax';
    document.cookie = "role=;expires=" + new Date(0).toUTCString() + ';path=/;samesite=lax';
  }
}
export default Settings;
