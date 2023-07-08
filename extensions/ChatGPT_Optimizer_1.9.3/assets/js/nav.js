function addNavBarToggle(){document.querySelector("#navToggler")||waitForElement(selNavToggleParent,e=>{var t=Object.assign(document.createElement("div"),{id:"navToggler",onclick:()=>{document.body.classList.toggle("collapse"),handleStorage("get","navState","",e=>{handleStorage("set","navState",!e)})}});document.querySelector("#navToggler")&&document.querySelector("#navToggler").remove(),t.innerHTML='<div class="arrow"></div>',e.appendChild(t)})}function initNavBarToggleState(){handleStorage("get","navState","",e=>{e||void 0===e||document.body.classList.toggle("collapse")})}function setChatDeletion(){let t="nav > div > div > a > div >";waitForElement(t+" button:nth-child(2)",e=>{e.addEventListener("click",()=>{(event.metaKey||event.ctrlKey||event.shiftKey)&&(toast("Quick Deletion"),waitForElement(t+" button:nth-child(1)",e=>{e.click()},1e4,50))}),addToolTip(e.parentNode.parentNode,"Shift + Click to Quick Delete")})}function updatePageActionElements(){waitForElement("nav > a",()=>{document.querySelectorAll("nav > a:not(:nth-child(1))").forEach(e=>{var t=e.innerHTML.toLowerCase();t.includes("conversations")?(e.classList.add("gpto-clear-conversations"),e.style.display="none"):t.includes("pricing")||t.includes("upgrade to plus")||t.includes("my account")?(e.classList.add("gpto-pricing-plans"),e.classList.add("gpto-my-account"),e.innerHTML=e.querySelector("svg").outerHTML+"Pricing Plans",e.style.display="none"):t.includes("faq")?(e.classList.add("gpto-faq"),e.style.display="none"):t.includes("light")||t.includes("dark")?(e.classList.add("gpto-themeToggler"),e.style.display="none"):t.includes("log out")?e.classList.add("gpto-log-out"):t.includes("improve chatgpt")&&(e.style.display="none")}),addSettingsButton(),addChatExportButton(),addChangeThemeButton()})}async function addChangeThemeButton(){addActionButton("gpto-change-theme",'<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>Change Theme',()=>{popup(`
            <div class="flex">
                <button class="gpt-optimizer gpto-button" callback="1">Light</button>
                <button class="gpt-optimizer gpto-button" callback="2">Dark</button>
                <button class="gpt-optimizer gpto-button" callback="3">Messenger</button>
                <button class="gpt-optimizer gpto-button" callback="4">Matrix</button>
                <button class="gpt-optimizer gpto-button" callback="setThemeGlassMorph">Glass Morph</button>
            </div>
            <p>1 Theme Every Week    |    Any issues with current theme? <button callback="5"><u>Contact Here</u></button></p>
        `,`
            #toastHTML .flex {
                display: flex;
                gap: .8rem;
            }
            #toastHTML p {
                font-size: .6rem;
            }
        `,e=>{e.querySelector('[callback="1"]').onclick=()=>{setTheme("light")},e.querySelector('[callback="2"]').onclick=()=>{setTheme("dark")},e.querySelector('[callback="3"]').onclick=()=>{setTheme("https://productivity.rocks/tool/ai-optimizer/themes/apple-messaging/")},e.querySelector('[callback="4"]').onclick=()=>{setTheme("https://productivity.rocks/tool/ai-optimizer/themes/matrix/")},e.querySelector('[callback="setThemeGlassMorph"]').onclick=()=>{setTheme("https://productivity.rocks/tool/ai-optimizer/themes/glass-morph/")},e.querySelector('[callback="5"]').onclick=()=>{handleStorage("get","theme","",e=>{window.open("https://jorit.vasconezgerlach.de/contact?from=chatGptOptimizer&what=themeReport&theme="+e,"_blank")})}},"Choose Your Theme")})}async function addSettingsButton(){addActionButton("gpto-settings",`
    <svg stroke="currentColor" fill="none" stroke-width="1" viewBox="0 0 18 18" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"></path></svg>
    Settings`,()=>{openSettingsPopup()})}function deleteAllChats(){const e=document.querySelector(".gpto-clear-conversations");e&&(e.click(),waitForElementText(".gpto-clear-conversations","Confirm clear conversations",()=>{e.click()}))}async function addChatExportButton(){addActionButton("gpto-export-chat",`
    <svg stroke="currentColor" fill="none" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><path d="m9.5,6.5v2c0,.55-.45,1-1,1H1.5c-.55,0-1-.45-1-1v-2" style="fill:none; stroke:#fff; stroke-linecap:round; stroke-linejoin:round;"/><polyline points="2.5 4 5 6.5 7.5 4" style="fill:none; stroke:#fff; stroke-linecap:round; stroke-linejoin:round;"/><line x1="5" y1="6.5" x2="5" y2=".5" style="fill:none; stroke:#fff; stroke-linecap:round; stroke-linejoin:round;"/></svg>
    Export Chat`,()=>{popup(`
            <div class="gpto-download" callback="downloadJSON"></div>
            <div class="gpto-download" callback="downloadScreenshot"></div>
            <div class="gpto-download" callback="downloadCSV"></div>
            <p>
                ✨ This is a New Feature from the "ChatGPT Optimizer" extension.
                <br>
                📧 Drop features and reports to: ai.optimizer@productivity.rocks, we'll answer you asap.
                <br>
                🤩 Thank you for using ChatGPT Optimizer! Expect great features every week!
            </p>
        `,`
        #toastHTML p {
            color: #5d5d6a;
            text-align: center;
            font-size: 12px;
        }
        `,e=>{e.querySelector('[callback="downloadJSON"]').appendChild(getJSONDownloadButton()),e.querySelector('[callback="downloadScreenshot"]').appendChild(getChatScreenshotButton()),e.querySelector('[callback="downloadCSV"]').appendChild(getCSVDownloadButton())},"Export Chat")})}function getChatScreenshotButton(){var e=Object.assign(document.createElement("a"),{classList:"gpt-optimizer gpto-take-screenshot flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"});return e.onclick=()=>{screenshotChat()},e.innerHTML=`
        <svg
            stroke="currentColor"
            fill="none"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-4 w-4"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 10 10"
        >
            <path d="m9.5,6.5v2c0,.55-.45,1-1,1H1.5c-.55,0-1-.45-1-1v-2" style="fill:none; stroke:#fff; stroke-linecap:round; stroke-linejoin:round;"/>
            <polyline points="2.5 4 5 6.5 7.5 4" style="fill:none; stroke:#fff; stroke-linecap:round; stroke-linejoin:round;"/>
            <line x1="5" y1="6.5" x2="5" y2=".5" style="fill:none; stroke:#fff; stroke-linecap:round; stroke-linejoin:round;"/>
        </svg>
        Chat Screenshot
    `,e}function getJSONDownloadButton(){const a=[];var e=Object.assign(document.createElement("a"),{classList:"gpt-optimizer gpto-download-json flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"});return e.onclick=()=>{toast("Generating..."),messages=document.querySelectorAll("main > div > div > div > div > div:not(:last-of-type)");for(let e=0;e<messages.length;e++){var t=messages[e],o=document.createElement("div"),n=(o.innerHTML=t.innerHTML,o.querySelector(".gpto-actions")?.remove(),o.querySelectorAll("pre"));for(let e=0;e<n.length;e++){var r=n[e],i=r.querySelector("div:nth-child(1) span:nth-child(1)").innerText,l=r.querySelector("code").innerText;r.replaceWith(Object.assign(document.createElement("div"),{innerText:`
                            \`\`\`${i}
                            ${l}
                            \`\`\`
                            `}))}a.push(o.innerText)}var e=JSON.stringify(a),e=new Blob([e],{type:"application/json"}),e=URL.createObjectURL(e),s=document.createElement("a");s.setAttribute("href",e),s.setAttribute("download",`ChatGPT JSON [${getDate("YYYY-MM-DD")}].json`),document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(e)},e.innerHTML=`
        <svg
            stroke="currentColor"
            fill="none"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-4 w-4"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 10 10"
        >
            <path d="m9.5,6.5v2c0,.55-.45,1-1,1H1.5c-.55,0-1-.45-1-1v-2" style="fill:none; stroke:#fff; stroke-linecap:round; stroke-linejoin:round;"/>
            <polyline points="2.5 4 5 6.5 7.5 4" style="fill:none; stroke:#fff; stroke-linecap:round; stroke-linejoin:round;"/>
            <line x1="5" y1="6.5" x2="5" y2=".5" style="fill:none; stroke:#fff; stroke-linecap:round; stroke-linejoin:round;"/>
        </svg>
        Download JSON
    `,e}function getCSVDownloadButton(){const a=[];var e=Object.assign(document.createElement("a"),{classList:"gpt-optimizer gpto-download-json flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"});return e.onclick=()=>{toast("Generating..."),messages=document.querySelectorAll("main > div > div > div > div > div:not(:last-of-type):not(.flex)");for(let e=0;e<messages.length;e++){var t=messages[e],o=document.createElement("div"),n=(o.innerHTML=t.innerHTML,o.querySelector("div > div >div.text-xs")?.remove(),o.querySelector(".gpto-actions")?.remove(),o.querySelectorAll("pre"));for(let e=0;e<n.length;e++){var r=n[e],i=r.querySelector("div:nth-child(1) span:nth-child(1)").innerText,l=r.querySelector("code").innerText;r.replaceWith(Object.assign(document.createElement("div"),{innerText:`
                            \`\`\`${i}
                            ${l}
                            \`\`\`
                            `}))}t=o.textContent.replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/"/g,'""'),o=[e%2==0?'"User"':'"ChatGPT"','"'+t+'"'];a.push(o)}var e=['"Sender"','"Message"'].join(",")+`
`+a.map(e=>e.join(",")).join("\n"),e=new Blob([e],{type:"application/csv"}),e=URL.createObjectURL(e),s=document.createElement("a");s.setAttribute("href",e),s.setAttribute("download",`ChatGPT CSV [${getDate("YYYY-MM-DD")}].csv`),document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(e)},e.innerHTML=`
        <svg
            stroke="currentColor"
            fill="none"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-4 w-4"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 10 10"
        >
            <path d="m9.5,6.5v2c0,.55-.45,1-1,1H1.5c-.55,0-1-.45-1-1v-2" style="fill:none; stroke:#fff; stroke-linecap:round; stroke-linejoin:round;"/>
            <polyline points="2.5 4 5 6.5 7.5 4" style="fill:none; stroke:#fff; stroke-linecap:round; stroke-linejoin:round;"/>
            <line x1="5" y1="6.5" x2="5" y2=".5" style="fill:none; stroke:#fff; stroke-linecap:round; stroke-linejoin:round;"/>
        </svg>
        Download CSV
    `,e}const runningActions=new Map;function addActionButton(o,n,r){runningActions.has(o)||document.querySelector("."+o)||(runningActions.set(o,!0),waitForElement("nav",e=>{var t=Object.assign(document.createElement("a"),{classList:`gpt-optimizer ${o} flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm`,innerHTML:n});t.onclick=()=>r(),e.insertBefore(t,e.children[2]),runningActions.delete(o)}))}