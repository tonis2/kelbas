// Create ID-s
const UUID = () => {
  let S4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return "p" + (S4() + S4() + "-" + S4())
}

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
        const id = UUID()
        // This means that the value is a event listener type of function
        if (typeof value === "function") {
          // Concat id after the on-* event type so we can add the listener there later
          string = string.concat(`"${id} `)
          this.values_map.push({
            id,
            value
          })
        }
        // This means that the value is a Array
        if (typeof value === "object") {
          // Put an id for the container of the Array, so we can append the value there later
          string = string.replace(">", ` ${id} >`)
          this.values_map.push({
            id,
            value
          })
        }
        if (typeof value === "string") string = `${string}${value || ""}`
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
    let parser = new DOMParser()
    let doc = parser.parseFromString(this.string, "text/html")
    return this.place_values(doc.body.firstChild)
  }

  // Returns SVG element
  get svg() {
    let parser = new DOMParser()
    const container = this.container
    container.setAttribute("xmlns", "http://www.w3.org/2000/svg")
    let doc = parser.parseFromString(container.outerHTML, "image/svg+xml") 
    return this.place_values(doc.documentElement)
  }

  //Adds event listeners and appends dom elements if neccesary
  place_values(container) {
    this.values_map.forEach(entry => {
      // Get the container of the value, we need to make a difference between document.fragment element and regular dom node,
      // if container has no outherHTML that means it`s a fragment.
      const element = container.outerHTML ? container.parentNode.querySelector(`[${entry.id}]`) : container.querySelector(`[${entry.id}]`)
      if (typeof entry.value == "function") {
        // Find onclick, onmouseover .. etc strings values so we can add event listeners to them.
        const event_type = /(on)\w+/g.exec(element.outerHTML)[0].split("on")[1]
        // Add the event listener to the element
        element.addEventListener(event_type, entry.value.bind(this))
        // Remove the on- event, required if we have multiple events on same element
        element.removeAttribute(`on${event_type}`)
      } else if (typeof entry.value == "object") {
        // Append array of element to the container, useful when displaying a list of elements inside container
        entry.value.forEach(item => element.appendChild(item))
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

export { HTML }
