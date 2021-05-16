/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/gute/dist/index.js":
/*!*****************************************!*\
  !*** ./node_modules/gute/dist/index.js ***!
  \*****************************************/
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
var SoundImpl_1 = __nested_webpack_require_608__(/*! ./impl/SoundImpl */ "./src/impl/SoundImpl.ts");
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
        if (!this.allResourcesLoaded()) {
            return;
        }
        if (!this.inited) {
            this.inited = true;
            for (var _i = 0, _a = this.resources; _i < _a.length; _i++) {
                var resource = _a[_i];
                resource.initOnFirstClick();
            }
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
    GameLoop.prototype.loadMusic = function (url) {
        var sound = new SoundImpl_1.SoundImpl(url, true);
        this.resources.push(sound);
        return sound;
    };
    GameLoop.prototype.loadSound = function (url) {
        var sound = new SoundImpl_1.SoundImpl(url, false);
        this.resources.push(sound);
        return sound;
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
    BitmapImpl.prototype.initOnFirstClick = function () {
    };
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

/***/ "./src/impl/SoundImpl.ts":
/*!*******************************!*\
  !*** ./src/impl/SoundImpl.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SoundImpl = void 0;
var AudioContext = window.AudioContext || window.webkitAudioContext;
var AUDIO_CONTEXT;
function handleVisibilityChange() {
    if (SoundImpl.CURRENT_MUSIC) {
        if (document.hidden) {
            SoundImpl.CURRENT_MUSIC.stop();
        }
        else {
            SoundImpl.CURRENT_MUSIC.play(SoundImpl.CURRENT_MUSIC.volume);
        }
    }
}
document.addEventListener("visibilitychange", handleVisibilityChange);
var SoundImpl = /** @class */ (function () {
    function SoundImpl(url, music) {
        var _this = this;
        this.loaded = false;
        this.volume = 1;
        this.music = false;
        this.url = url;
        this.music = music;
        var req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.responseType = "arraybuffer";
        req.onload = function (event) {
            var arrayBuffer = req.response;
            if (arrayBuffer) {
                _this.data = arrayBuffer;
                _this.loaded = true;
                _this.tryLoad();
            }
        };
        req.send(null);
    }
    SoundImpl.prototype.tryLoad = function () {
        var _this = this;
        if (AUDIO_CONTEXT && this.data) {
            AUDIO_CONTEXT.decodeAudioData(this.data, function (buffer) {
                _this.buffer = buffer;
                if (SoundImpl.CURRENT_MUSIC === _this) {
                    SoundImpl.CURRENT_MUSIC = null;
                    _this.play(_this.volume);
                }
            }, function (e) { console.log("Failed to load: " + _this.url); });
        }
    };
    SoundImpl.prototype.initOnFirstClick = function () {
        if (!AUDIO_CONTEXT) {
            AUDIO_CONTEXT = new AudioContext();
            AUDIO_CONTEXT.resume();
        }
        this.tryLoad();
    };
    SoundImpl.prototype.play = function (volume) {
        this.volume = volume;
        if (!this.buffer) {
            if (this.music) {
                SoundImpl.CURRENT_MUSIC = this;
            }
            return;
        }
        if (this.music) {
            if (SoundImpl.CURRENT_MUSIC !== this) {
                if (SoundImpl.CURRENT_MUSIC) {
                    SoundImpl.CURRENT_MUSIC.stop();
                }
                SoundImpl.CURRENT_MUSIC = this;
            }
            if (this.source) {
                return;
            }
        }
        this.source = AUDIO_CONTEXT.createBufferSource();
        this.source.buffer = this.buffer;
        this.gain = AUDIO_CONTEXT.createGain();
        this.source.connect(this.gain);
        this.gain.connect(AUDIO_CONTEXT.destination);
        if (this.music) {
            this.gain.gain.value = 0;
            this.source.loop = true;
        }
        this.source.start(0);
        if (this.music) {
            this.gain.gain.linearRampToValueAtTime(volume, AUDIO_CONTEXT.currentTime + 2);
        }
        else {
            this.gain.gain.value = volume;
        }
    };
    SoundImpl.prototype.stop = function () {
        if (this.source) {
            if (this.music) {
                this.gain.gain.linearRampToValueAtTime(0, AUDIO_CONTEXT.currentTime + 3);
                var tempSource_1 = this.source;
                setTimeout(function () {
                    tempSource_1.stop();
                }, 4000);
            }
            else {
                this.source.stop();
            }
            this.source = null;
        }
    };
    return SoundImpl;
}());
exports.SoundImpl = SoundImpl;


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
    Tile.prototype.initOnFirstClick = function () {
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
    TilesetImpl.prototype.initOnFirstClick = function () {
    };
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
/******/ 	function __nested_webpack_require_14002__(moduleId) {
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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_14002__);
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
var Gute_1 = __nested_webpack_require_14002__(/*! ./Gute */ "./src/Gute.ts");
Object.defineProperty(exports, "startGame", ({ enumerable: true, get: function () { return Gute_1.startGame; } }));

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ndXRlL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9ndXRlLy4vc3JjL0d1dGUudHMiLCJ3ZWJwYWNrOi8vZ3V0ZS8uL3NyYy9pbXBsL0JpdG1hcEltcGwudHMiLCJ3ZWJwYWNrOi8vZ3V0ZS8uL3NyYy9pbXBsL0dyYXBoaWNzSW1wbC50cyIsIndlYnBhY2s6Ly9ndXRlLy4vc3JjL2ltcGwvU291bmRJbXBsLnRzIiwid2VicGFjazovL2d1dGUvLi9zcmMvaW1wbC9UaWxlc2V0SW1wbC50cyIsIndlYnBhY2s6Ly9ndXRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2d1dGUvLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87Ozs7Ozs7Ozs7QUNWYTtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxpQkFBaUI7QUFDakIsbUJBQW1CLG1CQUFPLENBQUMsbURBQW1CO0FBQzlDLHFCQUFxQixtQkFBTyxDQUFDLHVEQUFxQjtBQUNsRCxrQkFBa0IsbUJBQU8sQ0FBQyxpREFBa0I7QUFDNUMsb0JBQW9CLG1CQUFPLENBQUMscURBQW9CO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLGdCQUFnQjtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCxnQkFBZ0I7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFFBQVE7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsUUFBUTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7OztBQzlJWTtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxrQkFBa0I7Ozs7Ozs7Ozs7O0FDeEJMO0FBQ2IsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCxlQUFlO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxvQkFBb0I7Ozs7Ozs7Ozs7O0FDM0JQO0FBQ2IsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsZ0JBQWdCLDZDQUE2QyxFQUFFO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsaUJBQWlCOzs7Ozs7Ozs7OztBQzdHSjtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixXQUFXO0FBQ3RDLCtCQUErQixvQkFBb0I7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxtQkFBbUI7Ozs7Ozs7VUNuRG5CO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7QUN0QmE7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QsaUJBQWlCO0FBQ2pCLGFBQWEsbUJBQU8sQ0FBQyw2QkFBUTtBQUM3Qiw2Q0FBNEMsQ0FBQyxxQ0FBcUMseUJBQXlCLEVBQUUsRUFBRSxFQUFDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiZ3V0ZVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJndXRlXCJdID0gZmFjdG9yeSgpO1xufSkoc2VsZiwgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnN0YXJ0R2FtZSA9IHZvaWQgMDtcbnZhciBCaXRtYXBJbXBsXzEgPSByZXF1aXJlKFwiLi9pbXBsL0JpdG1hcEltcGxcIik7XG52YXIgR3JhcGhpY3NJbXBsXzEgPSByZXF1aXJlKFwiLi9pbXBsL0dyYXBoaWNzSW1wbFwiKTtcbnZhciBTb3VuZEltcGxfMSA9IHJlcXVpcmUoXCIuL2ltcGwvU291bmRJbXBsXCIpO1xudmFyIFRpbGVzZXRJbXBsXzEgPSByZXF1aXJlKFwiLi9pbXBsL1RpbGVzZXRJbXBsXCIpO1xudmFyIEdBTUVfTE9PUDtcbmZ1bmN0aW9uIHN0YXJ0R2FtZShnYW1lKSB7XG4gICAgR0FNRV9MT09QID0gbmV3IEdhbWVMb29wKCkuc3RhcnQoZ2FtZSk7XG59XG5leHBvcnRzLnN0YXJ0R2FtZSA9IHN0YXJ0R2FtZTtcbnZhciBHYW1lTG9vcCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBHYW1lTG9vcCgpIHtcbiAgICAgICAgdGhpcy5yZXNvdXJjZXMgPSBbXTtcbiAgICAgICAgdGhpcy5sYXN0RnJhbWUgPSAwO1xuICAgICAgICB0aGlzLmluaXRlZCA9IGZhbHNlO1xuICAgIH1cbiAgICBHYW1lTG9vcC5wcm90b3R5cGUuYWxsUmVzb3VyY2VzTG9hZGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy5yZXNvdXJjZXM7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YXIgcmVzb3VyY2UgPSBfYVtfaV07XG4gICAgICAgICAgICBpZiAoIXJlc291cmNlLmxvYWRlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIEdhbWVMb29wLnByb3RvdHlwZS5pbml0UmVzb3VyY2VzT25GaXJzdENsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuYWxsUmVzb3VyY2VzTG9hZGVkKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuaW5pdGVkKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRlZCA9IHRydWU7XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy5yZXNvdXJjZXM7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc291cmNlID0gX2FbX2ldO1xuICAgICAgICAgICAgICAgIHJlc291cmNlLmluaXRPbkZpcnN0Q2xpY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgR2FtZUxvb3AucHJvdG90eXBlLm1vdXNlRG93bkhhbmRsZXIgPSBmdW5jdGlvbiAoeCwgeSwgaWQpIHtcbiAgICAgICAgaWYgKGlkID09PSB2b2lkIDApIHsgaWQgPSAwOyB9XG4gICAgICAgIHRoaXMuaW5pdFJlc291cmNlc09uRmlyc3RDbGljaygpO1xuICAgICAgICB2YXIgY2FudmFzID0gdGhpcy5ncmFwaGljcy5jYW52YXM7XG4gICAgICAgIGNhbnZhcy5mb2N1cygpO1xuICAgICAgICB2YXIgd2lkdGggPSBjYW52YXMuY2xpZW50V2lkdGg7XG4gICAgICAgIHZhciBoZWlnaHQgPSBjYW52YXMuY2xpZW50SGVpZ2h0O1xuICAgICAgICB4ID0gTWF0aC5mbG9vcigoeCAvIHdpZHRoKSAqIGNhbnZhcy53aWR0aCk7XG4gICAgICAgIHkgPSBNYXRoLmZsb29yKCh5IC8gaGVpZ2h0KSAqIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgICB0aGlzLmdhbWUub25Nb3VzZURvd24odGhpcywgeCwgeSk7XG4gICAgfTtcbiAgICBHYW1lTG9vcC5wcm90b3R5cGUubW91c2VVcEhhbmRsZXIgPSBmdW5jdGlvbiAoeCwgeSwgaWQpIHtcbiAgICAgICAgaWYgKGlkID09PSB2b2lkIDApIHsgaWQgPSAwOyB9XG4gICAgICAgIHRoaXMuaW5pdFJlc291cmNlc09uRmlyc3RDbGljaygpO1xuICAgICAgICB2YXIgY2FudmFzID0gdGhpcy5ncmFwaGljcy5jYW52YXM7XG4gICAgICAgIHZhciB3aWR0aCA9IGNhbnZhcy5jbGllbnRXaWR0aDtcbiAgICAgICAgdmFyIGhlaWdodCA9IGNhbnZhcy5jbGllbnRIZWlnaHQ7XG4gICAgICAgIHggPSBNYXRoLmZsb29yKCh4IC8gd2lkdGgpICogY2FudmFzLndpZHRoKTtcbiAgICAgICAgeSA9IE1hdGguZmxvb3IoKHkgLyBoZWlnaHQpICogY2FudmFzLmhlaWdodCk7XG4gICAgICAgIHRoaXMuZ2FtZS5vbk1vdXNlVXAodGhpcywgeCwgeSk7XG4gICAgfTtcbiAgICBHYW1lTG9vcC5wcm90b3R5cGUua2V5RG93bkhhbmRsZXIgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHRoaXMuaW5pdFJlc291cmNlc09uRmlyc3RDbGljaygpO1xuICAgICAgICB0aGlzLmdhbWUub25LZXlEb3duKHRoaXMsIGtleSk7XG4gICAgfTtcbiAgICBHYW1lTG9vcC5wcm90b3R5cGUua2V5VXBIYW5kbGVyID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICB0aGlzLmdhbWUub25LZXlVcCh0aGlzLCBrZXkpO1xuICAgIH07XG4gICAgR2FtZUxvb3AucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24gKGdhbWUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICAgICAgdGhpcy5ncmFwaGljcyA9IG5ldyBHcmFwaGljc0ltcGxfMS5HcmFwaGljc0ltcGwoKTtcbiAgICAgICAgdGhpcy5ncmFwaGljcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgX3RoaXMubW91c2VEb3duSGFuZGxlcihldmVudC5vZmZzZXRYLCBldmVudC5vZmZzZXRZKTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZ3JhcGhpY3MuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBfdGhpcy5tb3VzZVVwSGFuZGxlcihldmVudC5vZmZzZXRYLCBldmVudC5vZmZzZXRZKTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIF90aGlzLmtleURvd25IYW5kbGVyKGV2ZW50LmtleSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgX3RoaXMua2V5VXBIYW5kbGVyKGV2ZW50LmtleSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBnYW1lLmluaXQodGhpcyk7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5sb29wKCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEdhbWVMb29wLnByb3RvdHlwZS5sb29wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIHZhciBkZWx0YSA9IDA7XG4gICAgICAgIGlmICh0aGlzLmxhc3RGcmFtZSAhPT0gMCkge1xuICAgICAgICAgICAgZGVsdGEgPSBub3cgLSB0aGlzLmxhc3RGcmFtZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxhc3RGcmFtZSA9IG5vdztcbiAgICAgICAgdGhpcy5nYW1lLnVwZGF0ZSh0aGlzLCBkZWx0YSk7XG4gICAgICAgIHRoaXMuZ2FtZS5yZW5kZXIodGhpcywgdGhpcy5ncmFwaGljcyk7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5sb29wKCk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgR2FtZUxvb3AucHJvdG90eXBlLmxvYWRNdXNpYyA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgICAgdmFyIHNvdW5kID0gbmV3IFNvdW5kSW1wbF8xLlNvdW5kSW1wbCh1cmwsIHRydWUpO1xuICAgICAgICB0aGlzLnJlc291cmNlcy5wdXNoKHNvdW5kKTtcbiAgICAgICAgcmV0dXJuIHNvdW5kO1xuICAgIH07XG4gICAgR2FtZUxvb3AucHJvdG90eXBlLmxvYWRTb3VuZCA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgICAgdmFyIHNvdW5kID0gbmV3IFNvdW5kSW1wbF8xLlNvdW5kSW1wbCh1cmwsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5yZXNvdXJjZXMucHVzaChzb3VuZCk7XG4gICAgICAgIHJldHVybiBzb3VuZDtcbiAgICB9O1xuICAgIEdhbWVMb29wLnByb3RvdHlwZS5sb2FkQml0bWFwID0gZnVuY3Rpb24gKHVybCkge1xuICAgICAgICB2YXIgYml0bWFwID0gbmV3IEJpdG1hcEltcGxfMS5CaXRtYXBJbXBsKHVybCk7XG4gICAgICAgIHRoaXMucmVzb3VyY2VzLnB1c2goYml0bWFwKTtcbiAgICAgICAgcmV0dXJuIGJpdG1hcDtcbiAgICB9O1xuICAgIEdhbWVMb29wLnByb3RvdHlwZS5sb2FkVGlsZXNldCA9IGZ1bmN0aW9uICh1cmwsIHRpbGVXaWR0aCwgdGlsZUhlaWdodCkge1xuICAgICAgICB2YXIgdGlsZXNldCA9IG5ldyBUaWxlc2V0SW1wbF8xLlRpbGVzZXRJbXBsKHVybCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KTtcbiAgICAgICAgdGhpcy5yZXNvdXJjZXMucHVzaCh0aWxlc2V0KTtcbiAgICAgICAgcmV0dXJuIHRpbGVzZXQ7XG4gICAgfTtcbiAgICByZXR1cm4gR2FtZUxvb3A7XG59KCkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkJpdG1hcEltcGwgPSB2b2lkIDA7XG52YXIgQml0bWFwSW1wbCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCaXRtYXBJbXBsKHVybCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLndpZHRoID0gMDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAwO1xuICAgICAgICB0aGlzLmxvYWRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHRoaXMuaW1hZ2Uub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMud2lkdGggPSBfdGhpcy5pbWFnZS53aWR0aDtcbiAgICAgICAgICAgIF90aGlzLmhlaWdodCA9IF90aGlzLmltYWdlLmhlaWdodDtcbiAgICAgICAgICAgIF90aGlzLmxvYWRlZCA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gdXJsO1xuICAgIH1cbiAgICBCaXRtYXBJbXBsLnByb3RvdHlwZS5pbml0T25GaXJzdENsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgIH07XG4gICAgQml0bWFwSW1wbC5wcm90b3R5cGUuZ2V0RHJhd2FibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmltYWdlO1xuICAgIH07XG4gICAgcmV0dXJuIEJpdG1hcEltcGw7XG59KCkpO1xuZXhwb3J0cy5CaXRtYXBJbXBsID0gQml0bWFwSW1wbDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5HcmFwaGljc0ltcGwgPSB2b2lkIDA7XG52YXIgaXNGaXJlZm94ID0gdHlwZW9mIEluc3RhbGxUcmlnZ2VyICE9PSAndW5kZWZpbmVkJztcbnZhciBHcmFwaGljc0ltcGwgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gR3JhcGhpY3NJbXBsKCkge1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2FtZWNhbnZhc1wiKTtcbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIiwgeyBhbHBoYTogZmFsc2UgfSk7XG4gICAgICAgIHRoaXMuY3R4LndlYmtpdEltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmN0eC5tb3pJbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG4gICAgICAgIGlmIChpc0ZpcmVmb3gpIHtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzLnN0eWxlLmltYWdlUmVuZGVyaW5nID0gXCJjcmlzcC1lZGdlc1wiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jYW52YXMuc3R5bGUuaW1hZ2VSZW5kZXJpbmcgPSBcInBpeGVsYXRlZFwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIEdyYXBoaWNzSW1wbC5wcm90b3R5cGUuZmlsbFJlY3QgPSBmdW5jdGlvbiAoeCwgeSwgd2lkdGgsIGhlaWdodCwgY29sKSB7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGNvbDtcbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCk7XG4gICAgfTtcbiAgICBHcmFwaGljc0ltcGwucHJvdG90eXBlLmRyYXdCaXRtYXAgPSBmdW5jdGlvbiAoeCwgeSwgYml0bWFwKSB7XG4gICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZShiaXRtYXAuZ2V0RHJhd2FibGUoKSwgeCwgeSk7XG4gICAgfTtcbiAgICByZXR1cm4gR3JhcGhpY3NJbXBsO1xufSgpKTtcbmV4cG9ydHMuR3JhcGhpY3NJbXBsID0gR3JhcGhpY3NJbXBsO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlNvdW5kSW1wbCA9IHZvaWQgMDtcbnZhciBBdWRpb0NvbnRleHQgPSB3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQ7XG52YXIgQVVESU9fQ09OVEVYVDtcbmZ1bmN0aW9uIGhhbmRsZVZpc2liaWxpdHlDaGFuZ2UoKSB7XG4gICAgaWYgKFNvdW5kSW1wbC5DVVJSRU5UX01VU0lDKSB7XG4gICAgICAgIGlmIChkb2N1bWVudC5oaWRkZW4pIHtcbiAgICAgICAgICAgIFNvdW5kSW1wbC5DVVJSRU5UX01VU0lDLnN0b3AoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIFNvdW5kSW1wbC5DVVJSRU5UX01VU0lDLnBsYXkoU291bmRJbXBsLkNVUlJFTlRfTVVTSUMudm9sdW1lKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ2aXNpYmlsaXR5Y2hhbmdlXCIsIGhhbmRsZVZpc2liaWxpdHlDaGFuZ2UpO1xudmFyIFNvdW5kSW1wbCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTb3VuZEltcGwodXJsLCBtdXNpYykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmxvYWRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnZvbHVtZSA9IDE7XG4gICAgICAgIHRoaXMubXVzaWMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XG4gICAgICAgIHRoaXMubXVzaWMgPSBtdXNpYztcbiAgICAgICAgdmFyIHJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICByZXEub3BlbihcIkdFVFwiLCB1cmwsIHRydWUpO1xuICAgICAgICByZXEucmVzcG9uc2VUeXBlID0gXCJhcnJheWJ1ZmZlclwiO1xuICAgICAgICByZXEub25sb2FkID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgYXJyYXlCdWZmZXIgPSByZXEucmVzcG9uc2U7XG4gICAgICAgICAgICBpZiAoYXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5kYXRhID0gYXJyYXlCdWZmZXI7XG4gICAgICAgICAgICAgICAgX3RoaXMubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBfdGhpcy50cnlMb2FkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJlcS5zZW5kKG51bGwpO1xuICAgIH1cbiAgICBTb3VuZEltcGwucHJvdG90eXBlLnRyeUxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmIChBVURJT19DT05URVhUICYmIHRoaXMuZGF0YSkge1xuICAgICAgICAgICAgQVVESU9fQ09OVEVYVC5kZWNvZGVBdWRpb0RhdGEodGhpcy5kYXRhLCBmdW5jdGlvbiAoYnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuYnVmZmVyID0gYnVmZmVyO1xuICAgICAgICAgICAgICAgIGlmIChTb3VuZEltcGwuQ1VSUkVOVF9NVVNJQyA9PT0gX3RoaXMpIHtcbiAgICAgICAgICAgICAgICAgICAgU291bmRJbXBsLkNVUlJFTlRfTVVTSUMgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5wbGF5KF90aGlzLnZvbHVtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGUpIHsgY29uc29sZS5sb2coXCJGYWlsZWQgdG8gbG9hZDogXCIgKyBfdGhpcy51cmwpOyB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU291bmRJbXBsLnByb3RvdHlwZS5pbml0T25GaXJzdENsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIUFVRElPX0NPTlRFWFQpIHtcbiAgICAgICAgICAgIEFVRElPX0NPTlRFWFQgPSBuZXcgQXVkaW9Db250ZXh0KCk7XG4gICAgICAgICAgICBBVURJT19DT05URVhULnJlc3VtZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudHJ5TG9hZCgpO1xuICAgIH07XG4gICAgU291bmRJbXBsLnByb3RvdHlwZS5wbGF5ID0gZnVuY3Rpb24gKHZvbHVtZSkge1xuICAgICAgICB0aGlzLnZvbHVtZSA9IHZvbHVtZTtcbiAgICAgICAgaWYgKCF0aGlzLmJ1ZmZlcikge1xuICAgICAgICAgICAgaWYgKHRoaXMubXVzaWMpIHtcbiAgICAgICAgICAgICAgICBTb3VuZEltcGwuQ1VSUkVOVF9NVVNJQyA9IHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubXVzaWMpIHtcbiAgICAgICAgICAgIGlmIChTb3VuZEltcGwuQ1VSUkVOVF9NVVNJQyAhPT0gdGhpcykge1xuICAgICAgICAgICAgICAgIGlmIChTb3VuZEltcGwuQ1VSUkVOVF9NVVNJQykge1xuICAgICAgICAgICAgICAgICAgICBTb3VuZEltcGwuQ1VSUkVOVF9NVVNJQy5zdG9wKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFNvdW5kSW1wbC5DVVJSRU5UX01VU0lDID0gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnNvdXJjZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNvdXJjZSA9IEFVRElPX0NPTlRFWFQuY3JlYXRlQnVmZmVyU291cmNlKCk7XG4gICAgICAgIHRoaXMuc291cmNlLmJ1ZmZlciA9IHRoaXMuYnVmZmVyO1xuICAgICAgICB0aGlzLmdhaW4gPSBBVURJT19DT05URVhULmNyZWF0ZUdhaW4oKTtcbiAgICAgICAgdGhpcy5zb3VyY2UuY29ubmVjdCh0aGlzLmdhaW4pO1xuICAgICAgICB0aGlzLmdhaW4uY29ubmVjdChBVURJT19DT05URVhULmRlc3RpbmF0aW9uKTtcbiAgICAgICAgaWYgKHRoaXMubXVzaWMpIHtcbiAgICAgICAgICAgIHRoaXMuZ2Fpbi5nYWluLnZhbHVlID0gMDtcbiAgICAgICAgICAgIHRoaXMuc291cmNlLmxvb3AgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc291cmNlLnN0YXJ0KDApO1xuICAgICAgICBpZiAodGhpcy5tdXNpYykge1xuICAgICAgICAgICAgdGhpcy5nYWluLmdhaW4ubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUodm9sdW1lLCBBVURJT19DT05URVhULmN1cnJlbnRUaW1lICsgMik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmdhaW4uZ2Fpbi52YWx1ZSA9IHZvbHVtZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU291bmRJbXBsLnByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5zb3VyY2UpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm11c2ljKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYWluLmdhaW4ubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUoMCwgQVVESU9fQ09OVEVYVC5jdXJyZW50VGltZSArIDMpO1xuICAgICAgICAgICAgICAgIHZhciB0ZW1wU291cmNlXzEgPSB0aGlzLnNvdXJjZTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcFNvdXJjZV8xLnN0b3AoKTtcbiAgICAgICAgICAgICAgICB9LCA0MDAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc291cmNlLnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc291cmNlID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIFNvdW5kSW1wbDtcbn0oKSk7XG5leHBvcnRzLlNvdW5kSW1wbCA9IFNvdW5kSW1wbDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5UaWxlc2V0SW1wbCA9IHZvaWQgMDtcbnZhciBUaWxlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRpbGUoY2FudmFzKSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xuICAgICAgICB0aGlzLndpZHRoID0gY2FudmFzLndpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XG4gICAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgVGlsZS5wcm90b3R5cGUuZ2V0RHJhd2FibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhbnZhcztcbiAgICB9O1xuICAgIFRpbGUucHJvdG90eXBlLmluaXRPbkZpcnN0Q2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgfTtcbiAgICByZXR1cm4gVGlsZTtcbn0oKSk7XG52YXIgVGlsZXNldEltcGwgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGlsZXNldEltcGwodXJsLCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5sb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5iaXRtYXBzID0gW107XG4gICAgICAgIHRoaXMuc2NhbmxpbmUgPSAwO1xuICAgICAgICB0aGlzLnRpbGVXaWR0aCA9IHRpbGVXaWR0aDtcbiAgICAgICAgdGhpcy50aWxlSGVpZ2h0ID0gdGlsZUhlaWdodDtcbiAgICAgICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICB0aGlzLmltYWdlLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIF90aGlzLnNjYW5saW5lID0gTWF0aC5mbG9vcihfdGhpcy5pbWFnZS53aWR0aCAvIHRpbGVXaWR0aCk7XG4gICAgICAgICAgICB2YXIgZGVwdGggPSBNYXRoLmZsb29yKF90aGlzLmltYWdlLmhlaWdodCAvIHRpbGVIZWlnaHQpO1xuICAgICAgICAgICAgLy8gY3V0IHRoZSBpbWFnZSBpbnRvIHBpZWNlc1xuICAgICAgICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPCBkZXB0aDsgeSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCBfdGhpcy5zY2FubGluZTsgeCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgICAgICAgICAgICAgICBjYW52YXMud2lkdGggPSB0aWxlV2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSB0aWxlSGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAoX2EgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZHJhd0ltYWdlKF90aGlzLmltYWdlLCAteCAqIHRpbGVXaWR0aCwgLXkgKiB0aWxlSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuYml0bWFwcy5wdXNoKG5ldyBUaWxlKGNhbnZhcykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLmxvYWRlZCA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gdXJsO1xuICAgIH1cbiAgICBUaWxlc2V0SW1wbC5wcm90b3R5cGUuaW5pdE9uRmlyc3RDbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICB9O1xuICAgIFRpbGVzZXRJbXBsLnByb3RvdHlwZS5nZXRUaWxlID0gZnVuY3Rpb24gKHRpbGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYml0bWFwc1t0aWxlXTtcbiAgICB9O1xuICAgIHJldHVybiBUaWxlc2V0SW1wbDtcbn0oKSk7XG5leHBvcnRzLlRpbGVzZXRJbXBsID0gVGlsZXNldEltcGw7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnN0YXJ0R2FtZSA9IHZvaWQgMDtcbnZhciBHdXRlXzEgPSByZXF1aXJlKFwiLi9HdXRlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwic3RhcnRHYW1lXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBHdXRlXzEuc3RhcnRHYW1lOyB9IH0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==

/***/ }),

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
        this.musicStarted = false;
    }
    TestGame.prototype.init = function (context) {
        this.testImage = context.loadBitmap("assets/test.png");
        this.testTiles = context.loadTileset("assets/tiles.png", 8, 8);
        this.keySound = context.loadSound("assets/coin.mp3");
        this.mouseSound = context.loadSound("assets/jump.mp3");
        this.music = context.loadMusic("assets/music.mp3");
        this.music.play(1.0);
    };
    TestGame.prototype.onMouseDown = function (context, x, y) {
        this.mouseSound.play(1.0);
    };
    TestGame.prototype.onMouseUp = function (context, x, y) {
    };
    TestGame.prototype.onKeyDown = function (context, key) {
        this.keySound.play(1.0);
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
var dist_1 = __webpack_require__(/*! gute/dist */ "./node_modules/gute/dist/index.js");
var TestGame_1 = __webpack_require__(/*! ./TestGame */ "./src/TestGame.ts");
dist_1.startGame(new TestGame_1.TestGame());

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ndXRlLXRlc3QvLi9ub2RlX21vZHVsZXMvZ3V0ZS9kaXN0L2luZGV4LmpzIiwid2VicGFjazovL2d1dGUtdGVzdC8uL3NyYy9UZXN0R2FtZS50cyIsIndlYnBhY2s6Ly9ndXRlLXRlc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZ3V0ZS10ZXN0Ly4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0EsSUFBSSxJQUF5RDtBQUM3RDtBQUNBLE1BQU0sRUFLcUI7QUFDM0IsQ0FBQztBQUNELHdCQUF3QjtBQUN4QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLDhCQUFtQjs7O0FBRzdELCtDQUErQyxjQUFjO0FBQzdEO0FBQ0EsbUJBQW1CLDhCQUFtQjtBQUN0QyxxQkFBcUIsOEJBQW1CO0FBQ3hDLGtCQUFrQiw4QkFBbUI7QUFDckMsb0JBQW9CLDhCQUFtQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsZ0JBQWdCO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELGdCQUFnQjtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsUUFBUTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixRQUFRO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7OztBQUdELE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EsK0NBQStDLGNBQWM7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7QUFHQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLCtDQUErQyxjQUFjO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsZUFBZTtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7OztBQUdBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EsK0NBQStDLGNBQWM7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsZ0JBQWdCLDZDQUE2QyxFQUFFO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7OztBQUdBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EsK0NBQStDLGNBQWM7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLFdBQVc7QUFDdEMsK0JBQStCLG9CQUFvQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7QUFHQSxPQUFPOztBQUVQLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGdDQUFtQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFpRSxnQ0FBbUI7QUFDcEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsK0NBQStDLGNBQWM7QUFDN0Q7QUFDQSxhQUFhLGdDQUFtQjtBQUNoQyw4Q0FBOEMscUNBQXFDLHlCQUF5QixFQUFFLEVBQUU7O0FBRWhILENBQUM7O0FBRUQ7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxDQUFDO0FBQ0QsMkNBQTJDLGNBQWMsbW9zQjs7Ozs7Ozs7Ozs7QUNwZDVDO0FBQ2IsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELGdCQUFnQjs7Ozs7OztVQ3BDaEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7Ozs7QUN0QmE7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QsYUFBYSxtQkFBTyxDQUFDLG9EQUFXO0FBQ2hDLGlCQUFpQixtQkFBTyxDQUFDLHFDQUFZO0FBQ3JDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImd1dGVcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiZ3V0ZVwiXSA9IGZhY3RvcnkoKTtcbn0pKHNlbGYsIGZ1bmN0aW9uKCkge1xucmV0dXJuIC8qKioqKiovICgoKSA9PiB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0XCJ1c2Ugc3RyaWN0XCI7XG4vKioqKioqLyBcdHZhciBfX3dlYnBhY2tfbW9kdWxlc19fID0gKHtcblxuLyoqKi8gXCIuL3NyYy9HdXRlLnRzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9zcmMvR3V0ZS50cyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gKChfX3VudXNlZF93ZWJwYWNrX21vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykgPT4ge1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgKHsgdmFsdWU6IHRydWUgfSkpO1xuZXhwb3J0cy5zdGFydEdhbWUgPSB2b2lkIDA7XG52YXIgQml0bWFwSW1wbF8xID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi9pbXBsL0JpdG1hcEltcGwgKi8gXCIuL3NyYy9pbXBsL0JpdG1hcEltcGwudHNcIik7XG52YXIgR3JhcGhpY3NJbXBsXzEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL2ltcGwvR3JhcGhpY3NJbXBsICovIFwiLi9zcmMvaW1wbC9HcmFwaGljc0ltcGwudHNcIik7XG52YXIgU291bmRJbXBsXzEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL2ltcGwvU291bmRJbXBsICovIFwiLi9zcmMvaW1wbC9Tb3VuZEltcGwudHNcIik7XG52YXIgVGlsZXNldEltcGxfMSA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vaW1wbC9UaWxlc2V0SW1wbCAqLyBcIi4vc3JjL2ltcGwvVGlsZXNldEltcGwudHNcIik7XG52YXIgR0FNRV9MT09QO1xuZnVuY3Rpb24gc3RhcnRHYW1lKGdhbWUpIHtcbiAgICBHQU1FX0xPT1AgPSBuZXcgR2FtZUxvb3AoKS5zdGFydChnYW1lKTtcbn1cbmV4cG9ydHMuc3RhcnRHYW1lID0gc3RhcnRHYW1lO1xudmFyIEdhbWVMb29wID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEdhbWVMb29wKCkge1xuICAgICAgICB0aGlzLnJlc291cmNlcyA9IFtdO1xuICAgICAgICB0aGlzLmxhc3RGcmFtZSA9IDA7XG4gICAgICAgIHRoaXMuaW5pdGVkID0gZmFsc2U7XG4gICAgfVxuICAgIEdhbWVMb29wLnByb3RvdHlwZS5hbGxSZXNvdXJjZXNMb2FkZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSB0aGlzLnJlc291cmNlczsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciByZXNvdXJjZSA9IF9hW19pXTtcbiAgICAgICAgICAgIGlmICghcmVzb3VyY2UubG9hZGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgR2FtZUxvb3AucHJvdG90eXBlLmluaXRSZXNvdXJjZXNPbkZpcnN0Q2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5hbGxSZXNvdXJjZXNMb2FkZWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5pbml0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSB0aGlzLnJlc291cmNlczsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzb3VyY2UgPSBfYVtfaV07XG4gICAgICAgICAgICAgICAgcmVzb3VyY2UuaW5pdE9uRmlyc3RDbGljaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBHYW1lTG9vcC5wcm90b3R5cGUubW91c2VEb3duSGFuZGxlciA9IGZ1bmN0aW9uICh4LCB5LCBpZCkge1xuICAgICAgICBpZiAoaWQgPT09IHZvaWQgMCkgeyBpZCA9IDA7IH1cbiAgICAgICAgdGhpcy5pbml0UmVzb3VyY2VzT25GaXJzdENsaWNrKCk7XG4gICAgICAgIHZhciBjYW52YXMgPSB0aGlzLmdyYXBoaWNzLmNhbnZhcztcbiAgICAgICAgY2FudmFzLmZvY3VzKCk7XG4gICAgICAgIHZhciB3aWR0aCA9IGNhbnZhcy5jbGllbnRXaWR0aDtcbiAgICAgICAgdmFyIGhlaWdodCA9IGNhbnZhcy5jbGllbnRIZWlnaHQ7XG4gICAgICAgIHggPSBNYXRoLmZsb29yKCh4IC8gd2lkdGgpICogY2FudmFzLndpZHRoKTtcbiAgICAgICAgeSA9IE1hdGguZmxvb3IoKHkgLyBoZWlnaHQpICogY2FudmFzLmhlaWdodCk7XG4gICAgICAgIHRoaXMuZ2FtZS5vbk1vdXNlRG93bih0aGlzLCB4LCB5KTtcbiAgICB9O1xuICAgIEdhbWVMb29wLnByb3RvdHlwZS5tb3VzZVVwSGFuZGxlciA9IGZ1bmN0aW9uICh4LCB5LCBpZCkge1xuICAgICAgICBpZiAoaWQgPT09IHZvaWQgMCkgeyBpZCA9IDA7IH1cbiAgICAgICAgdGhpcy5pbml0UmVzb3VyY2VzT25GaXJzdENsaWNrKCk7XG4gICAgICAgIHZhciBjYW52YXMgPSB0aGlzLmdyYXBoaWNzLmNhbnZhcztcbiAgICAgICAgdmFyIHdpZHRoID0gY2FudmFzLmNsaWVudFdpZHRoO1xuICAgICAgICB2YXIgaGVpZ2h0ID0gY2FudmFzLmNsaWVudEhlaWdodDtcbiAgICAgICAgeCA9IE1hdGguZmxvb3IoKHggLyB3aWR0aCkgKiBjYW52YXMud2lkdGgpO1xuICAgICAgICB5ID0gTWF0aC5mbG9vcigoeSAvIGhlaWdodCkgKiBjYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5nYW1lLm9uTW91c2VVcCh0aGlzLCB4LCB5KTtcbiAgICB9O1xuICAgIEdhbWVMb29wLnByb3RvdHlwZS5rZXlEb3duSGFuZGxlciA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgdGhpcy5pbml0UmVzb3VyY2VzT25GaXJzdENsaWNrKCk7XG4gICAgICAgIHRoaXMuZ2FtZS5vbktleURvd24odGhpcywga2V5KTtcbiAgICB9O1xuICAgIEdhbWVMb29wLnByb3RvdHlwZS5rZXlVcEhhbmRsZXIgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHRoaXMuZ2FtZS5vbktleVVwKHRoaXMsIGtleSk7XG4gICAgfTtcbiAgICBHYW1lTG9vcC5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbiAoZ2FtZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgICAgICB0aGlzLmdyYXBoaWNzID0gbmV3IEdyYXBoaWNzSW1wbF8xLkdyYXBoaWNzSW1wbCgpO1xuICAgICAgICB0aGlzLmdyYXBoaWNzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBfdGhpcy5tb3VzZURvd25IYW5kbGVyKGV2ZW50Lm9mZnNldFgsIGV2ZW50Lm9mZnNldFkpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5ncmFwaGljcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIF90aGlzLm1vdXNlVXBIYW5kbGVyKGV2ZW50Lm9mZnNldFgsIGV2ZW50Lm9mZnNldFkpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgX3RoaXMua2V5RG93bkhhbmRsZXIoZXZlbnQua2V5KTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBfdGhpcy5rZXlVcEhhbmRsZXIoZXZlbnQua2V5KTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGdhbWUuaW5pdCh0aGlzKTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLmxvb3AoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgR2FtZUxvb3AucHJvdG90eXBlLmxvb3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdmFyIGRlbHRhID0gMDtcbiAgICAgICAgaWYgKHRoaXMubGFzdEZyYW1lICE9PSAwKSB7XG4gICAgICAgICAgICBkZWx0YSA9IG5vdyAtIHRoaXMubGFzdEZyYW1lO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGFzdEZyYW1lID0gbm93O1xuICAgICAgICB0aGlzLmdhbWUudXBkYXRlKHRoaXMsIGRlbHRhKTtcbiAgICAgICAgdGhpcy5nYW1lLnJlbmRlcih0aGlzLCB0aGlzLmdyYXBoaWNzKTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLmxvb3AoKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBHYW1lTG9vcC5wcm90b3R5cGUubG9hZE11c2ljID0gZnVuY3Rpb24gKHVybCkge1xuICAgICAgICB2YXIgc291bmQgPSBuZXcgU291bmRJbXBsXzEuU291bmRJbXBsKHVybCwgdHJ1ZSk7XG4gICAgICAgIHRoaXMucmVzb3VyY2VzLnB1c2goc291bmQpO1xuICAgICAgICByZXR1cm4gc291bmQ7XG4gICAgfTtcbiAgICBHYW1lTG9vcC5wcm90b3R5cGUubG9hZFNvdW5kID0gZnVuY3Rpb24gKHVybCkge1xuICAgICAgICB2YXIgc291bmQgPSBuZXcgU291bmRJbXBsXzEuU291bmRJbXBsKHVybCwgZmFsc2UpO1xuICAgICAgICB0aGlzLnJlc291cmNlcy5wdXNoKHNvdW5kKTtcbiAgICAgICAgcmV0dXJuIHNvdW5kO1xuICAgIH07XG4gICAgR2FtZUxvb3AucHJvdG90eXBlLmxvYWRCaXRtYXAgPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgICAgIHZhciBiaXRtYXAgPSBuZXcgQml0bWFwSW1wbF8xLkJpdG1hcEltcGwodXJsKTtcbiAgICAgICAgdGhpcy5yZXNvdXJjZXMucHVzaChiaXRtYXApO1xuICAgICAgICByZXR1cm4gYml0bWFwO1xuICAgIH07XG4gICAgR2FtZUxvb3AucHJvdG90eXBlLmxvYWRUaWxlc2V0ID0gZnVuY3Rpb24gKHVybCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KSB7XG4gICAgICAgIHZhciB0aWxlc2V0ID0gbmV3IFRpbGVzZXRJbXBsXzEuVGlsZXNldEltcGwodXJsLCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQpO1xuICAgICAgICB0aGlzLnJlc291cmNlcy5wdXNoKHRpbGVzZXQpO1xuICAgICAgICByZXR1cm4gdGlsZXNldDtcbiAgICB9O1xuICAgIHJldHVybiBHYW1lTG9vcDtcbn0oKSk7XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9zcmMvaW1wbC9CaXRtYXBJbXBsLnRzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL3NyYy9pbXBsL0JpdG1hcEltcGwudHMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gKChfX3VudXNlZF93ZWJwYWNrX21vZHVsZSwgZXhwb3J0cykgPT4ge1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgKHsgdmFsdWU6IHRydWUgfSkpO1xuZXhwb3J0cy5CaXRtYXBJbXBsID0gdm9pZCAwO1xudmFyIEJpdG1hcEltcGwgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQml0bWFwSW1wbCh1cmwpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy53aWR0aCA9IDA7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gMDtcbiAgICAgICAgdGhpcy5sb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICB0aGlzLmltYWdlLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLndpZHRoID0gX3RoaXMuaW1hZ2Uud2lkdGg7XG4gICAgICAgICAgICBfdGhpcy5oZWlnaHQgPSBfdGhpcy5pbWFnZS5oZWlnaHQ7XG4gICAgICAgICAgICBfdGhpcy5sb2FkZWQgPSB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmltYWdlLnNyYyA9IHVybDtcbiAgICB9XG4gICAgQml0bWFwSW1wbC5wcm90b3R5cGUuaW5pdE9uRmlyc3RDbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICB9O1xuICAgIEJpdG1hcEltcGwucHJvdG90eXBlLmdldERyYXdhYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbWFnZTtcbiAgICB9O1xuICAgIHJldHVybiBCaXRtYXBJbXBsO1xufSgpKTtcbmV4cG9ydHMuQml0bWFwSW1wbCA9IEJpdG1hcEltcGw7XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9zcmMvaW1wbC9HcmFwaGljc0ltcGwudHNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9zcmMvaW1wbC9HcmFwaGljc0ltcGwudHMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqLyAoKF9fdW51c2VkX3dlYnBhY2tfbW9kdWxlLCBleHBvcnRzKSA9PiB7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCAoeyB2YWx1ZTogdHJ1ZSB9KSk7XG5leHBvcnRzLkdyYXBoaWNzSW1wbCA9IHZvaWQgMDtcbnZhciBpc0ZpcmVmb3ggPSB0eXBlb2YgSW5zdGFsbFRyaWdnZXIgIT09ICd1bmRlZmluZWQnO1xudmFyIEdyYXBoaWNzSW1wbCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBHcmFwaGljc0ltcGwoKSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lY2FudmFzXCIpO1xuICAgICAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiLCB7IGFscGhhOiBmYWxzZSB9KTtcbiAgICAgICAgdGhpcy5jdHgud2Via2l0SW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY3R4Lm1vekltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmN0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKGlzRmlyZWZveCkge1xuICAgICAgICAgICAgdGhpcy5jYW52YXMuc3R5bGUuaW1hZ2VSZW5kZXJpbmcgPSBcImNyaXNwLWVkZ2VzXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5zdHlsZS5pbWFnZVJlbmRlcmluZyA9IFwicGl4ZWxhdGVkXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgR3JhcGhpY3NJbXBsLnByb3RvdHlwZS5maWxsUmVjdCA9IGZ1bmN0aW9uICh4LCB5LCB3aWR0aCwgaGVpZ2h0LCBjb2wpIHtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gY29sO1xuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCh4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB9O1xuICAgIEdyYXBoaWNzSW1wbC5wcm90b3R5cGUuZHJhd0JpdG1hcCA9IGZ1bmN0aW9uICh4LCB5LCBiaXRtYXApIHtcbiAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKGJpdG1hcC5nZXREcmF3YWJsZSgpLCB4LCB5KTtcbiAgICB9O1xuICAgIHJldHVybiBHcmFwaGljc0ltcGw7XG59KCkpO1xuZXhwb3J0cy5HcmFwaGljc0ltcGwgPSBHcmFwaGljc0ltcGw7XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9zcmMvaW1wbC9Tb3VuZEltcGwudHNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9zcmMvaW1wbC9Tb3VuZEltcGwudHMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqLyAoKF9fdW51c2VkX3dlYnBhY2tfbW9kdWxlLCBleHBvcnRzKSA9PiB7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCAoeyB2YWx1ZTogdHJ1ZSB9KSk7XG5leHBvcnRzLlNvdW5kSW1wbCA9IHZvaWQgMDtcbnZhciBBdWRpb0NvbnRleHQgPSB3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQ7XG52YXIgQVVESU9fQ09OVEVYVDtcbmZ1bmN0aW9uIGhhbmRsZVZpc2liaWxpdHlDaGFuZ2UoKSB7XG4gICAgaWYgKFNvdW5kSW1wbC5DVVJSRU5UX01VU0lDKSB7XG4gICAgICAgIGlmIChkb2N1bWVudC5oaWRkZW4pIHtcbiAgICAgICAgICAgIFNvdW5kSW1wbC5DVVJSRU5UX01VU0lDLnN0b3AoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIFNvdW5kSW1wbC5DVVJSRU5UX01VU0lDLnBsYXkoU291bmRJbXBsLkNVUlJFTlRfTVVTSUMudm9sdW1lKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ2aXNpYmlsaXR5Y2hhbmdlXCIsIGhhbmRsZVZpc2liaWxpdHlDaGFuZ2UpO1xudmFyIFNvdW5kSW1wbCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTb3VuZEltcGwodXJsLCBtdXNpYykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmxvYWRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnZvbHVtZSA9IDE7XG4gICAgICAgIHRoaXMubXVzaWMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XG4gICAgICAgIHRoaXMubXVzaWMgPSBtdXNpYztcbiAgICAgICAgdmFyIHJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICByZXEub3BlbihcIkdFVFwiLCB1cmwsIHRydWUpO1xuICAgICAgICByZXEucmVzcG9uc2VUeXBlID0gXCJhcnJheWJ1ZmZlclwiO1xuICAgICAgICByZXEub25sb2FkID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgYXJyYXlCdWZmZXIgPSByZXEucmVzcG9uc2U7XG4gICAgICAgICAgICBpZiAoYXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5kYXRhID0gYXJyYXlCdWZmZXI7XG4gICAgICAgICAgICAgICAgX3RoaXMubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBfdGhpcy50cnlMb2FkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJlcS5zZW5kKG51bGwpO1xuICAgIH1cbiAgICBTb3VuZEltcGwucHJvdG90eXBlLnRyeUxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmIChBVURJT19DT05URVhUICYmIHRoaXMuZGF0YSkge1xuICAgICAgICAgICAgQVVESU9fQ09OVEVYVC5kZWNvZGVBdWRpb0RhdGEodGhpcy5kYXRhLCBmdW5jdGlvbiAoYnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuYnVmZmVyID0gYnVmZmVyO1xuICAgICAgICAgICAgICAgIGlmIChTb3VuZEltcGwuQ1VSUkVOVF9NVVNJQyA9PT0gX3RoaXMpIHtcbiAgICAgICAgICAgICAgICAgICAgU291bmRJbXBsLkNVUlJFTlRfTVVTSUMgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5wbGF5KF90aGlzLnZvbHVtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGUpIHsgY29uc29sZS5sb2coXCJGYWlsZWQgdG8gbG9hZDogXCIgKyBfdGhpcy51cmwpOyB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU291bmRJbXBsLnByb3RvdHlwZS5pbml0T25GaXJzdENsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIUFVRElPX0NPTlRFWFQpIHtcbiAgICAgICAgICAgIEFVRElPX0NPTlRFWFQgPSBuZXcgQXVkaW9Db250ZXh0KCk7XG4gICAgICAgICAgICBBVURJT19DT05URVhULnJlc3VtZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudHJ5TG9hZCgpO1xuICAgIH07XG4gICAgU291bmRJbXBsLnByb3RvdHlwZS5wbGF5ID0gZnVuY3Rpb24gKHZvbHVtZSkge1xuICAgICAgICB0aGlzLnZvbHVtZSA9IHZvbHVtZTtcbiAgICAgICAgaWYgKCF0aGlzLmJ1ZmZlcikge1xuICAgICAgICAgICAgaWYgKHRoaXMubXVzaWMpIHtcbiAgICAgICAgICAgICAgICBTb3VuZEltcGwuQ1VSUkVOVF9NVVNJQyA9IHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubXVzaWMpIHtcbiAgICAgICAgICAgIGlmIChTb3VuZEltcGwuQ1VSUkVOVF9NVVNJQyAhPT0gdGhpcykge1xuICAgICAgICAgICAgICAgIGlmIChTb3VuZEltcGwuQ1VSUkVOVF9NVVNJQykge1xuICAgICAgICAgICAgICAgICAgICBTb3VuZEltcGwuQ1VSUkVOVF9NVVNJQy5zdG9wKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFNvdW5kSW1wbC5DVVJSRU5UX01VU0lDID0gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnNvdXJjZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNvdXJjZSA9IEFVRElPX0NPTlRFWFQuY3JlYXRlQnVmZmVyU291cmNlKCk7XG4gICAgICAgIHRoaXMuc291cmNlLmJ1ZmZlciA9IHRoaXMuYnVmZmVyO1xuICAgICAgICB0aGlzLmdhaW4gPSBBVURJT19DT05URVhULmNyZWF0ZUdhaW4oKTtcbiAgICAgICAgdGhpcy5zb3VyY2UuY29ubmVjdCh0aGlzLmdhaW4pO1xuICAgICAgICB0aGlzLmdhaW4uY29ubmVjdChBVURJT19DT05URVhULmRlc3RpbmF0aW9uKTtcbiAgICAgICAgaWYgKHRoaXMubXVzaWMpIHtcbiAgICAgICAgICAgIHRoaXMuZ2Fpbi5nYWluLnZhbHVlID0gMDtcbiAgICAgICAgICAgIHRoaXMuc291cmNlLmxvb3AgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc291cmNlLnN0YXJ0KDApO1xuICAgICAgICBpZiAodGhpcy5tdXNpYykge1xuICAgICAgICAgICAgdGhpcy5nYWluLmdhaW4ubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUodm9sdW1lLCBBVURJT19DT05URVhULmN1cnJlbnRUaW1lICsgMik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmdhaW4uZ2Fpbi52YWx1ZSA9IHZvbHVtZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU291bmRJbXBsLnByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5zb3VyY2UpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm11c2ljKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYWluLmdhaW4ubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUoMCwgQVVESU9fQ09OVEVYVC5jdXJyZW50VGltZSArIDMpO1xuICAgICAgICAgICAgICAgIHZhciB0ZW1wU291cmNlXzEgPSB0aGlzLnNvdXJjZTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcFNvdXJjZV8xLnN0b3AoKTtcbiAgICAgICAgICAgICAgICB9LCA0MDAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc291cmNlLnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc291cmNlID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIFNvdW5kSW1wbDtcbn0oKSk7XG5leHBvcnRzLlNvdW5kSW1wbCA9IFNvdW5kSW1wbDtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL3NyYy9pbXBsL1RpbGVzZXRJbXBsLnRzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9zcmMvaW1wbC9UaWxlc2V0SW1wbC50cyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gKChfX3VudXNlZF93ZWJwYWNrX21vZHVsZSwgZXhwb3J0cykgPT4ge1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgKHsgdmFsdWU6IHRydWUgfSkpO1xuZXhwb3J0cy5UaWxlc2V0SW1wbCA9IHZvaWQgMDtcbnZhciBUaWxlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRpbGUoY2FudmFzKSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xuICAgICAgICB0aGlzLndpZHRoID0gY2FudmFzLndpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XG4gICAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgVGlsZS5wcm90b3R5cGUuZ2V0RHJhd2FibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhbnZhcztcbiAgICB9O1xuICAgIFRpbGUucHJvdG90eXBlLmluaXRPbkZpcnN0Q2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgfTtcbiAgICByZXR1cm4gVGlsZTtcbn0oKSk7XG52YXIgVGlsZXNldEltcGwgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGlsZXNldEltcGwodXJsLCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5sb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5iaXRtYXBzID0gW107XG4gICAgICAgIHRoaXMuc2NhbmxpbmUgPSAwO1xuICAgICAgICB0aGlzLnRpbGVXaWR0aCA9IHRpbGVXaWR0aDtcbiAgICAgICAgdGhpcy50aWxlSGVpZ2h0ID0gdGlsZUhlaWdodDtcbiAgICAgICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICB0aGlzLmltYWdlLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIF90aGlzLnNjYW5saW5lID0gTWF0aC5mbG9vcihfdGhpcy5pbWFnZS53aWR0aCAvIHRpbGVXaWR0aCk7XG4gICAgICAgICAgICB2YXIgZGVwdGggPSBNYXRoLmZsb29yKF90aGlzLmltYWdlLmhlaWdodCAvIHRpbGVIZWlnaHQpO1xuICAgICAgICAgICAgLy8gY3V0IHRoZSBpbWFnZSBpbnRvIHBpZWNlc1xuICAgICAgICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPCBkZXB0aDsgeSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCBfdGhpcy5zY2FubGluZTsgeCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgICAgICAgICAgICAgICBjYW52YXMud2lkdGggPSB0aWxlV2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSB0aWxlSGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAoX2EgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZHJhd0ltYWdlKF90aGlzLmltYWdlLCAteCAqIHRpbGVXaWR0aCwgLXkgKiB0aWxlSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuYml0bWFwcy5wdXNoKG5ldyBUaWxlKGNhbnZhcykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLmxvYWRlZCA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gdXJsO1xuICAgIH1cbiAgICBUaWxlc2V0SW1wbC5wcm90b3R5cGUuaW5pdE9uRmlyc3RDbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICB9O1xuICAgIFRpbGVzZXRJbXBsLnByb3RvdHlwZS5nZXRUaWxlID0gZnVuY3Rpb24gKHRpbGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYml0bWFwc1t0aWxlXTtcbiAgICB9O1xuICAgIHJldHVybiBUaWxlc2V0SW1wbDtcbn0oKSk7XG5leHBvcnRzLlRpbGVzZXRJbXBsID0gVGlsZXNldEltcGw7XG5cblxuLyoqKi8gfSlcblxuLyoqKioqKi8gXHR9KTtcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0dmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuLyoqKioqKi8gXHRcdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuLyoqKioqKi8gXHRcdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHRcdH1cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gXHRcdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuLyoqKioqKi8gXHRcdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4vKioqKioqLyBcdFx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG4vKioqKioqLyBcdFxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0ge307XG4vLyBUaGlzIGVudHJ5IG5lZWQgdG8gYmUgd3JhcHBlZCBpbiBhbiBJSUZFIGJlY2F1c2UgaXQgbmVlZCB0byBiZSBpc29sYXRlZCBhZ2FpbnN0IG90aGVyIG1vZHVsZXMgaW4gdGhlIGNodW5rLlxuKCgpID0+IHtcbnZhciBleHBvcnRzID0gX193ZWJwYWNrX2V4cG9ydHNfXztcbi8qISoqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9zcmMvaW5kZXgudHMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKiovXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgKHsgdmFsdWU6IHRydWUgfSkpO1xuZXhwb3J0cy5zdGFydEdhbWUgPSB2b2lkIDA7XG52YXIgR3V0ZV8xID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi9HdXRlICovIFwiLi9zcmMvR3V0ZS50c1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInN0YXJ0R2FtZVwiLCAoeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIEd1dGVfMS5zdGFydEdhbWU7IH0gfSkpO1xuXG59KSgpO1xuXG4vKioqKioqLyBcdHJldHVybiBfX3dlYnBhY2tfZXhwb3J0c19fO1xuLyoqKioqKi8gfSkoKVxuO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbmRsWW5CaFkyczZMeTluZFhSbEwzZGxZbkJoWTJzdmRXNXBkbVZ5YzJGc1RXOWtkV3hsUkdWbWFXNXBkR2x2YmlJc0luZGxZbkJoWTJzNkx5OW5kWFJsTHk0dmMzSmpMMGQxZEdVdWRITWlMQ0ozWldKd1lXTnJPaTh2WjNWMFpTOHVMM055WXk5cGJYQnNMMEpwZEcxaGNFbHRjR3d1ZEhNaUxDSjNaV0p3WVdOck9pOHZaM1YwWlM4dUwzTnlZeTlwYlhCc0wwZHlZWEJvYVdOelNXMXdiQzUwY3lJc0luZGxZbkJoWTJzNkx5OW5kWFJsTHk0dmMzSmpMMmx0Y0d3dlUyOTFibVJKYlhCc0xuUnpJaXdpZDJWaWNHRmphem92TDJkMWRHVXZMaTl6Y21NdmFXMXdiQzlVYVd4bGMyVjBTVzF3YkM1MGN5SXNJbmRsWW5CaFkyczZMeTluZFhSbEwzZGxZbkJoWTJzdlltOXZkSE4wY21Gd0lpd2lkMlZpY0dGamF6b3ZMMmQxZEdVdkxpOXpjbU12YVc1a1pYZ3VkSE1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJa0ZCUVVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1EwRkJRenRCUVVORUxFODdPenM3T3pzN096czdRVU5XWVR0QlFVTmlMRGhEUVVFMlF5eERRVUZETEdOQlFXTXNSVUZCUXp0QlFVTTNSQ3hwUWtGQmFVSTdRVUZEYWtJc2JVSkJRVzFDTEcxQ1FVRlBMRU5CUVVNc2JVUkJRVzFDTzBGQlF6bERMSEZDUVVGeFFpeHRRa0ZCVHl4RFFVRkRMSFZFUVVGeFFqdEJRVU5zUkN4clFrRkJhMElzYlVKQlFVOHNRMEZCUXl4cFJFRkJhMEk3UVVGRE5VTXNiMEpCUVc5Q0xHMUNRVUZQTEVOQlFVTXNjVVJCUVc5Q08wRkJRMmhFTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc2FVSkJRV2xDTzBGQlEycENPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNOa05CUVRaRExHZENRVUZuUWp0QlFVTTNSRHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEdsRVFVRnBSQ3huUWtGQlowSTdRVUZEYWtVN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNORUpCUVRSQ0xGRkJRVkU3UVVGRGNFTTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN3MFFrRkJORUlzVVVGQlVUdEJRVU53UXp0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRk5CUVZNN1FVRkRWRHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hUUVVGVE8wRkJRMVE3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4VFFVRlRPMEZCUTFRN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFRRVUZUTzBGQlExUTdRVUZEUVR0QlFVTkJPMEZCUTBFc1UwRkJVenRCUVVOVU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4VFFVRlRPMEZCUTFRN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeERRVUZET3pzN096czdPenM3T3p0QlF6bEpXVHRCUVVOaUxEaERRVUUyUXl4RFFVRkRMR05CUVdNc1JVRkJRenRCUVVNM1JDeHJRa0ZCYTBJN1FVRkRiRUk3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEVOQlFVTTdRVUZEUkN4clFrRkJhMEk3T3pzN096czdPenM3TzBGRGVFSk1PMEZCUTJJc09FTkJRVFpETEVOQlFVTXNZMEZCWXl4RlFVRkRPMEZCUXpkRUxHOUNRVUZ2UWp0QlFVTndRanRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEdsRVFVRnBSQ3hsUVVGbE8wRkJRMmhGTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEVOQlFVTTdRVUZEUkN4dlFrRkJiMEk3T3pzN096czdPenM3TzBGRE0wSlFPMEZCUTJJc09FTkJRVFpETEVOQlFVTXNZMEZCWXl4RlFVRkRPMEZCUXpkRUxHbENRVUZwUWp0QlFVTnFRanRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMR0ZCUVdFc1owSkJRV2RDTERaRFFVRTJReXhGUVVGRk8wRkJRelZGTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzYVVKQlFXbENPMEZCUTJwQ08wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hEUVVGRE8wRkJRMFFzYVVKQlFXbENPenM3T3pzN096czdPenRCUXpkSFNqdEJRVU5pTERoRFFVRTJReXhEUVVGRExHTkJRV01zUlVGQlF6dEJRVU0zUkN4dFFrRkJiVUk3UVVGRGJrSTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hEUVVGRE8wRkJRMFE3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMREpDUVVFeVFpeFhRVUZYTzBGQlEzUkRMQ3RDUVVFclFpeHZRa0ZCYjBJN1FVRkRia1E3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFTkJRVU03UVVGRFJDeHRRa0ZCYlVJN096czdPenM3VlVOdVJHNUNPMVZCUTBFN08xVkJSVUU3VlVGRFFUdFZRVU5CTzFWQlEwRTdWVUZEUVR0VlFVTkJPMVZCUTBFN1ZVRkRRVHRWUVVOQk8xVkJRMEU3VlVGRFFUdFZRVU5CTzFWQlEwRTdPMVZCUlVFN1ZVRkRRVHM3VlVGRlFUdFZRVU5CTzFWQlEwRTdPenM3T3pzN096czdRVU4wUW1FN1FVRkRZaXc0UTBGQk5rTXNRMEZCUXl4alFVRmpMRVZCUVVNN1FVRkROMFFzYVVKQlFXbENPMEZCUTJwQ0xHRkJRV0VzYlVKQlFVOHNRMEZCUXl3MlFrRkJVVHRCUVVNM1FpdzJRMEZCTkVNc1EwRkJReXh4UTBGQmNVTXNlVUpCUVhsQ0xFVkJRVVVzUlVGQlJTeEZRVUZESWl3aVptbHNaU0k2SW1sdVpHVjRMbXB6SWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaUtHWjFibU4wYVc5dUlIZGxZbkJoWTJ0VmJtbDJaWEp6WVd4TmIyUjFiR1ZFWldacGJtbDBhVzl1S0hKdmIzUXNJR1poWTNSdmNua3BJSHRjYmx4MGFXWW9kSGx3Wlc5bUlHVjRjRzl5ZEhNZ1BUMDlJQ2R2WW1wbFkzUW5JQ1ltSUhSNWNHVnZaaUJ0YjJSMWJHVWdQVDA5SUNkdlltcGxZM1FuS1Z4dVhIUmNkRzF2WkhWc1pTNWxlSEJ2Y25SeklEMGdabUZqZEc5eWVTZ3BPMXh1WEhSbGJITmxJR2xtS0hSNWNHVnZaaUJrWldacGJtVWdQVDA5SUNkbWRXNWpkR2x2YmljZ0ppWWdaR1ZtYVc1bExtRnRaQ2xjYmx4MFhIUmtaV1pwYm1Vb1cxMHNJR1poWTNSdmNua3BPMXh1WEhSbGJITmxJR2xtS0hSNWNHVnZaaUJsZUhCdmNuUnpJRDA5UFNBbmIySnFaV04wSnlsY2JseDBYSFJsZUhCdmNuUnpXMXdpWjNWMFpWd2lYU0E5SUdaaFkzUnZjbmtvS1R0Y2JseDBaV3h6WlZ4dVhIUmNkSEp2YjNSYlhDSm5kWFJsWENKZElEMGdabUZqZEc5eWVTZ3BPMXh1ZlNrb2MyVnNaaXdnWm5WdVkzUnBiMjRvS1NCN1hHNXlaWFIxY200Z0lpd2lYQ0oxYzJVZ2MzUnlhV04wWENJN1hHNVBZbXBsWTNRdVpHVm1hVzVsVUhKdmNHVnlkSGtvWlhod2IzSjBjeXdnWENKZlgyVnpUVzlrZFd4bFhDSXNJSHNnZG1Gc2RXVTZJSFJ5ZFdVZ2ZTazdYRzVsZUhCdmNuUnpMbk4wWVhKMFIyRnRaU0E5SUhadmFXUWdNRHRjYm5aaGNpQkNhWFJ0WVhCSmJYQnNYekVnUFNCeVpYRjFhWEpsS0Z3aUxpOXBiWEJzTDBKcGRHMWhjRWx0Y0d4Y0lpazdYRzUyWVhJZ1IzSmhjR2hwWTNOSmJYQnNYekVnUFNCeVpYRjFhWEpsS0Z3aUxpOXBiWEJzTDBkeVlYQm9hV056U1cxd2JGd2lLVHRjYm5aaGNpQlRiM1Z1WkVsdGNHeGZNU0E5SUhKbGNYVnBjbVVvWENJdUwybHRjR3d2VTI5MWJtUkpiWEJzWENJcE8xeHVkbUZ5SUZScGJHVnpaWFJKYlhCc1h6RWdQU0J5WlhGMWFYSmxLRndpTGk5cGJYQnNMMVJwYkdWelpYUkpiWEJzWENJcE8xeHVkbUZ5SUVkQlRVVmZURTlQVUR0Y2JtWjFibU4wYVc5dUlITjBZWEowUjJGdFpTaG5ZVzFsS1NCN1hHNGdJQ0FnUjBGTlJWOU1UMDlRSUQwZ2JtVjNJRWRoYldWTWIyOXdLQ2t1YzNSaGNuUW9aMkZ0WlNrN1hHNTlYRzVsZUhCdmNuUnpMbk4wWVhKMFIyRnRaU0E5SUhOMFlYSjBSMkZ0WlR0Y2JuWmhjaUJIWVcxbFRHOXZjQ0E5SUM4cUtpQkFZMnhoYzNNZ0tpOGdLR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpQWdJQ0JtZFc1amRHbHZiaUJIWVcxbFRHOXZjQ2dwSUh0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTV5WlhOdmRYSmpaWE1nUFNCYlhUdGNiaUFnSUNBZ0lDQWdkR2hwY3k1c1lYTjBSbkpoYldVZ1BTQXdPMXh1SUNBZ0lDQWdJQ0IwYUdsekxtbHVhWFJsWkNBOUlHWmhiSE5sTzF4dUlDQWdJSDFjYmlBZ0lDQkhZVzFsVEc5dmNDNXdjbTkwYjNSNWNHVXVZV3hzVW1WemIzVnlZMlZ6VEc5aFpHVmtJRDBnWm5WdVkzUnBiMjRnS0NrZ2UxeHVJQ0FnSUNBZ0lDQm1iM0lnS0haaGNpQmZhU0E5SURBc0lGOWhJRDBnZEdocGN5NXlaWE52ZFhKalpYTTdJRjlwSUR3Z1gyRXViR1Z1WjNSb095QmZhU3NyS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ2NtVnpiM1Z5WTJVZ1BTQmZZVnRmYVYwN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb0lYSmxjMjkxY21ObExteHZZV1JsWkNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCbVlXeHpaVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdkSEoxWlR0Y2JpQWdJQ0I5TzF4dUlDQWdJRWRoYldWTWIyOXdMbkJ5YjNSdmRIbHdaUzVwYm1sMFVtVnpiM1Z5WTJWelQyNUdhWEp6ZEVOc2FXTnJJRDBnWm5WdVkzUnBiMjRnS0NrZ2UxeHVJQ0FnSUNBZ0lDQnBaaUFvSVhSb2FYTXVZV3hzVW1WemIzVnlZMlZ6VEc5aFpHVmtLQ2twSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJqdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0JwWmlBb0lYUm9hWE11YVc1cGRHVmtLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjBhR2x6TG1sdWFYUmxaQ0E5SUhSeWRXVTdYRzRnSUNBZ0lDQWdJQ0FnSUNCbWIzSWdLSFpoY2lCZmFTQTlJREFzSUY5aElEMGdkR2hwY3k1eVpYTnZkWEpqWlhNN0lGOXBJRHdnWDJFdWJHVnVaM1JvT3lCZmFTc3JLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZG1GeUlISmxjMjkxY21ObElEMGdYMkZiWDJsZE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lISmxjMjkxY21ObExtbHVhWFJQYmtacGNuTjBRMnhwWTJzb0tUdGNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUgwN1hHNGdJQ0FnUjJGdFpVeHZiM0F1Y0hKdmRHOTBlWEJsTG0xdmRYTmxSRzkzYmtoaGJtUnNaWElnUFNCbWRXNWpkR2x2YmlBb2VDd2dlU3dnYVdRcElIdGNiaUFnSUNBZ0lDQWdhV1lnS0dsa0lEMDlQU0IyYjJsa0lEQXBJSHNnYVdRZ1BTQXdPeUI5WEc0Z0lDQWdJQ0FnSUhSb2FYTXVhVzVwZEZKbGMyOTFjbU5sYzA5dVJtbHljM1JEYkdsamF5Z3BPMXh1SUNBZ0lDQWdJQ0IyWVhJZ1kyRnVkbUZ6SUQwZ2RHaHBjeTVuY21Gd2FHbGpjeTVqWVc1MllYTTdYRzRnSUNBZ0lDQWdJR05oYm5aaGN5NW1iMk4xY3lncE8xeHVJQ0FnSUNBZ0lDQjJZWElnZDJsa2RHZ2dQU0JqWVc1MllYTXVZMnhwWlc1MFYybGtkR2c3WEc0Z0lDQWdJQ0FnSUhaaGNpQm9aV2xuYUhRZ1BTQmpZVzUyWVhNdVkyeHBaVzUwU0dWcFoyaDBPMXh1SUNBZ0lDQWdJQ0I0SUQwZ1RXRjBhQzVtYkc5dmNpZ29lQ0F2SUhkcFpIUm9LU0FxSUdOaGJuWmhjeTUzYVdSMGFDazdYRzRnSUNBZ0lDQWdJSGtnUFNCTllYUm9MbVpzYjI5eUtDaDVJQzhnYUdWcFoyaDBLU0FxSUdOaGJuWmhjeTVvWldsbmFIUXBPMXh1SUNBZ0lDQWdJQ0IwYUdsekxtZGhiV1V1YjI1TmIzVnpaVVJ2ZDI0b2RHaHBjeXdnZUN3Z2VTazdYRzRnSUNBZ2ZUdGNiaUFnSUNCSFlXMWxURzl2Y0M1d2NtOTBiM1I1Y0dVdWJXOTFjMlZWY0VoaGJtUnNaWElnUFNCbWRXNWpkR2x2YmlBb2VDd2dlU3dnYVdRcElIdGNiaUFnSUNBZ0lDQWdhV1lnS0dsa0lEMDlQU0IyYjJsa0lEQXBJSHNnYVdRZ1BTQXdPeUI5WEc0Z0lDQWdJQ0FnSUhSb2FYTXVhVzVwZEZKbGMyOTFjbU5sYzA5dVJtbHljM1JEYkdsamF5Z3BPMXh1SUNBZ0lDQWdJQ0IyWVhJZ1kyRnVkbUZ6SUQwZ2RHaHBjeTVuY21Gd2FHbGpjeTVqWVc1MllYTTdYRzRnSUNBZ0lDQWdJSFpoY2lCM2FXUjBhQ0E5SUdOaGJuWmhjeTVqYkdsbGJuUlhhV1IwYUR0Y2JpQWdJQ0FnSUNBZ2RtRnlJR2hsYVdkb2RDQTlJR05oYm5aaGN5NWpiR2xsYm5SSVpXbG5hSFE3WEc0Z0lDQWdJQ0FnSUhnZ1BTQk5ZWFJvTG1ac2IyOXlLQ2g0SUM4Z2QybGtkR2dwSUNvZ1kyRnVkbUZ6TG5kcFpIUm9LVHRjYmlBZ0lDQWdJQ0FnZVNBOUlFMWhkR2d1Wm14dmIzSW9LSGtnTHlCb1pXbG5hSFFwSUNvZ1kyRnVkbUZ6TG1obGFXZG9kQ2s3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVaMkZ0WlM1dmJrMXZkWE5sVlhBb2RHaHBjeXdnZUN3Z2VTazdYRzRnSUNBZ2ZUdGNiaUFnSUNCSFlXMWxURzl2Y0M1d2NtOTBiM1I1Y0dVdWEyVjVSRzkzYmtoaGJtUnNaWElnUFNCbWRXNWpkR2x2YmlBb2EyVjVLU0I3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVhVzVwZEZKbGMyOTFjbU5sYzA5dVJtbHljM1JEYkdsamF5Z3BPMXh1SUNBZ0lDQWdJQ0IwYUdsekxtZGhiV1V1YjI1TFpYbEViM2R1S0hSb2FYTXNJR3RsZVNrN1hHNGdJQ0FnZlR0Y2JpQWdJQ0JIWVcxbFRHOXZjQzV3Y205MGIzUjVjR1V1YTJWNVZYQklZVzVrYkdWeUlEMGdablZ1WTNScGIyNGdLR3RsZVNrZ2UxeHVJQ0FnSUNBZ0lDQjBhR2x6TG1kaGJXVXViMjVMWlhsVmNDaDBhR2x6TENCclpYa3BPMXh1SUNBZ0lIMDdYRzRnSUNBZ1IyRnRaVXh2YjNBdWNISnZkRzkwZVhCbExuTjBZWEowSUQwZ1puVnVZM1JwYjI0Z0tHZGhiV1VwSUh0Y2JpQWdJQ0FnSUNBZ2RtRnlJRjkwYUdseklEMGdkR2hwY3p0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTVuWVcxbElEMGdaMkZ0WlR0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTVuY21Gd2FHbGpjeUE5SUc1bGR5QkhjbUZ3YUdsamMwbHRjR3hmTVM1SGNtRndhR2xqYzBsdGNHd29LVHRjYmlBZ0lDQWdJQ0FnZEdocGN5NW5jbUZ3YUdsamN5NWpZVzUyWVhNdVlXUmtSWFpsYm5STWFYTjBaVzVsY2loY0ltMXZkWE5sWkc5M2Jsd2lMQ0JtZFc1amRHbHZiaUFvWlhabGJuUXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIUnllU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWDNSb2FYTXViVzkxYzJWRWIzZHVTR0Z1Wkd4bGNpaGxkbVZ1ZEM1dlptWnpaWFJZTENCbGRtVnVkQzV2Wm1aelpYUlpLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JsZG1WdWRDNXdjbVYyWlc1MFJHVm1ZWFZzZENncE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHVjJaVzUwTG5OMGIzQlFjbTl3WVdkaGRHbHZiaWdwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0FnSUNBZ1kyRjBZMmdnS0dVcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmpiMjV6YjJ4bExteHZaeWhsS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnZlNrN1hHNGdJQ0FnSUNBZ0lIUm9hWE11WjNKaGNHaHBZM011WTJGdWRtRnpMbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSW9YQ0p0YjNWelpYVndYQ0lzSUdaMWJtTjBhVzl1SUNobGRtVnVkQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdkSEo1SUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCZmRHaHBjeTV0YjNWelpWVndTR0Z1Wkd4bGNpaGxkbVZ1ZEM1dlptWnpaWFJZTENCbGRtVnVkQzV2Wm1aelpYUlpLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JsZG1WdWRDNXdjbVYyWlc1MFJHVm1ZWFZzZENncE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHVjJaVzUwTG5OMGIzQlFjbTl3WVdkaGRHbHZiaWdwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0FnSUNBZ1kyRjBZMmdnS0dVcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmpiMjV6YjJ4bExteHZaeWhsS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnZlNrN1hHNGdJQ0FnSUNBZ0lIZHBibVJ2ZHk1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S0Z3aWEyVjVaRzkzYmx3aUxDQm1kVzVqZEdsdmJpQW9aWFpsYm5RcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUY5MGFHbHpMbXRsZVVSdmQyNUlZVzVrYkdWeUtHVjJaVzUwTG10bGVTazdYRzRnSUNBZ0lDQWdJQ0FnSUNCbGRtVnVkQzV3Y21WMlpXNTBSR1ZtWVhWc2RDZ3BPMXh1SUNBZ0lDQWdJQ0FnSUNBZ1pYWmxiblF1YzNSdmNGQnliM0JoWjJGMGFXOXVLQ2s3WEc0Z0lDQWdJQ0FnSUgwcE8xeHVJQ0FnSUNBZ0lDQjNhVzVrYjNjdVlXUmtSWFpsYm5STWFYTjBaVzVsY2loY0ltdGxlWFZ3WENJc0lHWjFibU4wYVc5dUlDaGxkbVZ1ZENrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnWDNSb2FYTXVhMlY1VlhCSVlXNWtiR1Z5S0dWMlpXNTBMbXRsZVNrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JsZG1WdWRDNXdjbVYyWlc1MFJHVm1ZWFZzZENncE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnWlhabGJuUXVjM1J2Y0ZCeWIzQmhaMkYwYVc5dUtDazdYRzRnSUNBZ0lDQWdJSDBwTzF4dUlDQWdJQ0FnSUNCbllXMWxMbWx1YVhRb2RHaHBjeWs3WEc0Z0lDQWdJQ0FnSUhKbGNYVmxjM1JCYm1sdFlYUnBiMjVHY21GdFpTaG1kVzVqZEdsdmJpQW9LU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQmZkR2hwY3k1c2IyOXdLQ2s3WEc0Z0lDQWdJQ0FnSUgwcE8xeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z2RHaHBjenRjYmlBZ0lDQjlPMXh1SUNBZ0lFZGhiV1ZNYjI5d0xuQnliM1J2ZEhsd1pTNXNiMjl3SUQwZ1puVnVZM1JwYjI0Z0tDa2dlMXh1SUNBZ0lDQWdJQ0IyWVhJZ1gzUm9hWE1nUFNCMGFHbHpPMXh1SUNBZ0lDQWdJQ0IyWVhJZ2JtOTNJRDBnYm1WM0lFUmhkR1VvS1M1blpYUlVhVzFsS0NrN1hHNGdJQ0FnSUNBZ0lIWmhjaUJrWld4MFlTQTlJREE3WEc0Z0lDQWdJQ0FnSUdsbUlDaDBhR2x6TG14aGMzUkdjbUZ0WlNBaFBUMGdNQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdaR1ZzZEdFZ1BTQnViM2NnTFNCMGFHbHpMbXhoYzNSR2NtRnRaVHRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNCMGFHbHpMbXhoYzNSR2NtRnRaU0E5SUc1dmR6dGNiaUFnSUNBZ0lDQWdkR2hwY3k1bllXMWxMblZ3WkdGMFpTaDBhR2x6TENCa1pXeDBZU2s3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVaMkZ0WlM1eVpXNWtaWElvZEdocGN5d2dkR2hwY3k1bmNtRndhR2xqY3lrN1hHNGdJQ0FnSUNBZ0lISmxjWFZsYzNSQmJtbHRZWFJwYjI1R2NtRnRaU2htZFc1amRHbHZiaUFvS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JmZEdocGN5NXNiMjl3S0NrN1hHNGdJQ0FnSUNBZ0lIMHBPMXh1SUNBZ0lIMDdYRzRnSUNBZ1IyRnRaVXh2YjNBdWNISnZkRzkwZVhCbExteHZZV1JOZFhOcFl5QTlJR1oxYm1OMGFXOXVJQ2gxY213cElIdGNiaUFnSUNBZ0lDQWdkbUZ5SUhOdmRXNWtJRDBnYm1WM0lGTnZkVzVrU1cxd2JGOHhMbE52ZFc1a1NXMXdiQ2gxY213c0lIUnlkV1VwTzF4dUlDQWdJQ0FnSUNCMGFHbHpMbkpsYzI5MWNtTmxjeTV3ZFhOb0tITnZkVzVrS1R0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUhOdmRXNWtPMXh1SUNBZ0lIMDdYRzRnSUNBZ1IyRnRaVXh2YjNBdWNISnZkRzkwZVhCbExteHZZV1JUYjNWdVpDQTlJR1oxYm1OMGFXOXVJQ2gxY213cElIdGNiaUFnSUNBZ0lDQWdkbUZ5SUhOdmRXNWtJRDBnYm1WM0lGTnZkVzVrU1cxd2JGOHhMbE52ZFc1a1NXMXdiQ2gxY213c0lHWmhiSE5sS1R0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTV5WlhOdmRYSmpaWE11Y0hWemFDaHpiM1Z1WkNrN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCemIzVnVaRHRjYmlBZ0lDQjlPMXh1SUNBZ0lFZGhiV1ZNYjI5d0xuQnliM1J2ZEhsd1pTNXNiMkZrUW1sMGJXRndJRDBnWm5WdVkzUnBiMjRnS0hWeWJDa2dlMXh1SUNBZ0lDQWdJQ0IyWVhJZ1ltbDBiV0Z3SUQwZ2JtVjNJRUpwZEcxaGNFbHRjR3hmTVM1Q2FYUnRZWEJKYlhCc0tIVnliQ2s3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVjbVZ6YjNWeVkyVnpMbkIxYzJnb1ltbDBiV0Z3S1R0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUdKcGRHMWhjRHRjYmlBZ0lDQjlPMXh1SUNBZ0lFZGhiV1ZNYjI5d0xuQnliM1J2ZEhsd1pTNXNiMkZrVkdsc1pYTmxkQ0E5SUdaMWJtTjBhVzl1SUNoMWNtd3NJSFJwYkdWWGFXUjBhQ3dnZEdsc1pVaGxhV2RvZENrZ2UxeHVJQ0FnSUNBZ0lDQjJZWElnZEdsc1pYTmxkQ0E5SUc1bGR5QlVhV3hsYzJWMFNXMXdiRjh4TGxScGJHVnpaWFJKYlhCc0tIVnliQ3dnZEdsc1pWZHBaSFJvTENCMGFXeGxTR1ZwWjJoMEtUdGNiaUFnSUNBZ0lDQWdkR2hwY3k1eVpYTnZkWEpqWlhNdWNIVnphQ2gwYVd4bGMyVjBLVHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJSFJwYkdWelpYUTdYRzRnSUNBZ2ZUdGNiaUFnSUNCeVpYUjFjbTRnUjJGdFpVeHZiM0E3WEc1OUtDa3BPMXh1SWl3aVhDSjFjMlVnYzNSeWFXTjBYQ0k3WEc1UFltcGxZM1F1WkdWbWFXNWxVSEp2Y0dWeWRIa29aWGh3YjNKMGN5d2dYQ0pmWDJWelRXOWtkV3hsWENJc0lIc2dkbUZzZFdVNklIUnlkV1VnZlNrN1hHNWxlSEJ2Y25SekxrSnBkRzFoY0VsdGNHd2dQU0IyYjJsa0lEQTdYRzUyWVhJZ1FtbDBiV0Z3U1cxd2JDQTlJQzhxS2lCQVkyeGhjM01nS2k4Z0tHWjFibU4wYVc5dUlDZ3BJSHRjYmlBZ0lDQm1kVzVqZEdsdmJpQkNhWFJ0WVhCSmJYQnNLSFZ5YkNrZ2UxeHVJQ0FnSUNBZ0lDQjJZWElnWDNSb2FYTWdQU0IwYUdsek8xeHVJQ0FnSUNBZ0lDQjBhR2x6TG5kcFpIUm9JRDBnTUR0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTVvWldsbmFIUWdQU0F3TzF4dUlDQWdJQ0FnSUNCMGFHbHpMbXh2WVdSbFpDQTlJR1poYkhObE8xeHVJQ0FnSUNBZ0lDQjBhR2x6TG1sdFlXZGxJRDBnYm1WM0lFbHRZV2RsS0NrN1hHNGdJQ0FnSUNBZ0lIUm9hWE11YVcxaFoyVXViMjVzYjJGa0lEMGdablZ1WTNScGIyNGdLQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdYM1JvYVhNdWQybGtkR2dnUFNCZmRHaHBjeTVwYldGblpTNTNhV1IwYUR0Y2JpQWdJQ0FnSUNBZ0lDQWdJRjkwYUdsekxtaGxhV2RvZENBOUlGOTBhR2x6TG1sdFlXZGxMbWhsYVdkb2REdGNiaUFnSUNBZ0lDQWdJQ0FnSUY5MGFHbHpMbXh2WVdSbFpDQTlJSFJ5ZFdVN1hHNGdJQ0FnSUNBZ0lIMDdYRzRnSUNBZ0lDQWdJSFJvYVhNdWFXMWhaMlV1YzNKaklEMGdkWEpzTzF4dUlDQWdJSDFjYmlBZ0lDQkNhWFJ0WVhCSmJYQnNMbkJ5YjNSdmRIbHdaUzVwYm1sMFQyNUdhWEp6ZEVOc2FXTnJJRDBnWm5WdVkzUnBiMjRnS0NrZ2UxeHVJQ0FnSUgwN1hHNGdJQ0FnUW1sMGJXRndTVzF3YkM1d2NtOTBiM1I1Y0dVdVoyVjBSSEpoZDJGaWJHVWdQU0JtZFc1amRHbHZiaUFvS1NCN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCMGFHbHpMbWx0WVdkbE8xeHVJQ0FnSUgwN1hHNGdJQ0FnY21WMGRYSnVJRUpwZEcxaGNFbHRjR3c3WEc1OUtDa3BPMXh1Wlhod2IzSjBjeTVDYVhSdFlYQkpiWEJzSUQwZ1FtbDBiV0Z3U1cxd2JEdGNiaUlzSWx3aWRYTmxJSE4wY21samRGd2lPMXh1VDJKcVpXTjBMbVJsWm1sdVpWQnliM0JsY25SNUtHVjRjRzl5ZEhNc0lGd2lYMTlsYzAxdlpIVnNaVndpTENCN0lIWmhiSFZsT2lCMGNuVmxJSDBwTzF4dVpYaHdiM0owY3k1SGNtRndhR2xqYzBsdGNHd2dQU0IyYjJsa0lEQTdYRzUyWVhJZ2FYTkdhWEpsWm05NElEMGdkSGx3Wlc5bUlFbHVjM1JoYkd4VWNtbG5aMlZ5SUNFOVBTQW5kVzVrWldacGJtVmtKenRjYm5aaGNpQkhjbUZ3YUdsamMwbHRjR3dnUFNBdktpb2dRR05zWVhOeklDb3ZJQ2htZFc1amRHbHZiaUFvS1NCN1hHNGdJQ0FnWm5WdVkzUnBiMjRnUjNKaGNHaHBZM05KYlhCc0tDa2dlMXh1SUNBZ0lDQWdJQ0IwYUdsekxtTmhiblpoY3lBOUlHUnZZM1Z0Wlc1MExtZGxkRVZzWlcxbGJuUkNlVWxrS0Z3aVoyRnRaV05oYm5aaGMxd2lLVHRjYmlBZ0lDQWdJQ0FnZEdocGN5NWpkSGdnUFNCMGFHbHpMbU5oYm5aaGN5NW5aWFJEYjI1MFpYaDBLRndpTW1SY0lpd2dleUJoYkhCb1lUb2dabUZzYzJVZ2ZTazdYRzRnSUNBZ0lDQWdJSFJvYVhNdVkzUjRMbmRsWW10cGRFbHRZV2RsVTIxdmIzUm9hVzVuUlc1aFlteGxaQ0E5SUdaaGJITmxPMXh1SUNBZ0lDQWdJQ0IwYUdsekxtTjBlQzV0YjNwSmJXRm5aVk50YjI5MGFHbHVaMFZ1WVdKc1pXUWdQU0JtWVd4elpUdGNiaUFnSUNBZ0lDQWdkR2hwY3k1amRIZ3VhVzFoWjJWVGJXOXZkR2hwYm1kRmJtRmliR1ZrSUQwZ1ptRnNjMlU3WEc0Z0lDQWdJQ0FnSUdsbUlDaHBjMFpwY21WbWIzZ3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIUm9hWE11WTJGdWRtRnpMbk4wZVd4bExtbHRZV2RsVW1WdVpHVnlhVzVuSUQwZ1hDSmpjbWx6Y0MxbFpHZGxjMXdpTzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lHVnNjMlVnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdkR2hwY3k1allXNTJZWE11YzNSNWJHVXVhVzFoWjJWU1pXNWtaWEpwYm1jZ1BTQmNJbkJwZUdWc1lYUmxaRndpTzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnZlZ4dUlDQWdJRWR5WVhCb2FXTnpTVzF3YkM1d2NtOTBiM1I1Y0dVdVptbHNiRkpsWTNRZ1BTQm1kVzVqZEdsdmJpQW9lQ3dnZVN3Z2QybGtkR2dzSUdobGFXZG9kQ3dnWTI5c0tTQjdYRzRnSUNBZ0lDQWdJSFJvYVhNdVkzUjRMbVpwYkd4VGRIbHNaU0E5SUdOdmJEdGNiaUFnSUNBZ0lDQWdkR2hwY3k1amRIZ3VabWxzYkZKbFkzUW9lQ3dnZVN3Z2QybGtkR2dzSUdobGFXZG9kQ2s3WEc0Z0lDQWdmVHRjYmlBZ0lDQkhjbUZ3YUdsamMwbHRjR3d1Y0hKdmRHOTBlWEJsTG1SeVlYZENhWFJ0WVhBZ1BTQm1kVzVqZEdsdmJpQW9lQ3dnZVN3Z1ltbDBiV0Z3S1NCN1hHNGdJQ0FnSUNBZ0lIUm9hWE11WTNSNExtUnlZWGRKYldGblpTaGlhWFJ0WVhBdVoyVjBSSEpoZDJGaWJHVW9LU3dnZUN3Z2VTazdYRzRnSUNBZ2ZUdGNiaUFnSUNCeVpYUjFjbTRnUjNKaGNHaHBZM05KYlhCc08xeHVmU2dwS1R0Y2JtVjRjRzl5ZEhNdVIzSmhjR2hwWTNOSmJYQnNJRDBnUjNKaGNHaHBZM05KYlhCc08xeHVJaXdpWENKMWMyVWdjM1J5YVdOMFhDSTdYRzVQWW1wbFkzUXVaR1ZtYVc1bFVISnZjR1Z5ZEhrb1pYaHdiM0owY3l3Z1hDSmZYMlZ6VFc5a2RXeGxYQ0lzSUhzZ2RtRnNkV1U2SUhSeWRXVWdmU2s3WEc1bGVIQnZjblJ6TGxOdmRXNWtTVzF3YkNBOUlIWnZhV1FnTUR0Y2JuWmhjaUJCZFdScGIwTnZiblJsZUhRZ1BTQjNhVzVrYjNjdVFYVmthVzlEYjI1MFpYaDBJSHg4SUhkcGJtUnZkeTUzWldKcmFYUkJkV1JwYjBOdmJuUmxlSFE3WEc1MllYSWdRVlZFU1U5ZlEwOU9WRVZZVkR0Y2JtWjFibU4wYVc5dUlHaGhibVJzWlZacGMybGlhV3hwZEhsRGFHRnVaMlVvS1NCN1hHNGdJQ0FnYVdZZ0tGTnZkVzVrU1cxd2JDNURWVkpTUlU1VVgwMVZVMGxES1NCN1hHNGdJQ0FnSUNBZ0lHbG1JQ2hrYjJOMWJXVnVkQzVvYVdSa1pXNHBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lGTnZkVzVrU1cxd2JDNURWVkpTUlU1VVgwMVZVMGxETG5OMGIzQW9LVHRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lGTnZkVzVrU1cxd2JDNURWVkpTUlU1VVgwMVZVMGxETG5Cc1lYa29VMjkxYm1SSmJYQnNMa05WVWxKRlRsUmZUVlZUU1VNdWRtOXNkVzFsS1R0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUgxY2JuMWNibVJ2WTNWdFpXNTBMbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSW9YQ0oyYVhOcFltbHNhWFI1WTJoaGJtZGxYQ0lzSUdoaGJtUnNaVlpwYzJsaWFXeHBkSGxEYUdGdVoyVXBPMXh1ZG1GeUlGTnZkVzVrU1cxd2JDQTlJQzhxS2lCQVkyeGhjM01nS2k4Z0tHWjFibU4wYVc5dUlDZ3BJSHRjYmlBZ0lDQm1kVzVqZEdsdmJpQlRiM1Z1WkVsdGNHd29kWEpzTENCdGRYTnBZeWtnZTF4dUlDQWdJQ0FnSUNCMllYSWdYM1JvYVhNZ1BTQjBhR2x6TzF4dUlDQWdJQ0FnSUNCMGFHbHpMbXh2WVdSbFpDQTlJR1poYkhObE8xeHVJQ0FnSUNBZ0lDQjBhR2x6TG5admJIVnRaU0E5SURFN1hHNGdJQ0FnSUNBZ0lIUm9hWE11YlhWemFXTWdQU0JtWVd4elpUdGNiaUFnSUNBZ0lDQWdkR2hwY3k1MWNtd2dQU0IxY213N1hHNGdJQ0FnSUNBZ0lIUm9hWE11YlhWemFXTWdQU0J0ZFhOcFl6dGNiaUFnSUNBZ0lDQWdkbUZ5SUhKbGNTQTlJRzVsZHlCWVRVeElkSFJ3VW1WeGRXVnpkQ2dwTzF4dUlDQWdJQ0FnSUNCeVpYRXViM0JsYmloY0lrZEZWRndpTENCMWNtd3NJSFJ5ZFdVcE8xeHVJQ0FnSUNBZ0lDQnlaWEV1Y21WemNHOXVjMlZVZVhCbElEMGdYQ0poY25KaGVXSjFabVpsY2x3aU8xeHVJQ0FnSUNBZ0lDQnlaWEV1YjI1c2IyRmtJRDBnWm5WdVkzUnBiMjRnS0dWMlpXNTBLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjJZWElnWVhKeVlYbENkV1ptWlhJZ1BTQnlaWEV1Y21WemNHOXVjMlU3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvWVhKeVlYbENkV1ptWlhJcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmZkR2hwY3k1a1lYUmhJRDBnWVhKeVlYbENkV1ptWlhJN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1gzUm9hWE11Ykc5aFpHVmtJRDBnZEhKMVpUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmZkR2hwY3k1MGNubE1iMkZrS0NrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUgwN1hHNGdJQ0FnSUNBZ0lISmxjUzV6Wlc1a0tHNTFiR3dwTzF4dUlDQWdJSDFjYmlBZ0lDQlRiM1Z1WkVsdGNHd3VjSEp2ZEc5MGVYQmxMblJ5ZVV4dllXUWdQU0JtZFc1amRHbHZiaUFvS1NCN1hHNGdJQ0FnSUNBZ0lIWmhjaUJmZEdocGN5QTlJSFJvYVhNN1hHNGdJQ0FnSUNBZ0lHbG1JQ2hCVlVSSlQxOURUMDVVUlZoVUlDWW1JSFJvYVhNdVpHRjBZU2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdRVlZFU1U5ZlEwOU9WRVZZVkM1a1pXTnZaR1ZCZFdScGIwUmhkR0VvZEdocGN5NWtZWFJoTENCbWRXNWpkR2x2YmlBb1luVm1abVZ5S1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1gzUm9hWE11WW5WbVptVnlJRDBnWW5WbVptVnlPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2xtSUNoVGIzVnVaRWx0Y0d3dVExVlNVa1ZPVkY5TlZWTkpReUE5UFQwZ1gzUm9hWE1wSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdVMjkxYm1SSmJYQnNMa05WVWxKRlRsUmZUVlZUU1VNZ1BTQnVkV3hzTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmZkR2hwY3k1d2JHRjVLRjkwYUdsekxuWnZiSFZ0WlNrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQWdJQ0FnZlN3Z1puVnVZM1JwYjI0Z0tHVXBJSHNnWTI5dWMyOXNaUzVzYjJjb1hDSkdZV2xzWldRZ2RHOGdiRzloWkRvZ1hDSWdLeUJmZEdocGN5NTFjbXdwT3lCOUtUdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lIMDdYRzRnSUNBZ1UyOTFibVJKYlhCc0xuQnliM1J2ZEhsd1pTNXBibWwwVDI1R2FYSnpkRU5zYVdOcklEMGdablZ1WTNScGIyNGdLQ2tnZTF4dUlDQWdJQ0FnSUNCcFppQW9JVUZWUkVsUFgwTlBUbFJGV0ZRcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUVGVlJFbFBYME5QVGxSRldGUWdQU0J1WlhjZ1FYVmthVzlEYjI1MFpYaDBLQ2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQkJWVVJKVDE5RFQwNVVSVmhVTG5KbGMzVnRaU2dwTzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lIUm9hWE11ZEhKNVRHOWhaQ2dwTzF4dUlDQWdJSDA3WEc0Z0lDQWdVMjkxYm1SSmJYQnNMbkJ5YjNSdmRIbHdaUzV3YkdGNUlEMGdablZ1WTNScGIyNGdLSFp2YkhWdFpTa2dlMXh1SUNBZ0lDQWdJQ0IwYUdsekxuWnZiSFZ0WlNBOUlIWnZiSFZ0WlR0Y2JpQWdJQ0FnSUNBZ2FXWWdLQ0YwYUdsekxtSjFabVpsY2lrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnYVdZZ0tIUm9hWE11YlhWemFXTXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JUYjNWdVpFbHRjR3d1UTFWU1VrVk9WRjlOVlZOSlF5QTlJSFJvYVhNN1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200N1hHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdhV1lnS0hSb2FYTXViWFZ6YVdNcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUlDaFRiM1Z1WkVsdGNHd3VRMVZTVWtWT1ZGOU5WVk5KUXlBaFBUMGdkR2hwY3lrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2hUYjNWdVpFbHRjR3d1UTFWU1VrVk9WRjlOVlZOSlF5a2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCVGIzVnVaRWx0Y0d3dVExVlNVa1ZPVkY5TlZWTkpReTV6ZEc5d0tDazdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRk52ZFc1a1NXMXdiQzVEVlZKU1JVNVVYMDFWVTBsRElEMGdkR2hwY3p0Y2JpQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2gwYUdsekxuTnZkWEpqWlNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5Ymp0Y2JpQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNCMGFHbHpMbk52ZFhKalpTQTlJRUZWUkVsUFgwTlBUbFJGV0ZRdVkzSmxZWFJsUW5WbVptVnlVMjkxY21ObEtDazdYRzRnSUNBZ0lDQWdJSFJvYVhNdWMyOTFjbU5sTG1KMVptWmxjaUE5SUhSb2FYTXVZblZtWm1WeU8xeHVJQ0FnSUNBZ0lDQjBhR2x6TG1kaGFXNGdQU0JCVlVSSlQxOURUMDVVUlZoVUxtTnlaV0YwWlVkaGFXNG9LVHRjYmlBZ0lDQWdJQ0FnZEdocGN5NXpiM1Z5WTJVdVkyOXVibVZqZENoMGFHbHpMbWRoYVc0cE8xeHVJQ0FnSUNBZ0lDQjBhR2x6TG1kaGFXNHVZMjl1Ym1WamRDaEJWVVJKVDE5RFQwNVVSVmhVTG1SbGMzUnBibUYwYVc5dUtUdGNiaUFnSUNBZ0lDQWdhV1lnS0hSb2FYTXViWFZ6YVdNcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhSb2FYTXVaMkZwYmk1bllXbHVMblpoYkhWbElEMGdNRHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIUm9hWE11YzI5MWNtTmxMbXh2YjNBZ1BTQjBjblZsTzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lIUm9hWE11YzI5MWNtTmxMbk4wWVhKMEtEQXBPMXh1SUNBZ0lDQWdJQ0JwWmlBb2RHaHBjeTV0ZFhOcFl5a2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2RHaHBjeTVuWVdsdUxtZGhhVzR1YkdsdVpXRnlVbUZ0Y0ZSdlZtRnNkV1ZCZEZScGJXVW9kbTlzZFcxbExDQkJWVVJKVDE5RFQwNVVSVmhVTG1OMWNuSmxiblJVYVcxbElDc2dNaWs3WEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ1pXeHpaU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjBhR2x6TG1kaGFXNHVaMkZwYmk1MllXeDFaU0E5SUhadmJIVnRaVHRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJSDA3WEc0Z0lDQWdVMjkxYm1SSmJYQnNMbkJ5YjNSdmRIbHdaUzV6ZEc5d0lEMGdablZ1WTNScGIyNGdLQ2tnZTF4dUlDQWdJQ0FnSUNCcFppQW9kR2hwY3k1emIzVnlZMlVwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR2xtSUNoMGFHbHpMbTExYzJsaktTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkR2hwY3k1bllXbHVMbWRoYVc0dWJHbHVaV0Z5VW1GdGNGUnZWbUZzZFdWQmRGUnBiV1VvTUN3Z1FWVkVTVTlmUTA5T1ZFVllWQzVqZFhKeVpXNTBWR2x0WlNBcklETXBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCMFpXMXdVMjkxY21ObFh6RWdQU0IwYUdsekxuTnZkWEpqWlR0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCelpYUlVhVzFsYjNWMEtHWjFibU4wYVc5dUlDZ3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RHVnRjRk52ZFhKalpWOHhMbk4wYjNBb0tUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlMQ0EwTURBd0tUdGNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQWdJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIUm9hWE11YzI5MWNtTmxMbk4wYjNBb0tUdGNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQWdJSFJvYVhNdWMyOTFjbU5sSUQwZ2JuVnNiRHRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJSDA3WEc0Z0lDQWdjbVYwZFhKdUlGTnZkVzVrU1cxd2JEdGNibjBvS1NrN1hHNWxlSEJ2Y25SekxsTnZkVzVrU1cxd2JDQTlJRk52ZFc1a1NXMXdiRHRjYmlJc0lsd2lkWE5sSUhOMGNtbGpkRndpTzF4dVQySnFaV04wTG1SbFptbHVaVkJ5YjNCbGNuUjVLR1Y0Y0c5eWRITXNJRndpWDE5bGMwMXZaSFZzWlZ3aUxDQjdJSFpoYkhWbE9pQjBjblZsSUgwcE8xeHVaWGh3YjNKMGN5NVVhV3hsYzJWMFNXMXdiQ0E5SUhadmFXUWdNRHRjYm5aaGNpQlVhV3hsSUQwZ0x5b3FJRUJqYkdGemN5QXFMeUFvWm5WdVkzUnBiMjRnS0NrZ2UxeHVJQ0FnSUdaMWJtTjBhVzl1SUZScGJHVW9ZMkZ1ZG1GektTQjdYRzRnSUNBZ0lDQWdJSFJvYVhNdVkyRnVkbUZ6SUQwZ1kyRnVkbUZ6TzF4dUlDQWdJQ0FnSUNCMGFHbHpMbmRwWkhSb0lEMGdZMkZ1ZG1GekxuZHBaSFJvTzF4dUlDQWdJQ0FnSUNCMGFHbHpMbWhsYVdkb2RDQTlJR05oYm5aaGN5NW9aV2xuYUhRN1hHNGdJQ0FnSUNBZ0lIUm9hWE11Ykc5aFpHVmtJRDBnZEhKMVpUdGNiaUFnSUNCOVhHNGdJQ0FnVkdsc1pTNXdjbTkwYjNSNWNHVXVaMlYwUkhKaGQyRmliR1VnUFNCbWRXNWpkR2x2YmlBb0tTQjdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQjBhR2x6TG1OaGJuWmhjenRjYmlBZ0lDQjlPMXh1SUNBZ0lGUnBiR1V1Y0hKdmRHOTBlWEJsTG1sdWFYUlBia1pwY25OMFEyeHBZMnNnUFNCbWRXNWpkR2x2YmlBb0tTQjdYRzRnSUNBZ2ZUdGNiaUFnSUNCeVpYUjFjbTRnVkdsc1pUdGNibjBvS1NrN1hHNTJZWElnVkdsc1pYTmxkRWx0Y0d3Z1BTQXZLaW9nUUdOc1lYTnpJQ292SUNobWRXNWpkR2x2YmlBb0tTQjdYRzRnSUNBZ1puVnVZM1JwYjI0Z1ZHbHNaWE5sZEVsdGNHd29kWEpzTENCMGFXeGxWMmxrZEdnc0lIUnBiR1ZJWldsbmFIUXBJSHRjYmlBZ0lDQWdJQ0FnZG1GeUlGOTBhR2x6SUQwZ2RHaHBjenRjYmlBZ0lDQWdJQ0FnZEdocGN5NXNiMkZrWldRZ1BTQm1ZV3h6WlR0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTVpYVhSdFlYQnpJRDBnVzEwN1hHNGdJQ0FnSUNBZ0lIUm9hWE11YzJOaGJteHBibVVnUFNBd08xeHVJQ0FnSUNBZ0lDQjBhR2x6TG5ScGJHVlhhV1IwYUNBOUlIUnBiR1ZYYVdSMGFEdGNiaUFnSUNBZ0lDQWdkR2hwY3k1MGFXeGxTR1ZwWjJoMElEMGdkR2xzWlVobGFXZG9kRHRjYmlBZ0lDQWdJQ0FnZEdocGN5NXBiV0ZuWlNBOUlHNWxkeUJKYldGblpTZ3BPMXh1SUNBZ0lDQWdJQ0IwYUdsekxtbHRZV2RsTG05dWJHOWhaQ0E5SUdaMWJtTjBhVzl1SUNncElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhaaGNpQmZZVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lGOTBhR2x6TG5OallXNXNhVzVsSUQwZ1RXRjBhQzVtYkc5dmNpaGZkR2hwY3k1cGJXRm5aUzUzYVdSMGFDQXZJSFJwYkdWWGFXUjBhQ2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjJZWElnWkdWd2RHZ2dQU0JOWVhSb0xtWnNiMjl5S0Y5MGFHbHpMbWx0WVdkbExtaGxhV2RvZENBdklIUnBiR1ZJWldsbmFIUXBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0x5OGdZM1YwSUhSb1pTQnBiV0ZuWlNCcGJuUnZJSEJwWldObGMxeHVJQ0FnSUNBZ0lDQWdJQ0FnWm05eUlDaDJZWElnZVNBOUlEQTdJSGtnUENCa1pYQjBhRHNnZVNzcktTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdabTl5SUNoMllYSWdlQ0E5SURBN0lIZ2dQQ0JmZEdocGN5NXpZMkZ1YkdsdVpUc2dlQ3NyS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCallXNTJZWE1nUFNCa2IyTjFiV1Z1ZEM1amNtVmhkR1ZGYkdWdFpXNTBLRndpWTJGdWRtRnpYQ0lwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmpZVzUyWVhNdWQybGtkR2dnUFNCMGFXeGxWMmxrZEdnN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR05oYm5aaGN5NW9aV2xuYUhRZ1BTQjBhV3hsU0dWcFoyaDBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBb1gyRWdQU0JqWVc1MllYTXVaMlYwUTI5dWRHVjRkQ2hjSWpKa1hDSXBLU0E5UFQwZ2JuVnNiQ0I4ZkNCZllTQTlQVDBnZG05cFpDQXdJRDhnZG05cFpDQXdJRG9nWDJFdVpISmhkMGx0WVdkbEtGOTBhR2x6TG1sdFlXZGxMQ0F0ZUNBcUlIUnBiR1ZYYVdSMGFDd2dMWGtnS2lCMGFXeGxTR1ZwWjJoMEtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWDNSb2FYTXVZbWwwYldGd2N5NXdkWE5vS0c1bGR5QlVhV3hsS0dOaGJuWmhjeWtwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSUNBZ0lGOTBhR2x6TG14dllXUmxaQ0E5SUhSeWRXVTdYRzRnSUNBZ0lDQWdJSDA3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVhVzFoWjJVdWMzSmpJRDBnZFhKc08xeHVJQ0FnSUgxY2JpQWdJQ0JVYVd4bGMyVjBTVzF3YkM1d2NtOTBiM1I1Y0dVdWFXNXBkRTl1Um1seWMzUkRiR2xqYXlBOUlHWjFibU4wYVc5dUlDZ3BJSHRjYmlBZ0lDQjlPMXh1SUNBZ0lGUnBiR1Z6WlhSSmJYQnNMbkJ5YjNSdmRIbHdaUzVuWlhSVWFXeGxJRDBnWm5WdVkzUnBiMjRnS0hScGJHVXBJSHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJSFJvYVhNdVltbDBiV0Z3YzF0MGFXeGxYVHRjYmlBZ0lDQjlPMXh1SUNBZ0lISmxkSFZ5YmlCVWFXeGxjMlYwU1cxd2JEdGNibjBvS1NrN1hHNWxlSEJ2Y25SekxsUnBiR1Z6WlhSSmJYQnNJRDBnVkdsc1pYTmxkRWx0Y0d3N1hHNGlMQ0l2THlCVWFHVWdiVzlrZFd4bElHTmhZMmhsWEc1MllYSWdYMTkzWldKd1lXTnJYMjF2WkhWc1pWOWpZV05vWlY5ZklEMGdlMzA3WEc1Y2JpOHZJRlJvWlNCeVpYRjFhWEpsSUdaMWJtTjBhVzl1WEc1bWRXNWpkR2x2YmlCZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZktHMXZaSFZzWlVsa0tTQjdYRzVjZEM4dklFTm9aV05ySUdsbUlHMXZaSFZzWlNCcGN5QnBiaUJqWVdOb1pWeHVYSFIyWVhJZ1kyRmphR1ZrVFc5a2RXeGxJRDBnWDE5M1pXSndZV05yWDIxdlpIVnNaVjlqWVdOb1pWOWZXMjF2WkhWc1pVbGtYVHRjYmx4MGFXWWdLR05oWTJobFpFMXZaSFZzWlNBaFBUMGdkVzVrWldacGJtVmtLU0I3WEc1Y2RGeDBjbVYwZFhKdUlHTmhZMmhsWkUxdlpIVnNaUzVsZUhCdmNuUnpPMXh1WEhSOVhHNWNkQzh2SUVOeVpXRjBaU0JoSUc1bGR5QnRiMlIxYkdVZ0tHRnVaQ0J3ZFhRZ2FYUWdhVzUwYnlCMGFHVWdZMkZqYUdVcFhHNWNkSFpoY2lCdGIyUjFiR1VnUFNCZlgzZGxZbkJoWTJ0ZmJXOWtkV3hsWDJOaFkyaGxYMTliYlc5a2RXeGxTV1JkSUQwZ2UxeHVYSFJjZEM4dklHNXZJRzF2WkhWc1pTNXBaQ0J1WldWa1pXUmNibHgwWEhRdkx5QnVieUJ0YjJSMWJHVXViRzloWkdWa0lHNWxaV1JsWkZ4dVhIUmNkR1Y0Y0c5eWRITTZJSHQ5WEc1Y2RIMDdYRzVjYmx4MEx5OGdSWGhsWTNWMFpTQjBhR1VnYlc5a2RXeGxJR1oxYm1OMGFXOXVYRzVjZEY5ZmQyVmljR0ZqYTE5dGIyUjFiR1Z6WDE5YmJXOWtkV3hsU1dSZEtHMXZaSFZzWlN3Z2JXOWtkV3hsTG1WNGNHOXlkSE1zSUY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4cE8xeHVYRzVjZEM4dklGSmxkSFZ5YmlCMGFHVWdaWGh3YjNKMGN5QnZaaUIwYUdVZ2JXOWtkV3hsWEc1Y2RISmxkSFZ5YmlCdGIyUjFiR1V1Wlhod2IzSjBjenRjYm4xY2JseHVJaXdpWENKMWMyVWdjM1J5YVdOMFhDSTdYRzVQWW1wbFkzUXVaR1ZtYVc1bFVISnZjR1Z5ZEhrb1pYaHdiM0owY3l3Z1hDSmZYMlZ6VFc5a2RXeGxYQ0lzSUhzZ2RtRnNkV1U2SUhSeWRXVWdmU2s3WEc1bGVIQnZjblJ6TG5OMFlYSjBSMkZ0WlNBOUlIWnZhV1FnTUR0Y2JuWmhjaUJIZFhSbFh6RWdQU0J5WlhGMWFYSmxLRndpTGk5SGRYUmxYQ0lwTzF4dVQySnFaV04wTG1SbFptbHVaVkJ5YjNCbGNuUjVLR1Y0Y0c5eWRITXNJRndpYzNSaGNuUkhZVzFsWENJc0lIc2daVzUxYldWeVlXSnNaVG9nZEhKMVpTd2daMlYwT2lCbWRXNWpkR2x2YmlBb0tTQjdJSEpsZEhWeWJpQkhkWFJsWHpFdWMzUmhjblJIWVcxbE95QjlJSDBwTzF4dUlsMHNJbk52ZFhKalpWSnZiM1FpT2lJaWZRPT0iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVGVzdEdhbWUgPSB2b2lkIDA7XG52YXIgVGVzdEdhbWUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGVzdEdhbWUoKSB7XG4gICAgICAgIHRoaXMubXVzaWNTdGFydGVkID0gZmFsc2U7XG4gICAgfVxuICAgIFRlc3RHYW1lLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgICAgdGhpcy50ZXN0SW1hZ2UgPSBjb250ZXh0LmxvYWRCaXRtYXAoXCJhc3NldHMvdGVzdC5wbmdcIik7XG4gICAgICAgIHRoaXMudGVzdFRpbGVzID0gY29udGV4dC5sb2FkVGlsZXNldChcImFzc2V0cy90aWxlcy5wbmdcIiwgOCwgOCk7XG4gICAgICAgIHRoaXMua2V5U291bmQgPSBjb250ZXh0LmxvYWRTb3VuZChcImFzc2V0cy9jb2luLm1wM1wiKTtcbiAgICAgICAgdGhpcy5tb3VzZVNvdW5kID0gY29udGV4dC5sb2FkU291bmQoXCJhc3NldHMvanVtcC5tcDNcIik7XG4gICAgICAgIHRoaXMubXVzaWMgPSBjb250ZXh0LmxvYWRNdXNpYyhcImFzc2V0cy9tdXNpYy5tcDNcIik7XG4gICAgICAgIHRoaXMubXVzaWMucGxheSgxLjApO1xuICAgIH07XG4gICAgVGVzdEdhbWUucHJvdG90eXBlLm9uTW91c2VEb3duID0gZnVuY3Rpb24gKGNvbnRleHQsIHgsIHkpIHtcbiAgICAgICAgdGhpcy5tb3VzZVNvdW5kLnBsYXkoMS4wKTtcbiAgICB9O1xuICAgIFRlc3RHYW1lLnByb3RvdHlwZS5vbk1vdXNlVXAgPSBmdW5jdGlvbiAoY29udGV4dCwgeCwgeSkge1xuICAgIH07XG4gICAgVGVzdEdhbWUucHJvdG90eXBlLm9uS2V5RG93biA9IGZ1bmN0aW9uIChjb250ZXh0LCBrZXkpIHtcbiAgICAgICAgdGhpcy5rZXlTb3VuZC5wbGF5KDEuMCk7XG4gICAgfTtcbiAgICBUZXN0R2FtZS5wcm90b3R5cGUub25LZXlVcCA9IGZ1bmN0aW9uIChjb250ZXh0LCBrZXkpIHtcbiAgICB9O1xuICAgIFRlc3RHYW1lLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoY29udGV4dCwgZGVsdGEpIHtcbiAgICB9O1xuICAgIFRlc3RHYW1lLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoY29udGV4dCwgZykge1xuICAgICAgICBnLmZpbGxSZWN0KDAsIDAsIDMyMCwgMjQwLCBcImJsYWNrXCIpO1xuICAgICAgICBpZiAoY29udGV4dC5hbGxSZXNvdXJjZXNMb2FkZWQoKSkge1xuICAgICAgICAgICAgZy5kcmF3Qml0bWFwKDEwMCwgMTAwLCB0aGlzLnRlc3RJbWFnZSk7XG4gICAgICAgICAgICBnLmRyYXdCaXRtYXAoMTUwLCAxMDAsIHRoaXMudGVzdFRpbGVzLmdldFRpbGUoMCkpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gVGVzdEdhbWU7XG59KCkpO1xuZXhwb3J0cy5UZXN0R2FtZSA9IFRlc3RHYW1lO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGRpc3RfMSA9IHJlcXVpcmUoXCJndXRlL2Rpc3RcIik7XG52YXIgVGVzdEdhbWVfMSA9IHJlcXVpcmUoXCIuL1Rlc3RHYW1lXCIpO1xuZGlzdF8xLnN0YXJ0R2FtZShuZXcgVGVzdEdhbWVfMS5UZXN0R2FtZSgpKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=