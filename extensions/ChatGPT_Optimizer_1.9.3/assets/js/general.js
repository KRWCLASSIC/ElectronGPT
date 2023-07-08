const urlIdeaSubmission="https://productivity.rocks/tool/ai-optimizer/#upcoming",selNavToggleParent="body > #__next > div >div:nth-child(2)",selMessageScrollSection="main > .overflow-hidden > div > div",selPromptingTextarea="main form textarea",getLastMessage=()=>(messages=document.querySelectorAll(".text-base .markdown"))[messages.length-1],getAllUserMessages=()=>document.querySelectorAll(".dark\\:bg-gray-800 > .text-base");function waitForElement(t,n,e=5e3,o=100,i=null){const a=Date.now()+e,r=setInterval(()=>{var e=document.querySelector(t);e&&(clearInterval(r),n(e)),Date.now()>=a&&(clearInterval(r),i)&&i()},o)}function waitForRemoveElement(e,t,n=6e4,o=100,i=null){const a=Date.now()+n,r=setInterval(()=>{document.querySelector(e)||(t(),clearInterval(r)),Date.now()>=a&&(clearInterval(r),i)&&i()},o)}function waitForChangeElementText(t,n,o,e=6e4,i=100,a=null){const r=Date.now()+e,s=setInterval(()=>{var e=document.querySelector(t);e&&e.innerText===n||(o(),clearInterval(s)),Date.now()>=r&&(clearInterval(s),a)&&a()},i)}function waitForElementText(t,n,o,e=6e4,i=100,a=null){const r=Date.now()+e,s=setInterval(()=>{console.log("searching"),console.log(n);var e=document.querySelector(t);console.log(e.innerText),e.innerText==n&&(o(),clearInterval(s)),Date.now()>=r&&(clearInterval(s),a)&&a()},i)}function handleStorage(e,t,n,o=()=>{},i="sync"){var a=chrome.storage[i];switch(e){case"get":a.get(t,e=>{o(e[t])});break;case"set":var r={};r[t]=n,a.set(r,()=>{o()});break;case"ask":a.get(t,e=>{e=void 0!==e[t];o(e)})}}function popup(e,t,n,o){const i=document.createElement("section");i.id="popup",i.style.cssText="top: 0; left: 0; position: fixed; height: 100vh; width: 100vw; z-index: 10000 !important; display: grid; place-items:center;";var a=document.createElement("div"),a=(a.style.cssText="position: absolute; width: 100%; height: 100%; background: hsl(0deg 0% 12% / 50%); z-index: -1; cursor: pointer;",a.onclick=()=>i.remove(),i.appendChild(a),o||"noName"),r=document.createElement("div"),a=(r.innerHTML=`
        <div class="gpt-optimizer gpto-popupHeader ${a}">
            <span>${o}</span>
            <button><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
        </div>
        <div class="gpt-optimizer gpto-popupContentWrap">
            ${e}
        </div>`,r.id="toastHTML",r.style.cssText="max-height: 400px; max-width: 600px; width: 100%; min-height: 200px; height: fit-content; padding-bottom: 1rem; overflow-x: scroll; display: flex; flex-direction: column;",r.className="gpt-optimizer gpto-popupInner",i.appendChild(r),document.createElement("style"));a.innerHTML=t,i.appendChild(a),document.body.appendChild(i),i.querySelector(".gpto-popupInner > div:nth-child(1) > button").addEventListener("click",()=>{i.remove()}),i.close=()=>{i.remove()},n(i)}function getDate(e=0){var t=new Date;return t.getFullYear()+`-${(t.getMonth()+1).toString().padStart(2,"0")}-`+t.getDate().toString().padStart(2,"0")}let gptoVoices=window.speechSynthesis.getVoices();function speak(e,t){const n=new SpeechSynthesisUtterance(e);t?(n.voice=t,window.speechSynthesis.speak(n)):getStandardVoice(e=>{n.voice=e,window.speechSynthesis.speak(n)})}function addToolTip(e,t){const n=Object.assign(document.createElement("div"),{style:`
            position: fixed;
            top: 10px;
            right: 10px;
            display: none;
            z-index: 10000;
            padding: .6rem;
            background: #202123;
            border-radius: 10px;

            width: max(fit-content, 250px);
            max-width: min(80vw, 400px);
            word-wrap: break-word;
        `,innerText:t});e.appendChild(n),e.addEventListener("mouseenter",()=>{n.style.display="block"}),e.addEventListener("mouseleave",()=>{n.style.display="none"})}window.speechSynthesis.addEventListener("voiceschanged",function(){gptoVoices=speechSynthesis.getVoices()});