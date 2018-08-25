const UUID = () => {
  let S4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return "p" + (S4() + S4() + "-" + S4());
};

class Parser {
  constructor(strings, ...values) {
    this.values_map = [];
    this.concat_string = this.concat_string.bind(this);
    this.add_event_listeners = this.add_event_listeners.bind(this);
    this.string = this.concat_string(strings, values);
  }

  concat_string(strings, values) {
    return strings
      .map((string, index) => {
        const value = values[index];
        const id = UUID();
        if (typeof value === "function") {
          string = string.concat(`"${id} `);
          this.values_map.push({ id,value });
        }
        if (typeof value === "string") string = `${string}${value || ""}`;
        return string;
      })
      .reduce((prev, current) => prev + current);
  };

  get fragment() {
    const template = document.createElement("template");
    template.innerHTML = this.string;
    return this.add_event_listeners(template.content.cloneNode(true));
  }

  get container() {
    let parser = new DOMParser();
    let doc = parser.parseFromString(this.string, "text/html");
    return this.add_event_listeners(doc.body.firstChild);
  }

  get svg() {
    let parser = new DOMParser();
    const container = this.container;
    container.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    let doc = parser.parseFromString(container.outerHTML, "image/svg+xml");
    return doc.documentElement;
  }

  add_event_listeners(container) {
    this.values_map.forEach(entry => {
      const element = container.outerHTML ? container.parentNode.querySelector(`[${entry.id}]`) : container.querySelector(`[${entry.id}]`);
      const event_type = /(on)\w+/g.exec(element.outerHTML)[0].split("on")[1];
      element.removeAttribute(`on${event_type}`);
      element.addEventListener(event_type, entry.value.bind(this));
    });
    return container;
  }
}

function HTML(strings, ...values) {
  return new Parser(strings, ...values);
}

window.HTML = HTML;

export {HTML};
