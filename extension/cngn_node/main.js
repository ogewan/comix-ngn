/**
 * @module cngn_node
 * Creates a script for a given webcomic via webcrawling. 
 */
var request = require('request'),
    url = require('url'),
    base = 'https://www.xkcd.com/',
    linkdct = {
        [base]: true
    },
    queue = [base],
    active,
    imgdct = {},
    getback = function() {
        if (queue.length) {
            active = queue.pop();
            request(active, function(err, response, body) {
                if (err) throw err;
                var resultlist = parseHTML(body);
                return getback();
            });
        }
        return imgdct;
    },
    parseHTML = function(str) {
        var result, arr = str.split(/<|>/g);
        result = arr.filter(function(ele) {
            var nde = ele.split(" ")[0];
            return nde == "a" || nde == "img";
        });
        result = result.map(function(ele) {
            var nde = ele.split(" "),
                obj = {},
                tmp;
            for (var i = 0; i < nde.length; i++) {
                if (!i) {
                    obj.type = nde[0];
                } else {
                    tmp = nde[i].split("=");
                    if (tmp[0] == "href") {
                        tmp[1] = tmp[1].replace(/"/g, "");
                        if (tmp[1].indexOf(base) + 1 || 1) {
                            if (!linkdct[tmp[1]]) {
                                linkdct[tmp[1]] = true;
                                queue.push(tmp[1]);
                            }
                        }
                    } else if (tmp[0] == "src") {
                        tmp[1] = tmp[1].replace('"', "");
                        imgdct[tmp[1]] = imgdct[tmp[1]] + 1 || 1;
                    }
                }
            }
            return obj;
        });
        return result;
    };

//get('https://www.xkcd.com/').asString(function(err, data) {
getback();