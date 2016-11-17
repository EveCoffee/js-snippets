"use strict";

/**
 * Created by 55hudong on 2016/3/22.
 */

function Modal(selector) {
    this.self = document.querySelector(selector);

    console.log(this.self);
}

Modal.prototype = {
    constructor: Modal,
    show: function show() {
        this.self.classList.remove("hide");
    },
    hide: function hide() {
        this.self.classList.add("hide");
    }
};

var modal = new Modal(".hot-area");

function HotArea() {
    var _this = this;
    this.body = document.body;
    this.self = document.querySelector(".hot-area");

    this.showBtn = this.self.querySelector(".show-btn");
    this.closeBtn = this.self.querySelector(".show-area .close-btn");

    this.renderArea = this.self.querySelector(".render-area");
    this.showArea = null;

    // 绘制热区的坐标
    this.startX = 0;
    this.startY = 0;
    this.endX = 0;
    this.endY = 0;

    // 双向绑定数据
    this.data = {};

    Object.defineProperties(this.data, {
        selectElement: {
            value: {
                Width: _this.self.querySelector(".box-info .width"),
                Height: _this.self.querySelector(".box-info .height"),
                Top: _this.self.querySelector(".box-info .top"),
                Left: _this.self.querySelector(".box-info .left")
            }
        },
        top: {
            get: function get() {
                return this.selectElement.Top.innerText;
            },
            set: function set(value) {
                /*console.log(this);
                this.top = value;*/
                this.selectElement.Top.innerText = value;
            }
        },
        left: {
            get: function get() {
                return this.selectElement.Left.innerText;
            },
            set: function set(value) {
                /*console.log(this);
                 this.top = value;*/
                this.selectElement.Left.innerText = value;
            }
        },
        width: {
            get: function get() {
                return this.selectElement.Width.innerText;
            },
            set: function set(value) {
                /*console.log(this);
                 this.top = value;*/
                this.selectElement.Width.innerText = value;
            }
        },
        height: {
            get: function get() {
                return this.selectElement.Height.innerText;
            },
            set: function set(value) {
                /*console.log(this);
                 this.top = value;*/
                this.selectElement.Height.innerText = value;
            }
        }

    });

    this.hotAreaList = [
        /*{
            startX: 0,
            startY: 0,
            endX: 100,
            endY: 100
        }*/
    ];

    if (window.localStorage.getItem("hotAreaList") !== null) {
        this.hotAreaList = JSON.parse(window.localStorage.getItem("hotAreaList"));
    }

    // 推盒子的时候进行数据保存以及重绘
    this.hotAreaList.push = function () {
        Array.prototype.push.apply(this, arguments);
        window.localStorage.setItem("hotAreaList", JSON.stringify(this));
        _this.render();
    };

    console.log(this.hotAreaList);
    // 初始化数据


    this.showBtn.onclick = function () {
        _this.self.classList.remove("hide");
    };
    this.closeBtn.onclick = function () {
        _this.self.classList.add("hide");

        console.log(_this.showBtn);
    };

    this.render();

    this.body.addEventListener("click", function (event) {

        // 是否选中了一个热区
        if (event.target !== this && event.target.dataset.type === "hot-area") {
            var index = event.target.dataset.index;
            var obj = _this.hotAreaList[index];

            _this.data.width = obj.endX - obj.startX;
            _this.data.height = obj.endY - obj.startY;
            _this.data.top = obj.startY;
            _this.data.left = obj.startX;

            var allNode = event.target.parentNode.childNodes;

            for (var i = 0; i < allNode.length; i++) {
                if (allNode[i].nodeType === 1) {

                    if (event.target === allNode[i]) {
                        allNode[i].classList.add("active");
                    } else {
                        allNode[i].classList.remove("active");
                    }
                }
            }

            modal.show();
        } else {
            modal.hide();
        }
    });

    this.body.addEventListener("mousedown", function (event) {
        if (event.target.className === "border-left") {}
    });

    this.mouseDownEvent = function (event) {
        //            console.log("按下了鼠标左键");
        _this.startX = event.clientX;
        _this.startY = event.clientY;

        _this.showArea.style.top = _this.startY + "px";
        _this.showArea.style.left = _this.startX + "px";

        _this.body.addEventListener("mousemove", _this.mouseMoveEvent);
    };

    this.mouseMoveEvent = function (event) {

        _this.endX = event.clientX;
        _this.endY = event.clientY;

        var size = _this.calcHotArea();

        _this.showArea.style.width = size.width + "px";
        _this.showArea.style.height = size.height + "px";
    };

    this.mouseUpEvent = function (event) {
        //            console.log("放开了鼠标左键");
        _this.endX = event.clientX;
        _this.endY = event.clientY;

        _this.addHotArea();
        _this.endRecord();
    };

    this.body.addEventListener("keydown", function (event) {

        // "N"
        if (event.keyCode === 78) {
            _this.startRecord();
        }

        // "ESC"
        if (event.keyCode === 27) {
            _this.endRecord();
        }
    });
}
HotArea.prototype = {
    constructor: HotArea,

    // 创建用于展示的区域。 鼠标滑动时候显示
    createShowArea: function () {
        var calcDivIsCreate = false,
            calcDiv = null;

        return function () {
            if (!calcDivIsCreate) {
                calcDivIsCreate = true;
                calcDiv = document.createElement("div");
                calcDiv.style.display = "none";
                calcDiv.style.position = "absolute";
                calcDiv.style.border = "1px solid red";

                this.renderArea.appendChild(calcDiv);
            }

            return calcDiv;
        };
    }(),
    startRecord: function startRecord() {
        this.body.classList.add("move");

        this.showArea = this.createShowArea();
        this.showArea.style.display = "block";
        this.showArea.style.width = "0px";
        this.showArea.style.height = "0px";

        this.body.addEventListener("mousedown", this.mouseDownEvent);
        this.body.addEventListener("mouseup", this.mouseUpEvent);
    },
    endRecord: function endRecord() {
        this.body.classList.remove("move");

        this.body.removeEventListener("mousedown", this.mouseDownEvent);
        this.body.removeEventListener("mouseup", this.mouseUpEvent);
        this.body.removeEventListener("mousemove", this.mouseMoveEvent);

        this.showArea.style.display = "none";

        // 把录制好的盒子推进列表
        this.hotAreaList.push({
            startX: this.startX,
            startY: this.startY,
            endX: this.endX,
            endY: this.endY
        });
    },

    // 计算鼠标移动热区的位置
    calcHotArea: function calcHotArea() {

        return {
            width: this.endX - this.startX,
            height: this.endY - this.startY
        };
    },

    // 添加热区节点
    addHotArea: function addHotArea() {
        console.log(this.endX - this.startX, this.endY - this.startY);
    },

    // 渲染已经添加热区
    render: function render() {
        var html = "",
            htmlTpl;

        this.hotAreaList.forEach(function (obj, index) {
            htmlTpl = "\n                <div class=\"hot-area-box\" data-type=\"hot-area\" data-index=\"" + index + "\" draggable=\"true\" style=\"position: absolute; top: " + obj.startY + "px; left: " + obj.startX + "px; width: " + (obj.endX - obj.startX) + "px; height: " + (obj.endY - obj.startY) + "px; background-color: #ccc;\">\n                    <span class=\"border-left\" style=\"\"></span>\n                    <span class=\"border-right\" style=\"\"></span>\n                    <span class=\"border-top\" style=\"\"></span>\n                    <span class=\"border-bottom\" style=\"\"></span>\n                    \n                    <span class=\"border-top-left\"></span>\n                    <span class=\"border-top-right\"></span>\n                    <span class=\"border-bottom-left\"></span>\n                    <span class=\"border-bottom-right\"></span>\n                </div>\n            ";
            html += htmlTpl;
        });

        this.renderArea.querySelector(".var-area").innerHTML = html;

        //            console.log(this.createShowArea());
    }
};