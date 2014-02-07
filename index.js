
"use strict";

var fs = require('fs');

exports.deleteFileSync = function(filePath, timeInterval) {
    function iterator(filePath, dirs) {
        var stat = fs.stat(filePath);
        if(stat.isDirectory()) {
            dirs.unshift(filePath);//collection dirs
            inner(filePath, dirs);
        } else if(stat.isFile()){
            fs.unlinkSync(filePath);//delete file
        }
    }

    function inner(path, dirs){
        var arr = fs.readdirSync(path);
        for(var i = 0, el ; el = arr[i++];){
            iterator(path+"/"+el,dirs);
        }
    }
    return setInterval(function(path, cb){
        cb = cb || function(){};
        var dirs = [];

        try{
            iterator(path, dirs);
            for(var i = 0, el ; el = dirs[i++];){
                fs.rmdirSync(el);//delete all collection dirs
            }
            cb()
        }catch(e){
            e.code === "ENOENT" ? cb() : cb(e);
        }
    }, timeInterval*1000);
};


