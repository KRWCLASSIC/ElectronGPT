async function addChatIframe(){var t=document.createElement("iframe");t.src="https://chat.openai.com/chat",t.frameBorder="0",t.style.height="500px",t.style.width="max-content",document.querySelector("#addChat").appendChild(t)}document.addEventListener("DOMContentLoaded",async function(){await new Promise(t=>setTimeout(t,1)),addChatIframe();const l=document.querySelector("#usage"),e=(handleStorage("get","promptHistory","",t=>{const a=[],n=[],r=[],o=[];t.forEach(t=>{var e=new Date(t.time);e>=new Date(Date.now()-36e5)&&a.push(t.time),e>=new Date(Date.now()-864e5)&&n.push(t.time),e>=new Date(e.getFullYear(),e.getMonth(),1)&&r.push(t.time),e>=new Date(e.getFullYear(),0,1)&&o.push(t.time)});var e=(new Date).toLocaleDateString("en-US",{month:"long"}),h=(new Date).getFullYear();"object"==typeof t&&(l.innerHTML=`
            📊 Prompts Charts 📊<br>
            <table>
                <tr>
                    <th style="text-align: start;">Last Hour</th>
                    <td>${a.length}</td>
                </tr>
                <tr>
                    <th style="text-align: start;">24h</th>
                    <td>${n.length}</td>
                </tr>
                <tr>
                    <th style="text-align: start;">${e}</th>
                    <td>${r.length}</td>
                </tr>
                <tr>
                    <th style="text-align: start;">${h}</th>
                    <td>${o.length}</td>
                </tr>
            </table>`)},"local"),document.querySelector("#version"));handleStorage("get","currentVersion","",t=>{e.innerText=t||"Unknown Version"})});