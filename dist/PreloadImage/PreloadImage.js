"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by 冷色的咖啡 on 2016/3/18.
 */

var PreloadImage = function () {
    function PreloadImage(imageUrlList) {
        _classCallCheck(this, PreloadImage);

        if (imageUrlList === undefined) {
            throw new Error("你必须传递资源文件进来，否则罢工");
        }
        if (typeof imageUrlList === "function") {
            imageUrlList = [imageUrlList];
        }

        // 总进度
        this.allCount = imageUrlList.length;

        // 完成数量， 正确或者错误的加载都算
        this.finishCount = 0;

        // 成功和失败的数量
        this.successCount = 0;
        this.failCount = 0;

        // 进度： 整数。 百分比单位
        this.progress = 0;

        var _this = this;

        while (imageUrlList.length) {
            var image = document.createElement("img");
            image.src = imageUrlList.shift();
            image.onload = function () {
                _this.successCount++;
                _this.finishCount++;

                _this.successCallback && _this.successCallback.call(_this, this.src);

                _this.checkFinish();
            };
            image.onerror = function () {
                _this.failCount++;
                _this.finishCount++;

                _this.errorCallback && _this.errorCallback.call(_this, this.src);

                _this.checkFinish();
            };
        }
    }

    _createClass(PreloadImage, [{
        key: "onSuccess",
        value: function onSuccess(callback) {
            typeof callback === "function" && (this.successCallback = callback);
            return this;
        }
    }, {
        key: "onError",
        value: function onError(callback) {
            typeof callback === "function" && (this.errorCallback = callback);
            return this;
        }
    }, {
        key: "onProgress",
        value: function onProgress(callback) {
            typeof callback === "function" && (this.progressCallback = callback);
            return this;
        }

        // 所有资源加载完毕, 包括正确和错误的

    }, {
        key: "onFinish",
        value: function onFinish(callback) {
            typeof callback === "function" && (this.finishCallback = callback);
            return this;
        }

        // 检测是否已经加载了全部资源

    }, {
        key: "checkFinish",
        value: function checkFinish() {

            // 更新进度
            this.progress = (this.finishCount / this.allCount * 100).toFixed(0);

            this.progressCallback && this.progressCallback.call(this);

            var status = this.finishCount === this.allCount;
            if (status) {
                this.finishCallback && this.finishCallback.call(this);
            }

            return status;
        }
    }]);

    return PreloadImage;
}();