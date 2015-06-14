function HTMLparser(a){
    if(void 0===a){
        console.error("HTMLparser needs something to parse");
        return -1;
    } else if(typeof a==='string'){/*if a is string turn it into a cleaned array of tags*/
        a = a.replace(/[\n<]/g, '').split(">");
        a.pop();
    }
    console.log(a);
    if(a.length<1) return [];
    var taglist = [];
    var tag = {head:'',tail:'',inner:[]};
    var w = 0;
    var v = 0;
    var x = 0;
    var iter = a[0].split(" ");
    while(w>=0){
        x = a.indexOf("/"+iter[0],v);
        w = a.indexOf("/"+iter[0],v+1);
        v++;
    }
    tag.head = iter[0];
    tag.tail = a[x];
    for (k = 1; k < iter.length; k++) {
        var sub_iter = iter[k].split("=");
        tag[sub_iter[0]] = (sub_iter.length>1)?sub_iter[1]:'';
    }
    
    while(a.length>2){/*if the length is greater than 2 , you have children. Which means you have to iterate and push the children*/
        tag.inner.push(HTMLparser(a.slice(1,2)));
        tag.inner.push(HTMLparser(a.slice(3,6)));
        /*a = a.slice(1,x);
        console.log(a);
        w = 0;
        v = 0;
        x = 0;
        iter = a[0].split(" ");
        while(w>=0){
            x = a.indexOf("/"+iter[0],v);
            w = a.indexOf("/"+iter[0],v+1);
            v++;
        }
        tag.inner.push(a.splice(0,x));*/
        break;
    }
    return taglist;
}
console.log(JSON.stringify(HTMLparser('<div id="aC">\n<h1 id="aCTi" class="item"></h1>\n<p><img id isrc src title alt btog></p>\n</div>'),null,2));