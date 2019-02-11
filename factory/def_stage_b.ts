///DEF_STAGE_B///
cG.REPO.stage = cG.REPO.stage(
    function d(input, config) {
    //default parameters
    input = input || [];
    config = config || {};

    //redefine globals
    var du = document,
        db = du.body,
        de = du.documentElement,
        pi = parseInt,
        raf = window.requestAnimationFrame,
    //PROPERTIES - private
        owrite = config.overwrite || 0,
        anchor = config.anchor || db,
        iimg = input.slice().map(
        function(val) {
            return {s: val};
        }),
        //is the spinner spinning?
        spinning = true,
        //scroll ID
        scrolling = -1,
        //-1 for unset, corresponds to current page
        current = -1,
        layers = [
            config.disableSpin ? null : du.createElement("canvas"),
            du.createElement("canvas")
        ],
        spinner = layers[0] ? {
            ctx: layers[0].getContext("2d"),
            clr: config.color || "#373737",
            str: Date.now(),
            lne: config.lines || 16,
            rte: config.rate || 1000 / 30,
            dia: config.diameter || 250,
            lbk: config.loaderback || "#FFF",
        } : null,
        options = {
            dir: config.dir || "",
            irb: config.imgprebuffer || 5,
            itb: config.imgpostbuffer || 5,
            bck: config.back || "#FFF",
            sz: config.size || 0,
            scl: 0
        },
        pstload = [],
        preload = [],
        master = new Image(),
        skroll = true,
        ctx = layers[1].getContext("2d"),
    //METHODS - private
        cb = {
            run: function (a) {
                for (var b = 0; b < cb[a].length; b++) {
                    cb[a][b]();
                }
            },
            start: [],
            slidn: [],
            slidd: []
        },
        spin = function () {
            if (!spinner) return;
            layers[0].style.paddingLeft = (layers[1].width - 300) / 2 + "px";
            var rotation =
                Math.floor((Date.now() - spinner.str) / 1000 * spinner.lne) / spinner.lne,
                c = spinner.clr.substr(1);
            spinner.ctx.save();
            spinner.ctx.clearRect(0, 0, 300, layers[1].height);
            spinner.ctx.translate(150, layers[1].height / 2);
            spinner.ctx.rotate(Math.PI * 2 * rotation);

            if (c.length == 3) c = c[0] + C[0] + c[1] + c[1] + c[2] + c[2];
            var red = pi(c.substr(0, 2), 16).toString(),
                green = pi(c.substr(2, 2), 16).toString(),
                blue = pi(c.substr(4, 2), 16).toString();

            for (var i = 0; i < spinner.lne; i++) {
                spinner.ctx.beginPath();
                spinner.ctx.rotate(Math.PI * 2 / spinner.lne);
                spinner.ctx.moveTo(spinner.dia / 10, 0);
                spinner.ctx.lineTo(spinner.dia / 4, 0);
                spinner.ctx.lineWidth = spinner.dia / 30;
                spinner.ctx.strokeStyle =
                    "rgba(" + red + "," + green + "," + blue + "," + i / spinner.lne + ")";
                spinner.ctx.stroke();
            }
            spinner.ctx.restore();

            if (spinning) raf(spin);
            else spinner.ctx.clearRect(0, 0, 300, layers[1].height);
        },
        scrollit = function (to, time) {
            //format inputs
            if (to === null || void 0 === to) to = { x: 0, y: 0 };
            else if (!isNaN(to)) to = { x: 0, y: to };
            //if to is num assume its y
            else {
                if (to.y === null || void 0 === to.y) to.y = 0;
                if (to.x === null || void 0 === to.x) to.x = 0;
            }
            if (time === null || void 0 === time || time <= 0) time = 400; //ignore given zero time

            //if x or y is less than 0 then go to the bottom
            if (to.y < 0)
                to.y =
                    window.innerHeight ||
                    de.clientHeight ||
                    db.clientHeight;
            if (to.x < 0)
                to.x =
                    window.innerWidth ||
                    de.clientWidth ||
                    db.clientWidth;

            //calculate distance needed to travel
            var dis = {
                x:
                    window.pageXOffset !== void 0 ? to.x - window.pageXOffset : to.x - de.scrollLeft,
                y:
                    window.pageYOffset !== void 0 ? to.y - window.pageYOffset : to.y - de.scrollTop
            };

            //console.log("to", to, "dis" ,dis, "(x", window.pageXOffset, de.scrollLeft, "| y", window.pageYOffset, de.scrollTop, ")" , time, time/5);

            //if that distance is 0 on both x and y, no scrolling required
            if (dis == { x: 0, y: 0 }) return dis;
            var clock = function (c, b, a) {
                window.scrollBy(Math.floor(c.x) / b, Math.floor(c.y) / b);
                if (a + 1 < b * 5) scrolling = window.setTimeout(clock, 5, c, b, a + 1);
            };
            scrolling = window.setTimeout(clock, 5, dis, Math.floor(time / 5), 0);
            //window.clearInterval(clock);
            return dis;
        },
        preloadGeneric = function () {
            iimg[this.virID].ld = true;
            /*possible implementation - Delete it when we are done, possibly saves memory, since its been cached?
                      this.virID=-1;
                      this.src="";*/
        },
        draw = function () {
            var dif, siz;
            //it loads and draws
            if (iimg[master.virID].ld)
                ctx.clearRect(0, 0, layers[1].width, layers[1].height); //clear the canvas based on its size
            else iimg[master.virID].ld = true;
            
            cb.run("slidn");
            //conviently, this callback draws the image as soon as master's src is changed and image loaded
            if (options.sz) siz = [options.sz.w, options.sz.h];
            else {
                switch (options.scl) { //scales to canvas
                    case 1://scale width
                        dif = layers[1].width / master.width;
                        siz = [layers[1].width, master.height * dif];
                        break;
                    case 2://scale height
                        dif = layers[1].height / master.height;
                        siz = [master.width * dif, layers[1].height];
                        break;
                    default:
                        if (options.scl) siz = [layers[1].width, layers[1].height];
                        else siz = [master.width, master.height];
                }
            }
            layers[1].width /*= layers[0].width = objref.acW */ = siz[0];
            layers[1].height /*= objref.acH*/ = siz[1];
            if(spinner) layers[0].height = siz[1];
            //ctx.drawImage(master, 0, 0);
            ctx.drawImage.apply(ctx, [master, 0, 0].concat(siz));
            
            spinning = 0;
            if (skroll) scrollit();
            cb.run("slidd");
        },
        assign = function (imagething, idd) {
            //assign helper, assigns an src and iid according to given id
            //console.log("World");
            /*console.log("dead",intervall);
                      if(intervall<0) intervall = window.setInterval(spin, spinner.rate, canvasData);
                      console.log("started",intervall);*/
            spinning = true;
            raf(spin);
            cb.run("start");
            //if lower than zero set to zero
            if (idd < 0) idd = 0; 
            //can not be equal to our higher than the amount of pages
            if (idd >= iimg.length) idd = iimg.length - 1;
            if (idd < 0) return;
            if (!iimg[idd].ld)
                ctx.clearRect(0, 0, layers[1].width, layers[1].height);
            imagething.virID = idd;
            imagething.src = options.dir + iimg[idd].s;
            //we change page as soon as it is assigned, so that page still changes even if it never loads
            current = idd;
            /*console.log("----");
                  for(var q = idd-1;q>idd-self.config.irb-1&&q>=0;q--){
                      console.log(q);
                  }
                  console.log("//");
                  for(var q = idd+1;q<self.config.itb+idd+1&&q<self.count;q++){
                      console.log(q);
                      continue;
      
                  console.log("----");*/
            var r = 0,
                q = 0;
            for (q = idd - 1; q > idd - options.irb - 1 && q >= 0; q--) {
                if (iimg[q].ld) continue;
                preload[r].virID = q;
                preload[r].src = options.dir + iimg[q].s;
                r++;
            }
            r = 0;
            for (
                q = idd + 1;
                q < options.itb + idd + 1 && q < iimg.length;
                q++
            ) {
                if (iimg[q].ld) continue;
                pstload[r].virID = q;
                pstload[r].src = options.dir + iimg[q].s;
                r++;
            }
        },
        xtndLmt = function (org, src) {
            //add value from src if its key exists in org
            if (!org) return;
            for(var key in src) if (org.hasOwnProperty(key)) org[key] = src[key];
        },
        jq = function () {
            try {
                jQuery.fn.direction = function (a, c) {
                    return this.each(function () {
                        c.anchor = $(this);
                        d(a, c);
                    });
                };
            } catch (e) {
                console.log(e);
            }
        };
    if (window.jQuery) jq();

    //PROPERTIES - public
    this.canvi = layers;
    this.cb = cb;
    //METHODS - public
    this.cnl = function() {
        //stop scrolling
        window.clearTimeout(scrolling);
    };
    this.swap = function (arr, opts, start) {
        iimg = Array.isArray(arr) ? arr.slice().map(function(val, id){return {s:val, d: id ? (id == arr.length - 1 ? 1 : 0) : -1};}) : iimg;
        if (opts) {
            xtndLmt(spinner, opts);
            xtndLmt(options, opts);
        }
        this.go(start||0);
    };
    this.count = function () {
        return iimg.length;
    };
    this.current = function () {
        return current;
    };
    this.callback = function (type, callback, index, remove) {
        if (type === null || void 0 === type) return cb.slidn;
        var typeMap = {"-1": cb.start, "0": cb.slidn, "1": cb.slidd},
            select = typeMap[index || 0];

        if (remove) {
            return select.splice(index || select.length - 1, 1);
        }

        if (callback === null || void 0 === callback) {
            return index === null || void 0 === index
                ? select
                : select[index];
        }
        
        if (index === null || void 0 === index) {
            select.push(callback);
        } else select[index] = callback;

        return 1;
    };
    this.go = function (to) {
        var sre = to === null || void 0 === to ? 0 : pi(to, 10);
        //console.log(sre);
        sre = isNaN(sre) ? 0 : sre;
        assign(master, Math.floor(Math.max(0, Math.min(iimg.length - 1, sre))));
        return sre;
    };
    this.prev = function () {
        var sre = current - 1; //avoids possible race condition, assign loads in new image which can call draw which can change self.current before it gets to the return call. storing it premptively will preserve the value
        if (sre >= 0) assign(master, sre);
        return sre;
    };
    this.next = function () {
        //console.log("Hello");
        var sre = current + 1;
        if (sre < iimg.length) assign(master, sre);
        return sre;
    };
    this.frst = function () {
        if (current >= 0) assign(master, 0);
        return 0;
    };
    this.last = function () {
        assign(master, iimg.length - 1);
        return iimg.length - 1;
    };
    this.rand = function () {
        var sre = Math.floor(Math.random() * (iimg.length - 1));
        //console.log(sre);
        assign(master, sre);
        return sre;
    };
    this.data = function (to) {
        //returns info about slide
        var sre = to === null || void 0 === to ? current : pi(to, 10);
        return isNaN(sre)
            ? iimg[current]
            : iimg[Math.floor(Math.max(0, Math.min(iimg.length - 1, sre)))];
    };
    this.scroll = function (bool) {
        //toggles Auto Scrolling
        if (!(bool === null || void 0 === bool)) skroll = bool;
        return skroll;
    };
    this.scrollTo = function (to, time) {
        return scrollit(to, time);
    }; //public wrapper for scrollit
    
    if (spinner) {
        //LOADER - setup
        layers[0].height = 480;
        layers[0].style.background = spinner.lbk;
        layers[0].style.paddingLeft = "170px";
        layers[0].style.zIndex = 0;
        layers[0].style.position = "absolute";
    } 

    //objref = canvasData;
    //console.log(layers[1]);
    //if (anchor) anchor.appendChild(layers[0]);
    //else du.body.appendChild(layers[0]);
    if (spinner) anchor.appendChild(layers[0]);
    //console.log(canvasData);
    //intervall=window.setInterval(spin, spinner.rate, canvasData);
    raf(spin);
    //DISPLAY - setup
    master = new Image();
    master.virID = -1; //unset to an vir image
    master.addEventListener("load", draw, false);
    //console.log(this.master);
    var q;
    for (q = 0; q < iimg.length; q++) {
        //iimg[q].btog = 0; a holdover from the old html based canvas
        iimg[q].d = q ? (q == iimg.length - 1 ? 1 : 0) : -1; //-1 means first, 0 means middle, 1 means last: true if endpoint, false if middle (desig)
        iimg[q].ld = false;
    }
    for (q = 0; q < options.irb; q++) {
        preload.push(new Image());
        preload[q].virID = -1; //unset to an vir image
        preload[q].addEventListener("load", preloadGeneric, false);
    }
    for (q = 0; q < options.itb; q++) {
        pstload.push(new Image());
        pstload[q].virID = -1; //unset to an vir image
        pstload[q].addEventListener("load", preloadGeneric, false);
    }
    //preload[0].virID = 0;
    //preload[0].src = input.pages[0].url;
    //init
    assign(master, options.startpage || owrite);
    //end init
    layers[1].height = 480;
    layers[1].width = 640;
    layers[1].background = options.bck;
    layers[1].style.zIndex = 1;
    layers[1].style.position = "relative";
    //layers[1].style.visibility="hidden";
    //if (anchor) anchor.appendChild(layers[1]);
    //else du.body.appendChild(layers[1]);
    anchor.appendChild(layers[1]);
    }
);
///////
cG.stage = cG.REPO.stage.def;