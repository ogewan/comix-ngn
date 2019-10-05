# ![C](https://raw.githubusercontent.com/ogewan/comix-ngn/master/assets/static-c-comixngn.png)omix-ngn
![](https://img.shields.io/github/release/ogewan/comix-ngn.svg) [![JS.ORG](https://img.shields.io/badge/js.org-dns-ffb400.svg?style=flat-square)](http://js.org) <!--[![Join the chat at https://gitter.im/seun40/comic-ng](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ogewan/comix-ngn?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Issue Stats](http://www.issuestats.com/github/ogewan/comix-ngn/badge/pr?style=flat)](http://www.issuestats.com/github/ogewan/comix-ngn) [![Issue Stats](http://www.issuestats.com/github/ogewan/comix-ngn/badge/issue?style=flat)](http://www.issuestats.com/github/ogewan/comix-ngn)--> ![](https://img.shields.io/github/downloads/ogewan/comix-ngn/latest/total.svg)

**The Modern Webcomic Engine**
## Usage
* Simply include the script, **[Core]**:

  ```<script src="comixngn.js"></script>```

* And create a Webcomic **[Stage]**:

   ```<div id="cng" class="venue"></div>```, *Adding the class* **venue** *turns any element into a stage*

* To control the Stage. add a **[Controller]**:

   ```<div cglink="cng"><button class="prev"></button><button class="next"></button></div>```, *Adding the attribute* **cglink** *turns any element into a controller. Note: cglink binds the controller to a* **[stage]**

* To update any element dynamically, add the **cg-hot** class. This updates the element and its children every time the page changes.

* To add additional features, use a plug-in:

   ```<script src="bellerophon.cng.min.js"></script>```

* __[Recommended]__: For fastest load time, copy and paste the contents of **bellerophon.cng.min.embed.html** into your html. While this adds 1.8KB to your HTML file that won't be cached, it will virtually eliminate the app from increasing the load time of your site*.
  * set **defer** = true or !0, to defer the loading of all of the apps scripts so that it is removed from the critical render path. Set it to false or 0, to load immediately __[Not Recommended]__.
  * set **mainsrc** to the version of comix-ngn use want to use: comixngn.js or comixngn.min.js __[Recommended]__. You probably shouldn't change this unless you are debugging.
  * If using Bellerophon Embed, do not add additional plugins via the script tag. Since they load immediately while comixngn.js may be deffered, the plugins will panic and refuse to load. Simply add the plugin path as a string to the **loadcng** array in Bellerophon Embed to include plugins.

  * The **plugin**, **comicID**, **dir**, **tir**, and **air** variable functions exactly like the **plugin**, **comicID**, **dir**, **tir**, and **air** attributes respectively. The **disable** array functions similarly to the **disable attribute**.

### Script
If the Stage is the Body, and the Core is the Mind, then Scripts are the Soul. The Script is a JSON file that sets up the configuration options and adds images for each page. [This is how to do it.](https://github.com/ogewan/comix-ngn/wiki/How-to-Script)
#### Additive 
:new: an additive is a simplified JSON file that expedites the addition of comic pages.
The following is the structure: 
``` js
  {"p":[
    imageurl 1, imageurl 2, imageurl 3, etc...
  ]}
  ```
To enable the additive feature:
Add the **additive** attribute to selected venue

or

Add an address to the additive option in the config section of the Script.JSON
### Attributes
For more fine-grain control, use the following additional attributes or class properties:
* __SPECIAL__ - These classes change the properties of whatever they are set on.
  * __cgdate__ - This sets the elements [innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) or inner text to the release date of Stage page.
  * __cgtitle__ - This sets the elements [innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) or inner text to the title of Stage page.
* __CORE__ - These attributes customizes settings and performance of comix-ngn.
  * __fBox__ - fBox functions as a sort of fusebox that globally toggles many options:
(*Note: fBox requires the following format "{'option': true/false}"*)

   ```<script src="comixngn.js" fBox="{'fstrun':true}"></script>```

     * __fstrun__ (bool): toggles stageInjection on page load
     * __pgepsh__ (bool): toggles url change on slide change
     * __pgesve__ (bool): toggles slide number saving in localStorage
     * __protect__ (bool): by default, the comix(main comic) is set once, if protect is set to default, the comix is overwritten per stageInjection
     * __noverwrite__ (bool): by default, stageInjection cannot overwrite already inserted comics, set to false to allow overwriting
     * __arrow__ (bool): toggles arrow key navigation 

  * __comicID__ - This sets the ID of the comic which is allows the framework to save site specific settings to user's browsers, such as most recently viewed page. It will default to the website's host name if not given.

  ```<script src="comixngn.js" comixID="comixngn"></script>```

  * __dir__ , __tir__ & __air__ - dir sets the directory of all the scripts, tir sets the directory of all html templates, and air overrides the asset directory listed in script.json. If the scripts or html templates are in the root directory, the attributes can be blank, which is the default. If air is left blank it will default to the directory present in the script.json. Note: you must include the ending slash in the path.

  * __plugin__ - By default, the last installed plugin will be set as default. To use a specific plug-in as default, simply set the **plugin** attribute in the script tag to the plugin name. Setting it to "default" will use the original framework settings. Setting it as an array, will create plug-in priority. ~~Note, an array must be submitted as a string: "1,2,3"~~. Priority queue is currently unsupported.

  ```<script src="comixngn.js" plugin="default"></script>```

  * __disable__ - This disables comix-ngn's error reporting and tracking functions. An array can be provided, to disable multiple error reporters, but it must be submitted as a string: "1,2,3". Currently, comix-ngn uses RollBar.

  ```<script src="comixngn.js" disable="rollbar"></script>```
* __STAGE__ - These attributes customizes and changes the functionality of a Webcomic Stage
  * __id__ - __[OPTIONAL]__ This sets the id that refers to the HTML element containing the Stage. Although it is optional, it is __[RECOMMENDED]__ to set because it is __[REQUIRED]__ to link a control element to.
  * __use__ - Stages will use the currently set defaults for creation and operation. Simply set the **use** attribute in the "venue" element that you want to use specified plug-ins for. Setting it to "default" will use the original framework settings. Setting it as an array, will create plugin priority. Note, an array must be submitted as a string: "[1,2,3]".

  ```<div id class="venue" use="[Infinite, Parallel]"></div>```

  * __script__ - Stages will use the main script.JSON to organize their pages. To use an alternative JSON, perhaps in order to show a completely different set of pages, set the **script** attribute in the "venue" element that you want to use the specified script.

  ```<div id class="venue" script="EarlyDays.JSON"></div>```

  * __config__ - This attribute adds an object that adds additional parameters such as slide duration or transition type, to the stage. The properties in config are specific to the plug-in being used so the same config might not work for different plug-ins, you must check the documentation. This must be submitted as a JSON string.

  ``` html
  <div id class="venue" config="{
    "startSlide": 0,
    "speed": 400,
    "auto": 3000,
    "continuous": true,
  }" ></div>
  ```
* __CONTROLLER__ - This customizes a controller element.
  * __cglink__ - This designates an element as a controller. Its value must be the ID of the stage it controls.
  * __nohide__ - By default, certain buttons will be hidden automatically on certain conditions. To disable this functionality, add this attribute. The value that this attribute is set to will become a class that is added to the element on those conditions.

_*Time to render or DOM Content Loaded_
