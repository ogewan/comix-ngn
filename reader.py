import json
from io import BytesIO
import pycurl
import bs4 as b
import urllib.request
import os
from urllib.parse import urlparse
import sys
import shutil
import requests
import datetime

def getXKCD():
    directory = script['config']['dir']
    go = 1;
    it = 0;#starter url
    urlbase = urlparse('http://xkcd.com/1/')
    urlp = urlbase.scheme + "://" + urlbase.netloc
    urla = urlbase.path# print(urlp, urla)# init
    if not os.path.exists(directory):
        os.makedirs(directory)
    ir = 0
    while (go):
        try:
            if ir % 50 == 0:
                sys.stdout.write("downloading")
            elif ir % 2 == 0:
                sys.stdout.write(".")
                sys.stdout.flush()
            elif ir % 50 == 49:
                sys.stdout.write(str(ir) + " images\n")
            ir += 1
            play = True
            storage = BytesIO()# create a curl
            c = pycurl.Curl()
            c.setopt(c.WRITEFUNCTION, storage.write)# request HTML# print(urlp + urla)
            c.setopt(c.URL, urlp + urla)# print(c)
            c.perform()
            c.close()# get and parse HTML
            content = storage.getvalue()
            soup = b.BeautifulSoup(content, 'html.parser')
            comic = soup.find(id = 'comic').contents# print(it, urla, comic)
            comic = [x for x in comic if x != '\n'][0]# check if it is actually a img
            if (comic.name != 'img'):
                try:
                    comic = comic.contents[0]
                    if (comic.name != "img"):
                        script['pages'].append({
                            "alt": "",
                            "anim8": False,
                            "hover": "",
                            "note": "",
                            "perm": False,
                            "release": 0,
                            "title": "TITLE",
                            "url": [""]
                        })
                        print("WARNING: PAGE", it, "IS NOT FORMATTED")
                        play = False
                except:
                    script['pages'].append({
                        "alt": "",
                        "anim8": False,
                        "hover": "",
                        "note": "",
                        "perm": False,
                        "release": 0,
                        "title": "TITLE",
                        "url": [""]
                        })
                    print("WARNING: PAGE", it, "IS NOT FORMATTED")
                    play = False# store in new page and add page to script
            if (play):
                path, filename = os.path.split(comic['src'])
            script['pages'].append({
                "alt": "",
                "anim8": False,
                "hover": comic['title'],
                "note": "",
                "perm": False,
                "release": 0,
                "title": comic['alt'],
                "url": [filename]
            })
            path, filename = os.path.split(comic['src'])# print(comic['src'], directory + filename)
            urllib.request.urlretrieve("http:" + comic['src'], directory + filename)# go next page
            urla = soup.find("a", rel = "next")['href']# quit
            it += 1
            if it >= 1548 or urla == "#":
                go = 0
        except:
            print("Unexpected error:", sys.exc_info()[0])
            break# finish
    print("\nFin")# print(script)
    with open('script_A.json', 'w') as outfile:
        json.dump(script, outfile, sort_keys = True, indent = 4, separators = (',', ': '))

def getQC():
    directory = script['config']['dir']
    go = 1;
    it = 0;#starter url
    iur = 1;
    ir = 0;
    if not os.path.exists(directory):
        os.makedirs(directory)
    while (go):
        if ir % 50 == 0:
            sys.stdout.write("downloading")
        elif ir % 2 == 0:
            sys.stdout.write(".")
            sys.stdout.flush()
        elif ir % 50 == 49:
            sys.stdout.write(str(ir) + " images\n")
        ir += 1
        getURL = 'http://www.questionablecontent.net/comics/'+str(iur)+'.png'
        fname = str(iur)+'.png'
        script['pages'].append({
            "alt": "",
            "anim8": False,
            "hover": "",
            "note": "",
            "perm": False,
            "release": 0,
            "title": "",
            "url": [fname],
            "special": ""
        })
        #print(getURL,directory + fname)
        #req = urllib.request.Request(getURL, headers={'User-Agent': 'Mozilla/5.0'})
        #urllib.request.urlretrieve(req, directory + fname)
        
        response = requests.get(getURL, stream=True,headers=headers)
        with open(directory + fname, 'wb') as out_file:
            shutil.copyfileobj(response.raw, out_file)
        it += 1
        iur += 1
        if it >= 3001:
            go = 0

    print("\nFin")# print(script)
    with open('script_A.json', 'w') as outfile:
        json.dump(script, outfile, sort_keys = True, indent = 4, separators = (',', ': '))

