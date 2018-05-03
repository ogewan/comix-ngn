var temp = {
    parent: null, offset: 0,
    pyr: { appendmismatch: false, appendorder: 0, appendorderdir: false },
    loading: { diameter: 250, lines: 16, rate: 33.333333333333336, xpos: 0.5, ypos: 0.5, back: "#FFF", color: "#373737" },
    config: { dir: "assets/", pagestartnum: false, chapterstartnum: false, imgprebuffer: 5, imgpostbuffer: 5, startpage: 0, back: "#FFF" },
    pages: [], chapters: []
};

var search = function (event, first) {
    var fitem, bitem;
    if (first) {
        var front = document.createElement("div");
        var backk = document.createElement("div");
        front.id = "fworkspace";
        front.style = "display:none;"
        backk.id = "bworkspace";
        backk.style = "display:none;"
        document.body.appendChild(front);
        document.body.appendChild(backk);
        fitem = document.querySelector("#imgholder a");
        bitem = document.querySelector("#navi a")
    } else {
        fitem = document.querySelector("#fworkspace a");
        bitem = document.querySelector("#bworkspace a");
    }

    if (fitem.children.length) {
        temp.pages.push({
            alt: "", hover: "", title: "",
            url: fitem.children[0].src,
            release: 0, note: "", perm: !1, anim8: !1, absolute: false
        });
    }
    if (bitem.children.length) {
        temp.pages.push({
            alt: "", hover: "", title: "",
            url: bitem.children[0].src,
            release: 0, note: "", perm: !1, anim8: !1, absolute: false
        });
    }
    //console.log("workspace calls")
    //console.log(fitem, fitem.href)
    $("#fworkspace").load(fitem.href + " #imgholder", function () {
        //console.log("front workspace")
        search(null);
    });
    //console.log(bitem, bitem.href)
    $("#bworkspace").load(bitem.href + " #imgholder", function () {
        //console.log("back workspace")
        search(null);
    });
}

search(null, 1);