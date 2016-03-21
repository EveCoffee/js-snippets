###图像预加载插件

##使用方法

+ 构造器 **new PreloadImage()**.  参数： "图像资源列表"，必需。
+ onSuccess. 回调，成功加载一个资源即会触发一次。
+ onError. 回调，加载了一个错误的资源时会触发一次。
+ onProgress. 回调， 每加载完一个资源，无论成功或者失败都会调用一次。
+ onFinish. 回调， 所有资源加载完毕后会触发

##公开属性
+ progress. 在事件里通过访问this.progress即可， 进度单位为百分比

接口示例：
```javascript
var imgList = ["eerro.jpg", "1-bg.jpg", "2-title.png", "4-3.png", "5.gif", "7-1.jpg", "8-1.png", "bg2_02.jpg", "light.png", "p3_a4.png", "step-2.png", "1.gif", "3-1.png", "4-intestine.png", "6-1.png", "7-1.png", "8-3.png", "icon-bottle.png", "p2_peo1.png", "p3_a5.png", "step-3.png", "2-1.png", "3-2.png", "4.gif", "6-2.png", "7-3.png", "8.gif", "icon-bottle.webp", "p2_peo2.png", "p3_peo1.png", "step-4.png", "2-2.png", "3-3.png", "5-1.png", "6-3.png", "8.png", "icon-intestine.png", "p3_a1.png", "p3_peo2.png", "2-intestine.png", "4-1.gif", "5-2.png", "6.gif", "7.gif", "9-1.png", "icon-music.png", "p3_a2.png", "2-music.png", "4-1.png", "5-3.png", "7-1.gif", "8-1.gif", "9-3.png", "light-bg.png", "p3_a3.png", "step-1.png"];
imgList = imgList.map(function (path) {
    return "images/" + path;
});

var progress = document.querySelector("#loading .num");

var imageLoad = new PreloadImage(imgList);
imageLoad.onFinish(function () {
    console.log("我已经加载好了");
}).onSuccess(function (src) {
    //console.log(src);
}).onError(function (src) {
    //console.error("报告，发现一个错误图片：" + src);
}).onProgress(function () {
    console.log(this.progress);
    progress.innerText = this.progress;
});
```
