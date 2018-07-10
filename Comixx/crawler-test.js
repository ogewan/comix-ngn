const Crawler = require("crawler"), fs = require("fs"),
    workers = (error, res, done) => {
        let rawanchors = [], queue = [],
            $ = res.$, uri = unorm(res.request.uri.href);

        console.log(uri);
        
        $("img").each((i, e) => { 
            //loop on all image srcs, complete incomplete links with URL construct
            let src = unorm(e.attribs.src);
            
            if (!images[src]) {
                //images[src] = {org: [uri], cnt: 1};
                images[src] = [uri];
                linkmap[uri] = (linkmap[uri]) ? linkmap[uri].concat(src) : [src];
            } else {
                //images[src].cnt++;
                images[src] = images[src].concat(uri);
            }
        });

        $("a").each((i, e) => {
            //loop on all links, complete incomplete links with URL construct
            let a = e.attribs.href;
            if (a) {
                a = unorm(a);
                //check if link has the same host to see if it is part of the website
                if (a.indexOf(init) + 1) {
                    rawanchors.push(a);
                }
            }
        });

        rawanchors = nodup(rawanchors);
        //visited[lindex] = visited[lindex].concat(rawanchors);
        visited[uri] = visited[uri].concat(rawanchors);

        rawanchors.forEach((e) => {
            //let lindex = linkDict.push(e) - 1;
            //if (!visited[lindex]) {
            if (!visited[e]) {

                //linkDict[lindex] = new URL(linkDict[lindex]);
                visited[e] = [];
            }
        });

        for (var key in visited) {
            if (visited.hasOwnProperty(key) && !queued[key]) {
                queue.push(key);
                queued[key] = 1;
            }
        }
        
        if (queue.length) {
            c.queue(queue);
        }
        done();
    },

    c = new Crawler({maxConnections : 10, callback: workers}),
    unorm = (uri) => {
        let url = new URL(uri, init), href;
        //force https
        url.protocol = "https:";
        href = url.href;
        //remove empty hash
        if (url.hash == "" && href[href.length - 1] == "#") {
            href = href.slice(0, href.length - 1);
        }
        //trim trailing slash
        if (href[href.length - 1] == "/") {
            href = href.slice(0, href.length - 1);
        }
        return href;
    },
    //comapre uris, ignore protocol
    uric = function(uria, urib, opts = {}) {
        for (var key in uria) {
            if (uria.hasOwnProperty(key) && (
                (opts[key] && opts.include) ||
                (!opts[key] && !opts.include)
            )) {
                if (uria[key] != urib[key]) {
                    return false;
                } 
            }
        }
        return true;
    },
    nodup = function (arr)  {
        let obj = {};
        for (let i in arr) {
            let arrk = arr[i];
            if (arrk[arrk.length-1] == "#") {
                arrk = arrk.slice(0, arrk.length-1);
            }
            obj[arrk] = 1;
        }
        return Object.keys(obj);
    },
    dump = function (obj, name) {
        fs.writeFileSync(name, JSON.stringify(obj, null, 4));
    }
;

var init = unorm('https://www.xkcd.com/'),//'https://questionablecontent.net';
    images = {}, 
    visited = { [init]: [] }, 
    queued = { [init]: 1 }, 
    linkmap = {},
    ordlist = [];

c.on('drain', function(){
    var linkedtomap = {};
    console.log("Crawl Complete");
    
    for (let page in linkmap) {
        linkmap[page] = {
            img: linkmap[page],
            lnk: []
        };
        for (let id in linkmap[page].img) {
            let imglist = linkmap[page].img, 
                count = images[imglist[id]].length;
            if (count >= Object.keys(linkmap).length) {
                //must be in list to trigger this
                imglist.splice(id, 1);
            }
        }

        let anchors = visited[page], procmap = {};
        for (let url in anchors) {
            let link = anchors[url];

            if (link[link.length-1] == "/") {
                link = link.slice(0, link.length-1);
            }

            if (linkmap[link]) {
                //linkmap[page].lnk[link] = 
                linkmap[page].lnk.push(link);
                linkedtomap[link] = linkedtomap[link] || {};
                let l2m = linkedtomap[link];
                l2m.cnt = (l2m.cnt) ? l2m.cnt + 1 : 1;
                //linkmap[link]
                //Build Link lists
            }
        }
    }
    //Traversal: find the first cycle or longest path
    //  Find endpoints - By definition, end points are accessible from every page
    let somePage = linkmap[Object.keys(linkmap)[0]], 
        endpoints = [], 
        linkCnt = Object.keys(linkedtomap).length - 1;

    for (let iter in somePage.lnk) {
        let link = somePage.lnk[iter];
        if (linkedtomap[link].cnt == linkCnt) {
            if (linkmap[link].lnk.length) {
                endpoints.push(link);
            } else {
                //if lnk list is empty, don't even visit it (pretend we've already visited)
                linkmap[link].marked = 1;
            }
        }
    }

    if (endpoints.length == 2) {
        for (let pts in endpoints) {
            if (endpoints[pts] == init) {
                end = endpoints[pts];
            } else {
                start = endpoints[pts];
            }
        }

        //ordlist.push(end, start);
        linkmap[end].marked = 1;
        let currnode = linkmap[start];//, pgvisit = {[end] : 1};
        while (!currnode.marked) {
            currnode.marked = 1;
            ordlist.push(currnode.img[0]);
            for (let i in currnode.lnk) {
                let query = currnode.lnk[i];
                if (!linkmap[query].marked) {
                    currnode = linkmap[query];
                    break;
                }
            }
        }
        ordlist.push(linkmap[end].img[0]);
    }
    /*
    dump(images, "xkcdimglist.json");
    dump(visited, "visitedmap.json");
    dump(linkmap, "linkmap.json");
    console.log("Files Dumped");
    dump(images, "xkcdimglist.json");
    */
    dump(linkmap, "linkmap3.json");
    dump(linkedtomap, "link2map.json");
    console.log("dump linkmap2");
    
    dump(ordlist, "xkcdimglist.json");
    console.log("Image list ")
});
c.queue(init);