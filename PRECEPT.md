# Design Precepts

comix-ngn is
- **simple**
  - To use the framework requires no more than two lines: 
``` html
1: <script src="comixngn.js"></script>/*Imports the framework*/
2: <div id class="venue" use script></div>/*Creates a Webcomic stage*/
```
- **standalone**
  - The framework has no **external dependencies**, this saves function calls and increases robustness.
- **small**
  - Maximum JS size should be no more than 50 KB with comments.
  - Maximum Min JS size expected to be no more than 30 KB.
  - Current Size Numbers: 27 KB raw, 20 KB min, 14 KB min + gzip
- **redundant**
  - comixngn has multiple fall-backs so that as long as the main file and script json file is loaded, it will work.
- **extensible**
  - Plug-ins add functionality and customization to the framework.
  - An example plug-in:

```<script src="bellerophon.cng.min.js" dir template></script>```
- **modular**
  - Each function is a part of the main script object.
- **powerful**
  - comixngn can easily handle multiple stages.

## 
## Definitions
**actor** - Refers to a Webcomic slide. By default this is expected to be an image, but it can be practically anything.

**stage** - Refers to a Webcomic. Its style will depend on the plug-in.

**venue** - This class marks an element as a place for a stage to be imported. These are preferably divs. If the element does not have an id, it is given one automatically.