# <img src="https://raw.githubusercontent.com/tonis2/kelbas/assets/kelbas.svg"> kelbas

>  Minimalistic JavaScript library to create DOM elements.

![gzip size](http://img.badgesize.io/https://unpkg.com/kelbas/build/kelbas.min.js?compression=gzip)
[![Build Status](https://travis-ci.org/tonis2/kelbas.svg?branch=1.0-release)](https://travis-ci.org/tonis2/kelbas)


## Features

* Small, less than 1KB minified.
* Includes multiple render possibilites.
  (as SVG, Fragment, regular Dom).
* Fast
* Use JSX like syntax without bundling

## How to use 


* Add script tagg to your JS file with modules enabled.
```JS
import {HTML} from "https://unpkg.com/kelbas"

// Or

  npm i -D kelbas

```
After install is complete you can use.

 ```JS 
import {HTML} from "kelbas"
```

### Examples

----

##### Create a document fragment with list of elements
```js
const click_event = () => {
  window.alert("Click event works!");
}

const list = FRAGMENT`<span onclick=${click_event}><strong>Click me!</strong></span>
                      <span>Element2</span>
                      <span>Element3</span>
                      <span>Element4</span>
                      <span>Element5</span>
                      <span>Element6</span>`


document.body.appendChild(list);

```

##### Creating an Array of posts with click events
```js
const open_post = () => {
  window.alert("Open!");
}

const array = HTML`<div id="container">
                      ${["post1", "post2", "post3"].map(item => HTML`<span onclick=${open_post}>${item}</span>`)}
                   </div>`



document.body.appendChild(array);
```

##### Creating SVG-s also possible
```js

const circle = SVG`<svg height="100" width="100">
                      <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
                    </svg>`;


document.body.appendChild(circle);
```

------
