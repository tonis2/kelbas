
const click_event = () => {
  window.alert("Click event works!");
}

const fragment = HTML`<span onclick="${click_event}"><strong>Click me!</strong></span>
                  <span>Test</span>
                  <span>Test</span>`;


const container = HTML`<section onclick="${click_event}" id="container">
                        <span>Contained</span>
                       </section>`;

document.body.appendChild(fragment.fragment);

document.body.appendChild(container.container);