def getOOTS():
    #directory = script['config']['dir']
    go = 1;
    it = 1;#starter url
    urlbase = urlparse('http://www.giantitp.com/comics/oots0001.html')
    urlp = urlbase.scheme + "://" + urlbase.netloc
    urla = "/comics/oots"+str(it).zfill(4)+".html"
    script['config']['dir'] = urlp
    #print(urlp,urla)
    #if not os.path.exists(directory):
    #    os.makedirs(directory)
    ir = 0
    while (go):
        urla = "/comics/oots"+str(it).zfill(4)+".html"
        if ir % 50 == 0:
            sys.stdout.write("downloading")
        elif ir % 2 == 0:
            sys.stdout.write(".")
            sys.stdout.flush()
        elif ir % 50 == 49:
            sys.stdout.write(str(ir) + " images\n")
        ir += 1
        #play = True
        storage = BytesIO()# create a curl
        c = pycurl.Curl()
        c.setopt(c.WRITEFUNCTION, storage.write)# request HTML# print(urlp + urla)
        c.setopt(c.URL, urlp + urla)# print(c)
        c.perform()
        c.close()# get and parse HTML
        content = storage.getvalue()
        soup = b.BeautifulSoup(content, 'html.parser')
        image = soup.find_all('img')
        #print('\n')
        key = '/comics/images/'
        for x in image:
            if(x['src'].find(key)+1):
                script['pages'].append({
                    "alt": "",
                    "anim8": False,
                    "hover": "",
                    "note": [],
                    "perm": False,
                    "release": 0,
                    "title": "",
                    "url": [x['src']]
                })
                break
        if it >= 994:
            go = 0
        it+=1
    print("\nFin")# print(script)
    with open('script_A.json', 'w') as outfile:
        json.dump(script, outfile, sort_keys = True, indent = 4, separators = (',', ': '))

def getSPIN():
    for g in range(24):
        script['chapters'].append(chaptr)
    go = 1;
    it = 0;
    urlbase = 'http://www.spinnyverse.com/comic/02-09-2010'
    script['config']['dir'] = "http://www.spinnyverse.com/comics/"
    ir = 0
    while (go):
        if ir % 50 == 0:
            sys.stdout.write("downloading")
        elif ir % 2 == 0:
            sys.stdout.write(".")
            sys.stdout.flush()
        elif ir % 50 == 49:
            sys.stdout.write(str(ir) + " images\n")
        ir += 1
        storage = BytesIO()# create a curl
        c = pycurl.Curl()
        c.setopt(c.WRITEFUNCTION, storage.write)
        c.setopt(c.URL, urlbase)
        c.perform()
        c.close()
        content = storage.getvalue()
        soup = b.BeautifulSoup(content, 'html.parser')
        image = soup.find_all('img', id='cc-comic')
        nextt = soup.find_all('a', class_='next')
        getTitle = soup.find('title').contents[0]
        giR = urlparse(image[0]['src']);
        getimg = giR.path.split('/')[2]
        getRD = image[0]['title'].split('-')
        if(len(getRD)<3):
            break
        d1 = datetime.datetime(int(getRD[2]),int(getRD[0]),int(getRD[1]))
        getNote = soup.find('div',style="float:left; width:130px;")
        getNews = soup.find('div',class_="cc-newsarea")
        #print(getNews)
        #print('\n',getTitle,getimg,int(d1.timestamp()))
        script['pages'].append({
            "alt": "",
            "anim8": False,
            "hover": image[0]['title'],
            "note": "[]",#[getNote,getNews],
            "perm": False,
            "release": d1.timestamp(),
            "title": getTitle,
            "url": [getimg],
            "disqus_identifier": "",
            "disqus_url": urlbase
        })
        urlbase = nextt[0]['href'];
        if it >= 575 or urlbase=="" or urlbase==None:
            go = 0
        it+=1
    print("\nFin")
    #print(script)
    with open('script_A.json', 'w') as outfile:
        json.dump(script, outfile, sort_keys = True, indent = 4, separators = (',', ': '))

def category():
    with open('script_A.json', 'r') as infile:
        text = json.load(infile)
        text=text['pages']
        while(1):
            b=1
            #query = int(input("enter release date\n"))
            query = input("enter hover\n")
            for y in range(len(text)):
                if text[y]['hover'] == query:
                    print(y)
                    b=0
                    break
            if b:
                print("not found")
if __name__ == "__main__": #chapter template
    chaptr = {
        "description": "",
        "end": 0,
        "start": 0,
        "title": "",
        "thumb": ""
    }
    pagetm = {
        "alt": "",
        "anim8": False,
        "hover": "",
        "note": [],
        "perm": False,
        "release": 0,
        "title": "",
        "url": [],
        "special": ""
    }
    script = {
        "chapters": [],
        "config": {
            "chapterstartnum": False,
            "dir": "oots_assets/",
            "imgpostbuffer": 5,
            "imgprebuffer": 5,
            "pagestartnum": True,
            "startpage": 0,
            "back": "#FFF",
        },
        "loading": {
            "diameter": 250,
            "lines": 16,
            "rate": 33.333333333333336,
            "xpos": 0.5,
            "ypos": 0.5,
            "back": "#FFF",
            "color": "#373737"
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
    headers = {'user-agent': 'Mozilla/5.0'}
    #getXKCD()
    #getQC()
    #getOOTS()
    #getSPIN()
    category()
