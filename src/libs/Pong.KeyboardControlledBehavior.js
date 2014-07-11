'use strict';

var KeyboardControlledBehavior = function (keymaps, keyboard) {
  var keyboardControl = keyboard || Keyboard.getGlobalKeyboard(),
    mappings = keymaps || [];

  this.addKeyMapping = function (target, action, keys) {
    if (keys !== null && !(keys instanceof Array)) {
      keys = [keys];
    }
    mappings = mappings.concat(
      { target: target, action: action, keys: keys }
    );
  };

  this.update = function (dt) {
    _.each(
      mappings,
      function (mapping) {
        if (checkKeysPressed(mapping.keys)) {
          mapping.target[mapping.action]();
        }
      }
    );

    function checkKeysPressed(keys) {
      return _.every(
        keys,
        function (key) {
          return keyboardControl.isKeyPressed(key);
        }
      );
    }
  };

//  this.update = function (dt) {
//    _.each(
//      mappings,
//      function (mapping) {
//        if (checkKeysPressed(mapping.keys)) {
//          mapping.target[mapping.action]();
//        }
//      }
//    );
//
//    function checkKeysPressed(keys) {
//      return _.every(
//        keys,
//        keyboardControl.isKeyPressed
//      );
//    }
//  };
};