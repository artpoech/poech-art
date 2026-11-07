// Guides: fills the "Available now" strip with the newest live details from data/zooms.json
(function(){var g=document.getElementById('glive');if(!g)return;
var root=document.body.getAttribute('data-root')||'';
fetch(root+'data/zooms.json',{cache:'no-cache'}).then(function(r){return r.json()}).then(function(d){
var live=(d.zooms||[]).filter(function(x){return x.status==='live'&&x.page_url});
live.sort(function(a,b){return (b.live_date||'').localeCompare(a.live_date||'')});
if(!live.length)return;var esc=function(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;')};
var h='';live.slice(0,5).forEach(function(x){
h+='<a class="tile live" href="'+root+x.page_url+'"><span class="badge">Available now</span><div class="ph"><img loading="lazy" src="'+root+'assets/img/zooms/thumb/'+x.code+'.jpg" alt="'+esc(x.title)+', a detail from the painting '+esc(x.painting)+'"></div><h3 class="ln">'+esc(x.title)+'</h3><p class="meta">'+esc(x.collection)+'</p></a>'});
g.querySelector('.zgrid').innerHTML=h;g.hidden=false;}).catch(function(){});})();
