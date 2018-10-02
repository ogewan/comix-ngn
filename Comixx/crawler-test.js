const Crawler = require("crawler"), fs = require("fs"), path = require("path"),
    workers = (error, res, done) => {
        let rawanchors = [], queue = [],
            $ = res.$, uri = unorm(res.request.uri.href);

        console.log(uri);
        
        if (!$) { return done(); }

        $("img").each((i, e) => { 
            //loop on all image srcs, complete incomplete links with URL construct
            let src = unorm(e.attribs.src);
            
            //if (src.indexOf(init) + 1) {
            if (!images[src]) {
                //images[src] = {org: [uri], cnt: 1};
                images[src] = [uri];
            } else {
                //images[src].cnt++;
                images[src] = images[src].concat(uri);
            }
            linkmap[uri] = (linkmap[uri]) ? linkmap[uri].concat(src) : [src];
            //}
        });

        $("a").each((i, e) => {
            //loop on all links, complete incomplete links with URL construct
            let a = e.attribs.href, 
                valid = ["", ".html", ".htm", ".php"],
                ext = path.extname(new URL(e.attribs.href, init).pathname);
            if (a) {
                a = unorm(a);
                //check if link has the same host to see if it is part of the website
                if (a.indexOf(init) + 1 && valid.indexOf(ext) + 1) {
                    rawanchors.push(a);
                } else {
                    //console.log("REJECTED: ", a, a.indexOf(init) + 1, ext)
                }
            }
        });

        rawanchors = nodup(rawanchors);
        //visited[lindex] = visited[lindex].concat(rawanchors);
        if (!visited[uri] || queued[visited[uri]]) {
            redirects.push(uri);
            return done();
        }
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
    },
    binaryTraversal = (safeMod, linkedtomap) => {
        //  Find endpoints - By definition, end points are accessible from every page
        let somePage = safeMod[Object.keys(safeMod)[0]], 
            endpoints = [], 
            linkCnt = Object.keys(linkedtomap).length - 1,
            fwdlist = [], revlist = [];
    
        for (let iter in somePage.lnk) {
            let link = somePage.lnk[iter];
            if (!linkedtomap[link]) {
                continue;
            }
            if (linkedtomap[link].cnt == linkCnt) {
                if (safeMod[link].lnk.length) {
                    endpoints.push(link);
                } else {
                    //if lnk list is empty, don't even visit it (pretend we've already visited)
                    //safeMod[link].marked = 1;
                    //delete it so that it is no longer in count
                    delete safeMod[link];
                }
            }
        }

        for (let pts in endpoints) {
            if (endpoints[pts] == init) {
                end = endpoints[pts];
            } else {
                start = endpoints[pts];
            }
        }
        if (endpoints.length != 2) { return {binSet: [[],[]], safeMod}; }
        let fwdkey = start, revkey = end,
            fwdnode = safeMod[fwdkey], revnode = safeMod[revkey],
            fwdfail = false, revfail = false;

        while (!fwdnode.marked || !revnode.marked) {
            //If not marked, mark and push both fwdlist and revlist
            if (!fwdnode.marked) {
                fwdnode.marked = 1;
                fwdlist.push(fwdnode.img[0]);
            }
            if (!revnode.marked) {
                revnode.marked = 1;
                revlist.unshift(revnode.img[0]);
            }

            //attempt to navigate to the next key
            //if the key doesn't exist, it has been visited (cannot go to)
            //otherwise navigate to next node and delete the recent node
            for (let i in fwdnode.lnk) {
                fwdkey = fwdnode.lnk[i];
                if (safeMod[fwdkey] && !safeMod[fwdkey].marked) {
                    delete safeMod[fwdnode.key];
                    fwdnode = safeMod[fwdkey];
                    break;
                }
            }
            for (let i in revnode.lnk) {
                revkey = revnode.lnk[i];
                if (safeMod[revkey] && !safeMod[revkey].marked) {
                    delete safeMod[revnode.key];
                    revnode = safeMod[revkey];
                    break;
                }
            }
            //Report a failed node traversal
            if (fwdnode.marked && !fwdfail) {
                console.log("Could not navigate to new node | not circular");
                console.log("Break Detected @", fwdnode.key, "->", fwdkey);
                delete safeMod[fwdnode.key];
                fwdfail = true;
            } 
            if (revnode.marked && !revfail) {
                console.log("Could not navigate to new node | not circular");
                console.log("Break Detected @", revkey, "<-", revnode.key);
                delete safeMod[revnode.key];
                revfail = true;
            }
            //Remove the nodes' entirely
        }
        return {binSet: [fwdlist, revlist], safeMod};
    },
    spreadTraversal = (safeMod) => {
        let section = [], aSafeMod = Object.keys(safeMod),
            fwdkey = aSafeMod[Math.floor(Math.random() * aSafeMod.length)], revkey = fwdkey,
            fwdnode = safeMod[fwdkey], revnode = safeMod[revkey],
            fwdfail = false, revfail = false;

        while (!fwdnode.marked || !revnode.marked) {
            //If not marked, mark and push both fwdlist and revlist
            if (!fwdnode.marked) {
                fwdnode.marked = 1;
                section.push(fwdnode.img[0]);
            }
            if (!revnode.marked) {
                revnode.marked = 1;
                section.unshift(revnode.img[0]);
            }

            //attempt to navigate to the next key
            //if the key doesn't exist, it has been visited (cannot go to)
            //otherwise navigate to next node and delete the recent node
            for (let i in fwdnode.lnk) {
                fwdkey = fwdnode.lnk[i];
                if (safeMod[fwdkey] && !safeMod[fwdkey].marked) {
                    delete safeMod[fwdnode.key];
                    fwdnode = safeMod[fwdkey];
                    break;
                }
            }
            for (let i in revnode.lnk) {
                revkey = revnode.lnk[i];
                if (safeMod[revkey] && !safeMod[revkey].marked && revkey != fwdkey) {
                    delete safeMod[revnode.key];
                    revnode = safeMod[revkey];
                    break;
                }
            }
            //Report a failed node traversal
            if (fwdnode.marked && !fwdfail) {
                console.log("Could not navigate to new node | not circular");
                console.log("Break Detected @", fwdnode.key, "->", fwdkey);
                delete safeMod[fwdnode.key];
                fwdfail = true;
            } 
            if (revnode.marked && !revfail) {
                console.log("Could not navigate to new node | not circular");
                console.log("Break Detected @", revkey, "<-", revnode.key);
                delete safeMod[revnode.key];
                revfail = true;
            }
            //Remove the nodes' entirely
        }

        return {section, safeMod};
    }
