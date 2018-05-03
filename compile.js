//(({win32: os => {},darwin: os => {},})[require("os").platform()]());
const exec = require('child_process').exec;
var typescript = (cbr) => {
        exec("tsc --diagnostics", (er, so, se) => {
            console.log(er, so, se);
            cbr.shift(cbr);
        });
    },
    wccompiler = (cbr) => {
        exec("java -jar .\\tools\\compiler.jar --language_in ECMASCRIPT6_STRICT --js .\\comixngn.js --create_source_map .\\comixngn.min.js.map --js_output_file .\\comixngn.min.js",
            (er, so, se) => {
                console.log(er, so, se);
                cbr.shift(cbr);
            });
    },
    xcopy = (cbr) => {
        exec("xcopy /y .\\comixngn.min.js .\\wordpress\\comixngn\\js\\comixngn.min.js",
            (er, so, se) => {
                console.log(er, so, se);
                cbr.shift(cbr);
            });
    },
    winrar = (cbr) => {
        exec("winrar a -u -r -ep1 -x*.zip -x*.bat .\\wordpress\\comixngn.zip .\\wordpress\\*.*",
            (er, so, se) => {
                console.log(er, so, se); cbr.shift(cbr);
            });
    },
    mccompiler = '';

switch (require("os").platform()) {
    case 'win32': typescript([wccompiler, xcopy, winrar]);
        break;
    case 'darwin':
        break;
    default:
}