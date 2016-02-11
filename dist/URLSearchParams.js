"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by coffee on 2016/2/11.
 */

var URLSearchParams = function () {
    function URLSearchParams(queryString) {
        _classCallCheck(this, URLSearchParams);

        this.queryStirng = queryString;

        if (this.queryStirng) {
            this.parse();
        }
    }

    _createClass(URLSearchParams, [{
        key: "append",
        value: function append() {}
    }, {
        key: "delete",
        value: function _delete() {}
    }, {
        key: "entries",
        value: function entries() {}
    }, {
        key: "get",
        value: function get() {}
    }, {
        key: "getAll",
        value: function getAll() {}
    }, {
        key: "set",
        value: function set() {}
    }, {
        key: "values",
        value: function values() {}
    }, {
        key: "toString",
        value: function toString() {
            var list = [],
                keys = [];

            keys = Object.keys(this.queryDict);

            keys.forEach(function (key, i) {
                list.push(key + "=" + this.queryDict[key]);
            });

            return list.join("&");
        }
    }, {
        key: "parse",
        value: function parse() {
            var _this = this;

            this.queryDict = {};
            this.queryStirng.split("&").forEach(function (ele, i) {
                var tmpList = ele.split("=");
                if (tmpList.length === 2) {
                    _this.queryDict[tmpList[0]] = tmpList[1];
                }
            });
        }
    }]);

    return URLSearchParams;
}();