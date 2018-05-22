///DEF_STAGECHANGE//
cG.queue.stageChange=cG.queue.stageChange||{};
cG.queue.stageChange.hotcontent=function(){
    var hotstuff = document.getElementsByClassName("cg-hot");
    var hotqueue = [];//window.hotqueue||[];
    for (var i = 0; i < hotstuff.length; i++) { 
        hotqueue.push({place:hotstuff[i].parentNode,time:hotstuff[i]});
    }
    while (hotstuff.length) {
        hotstuff[0].parentNode.removeChild(hotstuff[0]);
    }
    for (var j = 0; j < hotqueue.length; j++) { 
        console.log("queued stuff",cG.info.vrb,hotqueue[j])
            hotqueue[j].place.appendChild(hotqueue[j].time);/*
        if(cG.info.vrb!=500){
            hotqueue[j].place.appendChild(hotqueue[j].time);
        } else window.hotqueue = hotqueue;*/
    }    
}
cG.queue.stageChange.controller=function(target){
    //console.log(target.data().desig);
    var b,
        c,
        key,
        mykey,
        bcollect=[],
        check = target.data().desig;
    for(var o=0;o<target.brains.length;o++){
        bcollect = FindClassesInside(target.brains[o],["frst","last","prev","next","rand"]);
        //console.log(bcollect);
        for(var p=0;p<bcollect.length;p++){
            b=bcollect[p];
            c=b.getAttribute("class");
            //console.log(b,p,bcollect);
            //console.log(target.brains[o],b.getAttribute("nohide"))
            key = target.brains[o].getAttribute("nohide");
            if(key) mykey = key;
            else mykey = "disable";
            //console.log(check)
            if((c=="frst"||c=="prev")&&check==-1){
                if(c=="frst") b.setAttribute("class","frst "+mykey);
                else b.setAttribute("class","prev "+mykey);
                if(!key) b.setAttribute("style","display:none;");
            }
            else if((c=="frst "+mykey||c=="prev "+mykey)){
                if(c=="frst "+mykey) b.setAttribute("class","frst");
                else b.setAttribute("class","prev");
                if(!key) b.setAttribute("style","display:inline;");
            }
            if((c=="last"||c=="next")&&check==1){
                if(c=="last") b.setAttribute("class","last "+mykey);
                else b.setAttribute("class","next "+mykey);
                if(!key) b.setAttribute("style","display:none;");
            }
            else if((c=="last "+mykey||c=="next "+mykey)){
                if(c=="last "+mykey) b.setAttribute("class","last");
                else b.setAttribute("class","next");
                if(!key) b.setAttribute("style","display:inline;");
            }
        }
    }
};