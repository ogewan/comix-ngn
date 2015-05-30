import json
import glob

if __name__ == "__main__":
    with open('config.json') as json_data:
        config = json.load(json_data)
        
    page_count = len(config[u'pages'])
    actual_pages = len(glob.glob(config[u'config'][u'dir'] + "/*"))
    print page_count
    print actual_pages
    if page_count!=actual_pages:
        #Page Mismatch
        print "Page Mismatch"
