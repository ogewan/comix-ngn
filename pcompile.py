#!/usr/bin/python
import subprocess
import sys


if sys.platform == 'darwin':
    subprocess.check_call('java -jar ./factory/compiler.jar --js ./factory/def_libs.js ./factory/initialize.js ./factory/rollbar.js ./factory/retrieval.js ./factory/def_stage.js ./factory/def_stagechange.js ./factory/helpers.js ./factory/methods.js ./factory/start.js --create_source_map ./comixngn.js.map --js_output_file ./comixngn.min.js', shell=True)
    subprocess.check_call('rsync ./comixngn.min.js ./wordpress/comixngn/js/comixngn.min.js', shell=True)
    subprocess.check_call('zip -j ./wordpress/comixngn.zip ./wordpress/comixngn', shell=True)

elif sys.platform == 'linux2':
    print("Linux")
elif sys.platform == 'win32':
    subprocess.check_call('java -jar .\\factory\\compiler.jar --js .\\factory\\def_libs.js .\\factory\\initialize.js .\\factory\\rollbar.js .\\factory\\retrieval.js .\\factory\\def_stage.js .\\factory\\def_stagechange.js .\\factory\\helpers.js .\\factory\\methods.js .\\factory\\start.js --create_source_map .\\comixngn.js.map --js_output_file .\\comixngn.min.js')
    subprocess.check_call('xcopy /y .\\comixngn.min.js .\\wordpress\\comixngn\\js\\comixngn.min.js')
    subprocess.check_call('winrar a -u -r -ep1 -x*.zip -x*.bat .\\wordpress\\comixngn.zip .\\wordpress\\*.*')
