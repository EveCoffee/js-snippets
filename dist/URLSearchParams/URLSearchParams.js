"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * URLSearchParams
 * Created by coffee on 2016/2/11.
 */

var URLSearchParams = function () {
    function URLSearchParams(queryString) {
        _classCallCheck(this, URLSearchParams);

        this.queryStirng = queryString;
        this.queryDict = {};
        /*this.queryDict = {
            a: [1,2],
            b: ["word"],
            c: ["str"],
            d: ["c1", "c2"]
        };*/

        if (this.queryStirng) {
            this.parse();
        }
    }

    _createClass(URLSearchParams, [{
        key: "append",
        value: function append(key, value) {
            if (key !== undefined && value !== undefined) {
                this.queryDict[key].push(value);
            }
        }
    }, {
        key: "delete",
        value: function _delete(key) {
            if (this.queryDict[key]) {
                delete this.queryDict[key];
            }
        }
    }, {
        key: "entries",
        value: function entries() {}
    }, {
        key: "get",
        value: function get(key) {
            if (this.queryDict[key] && this.queryDict[key].length >= 1) {
                return this.queryDict[key][0];
            } else {
                return null;
            }
        }
    }, {
        key: "getAll",
        value: function getAll(key) {
            if (this.queryDict[key] && this.queryDict[key].length >= 1) {
                return this.queryDict[key];
            } else {
                return null;
            }
        }
    }, {
        key: "set",
        value: function set(key, value) {
            if (key !== undefined && value !== undefined) {
                this.queryDict[key] = [value];
            }
        }
    }, {
        key: "has",
        value: function has(key) {
            return !!(this.queryDict[key] && this.queryDict[key].length >= 1);
        }
    }, {
        key: "values",
        value: function values() {}
    }, {
        key: "toString",
        value: function toString() {
            var _this = this;

            var list = [],
                keys = [];

            keys = Object.keys(this.queryDict);

            keys.forEach(function (key) {

                _this.queryDict[key].forEach(function (value, i) {
                    list.push(key + "=" + value);
                });
            });

            return list.join("&");
        }
    }, {
        key: "parse",
        value: function parse() {
            this.queryDict = {};

            this.queryStirng.replace(/\??(\w+)=(\w+)/g, function (full, key, value) {
                this.queryDict[key] = this.queryDict[key] | [];
                this.queryDict.push(value);
            });
        }
    }]);

    return URLSearchParams;
}();

exports.URLSearchParams = URLSearchParams;
exports.value = 1;