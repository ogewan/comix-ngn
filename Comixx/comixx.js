
var fs = require("fs")
    , $ = jQuery = require("jquery")
    , up = require("all-unpacker")
    ;
//require("jquery-ui-dist");
/*
$(function () {
  $("#accordion").accordion({
    collapsible: true
  });
});
*/

$("#flist").on("change", () => {
    var libDir = $("#flist")[0].files[0];
    fs.readdir(libDir.path, (err, files) => {
        $.each(files, (index, val) => {
            //list all files in a comic
            up.list(libDir.path + "\\" + val, {}, (err, files) => {
                var imgar = [];
                //filter out only image filenames
                files.forEach((fi) => { if (fi.includes(".jpg") || fi.includes(".png") || fi.includes(".jpg")) imgar.push(fi); });
                //extract the first image only and in the callback build a thumb that contains all info
                up.unpack(libDir.path + "\\" + val, /*{files: [imgar[0]]}*/{}, (err, srcPath) => {
                    var subEle = $('<img height="100" width="100">');
                    subEle.attr("src", srcPath + "\\" + imgar[0]);
                    subEle.data({ imgar, srcPath });
                    subEle.click(function () {
                        var { imgar, srcPath } = $(this).data();
                        $("#covele").attr("src", srcPath + "\\" + imgar[0]);
                        $("#pages").empty();
                        imgar.forEach((fi) => {
                            var ssEle = $('<img height="100" width="100">');
                            ssEle.attr("src", srcPath + "\\" + fi);
                            ssEle.on("click", () => {
                                $("#covele").attr("src", srcPath + "\\" + fi);
                            });
                            $("#pages").append(ssEle);
                        });
                    });
                    $("#thumbs").append(subEle);
                });
            });
        });
    });
});

    /*
    fs.readdir(dir.path, (err, files)=> {return files;});
    fs.readdir(dir.path, (err, files)=> { dirList = files;});
    up.unpack(dir.path + "\\" + dirList[0], {}, (err, files, text) => {upfile = files; uptext = text; console.log(err, files, text);})
    fs.readdir(upfile + "\\" + dirList[0], (err, files)=> { imgList = files;});
    */