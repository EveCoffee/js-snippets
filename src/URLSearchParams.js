/**
 * Created by coffee on 2016/2/11.
 */

class URLSearchParams{
    constructor(queryString){
        this.queryStirng = queryString;
        this.queryDict = {};
        /*this.queryDict = {
            a: [1,2],
            b: ["word"],
            c: ["str"],
            d: ["c1", "c2"]
        };*/

        if(this.queryStirng){
            this.parse();
        }
    }

    append(key, value){
        if(key !== undefined && value !== undefined){
            this.queryDict[key].push(value);
        }
    }

    delete(key){
        if(this.queryDict[key]){
            delete this.queryDict[key];
        }
    }

    entries(){

    }

    get(key){
        if(this.queryDict[key] && this.queryDict[key].length >= 1){
            return this.queryDict[key][0];
        }else{
            return null;
        }
    }

    getAll(key){
        if(this.queryDict[key] && this.queryDict[key].length >= 1){
            return this.queryDict[key];
        }else{
            return null;
        }
    }

    set(key, value){
        if(key !== undefined && value !== undefined){
            this.queryDict[key] = [value];
        }
    }

    has(key){
        return !!(this.queryDict[key] && this.queryDict[key].length >= 1);
    }

    values(){

    }

    toString(){
        var list = [], keys = [];

        keys = Object.keys(this.queryDict);

        keys.forEach( key => {

            this.queryDict[key].forEach( (value, i) => {
                list.push(`${key}=${value}`);
            });

        });

        return list.join("&");
    }

    parse(){
        this.queryDict = {};
        this.queryStirng.split("&").forEach((ele, i) => {
            var tmpList = ele.split("=");
            if(tmpList.length === 2){
                if(!this.queryDict[tmpList[0]]){
                    this.queryDict[tmpList[0]] = [];
                }
                this.queryDict[tmpList[0]].push(tmpList[1]);

            }
        });
    }

}


exports.URLSearchParams = URLSearchParams;
exports.value = 1;