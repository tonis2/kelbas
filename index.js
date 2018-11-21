// Create ID-s
const marker = () => {
  return Math.random()
    .toString(36)
    .slice(2)
    .padStart(10, "0")
}

String.prototype.html = function() {
  let parser = new DOMParser();
  let doc = parser.parseFromString(this, "text/html");
  return doc.body.firstChild;
};

String.prototype.svg = function() {
  let parser = new DOMParser();
  let doc = parser.parseFromString(this, "image/svg+xml");
  return doc.documentElement;
};

class Parser {
  constructor(strings, ...values) {
    this.values_map = []
    this.string = this.concat_string(strings, values)
  }

  //Makes a big string from template literals strings and values, also adds ID-s and pushes {id, value} object to values_map,
  // so we can put values to correct places in dom element.
  concat_string(strings, values) {
    return strings
      .map((string, index) => {
        const value = values[index]
        const id = marker()
        switch (true) {
          case typeof value === "function":
            string = string.concat(`" data-${id}="`)
            this.values_map.push({
              id,
              value
            })
            break
          case typeof value === "object" || (value && value.nodeType === 1):
            //Add placeholder for the list item
            string = `${string} <template data-${id}=""></template>`
            this.values_map.push({
              id,
              value
            })
            break
          case typeof value === "string":
            string = `${string}${value || ""}`
            break
        }
        return string
      })
      .reduce((prev, current) => prev + current)
  }

  //Returns document fragment element, doesent require wrapper
  get fragment() {
    const template = document.createElement("template")
    template.innerHTML = this.string
    return this.place_values(template.content.cloneNode(true))
  }

  //Returns regular dom element, but requires element to have a wrapper node
  get container() {
    return this.place_values(this.string.html())
  }

  // Returns SVG element
  get svg() {
    const container = this.container
    container.setAttribute("xmlns", "http://www.w3.org/2000/svg")
    return this.place_values(container.outerHTML.svg())
  }

  //Adds event listeners and appends dom elements if neccesary
  place_values(container) {
    this.values_map.forEach(entry => {
      // Get the container of the value, we need to make a difference between document.fragment element and regular dom node,
      // if container has no outherHTML that means it`s a fragment.
      const element = container.outerHTML ? container.parentNode.querySelector(`[data-${entry.id}]`) : container.querySelector(`[data-${entry.id}]`)
      if (!element) throw new Error('Warning function must be defined between parentheses for example "${calledFunction}"')
      if (typeof entry.value == "function") {
        // Find onclick, onmouseover .. etc strings values so we can add event listeners to them.
        const event_type = /(on)\w+/g.exec(element.outerHTML)[0].split("on")[1]
        // Add the event listener to the element
        element.addEventListener(event_type, entry.value.bind(this))
        // Remove the on- event, required if we have multiple events on same element
        element.removeAttribute(`on${event_type}`)
        element.removeAttribute(`data-${entry.id}`)
      } else if (typeof entry.value == "object") {
        // Swap template placeholder with list object
        if (!entry.value.children) {
          const fragment = document.createDocumentFragment()
          entry.value.forEach(child => fragment.appendChild(child))
          element.replaceWith(fragment)
        } else {
          element.replaceWith(entry.value)
        }
      }
    })
    // returns the container back with values added.
    return container
  }
}

function HTML(strings, ...values) {
  return new Parser(strings, ...values)
}

window.HTML = HTML
export default HTML
