(function(){
  var nav=document.getElementById('nav');
  if(nav){var btn=nav.querySelector('.menu-btn');
    btn.addEventListener('click',function(){var o=nav.classList.toggle('open');btn.setAttribute('aria-expanded',o)});
    nav.querySelectorAll('ul a').forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('open');btn.setAttribute('aria-expanded',false)})});}
  document.querySelectorAll('[data-open]').forEach(function(t){
    var o=function(){document.getElementById(t.getAttribute('data-open')).showModal()};t.addEventListener('click',o);t.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();o()}});
  });
  document.querySelectorAll('dialog').forEach(function(d){
    d.addEventListener('click',function(e){if(e.target===d)d.close()});
    d.querySelectorAll('.close').forEach(function(c){c.addEventListener('click',function(){d.close()})});
  });
  var lb=document.getElementById('lightbox');
  if(lb){lb.querySelector('img').addEventListener('click',function(e){e.stopPropagation();lb.classList.toggle('full')});
    lb.addEventListener('close',function(){lb.classList.remove('full')});}

  // ---- live status from data/zooms.json ----
  var root=document.body.getAttribute('data-root')||'';
  if(!document.querySelector('[data-code],[data-latest],[data-recent],[data-count],[data-related]'))return;
  fetch(root+'data/zooms.json',{cache:'no-cache'}).then(function(r){return r.json()}).then(function(d){
    var z=d.zooms||[], by={};
    z.forEach(function(x){by[x.code]=x});
    var live=z.filter(function(x){return x.status==='live'&&x.page_url});
    // tiles: Coming soon -> Available now
    document.querySelectorAll('.tile[data-code]').forEach(function(t){
      var x=by[t.getAttribute('data-code')]; if(!x||x.status!=='live'||!x.page_url)return;
      t.classList.remove('soon');t.classList.add('live');t.setAttribute('href',root+x.page_url);
      var b=t.querySelector('.badge');if(b)b.textContent='Available now';
    });
    // counters "x of 15 available"
    document.querySelectorAll('[data-count]').forEach(function(c){
      var s=c.getAttribute('data-count'),n=live.filter(function(x){return x.collection_slug===s}).length;
      c.textContent=n?n+' of 15 available':'Coming soon';
    });
    // zoom pages: "More from" row, live ones first, then coming soon
    document.querySelectorAll('[data-related]').forEach(function(g){
      var s=g.getAttribute('data-related'),ex=g.getAttribute('data-exclude');
      var same=z.filter(function(x){return x.collection_slug===s&&x.code!==ex});
      var lv=same.filter(function(x){return x.status==='live'&&x.page_url}),sn=same.filter(function(x){return !(x.status==='live'&&x.page_url)});
      var h='';lv.concat(sn).slice(0,4).forEach(function(x){var on=x.status==='live'&&x.page_url;
        h+='<a class="tile '+(on?'live':'soon')+'" href="'+root+(on?x.page_url:'collections/'+s+'/index.html')+'"><span class="badge">'+(on?'Available now':'Coming soon')+'</span><div class="ph"><img loading="lazy" src="'+root+'assets/img/zooms/thumb/'+x.code+'.jpg" alt="'+x.title+'"></div><h3>'+x.title+'</h3><p class="meta">'+x.code+'</p></a>'});
      g.innerHTML=h;
    });
    live.sort(function(a,b){return (b.live_date||'').localeCompare(a.live_date||'')});
    // home hero: latest release
    var L=document.querySelector('[data-latest]');
    if(L&&live.length){var x=live[0];
      L.innerHTML='<a href="'+root+x.page_url+'" class="ph"><img src="'+root+'assets/img/zooms/large/'+x.code+'.jpg" alt="'+x.title+', a detail from the painting '+x.painting+'"></a>'+
      '<div><span class="kicker">Latest release</span><h2>'+x.title+'</h2><p class="meta">A detail from the painting '+x.painting+'</p>'+
      '<a class="more ln" href="'+root+x.page_url+'">See the print</a></div>';
      L.classList.add('latest');L.classList.remove('banner');}
    // home: recently released grid
    var R=document.querySelector('[data-recent]');
    if(R&&live.length){var h='';live.slice(0,10).forEach(function(x){
      h+='<a class="tile live" href="'+root+x.page_url+'"><span class="badge">Available now</span><div class="ph"><img loading="lazy" src="'+root+'assets/img/zooms/thumb/'+x.code+'.jpg" alt="'+x.title+'"></div><h3 class="ln">'+x.title+'</h3><p class="meta">'+x.collection+'</p></a>'});
      R.querySelector('.zgrid').innerHTML=h;R.hidden=false;}
  }).catch(function(){});
})();
