"use strict";

/**
 *
 * @param selector
 * @param config
 * @constructor
 */
function ImageAnimate(selector, config) {

    this.self = document.querySelector(selector);

    if (this.self === null) {
        throw new Error("你需要传递一个有效的选择器进来");
    }

    this.imageList = config.imageList || []; // 动画资源列表
    this.interval = config.interval || 100; // 间隔
    this.index = 0; // 动画播放进度帧数
    this.timer = null; // 定时器
}

ImageAnimate.prototype = {
    constructor: ImageAnimate,
    start: function start() {
        this.positiveAnimate();
    },
    stop: function stop() {
        clearInterval(this.timer);
        this.timer = null;
    },
    // 动画正运动结束
    positiveAnimate: function positiveAnimate() {
        var _this = this;

        this.timer = setInterval(function () {
            _this.self.src = _this.imageList[_this.index++];

            if (_this.index === _this.imageList.length - 1) {
                clearInterval(_this.timer);
                _this.timer = null;
                _this.antiAnimate();
            }
        }, this.interval);
    },
    // 动画反向运动结束
    antiAnimate: function antiAnimate() {
        var _this = this;

        this.timer = setInterval(function () {
            var index = _this.imageList.length + 1;
            _this.self.src = _this.imageList[_this.index--];

            if (_this.index < 1) {
                clearInterval(_this.timer);
                _this.timer = null;
                _this.positiveAnimate();
            }
        }, this.interval);
    },
    autoPlay: function autoPlay() {
        this.positiveAnimate();
    }
};