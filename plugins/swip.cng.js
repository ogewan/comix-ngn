/** @preserve Swip: Comix-Ngn plugin
Adds swipe.js as a stage renderer
swipe: swipejs.com (MIT) (c) 2013 Brad Birdsall
Order: after comixngn.js
*/
!function(){
    if(typeof cG !== 'undefined'){
        if(cG.$GPC === void 0) cG.$GPC = 1;/*Global Plug in count*/
        else cG.$GPC++;
        //adding to comix-ngn
        var key_to_change = "stage",
            pluginname = "swip";
        cG.REPO[key_to_change] = cG.REPO[key_to_change]||{};/*object initialization*/
        cG[key_to_change] = cG.REPO[key_to_change][pluginname] = {
            id:"def",
            construct: function(name,scriptt,anchor,options){
                var swipe =/*swipe.js*/function(t,e){"use strict";function o(){P=m.children,v=P.length,P.length<2&&(e.continuous=!1),f.transitions&&e.continuous&&P.length<3&&(m.appendChild(P[0].cloneNode(!0)),m.appendChild(m.children[1].cloneNode(!0)),P=m.children),y=Array(P.length),w=t.getBoundingClientRect().width||t.offsetWidth,m.style.width=P.length*w+"px";for(var o=P.length;o--;){var i=P[o];i.style.width=w+"px",i.setAttribute("data-index",o),f.transitions&&(i.style.left=o*-w+"px",a(o,_>o?-w:o>_?w:0,0))}e.continuous&&f.transitions&&(a(r(_-1),-w,0),a(r(_+1),w,0)),f.transitions||(m.style.left=_*-w+"px"),t.style.visibility="visible"}function i(){e.continuous?h(_-1):_&&h(_-1)}function n(){e.continuous?h(_+1):_<P.length-1&&h(_+1)}function r(t){return(P.length+t%P.length)%P.length}function h(t,o){if(_!=t){if(f.transitions){var i=Math.abs(_-t)/(_-t);if(e.continuous){var n=i;i=-y[r(t)]/w,i!==n&&(t=-i*P.length+t)}for(var h=Math.abs(_-t)-1;h--;)a(r((t>_?t:_)-h-1),w*i,0);t=r(t),a(_,w*i,o||g),a(t,0,o||g),e.continuous&&a(r(t-i),-(w*i),0)}else t=r(t),u(_*-w,t*-w,o||g);_=t,p(e.callback&&e.callback(_,P[_]))}}function a(t,e,o){s(t,e,o),y[t]=e}function s(t,e,o){var i=P[t],n=i&&i.style;n&&(n.webkitTransitionDuration=n.MozTransitionDuration=n.msTransitionDuration=n.OTransitionDuration=n.transitionDuration=o+"ms",n.webkitTransform="translate("+e+"px,0)translateZ(0)",n.msTransform=n.MozTransform=n.OTransform="translateX("+e+"px)")}function u(t,o,i){if(!i)return void(m.style.left=o+"px");var n=+new Date,r=setInterval(function(){var h=+new Date-n;return h>i?(m.style.left=o+"px",b&&l(),e.transitionEnd&&e.transitionEnd.call(event,_,P[_]),void clearInterval(r)):void(m.style.left=(o-t)*(Math.floor(h/i*100)/100)+t+"px")},4)}function l(){x=setTimeout(n,b)}function d(){b=0,clearTimeout(x)}var c=function(){},p=function(t){setTimeout(t||c,0)},f={addEventListener:!!window.addEventListener,touch:"ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch,transitions:function(t){var e=["transitionProperty","WebkitTransition","MozTransition","OTransition","msTransition"];for(var o in e)if(void 0!==t.style[e[o]])return!0;return!1}(document.createElement("swipe"))};if(t){var P,y,w,v,m=t.children[0];e=e||{};var _=parseInt(e.startSlide,10)||0,g=e.speed||300;e.continuous=void 0!==e.continuous?e.continuous:!0;var x,S,b=e.auto||0,k={},A={},L={handleEvent:function(t){switch(t.type){case"touchstart":this.start(t);break;case"touchmove":this.move(t);break;case"touchend":p(this.end(t));break;case"webkitTransitionEnd":case"msTransitionEnd":case"oTransitionEnd":case"otransitionend":case"transitionend":p(this.transitionEnd(t));break;case"resize":p(o)}e.stopPropagation&&t.stopPropagation()},start:function(t){var e=t.touches[0];k={x:e.pageX,y:e.pageY,time:+new Date},S=void 0,A={},m.addEventListener("touchmove",this,!1),m.addEventListener("touchend",this,!1)},move:function(t){if(!(t.touches.length>1||t.scale&&1!==t.scale)){e.disableScroll&&t.preventDefault();var o=t.touches[0];A={x:o.pageX-k.x,y:o.pageY-k.y},void 0===S&&(S=!(!S&&Math.abs(A.x)>=Math.abs(A.y))),S||(t.preventDefault(),d(),e.continuous?(s(r(_-1),A.x+y[r(_-1)],0),s(_,A.x+y[_],0),s(r(_+1),A.x+y[r(_+1)],0)):(A.x=A.x/(!_&&A.x>0||_==P.length-1&&A.x<0?Math.abs(A.x)/w+1:1),s(_-1,A.x+y[_-1],0),s(_,A.x+y[_],0),s(_+1,A.x+y[_+1],0)))}},end:function(){var t=+new Date-k.time,o=250>+t&&Math.abs(A.x)>20||Math.abs(A.x)>w/2,i=!_&&A.x>0||_==P.length-1&&A.x<0;e.continuous&&(i=!1);var n=A.x<0;S||(o&&!i?(n?(e.continuous?(a(r(_-1),-w,0),a(r(_+2),w,0)):a(_-1,-w,0),a(_,y[_]-w,g),a(r(_+1),y[r(_+1)]-w,g),_=r(_+1)):(e.continuous?(a(r(_+1),w,0),a(r(_-2),-w,0)):a(_+1,w,0),a(_,y[_]+w,g),a(r(_-1),y[r(_-1)]+w,g),_=r(_-1)),e.callback&&e.callback(_,P[_])):e.continuous?(a(r(_-1),-w,g),a(_,0,g),a(r(_+1),w,g)):(a(_-1,-w,g),a(_,0,g),a(_+1,w,g))),m.removeEventListener("touchmove",L,!1),m.removeEventListener("touchend",L,!1)},transitionEnd:function(t){parseInt(t.target.getAttribute("data-index"),10)==_&&(b&&l(),e.transitionEnd&&e.transitionEnd.call(t,_,P[_]))}};return o(),b&&l(),f.addEventListener?(f.touch&&m.addEventListener("touchstart",L,!1),f.transitions&&(m.addEventListener("webkitTransitionEnd",L,!1),m.addEventListener("msTransitionEnd",L,!1),m.addEventListener("oTransitionEnd",L,!1),m.addEventListener("otransitionend",L,!1),m.addEventListener("transitionend",L,!1)),window.addEventListener("resize",L,!1)):window.onresize=function(){o()},{setup:function(){o()},slide:function(t,e){d(),h(t,e)},prev:function(){d(),i()},next:function(){d(),n()},stop:function(){d()},getPos:function(){return _},getNumSlides:function(){return v},kill:function(){d(),m.style.width="",m.style.left="";for(var t=P.length;t--;){var e=P[t];e.style.width="",e.style.left="",f.transitions&&s(t,0,0)}f.addEventListener?(m.removeEventListener("touchstart",L,!1),m.removeEventListener("webkitTransitionEnd",L,!1),m.removeEventListener("msTransitionEnd",L,!1),m.removeEventListener("oTransitionEnd",L,!1),m.removeEventListener("otransitionend",L,!1),m.removeEventListener("transitionend",L,!1),window.removeEventListener("resize",L,!1)):window.onresize=null}}}},
                    self = this,
                    body;
                //anchor.appendChild(body);
                this.name = name;
                this.type = "swipe";
                this.main = new swipe(body,options);
                this.main.go = function(to){
                    var sre = (to===null||void 0===to)?0:(void 0===to.value)?0:parseInt(to.value,10);
                    sre = (isNaN(sre))?0:sre;
                    self.main.slide(Math.floor(Math.max(0,Math.min(scriptt.pages.length-1,sre))),400);
                }
                this.main.prev = function(){
                    self.main.prev();
                }
                this.main.next = function(){
                    self.main.next();
                }
                this.main.frst = function(){
                    self.main.slide(0,400);
                }
                this.main.last = function(){
                    self.main.slide(scriptt.pages.length-1,400);
                }
                this.main.rand = function(){
                    self.main.slide(Math.floor(Math.random() * scriptt.pages.length-1),400);
                }
                this.count = function(){return self.main.getNumSlides();}
                this.current = function(){return self.main.getPos();}
                var manager = function(index,elem){
                    console.log(index,elem);
                    /*var id;
    val = parseInt(val);
    if(typeof val === "undefined" || isNaN(val)) {
        id = jQuery(".active").attr("id");
    } else {
        id = val;
    }
    var iid;
    jQuery('[btog=1]').attr("src", ""); /*turn off all active img*/
                    //jQuery('[btog=1]').attr("btog", 0); /*decrement*/
                    /*jQuery('[btog=2]').attr("btog", 1);

    if(!vvar2&&id==0||vvar2&&id==vvar1){
        location.hash = '';
    } else if(id<0){
        id=id*-1;
        location.hash = location.hash;
    } else {
        console.log("location hash :"+(parseInt(id)+1).toString());
        location.hash = (parseInt(id)+1).toString();
    }
    for (i = 0; i < jQuery("#myCarousel").attr("pstload"); i++) {
        iid = "#ig"+(parseInt(id)+i).toString();
        console.log(iid);
        if(jQuery(iid).attr("btog")==0){
            jQuery(iid).attr("src", jQuery(iid).attr("isrc")); /*turns image on*/
                    /*}
        jQuery(iid).attr("btog", 2);
    }
    for (i = -1; i > (jQuery("#myCarousel").attr("preload")*-1)-2; i--) {
        iid = "#ig"+(parseInt(id)+i).toString();
        console.log(iid);
        if(jQuery(iid).attr("btog")==0){
            jQuery(iid).attr("src", jQuery(iid).attr("isrc")); /*turns image on*/
                    /*}
        jQuery(iid).attr("btog", 2);
    }*/
                };

                var scenography = document.createElement("style");
                /*cG.REPO.stage.def.scenography.setAttribute("media", "screen");*/
                scenography.setAttribute("id", "scenography");
                scenography.appendChild(document.createTextNode('article,aside,b,body,dd,del,dfn,div,dl,dt,em,fieldset,footer,form,h1,h2,h3,h4,h5,h6,header,html,i,iframe,img,ins,kbd,label,li,nav,object,ol,p,q,samp,section,small,span,strong,table,tbody,td,tfoot,th,thead,tr,ul{margin:0;padding:0;border:0;outline:0;font-size:100%;vertical-align:baseline;background:0 0}body{-webkit-text-size-adjust:none;font-family:sans-serif;min-height:416px}h1{font-size:33px;margin:50px 0 15px;text-align:center;color:#212121}h2{font-size:14px;font-weight:700;color:#3c3c3c;margin:20px 10px 10px}small{margin:0 10px 30px;display:block;font-size:12px}a{margin:0 0 0 10px;font-size:12px;color:#3c3c3c}body,html{background:#f3f3f3}#console{font-size:12px;font-family:Inconsolata,Monaco,Consolas,"Andale Mono","Bitstream Vera Sans Mono","Courier New",Courier,monospace;color:#999;line-height:18px;margin-top:20px;max-height:150px;overflow:auto}#mySwipe div b{display:block;font-weight:700;color:#14ADE5;font-size:20px;text-align:center;margin:10px;padding:100px 10px;box-shadow:0 1px #EBEBEB;background:#fff;border-radius:3px;border:1px solid;border-color:#E5E5E5 #D3D3D3 #B9C1C6}.swipe{overflow:hidden;visibility:hidden;position:relative}.swipe-wrap{overflow:hidden;position:relative}.swipe-wrap>div{float:left;width:100%;position:relative}'));
                //document.head.appendChild(cG.stage.scenography);/*Add the <style> element to the page*/
            }
        };
        //plugin root changes
        var srcs = document.getElementsByTagName("src");
        for (i = 0; i < srcs.length; i++) { 
            cG.root=src[i].getAttribute("plugin");/*this overwrites any previous root setting*/
            if(cG.root!="") break;
        }
        if(cG.root=="") cG.root = pluginname;/*if root gets reset, then simply set the plugin as the new root*/
        /*use domReady if you need anything that runs after the DOM has loaded*/
        domReady(function(){
            /*runs once the DOM is ready*/
        });
    }
    else console.error("CNG Plug-in: "+pluginname+" must be loaded after comixngn.js");
}();//self-executing function