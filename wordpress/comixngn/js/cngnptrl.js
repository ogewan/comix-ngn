/** @preserve Comix-ngn Patroler: Comix-Ngn plugin(wordpress)
Provides Wordpress functionality
(c) 2015 ogewan.github.io/comix-ngn/ Oluwaseun Ogedengbe
Order: after comixngn.js
*/
!function(){
    //console.log(PJSON);
    if(typeof cG !== 'undefined'){
        if(typeof $GPC === 'undefined') var $GPC = 1;/*Global Plug in count*/
        else $GPC++;
        domReady(function(){
            /*runs once the DOM is ready*/
            var temp = {parent:null,offset:0,pyr:{appendmismatch:false,appendorder:0,appendorderdir:false},loading:{diameter: 250,lines:16,rate:33.333333333333336,xpos:0.5,ypos:0.5,back:"#FFF",color:"#373737"},config:{dir:"assets/",pagestartnum:false,chapterstartnum:false,imgprebuffer:5,imgpostbuffer:5,startpage:0,back:"#FFF"},pages:[],chapters:[]};
            function compare(a, b) {
                var af = Date.parse(a.Date);
                var bf = Date.parse(b.Date);
                if (af<bf) return -1;
                if (af>bf) return 1;
                return 0;
            }
            PJSON.sort(compare);
            for(var p=0;p<PJSON.length;p++){
                temp.pages.push({alt:"",hover:"",title:"",url:[PJSON[p].Content.split('"')[3]],release:0,note:"",perm:!1,anim8:!1, absolute:false});
            }
            cG.fBox.vscript = temp;
            //console.log(temp);
            cG.stageInjection([].slice.call(document.getElementsByTagName('article')));
        });
    }
    else console.error("CNG Plug-in: Comix-ngn Patroller must be loaded after comixngn.js");
}();