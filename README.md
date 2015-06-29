# comix-ngn
[![Join the chat at https://gitter.im/seun40/comic-ng](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/seun40/comic-ng?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
The Modern Webcomic Framework

**simple**, **standalone**, **small**, **redundant**, **extensible**, **modular**, **powerful**
## Usage
* Simply include the script:

  ```<script src="comixngn.js"></script>```

* And create a Webcomic Stage:

   ```<div id class="venue"></div>```

* To add additional features, use a plug-in.

   ```<script src="bellerophon.cng.min.js"></script>```

* For more fine-grain control, use the following additional attributes:
  * __plugin__ - By default, the last installed plugin will be set as default. To use a specific plug-in as default, simply set the **plugin** attribute in the script tag to the plugin name. Setting it to "default" will use the original framework settings. Setting it as an array, will create plug-in priority. Note, an array must be submitted as a string: "[1,2,3]".

  ```<script src="comixngn.js" plugin="default"></script>```

  * __use__ - Stages will use the currently set defaults for creation and operation. Simply set the **use** attribute in the "venue" element that you want to use specified plug-ins for. Setting it to "default" will use the original framework settings. Setting it as an array, will create plugin priority. Note, an array must be submitted as a string: "[1,2,3]".

  ```<div id class="venue" use="[Infinite, Parallel]"></div>```

  * __script__ - Stages will use the main script.JSON to organize their pages. To use an alternative JSON, perhaps in order to show a completely different set of pages, set the **script** attribute in the "venue" element that you want to use the specified script.

  ```<div id class="venue" script="EarlyDays.JSON"></div>```

  * __config__ - This attribute adds an object that adds additional parameters such as slide duration or transition type, to the stage. The properties in config are specific to the plug-in being used so the same config might not work for different plug-ins, you must check the documentation. This must be submitted as a JSON string.

  ``` html
  <div id class="venue" config='{
    "startSlide": 0,
    "speed": 400,
    "auto": 3000,
    "continuous": true,
  }" ></div>'
  ```

# Design Precepts 
>(For Developers)

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

## Changelog
### comix-ngn version 1.8.3 (beta)
**0.5.0**: Initial Setup, Version tracking

**0.7.58**: Added Dependencies (JS): (jquery.min, angular-touch.min, angular.min[Update],bootstrap.min), Carousel for slides, real-time reactivity

**0.7.7**: Retooled carousel buttons, added page count checker

**0.7.8**: Minor Modifications, page is aligned to center, index.html is cleaned up

**0.8.2**: caruso updated, controls are now hid automatically, date is now formated, appifying the 
stage

**0.9.8**: stage.html template created, index html cleaned up, added isrc(imaginary source) 
attribute to preload images but not implemented yet

**1.0.0**: routing and page updating works???Page loading works, navigate by url and back button work

**1.1.0**: code refactor, all external dependencies removed, new micro lib dependencies are embedded

**1.1.1**: iCanHaz replaced with HTMLparser

**1.2.0**: created machinery for initing stageInjection, created new template: costumes.html, that creates multiple pages for the app, added dir and script specification, added redundancy checks so that the program isn't broken when data fails to load, or there is a conflict.

**1.3.0**: Depreciating HTMLparser b/c it is to unreliable.

**1.4.1**: Reorganize CG structure to allow plugins to simply append rather than replace. Reorganize directory

**1.7.5**: Complete addition of REPO system

**1.7.6**: version info migrated to README, PRECEPT migrated to README

**1.7.7**: added smartAttrib helper function, succesfully imports a wellformed app into page, but its not functioning curently

**1.8.0**: wellformed fuctioning carousel on page, not appified yet, control injection performs correctly, source map added, tracking via rollbar added

**1.8.2**: Routing added, starting preload and url changing, possibly html5pushstate

**1.8.3**: Bellerophon-Embed added, achieves sub 200 ms speed by basically defering everything, manual code minimization, optimizing etc

### comix-ngn Writer version 1.0.0 (beta)
**0.5.0**: "Initial Setup, Versioning

**0.8.0**: Huge implementations, Object config by dynamic form injection for Page and Chapter, Setting config compartmentalized, design config added

**0.9.0**: added pyoofreader configuration, added continue a config file, but its not implemented script wise yet, pyoofreader not fully implemented yet

**0.9.6**: pyoofreader gets its own version, continue config fully implemented, cosmetic changes, now able to download a stage and a template index.html

**1.0.0**: Ready for beta,

### comix-ngn Pyoofreader Version 0.1.0 (beta)
**0.1.0**: Implemented version, counts page dif and warns of Mismatch