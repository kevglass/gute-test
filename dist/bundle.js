/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/TestGame.ts":
/*!*************************!*\
  !*** ./src/TestGame.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TestGame = void 0;
var TestGame = /** @class */ (function () {
    function TestGame() {
    }
    TestGame.prototype.init = function (context) {
        this.testImage = context.loadBitmap("test.png");
        this.testTiles = context.loadTileset("tiles.png", 8, 8);
    };
    TestGame.prototype.onMouseDown = function (context, x, y) {
    };
    TestGame.prototype.onMouseUp = function (context, x, y) {
    };
    TestGame.prototype.onKeyDown = function (context, key) {
    };
    TestGame.prototype.onKeyUp = function (context, key) {
    };
    TestGame.prototype.update = function (context, delta) {
    };
    TestGame.prototype.render = function (context, g) {
        g.fillRect(0, 0, 320, 240, "black");
        if (context.allResourcesLoaded()) {
            g.drawBitmap(100, 100, this.testImage);
            g.drawBitmap(150, 100, this.testTiles.getTile(0));
        }
    };
    return TestGame;
}());
exports.TestGame = TestGame;


/***/ }),

/***/ "../gute/dist/index.js":
/*!*****************************!*\
  !*** ../gute/dist/index.js ***!
  \*****************************/
/***/ ((module) => {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Gute.ts":
/*!*********************!*\
  !*** ./src/Gute.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __nested_webpack_require_608__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.startGame = void 0;
var BitmapImpl_1 = __nested_webpack_require_608__(/*! ./impl/BitmapImpl */ "./src/impl/BitmapImpl.ts");
var GraphicsImpl_1 = __nested_webpack_require_608__(/*! ./impl/GraphicsImpl */ "./src/impl/GraphicsImpl.ts");
var TilesetImpl_1 = __nested_webpack_require_608__(/*! ./impl/TilesetImpl */ "./src/impl/TilesetImpl.ts");
var GAME_LOOP;
function startGame(game) {
    GAME_LOOP = new GameLoop().start(game);
}
exports.startGame = startGame;
var GameLoop = /** @class */ (function () {
    function GameLoop() {
        this.resources = [];
        this.lastFrame = 0;
        this.inited = false;
    }
    GameLoop.prototype.allResourcesLoaded = function () {
        for (var _i = 0, _a = this.resources; _i < _a.length; _i++) {
            var resource = _a[_i];
            if (!resource.loaded) {
                return false;
            }
        }
        return true;
    };
    GameLoop.prototype.initResourcesOnFirstClick = function () {
        if (!this.inited) {
            this.inited = true;
        }
    };
    GameLoop.prototype.mouseDownHandler = function (x, y, id) {
        if (id === void 0) { id = 0; }
        this.initResourcesOnFirstClick();
        var canvas = this.graphics.canvas;
        canvas.focus();
        var width = canvas.clientWidth;
        var height = canvas.clientHeight;
        x = Math.floor((x / width) * canvas.width);
        y = Math.floor((y / height) * canvas.height);
        this.game.onMouseDown(this, x, y);
    };
    GameLoop.prototype.mouseUpHandler = function (x, y, id) {
        if (id === void 0) { id = 0; }
        this.initResourcesOnFirstClick();
        var canvas = this.graphics.canvas;
        var width = canvas.clientWidth;
        var height = canvas.clientHeight;
        x = Math.floor((x / width) * canvas.width);
        y = Math.floor((y / height) * canvas.height);
        this.game.onMouseUp(this, x, y);
    };
    GameLoop.prototype.keyDownHandler = function (key) {
        this.initResourcesOnFirstClick();
        this.game.onKeyDown(this, key);
    };
    GameLoop.prototype.keyUpHandler = function (key) {
        this.game.onKeyUp(this, key);
    };
    GameLoop.prototype.start = function (game) {
        var _this = this;
        this.game = game;
        this.graphics = new GraphicsImpl_1.GraphicsImpl();
        this.graphics.canvas.addEventListener("mousedown", function (event) {
            try {
                _this.mouseDownHandler(event.offsetX, event.offsetY);
                event.preventDefault();
                event.stopPropagation();
            }
            catch (e) {
                console.log(e);
            }
        });
        this.graphics.canvas.addEventListener("mouseup", function (event) {
            try {
                _this.mouseUpHandler(event.offsetX, event.offsetY);
                event.preventDefault();
                event.stopPropagation();
            }
            catch (e) {
                console.log(e);
            }
        });
        window.addEventListener("keydown", function (event) {
            _this.keyDownHandler(event.key);
            event.preventDefault();
            event.stopPropagation();
        });
        window.addEventListener("keyup", function (event) {
            _this.keyUpHandler(event.key);
            event.preventDefault();
            event.stopPropagation();
        });
        game.init(this);
        requestAnimationFrame(function () {
            _this.loop();
        });
        return this;
    };
    GameLoop.prototype.loop = function () {
        var _this = this;
        var now = new Date().getTime();
        var delta = 0;
        if (this.lastFrame !== 0) {
            delta = now - this.lastFrame;
        }
        this.lastFrame = now;
        this.game.update(this, delta);
        this.game.render(this, this.graphics);
        requestAnimationFrame(function () {
            _this.loop();
        });
    };
    GameLoop.prototype.loadBitmap = function (url) {
        var bitmap = new BitmapImpl_1.BitmapImpl(url);
        this.resources.push(bitmap);
        return bitmap;
    };
    GameLoop.prototype.loadTileset = function (url, tileWidth, tileHeight) {
        var tileset = new TilesetImpl_1.TilesetImpl(url, tileWidth, tileHeight);
        this.resources.push(tileset);
        return tileset;
    };
    return GameLoop;
}());


/***/ }),

/***/ "./src/impl/BitmapImpl.ts":
/*!********************************!*\
  !*** ./src/impl/BitmapImpl.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BitmapImpl = void 0;
var BitmapImpl = /** @class */ (function () {
    function BitmapImpl(url) {
        var _this = this;
        this.width = 0;
        this.height = 0;
        this.loaded = false;
        this.image = new Image();
        this.image.onload = function () {
            _this.width = _this.image.width;
            _this.height = _this.image.height;
            _this.loaded = true;
        };
        this.image.src = url;
    }
    BitmapImpl.prototype.getDrawable = function () {
        return this.image;
    };
    return BitmapImpl;
}());
exports.BitmapImpl = BitmapImpl;


/***/ }),

/***/ "./src/impl/GraphicsImpl.ts":
/*!**********************************!*\
  !*** ./src/impl/GraphicsImpl.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GraphicsImpl = void 0;
var isFirefox = typeof InstallTrigger !== 'undefined';
var GraphicsImpl = /** @class */ (function () {
    function GraphicsImpl() {
        this.canvas = document.getElementById("gamecanvas");
        this.ctx = this.canvas.getContext("2d", { alpha: false });
        this.ctx.webkitImageSmoothingEnabled = false;
        this.ctx.mozImageSmoothingEnabled = false;
        this.ctx.imageSmoothingEnabled = false;
        if (isFirefox) {
            this.canvas.style.imageRendering = "crisp-edges";
        }
        else {
            this.canvas.style.imageRendering = "pixelated";
        }
    }
    GraphicsImpl.prototype.fillRect = function (x, y, width, height, col) {
        this.ctx.fillStyle = col;
        this.ctx.fillRect(x, y, width, height);
    };
    GraphicsImpl.prototype.drawBitmap = function (x, y, bitmap) {
        this.ctx.drawImage(bitmap.getDrawable(), x, y);
    };
    return GraphicsImpl;
}());
exports.GraphicsImpl = GraphicsImpl;


/***/ }),

