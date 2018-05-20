 
var fs = require("fs-extra")
    , $Path = require("path")
    , targetDir = './.ignore/testDir'
    , $ = jQuery = require("jquery")
    , up = require("all-unpacker")
    , copyCFile = (pth, dst) => {
        //synchronous copy
        fs.copySync(pth, dst, {overwrite: false});
        return dst;
    }
    , notAscii = (str) => {
        if (str.split('').some((ch) => {return ch.charCodeAt() >= 128;})) {
            return true;//copyCFile(str, encodeURI(str));
        }
        return false;//str;
    }
    , rreadir = (path, callback) => {
        var directory = [], search = [], subRead = (err, files) => {
            directory = directory.concat(files || []);
            if (search.length) { return fs.readdir(search.pop(), subRead); }
            else { return callback(err, files); }
        };
        search.push(path);
        return subRead();
    }
    , createComic = (err, cPath, tempDir, imgar) => {
        imgar = imgar.map(ele => { return {id: ele.id, fi: tempDir + "\\" + ele.fi};});
        var subEle = $('<img height="100" width="100">')
        , loadPage = function() {
            /*
            //var { imgar } = subEle.data();
            $("#covele").attr("src", imgar[0].fi);
            $("#pages").empty();
            imgar.forEach((fi) => {
                var ssEle = $('<img height="100" width="100">');
                ssEle.attr("src", fi.fi);
                ssEle.on("click", () => {
                    $("#covele").attr("src", fi.fi);
                });
                $("#pages").append(ssEle);
            });
            */
            var { script } = subEle.data();
            if (!stageOn) {
                stageOn = true;
                cG.script = script;
                cG.stageInjection();
            } else {
                cG.comix.internals.pages = script.pages;
                cG.comix.commitSwap();
            }
        }
        , unpackComic = () => {
            var rest = imgar.map(ele => { return ele.id; });
            fs.readdir($Path.dirname(imgar[0].fi), (err, files) => {
                if(files.length != imgar.length) {
                    rest.unshift(); //remove the first
                    return up.unpack(cPath, {targetDir, "forceOverwrite": true, "indexes" : rest}, (err, src) => {
                        return loadPage(); //once you have uncompressed the rest, than you can load it in
                    });
                }
                return loadPage();
            });
        }
        , script = {
            config: { /*dir: tempDir +'/'*/ },
            loading: {},
            pages: imgar.map(ele => {
                return {
                    extractID: ele.id, 
                    url: [ele.fi]
                };
            }),
            chapters: []
        }
        ;
        subEle.attr("src", imgar[0].fi);
        subEle.data({ cPath, script });
        subEle.click(unpackComic);
        $("#thumbs").append(subEle);
    }, stageOn = false
    ;

$("#flist").on("change", () => {
    var libDir = $("#flist")[0].files[0];
    fs.readdir(libDir.path, (err, files) => {
        /*$.each(files, */files.forEach((val, index) => {
            //val = checkAscii(val);
            //list all files in a comic
            up.list(libDir.path + "\\" + val, {}, (err, files) => {
                var imgar = [], target, tmpDir = $Path.join(targetDir, $Path.basename(val, $Path.extname(val)));
                /*if (notAscii(val)) {//assume files are top level temporary fix;
                    tmpDir = $Path.join(targetDir, $Path.basename(val, $Path.extname(val)));
                }*/
                //filter out only image filenames, with list index include -1
                files.forEach((fi, id) => { 
                    id-=1; 
                    if (fi.includes(".jpg") || fi.includes(".png") || fi.includes(".jpeg")) {
                        //imgar.push({id, fi: $Path.basename(fi)});
                        if (notAscii(val)) {//assume files are top level temporary fix;
                            fi = $Path.join($Path.basename(val, $Path.extname(val)), $Path.basename(fi));
                        }
                        imgar.push({id, fi});
                    }
                });
                //extract the first image only and in the callback build a thumb that contains all info
                up.unpack(libDir.path + "\\" + val, {targetDir, "indexes" : [imgar[0].id]}, (err, src) => {
                    /*if (err) {
                        return createComic(null, libDir.path + "\\" + val, imgar);
                    }*/
                    //return createComic(err, libDir.path + "\\" + val, tmpDir, imgar); 
                    return createComic(err, libDir.path + "\\" + val, targetDir, imgar); 
                });
            });
        });
    });
    //$("#delete").click(unpackComic);
});

//require("jquery-ui-dist");
/*
$(function () {
  $("#accordion").accordion({
    collapsible: true
  });
});
*/

/*
((fnt) => {
    fnt
})(up);
*/

    /*
    fs.readdir(dir.path, (err, files)=> {return files;});
    fs.readdir(dir.path, (err, files)=> { dirList = files;});
    up.unpack(dir.path + "\\" + dirList[0], {}, (err, files, text) => {upfile = files; uptext = text; console.log(err, files, text);})
    fs.readdir(upfile + "\\" + dirList[0], (err, files)=> { imgList = files;});
    */