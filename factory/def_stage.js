///////
cG.REPO.stage = {"def":{id:"def",construct:function(name,scriptt,anchor,options){
    var chek = function(truth,fals,iimg){
//console.log((iimg.absolute||iimg.url[0].indexOf('https://')+1||iimg.url[0].indexOf('http://')+1),iimg.absolute,iimg.url[0].indexOf('https://')+1,iimg.url[0].indexOf('http://')+1);
        if (iimg.absolute||iimg.url[0].indexOf('https://')+1||iimg.url[0].indexOf('http://')+1){
            return truth;
        } else
            return fals;
    }
var direction = function(input,anchor,owrite,c,mode){
    //input - an object, list, or string
    //anchor - the html object to append
    //INITIAL SETUP - Ensures input is the correct format, or dies trying
    c=c||{};
    var check = chek||function(truth){return truth;};
    //holdr is a template, formatted as comix-ngn JSON
    var holdr = {parent:null,
                 offset:0,
                 loading:
                 {lines:c.lines||16,
                  rate:c.rate||1000 / 30,
                  diameter:c.diameter||250,
                  back:c.loaderback||"#FFF",
                  color:c.color||"#373737"},
                 config:
                 {dir:c.dir||"assets/",
                  pagestartnum:!1,
                  chapterstartnum:!1,
                  imgprebuffer:c.imgprebuffer||5,
                  imgpostbuffer:c.imgpostbuffer||5,
                  startpage:0,
                  back:c.back||"#FFF"},
                 pages:[],
                 chapters:[]
                };
    if(void 0===input){
        return -1;
    } else if(typeof input==='string'){
        holdr.pages.push({alt:"",
                          hover:"",
                          title:"",
                          url:[input],
                          release:0,
                          note:"",
                          perm:!1,
                          anim8:!1});
        input = holdr;
    } else if(Array.isArray(input)){
        for(var q = 0;q<input.length;q++){
            holdr.pages.push({alt:"",
                              hover:"",
                              title:"",
                              url:[],
                              release:0,
                              note:"",
                              perm:!1,
                              anim8:!1});
            if(Array.isArray(input[q])){
                for(var w = 0;w<input[q].length;w++){
                    holdr.pages[q].url.push(input[q][w]);
                }
            } else holdr.pages[q].url.push(input[q]);
        }
        input = holdr;
    } else if(!input.pages.length) 
        input.pages.push({alt:"",
                          hover:"",
                          title:"",
                          url:[],
                          release:0,
                          note:"",
                          perm:!1,
                          anim8:!1});
    else if(void 0 === input.pages[0].url) return -1;
    if(void 0 === anchor||anchor == null) anchor = 0;
    //PROPERTIES - private
    var iimg = input.pages,
        count= input.pages.length, 
        spinning=true,//is the spinner spinning?
        current= -1,//-1 for unset, corresponds to current page,
        spinner = input.loading,
        config = input.config,
        parent = input.parent,
        offset = input.offset,
        pstload = [],
        preload = [],
        master = new Image(),
        skroll = true,
        layers = [document.createElement("canvas"), document.createElement("canvas")],
        context = layers[1].getContext('2d'),
        //METHODS - private
        n = function(){return 0},//this null fuction save us some bytes
        cb = {
            run: function(a){for(var b=0;b<cb[a].length;b++){cb[a][b]();}},
            start: [],
            slidn: [],
            slidd: []
        },
        //slidestart=n,
        //sliding=n,
        //slidend=n,
        object = {
            context: layers[0].getContext('2d'),
            color: spinner.color,
            start: Date.now(),
            lines: spinner.lines,
            diameter: spinner.diameter,
            rate: spinner.rate
        },
        spin = function(a) {
            layers[0].style.paddingLeft=((layers[1].width-300)/2)+"px";
            var rotation = Math.floor(((Date.now() - a.start) / 1000) * a.lines) / a.lines,
                c = a.color.substr(1);
            a.context.save();
            a.context.clearRect(0, 0, 300, layers[1].height);
            a.context.translate(150, layers[1].height/2);
            a.context.rotate(Math.PI * 2 * rotation);
            if (c.length == 3) c = c[0] + C[0] + c[1] + c[1] + c[2] + c[2];
            var red = parseInt(c.substr(0, 2), 16).toString(),
                green = parseInt(c.substr(2, 2), 16).toString(),
                blue = parseInt(c.substr(4, 2), 16).toString();
            for (var i = 0; i < a.lines; i++) {
                a.context.beginPath();
                a.context.rotate(Math.PI * 2 / a.lines);
                a.context.moveTo(a.diameter / 10, 0);
                a.context.lineTo(a.diameter / 4, 0);
                a.context.lineWidth = a.diameter / 30;
                a.context.strokeStyle = "rgba(" + red + "," + green + "," + blue + "," + i / a.lines + ")";
                a.context.stroke();
            }
            a.context.restore();
            if(spinning) window.setTimeout(spin, a.rate, object);
            else a.context.clearRect(0, 0, 300, layers[1].height);
        },
        scrollit = function(to,time){
            //format inputs
            if(to===null||void 0===to) to={x:0,y:0};
            else if (!isNaN(to)) to={x:0,y:to};//if to is num assume its y
            else {
                if(to.y===null||void 0===to.y) to.y=0;
                if(to.x===null||void 0===to.x) to.x=0;
            }
            if(time===null||void 0===time||time<=0) time=400;//ignore given zero time
            //if x or y is less than 0 then go to the bottom
            if(to.y<0) to.y=window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;
            if(to.x<0) to.x=window.innerWidth|| document.documentElement.clientWidth|| document.body.clientWidth;
            //calculate distance needed to travel
            var dis = {x:(window.pageXOffset!==void 0)?to.x-window.pageXOffset:to.x-document.documentElement.scrollLeft,y:(window.pageYOffset!==void 0)?to.y-window.pageYOffset:to.y-document.documentElement.scrollTop};
            /*dis.x=(window.pageXOffset===void 0)?to.x-window.pageXOffset:to.x-document.documentElement.scrollLeft;
            dis.y=(window.pageYOffset===void 0)?to.y-window.pageYOffset:to.y-document.documentElement.scrollTop;*/
            //console.log("to",to,"dis",dis,"(x",window.pageXOffset,document.documentElement.scrollLeft,"| y",window.pageYOffset,document.documentElement.scrollTop,")",time,time/5);
            if(dis=={x:0,y:0}) return dis;//if that distance is 0 on both x and y, no scrolling required
            var clock = function(c,b,a){
                window.scrollBy(Math.floor(c.x)/b, Math.floor(c.y)/b);
                if(a+1<b*5) window.setTimeout(clock,5,c,b,a+1);
            }
            window.setTimeout(clock,5,dis,Math.floor(time/5),0);
            //window.clearInterval(clock);
            return dis;
        },
        preloadGeneric = function(){
            //console.log(this.src,iimg[this.imaginaryID].url[0]);
            iimg[this.imaginaryID].loaded = true;
            /*possible implementation - Delete it when we are done, possibly saves memory, since its been cached?
        this.imaginaryID=-1;
        this.src="";*/
        },
        preloadMaster = function(){//actually a misnomer, master doesnt actually preload, it loads and draws
            if(iimg[this.imaginaryID].loaded) context.clearRect(0, 0, this.width, this.height);
            else iimg[this.imaginaryID].loaded = true;
            cb.run("slidn");//sliding();
            //conviently, this callback draws the image as soon as master's src is changed and image loaded
            layers[1].width /*= layers[0].width = objref.acW */= this.width;
            layers[1].height = layers[0].height /*= objref.acH*/ = this.height;
            context.drawImage(this,0,0);
            //current = this.imaginaryID;//do not wait on load for page change, do not change page on page load
            /*console.log("killing",intervall);
            window.clearInterval(intervall);
            intervall=-1;*/
            spinning=0;
            if(skroll) scrollit();
            cb.run("slidd");//slidend();
        },
        assign = function(imagething,idd){//assign helper, assigns an src and iid according to given id
            //console.log("World");
            /*console.log("dead",intervall);
            if(intervall<0) intervall = window.setInterval(spin, spinner.rate, object);
            console.log("started",intervall);*/
            spinning=true;
            window.setTimeout(spin, spinner.rate, object);
            cb.run("start");//slidestart();
            if(idd<0) idd=0;//if lower than zero set to zero
            if(idd>=count) idd=count-1; //can not be equal to our higher than the amount of pages
            if(!iimg[idd].loaded) context.clearRect(0, 0, layers[1].width, layers[1].height);
            imagething.imaginaryID = idd;
            imagething.src = check(iimg[idd].url[0],config.dir+iimg[idd].url[0],iimg[idd]);
            current = idd;//we change page as soon as it is assigned, so that page still changes even if it never loads
            /*console.log("----");
        for(var q = idd-1;q>idd-self.config.imgprebuffer-1&&q>=0;q--){
            console.log(q);
        }
        console.log("//");
        for(var q = idd+1;q<self.config.imgpostbuffer+idd+1&&q<self.count;q++){
            console.log(q);
         continue;

        console.log("----");*/
            var r = 0;
            for(var q = idd-1;q>idd-config.imgprebuffer-1&&q>=0;q--){
                if(iimg[q].loaded) continue;
                preload[r].imaginaryID = q;
                preload[r].src = check(iimg[q].url[0],config.dir+iimg[q].url[0],iimg[q]);
                r++;
            }
            r = 0;
            for(var q = idd+1;q<config.imgpostbuffer+idd+1&&q<count;q++){
                if(iimg[q].loaded) continue;
                pstload[r].imaginaryID = q;
                pstload[r].src = check(iimg[q].url[0],config.dir+iimg[q].url[0],iimg[q]);
                r++;
            }
        }/*,
        jq = function(){
            this.attempts = 0||this.attempts+1;
            if(window.jQuery===void 0&&this.attempts<10) return window.setTimeout(jq,300);
            jQuery.fn.direction = function(a,b,c) {
                return this.each( function() {
                    direction(a,$(this),b,c);
                });
            }
        }
    if(c.jq) jq();*/
    //METHODS - public
    this.count = function(){return count;}
    this.current = function(){return current;}
    this.callback = function(type,callback,index){
        if(type===null||void 0===type) return cb.slidn;
        if(callback===null||void 0===callback){
            return (index===null||void 0===index)?(type)?(type>0)?cb.slidd[index]:cb.start[index]:cb.slidn[index]:(type)?(type>0)?cb.slidd:cb.start:cb.slidn;
        }
        if(type&&(index===null||void 0===index))
            if(type>0) cb.slidd.push(callback);
            else cb.start.push(callback);
        else if (index===null||void 0===index) cb.slidn.push(callback);
        return 1;
        /*if(type===null||void 0===type) return sliding;
        if(callback===null||void 0===callback) return (type)?(type>0)?slidend:slidestart:sliding;
        if(type)
            if(type>0) slidend = callback;
            else slidestart = callback;
        else sliding = callback;
        return 1;*/
    }
    this.go = function(to){
        var sre = (to===null||void 0===to)?0:parseInt(to,10);
        //console.log(sre);
        sre = (isNaN(sre))?0:sre;
        assign(master,(Math.floor(Math.max(0,Math.min(count-1,sre)))));
        return sre;
    }
    this.prev = function(){
        var sre = current-1;//avoids possible race condition, assign loads in new image which can call preloadMaster which can change self.current before it gets to the return call. storing it premptively will preserve the value
        if(sre>=0) assign(master,sre);
        return sre;
    }
    this.next = function(){
        //console.log("Hello");
        var sre = current+1;
        if(sre<count) assign(master,sre);
        return sre;
    }
    this.frst = function(){
        if(current>=0) assign(master,0);
        return 0;
    }
    this.last = function(){
        assign(master,count-1);
        return count-1;
    }
    this.rand = function(){
        var sre = Math.floor(Math.random() * (count-1));
        //console.log(sre);
        assign(master,sre);
        return sre;
    }
    this.data = function(to){//returns info about slide
        var sre = (to===null||void 0===to)?current:parseInt(to,10);
        return (isNaN(sre))?iimg[current]:iimg[(Math.floor(Math.max(0,Math.min(count-1,sre))))];
    }
    this.scroll = function(bool){//toggles Auto Scrolling
        if(bool===null||void 0===bool) return skroll;
        return skroll=bool;
    }
    this.scrollTo = function(to,time){return scrollit(to,time);}//public wrapper for scrollit
    //LOADER - setup
    layers[0].height=480;
    //layers[0].width=640;
    layers[0].style.background=spinner.back;
    layers[0].style.paddingLeft="170px";
    layers[0].style.zIndex=0;
    layers[0].style.position="absolute";

    //objref = object;
    //console.log(layers[1]);
    if(anchor) anchor.appendChild(layers[0]);
    else document.body.appendChild(layers[0]);
    //console.log(object);
    //intervall=window.setInterval(spin, spinner.rate, object);
    window.setTimeout(spin, spinner.rate, object);
    //DISPLAY - setup
    master = new Image();
    master.imaginaryID = -1;//unset to an imaginary image
    master.addEventListener("load", preloadMaster, false);
    //console.log(this.master);
    for(var q = 0;q<iimg.length;q++){
        //iimg[q].btog = 0; a holdover from the old html based canvas
        iimg[q].desig = (q)?(q==iimg.length-1)?1:0:-1;//-1 means first, 0 means middle, 1 means last: true if endpoint, false if middle
        iimg[q].loaded = false;
    }
    for(var q = 0;q<input.config.imgprebuffer;q++){
        preload.push(new Image());
        preload[q].imaginaryID = -1;//unset to an imaginary image
        preload[q].addEventListener("load", preloadGeneric, false);
    }
    for(var q = 0;q<input.config.imgpostbuffer;q++){
        pstload.push(new Image());
        pstload[q].imaginaryID = -1;//unset to an imaginary image
        pstload[q].addEventListener("load", preloadGeneric, false);
    }
    //preload[0].imaginaryID = 0;
    //preload[0].src = input.pages[0].url;
    //init
    assign(master,(owrite===void 0||owrite===null||isNaN(owrite))?config.startpage:owrite);
    //end init
    layers[1].height=480;
    layers[1].width=640;
    layers[1].background = config.back;
    layers[1].style.zIndex=1;
    layers[1].style.position="relative";
    //layers[1].style.visibility="hidden";
    if(anchor) anchor.appendChild(layers[1]);
    else document.body.appendChild(layers[1]);
    this.canvi=layers;
    this.internals = input;
    this.cb = cb;
}/**/
var get;//still undefined
if(typeof(Storage) !== "undefined") {
    get = parseInt(localStorage.getItem(cG.comicID+"|"+name+"|curPage"),10);
    /*if(cG.avx[0]>0&&cG.avx[1]>0) */cG.verbose(1,cG.comicID+"|"+name+"|curPage",":",get);
    /*else console.log(cG.comicID+"|"+name+"|curPage",":",get);*/
}
if(cG.comix===void 0&&cG.prePage>=0) get = cG.prePage;//prepage, which is from router, overwrites localStorage if over -1, only works on comix
var main = new direction(scriptt,anchor,get);
main.name = name;
main.type = "def";
//if(cG.avx[0]>1&&cG.avx[1]>0){}
main.pg = [anchor]
main.at = 0;
main.my = 0;
main.navto = function(a){
    if(a<main.pg.length&&a!==null&a!==void 0) return main.pg[a]._nav();
    else return main.pg[main.my]._nav();
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
var lscurrent = function(){
    if(typeof(Storage) !== void 0&&cG.fBox.pgesve) {
        localStorage.setItem(cG.comicID+"|"+name+"|curPage",cG.cPanel[/*"def_"+*/name].current().toString());
    }
    if(cG.comix===cG.cPanel[/*"def_"+*/name]){//if comic is the comix, then push its state
        var chpmod = (cG.script.config.chapterstartnum)?1:0,
            modify = (cG.script.config.pagestartnum)?1:0,
            result = cG.cPanel[/*"def_"+*/name].current();
        switch(cG.script.config.orderby) {
            case 1:
                console.log(result);
                var mechp = cG.cPanel[/*"def_"+*/name].ch_current();
                result=(mechp+chpmod)+"/"+(result-cG.cPanel[/*"def_"+*/name].internals.chapters[mechp].start+modify)
                break;
            case 2:
                var nT = new Date(cG.cPanel[/*"def_"+*/name].data().release*1000);
                var guide=cG.script.config.dateformat.split("/");
                for(var tim=0;tim<3;tim++){
                    if(guide[tim].indexOf("Y")+1) guide[tim]=nT.getYear()-100;
                    else if(guide[tim].indexOf("M")+1) guide[tim]=nT.getMonth()+1;
                    else if(guide[tim].indexOf("D")+1) guide[tim]=nT.getDate();
                }
                result=guide.join("/");
                //console.log(result,guide,nT);
                break;
            default:
                result+=modify;
        }
        //if(cG.avx[0]>0&&cG.avx[1]>0) 
        cG.verbose(1,name,"Pushing state:",result);
        if(cG.fBox.pgepsh) history.pushState({}, null, "#/"+result);
    }
    if(cG.queue.stageChange!==void 0)
        for(var ftn in cG.queue.stageChange){
            if (cG.queue.stageChange.hasOwnProperty(ftn)) cG.queue.stageChange[ftn](cG.cPanel[/*"def_"+*/name]);
        }
    var strct = cG.cPanel[/*"def_"+*/name].data(cG.cPanel[/*"def_"+*/name].current()).special;
    var zombie = document.getElementById(name+"_tempScript");//fetch zombie child
    var preload = cG.HELPERS.stick(cG.cPanel[/*"def_"+*/name].canvi[0],null,null,0);
    var display = cG.HELPERS.stick(cG.cPanel[/*"def_"+*/name].canvi[1],null,null,1);
    if(zombie!==void 0&&zombie!==null){
        anchor.removeChild(zombie);//kill the zombie
        //if(cG.avx[0]>1&&cG.avx[1]>0){}
        preload._show();
        display._show();
    }
    if(strct!==null&&strct!==void 0&&strct!=""){
        //anchor.innerHTML += anchor.innerHTML+strct;//this breaks the cavases
        var spanr = document.createElement("SPAN");
        spanr.setAttribute("id", name+"_tempScript");
        spanr.innerHTML=strct;
        anchor.appendChild(spanr);
        //if(cG.avx[0]>1&&cG.avx[1]>0){}
        preload._hide();
        display._hide();
    }
}
main.callback(1,lscurrent);
cG.comix = (cG.fBox.protect)?cG.comix||main:main;
//if protect is true - set the comix on the first call
//else always overwrite comix
return main;
}}};
cG.stage = cG.REPO.stage.def;
///////