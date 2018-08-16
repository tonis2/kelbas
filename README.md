# kelbas

> Minimalistic JavaScript library to create DOM elements.


## Features

* Super small only 1kb
* Includes multiple render possibilites
* Fast
* Super easy to use

## How to use


* Add script tagg to your HTML file.
```HTML
<script src="https://unpkg.com/kelbas"></script>
```

* Start using the library
```js
const element =  HTML`<span onclick="${myFunction}">text</span>
                        <span>text</span>`;
document.body.appendChild(element.content);                        
```
