# ![C](https://raw.githubusercontent.com/ogewan/comix-ngn/nightly/assets/static-c-comixngn.png)omix-ngn
[![JS.ORG](https://img.shields.io/badge/js.org-dns-ffb400.svg?style=flat-square)](http://js.org) [![Join the chat at https://gitter.im/seun40/comic-ng](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/seun40/comic-ng?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Issue Stats](http://www.issuestats.com/github/ogewan/comix-ngn/badge/pr?style=flat)](http://www.issuestats.com/github/ogewan/comix-ngn) [![Issue Stats](http://www.issuestats.com/github/ogewan/comix-ngn/badge/issue?style=flat)](http://www.issuestats.com/github/ogewan/comix-ngn)

**The Modern Webcomic Engine**
## Usage
* Simply include the script:

  ```<script src="comixngn.js"></script>```

* And create a Webcomic Stage:

   ```<div id class="venue"></div>```

* To add additional features, use a plug-in.

   ```<script src="bellerophon.cng.min.js"></script>```

* __[Recommended]__: For fastest load time, copy and paste the contents of **bellerophon.cng.min.embed.html** into your html. While this adds 1.8KB to your HTML file that won't be cached, it will virtually eliminate the app from increasing the load time of your site*.
  * set **defer** = true or !0, to defer the loading of all of the apps scripts so that it is removed from the critical render path. Set it to false or 0, to load immediately __[Not Recommended]__.
  * set **mainsrc** to the version of comix-ngn use want to use: comixngn.js or comixngn.min.js __[Recommended]__. You probably shouldn't change this unless you are debugging.
  * If using Bellerophon Embed, do not add additional plugins via the script tag. Since they load immediately while comixngn.js may be deffered, the plugins will panic and refuse to load. Simply add the plugin path as a string to the **loadcng** array in Bellerophon Embed to include plugins.

  * The **plugin**, **comicID**, **dir**, and **tir** variable functions exactly like the **plugin**, **comicID**, **dir**, and **template** attributes respectively. The **disable** array functions similarly to the **disable attribute**.

* For more fine-grain control, use the following additional attributes:
  * __comicID__ - This sets the Id of the comic which is allows the framework to save site specific settings to user's browsers, such as most recently viewed page. It will default to the website's host name if not given.

  ```<script src="comixngn.js" comixID="comixngn"></script>```

  * __dir__ & __template__ - dir sets the directory of all the scripts, template/tir sets the directory of all html templates. If the scripts or html templates are in the root directory, the attributes can be blank, which is the default. Note: you must include the ending slash in the path.

  * __plugin__ - By default, the last installed plugin will be set as default. To use a specific plug-in as default, simply set the **plugin** attribute in the script tag to the plugin name. Setting it to "default" will use the original framework settings. Setting it as an array, will create plug-in priority. ~~Note, an array must be submitted as a string: "1,2,3"~~. Priority queue is currently unsupported.

  ```<script src="comixngn.js" plugin="default"></script>```

  * __disable__ - This disables comix-ngn's error reporting and tracking functions. An array can be provided, to disable multiple error reporters, but it must be submitted as a string: "1,2,3". Currently, comix-ngn uses RollBar.

  ```<script src="comixngn.js" disable="rollbar"></script>```

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
_*Time to render or DOM Content Loaded_