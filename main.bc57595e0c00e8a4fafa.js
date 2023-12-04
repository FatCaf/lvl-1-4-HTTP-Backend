(()=>{"use strict";var e,t,n,r,o={370:(e,t,n)=>{n.a(e,(async(e,t)=>{try{var r=n(147),o=n(787),a=n(624),c=n(20);async function i(){const e=Math.random().toString(36).substring(2),t=(new TextEncoder).encode(e),n=await crypto.subtle.digest("SHA-256",t),r=Array.from(new Uint8Array(n)).map((e=>e.toString(16).padStart(2,"0"))).join("");return(r[0].match(/[a-fA-F]/)?r[0]:"a")+r.substring(0,4)}let s=0;async function u(e){if(s>=e.length)return;const t=await i(),n=(0,o.Pu)(e[s]),l=(0,o.Gr)(e[s]),d=(0,o.G_)(e[s]),p=await(0,a.Z)("GET",l);var _;(0,r.K)(d,t),(0,r.$I)(n,t),(0,r.Z6)(p,n,t),(0,c.Z)(t,n,l),await(_=1e3,new Promise((e=>{setTimeout(e,_)}))),s+=1,await u(e)}await u(o.rH),t()}catch(l){t(l)}}),1)},20:(e,t,n)=>{n.d(t,{Z:()=>p});var r=n(624),o=n(147);function a(e){const t=document.querySelector(`.${e}__new__user`),n=t.querySelectorAll("td input, td select"),r={};return n.forEach((e=>{const n=e.classList.value,o=t.querySelector(`.${n}`);if("date"===o.getAttribute("type")){const e=new Date(o.value);r[n]=e.toISOString()}else"number"===o.getAttribute("type")?r[n]=parseInt(o.value,10):r[n]=o.value})),Object.keys(r).length<n.length?null:JSON.stringify(r)}function c(e){const t=[...e.options],n=document.createElement("select");return n.classList.add(e.name),t.forEach((e=>{n.insertAdjacentHTML("afterbegin",`<option>${e}</option>`)})),n}function i(e,t){e.forEach((e=>{if(Object.prototype.hasOwnProperty.call(e,"input"))if(Array.isArray(e.input)){const n=e.input.map((e=>"select"===e.type&&Array.isArray(e.options)?c(e).outerHTML:`${e.label} <input class="${e.name}" type="${e.type}" ${e.required?"required":""}/> `)).join("");t.insertAdjacentHTML("beforeend",`\n                  <td>${n}</td>`)}else"select"===e.type&&Array.isArray(e.options)?t.insertAdjacentHTML("beforeend",`<td>${c(e)}</td>`):t.insertAdjacentHTML("beforeend",`\n            <td>${e.title?e.title:e.input.label}<input class="${e.input.name?e.input.name:e.value}" type="${e.input.type}" ${e.input.required?"required":""}/></td>`)}))}function s(e,t,n){document.querySelector(`.${e}__table__body`).insertAdjacentHTML("afterbegin",`<tr class="${e}__new__user">\n  </tr>`);const c=document.querySelector(`.${e}__new__user`);i(t,c),c.insertAdjacentHTML("beforeend",`<td class="${e}options options"><button class="${e}add add">Add</button>\n  <button class="${e}cancel cancel">Cancel</button></td>\n  `);document.querySelector(`.${e}cancel`).addEventListener("click",(()=>{c.remove()}));document.querySelector(`.${e}add`).addEventListener("click",(()=>async function(e,t,n){const c=a(e);try{await fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:c});const a=await(0,r.Z)("GET",n);(0,o.Z6)(a,t,e)}catch(e){throw new Error(e.message)}}(e,t,n)))}function u(e,t,n){[...document.querySelectorAll(`.${e}__delete__button`)].forEach((a=>{a.addEventListener("click",(()=>{!async function(e,t,n,a){await fetch(e,{method:"DELETE",headers:{"Content-Type":"application/json"}}).then((async e=>{if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`);const c=await(0,r.Z)("GET",a);(0,o.Z6)(c,n,t)})).catch((e=>{throw new Error(e.message)}))}(`${n}/${a.getAttribute("data-id")}`,e,t,n)}))}))}function l(e,t,n,c,s){const[...u]=document.querySelectorAll(`.${n}__table__body__row`);u.forEach((t=>{t.id===e&&t.insertAdjacentHTML("afterend",`<tr class="${n}__new__user"></tr>`)}));const l=document.querySelector(`.${n}__new__user`);i(c,l),async function(e){const t=await(0,r.Z)("GET",e);document.querySelectorAll("td input, td select").forEach((e=>{const n=e.className;if(n&&Object.prototype.hasOwnProperty.call(t,n))if("date"===e.type){const r=new Date(t[n]).toISOString().split("T")[0];e.value=r}else e.value=t[n]}))}(t),l.insertAdjacentHTML("beforeend",`<td class="${n}options options"><button class="${n}confirm confirm">Confirm</button>\n  <button class="${n}cancel cancel">Cancel</button></td>\n  `);document.querySelector(`.${n}cancel`).addEventListener("click",(()=>{l.remove()}));document.querySelector(`.${n}confirm`).addEventListener("click",(()=>async function(e,t,n,c){const i=a(t);try{await fetch(e,{method:"PUT",headers:{"Content-Type":"application/json"},body:i});const a=await(0,r.Z)("GET",c);(0,o.Z6)(a,n,t)}catch(e){throw new Error(e.message)}}(t,n,c,s)))}function d(e){document.querySelector(`.${e}__find__button`).addEventListener("click",(()=>function(e){const t=document.querySelector(`.${e}__find__user`).value;if(t){const[...n]=document.querySelectorAll(`.${e}td`);let r=!1;n.forEach((e=>{e.textContent.toLowerCase().includes(t.toLowerCase())&&(r||(e.scrollIntoView({behavior:"smooth",block:"center"}),r=!0),e.classList.add("highlighted"),setTimeout((()=>{e.classList.remove("highlighted")}),1e4))}))}}(e)))}function p(e,t,n){document.querySelector(`.${e}__table`).insertAdjacentHTML("beforebegin",`\n  <div class="action__panel">\n          <input class="${e}__find__user find" type="text" name="find" />\n          <button class="${e}__find__button find__btn">Find</button>\n          <button class="${e}__add__button add__btn">Add</button>\n        </div>`),function(e,t,n){document.querySelector(`.${e}__add__button`).addEventListener("click",(()=>s(e,t,n)))}(e,t,n),d(e),u(e,t,n),function(e,t,n){[...document.querySelectorAll(`.${e}__edit__button`)].forEach((r=>{r.addEventListener("click",(()=>{const o=r.getAttribute("data-id");l(o,`${n}/${o}`,e,t,n)}))}))}(e,t,n)}},624:(e,t,n)=>{async function r(e,t){try{const e=await fetch(t),n=await e.json();let r={};for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&(r=n[e]);return r}catch(e){throw new Error(e.message)}}n.d(t,{Z:()=>r})},147:(e,t,n)=>{function r(e,t,n){const r=document.querySelector(`.${n}__table__body`);r.innerHTML="";for(const o in e)if(Object.prototype.hasOwnProperty.call(e,o)){r.insertAdjacentHTML("beforeend",`\n          <tr class="${n}__table__body__row" id="${o}"></tr>\n          `);const a=document.querySelector(`.${n}__table__body__row:last-child`);t.forEach((t=>{"function"==typeof t.value?a.insertAdjacentHTML("beforeend",`\n          <td class="${n}td">${t.value(e[o])}</td>`):a.insertAdjacentHTML("beforeend",`\n                <td class="${n}td">${e[o][t.value]}</td>`)})),a.insertAdjacentHTML("beforeend",`<td class="${n}options options"><button class="${n}__delete__button del__btn"\n      data-id="${o}">Delete</button>\n      <button class="${n}__edit__button edt__btn" data-id="${o}">Edit</button>\n      </td>`)}}function o(e,t){document.querySelector(`.${t}__table__header`).insertAdjacentHTML("beforeend",`<tr class="${t}__table__header__row">\n      </tr>`);const n=document.querySelector(`.${t}__table__header__row`);e.forEach((e=>{"function"==typeof e.value?n.insertAdjacentHTML("beforeend",`\n              <th class="function">${e.title}</th>`):n.insertAdjacentHTML("beforeend",`\n              <th class="${e.value}">${e.title}</th>`)})),n.insertAdjacentHTML("beforeend",'<th class="actions">Дії</th>')}function a(e,t){const n=document.createElement("table");document.querySelector(e).insertAdjacentElement("afterbegin",n),n.classList.add(`${t}__table`),n.insertAdjacentHTML("afterbegin",`\n        <thead class="${t}__table__header">\n        </thead>\n        <tbody class="${t}__table__body"></tbody>`)}n.d(t,{$I:()=>o,K:()=>a,Z6:()=>r})},787:(e,t,n)=>{n.d(t,{rH:()=>a,Pu:()=>s,G_:()=>i,Gr:()=>u});const r={renderImage:e=>`<img src="${e.avatar}" alt="${e.name} ${e.surname}"/>`,renderColor:e=>`<div style="background-color: ${e.color}; width: 90%;\n     height: 90%;\n     position: absolute;\n     left:5%;\n     top:5%;\n     right:5%;\n     bottom:0;"></div>`,renderDate:e=>{return t=e.birthday,new Date(t).toISOString().split("T")[0];var t},renderPrice:e=>`${e.price} ${e.currency}`},o=JSON.parse('[{"parent":"#usersTable","columns":[{"title":"Ім’я","value":"name","input":{"type":"text","required":true}},{"title":"Прізвище","value":"surname","input":{"type":"text","required":true}},{"title":"Аватар","value":"renderImage","input":{"type":"url","name":"avatar","required":true}},{"title":"Дата Народження","value":"renderDate","input":{"type":"date","name":"birthday","required":true}}],"apiUrl":"https://mock-api.shpp.me/mneklesa/users"},{"parent":"#productsTable","columns":[{"title":"Назва","value":"title","input":{"type":"text","required":true}},{"title":"Ціна","value":"renderPrice","input":[{"type":"number","name":"price","label":"Ціна","required":true},{"type":"select","name":"currency","label":"Валюта","options":["៛","฿","₹","лв","руб","$","ман","Lek","₨","₡","﷼","kr","CHF","Bs","£","C$","₺","Q","Дин.","P","kn","Kč","Ft","Ls","₭","S","Nu"],"required":false}]},{"title":"Колір","value":"renderColor","input":{"type":"color","name":"color","required":true}}],"apiUrl":"https://mock-api.shpp.me/mneklesa/products"}]');const a=((c=o).forEach((e=>{e&&e.columns&&e.columns.forEach((e=>{if("string"==typeof e.value&&e.value.startsWith("render")){const t=e.value,n=r[t];"function"==typeof n?e.value=n:alert(`Function ${t} not found.`)}}))})),c);var c;function i(e){return Object.prototype.hasOwnProperty.call(e,"parent")?e.parent:null}function s(e){return Object.prototype.hasOwnProperty.call(e,"columns")?e.columns:null}function u(e){return Object.prototype.hasOwnProperty.call(e,"apiUrl")?e.apiUrl:null}}},a={};function c(e){var t=a[e];if(void 0!==t)return t.exports;var n=a[e]={exports:{}};return o[e](n,n.exports,c),n.exports}e="function"==typeof Symbol?Symbol("webpack queues"):"__webpack_queues__",t="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",n="function"==typeof Symbol?Symbol("webpack error"):"__webpack_error__",r=e=>{e&&e.d<1&&(e.d=1,e.forEach((e=>e.r--)),e.forEach((e=>e.r--?e.r++:e())))},c.a=(o,a,c)=>{var i;c&&((i=[]).d=-1);var s,u,l,d=new Set,p=o.exports,_=new Promise(((e,t)=>{l=t,u=e}));_[t]=p,_[e]=e=>(i&&e(i),d.forEach(e),_.catch((e=>{}))),o.exports=_,a((o=>{var a;s=(o=>o.map((o=>{if(null!==o&&"object"==typeof o){if(o[e])return o;if(o.then){var a=[];a.d=0,o.then((e=>{c[t]=e,r(a)}),(e=>{c[n]=e,r(a)}));var c={};return c[e]=e=>e(a),c}}var i={};return i[e]=e=>{},i[t]=o,i})))(o);var c=()=>s.map((e=>{if(e[n])throw e[n];return e[t]})),u=new Promise((t=>{(a=()=>t(c)).r=0;var n=e=>e!==i&&!d.has(e)&&(d.add(e),e&&!e.d&&(a.r++,e.push(a)));s.map((t=>t[e](n)))}));return a.r?u:c()}),(e=>(e?l(_[n]=e):u(p),r(i)))),i&&i.d<0&&(i.d=0)},c.d=(e,t)=>{for(var n in t)c.o(t,n)&&!c.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},c.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);c(370)})();