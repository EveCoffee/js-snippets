/**
 * Created by 55hudong on 2016/3/18.
 */

function PreloadImage(imageUrlList) {

    if(imageUrlList === undefined){
        throw new Error("你必须传递资源文件进来，否则罢工");
    }
    if(typeof imageUrlList === "function"){
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

    while(imageUrlList.length){
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
        }
    }


}


PreloadImage.prototype = {
    constructor: PreloadImage,
    onSuccess: function (callback) {
        typeof callback === "function" && (this.successCallback = callback);
        return this;
    },
    onError: function (callback) {
        typeof callback === "function" && (this.errorCallback = callback);
        return this;
    },
    onProgress: function (callback) {
        typeof callback === "function" && (this.progressCallback = callback);
        return this;
    },
    // 所有资源加载完毕, 包括正确和错误的
    onFinish: function (callback) {
        typeof callback === "function" && (this.finishCallback = callback);
        return this;
    },
    // 检测是否已经加载了全部资源
    checkFinish: function () {

        // 更新进度
        this.progress = (this.finishCount / this.allCount * 100).toFixed(0);

        this.progressCallback && this.progressCallback.call(this);

        var status = this.finishCount === this.allCount;
        if(status){
            this.finishCallback && this.finishCallback.call(this);
        }

        return status;
    }

};