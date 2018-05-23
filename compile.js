//(({win32: os => {},darwin: os => {},})[require("os").platform()]());
const exec = require('child_process').exec;
var typescript = (cbr) => {
        exec("tsc --diagnostics", (er, so, se) => {
            //console.log(er, so, se);
            console.log("=TYPESCRIPT COMPILER=");
            console.log(er);
            console.log(so);
            console.log(se);
            cbr.shift()(cbr);
        });
    },
    concat = (cbr) => {
        exec("concat -o .concat.comixngn.js ./factory/header.js ./comixngn.js ./factory/footer.js", (er, so, se) => {
            //console.log(er, so, se);
            console.log("=CONCAT=");
            console.log(er);
            console.log(so);
            console.log(se);
            cbr.shift()(cbr);
        });
    },
    wccompiler = (cbr) => {
        exec("java -jar .\\tools\\compiler.jar --language_in ECMASCRIPT6_STRICT --js .\\.concat.comixngn.js --create_source_map .\\comixngn.min.js.map --js_output_file .\\comixngn.min.js",
            (er, so, se) => {
                //console.log(er, so, se);
                console.log("=CLOSURE COMPILER=");
                console.log(er);
                console.log(so);
                console.log(se);
                cbr.shift()(cbr);
            });
    },
    xcopy = (cbr) => {
        exec("xcopy /y .\\comixngn.min.js .\\wordpress\\comixngn\\js\\comixngn.min.js",
            (er, so, se) => {
                //console.log(er, so, se);
                console.log("=X-COPY -> wordpress=");
                console.log(er);
                console.log(so);
                console.log(se);
                cbr.shift()(cbr);
            });
    },
    winrar = (cbr) => {
        exec("winrar a -u -r -ep1 -x*.zip -x*.bat .\\wordpress\\comixngn.zip .\\wordpress\\*.*",
            (er, so, se) => {
                //console.log(er, so, se);
                console.log("=WINRAR -> wordpress.zip=");
                console.log(er);
                console.log(so);
                console.log(se);
                //if(!cbr.length) cbr.shift()(cbr);
            });
    },
    mccompiler = '';

switch (require("os").platform()) {
    case 'win32': typescript([concat, wccompiler, xcopy, winrar]);
        break;
    case 'darwin':
        break;
    default:
}
return 0;