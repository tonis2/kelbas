# kelbas

> Minimalistic JavaScript library to create DOM elements.

![gzip size](http://img.badgesize.io/https://unpkg.com/kelbas/build/kelbas.min.js?compression=gzip)

## Features

* Super small less than 1kb
* Includes multiple render possibilites
  (as SVG, fragment, regular Dom).
* Fast
* Super easy to use

## How to use 


* Add script tagg to your HTML file.
```HTML
<script src="https://unpkg.com/kelbas"></script>
```

* Start using the library


[View live examples here!](https://tonis2.github.io/kelbas/)

### Examples

----

##### Create a document fragment with list of elements
```js
const click_event = () => {
  window.alert("Click event works!");
}

const list = HTML`<span onclick="${click_event}"><strong>Click me!</strong></span>
                      <span>Element2</span>
                      <span>Element3</span>
                      <span>Element4</span>
                      <span>Element5</span>
                      <span>Element6</span>`


document.body.appendChild(list.fragment);

```

##### Creating an Array of posts with click events
```js
const open_post = () => {
  window.alert("Open!");
}

const array = HTML`<div id="container">
                      ${["post1", "post2", "post3"].map(item => HTML`<span onclick="${open_post}">${item}</span>`.container)}
                   </div>`



document.body.appendChild(array.container);
```

##### Creating SVG-s also possible
```js

const circle = HTML`<svg height="100" width="100">
                      <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
                    </svg>`;


document.body.appendChild(circle.svg);
```

------
