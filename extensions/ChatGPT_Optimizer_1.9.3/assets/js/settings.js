function openSettingsPopup(){popup(`
        <div class="gpto-settingList">
            <div class="gpto-setting" callback="widthRange">
                <label for="gpto-messageWidthRange">Set Message Width</label>
            </div>
            <div class="gpto-setting">
                <label for="gpto-openChats">Open Chat (Beta Version 🚸)</label>
                <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                    <button class="gpto-button" callback="splitViewNewWindow">Split New Window</button>
                    <button class="gpto-button" callback="splitViewCurrent">Split Current Window</button>
                </div>
            </div>
            <div class="gpto-setting">
                <label for="gpto-openChats">OpenAI Links</label>
                <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                    <button class="gpto-button" callback="faq">Updates & FAQ</button>
                    <button class="gpto-button" callback="myAccount">My Account</button>
                </div>
            </div>
            <div class="gpto-setting" callback="voiceSetting">
                <label for="gpto-standardVoice">Standard Voice</label>
                <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                    <select class="voiceSelection gpto-textarea"></select>
                    <select class="languageSelection gpto-textarea">
                        <option value="all">all</option>
                    </select>
                    <button class="gpto-button" callback="saveStandardVoice">Save Voice</button>
                    <button class="gpto-button" callback="hearStandardVoice">🔊</button>
                </div>
            </div>
            <div class="gpto-setting">
                <label for="gpto-openChats">Style</label>
                <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                    <button class="gpto-button" callback="blur">Toggle Chat Blur (For Presentation)</button>
                </div>
            </div>
            <div class="gpto-setting danger">
                <label for="gpto-dangerSettings">Danger Zone</label>
                <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                    <button class="gpto-button" callback="deleteAllChats">Delete All Chats</button>
                </div>
            </div>
        </div>
    `,`
    #toastHTML .gpto-settingList {
        height: 300px;
        overflow-y: scroll;
        padding-right: 10px; /* this is to make space for the scrollbar */
    }
    #toastHTML .gpto-settingList::-webkit-scrollbar {
        width: 10px;
    }
    #toastHTML .gpto-settingList::-webkit-scrollbar-track {
        background-color: #555;
    }
    #toastHTML .gpto-settingList::-webkit-scrollbar-thumb {
        background-color: #888;
        border-radius: 5px;
    }
    #toastHTML::-webkit-scrollbar {
        display: none;
    }
    #toastHTML .gpto-settingList {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 22px;
    }
    #toastHTML .gpto-setting {
        margin-right: auto;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    #toastHTML .gpto-setting.danger {
        color: #CE8080;
        border: 1px solid #CE8080;
        padding: 1rem;
        border-radius: 15px;
        width: 100%;
    }
    #toastHTML .gpto-setting.danger button {
        background: #CE8080;
        color: #212123;
    }
    #toastHTML .gpto-setting[callback="widthRange"] {
        width: 70%;
    }
    #toastHTML .gpto-setting label {
        font-size: 14px;
        margin-bottom: .4em;
    }
    `,a=>{a.querySelector('[callback="widthRange"]').appendChild(setMessageWidthRange()),a.querySelector('[callback="splitViewNewWindow"]').addEventListener("click",t=>{chrome.runtime.sendMessage({action:"open_new_window_chat_split"},t=>{})}),a.querySelector('[callback="splitViewCurrent"]').addEventListener("click",t=>{const e=Object.assign(document.createElement("style"),{id:"chatSplitView",textContent:`
                    body {
                        max-height: 100vh;
                        display: grid;
                        grid-template-columns: 70% 30%;
                    }
                    body #__next {
                        max-height: 100vh;
                    }
                    body > iframe {
                        height: 100%;
                        width: 100%;
                    }
                    body .closeSplitView {
                        position: fixed;
                        content: '';
                        top: 10px;
                        left: 70%;
                        transform: translateX(-100%);
                        font-size: .8rem;
                        padding: 0.2rem 0.4rem;
                        background: #1e1e1e;                        
                    }
                `}),a=Object.assign(document.createElement("iframe"),{src:"https://chat.openai.com/chat/"}),l=Object.assign(document.createElement("div"),{classList:"closeSplitView gpto-button",innerText:"close",onclick:()=>{e.remove(),a.remove(),l.remove()}});document.body.insertBefore(a,document.body.children[2]),document.body.appendChild(e),document.body.appendChild(l)}),a.querySelector('[callback="faq"]').addEventListener("click",t=>{var e=document.querySelector(".gpto-faq");e&&e.click()}),a.querySelector('[callback="myAccount"]').addEventListener("click",t=>{var e=document.querySelector(".gpto-my-account");e&&e.click(),a.close()}),a.querySelector('[callback="blur"]').addEventListener("click",t=>{toggleChatBlurForPresentation(),a.close()});const l=a.querySelector(".voiceSelection"),o=a.querySelector(".languageSelection");let n;const i=e=>{for(let t=0;t<e.length;t++){var a=document.createElement("option");a.value=e[t].name,a.textContent=e[t].name,l.appendChild(a)}n=e.find(t=>t.name===l.value)};i(window.speechSynthesis.getVoices()),i(gptoVoices);var e=gptoVoices,s=["all"];for(let t=0;t<e.length;t++){var c,r=e[t].lang;s.includes(r)||(s.push(r),(c=document.createElement("option")).value=r,c.textContent=r,o.appendChild(c))}o.addEventListener("change",()=>{var t,e,a=o.value,a=(t=gptoVoices,"all"===(e=a)?t:t.filter(t=>t.lang.startsWith(e)));l.innerHTML="",i(a)}),l.addEventListener("change",()=>{n=gptoVoices.find(t=>t.name===l.value)}),a.querySelector('[callback="hearStandardVoice"]').addEventListener("click",t=>{n?(toast("Generating Audio..."),speak("Hey, it's me. Just click save voice if you want to set me as your standard voice!",n)):toast("No voice selected!")}),a.querySelector('[callback="saveStandardVoice"]').addEventListener("click",t=>{n?setStandardVoice(n):toast("No voice selected!")}),a.querySelector('[callback="deleteAllChats"]').addEventListener("click",t=>{popup(`
            <h4>Really want to delete all Chats?</h4>
            <div>
                <button class="gpto-button" callback="cancelDeleteAllChats">Cancel Deletion</button>
                <button class="gpto-button danger" callback="confirmDeleteAllChats">Delete All Chats</button>
            </div>
            `,`
            #toastHTML .danger {
                border: 1px solid #CE8080;
                color: #CE8080;
            }
            `,e=>{e.querySelector('[callback="cancelDeleteAllChats"]').addEventListener("click",t=>{e.close()}),e.querySelector('[callback="confirmDeleteAllChats"]').addEventListener("click",t=>{deleteAllChats(),e.close()})},"Confirm Deletion"),a.close()})},"Settings")}function setMessageWidthRange(){const e=Object.assign(document.createElement("style"),{id:"gpto-messageWidthRange",textContent:`
            .xl\\:max-w-3xl {
                max-width: 'initial';
            }
        `});return document.body.appendChild(e),Object.assign(document.createElement("input"),{type:"range",min:30,max:80,classList:"gpto-input-range",style:`
            width: 100%;
        `,oninput:t=>{e.innerHTML=`
            .xl\\:max-w-3xl {
                max-width: ${t.target.value}vw;
            }
            `}})}function toggleChatBlurForPresentation(){waitForElement("nav",t=>{console.log(t.getAttribute("blur")),null!==t.getAttribute("blur")?(console.log("set"),"false"===t.getAttribute("blur")?(document.querySelector("nav").setAttribute("blur","true"),handleStorage("set","navBlur",!0)):(document.querySelector("nav").setAttribute("blur","false"),handleStorage("set","navBlur",!1))):(console.log("not set"),handleStorage("get","navBlur","",t=>{void 0!==t||!0===t||!1===t?document.querySelector("nav").setAttribute("blur",t):handleStorage("set","navBlur",!1)}))})}function setStandardVoice(t,e){let a=!0,l;"object"==typeof t?(l=t.voiceURI,a=!1):"string"==typeof t&&(l=t,a=!1),a&&l?toast("Error in setting this as standard voice!"):handleStorage("set","standardVoice",l,()=>{toast(`Saved "${l}" as standard voice!`),speak("Thank you for saving me as you standard voice!")}),e(l)}function getStandardVoice(t,a){handleStorage("get","standardVoice","",e=>{"uri"===a||(e=gptoVoices.find(t=>t.voiceURI===e)),t(e)})}