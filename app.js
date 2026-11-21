const $=s=>document.querySelector(s);
const ua=navigator.userAgent;
$("#platform").textContent=/iPhone|iPad|iPod/.test(ua)?"Dispositivo Apple detectado":"Navegador compatível";
const c=navigator.connection;
$("#connection").textContent=c?.effectiveType||"Não exposto pelo iOS";
$("#online").textContent=navigator.onLine?"Sim (estado do navegador)":"Não";
window.addEventListener("online",()=>$("#online").textContent="Sim");
window.addEventListener("offline",()=>$("#online").textContent="Não");
const fileInput=$("#file");
fileInput.addEventListener("change",async()=>{
 const f=fileInput.files?.[0]; if(!f)return;
 const box=$("#analysis"); box.classList.remove("hidden");
 box.innerHTML="<p>Processando arquivo localmente…</p>";
 if(f.size>25*1024*1024){box.innerHTML="<p>Arquivo maior que 25 MB. Escolha um arquivo menor.</p>";return;}
 const buf=await f.arrayBuffer(), bytes=new Uint8Array(buf);
 let kind="Formato não identificado";
 if(bytes[0]===0x4d&&bytes[1]===0x5a)kind="Executável Windows (PE provável)";
 else if(bytes[0]===0x7f&&bytes[1]===0x45&&bytes[2]===0x4c&&bytes[3]===0x46)kind="Executável Linux (ELF)";
 else if(bytes[0]===0x50&&bytes[1]===0x4b&&f.name.toLowerCase().endsWith(".apk"))kind="Pacote Android APK (ZIP)";
 let hash="SHA-256 indisponível neste navegador";
 if(crypto?.subtle){const digest=await crypto.subtle.digest("SHA-256",buf);hash=[...new Uint8Array(digest)].map(x=>x.toString(16).padStart(2,"0")).join("");}
 let strings=[],cur="";
 for(const b of bytes){if(b>=32&&b<=126){cur+=String.fromCharCode(b)}else{if(cur.length>=6)strings.push(cur);cur="";}if(strings.length>=60)break;}
 if(cur.length>=6&&strings.length<60)strings.push(cur);
 const esc=s=>s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 box.innerHTML=`<h3>Resultado da triagem</h3><p><b>Nome:</b> ${esc(f.name)}<br><b>Tamanho:</b> ${f.size.toLocaleString("pt-BR")} bytes<br><b>Tipo provável:</b> ${kind}<br><b>SHA-256:</b><br><code>${hash}</code></p><h3>Strings ASCII (amostra)</h3><pre>${strings.length?strings.map(esc).join("\\n"):"Nenhuma string encontrada."}</pre><p>Triagem estática básica. O arquivo não foi executado nem enviado a um servidor.</p>`;
});
if("serviceWorker" in navigator && location.protocol!=="file:"){navigator.serviceWorker.register("./sw.js").catch(()=>{});}