;

var init = unorm('https://www.questionablecontent.net/'),//*/unorm('https://www.xkcd.com/'),
    images = {}, 
    visited = { [init]: [] }, 
    queued = { [init]: 1 }, 
    linkmap = {},
    redirects = [],
    ordlist = [];

c.on('drain', function(){
    var linkedtomap = {};
    let linkCnt = -1;
    console.log("Crawl Complete");
    
    for (let page in linkmap) {
        linkmap[page] = {
            img: linkmap[page],
            lnk: [],
            key: page
        };
        let tmpList = [];
        for (let id in linkmap[page].img) {
            let imglist = linkmap[page].img, 
                count = images[imglist[id]].length;
            if (count < (Object.keys(linkmap).length / 2)) {
                //must be in list to trigger this
                //imglist.splice(id, 1);
                //must be on less than half the pages
                tmpList.push(imglist[id]);
            }
        }
        linkmap[page].img = tmpList;
        if (!linkmap[page].img.length) {
            //actually no images in this page so discard and move on
            delete linkmap[page];
            delete linkedtomap[page];
            continue;
        }

        let anchors = visited[page];
        for (let url in anchors) {
            let link = anchors[url];

            if (link[link.length-1] == "/") {
                link = link.slice(0, link.length-1);
            }

            if (linkmap[link]) {
                linkmap[page].lnk.push(link);
                linkedtomap[link] = linkedtomap[link] || {};
                let l2m = linkedtomap[link];
                l2m.cnt = (l2m.cnt) ? l2m.cnt + 1 : 1;
            }
        }
    }
    linkCnt = Object.keys(linkedtomap).length - 1;

    //Traversal: find the first cycle or longest path
    //  Find endpoints - By definition, end points are accessible from every page

    //if (endpoints.length == 2) {
        let {binSet, safeMod} = binaryTraversal(JSON.parse(JSON.stringify(linkmap)), linkedtomap), 
            otherset = [], safeCnt = Object.keys(safeMod).length;

        while(safeCnt) {
            ({section, safeMod} = spreadTraversal(safeMod));
            if (section) { otherset.push(section); }
            safeCnt = Object.keys(safeMod).length;
        }
        ordlist = [].concat(binSet[0], [].concat.apply([], otherset), binSet[1]);
    //}
    
    dump(redirects, "redirects.json");
    dump(visited, "visitedmap.json");
    dump(images, "imgmap.json");
    dump(linkmap, "linkmap.json");
    dump(linkedtomap, "link2map.json");
    dump(ordlist, "imglist.json");
    console.log("Files Dumped");
    console.log("Generated Image list count", ordlist.length);
    console.log("Total pages with images:", linkCnt);
});
c.queue(init);