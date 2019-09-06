"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const onServerStarted = async bp => {};

const onServerReady = async bp => {};

const entryPoint = {
  onServerStarted,
  onServerReady,
  definition: {
    name: 'basic-module',
    menuIcon: 'none',
    menuText: 'BasicExample',
    noInterface: false,
    fullName: 'BasicExample',
    homepage: 'https://botpress.io'
  }
};
var _default = entryPoint;
exports.default = _default;
//# sourceMappingURL=index.js.map