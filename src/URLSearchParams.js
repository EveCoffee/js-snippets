/**
 * Created by coffee on 2016/2/11.
 */

class URLSearchParams{
    constructor(queryString){
        this.queryStirng = queryString;

        if(this.queryStirng){
            this.parse();
        }
    }

    append(){

    }

    delete(){

    }

    entries(){

    }

    get(){

    }

    getAll(){

    }

    set(){

    }

    values(){

    }

    toString(){
        var list = [], keys = [];

        keys = Object.keys(this.queryDict);

        keys.forEach(function (key, i) {
            list.push(`${key}=${this.queryDict[key]}`);
        });

        return list.join("&");
    }

    parse(){
        this.queryDict = {};
        this.queryStirng.split("&").forEach((ele, i) => {
            var tmpList = ele.split("=");
            if(tmpList.length === 2){
                this.queryDict[tmpList[0]] = tmpList[1];
            }
        });
    }

}


exports.URLSearchParams = URLSearchParams;