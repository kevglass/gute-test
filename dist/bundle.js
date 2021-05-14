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
dist_1.startGame(new TestGame_1.TestGame());

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ndXRlLXRlc3QvLi9zcmMvVGVzdEdhbWUudHMiLCJ3ZWJwYWNrOi8vZ3V0ZS10ZXN0Ly4uL2d1dGUvZGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly9ndXRlLXRlc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZ3V0ZS10ZXN0Ly4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxnQkFBZ0I7Ozs7Ozs7Ozs7O0FDcENoQjtBQUNBLElBQUksSUFBeUQ7QUFDN0Q7QUFDQSxNQUFNLEVBS3FCO0FBQzNCLENBQUM7QUFDRCx3QkFBd0I7QUFDeEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyw4QkFBbUI7OztBQUc3RCwrQ0FBK0MsY0FBYztBQUM3RDtBQUNBLG1CQUFtQiw4QkFBbUI7QUFDdEMscUJBQXFCLDhCQUFtQjtBQUN4QyxrQkFBa0IsOEJBQW1CO0FBQ3JDLG9CQUFvQiw4QkFBbUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLGdCQUFnQjtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCxnQkFBZ0I7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFFBQVE7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsUUFBUTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRCxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLCtDQUErQyxjQUFjO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7O0FBR0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSwrQ0FBK0MsY0FBYztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELGVBQWU7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7QUFHQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLCtDQUErQyxjQUFjO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGdCQUFnQiw2Q0FBNkMsRUFBRTtBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7QUFHQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLCtDQUErQyxjQUFjO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixXQUFXO0FBQ3RDLCtCQUErQixvQkFBb0I7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7O0FBR0EsT0FBTzs7QUFFUCxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixnQ0FBbUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBaUUsZ0NBQW1CO0FBQ3BGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLCtDQUErQyxjQUFjO0FBQzdEO0FBQ0EsYUFBYSxnQ0FBbUI7QUFDaEMsOENBQThDLHFDQUFxQyx5QkFBeUIsRUFBRSxFQUFFOztBQUVoSCxDQUFDOztBQUVEO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsQ0FBQztBQUNELDJDQUEyQyxjQUFjLG1vc0I7Ozs7OztVQ3BkekQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7Ozs7QUN0QmE7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QsYUFBYSxtQkFBTyxDQUFDLHdDQUFXO0FBQ2hDLGlCQUFpQixtQkFBTyxDQUFDLHFDQUFZO0FBQ3JDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5UZXN0R2FtZSA9IHZvaWQgMDtcbnZhciBUZXN0R2FtZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUZXN0R2FtZSgpIHtcbiAgICAgICAgdGhpcy5tdXNpY1N0YXJ0ZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgVGVzdEdhbWUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgICB0aGlzLnRlc3RJbWFnZSA9IGNvbnRleHQubG9hZEJpdG1hcChcImFzc2V0cy90ZXN0LnBuZ1wiKTtcbiAgICAgICAgdGhpcy50ZXN0VGlsZXMgPSBjb250ZXh0LmxvYWRUaWxlc2V0KFwiYXNzZXRzL3RpbGVzLnBuZ1wiLCA4LCA4KTtcbiAgICAgICAgdGhpcy5rZXlTb3VuZCA9IGNvbnRleHQubG9hZFNvdW5kKFwiYXNzZXRzL2NvaW4ubXAzXCIpO1xuICAgICAgICB0aGlzLm1vdXNlU291bmQgPSBjb250ZXh0LmxvYWRTb3VuZChcImFzc2V0cy9qdW1wLm1wM1wiKTtcbiAgICAgICAgdGhpcy5tdXNpYyA9IGNvbnRleHQubG9hZE11c2ljKFwiYXNzZXRzL211c2ljLm1wM1wiKTtcbiAgICAgICAgdGhpcy5tdXNpYy5wbGF5KDEuMCk7XG4gICAgfTtcbiAgICBUZXN0R2FtZS5wcm90b3R5cGUub25Nb3VzZURvd24gPSBmdW5jdGlvbiAoY29udGV4dCwgeCwgeSkge1xuICAgICAgICB0aGlzLm1vdXNlU291bmQucGxheSgxLjApO1xuICAgIH07XG4gICAgVGVzdEdhbWUucHJvdG90eXBlLm9uTW91c2VVcCA9IGZ1bmN0aW9uIChjb250ZXh0LCB4LCB5KSB7XG4gICAgfTtcbiAgICBUZXN0R2FtZS5wcm90b3R5cGUub25LZXlEb3duID0gZnVuY3Rpb24gKGNvbnRleHQsIGtleSkge1xuICAgICAgICB0aGlzLmtleVNvdW5kLnBsYXkoMS4wKTtcbiAgICB9O1xuICAgIFRlc3RHYW1lLnByb3RvdHlwZS5vbktleVVwID0gZnVuY3Rpb24gKGNvbnRleHQsIGtleSkge1xuICAgIH07XG4gICAgVGVzdEdhbWUucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChjb250ZXh0LCBkZWx0YSkge1xuICAgIH07XG4gICAgVGVzdEdhbWUucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChjb250ZXh0LCBnKSB7XG4gICAgICAgIGcuZmlsbFJlY3QoMCwgMCwgMzIwLCAyNDAsIFwiYmxhY2tcIik7XG4gICAgICAgIGlmIChjb250ZXh0LmFsbFJlc291cmNlc0xvYWRlZCgpKSB7XG4gICAgICAgICAgICBnLmRyYXdCaXRtYXAoMTAwLCAxMDAsIHRoaXMudGVzdEltYWdlKTtcbiAgICAgICAgICAgIGcuZHJhd0JpdG1hcCgxNTAsIDEwMCwgdGhpcy50ZXN0VGlsZXMuZ2V0VGlsZSgwKSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBUZXN0R2FtZTtcbn0oKSk7XG5leHBvcnRzLlRlc3RHYW1lID0gVGVzdEdhbWU7XG4iLCIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJndXRlXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImd1dGVcIl0gPSBmYWN0b3J5KCk7XG59KShzZWxmLCBmdW5jdGlvbigpIHtcbnJldHVybiAvKioqKioqLyAoKCkgPT4geyAvLyB3ZWJwYWNrQm9vdHN0cmFwXG4vKioqKioqLyBcdFwidXNlIHN0cmljdFwiO1xuLyoqKioqKi8gXHR2YXIgX193ZWJwYWNrX21vZHVsZXNfXyA9ICh7XG5cbi8qKiovIFwiLi9zcmMvR3V0ZS50c1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vc3JjL0d1dGUudHMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKi9cbi8qKiovICgoX191bnVzZWRfd2VicGFja19tb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pID0+IHtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsICh7IHZhbHVlOiB0cnVlIH0pKTtcbmV4cG9ydHMuc3RhcnRHYW1lID0gdm9pZCAwO1xudmFyIEJpdG1hcEltcGxfMSA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vaW1wbC9CaXRtYXBJbXBsICovIFwiLi9zcmMvaW1wbC9CaXRtYXBJbXBsLnRzXCIpO1xudmFyIEdyYXBoaWNzSW1wbF8xID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi9pbXBsL0dyYXBoaWNzSW1wbCAqLyBcIi4vc3JjL2ltcGwvR3JhcGhpY3NJbXBsLnRzXCIpO1xudmFyIFNvdW5kSW1wbF8xID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi9pbXBsL1NvdW5kSW1wbCAqLyBcIi4vc3JjL2ltcGwvU291bmRJbXBsLnRzXCIpO1xudmFyIFRpbGVzZXRJbXBsXzEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL2ltcGwvVGlsZXNldEltcGwgKi8gXCIuL3NyYy9pbXBsL1RpbGVzZXRJbXBsLnRzXCIpO1xudmFyIEdBTUVfTE9PUDtcbmZ1bmN0aW9uIHN0YXJ0R2FtZShnYW1lKSB7XG4gICAgR0FNRV9MT09QID0gbmV3IEdhbWVMb29wKCkuc3RhcnQoZ2FtZSk7XG59XG5leHBvcnRzLnN0YXJ0R2FtZSA9IHN0YXJ0R2FtZTtcbnZhciBHYW1lTG9vcCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBHYW1lTG9vcCgpIHtcbiAgICAgICAgdGhpcy5yZXNvdXJjZXMgPSBbXTtcbiAgICAgICAgdGhpcy5sYXN0RnJhbWUgPSAwO1xuICAgICAgICB0aGlzLmluaXRlZCA9IGZhbHNlO1xuICAgIH1cbiAgICBHYW1lTG9vcC5wcm90b3R5cGUuYWxsUmVzb3VyY2VzTG9hZGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy5yZXNvdXJjZXM7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YXIgcmVzb3VyY2UgPSBfYVtfaV07XG4gICAgICAgICAgICBpZiAoIXJlc291cmNlLmxvYWRlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIEdhbWVMb29wLnByb3RvdHlwZS5pbml0UmVzb3VyY2VzT25GaXJzdENsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuYWxsUmVzb3VyY2VzTG9hZGVkKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuaW5pdGVkKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRlZCA9IHRydWU7XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy5yZXNvdXJjZXM7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc291cmNlID0gX2FbX2ldO1xuICAgICAgICAgICAgICAgIHJlc291cmNlLmluaXRPbkZpcnN0Q2xpY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgR2FtZUxvb3AucHJvdG90eXBlLm1vdXNlRG93bkhhbmRsZXIgPSBmdW5jdGlvbiAoeCwgeSwgaWQpIHtcbiAgICAgICAgaWYgKGlkID09PSB2b2lkIDApIHsgaWQgPSAwOyB9XG4gICAgICAgIHRoaXMuaW5pdFJlc291cmNlc09uRmlyc3RDbGljaygpO1xuICAgICAgICB2YXIgY2FudmFzID0gdGhpcy5ncmFwaGljcy5jYW52YXM7XG4gICAgICAgIGNhbnZhcy5mb2N1cygpO1xuICAgICAgICB2YXIgd2lkdGggPSBjYW52YXMuY2xpZW50V2lkdGg7XG4gICAgICAgIHZhciBoZWlnaHQgPSBjYW52YXMuY2xpZW50SGVpZ2h0O1xuICAgICAgICB4ID0gTWF0aC5mbG9vcigoeCAvIHdpZHRoKSAqIGNhbnZhcy53aWR0aCk7XG4gICAgICAgIHkgPSBNYXRoLmZsb29yKCh5IC8gaGVpZ2h0KSAqIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgICB0aGlzLmdhbWUub25Nb3VzZURvd24odGhpcywgeCwgeSk7XG4gICAgfTtcbiAgICBHYW1lTG9vcC5wcm90b3R5cGUubW91c2VVcEhhbmRsZXIgPSBmdW5jdGlvbiAoeCwgeSwgaWQpIHtcbiAgICAgICAgaWYgKGlkID09PSB2b2lkIDApIHsgaWQgPSAwOyB9XG4gICAgICAgIHRoaXMuaW5pdFJlc291cmNlc09uRmlyc3RDbGljaygpO1xuICAgICAgICB2YXIgY2FudmFzID0gdGhpcy5ncmFwaGljcy5jYW52YXM7XG4gICAgICAgIHZhciB3aWR0aCA9IGNhbnZhcy5jbGllbnRXaWR0aDtcbiAgICAgICAgdmFyIGhlaWdodCA9IGNhbnZhcy5jbGllbnRIZWlnaHQ7XG4gICAgICAgIHggPSBNYXRoLmZsb29yKCh4IC8gd2lkdGgpICogY2FudmFzLndpZHRoKTtcbiAgICAgICAgeSA9IE1hdGguZmxvb3IoKHkgLyBoZWlnaHQpICogY2FudmFzLmhlaWdodCk7XG4gICAgICAgIHRoaXMuZ2FtZS5vbk1vdXNlVXAodGhpcywgeCwgeSk7XG4gICAgfTtcbiAgICBHYW1lTG9vcC5wcm90b3R5cGUua2V5RG93bkhhbmRsZXIgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHRoaXMuaW5pdFJlc291cmNlc09uRmlyc3RDbGljaygpO1xuICAgICAgICB0aGlzLmdhbWUub25LZXlEb3duKHRoaXMsIGtleSk7XG4gICAgfTtcbiAgICBHYW1lTG9vcC5wcm90b3R5cGUua2V5VXBIYW5kbGVyID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICB0aGlzLmdhbWUub25LZXlVcCh0aGlzLCBrZXkpO1xuICAgIH07XG4gICAgR2FtZUxvb3AucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24gKGdhbWUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICAgICAgdGhpcy5ncmFwaGljcyA9IG5ldyBHcmFwaGljc0ltcGxfMS5HcmFwaGljc0ltcGwoKTtcbiAgICAgICAgdGhpcy5ncmFwaGljcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgX3RoaXMubW91c2VEb3duSGFuZGxlcihldmVudC5vZmZzZXRYLCBldmVudC5vZmZzZXRZKTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZ3JhcGhpY3MuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBfdGhpcy5tb3VzZVVwSGFuZGxlcihldmVudC5vZmZzZXRYLCBldmVudC5vZmZzZXRZKTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIF90aGlzLmtleURvd25IYW5kbGVyKGV2ZW50LmtleSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgX3RoaXMua2V5VXBIYW5kbGVyKGV2ZW50LmtleSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBnYW1lLmluaXQodGhpcyk7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5sb29wKCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEdhbWVMb29wLnByb3RvdHlwZS5sb29wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIHZhciBkZWx0YSA9IDA7XG4gICAgICAgIGlmICh0aGlzLmxhc3RGcmFtZSAhPT0gMCkge1xuICAgICAgICAgICAgZGVsdGEgPSBub3cgLSB0aGlzLmxhc3RGcmFtZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxhc3RGcmFtZSA9IG5vdztcbiAgICAgICAgdGhpcy5nYW1lLnVwZGF0ZSh0aGlzLCBkZWx0YSk7XG4gICAgICAgIHRoaXMuZ2FtZS5yZW5kZXIodGhpcywgdGhpcy5ncmFwaGljcyk7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5sb29wKCk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgR2FtZUxvb3AucHJvdG90eXBlLmxvYWRNdXNpYyA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgICAgdmFyIHNvdW5kID0gbmV3IFNvdW5kSW1wbF8xLlNvdW5kSW1wbCh1cmwsIHRydWUpO1xuICAgICAgICB0aGlzLnJlc291cmNlcy5wdXNoKHNvdW5kKTtcbiAgICAgICAgcmV0dXJuIHNvdW5kO1xuICAgIH07XG4gICAgR2FtZUxvb3AucHJvdG90eXBlLmxvYWRTb3VuZCA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgICAgdmFyIHNvdW5kID0gbmV3IFNvdW5kSW1wbF8xLlNvdW5kSW1wbCh1cmwsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5yZXNvdXJjZXMucHVzaChzb3VuZCk7XG4gICAgICAgIHJldHVybiBzb3VuZDtcbiAgICB9O1xuICAgIEdhbWVMb29wLnByb3RvdHlwZS5sb2FkQml0bWFwID0gZnVuY3Rpb24gKHVybCkge1xuICAgICAgICB2YXIgYml0bWFwID0gbmV3IEJpdG1hcEltcGxfMS5CaXRtYXBJbXBsKHVybCk7XG4gICAgICAgIHRoaXMucmVzb3VyY2VzLnB1c2goYml0bWFwKTtcbiAgICAgICAgcmV0dXJuIGJpdG1hcDtcbiAgICB9O1xuICAgIEdhbWVMb29wLnByb3RvdHlwZS5sb2FkVGlsZXNldCA9IGZ1bmN0aW9uICh1cmwsIHRpbGVXaWR0aCwgdGlsZUhlaWdodCkge1xuICAgICAgICB2YXIgdGlsZXNldCA9IG5ldyBUaWxlc2V0SW1wbF8xLlRpbGVzZXRJbXBsKHVybCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KTtcbiAgICAgICAgdGhpcy5yZXNvdXJjZXMucHVzaCh0aWxlc2V0KTtcbiAgICAgICAgcmV0dXJuIHRpbGVzZXQ7XG4gICAgfTtcbiAgICByZXR1cm4gR2FtZUxvb3A7XG59KCkpO1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vc3JjL2ltcGwvQml0bWFwSW1wbC50c1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9zcmMvaW1wbC9CaXRtYXBJbXBsLnRzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKiovICgoX191bnVzZWRfd2VicGFja19tb2R1bGUsIGV4cG9ydHMpID0+IHtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsICh7IHZhbHVlOiB0cnVlIH0pKTtcbmV4cG9ydHMuQml0bWFwSW1wbCA9IHZvaWQgMDtcbnZhciBCaXRtYXBJbXBsID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJpdG1hcEltcGwodXJsKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMud2lkdGggPSAwO1xuICAgICAgICB0aGlzLmhlaWdodCA9IDA7XG4gICAgICAgIHRoaXMubG9hZGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy53aWR0aCA9IF90aGlzLmltYWdlLndpZHRoO1xuICAgICAgICAgICAgX3RoaXMuaGVpZ2h0ID0gX3RoaXMuaW1hZ2UuaGVpZ2h0O1xuICAgICAgICAgICAgX3RoaXMubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSB1cmw7XG4gICAgfVxuICAgIEJpdG1hcEltcGwucHJvdG90eXBlLmluaXRPbkZpcnN0Q2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgfTtcbiAgICBCaXRtYXBJbXBsLnByb3RvdHlwZS5nZXREcmF3YWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2U7XG4gICAgfTtcbiAgICByZXR1cm4gQml0bWFwSW1wbDtcbn0oKSk7XG5leHBvcnRzLkJpdG1hcEltcGwgPSBCaXRtYXBJbXBsO1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vc3JjL2ltcGwvR3JhcGhpY3NJbXBsLnRzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vc3JjL2ltcGwvR3JhcGhpY3NJbXBsLnRzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gKChfX3VudXNlZF93ZWJwYWNrX21vZHVsZSwgZXhwb3J0cykgPT4ge1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgKHsgdmFsdWU6IHRydWUgfSkpO1xuZXhwb3J0cy5HcmFwaGljc0ltcGwgPSB2b2lkIDA7XG52YXIgaXNGaXJlZm94ID0gdHlwZW9mIEluc3RhbGxUcmlnZ2VyICE9PSAndW5kZWZpbmVkJztcbnZhciBHcmFwaGljc0ltcGwgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gR3JhcGhpY3NJbXBsKCkge1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2FtZWNhbnZhc1wiKTtcbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIiwgeyBhbHBoYTogZmFsc2UgfSk7XG4gICAgICAgIHRoaXMuY3R4LndlYmtpdEltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmN0eC5tb3pJbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG4gICAgICAgIGlmIChpc0ZpcmVmb3gpIHtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzLnN0eWxlLmltYWdlUmVuZGVyaW5nID0gXCJjcmlzcC1lZGdlc1wiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jYW52YXMuc3R5bGUuaW1hZ2VSZW5kZXJpbmcgPSBcInBpeGVsYXRlZFwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIEdyYXBoaWNzSW1wbC5wcm90b3R5cGUuZmlsbFJlY3QgPSBmdW5jdGlvbiAoeCwgeSwgd2lkdGgsIGhlaWdodCwgY29sKSB7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGNvbDtcbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCk7XG4gICAgfTtcbiAgICBHcmFwaGljc0ltcGwucHJvdG90eXBlLmRyYXdCaXRtYXAgPSBmdW5jdGlvbiAoeCwgeSwgYml0bWFwKSB7XG4gICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZShiaXRtYXAuZ2V0RHJhd2FibGUoKSwgeCwgeSk7XG4gICAgfTtcbiAgICByZXR1cm4gR3JhcGhpY3NJbXBsO1xufSgpKTtcbmV4cG9ydHMuR3JhcGhpY3NJbXBsID0gR3JhcGhpY3NJbXBsO1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vc3JjL2ltcGwvU291bmRJbXBsLnRzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vc3JjL2ltcGwvU291bmRJbXBsLnRzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gKChfX3VudXNlZF93ZWJwYWNrX21vZHVsZSwgZXhwb3J0cykgPT4ge1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgKHsgdmFsdWU6IHRydWUgfSkpO1xuZXhwb3J0cy5Tb3VuZEltcGwgPSB2b2lkIDA7XG52YXIgQXVkaW9Db250ZXh0ID0gd2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0O1xudmFyIEFVRElPX0NPTlRFWFQ7XG5mdW5jdGlvbiBoYW5kbGVWaXNpYmlsaXR5Q2hhbmdlKCkge1xuICAgIGlmIChTb3VuZEltcGwuQ1VSUkVOVF9NVVNJQykge1xuICAgICAgICBpZiAoZG9jdW1lbnQuaGlkZGVuKSB7XG4gICAgICAgICAgICBTb3VuZEltcGwuQ1VSUkVOVF9NVVNJQy5zdG9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBTb3VuZEltcGwuQ1VSUkVOVF9NVVNJQy5wbGF5KFNvdW5kSW1wbC5DVVJSRU5UX01VU0lDLnZvbHVtZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidmlzaWJpbGl0eWNoYW5nZVwiLCBoYW5kbGVWaXNpYmlsaXR5Q2hhbmdlKTtcbnZhciBTb3VuZEltcGwgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU291bmRJbXBsKHVybCwgbXVzaWMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5sb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy52b2x1bWUgPSAxO1xuICAgICAgICB0aGlzLm11c2ljID0gZmFsc2U7XG4gICAgICAgIHRoaXMudXJsID0gdXJsO1xuICAgICAgICB0aGlzLm11c2ljID0gbXVzaWM7XG4gICAgICAgIHZhciByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgcmVxLm9wZW4oXCJHRVRcIiwgdXJsLCB0cnVlKTtcbiAgICAgICAgcmVxLnJlc3BvbnNlVHlwZSA9IFwiYXJyYXlidWZmZXJcIjtcbiAgICAgICAgcmVxLm9ubG9hZCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgdmFyIGFycmF5QnVmZmVyID0gcmVxLnJlc3BvbnNlO1xuICAgICAgICAgICAgaWYgKGFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuZGF0YSA9IGFycmF5QnVmZmVyO1xuICAgICAgICAgICAgICAgIF90aGlzLmxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgX3RoaXMudHJ5TG9hZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXEuc2VuZChudWxsKTtcbiAgICB9XG4gICAgU291bmRJbXBsLnByb3RvdHlwZS50cnlMb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoQVVESU9fQ09OVEVYVCAmJiB0aGlzLmRhdGEpIHtcbiAgICAgICAgICAgIEFVRElPX0NPTlRFWFQuZGVjb2RlQXVkaW9EYXRhKHRoaXMuZGF0YSwgZnVuY3Rpb24gKGJ1ZmZlcikge1xuICAgICAgICAgICAgICAgIF90aGlzLmJ1ZmZlciA9IGJ1ZmZlcjtcbiAgICAgICAgICAgICAgICBpZiAoU291bmRJbXBsLkNVUlJFTlRfTVVTSUMgPT09IF90aGlzKSB7XG4gICAgICAgICAgICAgICAgICAgIFNvdW5kSW1wbC5DVVJSRU5UX01VU0lDID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMucGxheShfdGhpcy52b2x1bWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlKSB7IGNvbnNvbGUubG9nKFwiRmFpbGVkIHRvIGxvYWQ6IFwiICsgX3RoaXMudXJsKTsgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNvdW5kSW1wbC5wcm90b3R5cGUuaW5pdE9uRmlyc3RDbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFBVURJT19DT05URVhUKSB7XG4gICAgICAgICAgICBBVURJT19DT05URVhUID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xuICAgICAgICAgICAgQVVESU9fQ09OVEVYVC5yZXN1bWUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRyeUxvYWQoKTtcbiAgICB9O1xuICAgIFNvdW5kSW1wbC5wcm90b3R5cGUucGxheSA9IGZ1bmN0aW9uICh2b2x1bWUpIHtcbiAgICAgICAgdGhpcy52b2x1bWUgPSB2b2x1bWU7XG4gICAgICAgIGlmICghdGhpcy5idWZmZXIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm11c2ljKSB7XG4gICAgICAgICAgICAgICAgU291bmRJbXBsLkNVUlJFTlRfTVVTSUMgPSB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm11c2ljKSB7XG4gICAgICAgICAgICBpZiAoU291bmRJbXBsLkNVUlJFTlRfTVVTSUMgIT09IHRoaXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoU291bmRJbXBsLkNVUlJFTlRfTVVTSUMpIHtcbiAgICAgICAgICAgICAgICAgICAgU291bmRJbXBsLkNVUlJFTlRfTVVTSUMuc3RvcCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBTb3VuZEltcGwuQ1VSUkVOVF9NVVNJQyA9IHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5zb3VyY2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zb3VyY2UgPSBBVURJT19DT05URVhULmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xuICAgICAgICB0aGlzLnNvdXJjZS5idWZmZXIgPSB0aGlzLmJ1ZmZlcjtcbiAgICAgICAgdGhpcy5nYWluID0gQVVESU9fQ09OVEVYVC5jcmVhdGVHYWluKCk7XG4gICAgICAgIHRoaXMuc291cmNlLmNvbm5lY3QodGhpcy5nYWluKTtcbiAgICAgICAgdGhpcy5nYWluLmNvbm5lY3QoQVVESU9fQ09OVEVYVC5kZXN0aW5hdGlvbik7XG4gICAgICAgIGlmICh0aGlzLm11c2ljKSB7XG4gICAgICAgICAgICB0aGlzLmdhaW4uZ2Fpbi52YWx1ZSA9IDA7XG4gICAgICAgICAgICB0aGlzLnNvdXJjZS5sb29wID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNvdXJjZS5zdGFydCgwKTtcbiAgICAgICAgaWYgKHRoaXMubXVzaWMpIHtcbiAgICAgICAgICAgIHRoaXMuZ2Fpbi5nYWluLmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKHZvbHVtZSwgQVVESU9fQ09OVEVYVC5jdXJyZW50VGltZSArIDIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5nYWluLmdhaW4udmFsdWUgPSB2b2x1bWU7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNvdW5kSW1wbC5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuc291cmNlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tdXNpYykge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2Fpbi5nYWluLmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKDAsIEFVRElPX0NPTlRFWFQuY3VycmVudFRpbWUgKyAzKTtcbiAgICAgICAgICAgICAgICB2YXIgdGVtcFNvdXJjZV8xID0gdGhpcy5zb3VyY2U7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBTb3VyY2VfMS5zdG9wKCk7XG4gICAgICAgICAgICAgICAgfSwgNDAwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNvdXJjZS5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNvdXJjZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBTb3VuZEltcGw7XG59KCkpO1xuZXhwb3J0cy5Tb3VuZEltcGwgPSBTb3VuZEltcGw7XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9zcmMvaW1wbC9UaWxlc2V0SW1wbC50c1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vc3JjL2ltcGwvVGlsZXNldEltcGwudHMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKiovICgoX191bnVzZWRfd2VicGFja19tb2R1bGUsIGV4cG9ydHMpID0+IHtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsICh7IHZhbHVlOiB0cnVlIH0pKTtcbmV4cG9ydHMuVGlsZXNldEltcGwgPSB2b2lkIDA7XG52YXIgVGlsZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUaWxlKGNhbnZhcykge1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcbiAgICAgICAgdGhpcy53aWR0aCA9IGNhbnZhcy53aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xuICAgICAgICB0aGlzLmxvYWRlZCA9IHRydWU7XG4gICAgfVxuICAgIFRpbGUucHJvdG90eXBlLmdldERyYXdhYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jYW52YXM7XG4gICAgfTtcbiAgICBUaWxlLnByb3RvdHlwZS5pbml0T25GaXJzdENsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgIH07XG4gICAgcmV0dXJuIFRpbGU7XG59KCkpO1xudmFyIFRpbGVzZXRJbXBsID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRpbGVzZXRJbXBsKHVybCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMubG9hZGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYml0bWFwcyA9IFtdO1xuICAgICAgICB0aGlzLnNjYW5saW5lID0gMDtcbiAgICAgICAgdGhpcy50aWxlV2lkdGggPSB0aWxlV2lkdGg7XG4gICAgICAgIHRoaXMudGlsZUhlaWdodCA9IHRpbGVIZWlnaHQ7XG4gICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICBfdGhpcy5zY2FubGluZSA9IE1hdGguZmxvb3IoX3RoaXMuaW1hZ2Uud2lkdGggLyB0aWxlV2lkdGgpO1xuICAgICAgICAgICAgdmFyIGRlcHRoID0gTWF0aC5mbG9vcihfdGhpcy5pbWFnZS5oZWlnaHQgLyB0aWxlSGVpZ2h0KTtcbiAgICAgICAgICAgIC8vIGN1dCB0aGUgaW1hZ2UgaW50byBwaWVjZXNcbiAgICAgICAgICAgIGZvciAodmFyIHkgPSAwOyB5IDwgZGVwdGg7IHkrKykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgX3RoaXMuc2NhbmxpbmU7IHgrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgY2FudmFzLndpZHRoID0gdGlsZVdpZHRoO1xuICAgICAgICAgICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gdGlsZUhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgKF9hID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmRyYXdJbWFnZShfdGhpcy5pbWFnZSwgLXggKiB0aWxlV2lkdGgsIC15ICogdGlsZUhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmJpdG1hcHMucHVzaChuZXcgVGlsZShjYW52YXMpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdGhpcy5sb2FkZWQgPSB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmltYWdlLnNyYyA9IHVybDtcbiAgICB9XG4gICAgVGlsZXNldEltcGwucHJvdG90eXBlLmluaXRPbkZpcnN0Q2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgfTtcbiAgICBUaWxlc2V0SW1wbC5wcm90b3R5cGUuZ2V0VGlsZSA9IGZ1bmN0aW9uICh0aWxlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJpdG1hcHNbdGlsZV07XG4gICAgfTtcbiAgICByZXR1cm4gVGlsZXNldEltcGw7XG59KCkpO1xuZXhwb3J0cy5UaWxlc2V0SW1wbCA9IFRpbGVzZXRJbXBsO1xuXG5cbi8qKiovIH0pXG5cbi8qKioqKiovIFx0fSk7XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcbi8qKioqKiovIFx0XHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcbi8qKioqKiovIFx0XHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcbi8qKioqKiovIFx0XHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG4vKioqKioqLyBcdFx0XHRleHBvcnRzOiB7fVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0fVxuLyoqKioqKi8gXHRcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IHt9O1xuLy8gVGhpcyBlbnRyeSBuZWVkIHRvIGJlIHdyYXBwZWQgaW4gYW4gSUlGRSBiZWNhdXNlIGl0IG5lZWQgdG8gYmUgaXNvbGF0ZWQgYWdhaW5zdCBvdGhlciBtb2R1bGVzIGluIHRoZSBjaHVuay5cbigoKSA9PiB7XG52YXIgZXhwb3J0cyA9IF9fd2VicGFja19leHBvcnRzX187XG4vKiEqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vc3JjL2luZGV4LnRzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqL1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsICh7IHZhbHVlOiB0cnVlIH0pKTtcbmV4cG9ydHMuc3RhcnRHYW1lID0gdm9pZCAwO1xudmFyIEd1dGVfMSA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vR3V0ZSAqLyBcIi4vc3JjL0d1dGUudHNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJzdGFydEdhbWVcIiwgKHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBHdXRlXzEuc3RhcnRHYW1lOyB9IH0pKTtcblxufSkoKTtcblxuLyoqKioqKi8gXHRyZXR1cm4gX193ZWJwYWNrX2V4cG9ydHNfXztcbi8qKioqKiovIH0pKClcbjtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW5kbFluQmhZMnM2THk5bmRYUmxMM2RsWW5CaFkyc3ZkVzVwZG1WeWMyRnNUVzlrZFd4bFJHVm1hVzVwZEdsdmJpSXNJbmRsWW5CaFkyczZMeTluZFhSbEx5NHZjM0pqTDBkMWRHVXVkSE1pTENKM1pXSndZV05yT2k4dlozVjBaUzh1TDNOeVl5OXBiWEJzTDBKcGRHMWhjRWx0Y0d3dWRITWlMQ0ozWldKd1lXTnJPaTh2WjNWMFpTOHVMM055WXk5cGJYQnNMMGR5WVhCb2FXTnpTVzF3YkM1MGN5SXNJbmRsWW5CaFkyczZMeTluZFhSbEx5NHZjM0pqTDJsdGNHd3ZVMjkxYm1SSmJYQnNMblJ6SWl3aWQyVmljR0ZqYXpvdkwyZDFkR1V2TGk5emNtTXZhVzF3YkM5VWFXeGxjMlYwU1cxd2JDNTBjeUlzSW5kbFluQmhZMnM2THk5bmRYUmxMM2RsWW5CaFkyc3ZZbTl2ZEhOMGNtRndJaXdpZDJWaWNHRmphem92TDJkMWRHVXZMaTl6Y21NdmFXNWtaWGd1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWtGQlFVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNRMEZCUXp0QlFVTkVMRTg3T3pzN096czdPenM3UVVOV1lUdEJRVU5pTERoRFFVRTJReXhEUVVGRExHTkJRV01zUlVGQlF6dEJRVU0zUkN4cFFrRkJhVUk3UVVGRGFrSXNiVUpCUVcxQ0xHMUNRVUZQTEVOQlFVTXNiVVJCUVcxQ08wRkJRemxETEhGQ1FVRnhRaXh0UWtGQlR5eERRVUZETEhWRVFVRnhRanRCUVVOc1JDeHJRa0ZCYTBJc2JVSkJRVThzUTBGQlF5eHBSRUZCYTBJN1FVRkROVU1zYjBKQlFXOUNMRzFDUVVGUExFTkJRVU1zY1VSQlFXOUNPMEZCUTJoRU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNhVUpCUVdsQ08wRkJRMnBDTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzTmtOQlFUWkRMR2RDUVVGblFqdEJRVU0zUkR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxHbEVRVUZwUkN4blFrRkJaMEk3UVVGRGFrVTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzTkVKQlFUUkNMRkZCUVZFN1FVRkRjRU03UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTdzBRa0ZCTkVJc1VVRkJVVHRCUVVOd1F6dEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEZOQlFWTTdRVUZEVkR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4VFFVRlRPMEZCUTFRN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFRRVUZUTzBGQlExUTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hUUVVGVE8wRkJRMVE3UVVGRFFUdEJRVU5CTzBGQlEwRXNVMEZCVXp0QlFVTlVPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFRRVUZUTzBGQlExUTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hEUVVGRE96czdPenM3T3pzN096dEJRemxKV1R0QlFVTmlMRGhEUVVFMlF5eERRVUZETEdOQlFXTXNSVUZCUXp0QlFVTTNSQ3hyUWtGQmEwSTdRVUZEYkVJN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFTkJRVU03UVVGRFJDeHJRa0ZCYTBJN096czdPenM3T3pzN08wRkRlRUpNTzBGQlEySXNPRU5CUVRaRExFTkJRVU1zWTBGQll5eEZRVUZETzBGQlF6ZEVMRzlDUVVGdlFqdEJRVU53UWp0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxHbEVRVUZwUkN4bFFVRmxPMEZCUTJoRk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFTkJRVU03UVVGRFJDeHZRa0ZCYjBJN096czdPenM3T3pzN08wRkRNMEpRTzBGQlEySXNPRU5CUVRaRExFTkJRVU1zWTBGQll5eEZRVUZETzBGQlF6ZEVMR2xDUVVGcFFqdEJRVU5xUWp0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEdGQlFXRXNaMEpCUVdkQ0xEWkRRVUUyUXl4RlFVRkZPMEZCUXpWRk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc2FVSkJRV2xDTzBGQlEycENPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4RFFVRkRPMEZCUTBRc2FVSkJRV2xDT3pzN096czdPenM3T3p0QlF6ZEhTanRCUVVOaUxEaERRVUUyUXl4RFFVRkRMR05CUVdNc1JVRkJRenRCUVVNM1JDeHRRa0ZCYlVJN1FVRkRia0k3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4RFFVRkRPMEZCUTBRN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTERKQ1FVRXlRaXhYUVVGWE8wRkJRM1JETEN0Q1FVRXJRaXh2UWtGQmIwSTdRVUZEYmtRN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRU5CUVVNN1FVRkRSQ3h0UWtGQmJVSTdPenM3T3pzN1ZVTnVSRzVDTzFWQlEwRTdPMVZCUlVFN1ZVRkRRVHRWUVVOQk8xVkJRMEU3VlVGRFFUdFZRVU5CTzFWQlEwRTdWVUZEUVR0VlFVTkJPMVZCUTBFN1ZVRkRRVHRWUVVOQk8xVkJRMEU3TzFWQlJVRTdWVUZEUVRzN1ZVRkZRVHRWUVVOQk8xVkJRMEU3T3pzN096czdPenM3UVVOMFFtRTdRVUZEWWl3NFEwRkJOa01zUTBGQlF5eGpRVUZqTEVWQlFVTTdRVUZETjBRc2FVSkJRV2xDTzBGQlEycENMR0ZCUVdFc2JVSkJRVThzUTBGQlF5dzJRa0ZCVVR0QlFVTTNRaXcyUTBGQk5FTXNRMEZCUXl4eFEwRkJjVU1zZVVKQlFYbENMRVZCUVVVc1JVRkJSU3hGUVVGRElpd2labWxzWlNJNkltbHVaR1Y0TG1weklpd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2lLR1oxYm1OMGFXOXVJSGRsWW5CaFkydFZibWwyWlhKellXeE5iMlIxYkdWRVpXWnBibWwwYVc5dUtISnZiM1FzSUdaaFkzUnZjbmtwSUh0Y2JseDBhV1lvZEhsd1pXOW1JR1Y0Y0c5eWRITWdQVDA5SUNkdlltcGxZM1FuSUNZbUlIUjVjR1Z2WmlCdGIyUjFiR1VnUFQwOUlDZHZZbXBsWTNRbktWeHVYSFJjZEcxdlpIVnNaUzVsZUhCdmNuUnpJRDBnWm1GamRHOXllU2dwTzF4dVhIUmxiSE5sSUdsbUtIUjVjR1Z2WmlCa1pXWnBibVVnUFQwOUlDZG1kVzVqZEdsdmJpY2dKaVlnWkdWbWFXNWxMbUZ0WkNsY2JseDBYSFJrWldacGJtVW9XMTBzSUdaaFkzUnZjbmtwTzF4dVhIUmxiSE5sSUdsbUtIUjVjR1Z2WmlCbGVIQnZjblJ6SUQwOVBTQW5iMkpxWldOMEp5bGNibHgwWEhSbGVIQnZjblJ6VzF3aVozVjBaVndpWFNBOUlHWmhZM1J2Y25rb0tUdGNibHgwWld4elpWeHVYSFJjZEhKdmIzUmJYQ0puZFhSbFhDSmRJRDBnWm1GamRHOXllU2dwTzF4dWZTa29jMlZzWml3Z1puVnVZM1JwYjI0b0tTQjdYRzV5WlhSMWNtNGdJaXdpWENKMWMyVWdjM1J5YVdOMFhDSTdYRzVQWW1wbFkzUXVaR1ZtYVc1bFVISnZjR1Z5ZEhrb1pYaHdiM0owY3l3Z1hDSmZYMlZ6VFc5a2RXeGxYQ0lzSUhzZ2RtRnNkV1U2SUhSeWRXVWdmU2s3WEc1bGVIQnZjblJ6TG5OMFlYSjBSMkZ0WlNBOUlIWnZhV1FnTUR0Y2JuWmhjaUJDYVhSdFlYQkpiWEJzWHpFZ1BTQnlaWEYxYVhKbEtGd2lMaTlwYlhCc0wwSnBkRzFoY0VsdGNHeGNJaWs3WEc1MllYSWdSM0poY0docFkzTkpiWEJzWHpFZ1BTQnlaWEYxYVhKbEtGd2lMaTlwYlhCc0wwZHlZWEJvYVdOelNXMXdiRndpS1R0Y2JuWmhjaUJUYjNWdVpFbHRjR3hmTVNBOUlISmxjWFZwY21Vb1hDSXVMMmx0Y0d3dlUyOTFibVJKYlhCc1hDSXBPMXh1ZG1GeUlGUnBiR1Z6WlhSSmJYQnNYekVnUFNCeVpYRjFhWEpsS0Z3aUxpOXBiWEJzTDFScGJHVnpaWFJKYlhCc1hDSXBPMXh1ZG1GeUlFZEJUVVZmVEU5UFVEdGNibVoxYm1OMGFXOXVJSE4wWVhKMFIyRnRaU2huWVcxbEtTQjdYRzRnSUNBZ1IwRk5SVjlNVDA5UUlEMGdibVYzSUVkaGJXVk1iMjl3S0NrdWMzUmhjblFvWjJGdFpTazdYRzU5WEc1bGVIQnZjblJ6TG5OMFlYSjBSMkZ0WlNBOUlITjBZWEowUjJGdFpUdGNiblpoY2lCSFlXMWxURzl2Y0NBOUlDOHFLaUJBWTJ4aGMzTWdLaThnS0daMWJtTjBhVzl1SUNncElIdGNiaUFnSUNCbWRXNWpkR2x2YmlCSFlXMWxURzl2Y0NncElIdGNiaUFnSUNBZ0lDQWdkR2hwY3k1eVpYTnZkWEpqWlhNZ1BTQmJYVHRjYmlBZ0lDQWdJQ0FnZEdocGN5NXNZWE4wUm5KaGJXVWdQU0F3TzF4dUlDQWdJQ0FnSUNCMGFHbHpMbWx1YVhSbFpDQTlJR1poYkhObE8xeHVJQ0FnSUgxY2JpQWdJQ0JIWVcxbFRHOXZjQzV3Y205MGIzUjVjR1V1WVd4c1VtVnpiM1Z5WTJWelRHOWhaR1ZrSUQwZ1puVnVZM1JwYjI0Z0tDa2dlMXh1SUNBZ0lDQWdJQ0JtYjNJZ0tIWmhjaUJmYVNBOUlEQXNJRjloSUQwZ2RHaHBjeTV5WlhOdmRYSmpaWE03SUY5cElEd2dYMkV1YkdWdVozUm9PeUJmYVNzcktTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCMllYSWdjbVZ6YjNWeVkyVWdQU0JmWVZ0ZmFWMDdYRzRnSUNBZ0lDQWdJQ0FnSUNCcFppQW9JWEpsYzI5MWNtTmxMbXh2WVdSbFpDa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQm1ZV3h6WlR0Y2JpQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnZEhKMVpUdGNiaUFnSUNCOU8xeHVJQ0FnSUVkaGJXVk1iMjl3TG5CeWIzUnZkSGx3WlM1cGJtbDBVbVZ6YjNWeVkyVnpUMjVHYVhKemRFTnNhV05ySUQwZ1puVnVZM1JwYjI0Z0tDa2dlMXh1SUNBZ0lDQWdJQ0JwWmlBb0lYUm9hWE11WVd4c1VtVnpiM1Z5WTJWelRHOWhaR1ZrS0NrcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGRIVnlianRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNCcFppQW9JWFJvYVhNdWFXNXBkR1ZrS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0IwYUdsekxtbHVhWFJsWkNBOUlIUnlkV1U3WEc0Z0lDQWdJQ0FnSUNBZ0lDQm1iM0lnS0haaGNpQmZhU0E5SURBc0lGOWhJRDBnZEdocGN5NXlaWE52ZFhKalpYTTdJRjlwSUR3Z1gyRXViR1Z1WjNSb095QmZhU3NyS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJSEpsYzI5MWNtTmxJRDBnWDJGYlgybGRPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSEpsYzI5MWNtTmxMbWx1YVhSUGJrWnBjbk4wUTJ4cFkyc29LVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lIMDdYRzRnSUNBZ1IyRnRaVXh2YjNBdWNISnZkRzkwZVhCbExtMXZkWE5sUkc5M2JraGhibVJzWlhJZ1BTQm1kVzVqZEdsdmJpQW9lQ3dnZVN3Z2FXUXBJSHRjYmlBZ0lDQWdJQ0FnYVdZZ0tHbGtJRDA5UFNCMmIybGtJREFwSUhzZ2FXUWdQU0F3T3lCOVhHNGdJQ0FnSUNBZ0lIUm9hWE11YVc1cGRGSmxjMjkxY21ObGMwOXVSbWx5YzNSRGJHbGpheWdwTzF4dUlDQWdJQ0FnSUNCMllYSWdZMkZ1ZG1GeklEMGdkR2hwY3k1bmNtRndhR2xqY3k1allXNTJZWE03WEc0Z0lDQWdJQ0FnSUdOaGJuWmhjeTVtYjJOMWN5Z3BPMXh1SUNBZ0lDQWdJQ0IyWVhJZ2QybGtkR2dnUFNCallXNTJZWE11WTJ4cFpXNTBWMmxrZEdnN1hHNGdJQ0FnSUNBZ0lIWmhjaUJvWldsbmFIUWdQU0JqWVc1MllYTXVZMnhwWlc1MFNHVnBaMmgwTzF4dUlDQWdJQ0FnSUNCNElEMGdUV0YwYUM1bWJHOXZjaWdvZUNBdklIZHBaSFJvS1NBcUlHTmhiblpoY3k1M2FXUjBhQ2s3WEc0Z0lDQWdJQ0FnSUhrZ1BTQk5ZWFJvTG1ac2IyOXlLQ2g1SUM4Z2FHVnBaMmgwS1NBcUlHTmhiblpoY3k1b1pXbG5hSFFwTzF4dUlDQWdJQ0FnSUNCMGFHbHpMbWRoYldVdWIyNU5iM1Z6WlVSdmQyNG9kR2hwY3l3Z2VDd2dlU2s3WEc0Z0lDQWdmVHRjYmlBZ0lDQkhZVzFsVEc5dmNDNXdjbTkwYjNSNWNHVXViVzkxYzJWVmNFaGhibVJzWlhJZ1BTQm1kVzVqZEdsdmJpQW9lQ3dnZVN3Z2FXUXBJSHRjYmlBZ0lDQWdJQ0FnYVdZZ0tHbGtJRDA5UFNCMmIybGtJREFwSUhzZ2FXUWdQU0F3T3lCOVhHNGdJQ0FnSUNBZ0lIUm9hWE11YVc1cGRGSmxjMjkxY21ObGMwOXVSbWx5YzNSRGJHbGpheWdwTzF4dUlDQWdJQ0FnSUNCMllYSWdZMkZ1ZG1GeklEMGdkR2hwY3k1bmNtRndhR2xqY3k1allXNTJZWE03WEc0Z0lDQWdJQ0FnSUhaaGNpQjNhV1IwYUNBOUlHTmhiblpoY3k1amJHbGxiblJYYVdSMGFEdGNiaUFnSUNBZ0lDQWdkbUZ5SUdobGFXZG9kQ0E5SUdOaGJuWmhjeTVqYkdsbGJuUklaV2xuYUhRN1hHNGdJQ0FnSUNBZ0lIZ2dQU0JOWVhSb0xtWnNiMjl5S0NoNElDOGdkMmxrZEdncElDb2dZMkZ1ZG1GekxuZHBaSFJvS1R0Y2JpQWdJQ0FnSUNBZ2VTQTlJRTFoZEdndVpteHZiM0lvS0hrZ0x5Qm9aV2xuYUhRcElDb2dZMkZ1ZG1GekxtaGxhV2RvZENrN1hHNGdJQ0FnSUNBZ0lIUm9hWE11WjJGdFpTNXZiazF2ZFhObFZYQW9kR2hwY3l3Z2VDd2dlU2s3WEc0Z0lDQWdmVHRjYmlBZ0lDQkhZVzFsVEc5dmNDNXdjbTkwYjNSNWNHVXVhMlY1Ukc5M2JraGhibVJzWlhJZ1BTQm1kVzVqZEdsdmJpQW9hMlY1S1NCN1hHNGdJQ0FnSUNBZ0lIUm9hWE11YVc1cGRGSmxjMjkxY21ObGMwOXVSbWx5YzNSRGJHbGpheWdwTzF4dUlDQWdJQ0FnSUNCMGFHbHpMbWRoYldVdWIyNUxaWGxFYjNkdUtIUm9hWE1zSUd0bGVTazdYRzRnSUNBZ2ZUdGNiaUFnSUNCSFlXMWxURzl2Y0M1d2NtOTBiM1I1Y0dVdWEyVjVWWEJJWVc1a2JHVnlJRDBnWm5WdVkzUnBiMjRnS0d0bGVTa2dlMXh1SUNBZ0lDQWdJQ0IwYUdsekxtZGhiV1V1YjI1TFpYbFZjQ2gwYUdsekxDQnJaWGtwTzF4dUlDQWdJSDA3WEc0Z0lDQWdSMkZ0WlV4dmIzQXVjSEp2ZEc5MGVYQmxMbk4wWVhKMElEMGdablZ1WTNScGIyNGdLR2RoYldVcElIdGNiaUFnSUNBZ0lDQWdkbUZ5SUY5MGFHbHpJRDBnZEdocGN6dGNiaUFnSUNBZ0lDQWdkR2hwY3k1bllXMWxJRDBnWjJGdFpUdGNiaUFnSUNBZ0lDQWdkR2hwY3k1bmNtRndhR2xqY3lBOUlHNWxkeUJIY21Gd2FHbGpjMGx0Y0d4Zk1TNUhjbUZ3YUdsamMwbHRjR3dvS1R0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTVuY21Gd2FHbGpjeTVqWVc1MllYTXVZV1JrUlhabGJuUk1hWE4wWlc1bGNpaGNJbTF2ZFhObFpHOTNibHdpTENCbWRXNWpkR2x2YmlBb1pYWmxiblFwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSFJ5ZVNCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1gzUm9hWE11Ylc5MWMyVkViM2R1U0dGdVpHeGxjaWhsZG1WdWRDNXZabVp6WlhSWUxDQmxkbVZ1ZEM1dlptWnpaWFJaS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCbGRtVnVkQzV3Y21WMlpXNTBSR1ZtWVhWc2RDZ3BPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR1YyWlc1MExuTjBiM0JRY205d1lXZGhkR2x2YmlncE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lDQWdZMkYwWTJnZ0tHVXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JqYjI1emIyeGxMbXh2WnlobEtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ2ZTazdYRzRnSUNBZ0lDQWdJSFJvYVhNdVozSmhjR2hwWTNNdVkyRnVkbUZ6TG1Ga1pFVjJaVzUwVEdsemRHVnVaWElvWENKdGIzVnpaWFZ3WENJc0lHWjFibU4wYVc5dUlDaGxkbVZ1ZENrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnZEhKNUlIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmZkR2hwY3k1dGIzVnpaVlZ3U0dGdVpHeGxjaWhsZG1WdWRDNXZabVp6WlhSWUxDQmxkbVZ1ZEM1dlptWnpaWFJaS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCbGRtVnVkQzV3Y21WMlpXNTBSR1ZtWVhWc2RDZ3BPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR1YyWlc1MExuTjBiM0JRY205d1lXZGhkR2x2YmlncE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lDQWdZMkYwWTJnZ0tHVXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JqYjI1emIyeGxMbXh2WnlobEtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ2ZTazdYRzRnSUNBZ0lDQWdJSGRwYm1SdmR5NWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtGd2lhMlY1Wkc5M2Jsd2lMQ0JtZFc1amRHbHZiaUFvWlhabGJuUXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lGOTBhR2x6TG10bGVVUnZkMjVJWVc1a2JHVnlLR1YyWlc1MExtdGxlU2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQmxkbVZ1ZEM1d2NtVjJaVzUwUkdWbVlYVnNkQ2dwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdaWFpsYm5RdWMzUnZjRkJ5YjNCaFoyRjBhVzl1S0NrN1hHNGdJQ0FnSUNBZ0lIMHBPMXh1SUNBZ0lDQWdJQ0IzYVc1a2IzY3VZV1JrUlhabGJuUk1hWE4wWlc1bGNpaGNJbXRsZVhWd1hDSXNJR1oxYm1OMGFXOXVJQ2hsZG1WdWRDa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ1gzUm9hWE11YTJWNVZYQklZVzVrYkdWeUtHVjJaVzUwTG10bGVTazdYRzRnSUNBZ0lDQWdJQ0FnSUNCbGRtVnVkQzV3Y21WMlpXNTBSR1ZtWVhWc2RDZ3BPMXh1SUNBZ0lDQWdJQ0FnSUNBZ1pYWmxiblF1YzNSdmNGQnliM0JoWjJGMGFXOXVLQ2s3WEc0Z0lDQWdJQ0FnSUgwcE8xeHVJQ0FnSUNBZ0lDQm5ZVzFsTG1sdWFYUW9kR2hwY3lrN1hHNGdJQ0FnSUNBZ0lISmxjWFZsYzNSQmJtbHRZWFJwYjI1R2NtRnRaU2htZFc1amRHbHZiaUFvS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JmZEdocGN5NXNiMjl3S0NrN1hHNGdJQ0FnSUNBZ0lIMHBPMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdkR2hwY3p0Y2JpQWdJQ0I5TzF4dUlDQWdJRWRoYldWTWIyOXdMbkJ5YjNSdmRIbHdaUzVzYjI5d0lEMGdablZ1WTNScGIyNGdLQ2tnZTF4dUlDQWdJQ0FnSUNCMllYSWdYM1JvYVhNZ1BTQjBhR2x6TzF4dUlDQWdJQ0FnSUNCMllYSWdibTkzSUQwZ2JtVjNJRVJoZEdVb0tTNW5aWFJVYVcxbEtDazdYRzRnSUNBZ0lDQWdJSFpoY2lCa1pXeDBZU0E5SURBN1hHNGdJQ0FnSUNBZ0lHbG1JQ2gwYUdsekxteGhjM1JHY21GdFpTQWhQVDBnTUNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnWkdWc2RHRWdQU0J1YjNjZ0xTQjBhR2x6TG14aGMzUkdjbUZ0WlR0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQjBhR2x6TG14aGMzUkdjbUZ0WlNBOUlHNXZkenRjYmlBZ0lDQWdJQ0FnZEdocGN5NW5ZVzFsTG5Wd1pHRjBaU2gwYUdsekxDQmtaV3gwWVNrN1hHNGdJQ0FnSUNBZ0lIUm9hWE11WjJGdFpTNXlaVzVrWlhJb2RHaHBjeXdnZEdocGN5NW5jbUZ3YUdsamN5azdYRzRnSUNBZ0lDQWdJSEpsY1hWbGMzUkJibWx0WVhScGIyNUdjbUZ0WlNobWRXNWpkR2x2YmlBb0tTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCZmRHaHBjeTVzYjI5d0tDazdYRzRnSUNBZ0lDQWdJSDBwTzF4dUlDQWdJSDA3WEc0Z0lDQWdSMkZ0WlV4dmIzQXVjSEp2ZEc5MGVYQmxMbXh2WVdSTmRYTnBZeUE5SUdaMWJtTjBhVzl1SUNoMWNtd3BJSHRjYmlBZ0lDQWdJQ0FnZG1GeUlITnZkVzVrSUQwZ2JtVjNJRk52ZFc1a1NXMXdiRjh4TGxOdmRXNWtTVzF3YkNoMWNtd3NJSFJ5ZFdVcE8xeHVJQ0FnSUNBZ0lDQjBhR2x6TG5KbGMyOTFjbU5sY3k1d2RYTm9LSE52ZFc1a0tUdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlITnZkVzVrTzF4dUlDQWdJSDA3WEc0Z0lDQWdSMkZ0WlV4dmIzQXVjSEp2ZEc5MGVYQmxMbXh2WVdSVGIzVnVaQ0E5SUdaMWJtTjBhVzl1SUNoMWNtd3BJSHRjYmlBZ0lDQWdJQ0FnZG1GeUlITnZkVzVrSUQwZ2JtVjNJRk52ZFc1a1NXMXdiRjh4TGxOdmRXNWtTVzF3YkNoMWNtd3NJR1poYkhObEtUdGNiaUFnSUNBZ0lDQWdkR2hwY3k1eVpYTnZkWEpqWlhNdWNIVnphQ2h6YjNWdVpDazdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQnpiM1Z1WkR0Y2JpQWdJQ0I5TzF4dUlDQWdJRWRoYldWTWIyOXdMbkJ5YjNSdmRIbHdaUzVzYjJGa1FtbDBiV0Z3SUQwZ1puVnVZM1JwYjI0Z0tIVnliQ2tnZTF4dUlDQWdJQ0FnSUNCMllYSWdZbWwwYldGd0lEMGdibVYzSUVKcGRHMWhjRWx0Y0d4Zk1TNUNhWFJ0WVhCSmJYQnNLSFZ5YkNrN1hHNGdJQ0FnSUNBZ0lIUm9hWE11Y21WemIzVnlZMlZ6TG5CMWMyZ29ZbWwwYldGd0tUdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlHSnBkRzFoY0R0Y2JpQWdJQ0I5TzF4dUlDQWdJRWRoYldWTWIyOXdMbkJ5YjNSdmRIbHdaUzVzYjJGa1ZHbHNaWE5sZENBOUlHWjFibU4wYVc5dUlDaDFjbXdzSUhScGJHVlhhV1IwYUN3Z2RHbHNaVWhsYVdkb2RDa2dlMXh1SUNBZ0lDQWdJQ0IyWVhJZ2RHbHNaWE5sZENBOUlHNWxkeUJVYVd4bGMyVjBTVzF3YkY4eExsUnBiR1Z6WlhSSmJYQnNLSFZ5YkN3Z2RHbHNaVmRwWkhSb0xDQjBhV3hsU0dWcFoyaDBLVHRjYmlBZ0lDQWdJQ0FnZEdocGN5NXlaWE52ZFhKalpYTXVjSFZ6YUNoMGFXeGxjMlYwS1R0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUhScGJHVnpaWFE3WEc0Z0lDQWdmVHRjYmlBZ0lDQnlaWFIxY200Z1IyRnRaVXh2YjNBN1hHNTlLQ2twTzF4dUlpd2lYQ0oxYzJVZ2MzUnlhV04wWENJN1hHNVBZbXBsWTNRdVpHVm1hVzVsVUhKdmNHVnlkSGtvWlhod2IzSjBjeXdnWENKZlgyVnpUVzlrZFd4bFhDSXNJSHNnZG1Gc2RXVTZJSFJ5ZFdVZ2ZTazdYRzVsZUhCdmNuUnpMa0pwZEcxaGNFbHRjR3dnUFNCMmIybGtJREE3WEc1MllYSWdRbWwwYldGd1NXMXdiQ0E5SUM4cUtpQkFZMnhoYzNNZ0tpOGdLR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpQWdJQ0JtZFc1amRHbHZiaUJDYVhSdFlYQkpiWEJzS0hWeWJDa2dlMXh1SUNBZ0lDQWdJQ0IyWVhJZ1gzUm9hWE1nUFNCMGFHbHpPMXh1SUNBZ0lDQWdJQ0IwYUdsekxuZHBaSFJvSUQwZ01EdGNiaUFnSUNBZ0lDQWdkR2hwY3k1b1pXbG5hSFFnUFNBd08xeHVJQ0FnSUNBZ0lDQjBhR2x6TG14dllXUmxaQ0E5SUdaaGJITmxPMXh1SUNBZ0lDQWdJQ0IwYUdsekxtbHRZV2RsSUQwZ2JtVjNJRWx0WVdkbEtDazdYRzRnSUNBZ0lDQWdJSFJvYVhNdWFXMWhaMlV1YjI1c2IyRmtJRDBnWm5WdVkzUnBiMjRnS0NrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnWDNSb2FYTXVkMmxrZEdnZ1BTQmZkR2hwY3k1cGJXRm5aUzUzYVdSMGFEdGNiaUFnSUNBZ0lDQWdJQ0FnSUY5MGFHbHpMbWhsYVdkb2RDQTlJRjkwYUdsekxtbHRZV2RsTG1obGFXZG9kRHRjYmlBZ0lDQWdJQ0FnSUNBZ0lGOTBhR2x6TG14dllXUmxaQ0E5SUhSeWRXVTdYRzRnSUNBZ0lDQWdJSDA3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVhVzFoWjJVdWMzSmpJRDBnZFhKc08xeHVJQ0FnSUgxY2JpQWdJQ0JDYVhSdFlYQkpiWEJzTG5CeWIzUnZkSGx3WlM1cGJtbDBUMjVHYVhKemRFTnNhV05ySUQwZ1puVnVZM1JwYjI0Z0tDa2dlMXh1SUNBZ0lIMDdYRzRnSUNBZ1FtbDBiV0Z3U1cxd2JDNXdjbTkwYjNSNWNHVXVaMlYwUkhKaGQyRmliR1VnUFNCbWRXNWpkR2x2YmlBb0tTQjdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQjBhR2x6TG1sdFlXZGxPMXh1SUNBZ0lIMDdYRzRnSUNBZ2NtVjBkWEp1SUVKcGRHMWhjRWx0Y0d3N1hHNTlLQ2twTzF4dVpYaHdiM0owY3k1Q2FYUnRZWEJKYlhCc0lEMGdRbWwwYldGd1NXMXdiRHRjYmlJc0lsd2lkWE5sSUhOMGNtbGpkRndpTzF4dVQySnFaV04wTG1SbFptbHVaVkJ5YjNCbGNuUjVLR1Y0Y0c5eWRITXNJRndpWDE5bGMwMXZaSFZzWlZ3aUxDQjdJSFpoYkhWbE9pQjBjblZsSUgwcE8xeHVaWGh3YjNKMGN5NUhjbUZ3YUdsamMwbHRjR3dnUFNCMmIybGtJREE3WEc1MllYSWdhWE5HYVhKbFptOTRJRDBnZEhsd1pXOW1JRWx1YzNSaGJHeFVjbWxuWjJWeUlDRTlQU0FuZFc1a1pXWnBibVZrSnp0Y2JuWmhjaUJIY21Gd2FHbGpjMGx0Y0d3Z1BTQXZLaW9nUUdOc1lYTnpJQ292SUNobWRXNWpkR2x2YmlBb0tTQjdYRzRnSUNBZ1puVnVZM1JwYjI0Z1IzSmhjR2hwWTNOSmJYQnNLQ2tnZTF4dUlDQWdJQ0FnSUNCMGFHbHpMbU5oYm5aaGN5QTlJR1J2WTNWdFpXNTBMbWRsZEVWc1pXMWxiblJDZVVsa0tGd2laMkZ0WldOaGJuWmhjMXdpS1R0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTVqZEhnZ1BTQjBhR2x6TG1OaGJuWmhjeTVuWlhSRGIyNTBaWGgwS0Z3aU1tUmNJaXdnZXlCaGJIQm9ZVG9nWm1Gc2MyVWdmU2s3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVZM1I0TG5kbFltdHBkRWx0WVdkbFUyMXZiM1JvYVc1blJXNWhZbXhsWkNBOUlHWmhiSE5sTzF4dUlDQWdJQ0FnSUNCMGFHbHpMbU4wZUM1dGIzcEpiV0ZuWlZOdGIyOTBhR2x1WjBWdVlXSnNaV1FnUFNCbVlXeHpaVHRjYmlBZ0lDQWdJQ0FnZEdocGN5NWpkSGd1YVcxaFoyVlRiVzl2ZEdocGJtZEZibUZpYkdWa0lEMGdabUZzYzJVN1hHNGdJQ0FnSUNBZ0lHbG1JQ2hwYzBacGNtVm1iM2dwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSFJvYVhNdVkyRnVkbUZ6TG5OMGVXeGxMbWx0WVdkbFVtVnVaR1Z5YVc1bklEMGdYQ0pqY21semNDMWxaR2RsYzF3aU8xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnZEdocGN5NWpZVzUyWVhNdWMzUjViR1V1YVcxaFoyVlNaVzVrWlhKcGJtY2dQU0JjSW5CcGVHVnNZWFJsWkZ3aU8xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ2ZWeHVJQ0FnSUVkeVlYQm9hV056U1cxd2JDNXdjbTkwYjNSNWNHVXVabWxzYkZKbFkzUWdQU0JtZFc1amRHbHZiaUFvZUN3Z2VTd2dkMmxrZEdnc0lHaGxhV2RvZEN3Z1kyOXNLU0I3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVZM1I0TG1acGJHeFRkSGxzWlNBOUlHTnZiRHRjYmlBZ0lDQWdJQ0FnZEdocGN5NWpkSGd1Wm1sc2JGSmxZM1FvZUN3Z2VTd2dkMmxrZEdnc0lHaGxhV2RvZENrN1hHNGdJQ0FnZlR0Y2JpQWdJQ0JIY21Gd2FHbGpjMGx0Y0d3dWNISnZkRzkwZVhCbExtUnlZWGRDYVhSdFlYQWdQU0JtZFc1amRHbHZiaUFvZUN3Z2VTd2dZbWwwYldGd0tTQjdYRzRnSUNBZ0lDQWdJSFJvYVhNdVkzUjRMbVJ5WVhkSmJXRm5aU2hpYVhSdFlYQXVaMlYwUkhKaGQyRmliR1VvS1N3Z2VDd2dlU2s3WEc0Z0lDQWdmVHRjYmlBZ0lDQnlaWFIxY200Z1IzSmhjR2hwWTNOSmJYQnNPMXh1ZlNncEtUdGNibVY0Y0c5eWRITXVSM0poY0docFkzTkpiWEJzSUQwZ1IzSmhjR2hwWTNOSmJYQnNPMXh1SWl3aVhDSjFjMlVnYzNSeWFXTjBYQ0k3WEc1UFltcGxZM1F1WkdWbWFXNWxVSEp2Y0dWeWRIa29aWGh3YjNKMGN5d2dYQ0pmWDJWelRXOWtkV3hsWENJc0lIc2dkbUZzZFdVNklIUnlkV1VnZlNrN1hHNWxlSEJ2Y25SekxsTnZkVzVrU1cxd2JDQTlJSFp2YVdRZ01EdGNiblpoY2lCQmRXUnBiME52Ym5SbGVIUWdQU0IzYVc1a2IzY3VRWFZrYVc5RGIyNTBaWGgwSUh4OElIZHBibVJ2ZHk1M1pXSnJhWFJCZFdScGIwTnZiblJsZUhRN1hHNTJZWElnUVZWRVNVOWZRMDlPVkVWWVZEdGNibVoxYm1OMGFXOXVJR2hoYm1Sc1pWWnBjMmxpYVd4cGRIbERhR0Z1WjJVb0tTQjdYRzRnSUNBZ2FXWWdLRk52ZFc1a1NXMXdiQzVEVlZKU1JVNVVYMDFWVTBsREtTQjdYRzRnSUNBZ0lDQWdJR2xtSUNoa2IyTjFiV1Z1ZEM1b2FXUmtaVzRwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJRk52ZFc1a1NXMXdiQzVEVlZKU1JVNVVYMDFWVTBsRExuTjBiM0FvS1R0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQmxiSE5sSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJRk52ZFc1a1NXMXdiQzVEVlZKU1JVNVVYMDFWVTBsRExuQnNZWGtvVTI5MWJtUkpiWEJzTGtOVlVsSkZUbFJmVFZWVFNVTXVkbTlzZFcxbEtUdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lIMWNibjFjYm1SdlkzVnRaVzUwTG1Ga1pFVjJaVzUwVEdsemRHVnVaWElvWENKMmFYTnBZbWxzYVhSNVkyaGhibWRsWENJc0lHaGhibVJzWlZacGMybGlhV3hwZEhsRGFHRnVaMlVwTzF4dWRtRnlJRk52ZFc1a1NXMXdiQ0E5SUM4cUtpQkFZMnhoYzNNZ0tpOGdLR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpQWdJQ0JtZFc1amRHbHZiaUJUYjNWdVpFbHRjR3dvZFhKc0xDQnRkWE5wWXlrZ2UxeHVJQ0FnSUNBZ0lDQjJZWElnWDNSb2FYTWdQU0IwYUdsek8xeHVJQ0FnSUNBZ0lDQjBhR2x6TG14dllXUmxaQ0E5SUdaaGJITmxPMXh1SUNBZ0lDQWdJQ0IwYUdsekxuWnZiSFZ0WlNBOUlERTdYRzRnSUNBZ0lDQWdJSFJvYVhNdWJYVnphV01nUFNCbVlXeHpaVHRjYmlBZ0lDQWdJQ0FnZEdocGN5NTFjbXdnUFNCMWNtdzdYRzRnSUNBZ0lDQWdJSFJvYVhNdWJYVnphV01nUFNCdGRYTnBZenRjYmlBZ0lDQWdJQ0FnZG1GeUlISmxjU0E5SUc1bGR5QllUVXhJZEhSd1VtVnhkV1Z6ZENncE8xeHVJQ0FnSUNBZ0lDQnlaWEV1YjNCbGJpaGNJa2RGVkZ3aUxDQjFjbXdzSUhSeWRXVXBPMXh1SUNBZ0lDQWdJQ0J5WlhFdWNtVnpjRzl1YzJWVWVYQmxJRDBnWENKaGNuSmhlV0oxWm1abGNsd2lPMXh1SUNBZ0lDQWdJQ0J5WlhFdWIyNXNiMkZrSUQwZ1puVnVZM1JwYjI0Z0tHVjJaVzUwS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ1lYSnlZWGxDZFdabVpYSWdQU0J5WlhFdWNtVnpjRzl1YzJVN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb1lYSnlZWGxDZFdabVpYSXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JmZEdocGN5NWtZWFJoSUQwZ1lYSnlZWGxDZFdabVpYSTdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdYM1JvYVhNdWJHOWhaR1ZrSUQwZ2RISjFaVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JmZEdocGN5NTBjbmxNYjJGa0tDazdYRzRnSUNBZ0lDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lIMDdYRzRnSUNBZ0lDQWdJSEpsY1M1elpXNWtLRzUxYkd3cE8xeHVJQ0FnSUgxY2JpQWdJQ0JUYjNWdVpFbHRjR3d1Y0hKdmRHOTBlWEJsTG5SeWVVeHZZV1FnUFNCbWRXNWpkR2x2YmlBb0tTQjdYRzRnSUNBZ0lDQWdJSFpoY2lCZmRHaHBjeUE5SUhSb2FYTTdYRzRnSUNBZ0lDQWdJR2xtSUNoQlZVUkpUMTlEVDA1VVJWaFVJQ1ltSUhSb2FYTXVaR0YwWVNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnUVZWRVNVOWZRMDlPVkVWWVZDNWtaV052WkdWQmRXUnBiMFJoZEdFb2RHaHBjeTVrWVhSaExDQm1kVzVqZEdsdmJpQW9ZblZtWm1WeUtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdYM1JvYVhNdVluVm1abVZ5SUQwZ1luVm1abVZ5TzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdsbUlDaFRiM1Z1WkVsdGNHd3VRMVZTVWtWT1ZGOU5WVk5KUXlBOVBUMGdYM1JvYVhNcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnVTI5MWJtUkpiWEJzTGtOVlVsSkZUbFJmVFZWVFNVTWdQU0J1ZFd4c08xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JmZEdocGN5NXdiR0Y1S0Y5MGFHbHpMblp2YkhWdFpTazdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0FnSUNBZ2ZTd2dablZ1WTNScGIyNGdLR1VwSUhzZ1kyOXVjMjlzWlM1c2IyY29YQ0pHWVdsc1pXUWdkRzhnYkc5aFpEb2dYQ0lnS3lCZmRHaHBjeTUxY213cE95QjlLVHRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJSDA3WEc0Z0lDQWdVMjkxYm1SSmJYQnNMbkJ5YjNSdmRIbHdaUzVwYm1sMFQyNUdhWEp6ZEVOc2FXTnJJRDBnWm5WdVkzUnBiMjRnS0NrZ2UxeHVJQ0FnSUNBZ0lDQnBaaUFvSVVGVlJFbFBYME5QVGxSRldGUXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lFRlZSRWxQWDBOUFRsUkZXRlFnUFNCdVpYY2dRWFZrYVc5RGIyNTBaWGgwS0NrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JCVlVSSlQxOURUMDVVUlZoVUxuSmxjM1Z0WlNncE8xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJSFJvYVhNdWRISjVURzloWkNncE8xeHVJQ0FnSUgwN1hHNGdJQ0FnVTI5MWJtUkpiWEJzTG5CeWIzUnZkSGx3WlM1d2JHRjVJRDBnWm5WdVkzUnBiMjRnS0hadmJIVnRaU2tnZTF4dUlDQWdJQ0FnSUNCMGFHbHpMblp2YkhWdFpTQTlJSFp2YkhWdFpUdGNiaUFnSUNBZ0lDQWdhV1lnS0NGMGFHbHpMbUoxWm1abGNpa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLSFJvYVhNdWJYVnphV01wSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCVGIzVnVaRWx0Y0d3dVExVlNVa1ZPVkY5TlZWTkpReUE5SUhSb2FYTTdYRzRnSUNBZ0lDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNDdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnYVdZZ0tIUm9hWE11YlhWemFXTXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2hUYjNWdVpFbHRjR3d1UTFWU1VrVk9WRjlOVlZOSlF5QWhQVDBnZEdocGN5a2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2xtSUNoVGIzVnVaRWx0Y0d3dVExVlNVa1ZPVkY5TlZWTkpReWtnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQlRiM1Z1WkVsdGNHd3VRMVZTVWtWT1ZGOU5WVk5KUXk1emRHOXdLQ2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUZOdmRXNWtTVzF3YkM1RFZWSlNSVTVVWDAxVlUwbERJRDBnZEdocGN6dGNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQWdJR2xtSUNoMGFHbHpMbk52ZFhKalpTa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJqdGNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQjBhR2x6TG5OdmRYSmpaU0E5SUVGVlJFbFBYME5QVGxSRldGUXVZM0psWVhSbFFuVm1abVZ5VTI5MWNtTmxLQ2s3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVjMjkxY21ObExtSjFabVpsY2lBOUlIUm9hWE11WW5WbVptVnlPMXh1SUNBZ0lDQWdJQ0IwYUdsekxtZGhhVzRnUFNCQlZVUkpUMTlEVDA1VVJWaFVMbU55WldGMFpVZGhhVzRvS1R0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTV6YjNWeVkyVXVZMjl1Ym1WamRDaDBhR2x6TG1kaGFXNHBPMXh1SUNBZ0lDQWdJQ0IwYUdsekxtZGhhVzR1WTI5dWJtVmpkQ2hCVlVSSlQxOURUMDVVUlZoVUxtUmxjM1JwYm1GMGFXOXVLVHRjYmlBZ0lDQWdJQ0FnYVdZZ0tIUm9hWE11YlhWemFXTXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIUm9hWE11WjJGcGJpNW5ZV2x1TG5aaGJIVmxJRDBnTUR0Y2JpQWdJQ0FnSUNBZ0lDQWdJSFJvYVhNdWMyOTFjbU5sTG14dmIzQWdQU0IwY25WbE8xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJSFJvYVhNdWMyOTFjbU5sTG5OMFlYSjBLREFwTzF4dUlDQWdJQ0FnSUNCcFppQW9kR2hwY3k1dGRYTnBZeWtnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdkR2hwY3k1bllXbHVMbWRoYVc0dWJHbHVaV0Z5VW1GdGNGUnZWbUZzZFdWQmRGUnBiV1VvZG05c2RXMWxMQ0JCVlVSSlQxOURUMDVVUlZoVUxtTjFjbkpsYm5SVWFXMWxJQ3NnTWlrN1hHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdaV3h6WlNCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0IwYUdsekxtZGhhVzR1WjJGcGJpNTJZV3gxWlNBOUlIWnZiSFZ0WlR0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUgwN1hHNGdJQ0FnVTI5MWJtUkpiWEJzTG5CeWIzUnZkSGx3WlM1emRHOXdJRDBnWm5WdVkzUnBiMjRnS0NrZ2UxeHVJQ0FnSUNBZ0lDQnBaaUFvZEdocGN5NXpiM1Z5WTJVcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUlDaDBhR2x6TG0xMWMybGpLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZEdocGN5NW5ZV2x1TG1kaGFXNHViR2x1WldGeVVtRnRjRlJ2Vm1Gc2RXVkJkRlJwYldVb01Dd2dRVlZFU1U5ZlEwOU9WRVZZVkM1amRYSnlaVzUwVkdsdFpTQXJJRE1wTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhaaGNpQjBaVzF3VTI5MWNtTmxYekVnUFNCMGFHbHpMbk52ZFhKalpUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnpaWFJVYVcxbGIzVjBLR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkR1Z0Y0ZOdmRYSmpaVjh4TG5OMGIzQW9LVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5TENBME1EQXdLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdJQ0FnSUdWc2MyVWdlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFJvYVhNdWMyOTFjbU5sTG5OMGIzQW9LVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdJQ0FnSUhSb2FYTXVjMjkxY21ObElEMGdiblZzYkR0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUgwN1hHNGdJQ0FnY21WMGRYSnVJRk52ZFc1a1NXMXdiRHRjYm4wb0tTazdYRzVsZUhCdmNuUnpMbE52ZFc1a1NXMXdiQ0E5SUZOdmRXNWtTVzF3YkR0Y2JpSXNJbHdpZFhObElITjBjbWxqZEZ3aU8xeHVUMkpxWldOMExtUmxabWx1WlZCeWIzQmxjblI1S0dWNGNHOXlkSE1zSUZ3aVgxOWxjMDF2WkhWc1pWd2lMQ0I3SUhaaGJIVmxPaUIwY25WbElIMHBPMXh1Wlhod2IzSjBjeTVVYVd4bGMyVjBTVzF3YkNBOUlIWnZhV1FnTUR0Y2JuWmhjaUJVYVd4bElEMGdMeW9xSUVCamJHRnpjeUFxTHlBb1puVnVZM1JwYjI0Z0tDa2dlMXh1SUNBZ0lHWjFibU4wYVc5dUlGUnBiR1VvWTJGdWRtRnpLU0I3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVZMkZ1ZG1GeklEMGdZMkZ1ZG1Gek8xeHVJQ0FnSUNBZ0lDQjBhR2x6TG5kcFpIUm9JRDBnWTJGdWRtRnpMbmRwWkhSb08xeHVJQ0FnSUNBZ0lDQjBhR2x6TG1obGFXZG9kQ0E5SUdOaGJuWmhjeTVvWldsbmFIUTdYRzRnSUNBZ0lDQWdJSFJvYVhNdWJHOWhaR1ZrSUQwZ2RISjFaVHRjYmlBZ0lDQjlYRzRnSUNBZ1ZHbHNaUzV3Y205MGIzUjVjR1V1WjJWMFJISmhkMkZpYkdVZ1BTQm1kVzVqZEdsdmJpQW9LU0I3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUIwYUdsekxtTmhiblpoY3p0Y2JpQWdJQ0I5TzF4dUlDQWdJRlJwYkdVdWNISnZkRzkwZVhCbExtbHVhWFJQYmtacGNuTjBRMnhwWTJzZ1BTQm1kVzVqZEdsdmJpQW9LU0I3WEc0Z0lDQWdmVHRjYmlBZ0lDQnlaWFIxY200Z1ZHbHNaVHRjYm4wb0tTazdYRzUyWVhJZ1ZHbHNaWE5sZEVsdGNHd2dQU0F2S2lvZ1FHTnNZWE56SUNvdklDaG1kVzVqZEdsdmJpQW9LU0I3WEc0Z0lDQWdablZ1WTNScGIyNGdWR2xzWlhObGRFbHRjR3dvZFhKc0xDQjBhV3hsVjJsa2RHZ3NJSFJwYkdWSVpXbG5hSFFwSUh0Y2JpQWdJQ0FnSUNBZ2RtRnlJRjkwYUdseklEMGdkR2hwY3p0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTVzYjJGa1pXUWdQU0JtWVd4elpUdGNiaUFnSUNBZ0lDQWdkR2hwY3k1aWFYUnRZWEJ6SUQwZ1cxMDdYRzRnSUNBZ0lDQWdJSFJvYVhNdWMyTmhibXhwYm1VZ1BTQXdPMXh1SUNBZ0lDQWdJQ0IwYUdsekxuUnBiR1ZYYVdSMGFDQTlJSFJwYkdWWGFXUjBhRHRjYmlBZ0lDQWdJQ0FnZEdocGN5NTBhV3hsU0dWcFoyaDBJRDBnZEdsc1pVaGxhV2RvZER0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTVwYldGblpTQTlJRzVsZHlCSmJXRm5aU2dwTzF4dUlDQWdJQ0FnSUNCMGFHbHpMbWx0WVdkbExtOXViRzloWkNBOUlHWjFibU4wYVc5dUlDZ3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJmWVR0Y2JpQWdJQ0FnSUNBZ0lDQWdJRjkwYUdsekxuTmpZVzVzYVc1bElEMGdUV0YwYUM1bWJHOXZjaWhmZEdocGN5NXBiV0ZuWlM1M2FXUjBhQ0F2SUhScGJHVlhhV1IwYUNrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ1pHVndkR2dnUFNCTllYUm9MbVpzYjI5eUtGOTBhR2x6TG1sdFlXZGxMbWhsYVdkb2RDQXZJSFJwYkdWSVpXbG5hSFFwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdMeThnWTNWMElIUm9aU0JwYldGblpTQnBiblJ2SUhCcFpXTmxjMXh1SUNBZ0lDQWdJQ0FnSUNBZ1ptOXlJQ2gyWVhJZ2VTQTlJREE3SUhrZ1BDQmtaWEIwYURzZ2VTc3JLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWm05eUlDaDJZWElnZUNBOUlEQTdJSGdnUENCZmRHaHBjeTV6WTJGdWJHbHVaVHNnZUNzcktTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhaaGNpQmpZVzUyWVhNZ1BTQmtiMk4xYldWdWRDNWpjbVZoZEdWRmJHVnRaVzUwS0Z3aVkyRnVkbUZ6WENJcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JqWVc1MllYTXVkMmxrZEdnZ1BTQjBhV3hsVjJsa2RHZzdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdOaGJuWmhjeTVvWldsbmFIUWdQU0IwYVd4bFNHVnBaMmgwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQW9YMkVnUFNCallXNTJZWE11WjJWMFEyOXVkR1Y0ZENoY0lqSmtYQ0lwS1NBOVBUMGdiblZzYkNCOGZDQmZZU0E5UFQwZ2RtOXBaQ0F3SUQ4Z2RtOXBaQ0F3SURvZ1gyRXVaSEpoZDBsdFlXZGxLRjkwYUdsekxtbHRZV2RsTENBdGVDQXFJSFJwYkdWWGFXUjBhQ3dnTFhrZ0tpQjBhV3hsU0dWcFoyaDBLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1gzUm9hWE11WW1sMGJXRndjeTV3ZFhOb0tHNWxkeUJVYVd4bEtHTmhiblpoY3lrcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQWdJRjkwYUdsekxteHZZV1JsWkNBOUlIUnlkV1U3WEc0Z0lDQWdJQ0FnSUgwN1hHNGdJQ0FnSUNBZ0lIUm9hWE11YVcxaFoyVXVjM0pqSUQwZ2RYSnNPMXh1SUNBZ0lIMWNiaUFnSUNCVWFXeGxjMlYwU1cxd2JDNXdjbTkwYjNSNWNHVXVhVzVwZEU5dVJtbHljM1JEYkdsamF5QTlJR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpQWdJQ0I5TzF4dUlDQWdJRlJwYkdWelpYUkpiWEJzTG5CeWIzUnZkSGx3WlM1blpYUlVhV3hsSUQwZ1puVnVZM1JwYjI0Z0tIUnBiR1VwSUh0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUhSb2FYTXVZbWwwYldGd2MxdDBhV3hsWFR0Y2JpQWdJQ0I5TzF4dUlDQWdJSEpsZEhWeWJpQlVhV3hsYzJWMFNXMXdiRHRjYm4wb0tTazdYRzVsZUhCdmNuUnpMbFJwYkdWelpYUkpiWEJzSUQwZ1ZHbHNaWE5sZEVsdGNHdzdYRzRpTENJdkx5QlVhR1VnYlc5a2RXeGxJR05oWTJobFhHNTJZWElnWDE5M1pXSndZV05yWDIxdlpIVnNaVjlqWVdOb1pWOWZJRDBnZTMwN1hHNWNiaTh2SUZSb1pTQnlaWEYxYVhKbElHWjFibU4wYVc5dVhHNW1kVzVqZEdsdmJpQmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZLRzF2WkhWc1pVbGtLU0I3WEc1Y2RDOHZJRU5vWldOcklHbG1JRzF2WkhWc1pTQnBjeUJwYmlCallXTm9aVnh1WEhSMllYSWdZMkZqYUdWa1RXOWtkV3hsSUQwZ1gxOTNaV0p3WVdOclgyMXZaSFZzWlY5allXTm9aVjlmVzIxdlpIVnNaVWxrWFR0Y2JseDBhV1lnS0dOaFkyaGxaRTF2WkhWc1pTQWhQVDBnZFc1a1pXWnBibVZrS1NCN1hHNWNkRngwY21WMGRYSnVJR05oWTJobFpFMXZaSFZzWlM1bGVIQnZjblJ6TzF4dVhIUjlYRzVjZEM4dklFTnlaV0YwWlNCaElHNWxkeUJ0YjJSMWJHVWdLR0Z1WkNCd2RYUWdhWFFnYVc1MGJ5QjBhR1VnWTJGamFHVXBYRzVjZEhaaGNpQnRiMlIxYkdVZ1BTQmZYM2RsWW5CaFkydGZiVzlrZFd4bFgyTmhZMmhsWDE5YmJXOWtkV3hsU1dSZElEMGdlMXh1WEhSY2RDOHZJRzV2SUcxdlpIVnNaUzVwWkNCdVpXVmtaV1JjYmx4MFhIUXZMeUJ1YnlCdGIyUjFiR1V1Ykc5aFpHVmtJRzVsWldSbFpGeHVYSFJjZEdWNGNHOXlkSE02SUh0OVhHNWNkSDA3WEc1Y2JseDBMeThnUlhobFkzVjBaU0IwYUdVZ2JXOWtkV3hsSUdaMWJtTjBhVzl1WEc1Y2RGOWZkMlZpY0dGamExOXRiMlIxYkdWelgxOWJiVzlrZFd4bFNXUmRLRzF2WkhWc1pTd2diVzlrZFd4bExtVjRjRzl5ZEhNc0lGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHBPMXh1WEc1Y2RDOHZJRkpsZEhWeWJpQjBhR1VnWlhod2IzSjBjeUJ2WmlCMGFHVWdiVzlrZFd4bFhHNWNkSEpsZEhWeWJpQnRiMlIxYkdVdVpYaHdiM0owY3p0Y2JuMWNibHh1SWl3aVhDSjFjMlVnYzNSeWFXTjBYQ0k3WEc1UFltcGxZM1F1WkdWbWFXNWxVSEp2Y0dWeWRIa29aWGh3YjNKMGN5d2dYQ0pmWDJWelRXOWtkV3hsWENJc0lIc2dkbUZzZFdVNklIUnlkV1VnZlNrN1hHNWxlSEJ2Y25SekxuTjBZWEowUjJGdFpTQTlJSFp2YVdRZ01EdGNiblpoY2lCSGRYUmxYekVnUFNCeVpYRjFhWEpsS0Z3aUxpOUhkWFJsWENJcE8xeHVUMkpxWldOMExtUmxabWx1WlZCeWIzQmxjblI1S0dWNGNHOXlkSE1zSUZ3aWMzUmhjblJIWVcxbFhDSXNJSHNnWlc1MWJXVnlZV0pzWlRvZ2RISjFaU3dnWjJWME9pQm1kVzVqZEdsdmJpQW9LU0I3SUhKbGRIVnliaUJIZFhSbFh6RXVjM1JoY25SSFlXMWxPeUI5SUgwcE8xeHVJbDBzSW5OdmRYSmpaVkp2YjNRaU9pSWlmUT09IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGRpc3RfMSA9IHJlcXVpcmUoXCJndXRlL2Rpc3RcIik7XG52YXIgVGVzdEdhbWVfMSA9IHJlcXVpcmUoXCIuL1Rlc3RHYW1lXCIpO1xuZGlzdF8xLnN0YXJ0R2FtZShuZXcgVGVzdEdhbWVfMS5UZXN0R2FtZSgpKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=