/***/ "./src/impl/TilesetImpl.ts":
/*!*********************************!*\
  !*** ./src/impl/TilesetImpl.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TilesetImpl = void 0;
var Tile = /** @class */ (function () {
    function Tile(canvas) {
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.loaded = true;
    }
    Tile.prototype.getDrawable = function () {
        return this.canvas;
    };
    return Tile;
}());
var TilesetImpl = /** @class */ (function () {
    function TilesetImpl(url, tileWidth, tileHeight) {
        var _this = this;
        this.loaded = false;
        this.bitmaps = [];
        this.scanline = 0;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.image = new Image();
        this.image.onload = function () {
            var _a;
            _this.scanline = Math.floor(_this.image.width / tileWidth);
            var depth = Math.floor(_this.image.height / tileHeight);
            // cut the image into pieces
            for (var y = 0; y < depth; y++) {
                for (var x = 0; x < _this.scanline; x++) {
                    var canvas = document.createElement("canvas");
                    canvas.width = tileWidth;
                    canvas.height = tileHeight;
                    (_a = canvas.getContext("2d")) === null || _a === void 0 ? void 0 : _a.drawImage(_this.image, -x * tileWidth, -y * tileHeight);
                    _this.bitmaps.push(new Tile(canvas));
                }
            }
            _this.loaded = true;
        };
        this.image.src = url;
    }
    TilesetImpl.prototype.getTile = function (tile) {
        return this.bitmaps[tile];
    };
    return TilesetImpl;
}());
exports.TilesetImpl = TilesetImpl;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_9365__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_9365__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.startGame = void 0;
var Gute_1 = __nested_webpack_require_9365__(/*! ./Gute */ "./src/Gute.ts");
Object.defineProperty(exports, "startGame", ({ enumerable: true, get: function () { return Gute_1.startGame; } }));

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ndXRlL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9ndXRlLy4vc3JjL0d1dGUudHMiLCJ3ZWJwYWNrOi8vZ3V0ZS8uL3NyYy9pbXBsL0JpdG1hcEltcGwudHMiLCJ3ZWJwYWNrOi8vZ3V0ZS8uL3NyYy9pbXBsL0dyYXBoaWNzSW1wbC50cyIsIndlYnBhY2s6Ly9ndXRlLy4vc3JjL2ltcGwvVGlsZXNldEltcGwudHMiLCJ3ZWJwYWNrOi8vZ3V0ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ndXRlLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPOzs7Ozs7Ozs7O0FDVmE7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QsaUJBQWlCO0FBQ2pCLG1CQUFtQixtQkFBTyxDQUFDLG1EQUFtQjtBQUM5QyxxQkFBcUIsbUJBQU8sQ0FBQyx1REFBcUI7QUFDbEQsb0JBQW9CLG1CQUFPLENBQUMscURBQW9CO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLGdCQUFnQjtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixRQUFRO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFFBQVE7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7O0FDNUhZO0FBQ2IsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Qsa0JBQWtCOzs7Ozs7Ozs7OztBQ3RCTDtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsZUFBZTtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Qsb0JBQW9COzs7Ozs7Ozs7OztBQzNCUDtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLFdBQVc7QUFDdEMsK0JBQStCLG9CQUFvQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsbUJBQW1COzs7Ozs7O1VDL0NuQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7O0FDdEJhO0FBQ2IsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELGlCQUFpQjtBQUNqQixhQUFhLG1CQUFPLENBQUMsNkJBQVE7QUFDN0IsNkNBQTRDLENBQUMscUNBQXFDLHlCQUF5QixFQUFFLEVBQUUsRUFBQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImd1dGVcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiZ3V0ZVwiXSA9IGZhY3RvcnkoKTtcbn0pKHNlbGYsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zdGFydEdhbWUgPSB2b2lkIDA7XG52YXIgQml0bWFwSW1wbF8xID0gcmVxdWlyZShcIi4vaW1wbC9CaXRtYXBJbXBsXCIpO1xudmFyIEdyYXBoaWNzSW1wbF8xID0gcmVxdWlyZShcIi4vaW1wbC9HcmFwaGljc0ltcGxcIik7XG52YXIgVGlsZXNldEltcGxfMSA9IHJlcXVpcmUoXCIuL2ltcGwvVGlsZXNldEltcGxcIik7XG52YXIgR0FNRV9MT09QO1xuZnVuY3Rpb24gc3RhcnRHYW1lKGdhbWUpIHtcbiAgICBHQU1FX0xPT1AgPSBuZXcgR2FtZUxvb3AoKS5zdGFydChnYW1lKTtcbn1cbmV4cG9ydHMuc3RhcnRHYW1lID0gc3RhcnRHYW1lO1xudmFyIEdhbWVMb29wID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEdhbWVMb29wKCkge1xuICAgICAgICB0aGlzLnJlc291cmNlcyA9IFtdO1xuICAgICAgICB0aGlzLmxhc3RGcmFtZSA9IDA7XG4gICAgICAgIHRoaXMuaW5pdGVkID0gZmFsc2U7XG4gICAgfVxuICAgIEdhbWVMb29wLnByb3RvdHlwZS5hbGxSZXNvdXJjZXNMb2FkZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSB0aGlzLnJlc291cmNlczsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciByZXNvdXJjZSA9IF9hW19pXTtcbiAgICAgICAgICAgIGlmICghcmVzb3VyY2UubG9hZGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgR2FtZUxvb3AucHJvdG90eXBlLmluaXRSZXNvdXJjZXNPbkZpcnN0Q2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5pbml0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgR2FtZUxvb3AucHJvdG90eXBlLm1vdXNlRG93bkhhbmRsZXIgPSBmdW5jdGlvbiAoeCwgeSwgaWQpIHtcbiAgICAgICAgaWYgKGlkID09PSB2b2lkIDApIHsgaWQgPSAwOyB9XG4gICAgICAgIHRoaXMuaW5pdFJlc291cmNlc09uRmlyc3RDbGljaygpO1xuICAgICAgICB2YXIgY2FudmFzID0gdGhpcy5ncmFwaGljcy5jYW52YXM7XG4gICAgICAgIGNhbnZhcy5mb2N1cygpO1xuICAgICAgICB2YXIgd2lkdGggPSBjYW52YXMuY2xpZW50V2lkdGg7XG4gICAgICAgIHZhciBoZWlnaHQgPSBjYW52YXMuY2xpZW50SGVpZ2h0O1xuICAgICAgICB4ID0gTWF0aC5mbG9vcigoeCAvIHdpZHRoKSAqIGNhbnZhcy53aWR0aCk7XG4gICAgICAgIHkgPSBNYXRoLmZsb29yKCh5IC8gaGVpZ2h0KSAqIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgICB0aGlzLmdhbWUub25Nb3VzZURvd24odGhpcywgeCwgeSk7XG4gICAgfTtcbiAgICBHYW1lTG9vcC5wcm90b3R5cGUubW91c2VVcEhhbmRsZXIgPSBmdW5jdGlvbiAoeCwgeSwgaWQpIHtcbiAgICAgICAgaWYgKGlkID09PSB2b2lkIDApIHsgaWQgPSAwOyB9XG4gICAgICAgIHRoaXMuaW5pdFJlc291cmNlc09uRmlyc3RDbGljaygpO1xuICAgICAgICB2YXIgY2FudmFzID0gdGhpcy5ncmFwaGljcy5jYW52YXM7XG4gICAgICAgIHZhciB3aWR0aCA9IGNhbnZhcy5jbGllbnRXaWR0aDtcbiAgICAgICAgdmFyIGhlaWdodCA9IGNhbnZhcy5jbGllbnRIZWlnaHQ7XG4gICAgICAgIHggPSBNYXRoLmZsb29yKCh4IC8gd2lkdGgpICogY2FudmFzLndpZHRoKTtcbiAgICAgICAgeSA9IE1hdGguZmxvb3IoKHkgLyBoZWlnaHQpICogY2FudmFzLmhlaWdodCk7XG4gICAgICAgIHRoaXMuZ2FtZS5vbk1vdXNlVXAodGhpcywgeCwgeSk7XG4gICAgfTtcbiAgICBHYW1lTG9vcC5wcm90b3R5cGUua2V5RG93bkhhbmRsZXIgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHRoaXMuaW5pdFJlc291cmNlc09uRmlyc3RDbGljaygpO1xuICAgICAgICB0aGlzLmdhbWUub25LZXlEb3duKHRoaXMsIGtleSk7XG4gICAgfTtcbiAgICBHYW1lTG9vcC5wcm90b3R5cGUua2V5VXBIYW5kbGVyID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICB0aGlzLmdhbWUub25LZXlVcCh0aGlzLCBrZXkpO1xuICAgIH07XG4gICAgR2FtZUxvb3AucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24gKGdhbWUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICAgICAgdGhpcy5ncmFwaGljcyA9IG5ldyBHcmFwaGljc0ltcGxfMS5HcmFwaGljc0ltcGwoKTtcbiAgICAgICAgdGhpcy5ncmFwaGljcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgX3RoaXMubW91c2VEb3duSGFuZGxlcihldmVudC5vZmZzZXRYLCBldmVudC5vZmZzZXRZKTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZ3JhcGhpY3MuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBfdGhpcy5tb3VzZVVwSGFuZGxlcihldmVudC5vZmZzZXRYLCBldmVudC5vZmZzZXRZKTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIF90aGlzLmtleURvd25IYW5kbGVyKGV2ZW50LmtleSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgX3RoaXMua2V5VXBIYW5kbGVyKGV2ZW50LmtleSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBnYW1lLmluaXQodGhpcyk7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5sb29wKCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEdhbWVMb29wLnByb3RvdHlwZS5sb29wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIHZhciBkZWx0YSA9IDA7XG4gICAgICAgIGlmICh0aGlzLmxhc3RGcmFtZSAhPT0gMCkge1xuICAgICAgICAgICAgZGVsdGEgPSBub3cgLSB0aGlzLmxhc3RGcmFtZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxhc3RGcmFtZSA9IG5vdztcbiAgICAgICAgdGhpcy5nYW1lLnVwZGF0ZSh0aGlzLCBkZWx0YSk7XG4gICAgICAgIHRoaXMuZ2FtZS5yZW5kZXIodGhpcywgdGhpcy5ncmFwaGljcyk7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5sb29wKCk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgR2FtZUxvb3AucHJvdG90eXBlLmxvYWRCaXRtYXAgPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgICAgIHZhciBiaXRtYXAgPSBuZXcgQml0bWFwSW1wbF8xLkJpdG1hcEltcGwodXJsKTtcbiAgICAgICAgdGhpcy5yZXNvdXJjZXMucHVzaChiaXRtYXApO1xuICAgICAgICByZXR1cm4gYml0bWFwO1xuICAgIH07XG4gICAgR2FtZUxvb3AucHJvdG90eXBlLmxvYWRUaWxlc2V0ID0gZnVuY3Rpb24gKHVybCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KSB7XG4gICAgICAgIHZhciB0aWxlc2V0ID0gbmV3IFRpbGVzZXRJbXBsXzEuVGlsZXNldEltcGwodXJsLCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQpO1xuICAgICAgICB0aGlzLnJlc291cmNlcy5wdXNoKHRpbGVzZXQpO1xuICAgICAgICByZXR1cm4gdGlsZXNldDtcbiAgICB9O1xuICAgIHJldHVybiBHYW1lTG9vcDtcbn0oKSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQml0bWFwSW1wbCA9IHZvaWQgMDtcbnZhciBCaXRtYXBJbXBsID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJpdG1hcEltcGwodXJsKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMud2lkdGggPSAwO1xuICAgICAgICB0aGlzLmhlaWdodCA9IDA7XG4gICAgICAgIHRoaXMubG9hZGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy53aWR0aCA9IF90aGlzLmltYWdlLndpZHRoO1xuICAgICAgICAgICAgX3RoaXMuaGVpZ2h0ID0gX3RoaXMuaW1hZ2UuaGVpZ2h0O1xuICAgICAgICAgICAgX3RoaXMubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSB1cmw7XG4gICAgfVxuICAgIEJpdG1hcEltcGwucHJvdG90eXBlLmdldERyYXdhYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbWFnZTtcbiAgICB9O1xuICAgIHJldHVybiBCaXRtYXBJbXBsO1xufSgpKTtcbmV4cG9ydHMuQml0bWFwSW1wbCA9IEJpdG1hcEltcGw7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuR3JhcGhpY3NJbXBsID0gdm9pZCAwO1xudmFyIGlzRmlyZWZveCA9IHR5cGVvZiBJbnN0YWxsVHJpZ2dlciAhPT0gJ3VuZGVmaW5lZCc7XG52YXIgR3JhcGhpY3NJbXBsID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEdyYXBoaWNzSW1wbCgpIHtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhbWVjYW52YXNcIik7XG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIsIHsgYWxwaGE6IGZhbHNlIH0pO1xuICAgICAgICB0aGlzLmN0eC53ZWJraXRJbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jdHgubW96SW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICBpZiAoaXNGaXJlZm94KSB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5zdHlsZS5pbWFnZVJlbmRlcmluZyA9IFwiY3Jpc3AtZWRnZXNcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzLnN0eWxlLmltYWdlUmVuZGVyaW5nID0gXCJwaXhlbGF0ZWRcIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBHcmFwaGljc0ltcGwucHJvdG90eXBlLmZpbGxSZWN0ID0gZnVuY3Rpb24gKHgsIHksIHdpZHRoLCBoZWlnaHQsIGNvbCkge1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBjb2w7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KHgsIHksIHdpZHRoLCBoZWlnaHQpO1xuICAgIH07XG4gICAgR3JhcGhpY3NJbXBsLnByb3RvdHlwZS5kcmF3Qml0bWFwID0gZnVuY3Rpb24gKHgsIHksIGJpdG1hcCkge1xuICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoYml0bWFwLmdldERyYXdhYmxlKCksIHgsIHkpO1xuICAgIH07XG4gICAgcmV0dXJuIEdyYXBoaWNzSW1wbDtcbn0oKSk7XG5leHBvcnRzLkdyYXBoaWNzSW1wbCA9IEdyYXBoaWNzSW1wbDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5UaWxlc2V0SW1wbCA9IHZvaWQgMDtcbnZhciBUaWxlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRpbGUoY2FudmFzKSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xuICAgICAgICB0aGlzLndpZHRoID0gY2FudmFzLndpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XG4gICAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgVGlsZS5wcm90b3R5cGUuZ2V0RHJhd2FibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhbnZhcztcbiAgICB9O1xuICAgIHJldHVybiBUaWxlO1xufSgpKTtcbnZhciBUaWxlc2V0SW1wbCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUaWxlc2V0SW1wbCh1cmwsIHRpbGVXaWR0aCwgdGlsZUhlaWdodCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmxvYWRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmJpdG1hcHMgPSBbXTtcbiAgICAgICAgdGhpcy5zY2FubGluZSA9IDA7XG4gICAgICAgIHRoaXMudGlsZVdpZHRoID0gdGlsZVdpZHRoO1xuICAgICAgICB0aGlzLnRpbGVIZWlnaHQgPSB0aWxlSGVpZ2h0O1xuICAgICAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHRoaXMuaW1hZ2Uub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgX3RoaXMuc2NhbmxpbmUgPSBNYXRoLmZsb29yKF90aGlzLmltYWdlLndpZHRoIC8gdGlsZVdpZHRoKTtcbiAgICAgICAgICAgIHZhciBkZXB0aCA9IE1hdGguZmxvb3IoX3RoaXMuaW1hZ2UuaGVpZ2h0IC8gdGlsZUhlaWdodCk7XG4gICAgICAgICAgICAvLyBjdXQgdGhlIGltYWdlIGludG8gcGllY2VzXG4gICAgICAgICAgICBmb3IgKHZhciB5ID0gMDsgeSA8IGRlcHRoOyB5KyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IF90aGlzLnNjYW5saW5lOyB4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgICAgICAgICAgICAgIGNhbnZhcy53aWR0aCA9IHRpbGVXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9IHRpbGVIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIChfYSA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIikpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5kcmF3SW1hZ2UoX3RoaXMuaW1hZ2UsIC14ICogdGlsZVdpZHRoLCAteSAqIHRpbGVIZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5iaXRtYXBzLnB1c2gobmV3IFRpbGUoY2FudmFzKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSB1cmw7XG4gICAgfVxuICAgIFRpbGVzZXRJbXBsLnByb3RvdHlwZS5nZXRUaWxlID0gZnVuY3Rpb24gKHRpbGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYml0bWFwc1t0aWxlXTtcbiAgICB9O1xuICAgIHJldHVybiBUaWxlc2V0SW1wbDtcbn0oKSk7XG5leHBvcnRzLlRpbGVzZXRJbXBsID0gVGlsZXNldEltcGw7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnN0YXJ0R2FtZSA9IHZvaWQgMDtcbnZhciBHdXRlXzEgPSByZXF1aXJlKFwiLi9HdXRlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwic3RhcnRHYW1lXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBHdXRlXzEuc3RhcnRHYW1lOyB9IH0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
var dist_1 = __webpack_require__(/*! gute/dist */ "../gute/dist/index.js");
var TestGame_1 = __webpack_require__(/*! ./TestGame */ "./src/TestGame.ts");
console.log("Starting Test Game");
dist_1.startGame(new TestGame_1.TestGame());

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ndXRlLXRlc3QvLi9zcmMvVGVzdEdhbWUudHMiLCJ3ZWJwYWNrOi8vZ3V0ZS10ZXN0Ly4uL2d1dGUvZGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly9ndXRlLXRlc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZ3V0ZS10ZXN0Ly4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsZ0JBQWdCOzs7Ozs7Ozs7OztBQzdCaEI7QUFDQSxJQUFJLElBQXlEO0FBQzdEO0FBQ0EsTUFBTSxFQUtxQjtBQUMzQixDQUFDO0FBQ0Qsd0JBQXdCO0FBQ3hCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsOEJBQW1COzs7QUFHN0QsK0NBQStDLGNBQWM7QUFDN0Q7QUFDQSxtQkFBbUIsOEJBQW1CO0FBQ3RDLHFCQUFxQiw4QkFBbUI7QUFDeEMsb0JBQW9CLDhCQUFtQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsZ0JBQWdCO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFFBQVE7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsUUFBUTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0QsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSwrQ0FBK0MsY0FBYztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7O0FBR0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSwrQ0FBK0MsY0FBYztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELGVBQWU7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7QUFHQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLCtDQUErQyxjQUFjO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLFdBQVc7QUFDdEMsK0JBQStCLG9CQUFvQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7OztBQUdBLE9BQU87O0FBRVAsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsK0JBQW1CO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWlFLCtCQUFtQjtBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwrQ0FBK0MsY0FBYztBQUM3RDtBQUNBLGFBQWEsK0JBQW1CO0FBQ2hDLDhDQUE4QyxxQ0FBcUMseUJBQXlCLEVBQUUsRUFBRTs7QUFFaEgsQ0FBQzs7QUFFRDtBQUNBLFVBQVU7QUFDVjtBQUNBLENBQUM7QUFDRCwyQ0FBMkMsY0FBYywrbWU7Ozs7OztVQ3BVekQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7Ozs7QUN0QmE7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QsYUFBYSxtQkFBTyxDQUFDLHdDQUFXO0FBQ2hDLGlCQUFpQixtQkFBTyxDQUFDLHFDQUFZO0FBQ3JDO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlRlc3RHYW1lID0gdm9pZCAwO1xudmFyIFRlc3RHYW1lID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRlc3RHYW1lKCkge1xuICAgIH1cbiAgICBUZXN0R2FtZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIHRoaXMudGVzdEltYWdlID0gY29udGV4dC5sb2FkQml0bWFwKFwidGVzdC5wbmdcIik7XG4gICAgICAgIHRoaXMudGVzdFRpbGVzID0gY29udGV4dC5sb2FkVGlsZXNldChcInRpbGVzLnBuZ1wiLCA4LCA4KTtcbiAgICB9O1xuICAgIFRlc3RHYW1lLnByb3RvdHlwZS5vbk1vdXNlRG93biA9IGZ1bmN0aW9uIChjb250ZXh0LCB4LCB5KSB7XG4gICAgfTtcbiAgICBUZXN0R2FtZS5wcm90b3R5cGUub25Nb3VzZVVwID0gZnVuY3Rpb24gKGNvbnRleHQsIHgsIHkpIHtcbiAgICB9O1xuICAgIFRlc3RHYW1lLnByb3RvdHlwZS5vbktleURvd24gPSBmdW5jdGlvbiAoY29udGV4dCwga2V5KSB7XG4gICAgfTtcbiAgICBUZXN0R2FtZS5wcm90b3R5cGUub25LZXlVcCA9IGZ1bmN0aW9uIChjb250ZXh0LCBrZXkpIHtcbiAgICB9O1xuICAgIFRlc3RHYW1lLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoY29udGV4dCwgZGVsdGEpIHtcbiAgICB9O1xuICAgIFRlc3RHYW1lLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoY29udGV4dCwgZykge1xuICAgICAgICBnLmZpbGxSZWN0KDAsIDAsIDMyMCwgMjQwLCBcImJsYWNrXCIpO1xuICAgICAgICBpZiAoY29udGV4dC5hbGxSZXNvdXJjZXNMb2FkZWQoKSkge1xuICAgICAgICAgICAgZy5kcmF3Qml0bWFwKDEwMCwgMTAwLCB0aGlzLnRlc3RJbWFnZSk7XG4gICAgICAgICAgICBnLmRyYXdCaXRtYXAoMTUwLCAxMDAsIHRoaXMudGVzdFRpbGVzLmdldFRpbGUoMCkpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gVGVzdEdhbWU7XG59KCkpO1xuZXhwb3J0cy5UZXN0R2FtZSA9IFRlc3RHYW1lO1xuIiwiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiZ3V0ZVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJndXRlXCJdID0gZmFjdG9yeSgpO1xufSkoc2VsZiwgZnVuY3Rpb24oKSB7XG5yZXR1cm4gLyoqKioqKi8gKCgpID0+IHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHRcInVzZSBzdHJpY3RcIjtcbi8qKioqKiovIFx0dmFyIF9fd2VicGFja19tb2R1bGVzX18gPSAoe1xuXG4vKioqLyBcIi4vc3JjL0d1dGUudHNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL3NyYy9HdXRlLnRzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKiovXG4vKioqLyAoKF9fdW51c2VkX3dlYnBhY2tfbW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSA9PiB7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCAoeyB2YWx1ZTogdHJ1ZSB9KSk7XG5leHBvcnRzLnN0YXJ0R2FtZSA9IHZvaWQgMDtcbnZhciBCaXRtYXBJbXBsXzEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL2ltcGwvQml0bWFwSW1wbCAqLyBcIi4vc3JjL2ltcGwvQml0bWFwSW1wbC50c1wiKTtcbnZhciBHcmFwaGljc0ltcGxfMSA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vaW1wbC9HcmFwaGljc0ltcGwgKi8gXCIuL3NyYy9pbXBsL0dyYXBoaWNzSW1wbC50c1wiKTtcbnZhciBUaWxlc2V0SW1wbF8xID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi9pbXBsL1RpbGVzZXRJbXBsICovIFwiLi9zcmMvaW1wbC9UaWxlc2V0SW1wbC50c1wiKTtcbnZhciBHQU1FX0xPT1A7XG5mdW5jdGlvbiBzdGFydEdhbWUoZ2FtZSkge1xuICAgIEdBTUVfTE9PUCA9IG5ldyBHYW1lTG9vcCgpLnN0YXJ0KGdhbWUpO1xufVxuZXhwb3J0cy5zdGFydEdhbWUgPSBzdGFydEdhbWU7XG52YXIgR2FtZUxvb3AgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gR2FtZUxvb3AoKSB7XG4gICAgICAgIHRoaXMucmVzb3VyY2VzID0gW107XG4gICAgICAgIHRoaXMubGFzdEZyYW1lID0gMDtcbiAgICAgICAgdGhpcy5pbml0ZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgR2FtZUxvb3AucHJvdG90eXBlLmFsbFJlc291cmNlc0xvYWRlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMucmVzb3VyY2VzOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIHJlc291cmNlID0gX2FbX2ldO1xuICAgICAgICAgICAgaWYgKCFyZXNvdXJjZS5sb2FkZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICBHYW1lTG9vcC5wcm90b3R5cGUuaW5pdFJlc291cmNlc09uRmlyc3RDbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmluaXRlZCkge1xuICAgICAgICAgICAgdGhpcy5pbml0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBHYW1lTG9vcC5wcm90b3R5cGUubW91c2VEb3duSGFuZGxlciA9IGZ1bmN0aW9uICh4LCB5LCBpZCkge1xuICAgICAgICBpZiAoaWQgPT09IHZvaWQgMCkgeyBpZCA9IDA7IH1cbiAgICAgICAgdGhpcy5pbml0UmVzb3VyY2VzT25GaXJzdENsaWNrKCk7XG4gICAgICAgIHZhciBjYW52YXMgPSB0aGlzLmdyYXBoaWNzLmNhbnZhcztcbiAgICAgICAgY2FudmFzLmZvY3VzKCk7XG4gICAgICAgIHZhciB3aWR0aCA9IGNhbnZhcy5jbGllbnRXaWR0aDtcbiAgICAgICAgdmFyIGhlaWdodCA9IGNhbnZhcy5jbGllbnRIZWlnaHQ7XG4gICAgICAgIHggPSBNYXRoLmZsb29yKCh4IC8gd2lkdGgpICogY2FudmFzLndpZHRoKTtcbiAgICAgICAgeSA9IE1hdGguZmxvb3IoKHkgLyBoZWlnaHQpICogY2FudmFzLmhlaWdodCk7XG4gICAgICAgIHRoaXMuZ2FtZS5vbk1vdXNlRG93bih0aGlzLCB4LCB5KTtcbiAgICB9O1xuICAgIEdhbWVMb29wLnByb3RvdHlwZS5tb3VzZVVwSGFuZGxlciA9IGZ1bmN0aW9uICh4LCB5LCBpZCkge1xuICAgICAgICBpZiAoaWQgPT09IHZvaWQgMCkgeyBpZCA9IDA7IH1cbiAgICAgICAgdGhpcy5pbml0UmVzb3VyY2VzT25GaXJzdENsaWNrKCk7XG4gICAgICAgIHZhciBjYW52YXMgPSB0aGlzLmdyYXBoaWNzLmNhbnZhcztcbiAgICAgICAgdmFyIHdpZHRoID0gY2FudmFzLmNsaWVudFdpZHRoO1xuICAgICAgICB2YXIgaGVpZ2h0ID0gY2FudmFzLmNsaWVudEhlaWdodDtcbiAgICAgICAgeCA9IE1hdGguZmxvb3IoKHggLyB3aWR0aCkgKiBjYW52YXMud2lkdGgpO1xuICAgICAgICB5ID0gTWF0aC5mbG9vcigoeSAvIGhlaWdodCkgKiBjYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5nYW1lLm9uTW91c2VVcCh0aGlzLCB4LCB5KTtcbiAgICB9O1xuICAgIEdhbWVMb29wLnByb3RvdHlwZS5rZXlEb3duSGFuZGxlciA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgdGhpcy5pbml0UmVzb3VyY2VzT25GaXJzdENsaWNrKCk7XG4gICAgICAgIHRoaXMuZ2FtZS5vbktleURvd24odGhpcywga2V5KTtcbiAgICB9O1xuICAgIEdhbWVMb29wLnByb3RvdHlwZS5rZXlVcEhhbmRsZXIgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHRoaXMuZ2FtZS5vbktleVVwKHRoaXMsIGtleSk7XG4gICAgfTtcbiAgICBHYW1lTG9vcC5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbiAoZ2FtZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgICAgICB0aGlzLmdyYXBoaWNzID0gbmV3IEdyYXBoaWNzSW1wbF8xLkdyYXBoaWNzSW1wbCgpO1xuICAgICAgICB0aGlzLmdyYXBoaWNzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBfdGhpcy5tb3VzZURvd25IYW5kbGVyKGV2ZW50Lm9mZnNldFgsIGV2ZW50Lm9mZnNldFkpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5ncmFwaGljcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIF90aGlzLm1vdXNlVXBIYW5kbGVyKGV2ZW50Lm9mZnNldFgsIGV2ZW50Lm9mZnNldFkpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgX3RoaXMua2V5RG93bkhhbmRsZXIoZXZlbnQua2V5KTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBfdGhpcy5rZXlVcEhhbmRsZXIoZXZlbnQua2V5KTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGdhbWUuaW5pdCh0aGlzKTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLmxvb3AoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgR2FtZUxvb3AucHJvdG90eXBlLmxvb3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdmFyIGRlbHRhID0gMDtcbiAgICAgICAgaWYgKHRoaXMubGFzdEZyYW1lICE9PSAwKSB7XG4gICAgICAgICAgICBkZWx0YSA9IG5vdyAtIHRoaXMubGFzdEZyYW1lO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGFzdEZyYW1lID0gbm93O1xuICAgICAgICB0aGlzLmdhbWUudXBkYXRlKHRoaXMsIGRlbHRhKTtcbiAgICAgICAgdGhpcy5nYW1lLnJlbmRlcih0aGlzLCB0aGlzLmdyYXBoaWNzKTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLmxvb3AoKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBHYW1lTG9vcC5wcm90b3R5cGUubG9hZEJpdG1hcCA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgICAgdmFyIGJpdG1hcCA9IG5ldyBCaXRtYXBJbXBsXzEuQml0bWFwSW1wbCh1cmwpO1xuICAgICAgICB0aGlzLnJlc291cmNlcy5wdXNoKGJpdG1hcCk7XG4gICAgICAgIHJldHVybiBiaXRtYXA7XG4gICAgfTtcbiAgICBHYW1lTG9vcC5wcm90b3R5cGUubG9hZFRpbGVzZXQgPSBmdW5jdGlvbiAodXJsLCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQpIHtcbiAgICAgICAgdmFyIHRpbGVzZXQgPSBuZXcgVGlsZXNldEltcGxfMS5UaWxlc2V0SW1wbCh1cmwsIHRpbGVXaWR0aCwgdGlsZUhlaWdodCk7XG4gICAgICAgIHRoaXMucmVzb3VyY2VzLnB1c2godGlsZXNldCk7XG4gICAgICAgIHJldHVybiB0aWxlc2V0O1xuICAgIH07XG4gICAgcmV0dXJuIEdhbWVMb29wO1xufSgpKTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL3NyYy9pbXBsL0JpdG1hcEltcGwudHNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vc3JjL2ltcGwvQml0bWFwSW1wbC50cyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqLyAoKF9fdW51c2VkX3dlYnBhY2tfbW9kdWxlLCBleHBvcnRzKSA9PiB7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCAoeyB2YWx1ZTogdHJ1ZSB9KSk7XG5leHBvcnRzLkJpdG1hcEltcGwgPSB2b2lkIDA7XG52YXIgQml0bWFwSW1wbCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCaXRtYXBJbXBsKHVybCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLndpZHRoID0gMDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAwO1xuICAgICAgICB0aGlzLmxvYWRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHRoaXMuaW1hZ2Uub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMud2lkdGggPSBfdGhpcy5pbWFnZS53aWR0aDtcbiAgICAgICAgICAgIF90aGlzLmhlaWdodCA9IF90aGlzLmltYWdlLmhlaWdodDtcbiAgICAgICAgICAgIF90aGlzLmxvYWRlZCA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gdXJsO1xuICAgIH1cbiAgICBCaXRtYXBJbXBsLnByb3RvdHlwZS5nZXREcmF3YWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2U7XG4gICAgfTtcbiAgICByZXR1cm4gQml0bWFwSW1wbDtcbn0oKSk7XG5leHBvcnRzLkJpdG1hcEltcGwgPSBCaXRtYXBJbXBsO1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vc3JjL2ltcGwvR3JhcGhpY3NJbXBsLnRzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vc3JjL2ltcGwvR3JhcGhpY3NJbXBsLnRzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gKChfX3VudXNlZF93ZWJwYWNrX21vZHVsZSwgZXhwb3J0cykgPT4ge1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgKHsgdmFsdWU6IHRydWUgfSkpO1xuZXhwb3J0cy5HcmFwaGljc0ltcGwgPSB2b2lkIDA7XG52YXIgaXNGaXJlZm94ID0gdHlwZW9mIEluc3RhbGxUcmlnZ2VyICE9PSAndW5kZWZpbmVkJztcbnZhciBHcmFwaGljc0ltcGwgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gR3JhcGhpY3NJbXBsKCkge1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2FtZWNhbnZhc1wiKTtcbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIiwgeyBhbHBoYTogZmFsc2UgfSk7XG4gICAgICAgIHRoaXMuY3R4LndlYmtpdEltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmN0eC5tb3pJbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG4gICAgICAgIGlmIChpc0ZpcmVmb3gpIHtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzLnN0eWxlLmltYWdlUmVuZGVyaW5nID0gXCJjcmlzcC1lZGdlc1wiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jYW52YXMuc3R5bGUuaW1hZ2VSZW5kZXJpbmcgPSBcInBpeGVsYXRlZFwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIEdyYXBoaWNzSW1wbC5wcm90b3R5cGUuZmlsbFJlY3QgPSBmdW5jdGlvbiAoeCwgeSwgd2lkdGgsIGhlaWdodCwgY29sKSB7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGNvbDtcbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCk7XG4gICAgfTtcbiAgICBHcmFwaGljc0ltcGwucHJvdG90eXBlLmRyYXdCaXRtYXAgPSBmdW5jdGlvbiAoeCwgeSwgYml0bWFwKSB7XG4gICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZShiaXRtYXAuZ2V0RHJhd2FibGUoKSwgeCwgeSk7XG4gICAgfTtcbiAgICByZXR1cm4gR3JhcGhpY3NJbXBsO1xufSgpKTtcbmV4cG9ydHMuR3JhcGhpY3NJbXBsID0gR3JhcGhpY3NJbXBsO1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vc3JjL2ltcGwvVGlsZXNldEltcGwudHNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL3NyYy9pbXBsL1RpbGVzZXRJbXBsLnRzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqLyAoKF9fdW51c2VkX3dlYnBhY2tfbW9kdWxlLCBleHBvcnRzKSA9PiB7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCAoeyB2YWx1ZTogdHJ1ZSB9KSk7XG5leHBvcnRzLlRpbGVzZXRJbXBsID0gdm9pZCAwO1xudmFyIFRpbGUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGlsZShjYW52YXMpIHtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XG4gICAgICAgIHRoaXMud2lkdGggPSBjYW52YXMud2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcbiAgICAgICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xuICAgIH1cbiAgICBUaWxlLnByb3RvdHlwZS5nZXREcmF3YWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FudmFzO1xuICAgIH07XG4gICAgcmV0dXJuIFRpbGU7XG59KCkpO1xudmFyIFRpbGVzZXRJbXBsID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRpbGVzZXRJbXBsKHVybCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMubG9hZGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYml0bWFwcyA9IFtdO1xuICAgICAgICB0aGlzLnNjYW5saW5lID0gMDtcbiAgICAgICAgdGhpcy50aWxlV2lkdGggPSB0aWxlV2lkdGg7XG4gICAgICAgIHRoaXMudGlsZUhlaWdodCA9IHRpbGVIZWlnaHQ7XG4gICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICBfdGhpcy5zY2FubGluZSA9IE1hdGguZmxvb3IoX3RoaXMuaW1hZ2Uud2lkdGggLyB0aWxlV2lkdGgpO1xuICAgICAgICAgICAgdmFyIGRlcHRoID0gTWF0aC5mbG9vcihfdGhpcy5pbWFnZS5oZWlnaHQgLyB0aWxlSGVpZ2h0KTtcbiAgICAgICAgICAgIC8vIGN1dCB0aGUgaW1hZ2UgaW50byBwaWVjZXNcbiAgICAgICAgICAgIGZvciAodmFyIHkgPSAwOyB5IDwgZGVwdGg7IHkrKykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgX3RoaXMuc2NhbmxpbmU7IHgrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgY2FudmFzLndpZHRoID0gdGlsZVdpZHRoO1xuICAgICAgICAgICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gdGlsZUhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgKF9hID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmRyYXdJbWFnZShfdGhpcy5pbWFnZSwgLXggKiB0aWxlV2lkdGgsIC15ICogdGlsZUhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmJpdG1hcHMucHVzaChuZXcgVGlsZShjYW52YXMpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdGhpcy5sb2FkZWQgPSB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmltYWdlLnNyYyA9IHVybDtcbiAgICB9XG4gICAgVGlsZXNldEltcGwucHJvdG90eXBlLmdldFRpbGUgPSBmdW5jdGlvbiAodGlsZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5iaXRtYXBzW3RpbGVdO1xuICAgIH07XG4gICAgcmV0dXJuIFRpbGVzZXRJbXBsO1xufSgpKTtcbmV4cG9ydHMuVGlsZXNldEltcGwgPSBUaWxlc2V0SW1wbDtcblxuXG4vKioqLyB9KVxuXG4vKioqKioqLyBcdH0pO1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuLyoqKioqKi8gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG4vKioqKioqLyBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4vKioqKioqLyBcdFx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG4vKioqKioqLyBcdFx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG4vKioqKioqLyBcdFx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdFx0fVxuLyoqKioqKi8gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4vKioqKioqLyBcdFx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG4vKioqKioqLyBcdFx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge31cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cbi8qKioqKiovIFx0XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xudmFyIF9fd2VicGFja19leHBvcnRzX18gPSB7fTtcbi8vIFRoaXMgZW50cnkgbmVlZCB0byBiZSB3cmFwcGVkIGluIGFuIElJRkUgYmVjYXVzZSBpdCBuZWVkIHRvIGJlIGlzb2xhdGVkIGFnYWluc3Qgb3RoZXIgbW9kdWxlcyBpbiB0aGUgY2h1bmsuXG4oKCkgPT4ge1xudmFyIGV4cG9ydHMgPSBfX3dlYnBhY2tfZXhwb3J0c19fO1xuLyohKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL3NyYy9pbmRleC50cyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKi9cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCAoeyB2YWx1ZTogdHJ1ZSB9KSk7XG5leHBvcnRzLnN0YXJ0R2FtZSA9IHZvaWQgMDtcbnZhciBHdXRlXzEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL0d1dGUgKi8gXCIuL3NyYy9HdXRlLnRzXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwic3RhcnRHYW1lXCIsICh7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gR3V0ZV8xLnN0YXJ0R2FtZTsgfSB9KSk7XG5cbn0pKCk7XG5cbi8qKioqKiovIFx0cmV0dXJuIF9fd2VicGFja19leHBvcnRzX187XG4vKioqKioqLyB9KSgpXG47XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkluZGxZbkJoWTJzNkx5OW5kWFJsTDNkbFluQmhZMnN2ZFc1cGRtVnljMkZzVFc5a2RXeGxSR1ZtYVc1cGRHbHZiaUlzSW5kbFluQmhZMnM2THk5bmRYUmxMeTR2YzNKakwwZDFkR1V1ZEhNaUxDSjNaV0p3WVdOck9pOHZaM1YwWlM4dUwzTnlZeTlwYlhCc0wwSnBkRzFoY0VsdGNHd3VkSE1pTENKM1pXSndZV05yT2k4dlozVjBaUzh1TDNOeVl5OXBiWEJzTDBkeVlYQm9hV056U1cxd2JDNTBjeUlzSW5kbFluQmhZMnM2THk5bmRYUmxMeTR2YzNKakwybHRjR3d2Vkdsc1pYTmxkRWx0Y0d3dWRITWlMQ0ozWldKd1lXTnJPaTh2WjNWMFpTOTNaV0p3WVdOckwySnZiM1J6ZEhKaGNDSXNJbmRsWW5CaFkyczZMeTluZFhSbEx5NHZjM0pqTDJsdVpHVjRMblJ6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUpCUVVGQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFTkJRVU03UVVGRFJDeFBPenM3T3pzN096czdPMEZEVm1FN1FVRkRZaXc0UTBGQk5rTXNRMEZCUXl4alFVRmpMRVZCUVVNN1FVRkROMFFzYVVKQlFXbENPMEZCUTJwQ0xHMUNRVUZ0UWl4dFFrRkJUeXhEUVVGRExHMUVRVUZ0UWp0QlFVTTVReXh4UWtGQmNVSXNiVUpCUVU4c1EwRkJReXgxUkVGQmNVSTdRVUZEYkVRc2IwSkJRVzlDTEcxQ1FVRlBMRU5CUVVNc2NVUkJRVzlDTzBGQlEyaEVPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzYVVKQlFXbENPMEZCUTJwQ08wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc05rTkJRVFpETEdkQ1FVRm5RanRCUVVNM1JEdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRFJDUVVFMFFpeFJRVUZSTzBGQlEzQkRPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc05FSkJRVFJDTEZGQlFWRTdRVUZEY0VNN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hUUVVGVE8wRkJRMVE3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVTBGQlV6dEJRVU5VTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1UwRkJVenRCUVVOVU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNVMEZCVXp0QlFVTlVPMEZCUTBFN1FVRkRRVHRCUVVOQkxGTkJRVk03UVVGRFZEdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1UwRkJVenRCUVVOVU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEVOQlFVTTdPenM3T3pzN096czdPMEZETlVoWk8wRkJRMklzT0VOQlFUWkRMRU5CUVVNc1kwRkJZeXhGUVVGRE8wRkJRemRFTEd0Q1FVRnJRanRCUVVOc1FqdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeERRVUZETzBGQlEwUXNhMEpCUVd0Q096czdPenM3T3pzN096dEJRM1JDVER0QlFVTmlMRGhEUVVFMlF5eERRVUZETEdOQlFXTXNSVUZCUXp0QlFVTTNSQ3h2UWtGQmIwSTdRVUZEY0VJN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeHBSRUZCYVVRc1pVRkJaVHRCUVVOb1JUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeERRVUZETzBGQlEwUXNiMEpCUVc5Q096czdPenM3T3pzN096dEJRek5DVUR0QlFVTmlMRGhEUVVFMlF5eERRVUZETEdOQlFXTXNSVUZCUXp0QlFVTTNSQ3h0UWtGQmJVSTdRVUZEYmtJN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFTkJRVU03UVVGRFJEdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc01rSkJRVEpDTEZkQlFWYzdRVUZEZEVNc0swSkJRU3RDTEc5Q1FVRnZRanRCUVVOdVJEdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hEUVVGRE8wRkJRMFFzYlVKQlFXMUNPenM3T3pzN08xVkRMME51UWp0VlFVTkJPenRWUVVWQk8xVkJRMEU3VlVGRFFUdFZRVU5CTzFWQlEwRTdWVUZEUVR0VlFVTkJPMVZCUTBFN1ZVRkRRVHRWUVVOQk8xVkJRMEU3VlVGRFFUdFZRVU5CT3p0VlFVVkJPMVZCUTBFN08xVkJSVUU3VlVGRFFUdFZRVU5CT3pzN096czdPenM3TzBGRGRFSmhPMEZCUTJJc09FTkJRVFpETEVOQlFVTXNZMEZCWXl4RlFVRkRPMEZCUXpkRUxHbENRVUZwUWp0QlFVTnFRaXhoUVVGaExHMUNRVUZQTEVOQlFVTXNOa0pCUVZFN1FVRkROMElzTmtOQlFUUkRMRU5CUVVNc2NVTkJRWEZETEhsQ1FVRjVRaXhGUVVGRkxFVkJRVVVzUlVGQlF5SXNJbVpwYkdVaU9pSnBibVJsZUM1cWN5SXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJaWhtZFc1amRHbHZiaUIzWldKd1lXTnJWVzVwZG1WeWMyRnNUVzlrZFd4bFJHVm1hVzVwZEdsdmJpaHliMjkwTENCbVlXTjBiM0o1S1NCN1hHNWNkR2xtS0hSNWNHVnZaaUJsZUhCdmNuUnpJRDA5UFNBbmIySnFaV04wSnlBbUppQjBlWEJsYjJZZ2JXOWtkV3hsSUQwOVBTQW5iMkpxWldOMEp5bGNibHgwWEhSdGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdaaFkzUnZjbmtvS1R0Y2JseDBaV3h6WlNCcFppaDBlWEJsYjJZZ1pHVm1hVzVsSUQwOVBTQW5ablZ1WTNScGIyNG5JQ1ltSUdSbFptbHVaUzVoYldRcFhHNWNkRngwWkdWbWFXNWxLRnRkTENCbVlXTjBiM0o1S1R0Y2JseDBaV3h6WlNCcFppaDBlWEJsYjJZZ1pYaHdiM0owY3lBOVBUMGdKMjlpYW1WamRDY3BYRzVjZEZ4MFpYaHdiM0owYzF0Y0ltZDFkR1ZjSWwwZ1BTQm1ZV04wYjNKNUtDazdYRzVjZEdWc2MyVmNibHgwWEhSeWIyOTBXMXdpWjNWMFpWd2lYU0E5SUdaaFkzUnZjbmtvS1R0Y2JuMHBLSE5sYkdZc0lHWjFibU4wYVc5dUtDa2dlMXh1Y21WMGRYSnVJQ0lzSWx3aWRYTmxJSE4wY21samRGd2lPMXh1VDJKcVpXTjBMbVJsWm1sdVpWQnliM0JsY25SNUtHVjRjRzl5ZEhNc0lGd2lYMTlsYzAxdlpIVnNaVndpTENCN0lIWmhiSFZsT2lCMGNuVmxJSDBwTzF4dVpYaHdiM0owY3k1emRHRnlkRWRoYldVZ1BTQjJiMmxrSURBN1hHNTJZWElnUW1sMGJXRndTVzF3YkY4eElEMGdjbVZ4ZFdseVpTaGNJaTR2YVcxd2JDOUNhWFJ0WVhCSmJYQnNYQ0lwTzF4dWRtRnlJRWR5WVhCb2FXTnpTVzF3YkY4eElEMGdjbVZ4ZFdseVpTaGNJaTR2YVcxd2JDOUhjbUZ3YUdsamMwbHRjR3hjSWlrN1hHNTJZWElnVkdsc1pYTmxkRWx0Y0d4Zk1TQTlJSEpsY1hWcGNtVW9YQ0l1TDJsdGNHd3ZWR2xzWlhObGRFbHRjR3hjSWlrN1hHNTJZWElnUjBGTlJWOU1UMDlRTzF4dVpuVnVZM1JwYjI0Z2MzUmhjblJIWVcxbEtHZGhiV1VwSUh0Y2JpQWdJQ0JIUVUxRlgweFBUMUFnUFNCdVpYY2dSMkZ0WlV4dmIzQW9LUzV6ZEdGeWRDaG5ZVzFsS1R0Y2JuMWNibVY0Y0c5eWRITXVjM1JoY25SSFlXMWxJRDBnYzNSaGNuUkhZVzFsTzF4dWRtRnlJRWRoYldWTWIyOXdJRDBnTHlvcUlFQmpiR0Z6Y3lBcUx5QW9ablZ1WTNScGIyNGdLQ2tnZTF4dUlDQWdJR1oxYm1OMGFXOXVJRWRoYldWTWIyOXdLQ2tnZTF4dUlDQWdJQ0FnSUNCMGFHbHpMbkpsYzI5MWNtTmxjeUE5SUZ0ZE8xeHVJQ0FnSUNBZ0lDQjBhR2x6TG14aGMzUkdjbUZ0WlNBOUlEQTdYRzRnSUNBZ0lDQWdJSFJvYVhNdWFXNXBkR1ZrSUQwZ1ptRnNjMlU3WEc0Z0lDQWdmVnh1SUNBZ0lFZGhiV1ZNYjI5d0xuQnliM1J2ZEhsd1pTNWhiR3hTWlhOdmRYSmpaWE5NYjJGa1pXUWdQU0JtZFc1amRHbHZiaUFvS1NCN1hHNGdJQ0FnSUNBZ0lHWnZjaUFvZG1GeUlGOXBJRDBnTUN3Z1gyRWdQU0IwYUdsekxuSmxjMjkxY21ObGN6c2dYMmtnUENCZllTNXNaVzVuZEdnN0lGOXBLeXNwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCeVpYTnZkWEpqWlNBOUlGOWhXMTlwWFR0Y2JpQWdJQ0FnSUNBZ0lDQWdJR2xtSUNnaGNtVnpiM1Z5WTJVdWJHOWhaR1ZrS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUdaaGJITmxPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQjBjblZsTzF4dUlDQWdJSDA3WEc0Z0lDQWdSMkZ0WlV4dmIzQXVjSEp2ZEc5MGVYQmxMbWx1YVhSU1pYTnZkWEpqWlhOUGJrWnBjbk4wUTJ4cFkyc2dQU0JtZFc1amRHbHZiaUFvS1NCN1hHNGdJQ0FnSUNBZ0lHbG1JQ2doZEdocGN5NXBibWwwWldRcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhSb2FYTXVhVzVwZEdWa0lEMGdkSEoxWlR0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUgwN1hHNGdJQ0FnUjJGdFpVeHZiM0F1Y0hKdmRHOTBlWEJsTG0xdmRYTmxSRzkzYmtoaGJtUnNaWElnUFNCbWRXNWpkR2x2YmlBb2VDd2dlU3dnYVdRcElIdGNiaUFnSUNBZ0lDQWdhV1lnS0dsa0lEMDlQU0IyYjJsa0lEQXBJSHNnYVdRZ1BTQXdPeUI5WEc0Z0lDQWdJQ0FnSUhSb2FYTXVhVzVwZEZKbGMyOTFjbU5sYzA5dVJtbHljM1JEYkdsamF5Z3BPMXh1SUNBZ0lDQWdJQ0IyWVhJZ1kyRnVkbUZ6SUQwZ2RHaHBjeTVuY21Gd2FHbGpjeTVqWVc1MllYTTdYRzRnSUNBZ0lDQWdJR05oYm5aaGN5NW1iMk4xY3lncE8xeHVJQ0FnSUNBZ0lDQjJZWElnZDJsa2RHZ2dQU0JqWVc1MllYTXVZMnhwWlc1MFYybGtkR2c3WEc0Z0lDQWdJQ0FnSUhaaGNpQm9aV2xuYUhRZ1BTQmpZVzUyWVhNdVkyeHBaVzUwU0dWcFoyaDBPMXh1SUNBZ0lDQWdJQ0I0SUQwZ1RXRjBhQzVtYkc5dmNpZ29lQ0F2SUhkcFpIUm9LU0FxSUdOaGJuWmhjeTUzYVdSMGFDazdYRzRnSUNBZ0lDQWdJSGtnUFNCTllYUm9MbVpzYjI5eUtDaDVJQzhnYUdWcFoyaDBLU0FxSUdOaGJuWmhjeTVvWldsbmFIUXBPMXh1SUNBZ0lDQWdJQ0IwYUdsekxtZGhiV1V1YjI1TmIzVnpaVVJ2ZDI0b2RHaHBjeXdnZUN3Z2VTazdYRzRnSUNBZ2ZUdGNiaUFnSUNCSFlXMWxURzl2Y0M1d2NtOTBiM1I1Y0dVdWJXOTFjMlZWY0VoaGJtUnNaWElnUFNCbWRXNWpkR2x2YmlBb2VDd2dlU3dnYVdRcElIdGNiaUFnSUNBZ0lDQWdhV1lnS0dsa0lEMDlQU0IyYjJsa0lEQXBJSHNnYVdRZ1BTQXdPeUI5WEc0Z0lDQWdJQ0FnSUhSb2FYTXVhVzVwZEZKbGMyOTFjbU5sYzA5dVJtbHljM1JEYkdsamF5Z3BPMXh1SUNBZ0lDQWdJQ0IyWVhJZ1kyRnVkbUZ6SUQwZ2RHaHBjeTVuY21Gd2FHbGpjeTVqWVc1MllYTTdYRzRnSUNBZ0lDQWdJSFpoY2lCM2FXUjBhQ0E5SUdOaGJuWmhjeTVqYkdsbGJuUlhhV1IwYUR0Y2JpQWdJQ0FnSUNBZ2RtRnlJR2hsYVdkb2RDQTlJR05oYm5aaGN5NWpiR2xsYm5SSVpXbG5hSFE3WEc0Z0lDQWdJQ0FnSUhnZ1BTQk5ZWFJvTG1ac2IyOXlLQ2g0SUM4Z2QybGtkR2dwSUNvZ1kyRnVkbUZ6TG5kcFpIUm9LVHRjYmlBZ0lDQWdJQ0FnZVNBOUlFMWhkR2d1Wm14dmIzSW9LSGtnTHlCb1pXbG5hSFFwSUNvZ1kyRnVkbUZ6TG1obGFXZG9kQ2s3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVaMkZ0WlM1dmJrMXZkWE5sVlhBb2RHaHBjeXdnZUN3Z2VTazdYRzRnSUNBZ2ZUdGNiaUFnSUNCSFlXMWxURzl2Y0M1d2NtOTBiM1I1Y0dVdWEyVjVSRzkzYmtoaGJtUnNaWElnUFNCbWRXNWpkR2x2YmlBb2EyVjVLU0I3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVhVzVwZEZKbGMyOTFjbU5sYzA5dVJtbHljM1JEYkdsamF5Z3BPMXh1SUNBZ0lDQWdJQ0IwYUdsekxtZGhiV1V1YjI1TFpYbEViM2R1S0hSb2FYTXNJR3RsZVNrN1hHNGdJQ0FnZlR0Y2JpQWdJQ0JIWVcxbFRHOXZjQzV3Y205MGIzUjVjR1V1YTJWNVZYQklZVzVrYkdWeUlEMGdablZ1WTNScGIyNGdLR3RsZVNrZ2UxeHVJQ0FnSUNBZ0lDQjBhR2x6TG1kaGJXVXViMjVMWlhsVmNDaDBhR2x6TENCclpYa3BPMXh1SUNBZ0lIMDdYRzRnSUNBZ1IyRnRaVXh2YjNBdWNISnZkRzkwZVhCbExuTjBZWEowSUQwZ1puVnVZM1JwYjI0Z0tHZGhiV1VwSUh0Y2JpQWdJQ0FnSUNBZ2RtRnlJRjkwYUdseklEMGdkR2hwY3p0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTVuWVcxbElEMGdaMkZ0WlR0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTVuY21Gd2FHbGpjeUE5SUc1bGR5QkhjbUZ3YUdsamMwbHRjR3hmTVM1SGNtRndhR2xqYzBsdGNHd29LVHRjYmlBZ0lDQWdJQ0FnZEdocGN5NW5jbUZ3YUdsamN5NWpZVzUyWVhNdVlXUmtSWFpsYm5STWFYTjBaVzVsY2loY0ltMXZkWE5sWkc5M2Jsd2lMQ0JtZFc1amRHbHZiaUFvWlhabGJuUXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIUnllU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWDNSb2FYTXViVzkxYzJWRWIzZHVTR0Z1Wkd4bGNpaGxkbVZ1ZEM1dlptWnpaWFJZTENCbGRtVnVkQzV2Wm1aelpYUlpLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JsZG1WdWRDNXdjbVYyWlc1MFJHVm1ZWFZzZENncE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHVjJaVzUwTG5OMGIzQlFjbTl3WVdkaGRHbHZiaWdwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0FnSUNBZ1kyRjBZMmdnS0dVcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmpiMjV6YjJ4bExteHZaeWhsS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnZlNrN1hHNGdJQ0FnSUNBZ0lIUm9hWE11WjNKaGNHaHBZM011WTJGdWRtRnpMbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSW9YQ0p0YjNWelpYVndYQ0lzSUdaMWJtTjBhVzl1SUNobGRtVnVkQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdkSEo1SUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCZmRHaHBjeTV0YjNWelpWVndTR0Z1Wkd4bGNpaGxkbVZ1ZEM1dlptWnpaWFJZTENCbGRtVnVkQzV2Wm1aelpYUlpLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JsZG1WdWRDNXdjbVYyWlc1MFJHVm1ZWFZzZENncE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHVjJaVzUwTG5OMGIzQlFjbTl3WVdkaGRHbHZiaWdwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0FnSUNBZ1kyRjBZMmdnS0dVcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmpiMjV6YjJ4bExteHZaeWhsS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnZlNrN1hHNGdJQ0FnSUNBZ0lIZHBibVJ2ZHk1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S0Z3aWEyVjVaRzkzYmx3aUxDQm1kVzVqZEdsdmJpQW9aWFpsYm5RcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUY5MGFHbHpMbXRsZVVSdmQyNUlZVzVrYkdWeUtHVjJaVzUwTG10bGVTazdYRzRnSUNBZ0lDQWdJQ0FnSUNCbGRtVnVkQzV3Y21WMlpXNTBSR1ZtWVhWc2RDZ3BPMXh1SUNBZ0lDQWdJQ0FnSUNBZ1pYWmxiblF1YzNSdmNGQnliM0JoWjJGMGFXOXVLQ2s3WEc0Z0lDQWdJQ0FnSUgwcE8xeHVJQ0FnSUNBZ0lDQjNhVzVrYjNjdVlXUmtSWFpsYm5STWFYTjBaVzVsY2loY0ltdGxlWFZ3WENJc0lHWjFibU4wYVc5dUlDaGxkbVZ1ZENrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnWDNSb2FYTXVhMlY1VlhCSVlXNWtiR1Z5S0dWMlpXNTBMbXRsZVNrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JsZG1WdWRDNXdjbVYyWlc1MFJHVm1ZWFZzZENncE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnWlhabGJuUXVjM1J2Y0ZCeWIzQmhaMkYwYVc5dUtDazdYRzRnSUNBZ0lDQWdJSDBwTzF4dUlDQWdJQ0FnSUNCbllXMWxMbWx1YVhRb2RHaHBjeWs3WEc0Z0lDQWdJQ0FnSUhKbGNYVmxjM1JCYm1sdFlYUnBiMjVHY21GdFpTaG1kVzVqZEdsdmJpQW9LU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQmZkR2hwY3k1c2IyOXdLQ2s3WEc0Z0lDQWdJQ0FnSUgwcE8xeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z2RHaHBjenRjYmlBZ0lDQjlPMXh1SUNBZ0lFZGhiV1ZNYjI5d0xuQnliM1J2ZEhsd1pTNXNiMjl3SUQwZ1puVnVZM1JwYjI0Z0tDa2dlMXh1SUNBZ0lDQWdJQ0IyWVhJZ1gzUm9hWE1nUFNCMGFHbHpPMXh1SUNBZ0lDQWdJQ0IyWVhJZ2JtOTNJRDBnYm1WM0lFUmhkR1VvS1M1blpYUlVhVzFsS0NrN1hHNGdJQ0FnSUNBZ0lIWmhjaUJrWld4MFlTQTlJREE3WEc0Z0lDQWdJQ0FnSUdsbUlDaDBhR2x6TG14aGMzUkdjbUZ0WlNBaFBUMGdNQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdaR1ZzZEdFZ1BTQnViM2NnTFNCMGFHbHpMbXhoYzNSR2NtRnRaVHRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNCMGFHbHpMbXhoYzNSR2NtRnRaU0E5SUc1dmR6dGNiaUFnSUNBZ0lDQWdkR2hwY3k1bllXMWxMblZ3WkdGMFpTaDBhR2x6TENCa1pXeDBZU2s3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVaMkZ0WlM1eVpXNWtaWElvZEdocGN5d2dkR2hwY3k1bmNtRndhR2xqY3lrN1hHNGdJQ0FnSUNBZ0lISmxjWFZsYzNSQmJtbHRZWFJwYjI1R2NtRnRaU2htZFc1amRHbHZiaUFvS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JmZEdocGN5NXNiMjl3S0NrN1hHNGdJQ0FnSUNBZ0lIMHBPMXh1SUNBZ0lIMDdYRzRnSUNBZ1IyRnRaVXh2YjNBdWNISnZkRzkwZVhCbExteHZZV1JDYVhSdFlYQWdQU0JtZFc1amRHbHZiaUFvZFhKc0tTQjdYRzRnSUNBZ0lDQWdJSFpoY2lCaWFYUnRZWEFnUFNCdVpYY2dRbWwwYldGd1NXMXdiRjh4TGtKcGRHMWhjRWx0Y0d3b2RYSnNLVHRjYmlBZ0lDQWdJQ0FnZEdocGN5NXlaWE52ZFhKalpYTXVjSFZ6YUNoaWFYUnRZWEFwTzF4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnWW1sMGJXRndPMXh1SUNBZ0lIMDdYRzRnSUNBZ1IyRnRaVXh2YjNBdWNISnZkRzkwZVhCbExteHZZV1JVYVd4bGMyVjBJRDBnWm5WdVkzUnBiMjRnS0hWeWJDd2dkR2xzWlZkcFpIUm9MQ0IwYVd4bFNHVnBaMmgwS1NCN1hHNGdJQ0FnSUNBZ0lIWmhjaUIwYVd4bGMyVjBJRDBnYm1WM0lGUnBiR1Z6WlhSSmJYQnNYekV1Vkdsc1pYTmxkRWx0Y0d3b2RYSnNMQ0IwYVd4bFYybGtkR2dzSUhScGJHVklaV2xuYUhRcE8xeHVJQ0FnSUNBZ0lDQjBhR2x6TG5KbGMyOTFjbU5sY3k1d2RYTm9LSFJwYkdWelpYUXBPMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdkR2xzWlhObGREdGNiaUFnSUNCOU8xeHVJQ0FnSUhKbGRIVnliaUJIWVcxbFRHOXZjRHRjYm4wb0tTazdYRzRpTENKY0luVnpaU0J6ZEhKcFkzUmNJanRjYms5aWFtVmpkQzVrWldacGJtVlFjbTl3WlhKMGVTaGxlSEJ2Y25SekxDQmNJbDlmWlhOTmIyUjFiR1ZjSWl3Z2V5QjJZV3gxWlRvZ2RISjFaU0I5S1R0Y2JtVjRjRzl5ZEhNdVFtbDBiV0Z3U1cxd2JDQTlJSFp2YVdRZ01EdGNiblpoY2lCQ2FYUnRZWEJKYlhCc0lEMGdMeW9xSUVCamJHRnpjeUFxTHlBb1puVnVZM1JwYjI0Z0tDa2dlMXh1SUNBZ0lHWjFibU4wYVc5dUlFSnBkRzFoY0VsdGNHd29kWEpzS1NCN1hHNGdJQ0FnSUNBZ0lIWmhjaUJmZEdocGN5QTlJSFJvYVhNN1hHNGdJQ0FnSUNBZ0lIUm9hWE11ZDJsa2RHZ2dQU0F3TzF4dUlDQWdJQ0FnSUNCMGFHbHpMbWhsYVdkb2RDQTlJREE3WEc0Z0lDQWdJQ0FnSUhSb2FYTXViRzloWkdWa0lEMGdabUZzYzJVN1hHNGdJQ0FnSUNBZ0lIUm9hWE11YVcxaFoyVWdQU0J1WlhjZ1NXMWhaMlVvS1R0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTVwYldGblpTNXZibXh2WVdRZ1BTQm1kVzVqZEdsdmJpQW9LU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQmZkR2hwY3k1M2FXUjBhQ0E5SUY5MGFHbHpMbWx0WVdkbExuZHBaSFJvTzF4dUlDQWdJQ0FnSUNBZ0lDQWdYM1JvYVhNdWFHVnBaMmgwSUQwZ1gzUm9hWE11YVcxaFoyVXVhR1ZwWjJoME8xeHVJQ0FnSUNBZ0lDQWdJQ0FnWDNSb2FYTXViRzloWkdWa0lEMGdkSEoxWlR0Y2JpQWdJQ0FnSUNBZ2ZUdGNiaUFnSUNBZ0lDQWdkR2hwY3k1cGJXRm5aUzV6Y21NZ1BTQjFjbXc3WEc0Z0lDQWdmVnh1SUNBZ0lFSnBkRzFoY0VsdGNHd3VjSEp2ZEc5MGVYQmxMbWRsZEVSeVlYZGhZbXhsSUQwZ1puVnVZM1JwYjI0Z0tDa2dlMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdkR2hwY3k1cGJXRm5aVHRjYmlBZ0lDQjlPMXh1SUNBZ0lISmxkSFZ5YmlCQ2FYUnRZWEJKYlhCc08xeHVmU2dwS1R0Y2JtVjRjRzl5ZEhNdVFtbDBiV0Z3U1cxd2JDQTlJRUpwZEcxaGNFbHRjR3c3WEc0aUxDSmNJblZ6WlNCemRISnBZM1JjSWp0Y2JrOWlhbVZqZEM1a1pXWnBibVZRY205d1pYSjBlU2hsZUhCdmNuUnpMQ0JjSWw5ZlpYTk5iMlIxYkdWY0lpd2dleUIyWVd4MVpUb2dkSEoxWlNCOUtUdGNibVY0Y0c5eWRITXVSM0poY0docFkzTkpiWEJzSUQwZ2RtOXBaQ0F3TzF4dWRtRnlJR2x6Um1seVpXWnZlQ0E5SUhSNWNHVnZaaUJKYm5OMFlXeHNWSEpwWjJkbGNpQWhQVDBnSjNWdVpHVm1hVzVsWkNjN1hHNTJZWElnUjNKaGNHaHBZM05KYlhCc0lEMGdMeW9xSUVCamJHRnpjeUFxTHlBb1puVnVZM1JwYjI0Z0tDa2dlMXh1SUNBZ0lHWjFibU4wYVc5dUlFZHlZWEJvYVdOelNXMXdiQ2dwSUh0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTVqWVc1MllYTWdQU0JrYjJOMWJXVnVkQzVuWlhSRmJHVnRaVzUwUW5sSlpDaGNJbWRoYldWallXNTJZWE5jSWlrN1hHNGdJQ0FnSUNBZ0lIUm9hWE11WTNSNElEMGdkR2hwY3k1allXNTJZWE11WjJWMFEyOXVkR1Y0ZENoY0lqSmtYQ0lzSUhzZ1lXeHdhR0U2SUdaaGJITmxJSDBwTzF4dUlDQWdJQ0FnSUNCMGFHbHpMbU4wZUM1M1pXSnJhWFJKYldGblpWTnRiMjkwYUdsdVowVnVZV0pzWldRZ1BTQm1ZV3h6WlR0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTVqZEhndWJXOTZTVzFoWjJWVGJXOXZkR2hwYm1kRmJtRmliR1ZrSUQwZ1ptRnNjMlU3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVZM1I0TG1sdFlXZGxVMjF2YjNSb2FXNW5SVzVoWW14bFpDQTlJR1poYkhObE8xeHVJQ0FnSUNBZ0lDQnBaaUFvYVhOR2FYSmxabTk0S1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0IwYUdsekxtTmhiblpoY3k1emRIbHNaUzVwYldGblpWSmxibVJsY21sdVp5QTlJRndpWTNKcGMzQXRaV1JuWlhOY0lqdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0JsYkhObElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhSb2FYTXVZMkZ1ZG1GekxuTjBlV3hsTG1sdFlXZGxVbVZ1WkdWeWFXNW5JRDBnWENKd2FYaGxiR0YwWldSY0lqdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lIMWNiaUFnSUNCSGNtRndhR2xqYzBsdGNHd3VjSEp2ZEc5MGVYQmxMbVpwYkd4U1pXTjBJRDBnWm5WdVkzUnBiMjRnS0hnc0lIa3NJSGRwWkhSb0xDQm9aV2xuYUhRc0lHTnZiQ2tnZTF4dUlDQWdJQ0FnSUNCMGFHbHpMbU4wZUM1bWFXeHNVM1I1YkdVZ1BTQmpiMnc3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVZM1I0TG1acGJHeFNaV04wS0hnc0lIa3NJSGRwWkhSb0xDQm9aV2xuYUhRcE8xeHVJQ0FnSUgwN1hHNGdJQ0FnUjNKaGNHaHBZM05KYlhCc0xuQnliM1J2ZEhsd1pTNWtjbUYzUW1sMGJXRndJRDBnWm5WdVkzUnBiMjRnS0hnc0lIa3NJR0pwZEcxaGNDa2dlMXh1SUNBZ0lDQWdJQ0IwYUdsekxtTjBlQzVrY21GM1NXMWhaMlVvWW1sMGJXRndMbWRsZEVSeVlYZGhZbXhsS0Nrc0lIZ3NJSGtwTzF4dUlDQWdJSDA3WEc0Z0lDQWdjbVYwZFhKdUlFZHlZWEJvYVdOelNXMXdiRHRjYm4wb0tTazdYRzVsZUhCdmNuUnpMa2R5WVhCb2FXTnpTVzF3YkNBOUlFZHlZWEJvYVdOelNXMXdiRHRjYmlJc0lsd2lkWE5sSUhOMGNtbGpkRndpTzF4dVQySnFaV04wTG1SbFptbHVaVkJ5YjNCbGNuUjVLR1Y0Y0c5eWRITXNJRndpWDE5bGMwMXZaSFZzWlZ3aUxDQjdJSFpoYkhWbE9pQjBjblZsSUgwcE8xeHVaWGh3YjNKMGN5NVVhV3hsYzJWMFNXMXdiQ0E5SUhadmFXUWdNRHRjYm5aaGNpQlVhV3hsSUQwZ0x5b3FJRUJqYkdGemN5QXFMeUFvWm5WdVkzUnBiMjRnS0NrZ2UxeHVJQ0FnSUdaMWJtTjBhVzl1SUZScGJHVW9ZMkZ1ZG1GektTQjdYRzRnSUNBZ0lDQWdJSFJvYVhNdVkyRnVkbUZ6SUQwZ1kyRnVkbUZ6TzF4dUlDQWdJQ0FnSUNCMGFHbHpMbmRwWkhSb0lEMGdZMkZ1ZG1GekxuZHBaSFJvTzF4dUlDQWdJQ0FnSUNCMGFHbHpMbWhsYVdkb2RDQTlJR05oYm5aaGN5NW9aV2xuYUhRN1hHNGdJQ0FnSUNBZ0lIUm9hWE11Ykc5aFpHVmtJRDBnZEhKMVpUdGNiaUFnSUNCOVhHNGdJQ0FnVkdsc1pTNXdjbTkwYjNSNWNHVXVaMlYwUkhKaGQyRmliR1VnUFNCbWRXNWpkR2x2YmlBb0tTQjdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQjBhR2x6TG1OaGJuWmhjenRjYmlBZ0lDQjlPMXh1SUNBZ0lISmxkSFZ5YmlCVWFXeGxPMXh1ZlNncEtUdGNiblpoY2lCVWFXeGxjMlYwU1cxd2JDQTlJQzhxS2lCQVkyeGhjM01nS2k4Z0tHWjFibU4wYVc5dUlDZ3BJSHRjYmlBZ0lDQm1kVzVqZEdsdmJpQlVhV3hsYzJWMFNXMXdiQ2gxY213c0lIUnBiR1ZYYVdSMGFDd2dkR2xzWlVobGFXZG9kQ2tnZTF4dUlDQWdJQ0FnSUNCMllYSWdYM1JvYVhNZ1BTQjBhR2x6TzF4dUlDQWdJQ0FnSUNCMGFHbHpMbXh2WVdSbFpDQTlJR1poYkhObE8xeHVJQ0FnSUNBZ0lDQjBhR2x6TG1KcGRHMWhjSE1nUFNCYlhUdGNiaUFnSUNBZ0lDQWdkR2hwY3k1elkyRnViR2x1WlNBOUlEQTdYRzRnSUNBZ0lDQWdJSFJvYVhNdWRHbHNaVmRwWkhSb0lEMGdkR2xzWlZkcFpIUm9PMXh1SUNBZ0lDQWdJQ0IwYUdsekxuUnBiR1ZJWldsbmFIUWdQU0IwYVd4bFNHVnBaMmgwTzF4dUlDQWdJQ0FnSUNCMGFHbHpMbWx0WVdkbElEMGdibVYzSUVsdFlXZGxLQ2s3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVhVzFoWjJVdWIyNXNiMkZrSUQwZ1puVnVZM1JwYjI0Z0tDa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJRjloTzF4dUlDQWdJQ0FnSUNBZ0lDQWdYM1JvYVhNdWMyTmhibXhwYm1VZ1BTQk5ZWFJvTG1ac2IyOXlLRjkwYUdsekxtbHRZV2RsTG5kcFpIUm9JQzhnZEdsc1pWZHBaSFJvS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCa1pYQjBhQ0E5SUUxaGRHZ3VabXh2YjNJb1gzUm9hWE11YVcxaFoyVXVhR1ZwWjJoMElDOGdkR2xzWlVobGFXZG9kQ2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQXZMeUJqZFhRZ2RHaGxJR2x0WVdkbElHbHVkRzhnY0dsbFkyVnpYRzRnSUNBZ0lDQWdJQ0FnSUNCbWIzSWdLSFpoY2lCNUlEMGdNRHNnZVNBOElHUmxjSFJvT3lCNUt5c3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JtYjNJZ0tIWmhjaUI0SUQwZ01Ec2dlQ0E4SUY5MGFHbHpMbk5qWVc1c2FXNWxPeUI0S3lzcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZG1GeUlHTmhiblpoY3lBOUlHUnZZM1Z0Wlc1MExtTnlaV0YwWlVWc1pXMWxiblFvWENKallXNTJZWE5jSWlrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR05oYm5aaGN5NTNhV1IwYUNBOUlIUnBiR1ZYYVdSMGFEdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWTJGdWRtRnpMbWhsYVdkb2RDQTlJSFJwYkdWSVpXbG5hSFE3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDaGZZU0E5SUdOaGJuWmhjeTVuWlhSRGIyNTBaWGgwS0Z3aU1tUmNJaWtwSUQwOVBTQnVkV3hzSUh4OElGOWhJRDA5UFNCMmIybGtJREFnUHlCMmIybGtJREFnT2lCZllTNWtjbUYzU1cxaFoyVW9YM1JvYVhNdWFXMWhaMlVzSUMxNElDb2dkR2xzWlZkcFpIUm9MQ0F0ZVNBcUlIUnBiR1ZJWldsbmFIUXBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCZmRHaHBjeTVpYVhSdFlYQnpMbkIxYzJnb2JtVjNJRlJwYkdVb1kyRnVkbUZ6S1NrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lDQWdYM1JvYVhNdWJHOWhaR1ZrSUQwZ2RISjFaVHRjYmlBZ0lDQWdJQ0FnZlR0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTVwYldGblpTNXpjbU1nUFNCMWNtdzdYRzRnSUNBZ2ZWeHVJQ0FnSUZScGJHVnpaWFJKYlhCc0xuQnliM1J2ZEhsd1pTNW5aWFJVYVd4bElEMGdablZ1WTNScGIyNGdLSFJwYkdVcElIdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlIUm9hWE11WW1sMGJXRndjMXQwYVd4bFhUdGNiaUFnSUNCOU8xeHVJQ0FnSUhKbGRIVnliaUJVYVd4bGMyVjBTVzF3YkR0Y2JuMG9LU2s3WEc1bGVIQnZjblJ6TGxScGJHVnpaWFJKYlhCc0lEMGdWR2xzWlhObGRFbHRjR3c3WEc0aUxDSXZMeUJVYUdVZ2JXOWtkV3hsSUdOaFkyaGxYRzUyWVhJZ1gxOTNaV0p3WVdOclgyMXZaSFZzWlY5allXTm9aVjlmSUQwZ2UzMDdYRzVjYmk4dklGUm9aU0J5WlhGMWFYSmxJR1oxYm1OMGFXOXVYRzVtZFc1amRHbHZiaUJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmS0cxdlpIVnNaVWxrS1NCN1hHNWNkQzh2SUVOb1pXTnJJR2xtSUcxdlpIVnNaU0JwY3lCcGJpQmpZV05vWlZ4dVhIUjJZWElnWTJGamFHVmtUVzlrZFd4bElEMGdYMTkzWldKd1lXTnJYMjF2WkhWc1pWOWpZV05vWlY5ZlcyMXZaSFZzWlVsa1hUdGNibHgwYVdZZ0tHTmhZMmhsWkUxdlpIVnNaU0FoUFQwZ2RXNWtaV1pwYm1Wa0tTQjdYRzVjZEZ4MGNtVjBkWEp1SUdOaFkyaGxaRTF2WkhWc1pTNWxlSEJ2Y25Sek8xeHVYSFI5WEc1Y2RDOHZJRU55WldGMFpTQmhJRzVsZHlCdGIyUjFiR1VnS0dGdVpDQndkWFFnYVhRZ2FXNTBieUIwYUdVZ1kyRmphR1VwWEc1Y2RIWmhjaUJ0YjJSMWJHVWdQU0JmWDNkbFluQmhZMnRmYlc5a2RXeGxYMk5oWTJobFgxOWJiVzlrZFd4bFNXUmRJRDBnZTF4dVhIUmNkQzh2SUc1dklHMXZaSFZzWlM1cFpDQnVaV1ZrWldSY2JseDBYSFF2THlCdWJ5QnRiMlIxYkdVdWJHOWhaR1ZrSUc1bFpXUmxaRnh1WEhSY2RHVjRjRzl5ZEhNNklIdDlYRzVjZEgwN1hHNWNibHgwTHk4Z1JYaGxZM1YwWlNCMGFHVWdiVzlrZFd4bElHWjFibU4wYVc5dVhHNWNkRjlmZDJWaWNHRmphMTl0YjJSMWJHVnpYMTliYlc5a2RXeGxTV1JkS0cxdlpIVnNaU3dnYlc5a2RXeGxMbVY0Y0c5eWRITXNJRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMThwTzF4dVhHNWNkQzh2SUZKbGRIVnliaUIwYUdVZ1pYaHdiM0owY3lCdlppQjBhR1VnYlc5a2RXeGxYRzVjZEhKbGRIVnliaUJ0YjJSMWJHVXVaWGh3YjNKMGN6dGNibjFjYmx4dUlpd2lYQ0oxYzJVZ2MzUnlhV04wWENJN1hHNVBZbXBsWTNRdVpHVm1hVzVsVUhKdmNHVnlkSGtvWlhod2IzSjBjeXdnWENKZlgyVnpUVzlrZFd4bFhDSXNJSHNnZG1Gc2RXVTZJSFJ5ZFdVZ2ZTazdYRzVsZUhCdmNuUnpMbk4wWVhKMFIyRnRaU0E5SUhadmFXUWdNRHRjYm5aaGNpQkhkWFJsWHpFZ1BTQnlaWEYxYVhKbEtGd2lMaTlIZFhSbFhDSXBPMXh1VDJKcVpXTjBMbVJsWm1sdVpWQnliM0JsY25SNUtHVjRjRzl5ZEhNc0lGd2ljM1JoY25SSFlXMWxYQ0lzSUhzZ1pXNTFiV1Z5WVdKc1pUb2dkSEoxWlN3Z1oyVjBPaUJtZFc1amRHbHZiaUFvS1NCN0lISmxkSFZ5YmlCSGRYUmxYekV1YzNSaGNuUkhZVzFsT3lCOUlIMHBPMXh1SWwwc0luTnZkWEpqWlZKdmIzUWlPaUlpZlE9PSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBkaXN0XzEgPSByZXF1aXJlKFwiZ3V0ZS9kaXN0XCIpO1xudmFyIFRlc3RHYW1lXzEgPSByZXF1aXJlKFwiLi9UZXN0R2FtZVwiKTtcbmNvbnNvbGUubG9nKFwiU3RhcnRpbmcgVGVzdCBHYW1lXCIpO1xuZGlzdF8xLnN0YXJ0R2FtZShuZXcgVGVzdEdhbWVfMS5UZXN0R2FtZSgpKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=