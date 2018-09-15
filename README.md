# kelbas

> Minimalistic JavaScript library to create DOM elements.

![gzip size](http://img.badgesize.io/https://unpkg.com/kelbas/build/bundle.js?compression=gzip)

## Features

* Super small less than 1kb
* Includes multiple render possibilites
* Fast
* Super easy to use

## How to use


* Add script tagg to your HTML file.
```HTML
<script src="https://unpkg.com/kelbas"></script>
```

* Start using the library

#### Examples
```js
const click_event = () => {
  window.alert("Click event works!");
}

const element1 = HTML`<span class="example1" onclick="${click_event}"><strong>Click me!</strong></span>
                      <span class="example2">Element2</span>`


document.body.appendChild(element1.fragment);

```

#### Creating an Array of posts with click events
```js
const open_post = () => {
  window.alert("Open!");
}

const array = HTML`<div id="container">
                      ${["post1", "post2", "post3"].map(item => HTML`<span onclick="${click_event}">${item}</span>`.container)}
                   </div>`
                   
                   

document.body.appendChild(array.container);
```



##### Creating SVG-s also possible,

```js

const circle = HTML`<svg height="100" width="100">
                      <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
                    </svg>`;
 
 
document.body.appendChild(circle.svg); 
```

[Check example here!](https://tonis2.github.io/kelbas/)
