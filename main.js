export const UUID = () => {
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

  get content() {
    const template = document.createElement("template");
    template.innerHTML = this.string;
    const container = this.add_event_listeners(template.content.cloneNode(true));
    return container;
  }

  get parsed() {
    let parser = new DOMParser();
    let doc = parser.parseFromString(this.string, "text/html");
    return doc.body.firstChild;
  }

  add_event_listeners(container) {
    this.values_map.forEach(entry => {
      const element = container.querySelector(`[${entry.id}]`);
      const event_type = /(on)\w+/g.exec(element.outerHTML)[0].split("on")[1];
      element.removeAttribute(`on${event_type}`);
      element.addEventListener(event_type, entry.value.bind(this));
    });
    return container;
  }
}

export const HTML = (strings, ...values) => {
  return new Parser(strings, ...values);
}
