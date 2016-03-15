<!DOCTYPE html><?php
$files = array();
$dir = opendir('assets/');
//count pages to determine if script.json needs to be modified/created
$currentCount = 0;
while(($currentFile = readdir($dir)) !== false){
    if ( $currentFile == '.' or $currentFile == '..' )
        continue;
    $files[] = $currentFile;
    $currentCount++;
}
closedir($dir);
//compare to script.json
$listedCount = 0;
if(file_exists("script.json")) {
    $script = json_decode(file_get_contents('script.json'), true);
    $listedCount = count($script['pages']);
}
echo "Current: $currentCount | Old: $listedCount";
if($currentCount != $listedCount){//if discrepancy between counts, then script.json is outdated
    if(!file_exists("script.json")) {//create a template
        $newScript = json_decode('{"parent":null,"offset":0,"pyr":{"appendmismatch":false,"appendorder":0,"appendorderdir":false},"loading":{"diameter": 250,"lines":16,"rate":33.333333333333336,"xpos":0.5,"ypos":0.5,"back":"#FFF","color":"#373737"},"config":{"dir":"assets/","pagestartnum":false,"chapterstartnum":false,"imgprebuffer":5,"imgpostbuffer":5,"startpage":0,"back":"#FFF"},"pages":[],"chapters":[]}', true);
    } else {
        $newScript = $script;
        //$newScript['page'] = array();//clear the old page array
    }
    $pageArray = array();
    $pageform = json_decode('{"alt":"","hover":"","title":"","url":[],"release":0,"note":"","anim8":false,"perm":false,"special":""}', true);
    for ($x = 0; $x <= $currentCount; $x++) {
        $currentPage = $pageform;
        $currentPage['url'][] = $files[x];
        $pageArray[] = $currentPage;
    }
    $newScript['page'] = array_merge($newScript['page'],$pageArray);
    $writeSuccess = file_put_contents('script.json', $newScript);//overwrite the old
}
?><title>comix-ngn</title>
<!--<script src="plugins/bellerophon.cng.min.js" dir template></script><script src="comixngn.js" plugin></script><base href="/comic-ng/">-->
<script>var cG={};cG.recyclebin={defer:!0,mainsrc:"comixngn.js",loadcng:[],plugin:"",comicID:"",disable:[],dir:"",tir:"",air:"",dfr:function(){var e=document.createElement("script");cG.REPO.scReq.getScript=cG.agent("./"+cG.recyclebin.dir+"config.json"),cG.REPO.scReq.getDecor=cG.agent("./"+cG.recyclebin.tir+"decor.html"),cG.REPO.scReq.getCtrls=cG.agent(cG.recyclebin.tir+"ctrls.html"),cG.REPO.scReq.getScript.then(function(e){void 0===cG.REPO.script?cG.REPO.script={def:e}:cG.REPO.script.def=e,cG.script=cG.REPO.script.def},function(e,c){console.error(e,c.status),void 0===cG.REPO.script?cG.REPO.script={def:0}:cG.REPO.script.def=e,cG.script=cG.REPO.script.def}),cG.REPO.scReq.getDecor.then(function(e){void 0===cG.REPO.decor?cG.REPO.decor={def:e}:cG.REPO.decor.def=e,cG.decor=cG.REPO.decor.def},function(e,c){console.error(e,c.status),void 0===cG.REPO.decor?cG.REPO.decor={def:0}:cG.REPO.decor.def=0,cG.decor=cG.REPO.decor.def}),cG.REPO.scReq.getCtrls.then(function(e){void 0===cG.REPO.ctrls?cG.REPO.ctrls={def:e}:cG.REPO.ctrls.def=e,cG.ctrls=cG.REPO.ctrls.def},function(e,c){console.error(e,c.status),void 0===cG.REPO.ctrls?cG.REPO.ctrls={def:0}:cG.REPO.ctrls.def=0,cG.ctrls=cG.REPO.ctrls.def}),cG.comicID=cG.recyclebin.comicID;for(var c=0;c<cG.recyclebin.disable.length;c++)cG.dis[cG.recyclebin.disable[c]]=!0;e.src=cG.recyclebin.mainsrc,document.body.appendChild(e);for(var t=0;t<cG.recyclebin.loadcng.length;t++)e=document.createElement("script"),e.src=cG.recyclebin.loadcng[t],document.body.appendChild(e)}},cG.agent=function(e,c){return c=new XMLHttpRequest,c.open("GET",e),e=[],c.onreadystatechange=c.then=function(t,r,o){if(t&&t.call&&(e=[,t,r]),4==c.readyState&&(o=e[0|c.status/200]))try{o(JSON.parse(c.responseText),c)}catch(n){o(c.responseText,c)}},c.send(),c},cG.REPO={scReq:{}},cG.dis={},cG.$GPC=cG.$GPC+1||1,!function(){return cG.recyclebin.defer?void(window.addEventListener?window.addEventListener("load",cG.recyclebin.dfr,!1):window.attachEvent?window.attachEvent("onload",cG.recyclebin.dfr):window.onload=cG.recyclebin.dfr):cG.recyclebin.dfr()}();</script>
<!--
if script.json is in a directory other than root, you must specify that directory's path in the optional dir attribute of the script tag, preferably the first. Using different dir values will result in unpredictable behavior.
the html templates must be in the directory specified by template, if they are not in root-->
<div id class="venue" use script config additive="additive"></div>
<!--
id-selector that will be prepended to all interior elements
class"venue" - required class that identifies this tag as an entry point
use - an additional attribute that specifies the plug in to use for this venue. 
It only applies to plugins that modify the stage. By default, it is the last plug-in added.
"default" uses factory stage, "plug-in name" applies a specific plug-in
script - an additional attribute that specifies which script this venue shoud use, either a url or a string.
By default it uses script.json.
-->
<span cglink="gsvfgshdyfgftdgxs"></span>