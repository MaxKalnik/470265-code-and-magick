'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var DEBOUNCE_INTERVAL = 500;

  var lastTimeout;

  window.utils = {
    getRandomBetween: function (min, max) {
      return Math.round(Math.random() * (max - min) + min);
    },
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    getRandomColor: function (colors) {
      return colors[Math.floor(colors.length * Math.random())];
    },
    colorize: function (element, colors) {
      element.addEventListener('click', function (evt) {
        var color = window.utils.getRandomColor(colors);
        if (evt.target.tagName.toLowerCase() === 'div') {
          element.style.backgroundColor = color;
        } else {
          element.style.fill = color;
        }
      });
    },
    getRandomElementsFromArray: function (array, quant) {
      var newArray = array.slice();
      var resultArray = [];
      for (var i = 0; i < quant; i++) {
        var index = window.utils.getRandomBetween(0, newArray.length - 1);
        var rndEl = newArray[index];
        newArray[index] = newArray[newArray.length - 1];
        newArray[newArray.length - 1] = rndEl;
        resultArray.push(newArray.pop());
      }
      return resultArray;
    },
    debounce: function (func) {
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(func, DEBOUNCE_INTERVAL);
    }
  };
})();
