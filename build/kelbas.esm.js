const marker=()=>Math.random().toString(36).slice(2).padStart(10,"0");class Parser{constructor(e,...t){this.values_map=[],this.string=this.concat_string(e,t)}concat_string(e,t){return e.map((e,r)=>{const a=t[r],n=marker();switch(!0){case"function"==typeof a:e=e.concat(`" data-${n}="`),this.values_map.push({id:n,value:a});break;case"object"==typeof a||a&&1===a.nodeType:e=`${e} <template data-${n}=""></template>`,this.values_map.push({id:n,value:a});break;case"string"==typeof a:e=`${e}${a||""}`}return e}).reduce((e,t)=>e+t)}get fragment(){const e=document.createElement("template");return e.innerHTML=this.string,this.place_values(e.content.cloneNode(!0))}get container(){let e=(new DOMParser).parseFromString(this.string,"text/html");return this.place_values(e.body.firstChild)}get svg(){let e=new DOMParser;const t=this.container;t.setAttribute("xmlns","http://www.w3.org/2000/svg");let r=e.parseFromString(t.outerHTML,"image/svg+xml");return this.place_values(r.documentElement)}place_values(e){return this.values_map.forEach(t=>{const r=e.parentNode.querySelector(`[data-${t.id}]`)||e.querySelector(`[data-${t.id}]`);if(!r)throw new Error('Warning function must be defined between parentheses for example "${calledFunction}"');if("function"==typeof t.value){const e=/(on)\w+/g.exec(r.outerHTML)[0].split("on")[1];r.addEventListener(e,t.value.bind(this)),r.removeAttribute(`on${e}`),r.removeAttribute(`data-${t.id}`)}else if("object"==typeof t.value)if(t.value.children)r.replaceWith(t.value);else{const e=document.createDocumentFragment();t.value.forEach(t=>e.appendChild(t)),r.replaceWith(e)}}),e}}function HTML(e,...t){return new Parser(e,...t)}window.HTML=HTML;export default HTML;
