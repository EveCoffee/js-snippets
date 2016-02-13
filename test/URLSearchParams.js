/**
 * Created by coffee on 2016/2/11.
 */

'use strict';

var assert = require('assert');
var async = require("async");
var URLSearchParams = require("../dist/URLSearchParams").URLSearchParams;
var value = require("../dist/URLSearchParams").value;


describe("测试是否可以加载文件", function() {
    it("value的值应该是 '1' ", function() {
        expect(value).toBe(1);
    });
});

describe("测试模块逻辑", function () {

    var paramsString = "q=URLUtils.searchParams&topic=api";
    var searchParams = new URLSearchParams(paramsString);

    it("测试构造器", function () {
        expect(searchParams.queryStirng).toBe(paramsString);
    });

    it("测试has方法", function () {
        expect(searchParams.has("topic")).toBe(true);
    });

    it("测试get方法", function () {
        //searchParams.get("topic") === "api"; // true
        //searchParams.get("foo") === null; // true
        expect(searchParams.get("topic")).toBe("api");
        expect(searchParams.get("foo")).toBe(null);

    });

    it("测试getAll方法", function () {
        //searchParams.getAll("topic"); // ["api"]
        expect(searchParams.getAll("topic")).toEqual(["api"]);
    });

    it("测试append方法", function () {
        searchParams.append("topic", "webdev");
        //searchParams.toString(); // "q=URLUtils.searchParams&topic=api&topic=webdev"
        expect(searchParams.toString()).toBe("q=URLUtils.searchParams&topic=api&topic=webdev");
    });

    it("测试delete方法", function () {
        searchParams.delete("topic");
        //searchParams.toString(); // "q=URLUtils.searchParams"
        expect(searchParams.toString()).toBe("q=URLUtils.searchParams");
    });



});