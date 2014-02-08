Node-File-Delete
================

Node.js Delete File Function

#Installation

```
npm install file-schedule-delete
```
# How to use it

```
var schedule = require('file-schedule-delete');

………………

schedule.deleteFileSync(absolutePath, ms, function(err, data){
        if(err) throw err;
        //TODO: handle params data
});
```

# Params

* absolutPath: you can choose a file path or a directory path.
* ms: interval time for auto delete file.
* callback: return error info for the first param.