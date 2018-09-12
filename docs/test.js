
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

const array = HTML`<div id="container">
                      ${["data1", "data2", "data3"].map(item => `<span>${item}</span>`).join("")}
                   </div>`

const array2 = HTML`<div id="container">
                      ${["data1", "data2", "data3"].map(item => HTML`<span onclick="${click_event}">${item}</span>`.container)}
                   </div>`


document.body.querySelector("#first-example element").appendChild(fragment.fragment);

document.body.querySelector("#second-example element").appendChild(container.container);

document.body.querySelector("#third-example element").appendChild(circle.svg);

document.body.querySelector("#fourth-example element").appendChild(array.container);

document.body.querySelector("#fifth-example element").appendChild(array2.container);
