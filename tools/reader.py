import json
from io import BytesIO   
import pycurl
import bs4 as b
import urllib.request
import os
from urllib.parse import urlparse
import sys

if __name__ == "__main__":
    #chapter template
    chaptr = {
        "description": "",
        "end": 0,
        "start": 0,
        "title": ""
    }
    pagetm = {
        "alt": "",
        "anim8": False,
        "hover": "",
        "note": "",
        "perm": False,
        "release": 0,
        "title": "",
        "url": []
    }
    script = {
        "chapters": [],
        "config": {
            "chapterstartnum": False,
            "dir": "assets/",
            "imgpostbuffer": 5,
            "imgprebuffer": 5,
            "pagestartnum": False,
            "startpage": 0,
            "back":"#FFF",
        },
        "loading": {
            "diameter": 250,
            "lines": 16,
            "rate": 33.333333333333336,
            "xpos": 0.5,
            "ypos": 0.5,
            "back":"#FFF",
            "color":"#373737"
        },
        "offset": 0,
        "pages": [],
        "parent": None,
        "pyr": {
            "appendmismatch": False,
            "appendorder": 0,
            "appendorderdir": False
        }
    }
    directory = script['config']['dir']
    go = 1;
    it = 0;
    #starter url
    urlbase = urlparse('http://xkcd.com/1/')
    urlp = urlbase.scheme+"://"+urlbase.netloc
    urla = urlbase.path
    #print(urlp,urla)
    #init
    if not os.path.exists(directory):
        os.makedirs(directory)
    ir=0
    while(go):
        try:
            if ir % 50 ==0:
                sys.stdout.write("downloading")
            elif ir% 2 == 0:
                sys.stdout.write(".")
                sys.stdout.flush()
            elif ir% 50 == 49:
                sys.stdout.write(str(ir)+" images\n")
            ir+=1
            play=True
            storage = BytesIO()
            #create a curl
            c = pycurl.Curl()
            c.setopt(c.WRITEFUNCTION, storage.write)
            #request HTML
            #print(urlp+urla)
            c.setopt(c.URL, urlp+urla)
            #print(c)
            c.perform()
            c.close()
            #get and parse HTML
            content = storage.getvalue()
            soup = b.BeautifulSoup(content, 'html.parser')
            comic = soup.find(id='comic').contents
            #print(it,urla,comic)
            comic = [x for x in comic if x !='\n'][0]
            #check if it is actually a img
            if(comic.name!='img'):
                try:  
                    comic = comic.contents[0]
                    if(comic.name!="img"):
                        script['pages'].append({ "alt": "", "anim8": False, "hover": "","note": "", "perm": False, "release": 0, "title": "TITLE", "url": [""]})
                        print("WARNING: PAGE",it,"IS NOT FORMATTED")
                        play=False
                except:
                    script['pages'].append({ "alt": "", "anim8": False, "hover": "","note": "", "perm": False, "release": 0, "title": "TITLE", "url": [""]})
                    print("WARNING: PAGE",it,"IS NOT FORMATTED")
                    play=False  
            #store in new page and add page to script
            if(play):
                path, filename = os.path.split(comic['src'])
                script['pages'].append({ "alt": "", "anim8": False, "hover": comic['title'],"note": "", "perm": False, "release": 0, "title": comic['alt'], "url": [filename]})
                path, filename = os.path.split(comic['src'])
                #print(comic['src'], directory+filename)
                urllib.request.urlretrieve("http:"+comic['src'], directory+filename)
            #go next page
            urla = soup.find("a", rel="next")['href']
            #quit
            it+= 1
            if it >= 1548 or urla=="#":
                go = 0
        except:
            print("Unexpected error:", sys.exc_info()[0])
            break
    #finish
    print("\nFin")
    #print(script)
    with open('script_A.json', 'w') as outfile:
        json.dump(script,outfile, sort_keys=True,indent=4, separators=(',', ': '))
