<?php
include '../labs/phpprofilesimple.php';
function autoScript(){
    $append = true;
    $badFormat = false;
    $files = array();
    $dir = opendir('../assets/');//count pages to determine if script.json needs to be modified/created
    while(($currentFile = readdir($dir)) !== false){
        $ext = strrchr($currentFile, ".");
        //echo "$ext <br>";
        if ( $currentFile == '.' || $currentFile == '..' || !($ext == '.jpeg'|| $ext == '.jpg'|| $ext == '.png'|| $ext == '.gif'|| $ext == '.bmp'))//needs to select for images
            continue;
        $files[] = $currentFile;
    }
    closedir($dir);//compare to script.json
    $currentCount = count($files);
    $listedCount = 0;
    if(file_exists("script.json") && filesize("script.json")) {
        $raw = file_get_contents('script.json');
        /*$script = json_decode($raw);//bottleneck
        if($script){
            $listedCount = count($script->pages);
        } else $badFormat = true;*/
        //faster implementation, but it requires a decode eventually
        $pageStart = strpos($raw, '"pages":[')+9;
        $pageEnd = strpos($raw, '],"chap',$pageStart);
        $formChk = strpos($raw, '"config":{');
        if($pageStart && $pageEnd && $formChk){
            $pageArrStr = substr ($raw , $pageStart, $pageEnd-$pageStart);
            $newPAS = preg_replace('/\{(.*?)\}/', "", $pageArrStr);
            $listedCount = (strlen($newPAS)+1);
        } else $badFormat = true;
    }/*
    JSON decode and encode are pretty slow, since the first decode is only required for listedCount
    if I could get the page count in a faster way and slot the performance hit in the if block
    then it would be better since the if only evaluates rarely 
    */
    echo "Current: $currentCount | Old: $listedCount";
    if($currentCount != $listedCount){//if discrepancy between counts, then script.json is outdated
        if(!file_exists("script.json") || !filesize("script.json") || $badFormat) {//create a template
            $newScript = json_decode('{"parent":null,"offset":0,"pyr":{"appendmismatch":false,"appendorder":0,"appendorderdir":false},"loading":{"diameter": 250,"lines":16,"rate":33.333333333333336,"xpos":0.5,"ypos":0.5,"back":"#FFF","color":"#373737"},"config":{"dir":"assets/","pagestartnum":false,"chapterstartnum":false,"imgprebuffer":5,"imgpostbuffer":5,"startpage":0,"back":"#FFF"},"pages":[],"chapters":[]}');
        } else {
            //$newScript = $script;
            $newScript = json_decode($raw);
            if($currentCount < $listedCount || !$append){
                $newScript->pages = array();//clear the old page array
            }
            //print_r($newScript['pages']);
        }
        $duplicate = false;
        $pageArray = array();
        $pageform = json_decode('{"alt":"","hover":"","title":"","url":[],"release":0,"note":"","anim8":false,"perm":false,"special":""}');
        $y = $listedCount;
        for ($x = 0; $y < $currentCount; $x++) {
            $currentPage = clone $pageform;
            $currentPage->url[] = $files[$x];
            //this automatically removes duplicates and preserves order at the cost of running o(n^2)
            for ($z = 0; $z < $listedCount; $z++) {
                if($listedCount == 0 ||count($newScript->pages) < 1) break;
                if($newScript->pages[$z]->url[0]==$currentPage->url[0]){//duplicate found
                    $duplicate = true;
                    //echo "<br>start dup ";
                    break;
                }
            }
            if($duplicate){
                $duplicate =  false;
                //echo "end dup <br>";
                continue;
            }
            $pageArray[] = $currentPage;
            $y++;
        }
        $newScript->pages = array_merge($newScript->pages,$pageArray);
        $writeSuccess = file_put_contents('script.json', json_encode($newScript, JSON_UNESCAPED_SLASHES | 'JSON_PRESERVE_ZERO_FRACTION'));//overwrite the old
    }
}