"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by coffee on 16/5/15.
 */

var TimeFormat = function () {
    function TimeFormat() {
        var date = arguments.length <= 0 || arguments[0] === undefined ? new Date() : arguments[0];

        _classCallCheck(this, TimeFormat);

        // 星期:  星期日 - 星期六
        var weekString = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        // 月份: 1-12
        var monthString = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        // 每年的全部月份包含的天数, 运行中动态添加
        var yearDays = {};

        this.formatMethod = {

            /**
             * 月份中的第几天, 有前导零的2位数字
             * 01 到 31
             */
            "d": function d(inputTime) {
                var date = inputTime.getDate();

                return date >= 10 ? date : "0" + date;
            },

            /**
             * 星期中的第几天, 文本表示, 3个字母
             * Mon 到 Sun
             */
            "D": function D(inputTime) {
                return weekString[inputTime.getDay()].substring(0, 3);
            },

            /**
             * 月份中的第几天, 没有前导零
             * 1 到 31
             */
            "j": function j(inputTime) {
                return inputTime.getDate();
            },

            /**
             * 星期几, 完整的文本格式
             * Sunday 到 Saturday
             */
            "l": function l(inputTime) {
                return weekString[inputTime.getDay()];
            },

            /**
             * ISO-8601 格式数字表示的星期中的第几天
             * 1（表示星期一）到 7（表示星期天）
             */
            "N": function N(inputTime) {

                if (inputTime.getDay() !== 0) {
                    return inputTime.getDay() + 1;
                } else {
                    return 7;
                }
            },

            /**
             * 每月天数后面的英文后缀，2 个字符
             * st，nd，rd 或者 th。可以和 j 一起用
             */
            /*"S": function (inputTime) {
              },*/

            /**
             * 星期中的第几天，数字表示
             * 0（表示星期天）到 6（表示星期六）
             */
            "w": function w(inputTime) {
                return inputTime.getDay();
            },

            /**
             * 年份中的第几天
             * 	0 到 365
             */
            "z": function z(inputTime) {

                var year = inputTime.getFullYear(),
                    month = inputTime.getMonth(),
                    day = inputTime.getDate();

                // 计算对应年份下的所有月份天数
                if (!yearDays[year]) {

                    yearDays[year] = [];

                    var i = 0;

                    do {

                        var date = new Date(year, i + 1, 0); // 注意设置月份的时候是从1开始的, 0 会推到上一年
                        yearDays[year].push(date.getDate());
                    } while (++i < 12);
                }

                // 计算累计天数
                var days = 0;
                for (var _i = 0; _i <= month; _i++) {

                    if (_i !== month) {
                        days += yearDays[year][_i];
                    } else {
                        days += day;
                    }
                }

                return days;
            },

            /**
             * ISO-8601 格式年份中的第几周，每周从星期一开始（PHP 4.1.0 新加的）
             * 例如：42（当年的第 42 周）
             */
            /*"W": function (inputTime) {
             },*/

            /**
             * 月份，完整的文本格式，例如 January 或者 March
             * January 到 December
             */
            "F": function F(inputTime) {
                return monthString[inputTime.getMonth()];
            },

            /**
             * 数字表示的月份，有前导零
             * 01 到 12
             */
            "m": function m(inputTime) {
                var month = inputTime.getMonth() + 1;

                return month >= 10 ? month : "0" + month;
            },

            /**
             * 三个字母缩写表示的月份
             * 	Jan 到 Dec
             */
            "M": function M(inputTime) {
                return monthString[inputTime.getMonth()].substring(0, 3);
            },

            /**
             * 数字表示的月份，没有前导零
             * 1 到 12
             */
            "n": function n(inputTime) {
                return inputTime.getMonth() + 1;
            },

            /**
             * 给定月份所应有的天数
             * 	28 到 31
             */
            "t": function t(inputTime) {
                return new Date(inputTime.getYear(), inputTime.getMonth(), 0);
            },

            /**
             * 是否为闰年
             * 如果是闰年为 1，否则为 0
             */
            "L": function L(inputTime) {},

            /**
             * ISO-8601 格式年份数字。这和 Y 的值相同，只除了如果 ISO 的星期数（W）属于前一年或下一年，则用那一年。
             * Examples: 1999 or 2003
             */
            /*"o": function (inputTime) {
             },
            */
            /**
             * 4 位数字完整表示的年份
             * 	例如：1999 或 2003
             */
            "Y": function Y(inputTime) {
                return inputTime.getFullYear();
            },

            /**
             * 2 位数字表示的年份
             * 例如：99 或 03
             */
            "y": function y(inputTime) {
                return inputTime.getFullYear().toString().substring(2);
            },

            /**
             * 小写的上午和下午值
             * am 或 pm
             */
            "a": function a(inputTime) {},

            /**
             * 大写的上午和下午值
             * AM 或 PM
             */
            "A": function A(inputTime) {},

            /**
             * Swatch Internet 标准时
             * 	000 到 999
             */
            /*"B": function (inputTime) {
             },*/

            /**
             * 小时，12 小时格式，没有前导零
             * 1 到 12
             */
            "g": function g(inputTime) {
                return inputTime.getHours() % 12;
            },

            /**
             * 小时，24 小时格式，没有前导零
             * 0 到 23
             */
            "G": function G(inputTime) {
                return inputTime.getHours();
            },

            /**
             * 小时，12 小时格式，有前导零
             * 	01 到 12
             */
            "h": function h(inputTime) {
                var hour = inputTime.getHours() % 12;
                return hour >= 10 ? hour : "0" + hour;
            },

            /**
             * 小时，24 小时格式，有前导零
             * 00 到 23
             */
            "H": function H(inputTime) {
                var hour = inputTime.getHours();
                return hour >= 10 ? hour : "0" + hour;
            },

            /**
             * 有前导零的分钟数
             * 	00 到 59
             */
            "i": function i(inputTime) {
                var minutes = inputTime.getMinutes();
                return minutes >= 10 ? minutes : "0" + minutes;
            },

            /**
             * 秒数，有前导零
             * 	00 到 59
             */
            "s": function s(inputTime) {
                var sec = inputTime.getSeconds();
                return sec >= 10 ? sec : "0" + sec;
            }

        };
        /**
         * 毫秒 （PHP 5.2.2 新加）。需要注意的是 date() 函数总是返回 000000 因为它只接受 integer 参数， 而 DateTime::format() 才支持毫秒。
         * 示例: 654321
         */
        /*"u": function (inputTime) {
         }*/
        this.formatKey = Object.keys(this.formatMethod);
        this.formatReg = new RegExp("[" + this.formatKey.join("") + "]", "g");

        this.date = this.getTimeObject(date);
    }

    _createClass(TimeFormat, [{
        key: "get",
        value: function get() {
            var _this = this;

            var str = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];

            return str.replace(this.formatReg, function ($0) {
                return _this.formatMethod[$0].call(_this, _this.date);
            });
        }
    }, {
        key: "getTimeObject",
        value: function getTimeObject(inputTime) {

            if (typeof inputTime === "string") {

                // 判断日期字符串内是否包含"-", 需要替换成 "/" , Safari才不会报错
                if (inputTime.indexOf("-") !== -1) {
                    inputTime = inputTime.replace(/-/g, "/");
                }

                // 判断是否包含"天", 不然Safari又报错
                if (/^\d{2,4}\/\d{1,2}$/.test(inputTime)) {
                    inputTime += "/01";
                }
            }

            if (inputTime instanceof Date) {
                return inputTime;
            } else {
                return new Date(inputTime);
            }
        }
    }]);

    return TimeFormat;
}();

console.log(new TimeFormat().get("Y-m-d h:i:s z"));