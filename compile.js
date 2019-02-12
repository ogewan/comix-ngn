//(({win32: os => {},darwin: os => {},})[require("os").platform()]());
/*eslint-disable no-console*/
const aexec = (nm, cm) => new Promise((resolve) => 
    require('child_process').exec(cm, 
        (er, so, se) => {
            console.log(nm);
            console.log(er);
            console.log(so);
            console.log(se);
            resolve();
        }
    )),
    pasta = require('pastaa').copyPasta;

switch (require("os").platform()) {
    case 'win32':
        (async () => {
            await pasta(require("path").join(__dirname, 'factory', "def_stage.ts"), {'cache': false});
            await aexec("=TYPESCRIPT COMPILER=", "tsc --diagnostics");
            await aexec("=CONCAT=", "concat -o _concat.comixngn.js ./factory/header.js ./comixngn.js ./factory/footer.js");
            await aexec("=CLOSURE COMPILER=", "java -jar .\\tools\\compiler.jar --language_in ECMASCRIPT6_STRICT --js .\\.concat.comixngn.js --create_source_map .\\comixngn.min.js.map --js_output_file .\\comixngn.min.js");
            await aexec("=X-COPY -> wordpress=", "xcopy /y .\\comixngn.min.js .\\wordpress\\comixngn\\js\\comixngn.min.js");
            await aexec("=WINRAR -> wordpress.zip=", "winrar a -u -r -ep1 -x*.zip -x*.bat .\\wordpress\\comixngn.zip .\\wordpress\\*.*");
        })();
        break;
    case 'darwin':
        break;
    default:
}