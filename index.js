
"use strict";

var fs = require('fs');

exports.deleteFileSync = function(filePath, timeInterval, callback) {
    function iterator(filePath, dirs, callback) {
        fs.stat(filePath, function(err, stats){
            if(err){
                callback(err);
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

    var interval = timeInterval * 1000;
    return setInterval(function(){
        callback = callback || function(){};
        var dirs = [];
        iterator(filePath, dirs, function(err, data){
            if(err) callback(err);
            for(var i = 0, el ; el = dirs[i++];){
                fs.rmdirSync(el);//delete all collection dirs
            }
            callback(data);
            console.log(data + 'success');
        });

    }, interval);
};


