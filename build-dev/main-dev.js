/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!******************!*\
  !*** multi main ***!
  \******************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! c:\Users\EBDU6461\git\sam-angular\src\sam.ts */1);


/***/ },
/* 1 */
/*!********************!*\
  !*** ./src/sam.ts ***!
  \********************/
/***/ function(module, exports) {

	var SamAction = (function () {
	    function SamAction(model) {
	        this.model = model;
	    }
	    SamAction.prototype.init = function (data, present) {
	        present = present || model.present;
	        return present(data);
	    };
	    return SamAction;
	})();
	;
	var SamModel = (function () {
	    function SamModel(state) {
	        this.state = state;
	        this.model = this;
	        //this.model = this;
	    }
	    SamModel.prototype.present = function (data) {
	        if (!data.ready)
	            model.ready = data.ready;
	        return state.render(model);
	    };
	    return SamModel;
	})();
	var SamState = (function () {
	    function SamState(view) {
	        this.view = view;
	    }
	    SamState.prototype.compute = function (model) {
	        if (this.ready(model))
	            return view.ready(model);
	    };
	    SamState.prototype.representation = function (model) {
	        var representation = 'oops... something went wrong, the system is in an invalid state';
	        if (this.ready(model)) {
	            representation = view.ready(model);
	        }
	        return representation;
	    };
	    ;
	    SamState.prototype.nextAction = function (model) {
	    };
	    ;
	    SamState.prototype.render = function (model) {
	        return state.representation(model);
	        //state.nextAction(model) ;
	    };
	    SamState.prototype.ready = function (model) {
	        return model.ready;
	    };
	    return SamState;
	})();
	var SamView = (function () {
	    function SamView() {
	    }
	    // State representation of the ready state 
	    SamView.prototype.ready = function (model) {
	        return ("<div>Sam ready " + model.ready + "</div>");
	    };
	    ;
	    return SamView;
	})();
	var view = new SamView();
	var state = new SamState(view);
	var model = new SamModel(state);
	var actions = new SamAction(model);
	document.body.innerHTML = actions.init({ ready: true }, null);


/***/ }
/******/ ]);
//# sourceMappingURL=main-dev.js.map