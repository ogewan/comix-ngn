# comix-ngn
[![Join the chat at https://gitter.im/seun40/comic-ng](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/seun40/comic-ng?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
Modern Webcomic Framework
# HTMLparser
Turns an HTML string into an analogous JS Object
## Usage
To get HTML as an Object
``` js
foo = HTML2Obj(string);
```
To turn the object into a DOM element
``` js
bar = Obj2HTML(foo);
```
**Note**: Obj2HTML takes an additional argument of a DOM element. It will append to this element.
``` js
//appends foo to document.body
bar = Obj2HTML(foo,document.body);
```