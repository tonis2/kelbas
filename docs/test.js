
const click_event = () => {
  window.alert("Click event works!");
}

const fragment = HTML`<span class="example1" onclick="${click_event}"><strong>Click me!</strong></span>
                      <span class="example2">Element2</span>
                      <span class="example3">Element3</span>`;


const container = HTML`<section onclick="${click_event}" id="container">
                          <span>element1</span>
                          <span>element2</span>
                          <p>Text example</p>
                       </section>`;

const circle = HTML`<svg height="100" width="100">
                      <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
                    </svg>`;


document.body.querySelector("#first-example element").appendChild(fragment.fragment);

document.body.querySelector("#second-example element").appendChild(container.container);

document.body.querySelector("#third-example element").appendChild(circle.svg);
