/*HELPERS*/
cG.HELPERS = {};
/*/////////////////////////////////////////////////
HELPER FUNCTIONS*/
cG.HELPERS.smartAttrib = function(source,mapper,ignore){
    var base;
    var ig = parseInt(ignore);
    ig = (isNaN(ig))?0:ig;
    var srch = mapper[source.nodeName.toLowerCase()];
    if(void 0 !== srch&&ig<=0){
        if(srch.count === void 0 || srch.count != 0){/*as long as count != 0 we can set the attribute*/
            base = Object.keys(srch);
            for(var y=0;y<base.length;y++){
                if(base[y]=="count") continue;
                if(base[y]=="innerHTML"){
                    source.innerHTML = srch[base[y]];
                    continue;
                }
                source.setAttribute(base[y],srch[base[y]]);         
            }
            if(srch.count > 0) mapper[source.nodeType.toLowerCase()].count--;/*if count is above 0, decrement it (this limits the amount of sets)*/
        }
    } else ig--;
    for(var x=0;x<source.children.length;x++) cG.HELPERS.smartAttrib(source.children[x],mapper,ig);
}
cG.HELPERS.stick = function(obj,parent,sauce,pos){
    var ftns = [
        function(a){//order
            if(parent!==void 0||parent!==null){
                parent.splice(a, 0, this);
                this._pos = a;
                return a;
            }
        },
        function(a){//switch
            if(parent!==void 0||parent!==null){
                var b = parent[this._pos];
                parent[this._pos] = parent[a];
                parent[a] = b;
                this._pos = a;
                return a;
            }
        },
        function(){//nav
            if(sauce!==void 0||sauce!==null){
                sauce.at = this._pos;
                this._show();
                var b = this._pos;
                for(var y=0;y<parent.length;y++){
                    if(this._pos==y) continue;
                    parent[y]._hide();
                }
                if(this._chain.length) b = [b];
                for(var x=0;x<this._chain.length;x++){
                    //console.log(this,this._chain,x,this._chain[x]);
                    this._chain[x]._show();
                    b.push(x);
                }
                return b;
            }
        },
        function(){//show
            if(this.style.display===null||this.style.display===void 0)
                this.setAttribute("style",this.getAttribute("style")+"display: block;");
            else this.style.display="block";
            return this._pos;
        },
        function(){//hide
            if(this.style.display===null||this.style.display===void 0)
                this.setAttribute("style",this.getAttribute("style")+"display: none;");
            else this.style.display="none";
            return this._pos;
        },
        function(){//cloak
            if(this.style.visibility===null||this.style.visibility===void 0)
                this.setAttribute("style",this.getAttribute("style")+"visibility:hidden;");
            else this.style.visibility="hidden";
            return this._pos;
        },
        function(){//uncloak
            if(this.style.visibility===null||this.style.visibility===void 0)
                this.setAttribute("style",this.getAttribute("style")+"visibility: visible;");
            else this.style.visibility="visible";
            return this._pos;
        },
        function(a){//link
            if(parent!==void 0||parent!==null){
                this._chain.push(parent[a]);
                return a;
            }
        },
        function(a){//unlink
            if(parent!==void 0||parent!==null){
                return this._chain.splice(this._chain.indexOf(parent[a]),1);
            }
        },
        function(a){//bind
            if(parent!==void 0||parent!==null){
                this._chain.push(parent[a]);
                parent[a]._chain.push(this);
                return [a,this._pos]
            }
        },
        function(a){//unbind
            if(parent!==void 0||parent!==null){
                return this._chain.splice(this._chain.indexOf(parent[a]),1).concat(parent[a]._chain.splice(parent[a]._chain.indexOf(this._pos), 1));
            }
        }
    ]
    obj._order = ftns[0];
    obj._switch = ftns[1];
    obj._nav = ftns[2];
    obj._show = ftns[3];
    obj._hide = ftns[4];
    obj._cloak = ftns[5];
    obj._uncloak = ftns[6];
    obj._link = ftns[7];
    obj._unlink = ftns[8];
    obj._bind = ftns[9];
    obj._unbind = ftns[10];
    obj._pos = pos;
    obj._chain = [];
    return obj;
}
cG.HELPERS.FEbyIdAI = function(source,ids,inner){
    var ret = [];
    var w;
    var j;
    var q = ids.indexOf(source.getAttribute("id"))+1;
    if(!q){
        w = source.className.split(" ");
        //console.log(q,w);
        for(b=0;b<w.length;b++){
            //console.log(ids,w,ids.indexOf(w[b]));
            q = ids.indexOf(w[b]);
            if(q>=0) break;
        }
        q++;
    }
    if(q){
        source.innerHTML = inner[q-1];
        ret.push(source);
    }

    for(var a=0;a<source.children.length;a++){
        ret = ret.concat(cG.HELPERS.FEbyIdAI(source.children[a],ids,inner));
    }
    //console.log(q,ret,source);
    return ret;
}
cG.HELPERS.FindClassesInside = function(source,cls){
    //console.log(source);
    var ret = [],
        q,
        w = source.className.split(" ");
    for(var u=0;u<w.length;u++){
        //console.log(cls,w[u]);
        q=cls.indexOf(w[u])+1;
        if(q) break;
    }
    if(q){
        ret.push(source);
    }
    for(var a=0;a<source.children.length;a++){
        ret = ret.concat(cG.HELPERS.FindClassesInside(source.children[a],cls));
    }
    return ret;
}
cG.HELPERS.renameEles = function(bool,source,prepend,append){
    for(var x=0;x<source.children.length;x++) cG.HELPERS.renameEles(true,source.children[x],prepend,append);
    if(bool) {
        var pre = (void 0===prepend)?'':prepend+"_";
        var app = (void 0===append)?'':"_"+append;
        source.setAttribute("id",pre+source.getAttribute("id")+app);
        if(source.className!="") source.className = " "+pre+source.className; 
    }
}
/* setup complete
/////////////////////////////////////////////////*/