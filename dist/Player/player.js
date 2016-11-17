"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CoffeePlayer = exports.CoffeePlayer = function () {
    function CoffeePlayer(config) {
        var _this = this;

        _classCallCheck(this, CoffeePlayer);

        this.enablePlayFullScreen = config.enablePlayFullScreen || true;

        $(document.body).append("\n            <div class=\"video-modal\">\n            \n                <div class=\"mask\"></div>\n            \n                <!--\u64AD\u653E\u5668-->\n                <div class=\"player\">\n                    <video class=\"v\" src=\"\" webkit-playsinline playsinline controls preload=\"auto\"></video>\n                </div>\n            \n            </div>\n        ");

        this.player = document.querySelector(".video-modal .player .v");
        this.modal = $(".video-modal");

        this.modal.find(".mask").click(function (event) {
            _this.hide();
        });

        console.log(this.player);

        this.init();
        this.setSrc();
    }

    _createClass(CoffeePlayer, [{
        key: "init",
        value: function init() {

            if (this.enablePlayFullScreen) {

                this.player.addEventListener("play", function (event) {
                    console.log(event);
                    console.log("我已经开始了");
                    // this.player.webkitEnterFullScreen();
                });

                /**
                 * 播放结束后退出全屏
                 */
                this.player.addEventListener("ended", function () {
                    // this.player.webkitExitFullScreen();

                    // this.hide();
                });

                $(document).on("webkitfullscreenchange", function () {
                    console.log("退出了全屏!");
                    // this.pause();
                });
            }
        }
    }, {
        key: "isFullScreen",
        value: function isFullScreen() {}
    }, {
        key: "play",
        value: function play() {
            var _this2 = this;

            this.player.play();

            /**
             * 解决瞬间显示又立刻触发遮罩导致的消失bug
             */
            setTimeout(function () {
                _this2.modal.show();
            }, 0);

            this.player.addEventListener("canplay", function (event) {
                // this.player.webkitEnterFullScreen();
                _this2.player.play();
            });

            /*if(this.enablePlayFullScreen){
                this.player.webkitEnterFullScreen();
                console.log("我看到了你的全屏请求");
            }
             setTimeout(() => {
                // this.player.play();
                this.player.play();
                 this.player.webkitEnterFullScreen();
            }, 500);*/

            // this.player.play();


            return this;
        }
    }, {
        key: "pause",
        value: function pause() {
            this.player.pause();
            return this;
        }
    }, {
        key: "show",
        value: function show() {
            this.modal.show();
        }
    }, {
        key: "hide",
        value: function hide() {
            this.modal.hide();
            this.player.pause();
        }
    }, {
        key: "setSrc",
        value: function setSrc(path) {

            if (path) {
                this.player.src = path;
            }

            return this;
        }
    }, {
        key: "getSrc",
        value: function getSrc() {
            return this.player.src;
        }
    }]);

    return CoffeePlayer;
}();

var Sound = exports.Sound = function Sound() {
    _classCallCheck(this, Sound);
};