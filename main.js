class Parser {
  constructor(strings, ...values) {
    this.string = this.concat_string(strings, values);
  }

  concat_string(strings, values) {
    return strings
      .map((string, index) => `${string} ${values[index] || ""}`)
      .reduce((prev, current) => prev + current);
  };

  get template() {
    const template = document.createElement("template");
    template.innerHTML = this.string;
    return template;
  }

  get content() {
    const template = document.createElement("template");
    template.innerHTML = this.string;
    return template.content;
  }
}


export const HTML = (strings, ...values) => {
  return new Parser(strings, ...values);
}
