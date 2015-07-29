/** @preserve Infinite: Comix-Ngn plugin
Adds Infinite Direction
(c) 2015 ogewan.github.io/comix-ngn/ Oluwaseun Ogedengbe
Order: after comixngn.js
*/
!function(){
    if(cG !== void 0){
        if(cG.$GPC === void 0) cG.$GPC = 1;/*Global Plug in count*/
        else cG.$GPC++;
        //adding to comix-ngn
        var key_to_change = "stage",
            pluginname = "infinite";
        cG.REPO[key_to_change] = cG.REPO[key_to_change]||{};/*object initialization*/
        cG[key_to_change] = cG.REPO[key_to_change][pluginname] = {
            id:"infinite",
            construct:function(name,scriptt,anchor,options,xper,yper){   
            var infinite=function(c,n,y,a,K,L){a=a||{};var k={parent:null,offset:0,loading:{lines:a.lines||16,rate:a.rate||1E3/30,diameter:a.diameter||250,back:a.loaderback||"#FFF",color:a.color||"#373737"},config:{dir:a.dir||"assets/",pagestartnum:!1,chapterstartnum:!1,imgprebuffer:a.imgprebuffer||5,imgpostbuffer:a.imgpostbuffer||5,startpage:0,back:a.back||"#FFF"},pages:[]};if(void 0===c)return-1;if("string"===typeof c)k.pages.push({alt:"",hover:"",title:"",url:[c],release:0,note:"",perm:!1,anim8:!1}),c=k;else if(Array.isArray(c)){for(a=
0;a<c.length;a++)if(k.pages.push({alt:"",hover:"",title:"",url:[],release:0,note:"",perm:!1,anim8:!1}),Array.isArray(c[a]))for(var E=0;E<c[a].length;E++)k.pages[a].url.push(c[a][E]);else k.pages[a].url.push(c[a]);c=k}else if(void 0===c.pages[0].url)return-1;if(void 0===n||null==n)n=0;var f=c.pages,g=c.pages.length,z=!0,h=-1,p=c.loading,q=c.config,u=[],v=[],A=!1,B=!1,b=[],r={increment:1,duration:1},d=[document.createElement("canvas"),document.createElement("canvas")],l=d[1].getContext("2d"),F=a=function(){return 0},
D=a,G=a,H={context:d[0].getContext("2d"),color:p.color,start:Date.now(),lines:p.lines,diameter:p.diameter,rate:p.rate},J=function(e){d[0].style.paddingLeft=(d[1].width-300)/2+"px";var b=Math.floor((Date.now()-e.start)/1E3*e.lines)/e.lines,a=e.color.substr(1);e.context.save();e.context.clearRect(0,0,300,d[1].height);e.context.translate(150,d[1].height/2);e.context.rotate(2*Math.PI*b);3==a.length&&(a=a[0]+C[0]+a[1]+a[1]+a[2]+a[2]);for(var b=parseInt(a.substr(0,2),16).toString(),w=parseInt(a.substr(2,
2),16).toString(),a=parseInt(a.substr(4,2),16).toString(),c=0;c<e.lines;c++)e.context.beginPath(),e.context.rotate(2*Math.PI/e.lines),e.context.moveTo(e.diameter/10,0),e.context.lineTo(e.diameter/4,0),e.context.lineWidth=e.diameter/30,e.context.strokeStyle="rgba("+b+","+w+","+a+","+c/e.lines+")",e.context.stroke();e.context.restore();z?window.setTimeout(J,e.rate,H):e.context.clearRect(0,0,300,d[1].height)},x=function(e,a,I){z=0;l.clearRect(0,0,d[1].width,d[1].height);var w=a.dx,c=a.dy;e&&l.drawImage(e,
w,c-e.height,d[1].width,e.height);a&&l.drawImage(a,w,c,d[1].width,a.height);I&&l.drawImage(I,w,c+a.height,d[1].width,I.height);if(c>=d[1].height)return a=h-1,b[1].dx=0,b[1].dy=c-e.height,0<=a&&m(b,a),a;if(0>c+a.height)return a=h+1,b[1].dx=0,b[1].dy=0,a<g&&m(b,a),a},k=function(){f[this.imaginaryID].loaded=!0},M=[function(){if(0>this.imaginaryID||this.imaginaryID>=g||void 0===this.imaginaryID||void 0===this.src)return 0;f[this.imaginaryID].loaded?l.clearRect(0,0,d[1].width,d[1].height):f[this.imaginaryID].loaded=
!0;x(0<=b[0].imaginaryID?b[0]:0,this,0<=b[2].imaginaryID?b[2]:0)},function(){if(0>this.imaginaryID||this.imaginaryID>=g||void 0===this.imaginaryID||void 0===this.src)return 0;f[this.imaginaryID].loaded?l.clearRect(0,0,d[1].width,d[1].height):f[this.imaginaryID].loaded=!0;D();x(0<=b[0].imaginaryID?b[0]:0,this,0<=b[2].imaginaryID?b[2]:0);z=0;G()},function(){M[0]()}],m=function(e,a){z=!0;window.setTimeout(J,p.rate,H);F();0>a&&(a=0);a>=g&&(a=g-1);f[a].loaded||l.clearRect(0,0,d[1].width,d[1].height);for(var b=
0;3>b;b++)e[b].imaginaryID=a-1+b,a-1+b<g&&0<=a-1+b?e[b].src=q.dir+f[a-1+b].url[0]:(e[b].imaginaryID=-1,e[b].src="");h=a;for(var b=0,c=a-1;c>a-q.imgprebuffer-1&&0<=c;c--)f[c].loaded||(v[b].imaginaryID=c,v[b].src=q.dir+f[c].url,b++);b=0;for(c=a+1;c<q.imgpostbuffer+a+1&&c<g;c++)f[c].loaded||(u[b].imaginaryID=c,u[b].src=q.dir+f[c].url,b++)},t=function(){b[1].dx=0;b[1].dy=0};this.count=function(){return g};this.current=function(){return h};this.callback=function(a,b){if(null===a||void 0===a)return D;if(null===
b||void 0===b)return a?0<a?G:F:D;a?0<a?G=b:F=b:D=b;return 1};this.go=function(a){a=null===a||void 0===a?0:parseInt(a,10);a=isNaN(a)?0:a;t();m(b,Math.floor(Math.max(0,Math.min(g-1,a))));return a};this.prev=function(){var a=h-1;0<=a&&(t(),m(b,a));return a};this.next=function(){var a=h+1;a<g&&(t(),m(b,a));return a};this.frst=function(){0<=h&&(t(),m(b,0));return 0};this.last=function(){t();m(b,g-1);return g-1};this.rand=function(){var a=Math.floor(Math.random()*(g-1));t();m(b,a);return a};this.data=function(a){a=
null===a||void 0===a?h:parseInt(a,10);return isNaN(a)?f[h]:f[a]};this.scroll=function(a,b){return r={increment:a||1,duration:b||1}};this.scrollTo=function(a,b){return-1};d[0].height=480;d[0].style.background=p.back;d[0].style.paddingLeft="170px";d[0].style.zIndex=0;d[0].style.position="absolute";n?n.appendChild(d[0]):document.body.appendChild(d[0]);window.setTimeout(J,p.rate,H);for(a=0;3>a;a++)b.push(new Image),b[a].imaginaryID=-1,b[a].dx=0,b[a].dy=0,b[a].addEventListener("load",M[a],!1);for(a=0;a<
f.length;a++)f[a].desig=a?a==f.length-1?1:0:-1,f[a].loaded=!1;for(a=0;a<c.config.imgprebuffer;a++)v.push(new Image),v[a].imaginaryID=-1,v[a].addEventListener("load",k,!1);for(a=0;a<c.config.imgpostbuffer;a++)u.push(new Image),u[a].imaginaryID=-1,u[a].addEventListener("load",k,!1);window.onresize=function(){d[1].height=(L/100||.7)*(window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight);d[1].width=(K/100||.7)*(window.innerWidth||document.documentElement.clientWidth||
document.body.clientWidth);x(0<=b[0].imaginaryID?b[0]:0,b[1],0<=b[2].imaginaryID?b[2]:0)};d[1].onkeydown=function(a){a=a||window.event;a.preventDefault();if("38"==a.keyCode&&!A){var c=function(){var a=r.increment;h>=g-1&&b[1].dy-a<0-b[1].height+d[1].height||(b[1].dy-=a,l.clearRect(0,0,d[1].width,d[1].height),x(0<=b[0].imaginaryID?b[0]:0,b[1],0<=b[2].imaginaryID?b[2]:0));A&&window.setTimeout(c,r.duration)};A=!0;window.setTimeout(c,r.duration)}else if("40"==a.keyCode&&!B){var f=function(){var a=r.increment;
0>=h&&0<b[1].dy+a||(b[1].dy+=a,l.clearRect(0,0,d[1].width,d[1].height),x(0<=b[0].imaginaryID?b[0]:0,b[1],0<=b[2].imaginaryID?b[2]:0));B&&window.setTimeout(f,r.duration)};B=!0;window.setTimeout(f,r.duration)}return 0};d[1].onkeyup=function(a){a=a||window.event;"38"==a.keyCode?A=!1:"40"==a.keyCode&&(B=!1)};m(b,void 0===y||null===y||isNaN(y)?q.startpage:y);d[1].height=(L/100||.7)*(window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight);d[1].width=(K/100||.7)*(window.innerWidth||
document.documentElement.clientWidth||document.body.clientWidth);d[1].background=q.back;d[1].style.zIndex=1;d[1].style.position="relative";d[1].tabIndex=1E3;d[1].style.outline="none";n?n.appendChild(d[1]):document.body.appendChild(d[1]);this.canvi=d;this.internals=c};
            /**/
            var get;//still undefined
            if(typeof(Storage) !== "undefined") {
                get = parseInt(localStorage.getItem(cG.comicID+"|"+name+"|curPage"),10);
                if(cG.avx[0]>0&&cG.avx[1]>0) cG.verbose(1,cG.comicID+"|"+name+"|curPage",":",get);
                else console.log(cG.comicID+"|"+name+"|curPage",":",get);
            }
            if(cG.comix===void 0&&cG.prePage>=0) get = cG.prePage;//prepage, which is from router, overwrites localStorage if over -1, only works on comix
            var main = new infinite(scriptt,anchor,get,null,xper||50,yper||50);
            main.name = name;
            main.type = "infinite";
            if(cG.avx[0]>0&&cG.avx[1]>0){
                main.pg = [anchor]
                main.at = 0;
                main.navto = function(a){
                    if(a<main.pg.length) return main.pg[a]._nav()
                        }
                main.ch_data = function(a){
                    var c = main.internals.chapters;
                    var sre = (a===null||void 0===a)?main.ch_current():parseInt(a,10);
                    return (main.ch_current()==-1)?{}:(isNaN(sre))?c[main.ch_current()]:c[sre];
                }
                main.ch_count = function(){
                    return main.internals.chapters.length;
                }
                main.ch_current = function(){
                    var c = main.internals.chapters,
                        d = main.current();
                    for(var a=0;a<c.length;a++){
                        if(c[a].start<=d&&d<=c[a].end) return a;
                    }
                    return -1;
                }
                main.ch_go = function(a,b){
                    var sre = (a===null||void 0===a)?0:parseInt(a,10);
                    sre = (isNaN(sre))?0:sre;
                    var g;
                    if(b===null&&b===void 0) g = "start";
                    else g = "end"
                    if (main.ch_current()==-1) return main.go()
                    return main.go(main.internals.chapters[Math.floor(Math.max(0,Math.min(main.internals.chapters.length-1,sre)))][g]);
                }
                main.ch_prev = function(b){
                    if (main.ch_current()==-1) return main.go();
                    var g;
                    if(b===null&&b===void 0) g = "start";
                    else g = "end"
                    return main.go(main.internals.chapters[Math.max(0,main.ch_current()-1)][g]);
                }
                main.ch_next = function(b){
                    if (main.ch_current()==-1) return main.go();
                    var g;
                    if(b===null&&b===void 0) g = "start";
                    else g = "end"
                    return main.go(main.internals.chapters[Math.min(main.ch_count()-1,main.ch_current()+1)][g]);
                }
                main.ch_frst = function(b){
                    if (main.ch_current()==-1) return main.go();
                    var g;
                    if(b===null&&b===void 0) g = "start";
                    else g = "end"
                    return main.go(main.internals.chapters[0][g]);
                }
                main.ch_last = function(b){
                    if (main.ch_current()==-1) return main.go();
                    var g;
                    if(b===null&&b===void 0) g = "start";
                    else g = "end"
                    return main.go(main.internals.chapters[main.ch_count()-1][g]);
                }
            }
            var lscurrent = function(){
                if(typeof(Storage) !== void 0) {
                    localStorage.setItem(cG.comicID+"|"+name+"|curPage",cG.cPanel["def_"+name].current().toString());
                }
                if(cG.comix===cG.cPanel["def_"+name]){//if comic is the comix, then push its state
                    var chpmod = (cG.script.config.chapterstartnum)?1:0,
                        modify = (cG.script.config.pagestartnum)?1:0,
                        result = cG.cPanel["def_"+name].current();
                    switch(cG.script.config.orderby) {
                        case 2:
                            var mechp = cG.cPanel["def_"+name].ch_current();
                            result=(mechp+chpmod)+"/"+(result-mechp+modify)
                            break;
                        case 3:
                            var nT = new Date(cG.cPanel["def_"+name].data().release);
                            var guide=cG.script.config.dateformat.split("/");
                            for(var tim=0;tim<3;tim++){
                                if(guide[tim].indexOf("Y")+1) guide[tim]=nT.getYear();
                                else if(guide[tim].indexOf("M")+1) guide[tim]=nT.getMonth();
                                else if(guide[tim].indexOf("D")+1) guide[tim]=nT.getDay();
                            }
                            result=guide.join("/");
                        default:
                            result+=modify;
                    }
                    if(cG.avx[0]>0&&cG.avx[1]>0) cG.verbose(1,name,"Pushing state:",result);
                    else console.log(name,"Pushing state:",result);
                    history.pushState({}, null, "#/"+result);
                }
                if(cG.queue.stageChange!==void 0)
                    for(var ftn=0;ftn<cG.queue.stageChange.length;ftn++){
                        cG.queue.stageChange[ftn](cG.cPanel["def_"+name]);
                    }
                /*disable special, since infinite has different navigation scheme, current special method doesn't work*/
                /*var strct = cG.cPanel["def_"+name].data(cG.cPanel["def_"+name].current()).special;
                var zombie = document.getElementById(name+"_tempScript");//fetch zombie child
                var preload = cG.HELPERS.stick(cG.cPanel["def_"+name].canvi[0],null,null,0);
                var display = cG.HELPERS.stick(cG.cPanel["def_"+name].canvi[1],null,null,1);
                if(zombie!==void 0&&zombie!==null){
                    anchor.removeChild(zombie);//kill the zombie
                    if(cG.avx[0]>0&&cG.avx[1]>0){
                        preload._show();
                        display._show();
                    }
                    else {
                        preload.setAttribute("style",preload.getAttribute("style")+"display: block;");
                        display.setAttribute("style",display.getAttribute("style")+"display: block;");
                    }
                }
                if(strct!==null&&strct!==void 0&&strct!=""){
                    //anchor.innerHTML += anchor.innerHTML+strct;//this breaks the cavases
                    var spanr = document.createElement("SPAN");
                    spanr.setAttribute("id", name+"_tempScript");
                    spanr.innerHTML=strct;
                    anchor.appendChild(spanr);
                    if(cG.avx[0]>0&&cG.avx[1]>0){
                        preload._hide();
                        display._hide();
                    }
                    else {
                        preload.setAttribute("style",preload.getAttribute("style")+"display: none;");
                        display.setAttribute("style",display.getAttribute("style")+"display: none;");    
                    }
                }*/
            }
            main.callback(1,lscurrent);
            cG.comix = cG.comix||main;//this should only set the comix on the first call
            return main;
        }};
        //plugin root changes
        var srcs = document.getElementsByTagName("src");
        for (i = 0; i < srcs.length; i++) { 
            cG.root=src[i].getAttribute("plugin");/*this overwrites any previous root setting*/
            if(cG.root!="") break;
        }
        if(cG.root=="") cG.root = pluginname;
    }
    else console.error("CNG Plug-in: "+pluginname+" must be loaded after comixngn.js");
    /*If you can, minify the plug-in. 
/*Including this file (plugin.cng.js) in to the HTML will have no effect.*/
}();