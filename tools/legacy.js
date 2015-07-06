
    var idealStage = (cG.stage.body)?cG.stage.body:'<p class="controls"></p><div id="stage" class="swipe"><div id="target" class="swipe-wrap"></div></div>';
    var idealStar = (cG.actor)?cG.actor:'<div><h1></h1><p><img id="ig" isrc src title alt btog></p></div>';
    var idealCostumes = (cG.decor)?cG.decor:'<div id="location"></div><div id="archive">Archive</div><div id="me">About Me</div>';

    var id_attr = "";
    var script_attr = "";
    var use_attr = "";
    var config_attr = "";
    
    var result;
    var myScript;
    var subclone;
    var dipclone;
    var clone;
    var links;
    var target = '';
    var control = '';
    var cset = [[],[]];
    var myStage = {};
    for (i = 0; i < stages.length; i++) {
        /*initial setup*/
        /*get attributes */
        id_attr = stages[i].getAttribute("id");
        script_attr = stages[i].getAttribute("script");
        use_attr = stages[i].getAttribute("use");
        config_attr = stages[i].getAttribute("config");
        if(id_attr==""){/*if no ID, make one*/
            var name = "STG"+i;
            var j = 1;
            while(document.getElementById(name)) name = "STG"+(i+j++);
            id_attr = name.toString();
            stages[i].setAttribute("id", id_attr);
        }
        if(script_attr==""){/*if no script, use the default*/
            myScript = cG.script;
        } else {
            myScript = syncJSON(script_attr);/*if given, assume it is a src*/
            if(!myScript){/*if you get a 404, assume its an ID*/
                if(0){//not implemeneted yet
                myScript = cG.script.extras[parseInt(script_attr,10)];/*search for that ID in the script*/
                if(void 0===myScript) myScript = cG.script;/*if not found use default*/
                else if(void 0!==myScript.link){/*if the found script is a reference, load it*/
                    myScript = syncJSON(myScript.link);
                    if(!myScript) myScript = cG.script;/*if not found use default*/
                }
                } else myScript = cG.script;
            }
        }
        if(use_attr==""){/*if no use specified, use current*/
            myStage.stage = cG.stage;
            myStage.stageID = cG.stageID;
            myStage.scenography = cG.scenography;
            myStage.stage_ctrls = cG.stage_ctrls;
            myStage.templates = cG.templates;
        } else {
            myStage = cG.stageREPO[use_attr];/*use the id of the plug in to set stage*/
            if(void 0===myStage){/*if not found specified, use current*/
                myStage.stage = cG.stage;
                myStage.stageID = cG.stageID;
                myStage.scenography = cG.scenography;
                myStage.stage_ctrls = cG.stage_ctrls;
                myStage.templates = cG.templates;
            } else myStage.stageID = use_attr;
        }
        if(config_attr!=""){
            try {
                config_attr=JSON.parse(config_attr);
            }
            catch(err) {
                console.debug("The following configuration settings are malformed: ",config_attr,"It has been ignored");
                config_attr={};
            }
        } else config_attr={};
        config_attr.transitionEnd = cG.stage.manager;//transitionEnd: overwrite
        /*END initial set up*/
        /*index.html(venue)<-costumes.html(location)<-stage.html(target)<-actor.html*/
        cset = [["<|","<","?","index",">",">|"],["cG.stage.controls("+id_attr+",'a')","cG.stage.controls("+id_attr+",'b')","cG.stage.controls("+id_attr+",'e')","cG.stage.controls("+id_attr+",this)","cG.stage.controls("+id_attr+",'c')","cG.stage.controls("+id_attr+",'d')"]];
        clone = stages[i].cloneNode(false);
        //console.log(cG,cG.HELPERS.FEbyIdAI);
        links = cG.HELPERS.FEbyIdAI(clone,["venue","location","target","controls"],[idealCostumes,idealStage]);
        //console.log(links);
        for (t = 0; t < links.length; t++) {
            if(links[t].getAttribute("id")=="target"){
                target = links[t];
                continue;
            }
            if(links[t].getAttribute("id")=="ctrl"){
                control = links[t];
                continue;
            }
            if(control!="" && target!="") break;
        }
        if(!target) console.error("target fallback not implemented");
        cG.HELPERS.renameEles(false,clone,id_attr);
        //console.log(clone);
        /*append the slides*/
        //console.log(cG.script);
        target.innerHTML=idealStar;
        subclone=target.children[0].cloneNode(true);/*original clone*/
        target.innerHTML="";
        for (f = 0; f < cG.script.pages.length; f++) {
            dipclone=subclone.cloneNode(true);
            cG.HELPERS.renameEles(true,dipclone,id_attr,f);
            cG.HELPERS.smartAttrib(dipclone,{
                img: {
                    isrc:cG.script.pages[f].url,
                    src:cG.script.config.dir+cG.script.pages[f].url
                },
                h1: {
                    innerHTML: cG.script.pages[f].title
                }
            });
            target.appendChild(dipclone);
            //console.log(dipclone);
        }
        //console.log(target);
        cG.HELPERS.smartAttrib(control,{
                p: {
                    innerHTML: '<button class="'+id_attr+'_frs" id="'+id_attr+'_bfrs" onclick="'+cset[1][0]+'">'+cset[0][0]+'</button><button class="'+id_attr+'_frs" id="'+id_attr+'_bpre" onclick="'+cset[1][1]+'">'+cset[0][1]+'</button><button id="'+id_attr+'_bran" onclick="'+cset[1][2]+'">'+cset[0][2]+'</button><input id="'+id_attr+'_snum" type="number" class="tiny" onkeydown="'+cset[1][3]+'"/><button class="'+id_attr+'_las" id="'+id_attr+'_bnex" onclick="'+cset[1][4]+'">'+cset[0][4]+'</button><button class="'+id_attr+'_las" id="'+id_attr+'_blas" onclick="'+cset[1][5]+'">'+cset[0][5]+'</button>'
                }
            });
        //console.log(clone);
        stages[i].parentNode.replaceChild(clone, stages[i]);
        window[id_attr] = new cG.stage.fnt(target.parentNode, config_attr);
        
    Path.root("#");
    Path.listen();
    
        //console.log(window[id_attr],id_attr);
    } //console.log("TEST",idealStage,idealStar,idealCostumes,stages,clone,id_attr,script_attr,use_attr,result,myScript,myStage);
