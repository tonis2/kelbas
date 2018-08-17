const click_event = () => {
  window.alert("Click event works!");
}

const list = window.HTML`<span onclick="${click_event}"><strong>Click me!</strong></span>
                  <span>Test</span>
                  <span>Test</span>`;

document.body.appendChild(list.fragment);
