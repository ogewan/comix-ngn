///START///
cG.director.map("#/:v1(/:v2/:v3/:v4/:v5/:v6/:v7/:v8/:v9)").to(cG.route2page);
cG.rdy(function(){
    cG.director.listen();
    //cG.director.history.listen(true);
    /*everything else occurs here*/
    if(!document.getElementById("$COMICNGWRITER$$$")){/*prints version information*/
        console.log("%c %c %c comix-ngn v"+ cG.info.vix +" %c \u262F %c \u00A9 2015 Oluwaseun Ogedengbe %c Plugins: "+cG.$GPC, "color:white; background:#2EB531", "background:purple","color:white; background:#32E237", 'color:red; background:black', "color:white; background:#2EB531", "color:white; background:purple");}
    //console.log(JSON.stringify(cG, null, 2) );
    var a = document.getElementsByTagName("SCRIPT");
    var b;
    for (var i = 0; i < a.length; i++) {
        if(void 0==a[i].getAttribute("src")) continue;
        if(a[i].getAttribute("src").indexOf("comixngn")>=0){
            b=a[i].getAttribute("auto");
            break;
        };
    }
    //console.log(cG.script.config.dir);
    if((b===null||b||b===void 0||b=="")&&cG.fBox.fstrun){
        //jstagecreate();
        //cG.cPanel=cG.stageInjection();
        cG.stageInjection();
        //console.log(cG.cPanel);
    }
});