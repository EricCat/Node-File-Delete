
"use strict";

var fs = require('fs');

exports.deleteFileSync = function(filePath, timeInterval, callback) {
    function iterator(filePath, dirs, callback) {
        fs.stat(filePath, function(err, stats){
            if(err){
                if (err.message === 'No such file or directory') {
                    // Ignore file not found errors and return an empty result
                    callback(null, "");
                } else {
                    // Pass other errors through as is
                    callback(err);
                }
            } else{
                if(stats.isDirectory()) {
                    dirs.unshift(filePath);//collection dirs
                    inner(filePath, dirs);
                } else if(stats.isFile()){
                    fs.unlinkSync(filePath);//delete file
                }
            }
        })
    }

    function inner(path, dirs){
        var arr = fs.readdirSync(path);
        for(var i = 0, el ; el = arr[i++];){
            iterator(path+"/"+el,dirs);
        }
    }

    var ex = function(path, cb){
        cb = cb || function(){};
        var dirs = [];

        try{
            iterator(path, dirs, function(err, data){
                if(err) cb(err);
                for(var i = 0, el ; el = dirs[i++];){
                    fs.rmdirSync(el);//delete all collection dirs
                }
                cb(data);
            });

        }catch(e){
            e.code === "ENOENT" ? cb() : cb(e);
        }
    };
    return setInterval(ex(filePath, callback), timeInterval*1000);
};


