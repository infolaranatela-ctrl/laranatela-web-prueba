(function(){
  var D=JSON.parse(document.getElementById('datos').textContent.replace(/más de 90 personas/g,'más de 100 personas'));
  var app=document.getElementById('app');
  var WA='https://wa.me/5492615341275?text=';
  var MAIL='info.laranatela@gmail.com';
  // páginas = nodos de la red
  var PAGS=[
    {key:'inicio',label:'Inicio',nav:'inicio'},
    {key:'productos',label:'Productos',nav:'productos'},
    {key:'empresas',label:'Empresas',nav:'empresas'},
    {key:'nosotros',label:'Nosotros',nav:'nosotros'},
    {key:'eti',label:'ETI',nav:'eti'},
    {key:'tejiendo',label:'YOSUMÉ',nav:'tejiendo'},
    {key:'novedades',label:'Novedades',nav:'novedades'},
    {key:'contacto',label:'Contacto',nav:'contacto'},
    {key:'ficha',label:'Ficha',nav:'productos'},
    {key:'otras',label:'',nav:''}
  ];
  window.__PAGS=PAGS;

  function esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
  function img(p){ if(!p)return ''; p=String(p);
    if(p.indexOf('/videos/')===0||p.indexOf('/images/')===0) return 'img/'+p.split('/').pop();
    var m=p.match(/assets\/(.+)$/); return m?'img/'+m[1].replace(/\//g,'-'):p; }
  function href(h){ if(!h)return '#/'; if(/^(https?:|mailto:|tel:)/.test(h))return h;
    var p=h.split('#'); var base=p[0]==='/'?'':p[0].replace(/^\//,''); return '#/'+base+(p[1]?'?'+p[1]:''); }
  function ext(h){return /^https?:/.test(h)?' target="_blank" rel="noopener"':'';}
  function sec(page,id){ var ss=(D.pages[page]||{}).sections||[]; for(var i=0;i<ss.length;i++)if(ss[i].id===id)return ss[i]; return {}; }
  function ps(a,cls){return (a||[]).map(function(t){return '<p'+(cls?' class="'+cls+'"':'')+'>'+esc(t)+'</p>';}).join('');}
  function btns(b,clsFirst){return (b||[]).map(function(x,i){return '<a class="btn'+(i>0?' am':'')+(i===0&&clsFirst?' '+clsFirst:'')+'" href="'+esc(href(x.href))+'"'+ext(x.href)+'>'+esc(x.label)+'</a>';}).join('');}
  function ojal(t,raya){return t?'<p class="ojal">'+(raya?'<span class="raya-s" aria-hidden="true"></span>':'')+esc(t)+'</p>':'';}
  function cabecera(s,extra){ return '<section class="cont pag-cab">'+ojal(s.eyebrow,true)+'<h1 class="h1 entra e2">'+esc(s.heading)+'</h1>'+(s.subheading?'<p class="sub">'+esc(s.subheading)+'</p>':'')+'<div class="entra e3">'+ps(s.paragraphs,'lead')+'</div>'+(extra||'')+'</section>'; }
  function wa(msg){return WA+encodeURIComponent(msg);}
  function prodPorSlug(s){for(var i=0;i<D.productos.length;i++)if(D.productos[i].slug===s)return D.productos[i];return null;}
  var CAT=D.productCategories, MAT=CAT.materialLabels, FUE=CAT.fuelleLabels;
  var CATLAB=Object.assign({navidad:'Línea navideña'},CAT.productPageCategoryLabels);
  var WA_GEN=(D.footer.contact||{}).whatsappHref||(WA);

  function tecsDe(p){return (p.impresion||[]).map(function(t){return t.toLowerCase().replace(/ó/g,'o').replace(/í/g,'i');});}
  function tarjetaProd(p,i){
    return '<a href="#/productos/'+esc(p.slug)+'" class="prod rv'+(i%3?' d'+(i%3):'')+'" data-tec="'+esc(tecsDe(p).join(' '))+'"><span class="im'+(p.imagen?'':' sin-foto')+'">'+(p.imagen?'<img src="'+img(p.imagen)+'" alt="'+esc(p.imagenAlt)+'" loading="lazy">':'<span class="sf"><b>Foto en camino</b><i>'+esc(p.nombre)+'</i></span>')+'</span><span class="tx">'+
      (p.reciclado?'<span class="sello-rec">Material recuperado</span>':'')+'<h3>'+esc(p.nombre)+'</h3><p>'+esc(p.resumen)+'</p><span class="min-plazo">Desde 5 días hábiles</span><span class="ficha"><span><i class="sw sw-'+esc(p.material)+'" aria-hidden="true"></i>'+esc(MAT[p.material]||(p.material==='carton'?'Cartón':''))+'</span>'+
      ((p.impresion||[]).length?'<span class="of">'+esc(p.impresion.join(' · '))+'</span>':'')+'</span></span></a>';
  }

  // ---------- páginas ----------
  var R={};
  R.inicio=function(){
    var h=sec('inicio','hero'), c=sec('inicio','cifras'), cl=sec('inicio','clientes'), q=sec('inicio','que-fabricamos'), rc=sec('inicio','reciclado'), sn=sec('inicio','sentido');
    var lines=(h.notes&&h.notes.headingLines)||[h.heading];
    var dest=D.productos.filter(function(p){return p.destacado;}).sort(function(a,b){return a.orden-b.orden;}).slice(0,8);
    var cuenta=[['90','+',''],['2009','',''],[null],['100','','%']];
    var html='<section class="cont hero g2"><div class="col">'+ojal(h.eyebrow,true)+
      '<h1 class="h1 entra e2">'+esc(lines[0])+(lines[1]?', <span style="color:var(--accent)">'+esc(lines[1])+'</span>':'')+'</h1>'+
      '<p class="lead entra e3">'+esc((h.paragraphs||[])[0])+'</p><div class="entra e4 fila-btn">'+btns(h.buttons)+'</div></div>'+
      '<div class="hero-foto entra e3"><div class="marco"><img id="heroimg" src="img/fot-taller-armado.jpg" alt="Manos serigrafiando una bolsa en el taller de La Rañatela"><p class="pie"><i aria-hidden="true"></i>Serigrafía · Taller Maipú</p></div></div></section>';
    html+='<div class="cinta-wrap" aria-hidden="true"><div class="cinta">'+Array(3).join('<span>Ensamblando habilidades</span><b>/</b><span>Tejiendo oportunidades</span><b>/</b><span>Maipú, Mendoza · desde 2009</span><b>/</b><span>100% a medida del cliente</span><b>/</b>')+'</div></div>';
    html+='<section class="cont" style="padding-block:clamp(56px,8vw,88px) 32px" aria-label="Datos"><div class="g4">'+(c.items||[]).map(function(it,i){
      var cu=cuenta[i]||[null], n=cu[0]?'<span data-cuenta="'+cu[0]+'"'+(cu[1]?' data-pre="'+cu[1]+'"':'')+(cu[2]?' data-post="'+cu[2]+'"':'')+(cu[0]==='2009'?' data-desde="1990"':'')+'>'+esc(it.title)+'</span>':esc(it.title);
      return '<div class="dato rv'+(i?' d'+Math.min(3,i):'')+(i===3?' lleno':'')+'"><div class="n">'+n+'</div><p>'+esc(it.text)+'</p></div>';}).join('')+'</div></section>';
    var logos=(cl.items||[]).map(function(it){return '<img src="'+img(it.logo)+'" alt="'+esc(it.alt)+'">';}).join('');
    html+='<section aria-label="'+esc(cl.eyebrow)+'" style="padding-block:24px 88px;position:relative;z-index:1"><div class="cont rv">'+ojal(cl.eyebrow)+'<h2 class="h2" style="margin:10px 0 28px">'+esc(cl.heading)+'</h2></div><div class="logos rv d1"><div class="fila">'+logos+logos.replace(/alt="[^"]*"/g,'alt=""')+'</div></div></section>';
    var chips=((q.notes||{}).chips||[]).map(function(ch){return '<li><a href="'+esc(href(ch.href))+'">'+esc(ch.label)+'</a></li>';}).join('');
    html+='<section class="cont" style="padding-block:0 clamp(64px,9vw,112px)"><div class="rv" style="max-width:720px;margin-bottom:32px">'+ojal('Catálogo',true)+'<h2 class="h2" style="margin-top:10px">'+esc(q.heading)+'</h2>'+ps(q.paragraphs,'lead mt16')+'</div><ul class="chips rv d1">'+chips+'</ul><div class="g3">'+dest.map(tarjetaProd).join('')+'</div><div class="rv" style="margin-top:36px"><a href="#/productos" class="btn">Ver el catálogo completo</a></div></section>';
    html+='<section class="banda"><div class="cont g2 sec-pad"><div class="rv pila">'+ojal('Reciclado textil')+'<h2 class="h2">'+esc(rc.heading)+'</h2>'+ps(rc.paragraphs,'lead')+'<div>'+btns(rc.buttons)+'</div></div><div class="foto-cuadro vert rv d2"><img src="img/productos-delantal-jean.jpg" alt="Delantal de jean confeccionado con indumentaria recuperada" loading="lazy"></div></div></section>';
    html+='<section class="cont g2 sec-pad"><div class="foto-cuadro rv"><img src="img/historia-taller-serigrafia.jpg" alt="Nave del taller con bolsas serigrafiadas colgadas para secar" loading="lazy"></div><div class="rv d2 pila">'+ojal('Historia',true)+'<h2 class="h2">'+esc(sn.heading)+'</h2>'+ps(sn.paragraphs,'lead')+'<a href="#/historia" class="link">'+esc((sn.buttons||[{}])[0].label||'Conocé nuestra historia')+' →</a></div></section>';
    html+='<div class="cinta-wrap dos" aria-hidden="true"><div class="cinta">'+Array(3).join('<span>Tejiendo Oportunidades</span><b>/</b><span>Set matero 2026</span><b>/</b><span>Sumale valor a tu mate, sumate</span><b>/</b><span>Camino a ETI</span><b>/</b>')+'</div></div>';
    return html;
  };
  R.historia=function(){
    var h=sec('historia','hero'), r=sec('historia','relato'), c=sec('historia','el-camino'), m=sec('historia','mas-que-un-taller');
    var p=r.paragraphs||[], im=r.images||[];
    function fig(x,lado){return '<figure class="fig '+lado+' rv"><img src="'+img(x.src)+'" alt="'+esc(x.alt)+'" loading="lazy">'+(x.caption?'<figcaption>'+esc(x.caption)+'</figcaption>':'')+'</figure>';}
    var html=cabecera(h);
    html+='<section class="cont articulo">'+(im[0]?fig(im[0],'der'):'')+'<p class="rv">'+esc(p[0])+'</p><p class="rv">'+esc(p[1])+'</p><blockquote class="rv">'+esc(p[2])+'</blockquote>'+(im[1]?fig(im[1],'izq'):'')+'<p class="rv">'+esc(p[3])+'</p><p class="rv">'+esc(p[4])+'</p></section>';
    html+='<section class="banda"><div class="cont sec-pad"><h2 class="h2 rv">'+esc(c.heading)+'</h2><ol class="linea rv">'+(c.items||[]).map(function(it,i){return '<li class="rv'+(i?' d'+Math.min(3,i):'')+'"><span class="an">'+esc(it.year)+'</span><h3>'+esc(it.title)+'</h3><p>'+esc(it.text)+'</p></li>';}).join('')+'</ol></div></section>';
    html+='<section class="cont g2 sec-pad"><div class="foto-cuadro ancha rv"><img src="'+img((m.images||[{}])[0].src)+'" alt="'+esc((m.images||[{}])[0].alt)+'" loading="lazy"></div><div class="rv d2 pila"><h2 class="h2">'+esc(m.heading)+'</h2>'+ps(m.paragraphs,'lead')+'<div>'+btns(m.buttons)+'</div></div></section>';
    return html;
  };
  function slugsCat(cat){var l=(cat.groups||[]).reduce(function(a,g){return a.concat(g.items);},[]).filter(function(s){return prodPorSlug(s);});D.productos.forEach(function(p){if(p.categoria===cat.id&&l.indexOf(p.slug)<0)l.push(p.slug);});return l;}
  R.productos=function(q){
    var h=sec('productos','intro'), f=sec('productos','filtros'), c=sec('productos','catalogo'), cta=sec('productos','cta');
    var html='<section class="cont pag-cab">'+ojal(h.eyebrow,true)+'<h1 class="h1 entra e2">'+esc(h.heading)+'</h1><div class="recuadro entra e3"><p class="sub">'+esc(h.subheading)+'</p>'+ps(h.paragraphs)+'</div></section>';
    html+='<nav class="filtros" aria-label="'+esc((f.notes||{}).ariaLabel||'Categorías de productos')+'"><div class="cont"><ul><span class="ind" aria-hidden="true"></span>'+(f.items||[]).map(function(it){var id=it.href.replace('#','');return '<li><button type="button" data-ir="'+esc(id)+'">'+esc(it.title)+'</button></li>';}).join('')+'</ul></div></nav>';
    var TECS=[['todas','Todas'],['serigrafia','Serigrafía'],['sublimacion','Sublimación'],['bordado','Bordado']];
    html+='<div class="cont filtro-tec rv" role="group" aria-label="Filtrar por técnica de impresión"><span>Técnica:</span>'+TECS.map(function(t,i){return '<button type="button" data-tec-f="'+t[0]+'" aria-pressed="'+(i?'false':'true')+'">'+t[1]+'</button>';}).join('')+'<em class="filtro-tec-n" aria-live="polite"></em></div>';
    var n=0;
    html+=(c.items||[]).map(function(cat){
      return '<section class="cont cat" id="cat-'+esc(cat.id)+'"><div class="cat-cab rv"><h2 class="h2">'+esc(cat.heading)+'</h2><span class="cuenta"><b>'+String(slugsCat(cat).length).padStart(2,'0')+'</b> '+(slugsCat(cat).length===1?'producto':'productos')+'</span></div>'+(cat.subheading?'<p class="lead rv">'+esc(cat.subheading)+'</p>':'')+
        '<div class="g3">'+slugsCat(cat).map(function(s,i){var p=prodPorSlug(s);return p?tarjetaProd(p,i):'';}).join('')+'</div>'+'</section>';
    }).join('');
    html+='<section class="cont sec-pad"><div class="caja rv"><div class="pila"><h2 class="h2">'+esc(cta.heading)+'</h2>'+ps(cta.paragraphs,'lead')+'<div>'+btns(cta.buttons)+'</div></div></div></section>';
    return html;
  };
  R.ficha=function(q,slug){
    var p=prodPorSlug(slug); if(!p)return R['404']();
    var cta=sec('producto-ficha','cta'), gal=[{src:p.imagen,alt:p.imagenAlt}].concat(p.galeria||[]);
    var spec=[['Material',MAT[p.material]||(p.material==='carton'?'Cartón':'')]];
    if(p.fuelle&&p.fuelle!=='sin-fuelle')spec.push(['Fuelle',FUE[p.fuelle]]);
    spec.push(['Medidas',p.medidaReferencia||'A medida del cliente']);
    if((p.colores||[]).length)spec.push(['Colores',p.colores.join(', ')]);
    if((p.impresion||[]).length)spec.push(['Personalización',p.impresion.join(', ')]);
    if(p.materialFijo===false)spec.push(['Otras opciones de tela',(p.materialesAlternativos||[]).length?'También en '+p.materialesAlternativos.map(function(m){return MAT[m]||m;}).join(', ')+'.':'También podemos confeccionarlo en friselina, gabardina o lienzo. Consultanos si necesitás otra tela.']);
    spec.push(['Pedido mínimo','100 unidades']);
    spec.push(['Plazo de entrega','Desde 5 días hábiles']);
    var html='<nav class="cont migas" aria-label="Migas de pan"><a href="#/">Inicio</a><span>/</span><a href="#/productos">Productos</a><span>/</span><b>'+esc(p.nombre)+'</b></nav>';
    html+='<section class="cont g2 ficha-p"><div class="galeria entra e2"><div class="g-prin'+(p.imagen?'':' sin-foto')+'">'+(p.imagen?'<img id="gprin" src="'+img(gal[0].src)+'" alt="'+esc(gal[0].alt)+'">':'<span class="sf"><b>Foto en camino</b><i>Estamos fotografiando este producto. Pedinos imágenes por WhatsApp.</i></span>')+'<span class="etq" aria-hidden="true">Hecho en Maipú<b>La Rañatela</b></span></div>'+(gal.length>1?'<div class="g-mini">'+gal.map(function(g,i){return '<button type="button" aria-label="Ver foto '+(i+1)+' de '+gal.length+'" aria-pressed="'+(i?'false':'true')+'" class="'+(i?'':'on')+'" data-src="'+img(g.src)+'" data-alt="'+esc(g.alt)+'"><img src="'+img(g.src)+'" alt="" loading="lazy"></button>';}).join('')+'</div>':'')+'</div>'+
      '<div class="pila entra e3">'+ojal(CATLAB[p.categoria],true)+'<h1 class="h1 h1-ficha">'+esc(p.nombre)+'</h1>'+(p.reciclado?'<span class="sello-rec">Confeccionado con material recuperado</span>':'')+'<p class="lead">'+esc(p.resumen)+'</p>'+
      '<ul class="chips-ficha"><li><b>Desde 100 unidades</b></li><li><b>Desde 5 días hábiles</b></li>'+(p.impresion||[]).map(function(t){return '<li>'+esc(t)+'</li>';}).join('')+'</ul>'+
      '<h2 class="spec-t">Ficha técnica</h2><dl class="spec">'+spec.map(function(s,i){return '<div><dt>'+esc(s[0])+'</dt><dd>'+(i===0?'<i class="sw sw-'+esc(p.material)+'" aria-hidden="true"></i>':'')+esc(s[1])+'</dd></div>';}).join('')+'</dl></div></section>';
    html+='<section class="cont articulo corto">'+ps(p.body)+'</section>';
    html+='<section class="cont sec-pad"><div class="caja rv"><div class="pila"><h2 class="h2">'+esc(cta.heading)+'</h2>'+ps(cta.paragraphs,'lead')+'<div class="fila-btn"><a class="btn" href="#/contacto?producto='+encodeURIComponent(p.nombre)+'&cantidad=100'+((p.impresion||[]).length===1?'&tecnica='+encodeURIComponent(p.impresion[0]):'')+'">Cotizar este producto</a><a class="btn am" href="'+wa('¡Hola! Vi la página de La Rañatela y quería consultar por '+p.nombre+'.')+'" target="_blank" rel="noopener">Consultar por WhatsApp</a>'+(['tote-lienzo','tote-brin','bolso-tote-grande','bolsa-friselina-manija-troquelada','portabotella-vino','mochila-cordon','gorra-trucker'].indexOf(p.slug)>=0?'<a class="btn am" href="#/personalizar?'+p.slug+'">Probá tu logo <span class="beta">Beta</span></a>':'')+'</div>'+((p.impresion||[]).length>1?'<p class="cotizar-tec">O cotizalo directo en '+p.impresion.map(function(t){return '<a href="#/contacto?producto='+encodeURIComponent(p.nombre)+'&cantidad=100&tecnica='+encodeURIComponent(t)+'">'+esc(t.toLowerCase())+'</a>';}).join(' · ')+'.</p>':'')+'<p class="promesa">Te respondemos en 48 horas hábiles con un presupuesto sin cargo.</p></div></div><p style="margin-top:24px"><a class="link" href="#/productos">← Volver al catálogo</a></p></section>';
    return html;
  };
  var ICO={'DTF':'M4 4h16v16H4z M8 8h8v8H8z M12 8v8 M8 12h8','Plotter':'M4 6h16 M4 18h16 M8 6v12 M16 6v12 M12 9l3 3-3 3','Serigrafía':'M3 7h18v11H3z M7 4v3 M17 4v3 M6 14h12 M9 11h6','Sublimación':'M12 3c3 4 5 6.5 5 9.2a5 5 0 0 1-10 0C7 9.5 9 7 12 3z M5 21h14','Bordado':'M4 20L18 6 M16 4l4 4 M4 20c3-.5 5 1 8-.5s4-4 8-3.5','Diseño de producto':'M3 17L17 3l4 4L7 21z M7 13l2 2 M10 10l2 2 M13 7l2 2','Diseño gráfico':'M12 3l6 7-6 11-6-11z M12 3v8 M12 13.5v.01','Reciclado textil':'M20 12a8 8 0 0 1-14 5.3 M4 12a8 8 0 0 1 14-5.3 M18 3v4h-4 M6 21v-4h4'};
  function ico(t){var d=ICO[t];return d?'<span class="ico-l" aria-hidden="true"><svg viewBox="0 0 24 24">'+d.split(' M').map(function(x,i){return '<path pathLength="1" d="'+(i?'M':'')+x+'"/>';}).join('')+'</svg></span>':'';}
  R.servicios=function(){
    var h=sec('servicios','hero'), t=sec('servicios','tecnicas'), ta=sec('servicios','taller'), co=sec('servicios','complementarios'), rc=sec('servicios','reciclado'), as=sec('servicios','asesoramiento');
    function vid(v){v=v||{};return '<div class="video rv d2"><video src="'+img(v.src)+'" poster="'+img(v.poster)+'" muted loop playsinline autoplay preload="none"></video></div>';}
    var html=cabecera(h);
    html+='<section class="cont sec-pad" style="padding-top:0"><h2 class="h2 rv">'+esc(t.heading)+'</h2>'+ps(t.paragraphs,'lead rv mt16')+'<div class="g3 tarjetas">'+(t.items||[]).map(function(it,i){return '<article class="tarj rv'+(i?' d'+i:'')+'">'+ico(it.title)+'<h3>'+esc(it.title)+'</h3><p>'+esc(it.text)+'</p><ul>'+(it.bullets||[]).map(function(b){return '<li>'+esc(b)+'</li>';}).join('')+'</ul></article>';}).join('')+'</div></section>';
    html+='<section class="banda"><div class="cont g2 sec-pad"><div class="rv pila"><h2 class="h2">'+esc(ta.heading)+'</h2>'+ps(ta.paragraphs,'lead')+'</div>'+vid((ta.videos||[])[0])+'</div></section>';
    html+='<section class="cont sec-pad"><h2 class="h2 rv">'+esc(co.heading)+'</h2><div class="g3 tarjetas">'+(co.items||[]).map(function(it,i){return '<article class="tarj rv'+(i?' d'+i:'')+'">'+ico(it.title)+'<h3>'+esc(it.title)+'</h3><p>'+esc(it.text)+'</p></article>';}).join('')+'</div></section>';
    html+='<section class="banda"><div class="cont g2 sec-pad"><div class="rv pila">'+ojal('Reciclado textil')+'<h2 class="h2">'+esc(rc.heading)+'</h2>'+ps(rc.paragraphs,'lead')+'<div>'+btns(rc.buttons)+'</div></div>'+vid((rc.videos||[])[0])+'</div></section>';
    html+='<section class="cont sec-pad"><div class="caja rv"><div class="pila"><h2 class="h2">'+esc(as.heading)+'</h2>'+ps(as.paragraphs,'lead')+'<div>'+btns(as.buttons)+'</div></div></div></section>';
    return html;
  };
  R.novedades=function(){
    var n=D.novedades.filter(function(x){return !x.borrador;}), s=sec('novedades','destacada'), no=s.notes||{};
    if(!n.length){var v=sec('novedades','vacio');return cabecera({eyebrow:'Novedades',heading:v.heading,paragraphs:v.paragraphs},'<div class="fila-btn">'+btns(v.buttons)+'</div>');}
    var x=n.filter(function(y){return y.destacada;})[0]||n[0];
    var mail='https://mail.google.com/mail/?view=cm&fs=1&to='+MAIL+'&su='+encodeURIComponent(no.mailSubject||'')+'&body='+encodeURIComponent(no.mailBody||'');
    var html='<section class="cont sec-pad"><article class="poster entra e2"><div class="pila">'+ojal(x.etiqueta)+'<h1 class="h1">'+esc(x.titulo)+'<br><b>'+esc(x.remate)+'</b></h1><p class="lead">'+esc(x.resumen)+'</p>'+
      '<p class="cap">'+esc(no.etapasCaption)+'</p><ol class="etapas">'+(x.etapas||[]).map(function(e,i){return '<li><span>0'+(i+1)+'</span>'+esc(e)+'</li>';}).join('')+'</ol>'+
      '<h2 class="h3">'+esc(no.contactHeading)+'</h2><p>'+esc(no.contactText)+'</p><div class="fila-btn"><a class="btn" href="'+mail+'" target="_blank" rel="noopener">Escribinos por mail</a><a class="btn am" href="'+wa(no.whatsappMessage||'')+'" target="_blank" rel="noopener">WhatsApp</a></div>'+
      '<a class="link" href="#/novedades/'+esc(x.slug)+'">Leer más →</a></div><figure><img src="'+img(x.imagen)+'" alt="'+esc(x.imagenAlt)+'"></figure></article></section>';
    var mas=n.filter(function(y){return y!==x;});
    if(mas.length)html+='<section class="cont sec-pad"><h2 class="h2">Más novedades</h2><div class="g3">'+mas.map(function(y){return '<a class="prod rv" href="#/novedades/'+esc(y.slug)+'"><span class="im"><img src="'+img(y.imagen)+'" alt="" loading="lazy"></span><span class="tx"><h3>'+esc(y.titulo)+'</h3><p>'+esc(y.resumen)+'</p></span></a>';}).join('')+'</div></section>';
    return html;
  };
  function fecha(f){var m=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];var p=String(f).split('-');return (+p[2])+' de '+m[+p[1]-1]+' de '+p[0];}
  R.nota=function(q,slug){
    var x=null;D.novedades.forEach(function(y){if(y.slug===slug)x=y;}); if(!x)return R['404']();
    var cta=sec('novedad-detalle','cta');
    var html='<nav class="cont migas"><a href="#/novedades">← Volver a Novedades</a></nav><section class="cont pag-cab">'+ojal(fecha(x.fecha))+'<h1 class="h1 entra e2">'+esc(x.titulo)+'</h1><p class="lead entra e3">'+esc(x.resumen)+'</p></section>';
    html+='<section class="cont"><figure class="fig-ancha rv"><img src="'+img(x.imagen)+'" alt="'+esc(x.imagenAlt)+'"></figure></section><section class="cont articulo corto">'+(x.body||[]).map(function(b){return b.indexOf('## ')===0?'<h2 class="h3 rv">'+esc(b.slice(3))+'</h2>':'<p class="rv">'+esc(b)+'</p>';}).join('')+'</section>';
    html+='<section class="cont sec-pad"><div class="caja rv"><div class="pila"><h2 class="h2">'+esc(cta.heading)+'</h2>'+ps(cta.paragraphs,'lead')+'<div class="fila-btn"><a class="btn" href="https://mail.google.com/mail/?view=cm&fs=1&to='+MAIL+'&su='+encodeURIComponent((cta.notes||{}).mailSubject||'')+'" target="_blank" rel="noopener">Escribinos por mail</a><a class="btn am" href="'+wa('¡Hola! Vi la nota "'+x.titulo+'" en la página de La Rañatela y quería hacer una consulta.')+'" target="_blank" rel="noopener">Consultar por WhatsApp</a></div></div></div></section>';
    return html;
  };
  R.contacto=function(q){
    var h=sec('contacto','hero'), f=sec('contacto','formulario'), no=f.notes||{}, a=sec('contacto','aside-contacto'), sn=sec('contacto','aside-sentido'), st=sec('contacto','como-trabajamos');
    var pre='',P={};try{if(q&&q.indexOf('=')>=0){q.split('&').forEach(function(kv){var i=kv.indexOf('=');if(i>0)P[decodeURIComponent(kv.slice(0,i))]=decodeURIComponent(kv.slice(i+1).replace(/\+/g,' '));});pre=P.producto||'';}else pre=q?decodeURIComponent(q):'';}catch(_){pre='';}
    var preMsg=pre&&pre.indexOf('Personalizado:')===0?pre:(P.tecnica?'Técnica: '+P.tecnica+'.':'');
    function campo(c){
      var id='f-'+c.name, lab='<label for="'+id+'">'+esc(c.label)+(c.required?' <span aria-hidden="true">*</span>':'')+'</label>', req=c.required?' required':'';
      var inp;
      if(c.type==='select')inp='<select id="'+id+'" name="'+c.name+'"'+req+'>'+c.options.map(function(o){return '<option'+(o===pre?' selected':'')+'>'+esc(o)+'</option>';}).join('')+'</select>';
      else if(c.type==='textarea')inp='<textarea id="'+id+'" name="'+c.name+'" rows="4"'+req+(c.placeholder?' placeholder="'+esc(c.placeholder)+'"':'')+'>'+esc(preMsg)+'</textarea>';
      else inp='<input id="'+id+'" name="'+c.name+'" type="'+c.type+'"'+req+(c.placeholder?' placeholder="'+esc(c.placeholder)+'"':'')+(c.name==='cantidad'&&P.cantidad?' value="'+esc(P.cantidad)+'"':'')+'>';
      return '<div class="'+(c.type==='textarea'||c.name==='producto'||c.name==='medidas'?'s2':'')+'">'+lab+inp+(c.help?'<small>'+esc(c.help)+'</small>':'')+'</div>';
    }
    var html=cabecera(h);
    html+='<section class="cont g-contacto"><form class="form form-largo rv" id="form" novalidate><h2 class="sr">'+esc(f.heading)+'</h2>'+(pre&&pre.indexOf('Personalizado:')!==0&&P.producto?'<p class="form-pre"><b>Cotización de '+esc(pre)+'</b>'+(P.tecnica?' en '+esc(P.tecnica.toLowerCase()):'')+'. Te respondemos en 48 horas hábiles.</p>':'<p class="form-pre">Te respondemos en 48 horas hábiles con un presupuesto sin cargo.</p>')+(no.fieldsets||[]).map(function(fs){return '<fieldset><legend>'+esc(fs.legend)+'</legend><div class="campos">'+fs.fields.map(campo).join('')+'</div></fieldset>';}).join('')+
      (window.__adjuntosPZ?'<div class="adj-pz" role="note"><b>Se envía con tu consulta</b><span>'+window.__adjuntosPZ.archivos.map(function(a){return esc(a.nombre==='vegetal.pdf'?'Vegetal a medida exacta':a.nombre==='sublimacion.pdf'?'Imagen para sublimar':a.nombre==='mockup-frente.png'?'Mockup del frente':a.nombre==='mockup-dorso.png'?'Mockup del dorso':a.nombre.indexOf('logo')===0?'Tu logo original':'Mockup del producto');}).join(' · ')+'</span></div>':'')+
      '<button type="submit" class="btn">'+esc(no.submit||'Enviar consulta')+'</button><p class="nota">'+esc(no.footnote)+'</p></form>';
    html+='<aside class="pila rv d2"><div class="tarj"><h2 class="h3">'+esc(a.heading)+'</h2><dl class="spec">'+(a.items||[]).map(function(it){return '<div><dt>'+esc(it.title)+'</dt><dd>'+(it.href?'<a href="'+esc(it.href)+'" target="_blank" rel="noopener">'+esc(it.text)+'</a>':esc(it.text))+'</dd></div>';}).join('')+'</dl></div>'+
      '<div class="tarj acento"><h2 class="h3">'+esc(sn.heading)+'</h2>'+ps(sn.paragraphs)+'</div></aside></section>';
    html+='<section class="banda"><div class="cont sec-pad"><h2 class="h2 rv">'+esc(st.heading)+'</h2><ol class="linea pasos rv">'+(st.items||[]).map(function(it,i){return '<li class="rv'+(i?' d'+Math.min(3,i):'')+'"><span class="an">0'+it.number+'</span><h3>'+esc(it.title)+'</h3><p>'+esc(it.text)+'</p></li>';}).join('')+'</ol></div></section>';
    return html;
  };
  R.gracias=function(){var s=sec('contacto-gracias','confirmacion');return cabecera(s,'<div class="fila-btn"><a class="btn" href="'+esc(s.buttons[0].href)+'" target="_blank" rel="noopener">WhatsApp</a><a class="btn am" href="#/">Volver al inicio</a></div>');};
  R.privacidad=function(){var h=sec('privacidad','header'),c=sec('privacidad','contenido');
    return cabecera(h)+'<section class="cont articulo corto legal">'+(c.items||[]).map(function(it){var t=esc(it.text);(it.links||[]).forEach(function(l){t=t.split(esc(l.label)).join('<a href="'+esc(l.href)+'"'+ext(l.href)+'>'+esc(l.label)+'</a>');});return '<h2 class="h3">'+esc(it.title)+'</h2><p>'+t+'</p>';}).join('')+'</section>';};
  R.terapia=function(){var s=sec('terapia-ocupacional','en-construccion');return cabecera(s,'<div class="fila-btn">'+btns(s.buttons)+'</div>');};
  R['404']=function(){var s=sec('404','error');return '<section class="cont pag-cab">'+ojal(s.eyebrow,true)+'<h1 class="h1 entra e2">'+esc(s.heading)+'</h1><p class="lead">'+esc(s.paragraphs[0])+'</p><div class="fila-btn">'+btns(s.buttons.slice(0,2))+'</div><p>'+esc(s.paragraphs[1]).replace('contactanos','<a class="link" href="#/contacto">contactanos</a>')+'</p></section>';};

  // ===================== Estructura 2: producto primero, empresas, nosotros, ETI =====================
  var FECHA_ETI='20 de noviembre';
  // Prensa: notas publicadas sobre La Rañatela (se suman y editan desde el panel)
  var PRENSA=[
    {id:'p1',medio:'ADN País',fecha:'2026-06-09',titulo:'EMESA impulsa la inclusión laboral junto a La Rañatela',url:'https://adnpais.com/notas/98514-EMESA-impulsa-la-inclusion-laboral-junto-a-La-Raniatela'},
    {id:'p2',medio:'Gobierno de Mendoza',fecha:'2020-09-05',titulo:'La Dirección de Cooperativas apoya el trabajo de La Rañatela',url:'https://www.mendoza.gov.ar/prensa/la-direccion-de-cooperativas-apoya-el-trabajo-de-la-ranatela/'},
    {id:'p3',medio:'Puntal',fecha:'2019-10-23',titulo:'Conocé La Rañatela, un espacio para el desarrollo laboral de personas con discapacidad',url:'https://www.puntal.com.ar/discapacidad/conoce-la-ranatela-un-espacio-el-desarrollo-laboral-personas-discapacidad-n51977'},
    {id:'p4',medio:'Diario Uno',fecha:'2019-10-21',titulo:'La Rañatela, la cooperativa de trabajo que se animó a romper todos los moldes',url:'https://www.diariouno.com.ar/economia/ranatela-cooperativa-animo-romper-moldes-10212019_rkKUA_PFH'},
    {id:'p5',medio:'Gobierno de Mendoza',fecha:'2018-03-18',titulo:'La producción de un emprendimiento de personas con discapacidad estará presente en la Asamblea del BID',url:'https://www.mendoza.gov.ar/prensa/la-produccion-de-un-emprendimiento-de-personas-con-discapacidad-estara-presente-en-la-asamblea-del-bid/'},
    {id:'p6',medio:'Unidiversidad',fecha:'2016-05-03',titulo:'La Rañatela brinda oportunidades de trabajo para personas con discapacidad',url:'https://www.unidiversidad.com.ar/la-ratalena-oportunidades-de-rabajo-para-personas-con-discapacidad'},
    {id:'p7',medio:'Unidiversidad',fecha:'2011-10-18',titulo:'La Rañatela: un ejemplo de oportunidad y solidaridad',url:'https://www.unidiversidad.com.ar/la-rana-tela'},
    {id:'p8',medio:'YouTube · Historias G20',fecha:'',titulo:'#HistoriasG20: La Rañatela, Mendoza',url:'https://www.youtube.com/watch?v=XMh3yZOPyrs'}
  ];
  var MESES=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  function fechaPrensa(f){if(!f)return '';var m=String(f).match(/^(\d{4})-(\d{2})(?:-(\d{2}))?/);return m?((m[3]?(+m[3])+' de ':'')+MESES[+m[2]-1]+' de '+m[1]):f;}
  function ytId(u){var m=String(u||'').match(/(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/);return m?m[1]:'';}
  function ytMini(id){return 'https://i.ytimg.com/vi/'+id+'/hqdefault.jpg';}
  window.__ytId=ytId;
  function prensaSeccion(){var l=PRENSA.slice().sort(function(a,b){return String(b.fecha||'0').localeCompare(String(a.fecha||'0'));});if(!l.length)return '';
    var nv=l.filter(function(n){return ytId(n.url);}).length;
    return '<section class="cont sec-pad" id="prensa"><div class="cat-cab rv"><h2 class="h2">En los medios</h2><span class="cuenta">'+(l.length-nv)+' nota'+(l.length-nv===1?'':'s')+(nv?' · '+nv+(nv>1?' videos':' video'):'')+'</span></div><div class="prensa">'+l.map(function(n,i){var y=ytId(n.url),d=(i%3?' d'+(i%3):'');
      if(y)return '<article class="pr-nota pr-video rv'+d+'"><button class="pr-yt" type="button" data-yt="'+y+'" aria-label="Ver video: '+esc(n.titulo)+'"><img src="'+esc(n.imagen||ytMini(y))+'" alt="" loading="lazy" data-err="mini"><span class="pr-yt-ph" aria-hidden="true">'+esc(n.medio)+'</span><span class="pr-play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z"/></svg></span></button><span class="pr-medio">'+esc(n.medio)+'</span><b>'+esc(n.titulo)+'</b><span class="pr-pie">'+esc(fechaPrensa(n.fecha))+'<a href="'+esc(n.url)+'" target="_blank" rel="noopener">Ver en YouTube →</a></span></article>';
      return '<a class="pr-nota rv'+d+'" href="'+esc(n.url)+'" target="_blank" rel="noopener">'+(n.imagen?'<span class="pr-im"><img src="'+esc(n.imagen)+'" alt="" loading="lazy"></span>':'')+'<span class="pr-medio">'+esc(n.medio)+'</span><b>'+esc(n.titulo)+'</b><span class="pr-pie">'+esc(fechaPrensa(n.fecha))+'<em>Leer nota →</em></span></a>';}).join('')+'</div></section>';}
  var YT_OK=null;(function(){var i=new Image(),t0=setTimeout(function(){if(YT_OK===null)YT_OK=false;},4000);i.onload=function(){clearTimeout(t0);YT_OK=i.naturalWidth>0;};i.onerror=function(){clearTimeout(t0);YT_OK=false;};i.src='https://i.ytimg.com/vi/XMh3yZOPyrs/default.jpg';})();
  document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.pr-yt');if(!b)return;
    if(YT_OK!==true||b.classList.contains('sin-mini')){window.open('https://www.youtube.com/watch?v='+b.dataset.yt,'_blank','noopener');return;}var f=document.createElement('iframe');
    f.src='https://www.youtube-nocookie.com/embed/'+b.dataset.yt+'?autoplay=1&rel=0&modestbranding=1';f.title=b.getAttribute('aria-label');f.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';f.allowFullscreen=true;f.className='pr-frame';b.replaceWith(f);});
  var GAL_ETI=['img/historia-taller-serigrafia.jpg','img/fot-taller-sonrisas.jpg','img/fot-taller-empaque.jpg','img/fot-taller-armado.jpg'];
  var CATALOGO_PDF='img/catalogo-la-ranatela-2026.pdf';
  var IMPACTO=[['101','trabajadores con discapacidad','con trabajo formal e ingresos'],['17','años en Maipú','desde 2009, con producción propia'],['+150','pedidos exitosos','para empresas, en lo que va de 2026']];
  var SOLUCIONES=[
    {t:'Regalos empresariales',d:'Cajas navideñas, sets materos y de asado, kits para fechas especiales. Con tu marca y el mensaje que quieras dar.',im:'img/productos-caja-navidena-felices-fiestas.jpg',alt:'Caja navideña con pan dulce, turrón y vino'},
    {t:'Merchandising',d:'Bolsas, gorras, pilusos, neceseres y mochilas personalizadas en serigrafía, sublimación o bordado.',im:'img/fot-bolsas-ypf.jpg',alt:'Bolsas con logo impreso colgadas para secar en el taller'},
    {t:'Packaging',d:'Bolsas de friselina y lienzo, cajas y envoltorios con tu identidad, para tus productos y puntos de venta.',im:'img/fot-taller-tazas.jpg',alt:'Manos embolsando tazas personalizadas una por una'},
    {t:'Eventos y congresos',d:'Kits de bienvenida, bolsas y accesorios para congresos, ferias y lanzamientos, en la cantidad que necesites.',im:'img/fot-taller-bolsa-familia.jpg',alt:'Bolsa de lienzo impresa para una campaña institucional'}
  ];
  var EQUIPO=[
    {im:'img/isla-serigrafia.jpg',vid:'img/isla-serigrafia.mp4',alt:'Trabajadoras imprimiendo bolsas en el pulpo de serigrafía',t:'Serigrafía',d:'Corte, serigrafía y troquelado'},
    {im:'img/isla-costura.jpg',vid:'img/isla-costura.mp4',alt:'Manos guiando la tela en la máquina de coser',t:'Costura',d:'Confección de cada pieza'},
    {im:'img/isla-terminado.jpg',vid:'img/isla-terminado.mp4',alt:'Bolsa térmica terminada, revisada antes de la entrega',t:'Control y packaging',d:'Control de calidad, armado y embalaje'}
  ];
  var MARCAS_TXT=['Vendimia','Asamblea del BID · 2018'];
  function logosConfianza(){
    var cl=sec('inicio','clientes');
    var it=(cl.items||[]).filter(function(x){return !/Pampa/i.test(x.title);});
    var l=it.map(function(x){return '<img src="'+img(x.logo)+'" alt="'+esc(x.alt)+'">';}).join('')+MARCAS_TXT.map(function(t){return '<span class="marca-txt">'+esc(t)+'</span>';}).join('');
    return '<div class="logos rv d1"><div class="fila">'+l+l.replace(/alt="[^"]*"/g,'alt=""')+'</div></div>';
  }
  function impacto(){
    return '<div class="impacto">'+IMPACTO.map(function(x,i){return '<div class="imp rv'+(i?' d'+i:'')+'"><span class="imp-n" data-cuenta="'+x[0]+'">'+x[0]+'</span><span class="imp-t">'+esc(x[1])+'</span><span class="imp-s">'+esc(x[2])+'</span></div>';}).join('')+'</div>';
  }
  function solucionesGrid(conBoton){
    return '<div class="soluciones">'+SOLUCIONES.map(function(s,i){return '<article class="sol rv'+(i%2?' d1':'')+'"><span class="sol-im"><img src="'+s.im+'" alt="'+esc(s.alt)+'" loading="lazy"></span><div class="sol-tx"><span class="sol-n">0'+(i+1)+'</span><h3>'+esc(s.t)+'</h3><p>'+esc(s.d)+'</p>'+(conBoton?'<a class="link" href="#/contacto?'+encodeURIComponent('Otro / desarrollo a medida')+'">Pedir presupuesto →</a>':'')+'</div></article>';}).join('')+'</div>';
  }
  function etiBanda(){
    return '<section class="eti-banda"><div class="cont g2 sec-pad"><div class="pila rv"><p class="ojal">ETI · Encuentro de Trabajo Inclusivo</p><h2 class="h2">Una noche para conocer el trabajo de cerca.</h2><p class="lead">Empresas, trabajadores y equipos de La Rañatela en un mismo lugar. 20 de noviembre en Bodegas López, Mendoza.</p><div class="fila-btn"><a class="btn" href="#/eti">Conocé el ETI</a><a class="btn am" href="#/eti?sumate">Sumá a tu empresa</a></div></div><div class="eti-sigla rv d2" aria-hidden="true">ETI</div></div></section>';
  }

  // Banners ya diseñados de ETI y Tejiendo Oportunidades (los mismos de laranatela.com)
  var BANNERS={
    eti:{href:'#/eti',ext:false,base:'img/banners/eti',
      alt:'ETI, Encuentro de Trabajo Inclusivo. El 20 de noviembre en Bodegas López, Mendoza. Una nueva conversación entre empresas y trabajo inclusivo. Sumá a tu empresa. Organizan La Rañatela y Lianyeli.'},
    to:{href:'#/tejiendo-oportunidades',ext:false,base:'img/banners/tejiendo-oportunidades',
      alt:'Campaña Tejiendo Oportunidades 2026. Sumale valor a tu mate, sumate. Set matero de bolso, yerbero y azucarero hechos en La Rañatela, con los nombres de quienes lo hicieron estampados en la tela. 20.000 pesos. Conseguí el tuyo.'},
    ly:{href:'https://lianyeli.laranatela.com',ext:true,base:'img/banners/lianyeli',
      alt:'Lianyeli, espacio terapéutico en Cruz de Piedra, Maipú. Un lugar para aprender, trabajar y crecer. Desde el primer trabajo hasta después de jubilarse. Conocé Lianyeli en lianyeli.laranatela.com.'}
  };
  function banner(k){var b=BANNERS[k];if(CMS.general.banners===false)return '';
    return '<section class="cont banner-sec rv" aria-label="'+({eti:'ETI',to:'Tejiendo Oportunidades',ly:'Lianyeli'})[k]+'"><a class="banner-campania" data-banner href="'+b.href+'"'+(b.ext?' target="_blank" rel="noopener"':'')+
      ' data-video-escritorio="'+b.base+'-escritorio-1920x640.mp4" data-video-celular="'+b.base+'-celular-1080x1080.mp4">'+
      '<picture><source media="(max-width: 767px)" srcset="'+b.base+'-celular-1080x1080.webp" width="1080" height="1080"><img src="'+b.base+'-escritorio-1920x640.webp" width="1920" height="640" alt="'+esc(b.alt)+'" loading="lazy"></picture></a></section>';
  }
  window.__banners=function(raiz){
    if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    raiz.querySelectorAll('[data-banner]').forEach(function(bn){
      var cel=matchMedia('(max-width: 767px)').matches, v=document.createElement('video');
      v.muted=true;v.playsInline=true;v.preload='auto';v.tabIndex=-1;v.setAttribute('aria-hidden','true');
      var quitar=function(){v.remove();}, mostrar=function(){v.classList.add('lista');};
      var mq=matchMedia('(max-width: 767px)');v.addEventListener('error',quitar);v.addEventListener('playing',mostrar,{once:true});
      var cambio=function(){quitar();if(mq.removeEventListener)mq.removeEventListener('change',cambio);};if(mq.addEventListener)mq.addEventListener('change',cambio);
      var cargado=false, cargar=function(){if(cargado)return;cargado=true;var im=bn.querySelector('img'),cs=im&&im.currentSrc||'';if(cs)cel=cs.indexOf('celular')>=0;v.src=cel?bn.dataset.videoCelular:bn.dataset.videoEscritorio;bn.appendChild(v);if(im)im.addEventListener('load',function(){if((im.currentSrc.indexOf('celular')>=0)!==cel)quitar();});};
      var cerca=new IntersectionObserver(function(e){if(!e[0].isIntersecting)return;cerca.disconnect();cargar();},{rootMargin:'600px 0px'});cerca.observe(bn);
      var vis=new IntersectionObserver(function(e){if(!e[0].isIntersecting)return;vis.disconnect();cargar();var pr=v.play();if(pr&&pr.catch)pr.catch(quitar);},{threshold:.35});vis.observe(bn);
    });
  };

  var _nov=R.novedades;
  var NAVIDAD=[['img/novedades-caja-navidena-campana.jpg','Caja navideña de La Rañatela con diseño geométrico en rojo y azul, junto a pan dulce, budín y una botella de vino','Caja navideña de diseño propio'],['img/productos-caja-navidena-felices-fiestas.jpg','Caja navideña Felices Fiestas con pan dulce, turrón y vino','Caja Felices Fiestas'],['img/productos-bolsa-navidena-mendoza-shopping.jpg','Bolsa navideña personalizada para Mendoza Shopping','Bolsa navideña para Mendoza Shopping']];
  function botonSonido(){return '<button type="button" class="vid-son" aria-pressed="false"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path class="on" d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path class="off" d="M16 9.5l5 5m0-5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg><span>Activar sonido</span></button>';}
  function videoNavidad(){return '<section class="cont g2 sec-pad" style="padding-top:0"><div class="video rv"><video src="img/navidad-dibujos.mp4" poster="img/navidad-dibujos.jpg" muted loop playsinline preload="none" data-auto aria-label="Trabajadores de La Rañatela cuentan qué dibujaron para la caja navideña"></video>'+botonSonido()+'</div><div class="rv d2 pila">'+ojal('Detrás de la caja',true)+'<h2 class="h2">Cada dibujo de la caja tiene autor</h2><p class="lead">Las ilustraciones de la caja navideña salieron de un taller de dibujo con trabajadores de La Rañatela: el moño, el muñeco de nieve, la galletita de jengibre. Escuchalos contar qué hizo cada uno.</p><div><a class="btn" href="#/contacto?'+encodeURIComponent('Otro / desarrollo a medida')+'">Quiero la caja para mi empresa</a></div></div></section>';}
  // Sonido: un solo video suena a la vez; los demás quedan en silencio.
  if(!window.__vidSonOk){window.__vidSonOk=1;document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.vid-son');if(!b)return;var v=b.parentNode.querySelector('video');if(!v)return;var on=v.muted;
    document.querySelectorAll('.vid-son[aria-pressed="true"]').forEach(function(o){if(o===b)return;var ov=o.parentNode.querySelector('video');if(ov)ov.muted=true;o.setAttribute('aria-pressed','false');o.querySelector('span').textContent='Activar sonido';});
    v.muted=!on;if(on){try{v.currentTime=0;}catch(_){}var p=v.play();if(p&&p.catch)p.catch(function(){});}b.setAttribute('aria-pressed',String(on));b.querySelector('span').textContent=on?'Silenciar':'Activar sonido';});}
  function galeriaNavidad(){return '<section class="cont sec-pad" style="padding-top:0"><div class="cat-cab rv"><h2 class="h2">Regalos navideños que hicimos</h2><a class="link" href="#/contacto?'+encodeURIComponent('Otro / desarrollo a medida')+'">Pedir presupuesto →</a></div><div class="nav-gal">'+NAVIDAD.map(function(n,i){return '<figure class="rv'+(i?' d'+i:'')+'"><img src="'+n[0]+'" alt="'+esc(n[1])+'" loading="lazy"><figcaption>'+esc(n[2])+'</figcaption></figure>';}).join('')+'</div></section>';}
  function tambienNov(){return '<section class="cont sec-pad" style="padding-top:0"><h2 class="h2 rv" style="margin-bottom:24px">También en La Rañatela</h2><div class="tamb">'+
    '<a class="tamb-eti rv" href="#/eti"><img src="img/eti-sigla-relieve-sobre-azul.png" alt="" width="1340" height="648"><span class="tamb-tx"><b>ETI · Encuentro de Trabajo Inclusivo</b><span>20 de noviembre en Bodegas López. Una nueva conversación entre empresas y trabajo inclusivo.</span><em>Sumá a tu empresa →</em></span></a>'+
    '<a class="tamb-to rv d1" href="#/tejiendo-oportunidades"><img src="img/to/negro-2-estudio.jpg" alt="" loading="lazy"><span class="tamb-tx"><b>Tejiendo Oportunidades 2026</b><span>Set matero hecho en La Rañatela: cada set lleva el nombre de quien lo hizo.</span><em>Conseguí el tuyo →</em></span></a></div></section>';}
  R.novedades=function(){var h=_nov.apply(this,arguments),k=h.indexOf('</section>');return k<0?h:h.slice(0,k+10)+galeriaNavidad()+videoNavidad()+banner('eti')+banner('to')+banner('ly')+h.slice(k+10);};

  // INICIO: producto primero, misión después
  R.inicio=function(){
    var dest=D.productos.filter(function(p){return p.destacado;}).sort(function(a,b){return a.orden-b.orden;}).slice(0,6);
    var col=['tote-lienzo','mochila-urbana','set-matero'].map(prodPorSlug).filter(Boolean);
    var html='<section class="cont hero hero-prod g2"><div class="col">'+ojal('Hecho en Maipú, Mendoza · desde 2009',true)+
      '<h1 class="h1">Merchandising y productos textiles <span style="color:var(--accent)">con la imagen de tu empresa</span></h1>'+
      '<p class="lead entra e3">Diseñamos, confeccionamos y personalizamos en nuestro propio taller: merchandising, ropa de trabajo y deportiva, y packaging con tu marca. Entregas desde 5 días hábiles.</p>'+
      '<div class="entra e4 fila-btn"><a class="btn" href="#/productos">Ver catálogo</a><a class="btn am" href="#/contacto">Pedir presupuesto</a></div></div>'+
      '<div class="collage entra e3">'+col.map(function(p,i){return '<a class="col-'+i+'" href="#/productos/'+p.slug+'"><img src="'+img(p.imagen)+'" alt="'+esc(p.imagenAlt)+'"'+(i?' loading="lazy"':'')+'><span>'+esc(p.nombre)+'</span></a>';}).join('')+'</div></section>';
    html+='<section aria-label="Confiaron en nosotros" style="padding-block:clamp(8px,2vw,24px) clamp(40px,5vw,64px);position:relative;z-index:1"><div class="cont rv">'+ojal('Confiaron en nosotros')+'<h2 class="h2" style="margin:10px 0 28px">Trabajamos para empresas de primera línea</h2></div>'+logosConfianza()+'</section>';
    html+=banner('eti');
    html+=banner('to');
    html+=banner('ly');
    html+='<section class="cont" style="padding-block:clamp(40px,6vw,72px) clamp(56px,8vw,96px)"><div class="cat-cab rv"><h2 class="h2">Lo más pedido</h2><a class="link" href="#/productos">Ver los 30 productos →</a></div><div class="g3" style="margin-top:28px">'+dest.map(tarjetaProd).join('')+'</div></section>';
    html+='<section class="cont" style="padding-bottom:clamp(56px,8vw,96px)"><a class="pz-promo rv" href="#/personalizar"><div class="pz-promo-tx"><p class="ojal">Probá tu logo '+'<span class="beta">Beta</span>'+'</p><h2 class="h2">Mirá tu logo en nuestros productos antes de pedir</h2><p class="lead">Elegí una bolsa, una mochila o una gorra, subí tu logo y te mostramos cómo queda, si es apto para imprimir y un plazo estimado.</p><span class="btn">Probar ahora</span></div><div class="pz-promo-im" aria-hidden="true"><img src="img/productos-tote-lienzo-plana.jpg" alt="" loading="lazy"></div></a></section>';
    html+='<section class="banda"><div class="cont g2 sec-pad"><div class="foto-cuadro rv"><img src="img/fot-taller-armado.jpg" alt="Manos serigrafiando una bolsa en el taller de La Rañatela" loading="lazy" style="aspect-ratio:4/3"></div><div class="rv d2 pila">'+ojal('Quién los hace')+'<h2 class="h2">Ensamblando habilidades, tejiendo oportunidades</h2><p class="lead">Cada pedido sostiene el trabajo de más de 100 trabajadores con discapacidad. No es beneficencia: es trabajo, con ingresos, hecho con oficio.</p><div><a class="btn" href="#/nosotros">Conocé al equipo</a></div></div></div></section>';
    html+='<section class="cont sec-pad" aria-label="Impacto">'+impacto()+'</section>';
    html+='<section class="cont sec-pad" style="padding-top:0"><div class="cat-cab rv"><h2 class="h2">Soluciones para empresas</h2><a class="link" href="#/empresas">Ver todas →</a></div>'+solucionesGrid(false)+'</section>';
    return html;
  };

  // EMPRESAS: soluciones profesionales
  // Para el área de compras: razones concretas, verificables, sin apelar a la lástima
  var PORQUE0=[
      ['Un proveedor, no una donación','Facturamos como cualquier proveedor: ofrecemos factura A o C de acuerdo a las modalidades o exigencias del cliente. Pago de contado, por transferencia, Mercado Pago o cheque a 30, 60 o 90 días, a acordar con cada cliente. Lo que cambia es quién lo fabrica: un equipo de más de 100 trabajadores con discapacidad, con empleo formal.'],
      ['Prioridad en compras del Estado','La Ley 22.431 (art. 8 bis) obliga al Estado nacional, sus organismos, empresas estatales y concesionarias de servicios públicos a priorizar, a igual costo, las compras a empresas que contratan personas con discapacidad. Si tu organización está en ese grupo, comprarle a La Rañatela cumple con esa prioridad.'],
      ['Taller protegido con régimen propio','La Rañatela está inscripta en el Régimen Federal de Empleo Protegido (Ley 26.816) como Taller Protegido Especial para el Empleo (TPEE). El régimen establece preferencias para los talleres protegidos en las contrataciones del sector público nacional (Decreto 1771/2015).'],
      ['Plazos reales','Desde 5 días hábiles, según el volumen, el momento del año y la disponibilidad del taller. Los pedidos grandes de fin de año conviene reservarlos con meses de anticipación.'],
      ['Un dato para tu reporte','Cada pedido sostiene puestos de trabajo formales en Maipú y, si elegís la línea de reciclado, recupera material que iba a descarte. Te damos los datos del pedido (unidades, horas de trabajo, kilos recuperados) para tu reporte de sostenibilidad o de compras inclusivas.']
    ];
  function porQueComprar(){
    var it=PORQUE0.map(function(x,i){var o=(SEC.porque||[])[i]||{};return [o.t||x[0],o.x||x[1]];});
    return '<section class="cont sec-pad porque"><div class="cat-cab rv"><h2 class="h2">Por qué comprarle a La Rañatela</h2><span class="cuenta">Para el área de compras</span></div><div class="g2 porque-g porque-5">'+it.map(function(x,i){return '<article class="rv'+(i?' d'+Math.min(3,i):'')+'"><h3>'+esc(x[0])+'</h3><p>'+esc(x[1])+'</p></article>';}).join('')+'</div><p class="porque-nota rv">Las referencias legales son orientativas: cada organismo aplica su propia reglamentación de compras. Si tu área de compras necesita algo más, <a href="#/contacto?producto='+encodeURIComponent('Todavía no lo tengo definido')+'">escribinos</a>.</p></section>';}

  // Casos de clientes (texto de Lorena, 15/10/2026). Sin montos: los convenios tienen confidencialidad. Fotos: solo las que ya tenemos; el resto se suma desde el Drive.
  var CASOS=[
    {id:'emesa',cliente:'EMESA',logo:'img/clientes-emesa.png',cifra:'5.110',unidad:'unidades en el primer encargo',titulo:'Nuestro primer Socio Colaborador',
     texto:'Empresa Mendocina de Energía fue la primera en sumarse al Programa Socios Colaboradores: un convenio por 24 meses firmado en enero de 2026. El primer encargo fueron 1.000 pilusos, 1.000 gorras serigrafiadas, 450 neceseres bordados, 300 organizadores de neoprene para auto, 150 ecobolsas, 100 bolsas para vino, 60 loncheras térmicas y 50 sets de asador. Después vinieron las mochilas y los kits del Mundial.',
     foto:'img/productos-gorra-trucker.jpg',fotoAlt:'Gorras trucker azul marino con el logo de EMESA serigrafiado, alineadas en el taller',tecnica:'Serigrafía y bordado',anio:'2026',repite:true},
    {id:'aesa',cliente:'Astra Evangelista (AESA, grupo YPF)',logo:'img/clientes-aesa.png',cifra:'7.500',unidad:'kits del Mundial',titulo:'Kits del Mundial y 3.500 camisas que no se tiraron',
     texto:'Para el Mundial 2026 armamos 7.500 kits: bandera argentina, piluso, cuello tipo puff y un banderín de 10 metros. En otro trabajo, 3.500 camisas de jean nuevas que la empresa no podía usar por normas de higiene y seguridad se transformaron en 3.500 delantales de asador, 3.500 mochilas y 7.000 cartucheras.',
     foto:'img/productos-delantal-jean.jpg',fotoAlt:'Delantal de asador confeccionado a partir de una camisa de jean recuperada',tecnica:'Varias técnicas',anio:'2026',repite:true},
    {id:'ypf',cliente:'YPF',logo:'img/clientes-ypf.png',foto:'img/casos-ypf-lonchera.jpg',fotoAlt:'Lonchera térmica YPF terminada, abierta, con el interior aislante a la vista',cifra:'3.000',unidad:'loncheras por año',titulo:'Cuatro años seguidos',
     texto:'Para la petrolera más grande de la Argentina hacemos unas 3.000 loncheras térmicas por año: tela tracker con foil interior que conserva el frío y el calor, y el logo en serigrafía. Empezamos en 2023 y 2026 es el cuarto año consecutivo.',
     tecnica:'Serigrafía',anio:'2023 – 2026',repite:true},
    {id:'arcor',cliente:'Arcor',logo:'img/clientes-arcor.png',cifra:'10.000',unidad:'delantales para Chocolina',titulo:'Diez mil delantales violetas',
     texto:'En 2025 confeccionamos 10.000 delantales en tropical mecánico violeta, con impresión en serigrafía, para Chocolina. Antes, en 2022 y 2023, un kit de cocina (delantal de gabardina, agarradera e individual) que llegó de regalo a la gente de Arcor en todo el país.',
     tecnica:'Serigrafía',anio:'2022 – 2025',repite:true},
    {id:'superconectados',cliente:'Superconectados',cifra:'Toda',unidad:'la ropa del personal',titulo:'Cambio de marca sin tirar la ropa',
     texto:'Cuando Supercanal pasó a llamarse Superconectados, le cambiamos el logo a todas las prendas del personal. Es el trabajo que nadie quiere hacer, y evita descartar ropa en buen estado. Si tu marca cambia, la ropa que ya compraste se puede recuperar.',
     tecnica:'Reconversión de prendas',repite:true},
    {id:'bago',cliente:'Bagó',cifra:'Récord',unidad:'de tiempo de entrega',titulo:'Loncheras para un laboratorio líder',
     texto:'Loncheras para Bagó, uno de los laboratorios más importantes del país. El pedido nos llegó a través de una agencia de publicidad y con plazo corto: salió en tiempo récord y con la calidad que esperaban.',
     tecnica:'Serigrafía',repite:false}
  ];
  var CASOS0=CASOS.slice(), SEC={};
  function sx(k,def){var x=SEC[k];return (x===undefined||x===null||x===''||(Array.isArray(x)&&!x.length))?def:x;}
  var SOCIOS_B0=[{t:'No es una donación.',x:'Es una contraprestación productiva, con factura y plazos comprometidos.'},{t:'Impacto medible.',x:'Informes periódicos con horas de trabajo generadas, volumen producido y alcance social, listos para tu reporte.'},{t:'Producción programada.',x:'Los pedidos del año se planifican juntos, y los de fin de año se reservan con tiempo.'}];
  var SOCIOS0={titulo:'Una parte de lo que ya comprás, hecha acá.',lead:'Un Socio Colaborador es una empresa que firma un convenio de 12 a 24 meses para que una parte de lo que ya compra (ropa de trabajo, merchandising, packaging, regalos) se produzca en La Rañatela. Se acuerdan productos y fechas de antemano, así el taller programa la producción y la empresa se asegura entregas.',cifra:'24',unidad:'meses de convenio',casoTitulo:'EMESA, el primer convenio',casoTexto:'Enero de 2026. Productos y fechas fijados de antemano, primer encargo de 5.110 unidades cumplido en plazo, y nuevos pedidos después: mochilas, kits del Mundial y los regalos de fin de año.'};
  function casosClientes(){
    var lista=CASOS.filter(function(c){return !c.oculto;});if(!lista.length)return '';
    return '<section class="cont sec-pad casos" id="casos"><div class="cat-cab rv"><h2 class="h2">'+esc(sx('casosTitulo','Trabajos que ya hicimos'))+'</h2><span class="cuenta">'+esc(sx('casosSub','Grandes volúmenes, años de trabajo'))+'</span></div>'+
      '<p class="lead rv mt16">'+esc(sx('casosLead','Clientes con años de relación y pedidos de miles de unidades. Casi todos siguen comprando.'))+'</p><div class="casos-g">'+lista.map(function(c,i){
      return '<article class="caso-c rv'+(i?' d'+Math.min(3,i%4):'')+(c.foto?' con-foto':'')+'">'+(c.foto?'<figure class="caso-foto"><img src="'+esc(c.foto)+'" alt="'+esc(c.fotoAlt||'')+'" loading="lazy"></figure>':'')+
        '<div class="caso-tx"><div class="caso-cab">'+(c.logo?'<img class="caso-logo" src="'+esc(c.logo)+'" alt="'+esc(c.cliente)+'" loading="lazy">':'<b class="caso-nombre">'+esc(c.cliente)+'</b>')+'</div>'+
        '<p class="caso-cifra"><b>'+esc(c.cifra)+'</b><span>'+esc(c.unidad)+'</span></p><h3>'+esc(c.titulo)+'</h3><p>'+esc(c.texto)+'</p>'+
        '<ul class="caso-meta">'+(c.tecnica?'<li>'+esc(c.tecnica)+'</li>':'')+(c.anio?'<li>'+esc(c.anio)+'</li>':'')+(c.repite?'<li class="rep">Volvieron a comprar</li>':'')+'</ul></div></article>';}).join('')+'</div></section>';
  }
  function sociosColaboradores(){
    var S=SOCIOS0, B=sx('sociosB',SOCIOS_B0);
    return '<section class="banda socios" id="socios"><div class="cont g2 sec-pad"><div class="pila rv">'+ojal('Programa Socios Colaboradores')+'<h2 class="h2">'+esc(sx('sociosTitulo',S.titulo))+'</h2>'+
      '<p class="lead">'+esc(sx('sociosLead',S.lead))+'</p>'+
      '<ul class="socios-l">'+B.filter(function(b){return b&&(b.t||b.x);}).map(function(b){return '<li><b>'+esc(b.t||'')+'</b> '+esc(b.x||'')+'</li>';}).join('')+'</ul>'+
      '<div class="fila-btn"><a class="btn" href="#/contacto?producto='+encodeURIComponent('Programa Socios Colaboradores')+'&cantidad=">Quiero ser Socio Colaborador</a><a class="btn am" href="#/eti">Conocé el ETI</a></div></div>'+
      '<aside class="socios-caso rv d1"><img src="'+esc(sx('sociosLogo','img/clientes-emesa.png'))+'" alt="" class="caso-logo"><p class="caso-cifra"><b>'+esc(sx('sociosCifra',S.cifra))+'</b><span>'+esc(sx('sociosUnidad',S.unidad))+'</span></p><h3>'+esc(sx('sociosCasoTitulo',S.casoTitulo))+'</h3><p>'+esc(sx('sociosCasoTexto',S.casoTexto))+'</p><a href="#/empresas?casos" data-ancla="casos">Ver el caso completo</a></aside></div></section>';
  }
  R.empresas=function(q){
    var t=sec('servicios','tecnicas'), ta=sec('servicios','taller'), rc=sec('servicios','reciclado'), st=sec('contacto','como-trabajamos');
    function vid(v,son){v=v||{};return '<div class="video rv d2"><video src="'+img(v.src)+'" poster="'+img(v.poster)+'" muted loop playsinline autoplay preload="none"></video>'+(son?botonSonido():'')+'</div>';}
    var html='<section class="cont pag-cab">'+ojal('Para empresas',true)+'<h1 class="h1">Soluciones para empresas</h1><p class="lead entra e3">Regalos, merchandising, packaging y kits para eventos, hechos a medida en nuestro taller de Maipú. Te asesoramos desde la idea hasta la entrega.</p><div class="fila-btn entra e4"><a class="btn" href="#/contacto">Pedir presupuesto</a><a class="btn am" href="#/personalizar">Probá tu logo <span class="beta">Beta</span></a><a class="btn am" href="'+CATALOGO_PDF+'" target="_blank" rel="noopener">Descargar catálogo (PDF)</a></div>'+
      '<ul class="datos-b2b entra e4"><li><b>100</b> unidades de pedido mínimo</li><li><b>Desde 5</b> días hábiles de entrega</li><li><b>100%</b> a medida: material, tamaño y gráfica</li></ul></section>';
    html+='<section class="cont" style="padding-bottom:clamp(56px,7vw,96px)">'+solucionesGrid(true)+'</section>';
    html+='<section aria-label="Confiaron en nosotros" style="padding-bottom:clamp(56px,7vw,96px);position:relative;z-index:1"><div class="cont rv">'+ojal('Confiaron en nosotros')+'</div>'+logosConfianza()+'</section>';
    html+=casosClientes();
    html+=sociosColaboradores();
    html+=porQueComprar();
    html+='<section class="banda"><div class="cont sec-pad"><h2 class="h2 rv">'+esc(st.heading)+'</h2><ol class="linea pasos rv">'+(st.items||[]).map(function(it,i){return '<li class="rv'+(i?' d'+Math.min(3,i):'')+'"><span class="an">0'+it.number+'</span><h3>'+esc(it.title)+'</h3><p>'+esc(it.text)+'</p></li>';}).join('')+'</ol></div></section>';
    html+='<section class="cont sec-pad"><h2 class="h2 rv">'+esc(t.heading)+'</h2>'+ps(t.paragraphs,'lead rv mt16')+'<div class="g3 tarjetas">'+(t.items||[]).map(function(it,i){return '<article class="tarj rv'+(i?' d'+i:'')+'">'+ico(it.title)+'<h3>'+esc(it.title)+'</h3><p>'+esc(it.text)+'</p><ul>'+(it.bullets||[]).map(function(b){return '<li>'+esc(b)+'</li>';}).join('')+'</ul></article>';}).join('')+'</div></section>';
    html+='<section class="banda"><div class="cont g2 sec-pad"><div class="rv pila"><h2 class="h2">'+esc(ta.heading)+'</h2>'+ps(ta.paragraphs,'lead')+'</div>'+vid((ta.videos||[])[0],true)+'</div></section>';
    html+='<section class="cont g2 sec-pad">'+vid((rc.videos||[])[0])+'<div class="rv pila">'+ojal('Reciclado textil',true)+'<h2 class="h2">'+esc(rc.heading)+'</h2>'+ps(rc.paragraphs,'lead')+'<div>'+btns(rc.buttons)+'</div></div></section>';
    html+='<section class="cont sec-pad" style="padding-top:0"><div class="caja rv"><div class="pila"><h2 class="h2">¿Tenés algo en mente?</h2><p class="lead">Contanos qué necesitás, la cantidad y para cuándo. Te enviamos el presupuesto sin cargo.</p><div class="fila-btn"><a class="btn" href="#/contacto">Pedir presupuesto</a><a class="btn am" href="'+CATALOGO_PDF+'" target="_blank" rel="noopener">Descargar catálogo (PDF)</a></div></div></div></section>';
    return html;
  };

  // NOSOTROS: la historia y el equipo
  R.nosotros=function(){
    var r=sec('historia','relato'), m=sec('historia','mas-que-un-taller');
    var p=r.paragraphs||[];
    var html='<section class="cont pag-cab">'+ojal('Nosotros',true)+'<h1 class="h1">De Italia a Maipú</h1><p class="lead entra e3">'+esc(sec('historia','hero').paragraphs[0])+'</p></section>';
    html+='<section class="cont capitulos">'+
      '<article class="capi rv"><span class="capi-n">01</span><h2 class="h3">La Ragnatela italiana</h2><p>'+esc(p[0])+'</p></article>'+
      '<article class="capi rv d1"><span class="capi-n">02</span><h2 class="h3">Maipú, 2009</h2><p>Arrancamos con 15 personas con discapacidad y 8 supervisores, y la serigrafía como primer oficio. Después de varias mudanzas, en 2013 llegó el lugar propio.</p></article>'+
      '<article class="capi rv d2"><span class="capi-n">03</span><h2 class="h3">Hoy</h2><p>101 trabajadores con discapacidad y unas 150 personas vinculadas al taller, produciendo para empresas de todo el país.</p></article></section>';
    html+='<section class="cont articulo"><figure class="fig der rv"><img src="img/fot-serigrafia-retrato.jpg" alt="Trabajador del taller preparando una impresión en serigrafía" loading="lazy"><figcaption>La serigrafía fue el primer oficio, y sigue siendo el corazón del taller.</figcaption></figure><p class="rv">'+esc(p[1])+'</p><blockquote class="rv">'+esc(p[2])+'</blockquote><p class="rv">'+esc(p[3])+'</p></section>';
    html+='<section class="banda"><div class="cont sec-pad"><div class="cat-cab rv" style="border-color:rgba(255,255,255,.2)"><h2 class="h2">El equipo en acción</h2><span class="cuenta" style="color:var(--banda-fg2)">Cada isla, un oficio</span></div><div class="equipo">'+EQUIPO.map(function(e,i){return '<figure class="retrato rv'+(i?' d'+i:'')+'">'+(e.vid?'<video src="'+e.vid+'" poster="'+e.im+'" muted loop playsinline preload="none" data-auto aria-label="'+esc(e.alt)+'"></video>':'<img src="'+e.im+'" alt="'+esc(e.alt)+'" loading="lazy">')+'<figcaption><b>'+esc(e.t)+'</b><span>'+esc(e.d)+'</span></figcaption></figure>';}).join('')+'</div></div></section>';
    html+='<section class="cont sec-pad"><div class="cat-cab rv"><h2 class="h2">Conocé el taller</h2><span class="cuenta">Video institucional · 6 min · con sonido</span></div><div class="vid-inst rv"><video src="img/video-institucional.mp4" poster="img/fot-taller-sonrisas.jpg" controls playsinline preload="none" aria-label="Video institucional de La Rañatela"></video></div></section>';
    html+='<section class="cont sec-pad" style="padding-top:0">'+impacto()+'</section>';
    html+='<section class="cont g2 sec-pad" style="padding-top:0"><div class="foto-cuadro ancha rv"><img src="img/fot-mas-taller.jpg" alt="Trabajadores compartiendo una actividad en una mesa larga del taller" loading="lazy"></div><div class="rv d2 pila"><h2 class="h2">'+esc(m.heading)+'</h2>'+ps(m.paragraphs,'lead')+'<div>'+btns(m.buttons)+'</div></div></section>';
    html+=prensaSeccion();
    return html;
  };

  // ETI: el evento propio de la marca
  // ETI: la página usa la identidad del ETI (azul eléctrico, hueso, grafito, bordó; Bricolage Grotesque + Manrope)
  function etiSigla(cls){
    return '<svg class="'+cls+'" viewBox="0 0 330 132" role="img" aria-label="ETI"><defs><radialGradient id="eti-nudo" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#B0475A"/><stop offset=".55" stop-color="#7A2131"/><stop offset="1" stop-color="#561522"/></radialGradient></defs>'+
      '<g fill="none" stroke="#F6F3ED" stroke-width="22" stroke-linecap="round"><path d="M14 16H92M14 66H72M14 116H92M126 16H200M163 58V116M234 16V116"/></g>'+
      '<circle cx="290" cy="104" r="24" fill="url(#eti-nudo)"/></svg>';
  }
  // Módulos de trama: círculos en grilla (separación 8 %) unidos con curvas cóncavas, solo ortogonales
  function etiTrama(celdas,color,nudo){ // celdas: [[col,fila],...] en orden de cadena
    var r=50,s=108,d='',pz='';
    celdas.forEach(function(c,i){var x=c[0]*s+r,y=c[1]*s+r;pz+='<circle cx="'+x+'" cy="'+y+'" r="'+r+'"/>';
      var n=celdas[i+1];if(!n||i%2)return;var nx=n[0]*s+r,ny=n[1]*s+r,k=r*.64,h=r*.36;
      if(ny===y){var a=x+r*.77,b=nx-r*.77,m=(x+nx)/2;d+='M'+a+' '+(y-k)+'Q'+m+' '+(y-h)+' '+b+' '+(y-k)+'L'+b+' '+(y+k)+'Q'+m+' '+(y+h)+' '+a+' '+(y+k)+'Z';}
      else{var a2=y+r*.77,b2=ny-r*.77,m2=(y+ny)/2;d+='M'+(x-k)+' '+a2+'Q'+(x-h)+' '+m2+' '+(x-k)+' '+b2+'L'+(x+k)+' '+b2+'Q'+(x+h)+' '+m2+' '+(x+k)+' '+a2+'Z';}
    });
    var W=0,H=0;celdas.forEach(function(c){W=Math.max(W,c[0]);H=Math.max(H,c[1]);});
    var ult=celdas[celdas.length-1];
    return '<svg viewBox="0 0 '+(W*s+2*r)+' '+(H*s+2*r)+'" aria-hidden="true" focusable="false"><g fill="'+color+'">'+pz+'<path d="'+d+'"/></g>'+(nudo?'<circle cx="'+(ult[0]*s+r)+'" cy="'+(ult[1]*s+r)+'" r="'+r+'" fill="#7A2131"/>':'')+'</svg>';
  }
  R.eti=function(q){
    var paradas=[['Ingreso','Credencial con nombre y empresa, y una cinta para la obra.'],['Islas de trabajo','Los equipos del taller muestran y explican cada etapa: corte, costura, control y packaging.'],['Tapeo','Vinos y cocina en un recorrido pensado para circular y conversar.'],['Proyección y firma','Casos reales de empresas y la firma de los nuevos Socios Colaboradores.'],['La obra','Cada invitado ata su cinta al telar: una red que crece edición tras edición.']];
    var tramaHero=etiTrama([[0,0],[0,1],[1,0],[2,0],[1,1],[1,2],[0,3],[1,3],[2,2],[2,3],[0,4],[0,5],[1,5],[2,5],[2,4],[3,4]],'#2A43B0',false);
    var html='<div class="cont nodo-ref" aria-hidden="true"></div><section class="eti-p eti-hero2"><div class="eti-trama-hero">'+tramaHero+'</div><div class="cont eti-hero-g">'+
      '<div class="eti-marca entra e2"><img class="eti-sigla2" src="img/eti-sigla-relieve-sobre-azul.png" width="1340" height="648" alt="ETI">'+'<p class="eti-leyenda">Encuentro de Trabajo Inclusivo</p></div>'+
      '<div class="eti-hero-tx"><p class="eti-ojal entra e2"><i></i>'+esc(FECHA_ETI)+' · Mendoza</p><h1 class="eti-h1">Una nueva conversación entre empresas y trabajo inclusivo.</h1>'+
      '<div class="eti-acc entra e4"><a class="eti-btn" href="#/eti?sumate">Sumá a tu empresa <span aria-hidden="true">→</span></a><a class="eti-btn2" href="https://www.instagram.com/eti.laranatela/" target="_blank" rel="noopener">Seguí el ETI</a></div>'+
      '<div class="eti-org entra e4"><span>Organizan</span><img src="img/eti-organizan.png" width="253" height="100" alt="La Rañatela y Lianyeli"></div></div></div></section>';
    html+='<section class="eti-p eti-claro"><div class="cont sec-pad eti-intro"><p class="eti-frase rv">No es una cena de beneficencia. Es una noche para ver el trabajo de cerca, conocerse y sumarse.</p>'+
      '<dl class="eti-datos rv d1"><div><dt>2026</dt><dd>Primera edición</dd></div><div><dt>'+esc(FECHA_ETI)+'</dt><dd>Bodegas López</dd></div><div><dt>Empresas</dt><dd>Con invitación</dd></div></dl></div></section>';
    html+='<section class="eti-p eti-claro"><div class="cont sec-pad" style="padding-top:0"><p class="eti-cap rv">La noche</p><h2 class="eti-h2 rv">Cinco paradas</h2><ol class="eti-paradas">'+paradas.map(function(x,i){return '<li class="rv'+(i?' d'+Math.min(3,i):'')+(i===4?' fin':'')+'"><span class="eti-n">'+(i+1)+'</span><h3>'+esc(x[0])+'</h3><p>'+esc(x[1])+'</p></li>';}).join('')+'</ol></div></section>';
    html+='<section class="eti-p eti-oscuro"><div class="cont sec-pad"><p class="eti-cap rv">Cómo sumarse</p><h2 class="eti-h2 rv">Tres formas de estar</h2><div class="eti-formas">'+
      '<article class="rv"><span>01</span><h3>Socio Colaborador</h3><p>Un convenio de 12 a 24 meses: una parte de lo que tu empresa ya compra se transforma en trabajo, con productos y fechas programados.</p><a href="#/eti?sumate">Quiero saber más →</a></article>'+
      '<article class="rv d1"><span>02</span><h3>Sponsor del ETI</h3><p>Acompañá la noche y que tu marca esté junto a las empresas que eligen trabajo inclusivo.</p><a href="#/eti?sumate">Quiero sumarme →</a></article>'+
      '<article class="rv d2"><span>03</span><h3>Tejiendo Oportunidades</h3><p>El set matero que financia el ETI y crea nuevos puestos de trabajo. Sumale valor a tu mate, sumate.</p><a href="#/tejiendo-oportunidades">Conocé la campaña →</a></article></div>'+
      '<div class="eti-banda-trama" aria-hidden="true">'+etiTrama([[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0]],'#30343B',false)+'</div></div></section>';
    html+='<section class="eti-p eti-claro"><div class="cont sec-pad"><p class="eti-cap rv">Camino al ETI</p><h2 class="eti-h2 rv">Galería</h2><div class="galeria-eti">'+GAL_ETI.map(function(s,i){return '<figure class="rv'+(i?' d'+Math.min(3,i):'')+'"><img src="'+s+'" alt="" loading="lazy"></figure>';}).join('')+'</div><p class="eti-nota rv">Después del encuentro, acá van las fotos de la noche.</p></div></section>';
    html+='<section class="eti-p eti-azul" id="sumate"><div class="cont sec-pad eti-form2"><div><p class="eti-ojal"><i></i>Encuentro de Trabajo Inclusivo</p><h2 class="eti-h2" id="eti-titulo">Sumá a tu empresa</h2><p class="eti-lead">A fines de noviembre, en Mendoza, empresas y trabajo inclusivo se sientan a conversar. Dejanos tus datos y te contamos cómo participar.</p>'+
      '<p class="eti-seguí">Seguí al ETI</p><div class="eti-redes"><a class="eti-btn2" href="https://www.instagram.com/eti.laranatela/" target="_blank" rel="noopener">Instagram</a><a class="eti-btn2" href="https://www.linkedin.com/in/eti-la-ra%C3%B1atela-32b430441/" target="_blank" rel="noopener">LinkedIn</a></div>'+
      '<p class="eti-contacto"><a href="mailto:eti.laranatela@gmail.com">eti.laranatela@gmail.com</a><br>261 276 1570</p></div>'+
      '<form class="form form-largo eti-card" id="form-eti" method="POST" action="/eti-enviar.php" aria-labelledby="eti-titulo" novalidate><div class="campos">'+
      '<div><label for="e-mail">Correo electrónico <span aria-hidden="true">*</span></label><input id="e-mail" name="email" type="email" required maxlength="254" autocomplete="email"></div>'+
      '<div><label for="e-emp">Empresa <span aria-hidden="true">*</span></label><input id="e-emp" name="empresa" type="text" required maxlength="120" autocomplete="organization"></div>'+
      '<div><label for="e-area">Área <span aria-hidden="true">*</span></label><input id="e-area" name="area" type="text" required maxlength="120" placeholder="Recursos Humanos, Compras, Sustentabilidad…"></div>'+
      '<div><label for="e-tel">Teléfono o WhatsApp <span aria-hidden="true">*</span></label><input id="e-tel" name="telefono" type="tel" required maxlength="40" autocomplete="tel"></div></div>'+
      '<button class="eti-btn eti-btn-az" type="submit">Quiero participar <span aria-hidden="true">→</span></button>'+
      '<p class="eti-nota-f">Todos los campos son obligatorios. Usamos tus datos únicamente para contactarte por el ETI. Más información en la <a href="#/privacidad">Política de Privacidad</a>.</p></form></div></section>';
    return html;
  };
  // TEJIENDO OPORTUNIDADES: página con la identidad de la campaña (verde bosque, hueso, menta y lima; JA Jayagiri Sans + Agrandir)
  var TIENDA_TO='https://tejiendooportunidades.mitiendanube.com';
  var PRECIO_TO='$20.000', PUNTOS_TO='Honey House y La Rañatela.';
  // Ediciones de la campaña, de la más nueva a la más vieja. Para sumar 2025: agregar {anio,producto,texto,foto,alt}.
  var EDICIONES_TO=[{anio:'2026',actual:true,producto:'Set matero',texto:'Bolso impermeable, yerbero y azucarero, con la trama de los nombres de quienes lo hicieron. En negro, verde oliva, terracota y rosa washed.',foto:'img/to/negro-2-estudio.jpg',alt:'Set matero 2026 en negro: bolso, yerbero y azucarero'},
    {anio:'2025',producto:'Bolsa Yo sumé',texto:'Bolsa de lienzo con el sello “Yo sumé tejiendo oportunidades” estampado en distintos colores, con un neceser a juego. Se vendieron 4.000.',video:'img/to/2025-equipo-1.mp4',poster:'img/to/2025-equipo-1-poster.jpg',alt:'Trabajadores de La Rañatela con las bolsas Yo sumé de la edición 2025, en el parque del taller',fotos:[['img/to/2025-bolsa-roja.jpg','Trabajadora de La Rañatela con la bolsa Yo sumé estampada en rojo'],['img/to/2025-bolsa-naranja.jpg','Trabajador de La Rañatela con la bolsa Yo sumé estampada en naranja'],['img/to/2025-bolsa-bolsita.jpg','Trabajador de La Rañatela con la bolsa Yo sumé y su neceser a juego']]}];
  var COLORES_TO=[['negro','Negro','#141414'],['verde-oliva','Verde oliva','#6B6B4A'],['terracota','Terracota','#9C4A33'],['rosa-washed','Rosa washed','#C9A0A0']];
  var PREMIOS_TO=[['Ombú','Escapada a Buenos Aires para 2 personas: aéreos y hotel, 3 días y 2 noches'],['Oscar David','Orden de compra por $500.000'],['Bodegas López','Visita guiada para 2 con degustación y caja de vino'],['Honey House','Curso completo a elección: guitarra, bajo, producción musical, baile o DJing'],['La Marchigiana','Cena para 2'],['Saigro','3 cajas navideñas Premium'],['Silva Pesca','Termo y mate'],['PlayWash','3 lavados Premium de auto'],['La Rañatela','Set de viaje: mochila, neceser, lona y piluso'],['La Rañatela','Set de asado para 2']];
  function toFit(lineas){return '<span class="to-fit">'+lineas.map(function(l){return '<span'+(l[1]?' class="'+l[1]+'"':'')+'>'+esc(l[0])+'</span>';}).join('')+'</span>';}
  function autoVideos(){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;document.querySelectorAll('video[data-auto]:not([data-obs])').forEach(function(v){v.setAttribute('data-obs','');var o=new IntersectionObserver(function(e){if(e[0].isIntersecting){var p=v.play();if(p&&p.catch)p.catch(function(){});}else v.pause();},{threshold:.3});o.observe(v);});}
  // Fondo del inicio en puntillismo: cada celda es un punto cuyo radio crece donde la imagen es más oscura
  (function(){var cv=document.getElementById('fondo-puntos'),vid=document.getElementById('fondo-video');if(!cv||!vid)return;
    var cx=cv.getContext('2d'),mu=document.createElement('canvas'),mx=mu.getContext('2d',{willReadFrequently:true}),PASO=6,act=false,ult=0,img=new Image(),jit=[];img.src=vid.getAttribute('poster');
    var quieto=matchMedia('(prefers-reduced-motion: reduce)').matches;
    function tam(){var d=Math.min(2,Math.max(1.5,devicePixelRatio||1));cv.width=Math.round(innerWidth*d);cv.height=Math.round(innerHeight*d);cx.setTransform(d,0,0,d,0,0);cx.filter='blur('+(1.6*d).toFixed(1)+'px)';mu.width=Math.ceil(innerWidth/PASO);mu.height=Math.ceil(innerHeight/PASO);
      jit=[];for(var k=0;k<mu.width*mu.height;k++)jit.push([(Math.random()-.5)*1.2,(Math.random()-.5)*1.2,.75+Math.random()*.5]);}
    function fuente(){return vid.readyState>=2?vid:(img.complete&&img.naturalWidth?img:null);}
    function dibujar(){var s=fuente();if(!s)return;var sw=s.videoWidth||s.naturalWidth,sh=s.videoHeight||s.naturalHeight,W=mu.width,H=mu.height,k=Math.max(W/sw,H/sh),dw=sw*k,dh=sh*k;
      mx.drawImage(s,(W-dw)/2,(H-dh)/2,dw,dh);var px=mx.getImageData(0,0,W,H).data,lo=1,hi=0;for(var q=0;q<px.length;q+=16){var lq=(px[q]*.299+px[q+1]*.587+px[q+2]*.114)/255;if(lq<lo)lo=lq;if(lq>hi)hi=lq;}var rg=Math.max(.15,hi-lo);cx.clearRect(0,0,innerWidth,innerHeight);cx.fillStyle='#17524D';cx.beginPath();
      for(var y=0;y<H;y++)for(var x=0;x<W;x++){var i=(y*W+x)*4,l=Math.min(1,Math.max(0,((px[i]*.299+px[i+1]*.587+px[i+2]*.114)/255-lo)/rg)),r=Math.min(PASO*.42,PASO*.44*Math.pow(1-l,1.5));if(r<.3)continue;
        var X=x*PASO+PASO/2,Y=y*PASO+PASO/2;cx.moveTo(X+r,Y);cx.arc(X,Y,r,0,6.2832);}
      cx.fill();if(window.__puntosTex)window.__puntosTex.needsUpdate=true;}
    function bucle(t){if(!act)return;requestAnimationFrame(bucle);if(t-ult<83)return;ult=t;dibujar();}
    window.__puntos=function(on){window.__puntosOn=on;act=on&&!quieto;if(on){dibujar();if(act)requestAnimationFrame(bucle);}};
    addEventListener('resize',function(){tam();dibujar();});img.onload=function(){dibujar();};tam();window.__puntos(true);
  })();
  // Errores de imagen sin atributos onerror (la política de seguridad no permite scripts en línea).
  document.addEventListener('error',function(e){var im=e.target;if(!im||im.tagName!=='IMG')return;if(im.dataset.err==='mini'&&im.parentNode)im.parentNode.classList.add('sin-mini');if(im.dataset.altSrc){var s2=im.dataset.altSrc;delete im.dataset.altSrc;im.className='pz-foto';im.src=s2;}},true);
  document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('[data-saltar]');if(!a)return;e.preventDefault();var ap=document.getElementById('app');if(ap)ap.focus();});
  window.__autoVid=autoVideos;
  window.__ajustarTO=function(){autoVideos();
    document.querySelectorAll('.to-fit').forEach(function(f){var w=f.clientWidth;if(!w)return;
      f.querySelectorAll('span').forEach(function(s){s.style.fontSize='100px';var sw=s.scrollWidth||s.getBoundingClientRect().width;if(sw)s.style.fontSize=(100*w/sw*0.995)+'px';});});
  };
  addEventListener('resize',function(){clearTimeout(window.__toT);window.__toT=setTimeout(window.__ajustarTO,120);});
  R.tejiendo=function(){
    var html='<div class="cont nodo-ref" aria-hidden="true"></div><section class="to-p to-hero"><div class="cont to-hero-g">'+
      '<div class="to-hero-tx"><div class="to-sello-eti"><img src="img/eti-sello-relieve.png" alt="" width="56" height="56"><span>Camino<br>a ETI</span></div>'+
      '<p class="to-cap">Campaña Tejiendo Oportunidades 2026</p>'+
      '<h1 class="to-h1">'+toFit([['Sumale valor'],['a tu mate,','lima'],['sumate']])+'</h1>'+
      '<p class="to-lead">Set matero 2026: bolso, yerbero y azucarero hechos en La Rañatela. Cada set lleva el nombre de quien lo hizo.</p>'+
      '<div class="to-acc"><a class="to-btn" href="'+TIENDA_TO+'" target="_blank" rel="noopener">Conseguí el tuyo <span aria-hidden="true">→</span></a><span class="to-precio">'+esc(PRECIO_TO)+'</span></div></div>'+
      '<figure class="to-hero-foto"><img src="img/to/negro-1-ambiente.jpg" alt="Set matero negro con la trama de nombres en blanco: bolso, yerbero y azucarero, junto a un termo y un mate, al aire libre." width="1200" height="1200"></figure></div></section>';
    html+='<nav class="to-sub" aria-label="Secciones de la campaña"><div class="cont"><a href="#/tejiendo-oportunidades?campana">La campaña</a><a href="#/tejiendo-oportunidades?set">Set matero 2026</a><a href="#/tejiendo-oportunidades?como">Cómo se hizo</a><a href="#/tejiendo-oportunidades?ediciones">Ediciones</a><a href="#/tejiendo-oportunidades?sorteo">Sorteo</a><a href="#/tejiendo-oportunidades?donde">Dónde conseguirlo</a></div></nav>';
    html+='<section class="to-p to-hueso" id="campana"><div class="cont sec-pad to-campana"><div class="to-campana-cab"><p class="to-cap osc">Qué es Tejiendo Oportunidades</p><h2 class="to-h2 osc">'+toFit([['Trabajo que'],['financia trabajo']])+'</h2></div>'+
      '<div class="to-campana-tx"><p class="to-texto grande">Tejiendo Oportunidades es la campaña anual de La Rañatela. Cada año diseñamos un producto nuevo junto a las personas que trabajan en el taller, lo producimos acá y lo vendemos. Lo que se recauda financia el ETI, el Encuentro de Trabajo Inclusivo, y la creación de nuevos puestos de trabajo.</p>'+
      '<p class="to-texto">La organizan La Rañatela y Lianyeli. La Rañatela diseña, produce y vende; Lianyeli acompaña a las personas antes, durante y después del trabajo. No es una donación: es un producto bien hecho, con un precio justo, que deja algo más que el producto.</p>'+
      '<p class="to-texto">Comprarlo es decir <b>“Yo sumé”</b>: el sello que lleva cada edición y que identifica a quienes eligen sumarse.</p><p class="to-dato"><b>4.000</b><span>productos vendidos en la edición 2025</span></p></div>'+
      '<ol class="to-ciclo">'+[['Diseñamos','Un producto nuevo cada año, pensado en equipo con los trabajadores.'],['Producimos','Se corta, se cose, se imprime y se embala en el taller de Maipú.'],['Vendés y sumás','Por la tienda online, en los puntos de retiro y a empresas.'],['Crece el trabajo','Lo recaudado financia el ETI y nuevos puestos de trabajo.']].map(function(x,i){return '<li><span>'+(i+1)+'</span><b>'+x[0]+'</b><p>'+x[1]+'</p></li>';}).join('')+'</ol></div></section>';
    html+='<section class="to-p to-hueso" id="set"><div class="cont sec-pad to-set">'+
      '<div class="to-galeria"><figure class="to-principal"><img id="to-foto" src="img/to/negro-2-estudio.jpg" alt="Set matero completo en color negro" width="1200" height="1200"></figure>'+
      '<div class="to-mini">'+[['3-bolso','El bolso'],['4-yerbero','El yerbero'],['5-azucarero','El azucarero']].map(function(m){return '<figure><img data-pieza="'+m[0]+'" data-nombre="'+m[1]+'" src="img/to/negro-'+m[0]+'.jpg" alt="'+m[1]+' del set matero, en negro" loading="lazy" width="1200" height="1200"><figcaption>'+m[1]+'</figcaption></figure>';}).join('')+'</div></div>'+
      '<div class="to-ficha"><p class="to-cap osc">El set 2026</p><h2 class="to-h2">Set matero</h2>'+
      '<p class="to-texto">Un set para el mate: bolso impermeable, yerbero y azucarero, lavables y con cierre. Es de tela, con una trama blanca hecha con los nombres de las personas que lo fabricaron. En el bolso, entre los nombres, va escrito a mano “Yo sume tejiendo oportunidades”.</p>'+
      '<p class="to-et">Elegí el color</p><div class="to-colores" role="radiogroup" aria-label="Color del set">'+COLORES_TO.map(function(c,i){return '<button type="button" role="radio" aria-checked="'+(i?'false':'true')+'" data-color="'+c[0]+'" data-nombre="'+c[1]+'"><i style="background:'+c[2]+'"></i>'+c[1]+'</button>';}).join('')+'</div>'+
      '<p class="to-nota">Manijas y cierres siempre negros.</p>'+
      '<ul class="to-incluye"><li>Bolso impermeable</li><li>Yerbero con cierre</li><li>Azucarero con cierre</li><li>Tarjetón para el sorteo</li></ul>'+
      '<div class="to-acc"><a class="to-btn osc" href="'+TIENDA_TO+'" target="_blank" rel="noopener">Comprar en la tienda <span aria-hidden="true">→</span></a><span class="to-precio osc">'+esc(PRECIO_TO)+'</span></div>'+
      '<p class="to-nota">El termo y el mate de las fotos no forman parte del set.</p></div></div></section>';
    html+='<section class="to-p to-bosque" id="como"><div class="cont sec-pad to-como">'+
      '<div><p class="to-cap">Cómo se hizo</p><h2 class="to-h2">'+toFit([['Cada set lleva'],['el nombre','lima'],['de quien lo hizo']])+'</h2></div>'+
      '<div class="to-pasos"><p>Lo diseñaron en conjunto los trabajadores de La Rañatela. Cada uno dibujó y escribió su nombre en papel.</p><p>Esos trazos se escanearon y se tejieron a mano, nombre por nombre, hasta formar la trama.</p><p>La trama se imprimió sobre la tela y cada pieza se cortó, se cosió y se embaló en La Rañatela.</p></div>'+
      '<div class="to-cuatro">'+COLORES_TO.map(function(c){return '<figure><img src="img/to/'+c[0]+'-2-estudio.jpg" alt="Set matero en '+c[1].toLowerCase()+'" loading="lazy" width="1200" height="1200"><figcaption><i style="background:'+c[2]+'"></i>'+c[1]+'</figcaption></figure>';}).join('')+'</div></div></section>';
    var ed=EDICIONES_TO.map(function(e){return '<article class="to-ed'+(e.actual?' actual':'')+'"><span class="to-ed-año">'+e.anio+'</span><figure>'+(e.video?'<video src="'+e.video+'" poster="'+e.poster+'" muted loop playsinline preload="metadata" aria-label="'+esc(e.alt||'')+'" data-auto></video>':(e.foto?'<img src="'+e.foto+'" alt="'+esc(e.alt||'')+'" loading="lazy">':''))+'</figure><div><b>'+esc(e.producto)+'</b><p>'+esc(e.texto)+'</p>'+(e.fotos?'<div class="to-ed-fotos">'+e.fotos.map(function(f){return '<img src="'+f[0]+'" alt="'+esc(f[1])+'" loading="lazy">';}).join('')+'</div>':'')+(e.actual?'<a href="#/tejiendo-oportunidades?set">Ver el set →</a>':'')+'</div></article>';}).join('');
    html+='<section class="to-p to-hueso" id="ediciones"><div class="cont sec-pad"><p class="to-cap osc">Ediciones</p><h2 class="to-h2 osc">Un producto distinto cada año</h2><div class="to-eds">'+ed+'</div></div></section>';
    html+='<section class="to-p to-menta"><div class="cont sec-pad to-financia"><p class="to-cap osc">Qué sumás</p><h2 class="to-h2 osc">'+toFit([['Todo empieza'],['con un mate']])+'</h2>'+
      '<div class="to-tres"><article><b>+100</b><p>Con tu compra apoyás el trabajo y la creatividad de más de 100 personas.</p></article><article><b>Trabajo</b><p>Cada set es un aporte a nuevos compromisos de trabajo dentro de La Rañatela.</p></article><article><b>ETI</b><p>La campaña financia el ETI, el Encuentro de Trabajo Inclusivo de fines de noviembre.</p><a href="#/eti">Conocé el ETI →</a></article></div></div></section>';
    html+='<section class="to-p to-hueso" id="sorteo"><div class="cont sec-pad to-sorteo"><div><p class="to-cap osc">El sorteo</p><h2 class="to-h2 osc">Colgalo en el arbolito</h2><p class="to-texto">Con cada set viene un tarjetón para colgar en el arbolito. Con él participás del sorteo de fin de año por grandes premios.</p></div>'+
      '<ol class="to-premios">'+PREMIOS_TO.map(function(p,i){return '<li><span>'+(i+1)+'</span><div><b>'+esc(p[0])+'</b><p>'+esc(p[1])+'</p></div></li>';}).join('')+'</ol></div></section>';
    html+='<section class="to-p to-bosque" id="donde"><div class="cont sec-pad to-donde"><p class="to-cap">Dónde conseguirlo</p><h2 class="to-h2">'+toFit([['Conseguí el tuyo','lima']])+'</h2>'+
      '<div class="to-tres"><article><b>Tienda online</b><p>Comprás en la tienda de la campaña y lo recibís por Andreani.</p><a href="'+TIENDA_TO+'" target="_blank" rel="noopener">Ir a la tienda →</a></article><article><b>Puntos de retiro</b><p>'+esc(PUNTOS_TO)+'</p></article><article><b>Compartilo</b><p>#YoSuméTejiendoOportunidades</p></article></div>'+
      '<div class="to-org"><span>Organizan</span><img src="img/eti-organizan.png" width="253" height="100" alt="La Rañatela y Lianyeli"></div></div></section>';
    return html;
  };
  document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.to-colores button');if(!b)return;
    b.parentNode.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-checked',x===b?'true':'false');});
    var f=document.getElementById('to-foto'),cn=b.dataset.nombre.toLowerCase();if(f){f.src='img/to/'+b.dataset.color+'-2-estudio.jpg';f.alt='Set matero completo en color '+cn;}
    document.querySelectorAll('.to-mini img[data-pieza]').forEach(function(im){im.src='img/to/'+b.dataset.color+'-'+im.dataset.pieza+'.jpg';im.alt=im.dataset.nombre+' del set matero, en '+cn;});});
  // PERSONALIZADOR 3D: modelos en three.js con el logo como textura.
  // Para sumar productos: agregar un objeto a PRESETS (modelo tote/mochila/gorra, medida estándar en cm, tipo de manija, colores y técnicas).
  // Técnicas, colores y reglas de tiempos son PROVISORIOS hasta cargar los datos del taller.
  var TEC={ser:'Serigrafía',sub:'Sublimación',subt:'Sublimación total',bor:'Bordado',ase:'Que me asesoren'};
  var CL=[['Crudo','#E6DCC6'],['Negro','#2A2A2A'],['Azul marino','#26334F']],CB=[['Crudo','#DCD3BE'],['Negro','#2A2A2A'],['Azul','#2E4A7A'],['Verde','#3F5A3A']],
      CF=[['Blanco','#F3F1EC'],['Negro','#2A2A2A'],['Rojo','#B3302B'],['Azul','#2C4C8C'],['Verde','#2F7A45']],CJ=[['Jean azul','#3C5A82'],['Jean claro','#7C98B8']],
      CN=[['Negro','#2A2A2A'],['Gris','#8A8D8F'],['Azul','#2E4A7A']],CG=[['Negro','#2A2A2A'],['Azul marino','#26334F'],['Gris','#8A8D8F'],['Rojo','#B3302B']];
  var PRESETS=[
    {slug:'tote-lienzo',cuerpo:[0.06,0.075,0.935,1],medida:true,glb:'tote-lienzo',area:[4,5,34,38],nombre:'Tote Bag de Lienzo',modelo:'tote',asa:'larga',cm:[38,42],tecnicas:['ser','ase'],colores:[['Crudo','#E6DCC6'],['Blanco','#F3F1EC'],['Negro','#2A2A2A'],['Azul marino','#26334F']]},
    {slug:'tote-brin',cuerpo:[0.016,0.394,0.984,1],medida:true,glb:'tote-brin',area:[4,5,34,38],nombre:'Tote Bag de Brin',modelo:'tote',asa:'larga',cm:[38,42],tecnicas:['ser','ase'],colores:[['Crudo','#DCD3BE'],['Negro','#2A2A2A'],['Azul','#2E4A7A'],['Verde','#3F5A3A']]},
    {slug:'bolso-tote-grande',cuerpo:[0.043,0.004,0.974,0.985],medida:true,glb:'bolso-tote-grande',area:[11,4,37,36],nombre:'Bolso Tote Grande',modelo:'tote',asa:'larga',cm:[48,40],tecnicas:['ser','sub','ase'],colores:[['Negro','#2A2A2A'],['Azul marino','#26334F'],['Gris','#8A8D8F'],['Crudo','#E6DCC6']]},
    {slug:'bolsa-friselina-manija-troquelada',cuerpo:[0.048,0.006,0.962,0.994],medida:true,glb:'bolsa-friselina-manija-troquelada',area:[4,9,26,36],nombre:'Bolsa de Friselina Troquelada',modelo:'tote',asa:'troquel',cm:[30,40],tecnicas:['ser','ase'],colores:[['Blanco','#F3F1EC'],['Negro','#2A2A2A'],['Rojo','#B3302B'],['Azul','#2C4C8C'],['Verde','#2F7A45']]},
    {slug:'portabotella-vino',cuerpo:[0.104,0.121,0.883,0.996],medida:true,glb:'portabotella-vino',area:[3,8,13,36],nombre:'Portabotella para Vino',modelo:'tote',asa:'corta',cm:[16,38],tecnicas:['ser','ase'],colores:[['Crudo','#E6DCC6'],['Negro','#2A2A2A'],['Bordó','#6E2230']]},
    {slug:'mochila-cordon',cuerpo:[0.041,0.071,0.959,0.998],medida:true,glb:'mochila-cordon',area:[7.5,12,27.5,30],estricta:true,nombre:'Mochila con Cordón',modelo:'mochila',cm:[35,45],tecnicas:['ser','sub','ase'],colores:[['Rojo','#C83A22'],['Negro','#2A2A2A'],['Azul marino','#26334F'],['Verde','#2F5E3A'],['Crudo','#E6DCC6']]},
    {slug:'gorra-trucker',glb:'gorra-trucker',nombre:'Gorra Trucker',modelo:'gorra',fija:true,cm:[18,15],area:[3,4,15,9],zona:[.2,.34,.8,.8],tecnicas:['bor','ser','sub','ase'],colores:[['Azul marino','#26334F'],['Negro','#2A2A2A'],['Blanco','#F3F1EC'],['Rojo','#B3302B']]},
    // Resto del catálogo. fija:true = medida estándar no editable (indumentaria, mochilas, cajas). Medidas y áreas orientativas: confirmar con el taller.
    {slug:'tote-lienzo-fuelle-contorno',cuerpo:[0.038,0.029,0.96,0.996],nombre:'Tote de Lienzo con Fuelle',modelo:'tote',asa:'larga',cm:[40,40],area:[5,6,35,36],glb:'tote-lienzo-fuelle-contorno',tecnicas:['ser','ase'],colores:CL},
    {slug:'bolsa-friselina-fuelle-base',cuerpo:[0.008,0.312,0.992,0.998],nombre:'Bolsa de Friselina con Fuelle',modelo:'tote',asa:'larga',cm:[35,40],area:[4,5,31,36],glb:'bolsa-friselina-fuelle-base',tecnicas:['ser','ase'],colores:CF},
    {slug:'bolsa-cuatro-botellas',cuerpo:[0.015,0.229,0.985,1],nombre:'Bolsa para Cuatro Botellas',modelo:'tote',asa:'larga',cm:[22,36],area:[3,8,19,32],glb:'bolsa-cuatro-botellas',tecnicas:['ser','ase'],colores:CF},
    {slug:'bolsa-navidena',cuerpo:[0.036,0.267,0.961,1],nombre:'Bolsa Navideña',modelo:'tote',asa:'larga',cm:[30,35],area:[4,5,26,31],glb:'bolsa-navidena',tecnicas:['ser','ase'],colores:CF},
    {slug:'bolso-brin',cuerpo:[0.073,0.017,0.975,0.989],nombre:'Bolso de Brin',modelo:'tote',asa:'larga',cm:[45,35],area:[6,5,39,31],glb:'bolso-brin',tecnicas:['ser','ase'],colores:CB},
    {slug:'bolso-jean',cuerpo:[0.044,0.018,0.96,1],nombre:'Bolso de Jean',modelo:'tote',asa:'larga',cm:[40,38],area:[5,6,35,34],glb:'bolso-jean',tecnicas:['ser','ase'],colores:CJ},
    {slug:'bolsa-auto-neoprene',nombre:'Bolsa para Auto',modelo:'tote',fija:true,cm:[25,30],area:[3.5,18.5,21.5,29.5],estricta:true,glb:'bolsa-auto',tecnicas:['ser','subt','ase'],colores:[['Negro','#2A2A2A'],['Gris','#8A8D8F'],['Azul','#2E4A7A'],['Blanco','#F3F1EC']],bies:1.5,costuras:[[.397,.405],[.425,.433],[.514,.521],[.548,.556]]},
    {slug:'mochila-urbana',cuerpo:[0.027,0.127,0.976,1],nombre:'Mochila Urbana',modelo:'mochila',fija:true,cm:[30,42],area:[6,22,24,38],estricta:true,glb:'mochila-urbana',tecnicas:['ser','bor','ase'],colores:CG},
    {slug:'mochila-escolar',cuerpo:[0.084,0.098,0.91,0.985],nombre:'Mochila Escolar Reforzada',modelo:'mochila',fija:true,cm:[30,40],area:[8,11.5,22,20],estricta:true,glb:'mochila-escolar',tecnicas:['ser','bor','ase'],colores:CG},
    {slug:'rinonera',cuerpo:[0.081,0.332,0.988,0.965],nombre:'Riñonera',modelo:'tote',fija:true,cm:[32,14],area:[9,3.5,23,10.5],estricta:true,glb:'rinonera',tecnicas:['ser','ase'],colores:CG},
    {slug:'neceser-corporativo',cuerpo:[0.017,0.005,0.992,0.995],nombre:'Neceser Corporativo',modelo:'tote',fija:true,cm:[22,12],area:[3,2.5,19,10],glb:'neceser-corporativo',tecnicas:['ser','ase'],colores:CG},
    {slug:'lonchera-termica',cuerpo:[0.079,0.089,0.985,0.993],nombre:'Lonchera Térmica',modelo:'tote',fija:true,cm:[28,22],area:[4,4,24,18],glb:'lonchera-termica',tecnicas:['ser','ase'],colores:CG},
    {slug:'caja-navidena',cuerpo:[0,0,1,1],nombre:'Caja Navideña',modelo:'tote',fija:true,cm:[30,47],area:[4,13,26,43],glb:'caja-navidena',tecnicas:['ser','ase'],colores:[['Kraft','#C9A57A'],['Blanco','#F3F1EC'],['Negro','#2A2A2A'],['Rojo','#B3302B']]},
    {slug:'set-matero',cuerpo:[0,0.08,1,1],nombre:'Set Matero',modelo:'tote',fija:true,cm:[30,30],area:[10,6,20,20],glb:'set-matero',tecnicas:['ser','sub','subt','ase'],colores:[['Negro','#2A2A2A'],['Verde oliva','#6B6B3A'],['Terracota','#B5603F'],['Rosa washed','#D9A9A0'],['Blanco','#F3F1EC']]},
    {slug:'set-asado',cuerpo:[0.108,0.111,0.996,0.976],nombre:'Set de Asado',modelo:'tote',fija:true,cm:[40,35],area:[7,7,33,28],glb:'set-asado',tecnicas:['ser','ase'],colores:CB},
    {slug:'yerbero-azucarero',cuerpo:[0.044,0.106,0.918,0.998],nombre:'Yerbero y Azucarero',modelo:'tote',fija:true,cm:[12,20],area:[2,6,10,16],glb:'yerbero-azucarero',tecnicas:['ser','sub','subt','ase'],colores:CG.concat([['Blanco','#F3F1EC']])},
    {slug:'lona-playera',cuerpo:[0,0.108,1,0.995],nombre:'Lona Playera',modelo:'tote',fija:true,cm:[60,20],area:[34,4,56,16],glb:'lona-playera',tecnicas:['ser','ase'],colores:CL},
    {slug:'remera-personalizada',cuerpo:[0.21,0.03,0.8,1],nombre:'Remera',modelo:'tote',fija:true,cm:[50,70],area:[12,8,38,38],dorso:[11,9,39,45],glb:'remera-personalizada',tecnicas:['ser','ase'],colores:[['Blanco','#F3F1EC'],['Negro','#2A2A2A'],['Gris melange','#A5A7A8'],['Azul marino','#26334F']]},
    {slug:'chaleco-trucker',dorso:[10,9,40,35],cuerpo:[0.02,0.083,0.985,0.994],nombre:'Chaleco Trucker',modelo:'tote',fija:true,cm:[50,65],area:[28,12,38,22],glb:'chaleco-trucker',tecnicas:['bor','ser','ase'],colores:CG},
    {slug:'chaleco-inflable',dorso:[10,9,40,35],cuerpo:[0.022,0.087,0.978,0.996],nombre:'Chaleco Inflable',modelo:'tote',fija:true,cm:[50,65],area:[28,12,38,22],glb:'chaleco-inflable',tecnicas:['bor','ase'],colores:CG},
    {slug:'delantal-jean',cuerpo:[0,0.13,1,1],nombre:'Delantal de Jean Reciclado',modelo:'tote',fija:true,cm:[60,80],area:[20,12,40,30],estricta:true,glb:'delantal-jean',tecnicas:['ser','bor','ase'],colores:CJ},
    {slug:'cuello-polar',cuerpo:[0.03,0.006,0.961,0.998],nombre:'Cuello de Polar',modelo:'tote',fija:true,cm:[25,25],area:[8.5,8.5,16.5,16.5],glb:'cuello-polar',tecnicas:['bor'],asesorar:true,colores:CG},
    {slug:'piluso',nombre:'Piluso',modelo:'tote',fija:true,cm:[30,10],area:[8.5,2.5,21.5,7.5],glb:'piluso',tecnicas:['bor','ser','ase'],colores:CG}
  ];
  // area: zona de impresión recomendada en cm, medida sobre fotos de pedidos reales (bolsa en su medida estándar).
  var FOTOS={'mochila-cordon':'mochila-cordon-lienzo','caja-navidena':'caja-navidena-felices-fiestas','bolsa-navidena':'bolsa-navidena-mendoza-shopping','mochila-urbana':'mochila-urbana-espalda','rinonera':'rinonera-lateral','bolsa-cuatro-botellas':'bolsa-cuatro-botellas-lateral','lonchera-termica':'lonchera-termica-aislante','chaleco-inflable':'chaleco-inflable-espalda','remera-personalizada':'remera-personalizada-detalle','set-asado':'set-asado-ejemplo-cliente'};
  PRESETS.forEach(function(p){p.foto='img/productos-'+(FOTOS[p.slug]||p.slug)+'.jpg';if(p.glb&&p.glb.indexOf('/')<0)p.glb='img/3d/'+p.glb+'.glb.json';});
  function oscuro(hex){var n=parseInt(hex.slice(1),16);return ((n>>16)*.3+((n>>8)&255)*.59+(n&255)*.11)<110;}
  function claro(hex){var n=parseInt(hex.slice(1),16);return ((n>>16)*.3+((n>>8)&255)*.59+(n&255)*.11)>200;}
  var PZ={lado:'frente',otro:null,dor:false,p:0,c:0,W:38,H:42,cx:.5,cy:.55,lw:20,lh:14,tec:0,img:null,imgEl:null,cant:100,anal:null,arr:false,vista:'34',zoom:false,archivo:''};
  var G3={};
  function esBolsa(){var p=PRESETS[PZ.p];return p.modelo!=='gorra'&&!p.fija;}
  // Frente y dorso (remeras, chalecos): PZ.cx/cy/lw/lh son siempre los del lado que se está editando; el otro lado queda guardado en PZ.otro.
  function tieneDorso(){var p=PRESETS[PZ.p];return !!p.dorso&&p.tecnicas[PZ.tec]!=='subt';}
  function ladoVals(){return {cx:PZ.cx,cy:PZ.cy,lw:PZ.lw,lh:PZ.lh};}
  function ponerVals(v){PZ.cx=v.cx;PZ.cy=v.cy;PZ.lw=v.lw;PZ.lh=v.lh;}
  function valsDorsoInicial(){var p=PRESETS[PZ.p],a=p.dorso,lw=Math.max(2,Math.round((a[2]-a[0])*.7));return {cx:(a[0]+a[2])/2/p.cm[0],cy:(a[1]+a[3])/2/p.cm[1],lw:lw,lh:lw*ar()};}
  function cambiarLado(l){if(l===PZ.lado)return;var cur=ladoVals();PZ.lado=l;ponerVals(PZ.otro||valsDorsoInicial());PZ.otro=cur;if(l==='dorso')PZ.dor=true;ajustarLogo();}
  function conLado(l,fn){if(l===PZ.lado||!PZ.otro)return fn();var cur=ladoVals(),l0=PZ.lado;PZ.lado=l;ponerVals(PZ.otro);try{return fn();}finally{PZ.lado=l0;ponerVals(cur);}}
  function ladosActivos(){return tieneDorso()&&PZ.dor?['frente','dorso']:['frente'];}
  function medidaDe(l){return conLado(l,function(){return numAr(PZ.lw)+' × '+numAr(PZ.lh)+' cm';});}
  function cargarPreset(i){var p=PRESETS[i];PZ.p=i;PZ.lado='frente';PZ.otro=null;PZ.dor=false;PZ.c=0;PZ.tec=0;PZ.W=p.cm[0];PZ.H=p.cm[1];PZ.cx=.5;PZ.cy=esBolsa()?.55:.57;PZ.lw=Math.round(Math.min(p.cm[0]*.5,esBolsa()?p.cm[0]-8:8));PZ.lh=Math.round(PZ.lw*.7);
    if(p.area){var a=p.area;PZ.lw=Math.max(2,Math.round((a[2]-a[0])*.7));PZ.lh=Math.round(PZ.lw*.7);PZ.cx=(a[0]+a[2])/2/p.cm[0];PZ.cy=(a[1]+a[3])/2/p.cm[1];}ajustarLogo();}
  function zonas(){var p=PRESETS[PZ.p],W=PZ.W,H=PZ.H;
    if(!esBolsa()&&!p.area){var z=p.zona,r={x0:z[0]*W,y0:z[1]*H,x1:z[2]*W,y1:z[3]*H};return {max:r,rec:r};}
    var top=p.asa==='troquel'?8.5:4;
    if(p.area){var sx=W/p.cm[0],sy=H/p.cm[1],a=(PZ.lado==='dorso'&&p.dorso)||p.area,r=p.fija?{x0:a[0],y0:a[1]*sy,x1:a[2],y1:a[1]*sy+(a[3]-a[1])}:{x0:a[0]*sx,y0:a[1]*sy,x1:W-(p.cm[0]-a[2])*sx,y1:H-(p.cm[1]-a[3])*sy};
      if(p.estricta)return {max:r,rec:r};
      return {max:{x0:Math.max(1.5,r.x0-2.5),y0:Math.max(1.5,r.y0-2.5),x1:Math.min(W-1.5,r.x1+2.5),y1:Math.min(H-1.5,r.y1+2.5)},rec:r};}
    return {max:{x0:1.5,y0:Math.min(top,4),x1:W-1.5,y1:H-1.5},rec:{x0:4,y0:Math.max(4,top),x1:W-4,y1:H-4}};}
  function ar(){return PZ.imgEl?PZ.imgEl.height/PZ.imgEl.width:PZ.lh/Math.max(.1,PZ.lw);}
  function ajustarLogo(){var z=zonas().max,a=ar(),mw=z.x1-z.x0,mh=z.y1-z.y0;PZ.lw=Math.max(1,Math.min(PZ.lw,mw,mh/a));PZ.lh=PZ.lw*a;
    var cx=PZ.cx*PZ.W,cy=PZ.cy*PZ.H;cx=Math.min(Math.max(cx,z.x0+PZ.lw/2),z.x1-PZ.lw/2);cy=Math.min(Math.max(cy,z.y0+PZ.lh/2),z.y1-PZ.lh/2);PZ.cx=cx/PZ.W;PZ.cy=cy/PZ.H;}
  function dentroRec(){var r=zonas().rec,cx=PZ.cx*PZ.W,cy=PZ.cy*PZ.H;return cx-PZ.lw/2>=r.x0-.05&&cx+PZ.lw/2<=r.x1+.05&&cy-PZ.lh/2>=r.y0-.05&&cy+PZ.lh/2<=r.y1+.05;}
  function diasHabiles(n){var d=new Date(),k=0;while(k<n){d.setDate(d.getDate()+1);var w=d.getDay();if(w&&w<6)k++;}return d;}
  function pzEstimar(){var p=PRESETS[PZ.p],t=p.tecnicas[PZ.tec],cols=PZ.anal?Math.max(1,PZ.anal.colores):1,q=PZ.cant;
    var extra=Math.ceil(Math.max(0,q-300)/300)*2+(t==='ser'?Math.max(0,cols-2):0)+(t==='bor'?3:t==='sub'?1:0)+(esBolsa()&&(PZ.W!==p.cm[0]||PZ.H!==p.cm[1])?2:0);
    return {min:5+extra,max:10+extra};}
  function hexDe(r,g,b){return '#'+[r,g,b].map(function(v){v=Math.max(0,Math.min(255,Math.round(v)));return (v<16?'0':'')+v.toString(16);}).join('');}
  function pzLeer(src,cb){var im=new Image();im.onload=function(){
      var k=Math.min(1,400/Math.max(im.width,im.height)),w=Math.max(1,Math.round(im.width*k)),h=Math.max(1,Math.round(im.height*k)),cv=document.createElement('canvas');cv.width=w;cv.height=h;
      var cx=cv.getContext('2d');cx.drawImage(im,0,0,w,h);var d=cx.getImageData(0,0,w,h).data,trans=0,tot=0,bins={},fondoN=0;
      var e=[0,(w-1)*4,(h-1)*w*4,((h-1)*w+w-1)*4],c0=[d[0],d[1],d[2]];
      var fondo=e.every(function(o){return d[o+3]>200&&Math.abs(d[o]-c0[0])+Math.abs(d[o+1]-c0[1])+Math.abs(d[o+2]-c0[2])<30;});
      for(var i=0;i<d.length;i+=4){tot++;if(d[i+3]<200){trans++;continue;}
        if(fondo&&Math.abs(d[i]-c0[0])+Math.abs(d[i+1]-c0[1])+Math.abs(d[i+2]-c0[2])<40){fondoN++;continue;}
        var bk=(d[i]>>4)+','+(d[i+1]>>4)+','+(d[i+2]>>4);bins[bk]=(bins[bk]||0)+1;}
      var op=Math.max(1,tot-trans-fondoN),lista=Object.keys(bins).map(function(b){return [b.split(',').map(Number),bins[b]/op];}).sort(function(a,b){return b[1]-a[1];});
      var grupos=[];lista.filter(function(x){return x[1]>.015;}).forEach(function(x){var g=grupos.filter(function(c){var dd=0;for(var j=0;j<3;j++)dd+=Math.abs(c[0][j]-x[0][j]);return dd<=4;})[0];if(g)g[1]+=x[1];else grupos.push([x[0],x[1]]);});
      var menudos=lista.filter(function(x){return x[1]>.002;}).length;
      if(trans/tot>.02)fondo=false;
      cb(im,{w:im.width,h:im.height,transp:trans/tot>.02,fondo:fondo,fondoBlanco:fondo&&c0[0]>225&&c0[1]>225&&c0[2]>225,colores:Math.max(1,grupos.length),
        tintas:grupos.slice(0,8).map(function(g){return hexDe(g[0][0]*16+8,g[0][1]*16+8,g[0][2]*16+8);}),degrade:menudos>40});
    };im.src=src;}
  // Quita el fondo liso (blanco o de un color) inundando desde los bordes; deja el borde suavizado.
  function pzQuitarFondo(cb){var im=PZ.imgEl;if(!im)return;var k=Math.min(1,2400/Math.max(im.width,im.height)),w=Math.round(im.width*k),h=Math.round(im.height*k),cv=document.createElement('canvas');cv.width=w;cv.height=h;
    var x=cv.getContext('2d');x.drawImage(im,0,0,w,h);var id=x.getImageData(0,0,w,h),d=id.data,r0=d[0],g0=d[1],b0=d[2],vis=new Uint8Array(w*h),pila=[];
    function dist(i){return Math.abs(d[i*4]-r0)+Math.abs(d[i*4+1]-g0)+Math.abs(d[i*4+2]-b0);}
    for(var u=0;u<w;u++){pila.push(u,(h-1)*w+u);}for(var v=0;v<h;v++){pila.push(v*w,v*w+w-1);}
    while(pila.length){var q=pila.pop();if(vis[q])continue;var dq=dist(q);if(dq>90)continue;vis[q]=1;
      d[q*4+3]=dq<45?0:Math.round(d[q*4+3]*Math.min(1,(dq-45)/45));
      var qx=q%w;if(qx>0)pila.push(q-1);if(qx<w-1)pila.push(q+1);if(q>=w)pila.push(q-w);if(q<w*(h-1))pila.push(q+w);}
    x.putImageData(id,0,0);cb(cv.toDataURL('image/png'));}
  function pzVeredicto(){
    var p=PRESETS[PZ.p],a=PZ.anal,t=p.tecnicas[PZ.tec],out=[],cmW=numAr(PZ.lw),r=zonas().rec;
    if(p.asesorar)out.push(['ojo','Este producto solo se borda y siempre lo definimos con vos: antes de producir te asesoramos sobre tamaño, colores e hilos.']);
    if(t==='subt'){var need=Math.round(Math.max(PZ.W,PZ.H)/2.54*150);out.push(['ok','Sublimación total: tu imagen cubre todo el producto, frente y dorso. El bies y las costuras quedan sin imprimir.']);if(a&&Math.max(a.w,a.h)<need)out.push(['ojo','Para que se vea nítida a tamaño completo, conviene una imagen de al menos '+need+' px de lado.']);}
    else if(esBolsa()||p.area)out.push(dentroRec()?['ok','La impresión está dentro del área recomendada'+(p.medida?' (medida en pedidos reales de este producto).':p.area?'.':', con al menos 4 cm libres en cada borde.')]:['ojo','Se sale del área recomendada: en este producto, una impresión de hasta '+Math.round(r.x1-r.x0)+' × '+Math.round(r.y1-r.y0)+' cm'+(p.slug==='bolso-tote-grande'?', entre las manijas.':p.slug==='portabotella-vino'?', para que se vea de frente sobre la botella.':'.')]);
    if(a){
      out.push(a.transp?['ok','Fondo transparente.']:(a.fondo?['ojo','El logo tiene un fondo '+(a.fondoBlanco?'blanco':'de color')+' que se imprimiría como un rectángulo. Tocá "Quitar fondo" o subí un PNG sin fondo.']:['ojo','El logo no tiene fondo transparente: revisá que no quede un recuadro alrededor.']));
      var nec=Math.round(PZ.lw/2.54*150);out.push(a.w>=nec?['ok','Resolución suficiente para '+cmW+' cm de ancho.']:['ojo','Resolución baja para '+cmW+' cm de ancho: conviene un archivo de al menos '+nec+' px.']);
      if(t==='ser')out.push(a.degrade?['no','Tiene degradés o una foto: no es apto para serigrafía.'+(p.tecnicas.indexOf('sub')>=0?' Probá con sublimación.':' Lo vemos con vos.')]:(a.colores<=4?['ok',a.colores+(a.colores===1?' color, 1 pantalla':' colores, '+a.colores+' pantallas')+': apto para serigrafía.']:['ojo',a.colores+' colores: en serigrafía conviene hasta 4.']));
      if(t==='sub')out.push(claro(p.colores[PZ.c][1])?['ok','Sublimación: admite degradés, fotos y muchos colores.']:['ojo','La sublimación solo funciona sobre telas claras: elegí un color claro u otra técnica.']);
      if(t==='bor'){out.push(a.degrade?['no','Tiene degradés o una foto: no es apto para bordado.']:(a.colores<=6?['ok',a.colores+(a.colores===1?' color':' colores')+': apto para bordado.']:['ojo',a.colores+' colores: en bordado conviene hasta 6.']));if(PZ.lw<5)out.push(['ojo','En bordado chico, los detalles finos y las letras pequeñas pueden perderse.']);}
      if(t==='ase')out.push(['ok','Te recomendamos la técnica al cotizar.']);
    }else out.push(['nada','Subí tu logo para revisarlo.']);
    out.push(PZ.cant>=100?['ok','Cantidad dentro del mínimo de 100 unidades.']:['no','El pedido mínimo es de 100 unidades.']);
    return out.map(function(x){return '<li class="pz-'+x[0]+'"><i aria-hidden="true"></i>'+esc(x[1])+'</li>';}).join('');
  }
  // ---------- 3D ----------
  function tramaTela(){var cv=document.createElement('canvas');cv.width=cv.height=256;var c=cv.getContext('2d');c.fillStyle='#808080';c.fillRect(0,0,256,256);
    for(var i=0;i<256;i+=2){c.fillStyle='rgba(255,255,255,'+(0.08+Math.random()*.1)+')';c.fillRect(0,i,256,1);c.fillStyle='rgba(0,0,0,'+(0.06+Math.random()*.08)+')';c.fillRect(i,0,1,256);}
    for(var k=0;k<1800;k++){c.fillStyle='rgba('+(Math.random()<.5?'0,0,0':'255,255,255')+','+(Math.random()*.14)+')';c.fillRect(Math.random()*256,Math.random()*256,1+Math.random()*3,1);}
    var t=new THREE.CanvasTexture(cv);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(12,12);return t;}
  function malla(){var cv=document.createElement('canvas');cv.width=cv.height=64;var c=cv.getContext('2d');c.fillStyle='#fff';c.fillRect(0,0,64,64);c.fillStyle='#000';
    for(var y=0;y<64;y+=8)for(var x=(y/8%2)*4;x<64;x+=8){c.beginPath();c.arc(x+2,y+2,2.3,0,7);c.fill();}
    var t=new THREE.CanvasTexture(cv);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(16,9);return t;}
  function entorno(ren){var pm=new THREE.PMREMGenerator(ren),s=new THREE.Scene();
    s.add(new THREE.Mesh(new THREE.BoxGeometry(10,10,10),new THREE.MeshBasicMaterial({color:0x9da3a1,side:THREE.BackSide})));
    function luz(x,y,z,w,h,i){var m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:new THREE.Color(i,i*.98,i*.94),side:THREE.DoubleSide}));m.position.set(x,y,z);m.lookAt(0,0,0);s.add(m);}
    luz(0,4.9,0,6,6,2.4);luz(4.9,1.2,2,3,4,1.7);luz(-4.9,1,1,2.4,4,.9);luz(0,1,4.9,5,3,1.1);
    var t=pm.fromScene(s,.04).texture;pm.dispose();return t;}
  // Panel de tela con volumen. op: {frunce: fruncido arriba (mochila), tirones: [x] puntos donde tiran las manijas}
  function bolsa(w,h,prof,lado,op){
    var g=new THREE.PlaneGeometry(w,h,64,64),pos=g.attributes.position;
    for(var i=0;i<pos.count;i++){var x=pos.getX(i),y=pos.getY(i),nx=2*x/w,ny=2*y/h,b=(1-Math.pow(Math.abs(nx),3))*(1-Math.pow(Math.abs(ny),2.8)),z=prof*b;
      z+=.010*(Math.sin(nx*5.5+ny*2.2)+.6*Math.sin(ny*9.5-nx*1.7))*b;
      if(op.tirones)op.tirones.forEach(function(hx){var dx=(x-hx)-(h/2-y)*.28*Math.sign(hx);z+=.018*Math.exp(-dx*dx/.006)*Math.exp(-(h/2-y)/.55)*Math.max(0,1-Math.abs(nx));});
      if(op.frunce){var gq=Math.max(0,(ny-.55)/.45);gq*=gq;pos.setX(i,x*(1-.16*gq));z+=gq*(.03+.018*Math.sin(nx*30));}
      if(ny<-.85){z*=1+.25*(-.85-ny)/.15;}
      pos.setZ(i,lado*z);}
    g.computeVertexNormals();return g;}
  function curva(puntos){return new THREE.CatmullRomCurve3(puntos.map(function(p){return new THREE.Vector3(p[0],p[1],p[2]);}));}
  function tubo(puntos,r,mat,seg){return new THREE.Mesh(new THREE.TubeGeometry(curva(puntos),seg||80,r,10,false),mat);}
  function cinta(puntos,ancho,grosor,mat){var m=tubo(puntos,ancho/2,mat,120);m.scale.z=grosor/ancho;return m;}
  function panelCanvas(){var cv=document.createElement('canvas');cv.width=cv.height=1024;return cv;}
  function colHilo(col){return claro(col)||!oscuro(col)?'rgba(0,0,0,.28)':'rgba(255,255,255,.32)';}
  function costura(c,pts,col){c.save();c.setLineDash([9,7]);c.lineWidth=2.4;c.strokeStyle=colHilo(col);c.beginPath();c.moveTo(pts[0][0],pts[0][1]);for(var i=1;i<pts.length;i++)c.lineTo(pts[i][0],pts[i][1]);c.stroke();c.restore();}
  function deformCopa(g){var pos=g.attributes.position;for(var i=0;i<pos.count;i++){var y=pos.getY(i),z=pos.getZ(i);pos.setY(i,y*1.06);if(z>0){pos.setZ(i,z*(.9+.1*Math.pow(y,2)));}}g.computeVertexNormals();return g;}
  function puntoCopa(R,phi,th){var x=-R*Math.cos(phi)*Math.sin(th),y=R*Math.cos(th)*1.06,z=R*Math.sin(phi)*Math.sin(th);if(z>0)z*=.9+.1*Math.pow(R*Math.cos(th),2);return [x,y,z];}
  function hueco(){var cv=document.createElement('canvas');cv.width=cv.height=512;G3.huecoCv=cv;var t=new THREE.CanvasTexture(cv);return t;}
  function dibujarHueco(c,S,blanco){var p=PRESETS[PZ.p];if(p.asa!=='troquel')return;var w=11/PZ.W*S,h=3/PZ.H*S,y=4.5/PZ.H*S;
    c.save();if(blanco){c.fillStyle='#000';}else{c.globalCompositeOperation='destination-out';c.fillStyle='#000';}
    c.beginPath();if(c.roundRect)c.roundRect(S/2-w/2,y-h/2,w,h,h/2);else c.rect(S/2-w/2,y-h/2,w,h);c.fill();c.restore();}
  function granoCv(){if(G3.granoCv)return G3.granoCv;var cv=document.createElement('canvas');cv.width=cv.height=96;var x=cv.getContext('2d');
    for(var i=0;i<1400;i++){x.fillStyle=Math.random()<.5?'rgba(0,0,0,'+(Math.random()*.5)+')':'rgba(255,255,255,'+(Math.random()*.5)+')';x.fillRect(Math.random()*96,Math.random()*96,1+Math.random()*2,1);}
    return G3.granoCv=cv;}
  // Capa del logo con el acabado de cada técnica: bordado (puntadas y relieve), serigrafía (tinta con grano de tela), sublimación (teñido suave).
  function capaLogo(wpx,hpx,tq){var cv=G3.capa||(G3.capa=document.createElement('canvas')),k=[Math.round(wpx),Math.round(hpx),tq,PZ.img&&PZ.img.length,PZ.imgEl&&PZ.imgEl.src.length].join('|');if(G3.capaK===k)return cv;G3.capaK=k;cv.width=Math.max(1,Math.round(wpx));cv.height=Math.max(1,Math.round(hpx));
    var x=cv.getContext('2d');x.drawImage(PZ.imgEl,0,0,cv.width,cv.height);x.globalCompositeOperation='source-atop';
    if(tq==='bor'){var paso=Math.max(3,cv.width/70);x.lineWidth=paso*.5;for(var i=-cv.height;i<cv.width+cv.height;i+=paso){x.strokeStyle='rgba(255,255,255,.24)';x.beginPath();x.moveTo(i,0);x.lineTo(i+cv.height*.55,cv.height);x.stroke();x.strokeStyle='rgba(0,0,0,.2)';x.beginPath();x.moveTo(i+paso*.5,0);x.lineTo(i+paso*.5+cv.height*.55,cv.height);x.stroke();}}
    else{x.globalAlpha=tq==='sub'?.22:.4;x.fillStyle=x.createPattern(granoCv(),'repeat');x.fillRect(0,0,cv.width,cv.height);x.globalAlpha=1;}
    x.globalCompositeOperation='source-over';return cv;}
  // Sublimación total: el logo se repite como trama en todo el objeto, dejando libre el bies (borde) y las costuras.
  // Sublimación total: UNA imagen que cubre todo el producto (como object-fit: cover), sin imprimir bies ni costuras.
  function dibujarTotal(c,X,Y,W,H,p){var cv=c.canvas,iw=PZ.imgEl.naturalWidth||PZ.imgEl.width,ih=PZ.imgEl.naturalHeight||PZ.imgEl.height,k=Math.max(W/iw,H/ih),dw=iw*k,dh=ih*k;
    var tmp=document.createElement('canvas');tmp.width=cv.width;tmp.height=cv.height;var t2=tmp.getContext('2d');t2.imageSmoothingQuality='high';
    t2.drawImage(capaLogo(X(dw),Y(dh),'sub'),X((W-dw)/2),Y((H-dh)/2),X(dw),Y(dh));G3.capaK=null;
    t2.globalCompositeOperation='destination-in';
    if(G3.mascara)t2.drawImage(G3.mascara,0,0,tmp.width,tmp.height);
    else{var b=p.bies||1.5;t2.fillStyle='#000';t2.fillRect(X(b),Y(b),X(W-2*b),Y(H-2*b));}
    c.drawImage(tmp,0,0);}
  // Máscara imprimible: silueta frontal del modelo dentro de la caja del calco, achicada por el bies y sin las franjas de costura.
  function mascaraSub(mallas,cx,cy,W,H,p){var T=THREE,R=1024,cam=new T.OrthographicCamera(cx-W/2,cx+W/2,cy+H/2,cy-H/2,.01,400);cam.position.set(0,0,200);
    var sc=new T.Scene(),mat=new T.MeshBasicMaterial({color:0xffffff,side:T.DoubleSide});mallas.forEach(function(m){var q=new T.Mesh(m.geometry,mat);q.matrixAutoUpdate=false;q.matrix.copy(m.matrixWorld);q.matrixWorld.copy(m.matrixWorld);q.matrixWorldNeedsUpdate=true;sc.add(q);});
    var ren=G3.renderer,rt=new T.WebGLRenderTarget(R,R),px=new Uint8Array(R*R*4);ren.setRenderTarget(rt);ren.setClearColor(0,0);ren.clear();ren.render(sc,cam);ren.readRenderTargetPixels(rt,0,0,R,R,px);ren.setRenderTarget(null);rt.dispose();mat.dispose();
    var base=document.createElement('canvas');base.width=base.height=R;var bx=base.getContext('2d'),id=bx.createImageData(R,R);
    for(var y=0;y<R;y++)for(var x=0;x<R;x++){var s=((R-1-y)*R+x)*4,d=(y*R+x)*4;id.data[d]=id.data[d+1]=id.data[d+2]=0;id.data[d+3]=px[s]>128?255:0;}bx.putImageData(id,0,0);
    var m=document.createElement('canvas');m.width=m.height=R;var mx=m.getContext('2d');mx.drawImage(base,0,0);mx.globalCompositeOperation='destination-in';
    var b=p.bies||1.5,rx=b/(W*20)*R,ry=b/(H*20)*R;// W y H vienen en unidades 3D (1 = 20 cm)[1,.5].forEach(function(f){for(var i=0;i<24;i++){var an=i/24*Math.PI*2;mx.drawImage(base,Math.cos(an)*rx*f,Math.sin(an)*ry*f);}});
    mx.globalCompositeOperation='source-over';(p.costuras||[]).forEach(function(q){mx.clearRect(0,q[0]*R,R,(q[1]-q[0])*R);});
    return m;}
  function pintarPanel(){if(!G3.cv)return;var d=PZ.lado==='dorso'&&G3.texB;pintarLado(d?G3.cvB:G3.cv);
    if(G3.texB){var o=d?'frente':'dorso';if(o==='frente'||PZ.dor){var c1=G3.capa,k1=G3.capaK;G3.capa=G3.capa2;G3.capaK=G3.capaK2;var ar0=PZ.arr;PZ.arr=false;
        conLado(o,function(){pintarLado(o==='dorso'?G3.cvB:G3.cv);});PZ.arr=ar0;G3.capa2=G3.capa;G3.capaK2=G3.capaK;G3.capa=c1;G3.capaK=k1;}
      else G3.cvB.getContext('2d').clearRect(0,0,1024,1024);G3.texB.needsUpdate=true;}}
  function pintarLado(cv){var p=PRESETS[PZ.p],col=p.colores[PZ.c][1],c=cv.getContext('2d'),S=1024,W=PZ.W,H=PZ.H,X=function(v){return v/W*S;},Y=function(v){return v/H*S;};
    c.globalCompositeOperation='source-over';c.clearRect(0,0,S,S);var liso=G3.modoGLB;if(!liso){c.fillStyle=col;c.fillRect(0,0,S,S);}
    if(!liso&&p.modelo==='tote'){if(p.asa!=='troquel'){costura(c,[[0,Y(2.2)],[S,Y(2.2)]],col);costura(c,[[0,Y(2.6)],[S,Y(2.6)]],col);
        var hx=(p.asa==='corta'?.26:.22);[-1,1].forEach(function(s){var u=(.5+s*hx)*S,a=X(1.8);c.save();c.strokeStyle=colHilo(col);c.setLineDash([7,6]);c.lineWidth=2.2;c.strokeRect(u-a,Y(.3),2*a,Y(2.6));c.beginPath();c.moveTo(u-a,Y(.3));c.lineTo(u+a,Y(2.9));c.moveTo(u+a,Y(.3));c.lineTo(u-a,Y(2.9));c.stroke();c.restore();});}
      else costura(c,[[0,Y(1.2)],[S,Y(1.2)]],col);}
    if(!liso&&p.modelo==='mochila'){costura(c,[[0,Y(3.2)],[S,Y(3.2)]],col);c.fillStyle='rgba(0,0,0,.18)';[0,S].forEach(function(q){c.beginPath();c.moveTo(q,S);c.lineTo(q+(q?-X(5):X(5)),S);c.lineTo(q,S-Y(5));c.fill();});}
    if(!liso&&p.modelo==='gorra'){costura(c,[[0,S-40],[S,S-40]],col);costura(c,[[0,S-58],[S,S-58]],col);}
    var tqA=p.tecnicas[PZ.tec];
    if(PZ.imgEl&&tqA==='subt'){dibujarTotal(c,X,Y,W,H,p);}
    else if(PZ.imgEl){var cx=PZ.cx*W,cy=PZ.cy*H,tq=tqA,lw=X(PZ.lw),lh=Y(PZ.lh),capa=capaLogo(lw,lh,tq);c.save();
      if(tq==='bor'){c.shadowColor='rgba(0,0,0,.42)';c.shadowBlur=5;c.shadowOffsetX=1.5;c.shadowOffsetY=2.5;}
      else if(tq==='sub'){c.globalCompositeOperation='multiply';c.globalAlpha=.92;}
      else{c.globalCompositeOperation=(claro(col)&&!liso)?'multiply':'source-over';c.globalAlpha=.96;}
      c.drawImage(capa,X(cx-PZ.lw/2),Y(cy-PZ.lh/2),lw,lh);c.restore();}
    var r=zonas().rec;
    if(tqA!=='subt'&&!window.__pzSinGuia&&(!PZ.imgEl||PZ.arr||(esBolsa()&&!dentroRec()))){c.setLineDash([14,12]);c.lineWidth=3;c.strokeStyle=oscuro(col)?'rgba(255,255,255,.55)':'rgba(27,124,113,.75)';c.strokeRect(X(r.x0),Y(r.y0),X(r.x1-r.x0),Y(r.y1-r.y0));c.setLineDash([]);
      if(!PZ.imgEl){c.strokeStyle=oscuro(col)?'rgba(255,255,255,.3)':'rgba(27,124,113,.35)';c.strokeRect(X(PZ.cx*W-PZ.lw/2),Y(PZ.cy*H-PZ.lh/2),X(PZ.lw),Y(PZ.lh));}}
    if(!liso)dibujarHueco(c,S,false);
    if(G3.huecoCv){var h=G3.huecoCv.getContext('2d');h.fillStyle='#fff';h.fillRect(0,0,512,512);dibujarHueco(h,512,true);if(G3.hueco)G3.hueco.needsUpdate=true;}
    if(G3.tex)G3.tex.needsUpdate=true;G3.sucio=true;}
  function armarModelo(){
    var p=PRESETS[PZ.p],col=new THREE.Color(p.colores[PZ.c][1]),grupo=new THREE.Group(),bump=G3.bump;
    if(G3.grupo){G3.escena.remove(G3.grupo);G3.grupo.traverse(function(o){if(o.geometry&&!o.userData.cache)o.geometry.dispose();if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(function(m){m.dispose();});});G3.grupo=null;}
    if(G3.tex){G3.tex.dispose();G3.tex=null;}if(G3.texB){G3.texB.dispose();G3.texB=null;}G3.dorsoM=null;G3.telaMat=null;
    G3.modoGLB=false;G3.cuerpoY=0;G3.cuerpoX=0;
    if(p.glb&&G3.glbListo&&G3.glbListo[p.slug]){armarGLB(p,G3.glbListo[p.slug]);return;}
    if(p.glb&&!(G3.glbFallo&&G3.glbFallo[p.slug])){cargaPZ(true,p);cargarGLB(p).then(function(sc){(G3.glbListo=G3.glbListo||{})[p.slug]=sc;if(PRESETS[PZ.p]===p&&G3.escena)armarModelo();},function(){(G3.glbFallo=G3.glbFallo||{})[p.slug]=1;if(PRESETS[PZ.p]===p)cargaPZ(false);});}
    else cargaPZ(false);
    G3.tex=new THREE.CanvasTexture(G3.cv);G3.tex.encoding=THREE.sRGBEncoding;G3.tex.anisotropy=8;
    var rug=claro(p.colores[PZ.c][1])?.95:.85;
    var telaFrente=new THREE.MeshStandardMaterial({map:G3.tex,bumpMap:bump,bumpScale:.006,roughness:rug,metalness:0,envMapIntensity:.8});
    var tela=new THREE.MeshStandardMaterial({color:col,bumpMap:bump,bumpScale:.006,roughness:rug,metalness:0,side:THREE.DoubleSide,envMapIntensity:.8});
    var orilla=new THREE.MeshStandardMaterial({color:col.clone().multiplyScalar(.86),bumpMap:bump,bumpScale:.004,roughness:.95,envMapIntensity:.8});
    G3.frente=null;
    if(p.modelo==='tote'||p.modelo==='mochila'){
      var W=PZ.W/20,H=PZ.H/20,esTote=p.modelo==='tote',hx=(p.asa==='corta'?.26:.22)*W,op=esTote?(p.asa==='troquel'?{}:{tirones:[-hx,hx]}):{frunce:true};
      if(p.asa==='troquel'){telaFrente.alphaTest=.5;tela.alphaMap=G3.hueco;tela.alphaTest=.5;}
      var f=new THREE.Mesh(bolsa(W,H,esTote?.075:.09,1,op),telaFrente),t=new THREE.Mesh(bolsa(W,H,esTote?.075:.09,-1,op),tela);
      f.castShadow=t.castShadow=true;grupo.add(f,t);G3.frente=f;
      var e=.012,top=H/2;
      if(esTote){grupo.add(tubo([[-W/2,top-.02,0],[-W/2-.004,0,0],[-W/2+.004,-top+.03,0],[-W/2+.03,-top,0]],e,orilla),tubo([[W/2,top-.02,0],[W/2+.004,0,0],[W/2-.004,-top+.03,0],[W/2-.03,-top,0]],e,orilla),tubo([[-W/2+.03,-top,0],[0,-top-.006,0],[W/2-.03,-top,0]],e,orilla));
        var asa=new THREE.MeshStandardMaterial({color:col.clone().multiplyScalar(.93),bumpMap:bump,bumpScale:.005,roughness:.9,envMapIntensity:.8});
        if(p.asa!=='troquel'){var al=p.asa==='corta'?.42:1.13;[-1,1].forEach(function(s){var z=s*.025;grupo.add(cinta([[-hx,top-.3,z],[-hx-.01,top,z+s*.01],[-hx-.02,top+al*.44,z+s*.03],[-hx*.62,top+al*.9,z+s*.04],[0,top+al,z+s*.04],[hx*.62,top+al*.9,z+s*.04],[hx+.02,top+al*.44,z+s*.03],[hx+.01,top,z+s*.01],[hx,top-.3,z]],p.asa==='corta'?.09:.11,.018,asa));});}
      }else{
        var lx=W/2*(1-.16);grupo.add(tubo([[-W/2,top-.25,0],[-W/2+.004,0,0],[-W/2,-top,0]],e,orilla),tubo([[W/2,top-.25,0],[W/2-.004,0,0],[W/2,-top,0]],e,orilla),tubo([[-W/2,-top,0],[W/2,-top,0]],e,orilla),
          tubo([[-lx,top,0],[-W/2+.02,top-.22,0],[-W/2,top-.25,0]],e,orilla),tubo([[lx,top,0],[W/2-.02,top-.22,0],[W/2,top-.25,0]],e,orilla));
        var canal=new THREE.Mesh(new THREE.CylinderGeometry(.045,.045,2*lx,24,1,true),orilla);canal.rotation.z=Math.PI/2;canal.position.y=top-.02;canal.scale.set(1,1,.7);grupo.add(canal);
        var cord=new THREE.MeshStandardMaterial({color:0xF2EFE8,roughness:.75,bumpMap:bump,bumpScale:.003});
        [-1,1].forEach(function(s){grupo.add(tubo([[s*lx*.6,top-.02,.05],[s*(lx+.02),top-.04,.05],[s*(W/2+.06),top-.6,.07],[s*(W/2+.03),-top+.3,.06],[s*(W/2-.07),-top+.06,.04]],.018,cord),
            tubo([[s*lx*.6,top-.02,-.05],[s*(lx+.02),top-.04,-.05],[s*(W/2+.08),top-.55,-.07],[s*(W/2+.04),-top+.3,-.05],[s*(W/2-.07),-top+.06,-.02]],.018,cord));
          var ojal=new THREE.Mesh(new THREE.TorusGeometry(.04,.013,10,24),new THREE.MeshStandardMaterial({color:0xC9C4BA,metalness:.85,roughness:.3}));ojal.position.set(s*(W/2-.07),-top+.07,.05);grupo.add(ojal);
          var nudo=new THREE.Mesh(new THREE.SphereGeometry(.035,16,12),cord);nudo.position.set(s*(W/2-.07),-top+.02,.045);grupo.add(nudo);});
      }
    }else{ // gorra trucker
      var R=.95,fa=1.25,php=Math.PI/2;
      var copa=new THREE.Mesh(deformCopa(new THREE.SphereGeometry(R,72,48,php-fa/2,fa,0,Math.PI/2)),telaFrente);copa.castShadow=true;G3.frente=copa;
      var mm=new THREE.MeshStandardMaterial({color:col.clone().lerp(new THREE.Color(0xffffff),.1),alphaMap:G3.malla,transparent:true,alphaTest:.3,side:THREE.DoubleSide,roughness:.9});
      var atras=new THREE.Mesh(deformCopa(new THREE.SphereGeometry(R*.995,72,48,php+fa/2,Math.PI*2-fa,0,Math.PI/2)),mm);atras.castShadow=true;
      var forro=new THREE.Mesh(deformCopa(new THREE.SphereGeometry(R*.97,72,48,0,Math.PI*2,0,Math.PI/2)),new THREE.MeshStandardMaterial({color:col.clone().multiplyScalar(.45),side:THREE.BackSide,roughness:1}));
      grupo.add(copa,atras,forro);
      var cos=new THREE.MeshStandardMaterial({color:col.clone().multiplyScalar(.7),roughness:.9});
      [php-fa/2,php+fa/2,php+Math.PI,php+fa/2+(Math.PI*2-fa)/3,php+fa/2+2*(Math.PI*2-fa)/3].forEach(function(ph){var pts=[];for(var k=0;k<=16;k++){pts.push(puntoCopa(R*1.004,ph,k/16*Math.PI/2*.995));}grupo.add(tubo(pts,.009,cos,40));});
      var aro=[];for(var k=0;k<=64;k++){aro.push(puntoCopa(R*1.003,k/64*Math.PI*2,Math.PI/2));}grupo.add(tubo(aro,.016,cos,128));
      var boton=new THREE.Mesh(new THREE.SphereGeometry(.07,24,12),tela);boton.position.y=R*1.06;boton.scale.y=.45;grupo.add(boton);
      var vg=new THREE.BufferGeometry(),vp=[],vi=[],NA=56,NR=16,L=.92,A=1.12;
      for(var a=0;a<=NA;a++){var ang=-A+2*A*a/NA,bx=Math.sin(ang)*R*.995,bz=Math.cos(ang)*R*.995*.9,ext=L*Math.pow(Math.max(0,Math.cos(ang/A*Math.PI/2)),.65);
        for(var r=0;r<=NR;r++){var tt=r/NR,x=bx*(1+.05*tt),z=bz+ext*tt,y=-.012-.12*tt*tt*ext/L-.12*Math.pow(bx/R,2)*tt;vp.push(x,y,z);}}
      for(a=0;a<NA;a++)for(r=0;r<NR;r++){var i0=a*(NR+1)+r,i1=i0+NR+1;vi.push(i0,i0+1,i1,i1,i0+1,i1+1);}
      vg.setAttribute('position',new THREE.Float32BufferAttribute(vp,3));vg.setIndex(vi);vg.computeVertexNormals();
      var visMat=new THREE.MeshStandardMaterial({color:col.clone().multiplyScalar(claro(p.colores[PZ.c][1])?.92:.55),roughness:1,side:THREE.FrontSide,envMapIntensity:.3});
      var visera=new THREE.Mesh(vg,visMat);visera.castShadow=true;
      var vsom=new THREE.Mesh(vg,new THREE.MeshStandardMaterial({color:col.clone().multiplyScalar(.5),side:THREE.BackSide,roughness:1}));vsom.position.y=-.014;
      grupo.add(visera,vsom);
      var hil=new THREE.MeshStandardMaterial({color:col.clone().lerp(new THREE.Color(oscuro(p.colores[PZ.c][1])?0xffffff:0x000000),.15),roughness:.9});
      [.28,.5,.72].forEach(function(f){var pts=[];for(var a2=0;a2<=NA;a2+=2){var i2=a2*(NR+1)+Math.round(f*NR);pts.push([vp[i2*3],vp[i2*3+1]+.004,vp[i2*3+2]]);}grupo.add(tubo(pts,.0016,hil,100));});
      var tira=new THREE.Mesh(new THREE.BoxGeometry(.5,.08,.03),new THREE.MeshStandardMaterial({color:col.clone().multiplyScalar(.6),roughness:.6}));tira.position.set(0,.08,-R*.97);grupo.add(tira);
      grupo.rotation.x=-.04;var giro=new THREE.Group();giro.add(grupo);giro.rotation.y=-.15;grupo=giro;
    }
    encuadrar(grupo,p);}
  function encuadrar(grupo,p){
    var caja=new THREE.Box3().setFromObject(grupo),tm=caja.getSize(new THREE.Vector3()),sc=2.2/Math.max(tm.y,tm.x*.95,tm.z*(p.modelo==='gorra'?.95:0));grupo.scale.setScalar(sc);G3.cuerpoY*=1;
    caja.setFromObject(grupo);var cen=caja.getCenter(new THREE.Vector3());grupo.position.x-=cen.x;grupo.position.y-=cen.y-.05;G3.piso.position.y=caja.min.y-cen.y+.05-.01;
    if(p.modelo==='gorra')G3.cam.position.set(0,2.1,6.3);else G3.cam.position.set(0,.45,6.6);
    G3.miraBase=new THREE.Vector3(0,p.modelo==='gorra'?-.05:.05,0);if(!G3.miraAct)G3.miraAct=G3.miraBase.clone();G3.miraObj=G3.miraBase.clone();
    G3.grupo=grupo;G3.escena.add(grupo);grupo.rotation.y=G3.rotY||0;pintarPanel();vista();
  }
  // Modelos 3D reales (GLB generados a partir de fotos). La tela se reemplaza por una lisa del color elegido
  // y el logo se proyecta como calcomanía sobre el frente. Si el archivo no carga, queda el modelo genérico.
  // Pantalla de carga del visor: la foto real del producto, desenfocada y con un brillo suave, hasta que el modelo 3D está listo.
  // Aparece recién a los 120 ms (si carga rápido, no se ve) y se va con un fundido.
  function cargaPZ(on,p){var l=document.querySelector('.pz-lienzo');if(!l)return;var c=l.querySelector('.pz-carga');
    if(!c){c=document.createElement('div');c.className='pz-carga';c.setAttribute('aria-hidden','true');c.innerHTML='<img alt=""><span class="pz-carga-tx">Preparando el modelo 3D</span>';l.appendChild(c);}
    clearTimeout(cargaPZ.t);if(on){var im=c.querySelector('img');if(p&&im.getAttribute('src')!==p.foto)im.src=p.foto;l.setAttribute('aria-busy','true');cargaPZ.t=setTimeout(function(){c.classList.add('ver');},120);}
    else{l.removeAttribute('aria-busy');c.classList.remove('ver');}}
  // Precarga: el modelo se baja cuando el cliente apunta o enfoca un producto, y en ratos libres los siguientes de la lista.
  function precargar(i){var p=PRESETS[i];if(!p||!p.glb||!window.THREE||(G3.glbFallo&&G3.glbFallo[p.slug]))return;
    cargarGLB(p).then(function(sc){(G3.glbListo=G3.glbListo||{})[p.slug]=sc;},function(){(G3.glbFallo=G3.glbFallo||{})[p.slug]=1;});}
  function precargarLuego(){var ric=window.requestIdleCallback||function(f){return setTimeout(f,600);},k=1;
    (function sig(){if(!document.getElementById('pz')||k>4)return;ric(function(){precargar((PZ.p+k)%PRESETS.length);k++;sig();});})();}
  function cargarScript(src){return new Promise(function(ok,no){var s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=no;document.head.appendChild(s);});}
  function cargarGLB(p){G3.glbs=G3.glbs||{};if(G3.glbs[p.slug])return G3.glbs[p.slug];
    var libs=(THREE.GLTFLoader?Promise.resolve():cargarScript('js/GLTFLoader.js')).then(function(){return THREE.DecalGeometry?0:cargarScript('js/DecalGeometry.js');});
    return G3.glbs[p.slug]=libs.then(function(){return new Promise(function(ok,no){var L=new THREE.GLTFLoader();
      // los modelos viajan como .json (GLB en base64) porque el visor no sirve .glb; en el sitio real pueden ir como .glb
      if(/\.json$/.test(p.glb))fetch(p.glb).then(function(r){if(!r.ok)throw new Error('glb');return r.json();}).then(function(j){var s=atob(j.glb),u=new Uint8Array(s.length);for(var i=0;i<s.length;i++)u[i]=s.charCodeAt(i);L.parse(u.buffer,'',function(g){ok(desQuant(g.scene));},no);}).catch(no);
      else L.load(p.glb,function(g){ok(g.scene);},null,no);});});}
  // Los .json vienen cuantizados (más livianos); three r128 no desnormaliza al leer, así que se pasan a Float32 una vez.
  function desQuant(sc){sc.traverse(function(o){if(!o.isMesh)return;var g=o.geometry;['position','normal','uv'].forEach(function(k){var at=g.attributes[k];if(!at||at.array instanceof Float32Array)return;
      var d=at.normalized?(at.array instanceof Int8Array?127:at.array instanceof Uint8Array?255:at.array instanceof Int16Array?32767:at.array instanceof Uint16Array?65535:1):1,n=at.count*at.itemSize,f=new Float32Array(n);
      for(var i=0;i<n;i++)f[i]=Math.max(-1,at.array[i]/d);if(!at.normalized)for(var j=0;j<n;j++)f[j]=at.array[j];g.setAttribute(k,new THREE.BufferAttribute(f,at.itemSize));});
      if(g.attributes.normal){var nn=g.attributes.normal;for(var v=0;v<nn.count;v++){var x=nn.getX(v),y=nn.getY(v),z=nn.getZ(v),l=Math.sqrt(x*x+y*y+z*z)||1;nn.setXYZ(v,x/l,y/l,z/l);}}
      g.computeBoundingBox();g.computeBoundingSphere();});return sc;}
  function armarGLB(p,src){
    var col=new THREE.Color(p.colores[PZ.c][1]),rug=claro(p.colores[PZ.c][1])?.95:.85;G3.modoGLB=true;
    col=col.clone().convertSRGBToLinear();var conUV=false;src.traverse(function(o){if(o.isMesh&&o.geometry.attributes.uv)conUV=true;});
    var tela=new THREE.MeshStandardMaterial({color:col,bumpMap:conUV?G3.bump:null,bumpScale:.004,roughness:rug,metalness:0,envMapIntensity:.55,side:THREE.DoubleSide});
    var m=src.clone(true),mallas=[];m.traverse(function(o){if(o.isMesh){if(!o.geometry.attributes.normal)o.geometry.computeVertexNormals();o.material=tela;o.castShadow=true;o.userData.cache=true;mallas.push(o);}});
    if(p.glbRot)m.rotation.y=p.glbRot;m.updateMatrixWorld(true);
    var caja=new THREE.Box3().setFromObject(m),tm=caja.getSize(new THREE.Vector3()),cen=caja.getCenter(new THREE.Vector3());m.position.sub(cen);
    // p.cuerpo: rectángulo del cuerpo (sin manijas, correas ni cuello) medido sobre la silueta frontal del modelo, en fracciones de su caja.
    // El cuerpo se lleva a la medida real en cm (ancho y alto por separado), así el modelo respeta las proporciones del producto.
    var piv=new THREE.Group(),cx=0,cy,cj,W=PZ.W/20,H;piv.add(m);
    if(p.cuerpo){var q=p.cuerpo,sx=W/(tm.x*(q[2]-q[0])),sy=(PZ.H/20)/(tm.y*(q[3]-q[1]));piv.scale.set(sx,sy,sx);piv.updateMatrixWorld(true);
      cj=new THREE.Box3().setFromObject(piv);H=PZ.H/20;cx=(tm.x*((q[0]+q[2])/2)-tm.x/2)*sx;cy=(tm.y/2-tm.y*((q[1]+q[3])/2))*sy;}
    else{if(p.fija){var hEf=Math.round(PZ.W*tm.y/tm.x);if(Math.abs(hEf-PZ.H)>=1){PZ.H=hEf;ajustarLogo();setTimeout(pzPintarPanel,0);}}
      var s0=(p.cm[0]/20)/tm.x;piv.scale.set(s0*PZ.W/p.cm[0],p.fija?s0:s0*PZ.H/p.cm[1],s0*PZ.W/p.cm[0]);piv.updateMatrixWorld(true);
      cj=new THREE.Box3().setFromObject(piv);H=PZ.H/20;cy=p.fija?(cj.min.y+cj.max.y)/2:cj.min.y+H/2;}
    G3.cuerpoY=cy;G3.cuerpoX=cx;G3.mascara=p.tecnicas[PZ.tec]==='subt'?mascaraSub(mallas,cx,cy,W,H,p):null;
    var ray=new THREE.Raycaster(new THREE.Vector3(cx,cy,cj.max.z+1),new THREE.Vector3(0,0,-1)),hit=ray.intersectObjects(mallas)[0],zf=hit?hit.point.z:cj.max.z,dep=Math.max(.02,zf-(cj.min.z+cj.max.z)/2)*2.2;
    G3.tex=new THREE.CanvasTexture(G3.cv);G3.tex.encoding=THREE.sRGBEncoding;G3.tex.anisotropy=8;
    var mat=new THREE.MeshStandardMaterial({map:G3.tex,transparent:true,roughness:rug,metalness:0,envMapIntensity:.8,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-4});
    G3.calcos=G3.calcos||{};var clave=p.slug+'|'+PZ.W+'|'+PZ.H,g2=G3.calcos[clave];
    var subt=p.tecnicas[PZ.tec]==='subt';clave+=subt?'|t':'';g2=G3.calcos[clave];
    // profundidad del cuerpo en una grilla: la cara frontal más profunda antes del centro; lo que está delante (manijas, cordones) no lleva logo
    var NG=28,midZ=(cj.min.z+cj.max.z)/2,prof={},rr=new THREE.Raycaster(),dirZ=new THREE.Vector3(0,0,-1);
    // Para cada celda: todas las caras frontales delante del centro. La superficie de referencia es la mediana (7×7) de la primera capa:
    // las manijas y cordones son finos y desaparecen en la mediana; las capas internas (rollos, cajas, divisiones) quedan detrás.
    var capas=null;function zCuerpo(ix,iy){var k=ix+','+iy;if(k in prof)return prof[k];
      if(!capas){capas=[];for(var gy=0;gy<NG;gy++)for(var gx=0;gx<NG;gx++){rr.set(new THREE.Vector3(cx-W/2+(gx+.5)*W/NG,cy-H/2+(gy+.5)*H/NG,cj.max.z+1),dirZ);
        var hs=rr.intersectObjects(mallas),zs=[];for(var j=0;j<hs.length;j++){var h=hs[j];if(h.point.z<midZ)break;var nn=h.face.normal.clone().transformDirection(h.object.matrixWorld);if(nn.z>0)zs.push(h.point.z);}capas.push(zs);}}
      var v=[];for(var dy=-3;dy<=3;dy++)for(var dx=-3;dx<=3;dx++){var X=ix+dx,Y=iy+dy;if(X<0||Y<0||X>=NG||Y>=NG)continue;var c0=capas[Y*NG+X];if(c0.length)v.push(c0[0]);}
      var zs2=capas[iy*NG+ix];if(!zs2.length||!v.length)return prof[k]=null;v.sort(function(a,b){return a-b;});var ref=v[v.length>>1],z=zs2[0],md=1e9;
      zs2.forEach(function(zz){var d=Math.abs(zz-ref);if(d<md){md=d;z=zz;}});return prof[k]=z;}
    if(!g2){var geos=mallas.map(function(o){return new THREE.DecalGeometry(o,new THREE.Vector3(cx,cy,zf),new THREE.Euler(0,0,0),new THREE.Vector3(W,H,dep));});
    var dg=geos[0];
    // solo las caras que miran al frente (evita que el logo atraviese al dorso)
    var pos=dg.attributes.position,nor=dg.attributes.normal,uv=dg.attributes.uv,P=[],N=[],U=[];
    var tolZ=.6/20;for(var i=0;i<pos.count;i+=3){var nz=(nor.getZ(i)+nor.getZ(i+1)+nor.getZ(i+2))/3;if(nz<.2)continue;
      var mx=(pos.getX(i)+pos.getX(i+1)+pos.getX(i+2))/3,my=(pos.getY(i)+pos.getY(i+1)+pos.getY(i+2))/3,mz=(pos.getZ(i)+pos.getZ(i+1)+pos.getZ(i+2))/3,ix=Math.max(0,Math.min(NG-1,Math.floor((mx-cx+W/2)/W*NG))),iy=Math.max(0,Math.min(NG-1,Math.floor((my-cy+H/2)/H*NG))),zb=zCuerpo(ix,iy);
      if(zb!==null&&(mz>zb+tolZ||mz<zb-3*tolZ))continue;for(var k=0;k<3;k++){P.push(pos.getX(i+k),pos.getY(i+k),pos.getZ(i+k));N.push(nor.getX(i+k),nor.getY(i+k),nor.getZ(i+k));U.push(uv.getX(i+k),uv.getY(i+k));}}
    g2=new THREE.BufferGeometry();g2.setAttribute('position',new THREE.Float32BufferAttribute(P,3));g2.setAttribute('normal',new THREE.Float32BufferAttribute(N,3));g2.setAttribute('uv',new THREE.Float32BufferAttribute(U,2));geos.forEach(function(g){g.dispose();});G3.calcos[clave]=g2;}
    var conDorso=!subt&&tieneDorso(),matB=null;if(conDorso){G3.texB=new THREE.CanvasTexture(G3.cvB);G3.texB.encoding=THREE.sRGBEncoding;G3.texB.anisotropy=8;matB=mat.clone();matB.map=G3.texB;}
    if(subt||conDorso){var cl2=clave+'|dorso',gb=G3.calcos[cl2];
      if(!gb){var rb=new THREE.Raycaster(new THREE.Vector3(cx,cy,cj.min.z-1),new THREE.Vector3(0,0,1)).intersectObjects(mallas)[0],zb2=rb?rb.point.z:cj.min.z;
        var db=mallas.map(function(o){return new THREE.DecalGeometry(o,new THREE.Vector3(cx,cy,zb2),new THREE.Euler(0,Math.PI,0),new THREE.Vector3(W,H,dep));})[0],pb=db.attributes.position,nb=db.attributes.normal,ub=db.attributes.uv,P2=[],N2=[],U2=[];
        for(var q=0;q<pb.count;q+=3){if((nb.getZ(q)+nb.getZ(q+1)+nb.getZ(q+2))/3>-.2)continue;for(var w2=0;w2<3;w2++){P2.push(pb.getX(q+w2),pb.getY(q+w2),pb.getZ(q+w2));N2.push(nb.getX(q+w2),nb.getY(q+w2),nb.getZ(q+w2));U2.push(ub.getX(q+w2),ub.getY(q+w2));}}
        gb=new THREE.BufferGeometry();gb.setAttribute('position',new THREE.Float32BufferAttribute(P2,3));gb.setAttribute('normal',new THREE.Float32BufferAttribute(N2,3));gb.setAttribute('uv',new THREE.Float32BufferAttribute(U2,2));db.dispose();G3.calcos[cl2]=gb;}
      var dorso=new THREE.Mesh(gb,subt?mat:matB);dorso.userData.cache=true;G3.dorsoM=dorso;}
    var calco=new THREE.Mesh(g2,mat);calco.userData.cache=true;G3.telaMat=tela;G3.calcoMat=mat;var grupo=new THREE.Group();grupo.add(piv,calco);if(dorso)grupo.add(dorso);G3.frente=calco;G3.mallasGLB=mallas;
    encuadrar(grupo,p);requestAnimationFrame(function(){requestAnimationFrame(function(){cargaPZ(false);});});}
  // Vista: 3/4, frente o acercada al logo. El render se hace solo cuando algo cambia.
  function vista(){if(!G3.cam||!G3.grupo)return;var p=PRESETS[PZ.p];var atras=PZ.lado==='dorso'&&!!G3.dorsoM;G3.obj=(PZ.vista==='frente'||PZ.zoom)?0:PZ.vista==='libre'?G3.rotY:(p.modelo==='gorra'?-.8:-.35);if(atras&&PZ.vista!=='libre')G3.obj+=Math.PI;
    if(PZ.zoom){if(p.modelo==='gorra'){G3.miraObj.set(0,.3,.9);G3.fovObj=13;}
      else{var s=G3.grupo.scale.x,v=new THREE.Vector3((atras?-1:1)*((PZ.cx-.5)*PZ.W/20+(G3.cuerpoX||0)),(.5-PZ.cy)*PZ.H/20+(G3.cuerpoY||0),.08).multiplyScalar(s).add(G3.grupo.position);G3.miraObj.copy(v);
        var t=Math.max(PZ.lw,PZ.lh*1.1,6)/20*s;G3.fovObj=Math.min(26,Math.max(5,2*Math.atan(t*1.9/2/6.6)*180/Math.PI));}}
    else{G3.miraObj.copy(G3.miraBase);G3.fovObj=26;}G3.sucio=true;}
  function iniciar3D(lienzo){
    if(G3.renderer){G3.renderer.dispose();cancelAnimationFrame(G3.raf);}
    var ren=new THREE.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true});ren.setPixelRatio(Math.min(Math.min(innerWidth,innerHeight)<700?1.75:2,devicePixelRatio||1));ren.outputEncoding=THREE.sRGBEncoding;ren.toneMapping=THREE.ACESFilmicToneMapping;ren.toneMappingExposure=1;
    ren.shadowMap.enabled=true;ren.shadowMap.type=THREE.PCFSoftShadowMap;lienzo.appendChild(ren.domElement);
    var esc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(26,1,.1,50);cam.position.set(0,.45,6.6);cam.lookAt(0,.05,0);
    esc.environment=entorno(ren);
    esc.add(new THREE.HemisphereLight(0xffffff,0xd8d0c0,.25));var sol=new THREE.DirectionalLight(0xfff6ea,.85);sol.position.set(2.2,4.5,3.5);sol.castShadow=true;var chico=Math.min(innerWidth,innerHeight)<700;sol.shadow.mapSize.set(chico?1024:2048,chico?1024:2048);sol.shadow.radius=8;sol.shadow.bias=-.0005;sol.shadow.camera.left=sol.shadow.camera.bottom=-3;sol.shadow.camera.right=sol.shadow.camera.top=3;esc.add(sol);
    var piso=new THREE.Mesh(new THREE.PlaneGeometry(14,14),new THREE.ShadowMaterial({opacity:.2}));piso.rotation.x=-Math.PI/2;piso.position.y=-1.5;piso.receiveShadow=true;esc.add(piso);
    G3={piso:piso,cam:cam,renderer:ren,escena:esc,lienzo:lienzo,cv:panelCanvas(),cvB:panelCanvas(),hueco:null,bump:tramaTela(),malla:malla(),rotY:-.35,obj:-.35,fovObj:26,sucio:true,ray:new THREE.Raycaster()};
    function tam(){var w=lienzo.clientWidth,h=lienzo.clientHeight||w;ren.setSize(w,h,false);ren.domElement.style.width=ren.domElement.style.height='100%';cam.aspect=w/h;cam.updateProjectionMatrix();G3.sucio=true;}
    tam();addEventListener('resize',tam);
    G3.hueco=hueco();armarModelo();
    if(window.ResizeObserver)new ResizeObserver(tam).observe(lienzo);
    (function loop(){G3.raf=requestAnimationFrame(loop);if(!document.body.contains(lienzo)){cancelAnimationFrame(G3.raf);ren.dispose();return;}
      var dr=(G3.drag&&G3.drag.modo==='rotar'?G3.rotY:G3.obj)-G3.rotY;if(Math.abs(dr)>1e-4){G3.rotY+=dr*.14;G3.sucio=true;}
      var fz=G3.fovObj-cam.fov;if(Math.abs(fz)>.01){cam.fov+=fz*.14;cam.updateProjectionMatrix();G3.sucio=true;}
      if(G3.miraAct&&G3.miraAct.distanceTo(G3.miraObj)>1e-4){G3.miraAct.lerp(G3.miraObj,.14);G3.sucio=true;}
      if(!G3.sucio)return;G3.sucio=false;if(G3.miraAct)cam.lookAt(G3.miraAct);if(G3.grupo)G3.grupo.rotation.y=G3.rotY;ren.render(esc,cam);})();
    function uvEn(e){var r=ren.domElement.getBoundingClientRect(),m=new THREE.Vector2((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);G3.ray.setFromCamera(m,cam);var tg=(PZ.lado==='dorso'&&G3.dorsoM)||G3.frente,h=tg?G3.ray.intersectObject(tg):[];return h[0]&&h[0].uv;}
    function aCm(uv){return {x:uv.x*PZ.W,y:(1-uv.y)*PZ.H};}
    var el=ren.domElement;el.style.touchAction='none';el.style.cursor='grab';
    el.addEventListener('pointerdown',function(e){el.setPointerCapture(e.pointerId);var uv=uvEn(e);
      if(uv&&PZ.imgEl){var q=aCm(uv),cx=PZ.cx*PZ.W,cy=PZ.cy*PZ.H;if(Math.abs(q.x-cx)<PZ.lw/2+1.5&&Math.abs(q.y-cy)<PZ.lh/2+1.5){G3.drag={modo:'logo',dx:cx-q.x,dy:cy-q.y};PZ.arr=true;el.style.cursor='grabbing';pintarPanel();return;}}
      G3.drag={modo:'rotar',x:e.clientX,r:G3.rotY};el.style.cursor='grabbing';});
    el.addEventListener('pointermove',function(e){var d=G3.drag;if(!d)return;
      if(d.modo==='rotar'){var b0=(PZ.lado==='dorso'&&G3.dorsoM)?Math.PI:0;G3.rotY=Math.max(b0-1.3,Math.min(b0+1.3,d.r+(e.clientX-d.x)*.01));G3.obj=G3.rotY;G3.sucio=true;if(PZ.vista!=='libre'){PZ.vista='libre';pzBotonesVista();}}
      else{G3.ultMov=e;if(!G3.rafMov)G3.rafMov=requestAnimationFrame(function(){G3.rafMov=0;var ev=G3.ultMov,dd=G3.drag;if(!ev||!dd||dd.modo!=='logo')return;var uv=uvEn(ev);if(uv){var q=aCm(uv);PZ.cx=(q.x+dd.dx)/PZ.W;PZ.cy=(q.y+dd.dy)/PZ.H;ajustarLogo();pintarPanel();}});}});
    var fin=function(){if(G3.drag&&G3.drag.modo==='logo'){PZ.arr=false;pintarPanel();pzPintarPanel();if(PZ.zoom)vista();}G3.drag=null;el.style.cursor='grab';};
    el.addEventListener('pointerup',fin);el.addEventListener('pointercancel',fin);
  }
  function num(v){return String(Math.round(v*10)/10);}
  function numAr(v){return num(v).replace('.',',');}
  // ---------- VEGETAL: PDF A4 en negro pleno a la medida exacta del logo (positivo para serigrafía) ----------
  function firmaMedidas(){return [PZ.p,PZ.W,PZ.H,ladosActivos().map(medidaDe).join('+'),PZ.img?PZ.img.length:0].join('|');}
  function confirmado(){return !!PZ.imgEl&&PZ.confSig===firmaMedidas();}
  function separaciones(){var p=PRESETS[PZ.p],a=PZ.anal||{},t=p.tecnicas[PZ.tec],l=[{nombre:'Diseño completo',idx:-1}];
    if(t==='ser'&&!a.degrade&&a.tintas&&a.colores>1&&a.colores<=6)a.tintas.slice(0,a.colores).forEach(function(h,i){l.push({nombre:'Pantalla '+(i+1)+' de '+a.colores,idx:i,hex:h});});return l;}
  function negroPleno(wmm,hmm,sep){var dpi=300,k=dpi/25.4,w=Math.round(wmm*k),h=Math.round(hmm*k),f=Math.min(1,7000/Math.max(w,h));w=Math.max(1,Math.round(w*f));h=Math.max(1,Math.round(h*f));
    var cv=document.createElement('canvas');cv.width=w;cv.height=h;var x=cv.getContext('2d');x.imageSmoothingQuality='high';x.drawImage(PZ.imgEl,0,0,w,h);
    var id=x.getImageData(0,0,w,h),d=id.data,tin=(PZ.anal&&PZ.anal.tintas||[]).map(function(hx){var n=parseInt(hx.slice(1),16);return [n>>16,(n>>8)&255,n&255];});
    for(var i=0;i<d.length;i+=4){var on=d[i+3]>=128;
      if(on&&sep.idx>=0){var mejor=0,md=1e9;for(var j=0;j<tin.length;j++){var dd=Math.abs(d[i]-tin[j][0])+Math.abs(d[i+1]-tin[j][1])+Math.abs(d[i+2]-tin[j][2]);if(dd<md){md=dd;mejor=j;}}on=mejor===sep.idx;}
      d[i]=d[i+1]=d[i+2]=on?0:255;d[i+3]=255;}
    x.putImageData(id,0,0);return cv;}
  function tramaColor(wmm,hmm,p){var k=150/25.4,w=Math.round(wmm*k),h=Math.round(hmm*k),f=Math.min(1,6000/Math.max(w,h));w=Math.round(w*f);h=Math.round(h*f);
    var cv=document.createElement('canvas');cv.width=w;cv.height=h;var c=cv.getContext('2d');c.fillStyle='#fff';c.fillRect(0,0,w,h);
    G3.capaK=null;dibujarTotal(c,function(v){return v/PZ.W*w;},function(v){return v/PZ.H*h;},PZ.W,PZ.H,p);G3.capaK=null;return cv;}
  function pzVegetal(){var cargar=window.jspdf?Promise.resolve():cargarScript('js/jspdf.umd.min.js');
    return cargar.then(function(){var doc=null,primera=true,LADOS=ladosActivos();LADOS.forEach(function(L){conLado(L,function(){var p=PRESETS[PZ.p],J=window.jspdf.jsPDF,subt=p.tecnicas[PZ.tec]==='subt',wmm=subt?PZ.W*10:Math.round(PZ.lw*100)/10,hmm=subt?PZ.H*10:Math.round(PZ.lh*100)/10,M=14,cab=26,pie=22;
      function cabe(pw,ph){return wmm<=pw-2*M-16&&hmm<=ph-cab-pie-16;}
      var orient=cabe(210,297)?'p':(cabe(297,210)?'l':(wmm>hmm?'l':'p')),PW=orient==='p'?210:297,PH=orient==='p'?297:210;
      if(!doc)doc=new J({orientation:orient,unit:'mm',format:'a4'});var seps=subt?[{nombre:'Imagen para sublimar (a color, frente y dorso)',idx:-2}]:separaciones();
      var aw=PW-2*M-16,ah=PH-cab-pie-16,cols=Math.ceil(wmm/aw),filas=Math.ceil(hmm/ah),hojas=cols*filas;
      function marcas(x0,y0,w,h){doc.setDrawColor(0);doc.setLineWidth(.2);[[x0,y0,-1,-1],[x0+w,y0,1,-1],[x0,y0+h,-1,1],[x0+w,y0+h,1,1]].forEach(function(c){doc.line(c[0]+c[2]*2,c[1],c[0]+c[2]*7,c[1]);doc.line(c[0],c[1]+c[3]*2,c[0],c[1]+c[3]*7);});
        [[x0+w/2,y0-6],[x0+w/2,y0+h+6],[x0-6,y0+h/2],[x0+w+6,y0+h/2]].forEach(function(r){doc.circle(r[0],r[1],1.6);doc.line(r[0]-3,r[1],r[0]+3,r[1]);doc.line(r[0],r[1]-3,r[0],r[1]+3);});}
      seps.forEach(function(sep){var cv=sep.idx===-2?tramaColor(wmm,hmm,p):negroPleno(wmm,hmm,sep),pxmm=cv.width/wmm;
        for(var fi=0;fi<filas;fi++)for(var ci=0;ci<cols;ci++){if(!primera)doc.addPage('a4',orient);primera=false;
          var sx=ci*aw,sy=fi*ah,tw=Math.min(aw,wmm-sx),th=Math.min(ah,hmm-sy),x0=(PW-tw)/2,y0=cab+8+(ah-th)/2;
          var sub=document.createElement('canvas');sub.width=Math.max(1,Math.round(tw*pxmm));sub.height=Math.max(1,Math.round(th*pxmm));sub.getContext('2d').drawImage(cv,Math.round(sx*pxmm),Math.round(sy*pxmm),sub.width,sub.height,0,0,sub.width,sub.height);
          doc.addImage(sub.toDataURL('image/png'),'PNG',x0,y0,tw,th,undefined,'FAST');marcas(x0,y0,tw,th);
          doc.setFont('helvetica','bold');doc.setFontSize(11);doc.setTextColor(0);doc.text((subt?'SUBLIMACIÓN · ':'VEGETAL · ')+p.nombre+(LADOS.length>1?' · '+(L==='dorso'?'DORSO (espalda)':'FRENTE'):'')+' · '+sep.nombre+(hojas>1?' · hoja '+(fi*cols+ci+1)+' de '+hojas:''),M,M);
          doc.setFont('helvetica','normal');doc.setFontSize(8.5);
          doc.text((subt?'Imagen a producto completo · bies de '+numAr(p.bies||1.5)+' cm y costuras sin imprimir (en blanco)  ·  Producto: '+PZ.W+' × '+PZ.H+' cm':'Logo: '+numAr(PZ.lw)+' × '+numAr(PZ.lh)+' cm (medida exacta)')+'  ·  '+(esBolsa()?'Bolsa: '+PZ.W+' × '+PZ.H+' cm  ·  ':'')+'Color de la tela: '+p.colores[PZ.c][0]+'  ·  '+TEC[p.tecnicas[PZ.tec]]+'  ·  '+PZ.cant+' unidades',M,M+5);
          var ubic=(esBolsa()||p.area)?'Ubicación: centro del logo a '+numAr(PZ.cx*PZ.W)+' cm del borde izquierdo y '+numAr(PZ.cy*PZ.H)+' cm del borde superior '+(esBolsa()?'de la bolsa.':'del área de impresión del producto.'):'';if(ubic)doc.text(ubic,M,M+9.5);
          if(sep.hex){doc.text('Tinta de esta pantalla (aprox.): '+sep.hex.toUpperCase(),M,M+14);doc.setFillColor(sep.hex);doc.rect(M+50,M+11.6,6,3,'F');}
          doc.setFontSize(8);doc.text('Imprimir al 100 % (tamaño real, sin "ajustar a la página"). Controlá con la regla: tiene que medir 10 cm.',M,PH-M);
          var ry=PH-M-6;doc.setLineWidth(.25);doc.line(M,ry,M+100,ry);for(var q=0;q<=10;q++){doc.line(M+q*10,ry,M+q*10,ry-(q%5?1.8:3));}doc.text('0',M-.8,ry-3.6);doc.text('10 cm',M+96,ry-3.6);
          doc.text('La Rañatela · laranatela.com',PW-M,PH-M,{align:'right'});}});});});
      return doc.output('blob');});}
  function guardarArchivo(bl,nombre){var abrir=function(){var u=URL.createObjectURL(bl),l=document.createElement('a');l.href=u;l.download=nombre;document.body.appendChild(l);l.click();l.remove();setTimeout(function(){URL.revokeObjectURL(u);},4000);};
    var pc=window.claude&&window.claude.use?window.claude.use('downloads'):Promise.resolve(null);return pc.then(function(dl){if(!dl)return abrir();return dl.save({filename:nombre,data:bl});}).catch(abrir);}
  // Arma lo que se manda por mail junto al pedido: vegetal.pdf, el logo original y el mockup.
  function pzAdjuntos(){return pzVegetal().then(function(veg){return new Promise(function(ok){
      var logo=PZ.orig||PZ.img,ext=(String(logo).match(/^data:image\/(\w+)/)||[0,'png'])[1].replace('jpeg','jpg'),bin=atob(String(logo).split(',')[1]||''),arr=new Uint8Array(bin.length);for(var i=0;i<bin.length;i++)arr[i]=bin.charCodeAt(i);
      var adj={resumen:pzTexto(),archivos:[{nombre:PRESETS[PZ.p].tecnicas[PZ.tec]==='subt'?'sublimacion.pdf':'vegetal.pdf',blob:veg},{nombre:'logo-original.'+ext,blob:new Blob([arr],{type:'image/'+(ext==='jpg'?'jpeg':ext)})}]};
      if(G3.renderer){var aBlob=function(u){var s=atob(u.split(',')[1]),a8=new Uint8Array(s.length);for(var i=0;i<s.length;i++)a8[i]=s.charCodeAt(i);return new Blob([a8],{type:'image/png'});};
        if(PZ.dor&&tieneDorso()&&G3.grupo){var r0=G3.grupo.rotation.y;[['frente',0],['dorso',Math.PI]].forEach(function(q){G3.grupo.rotation.y=q[1];G3.renderer.render(G3.escena,G3.cam);adj.archivos.push({nombre:'mockup-'+q[0]+'.png',blob:aBlob(G3.renderer.domElement.toDataURL('image/png'))});});G3.grupo.rotation.y=r0;G3.sucio=true;ok(adj);}
        else{G3.renderer.render(G3.escena,G3.cam);adj.archivos.push({nombre:'mockup.png',blob:aBlob(G3.renderer.domElement.toDataURL('image/png'))});ok(adj);}}else ok(adj);});});}
  function pzTexto(){var p=PRESETS[PZ.p],cols=PZ.anal?PZ.anal.colores:'';
    return p.nombre+' · '+p.colores[PZ.c][0]+(esBolsa()?' · bolsa de '+PZ.W+' × '+PZ.H+' cm':'')+(p.tecnicas[PZ.tec]==='subt'?' · imagen a producto completo (frente y dorso) · ':ladosActivos().length>1?' · frente '+medidaDe('frente')+' + dorso '+medidaDe('dorso')+' · ':' · impresión de '+numAr(PZ.lw)+' × '+numAr(PZ.lh)+' cm · ')+TEC[p.tecnicas[PZ.tec]]+' · '+PZ.cant+' unidades'+(cols?' · logo de '+cols+(cols===1?' color':' colores'):'');}
  function maxAncho(){var z=zonas().max;return Math.max(1,Math.min(z.x1-z.x0,(z.y1-z.y0)/ar()));}
  function pzBotonesVista(){var raiz=document.getElementById('pz');if(!raiz)return;raiz.querySelectorAll('.pz-ctl [data-v]').forEach(function(b){var v=b.dataset.v;b.setAttribute('aria-pressed',v==='zoom'?String(PZ.zoom):String(!PZ.zoom&&PZ.vista===v));});}
  function pzPintarPanel(){var raiz=document.getElementById('pz');if(!raiz)return;var p=PRESETS[PZ.p],r=zonas().rec,a=PZ.anal;
    raiz.querySelectorAll('.pz-prods button').forEach(function(b,i){b.setAttribute('aria-checked',i===PZ.p?'true':'false');});
    var soloB=p.tecnicas[PZ.tec]==='subt';raiz.classList.toggle('pz-modo-total',soloB);raiz.querySelector('.pz-cols').innerHTML=p.colores.map(function(c,i){var off=soloB&&c[0]!=='Blanco';return '<button type="button" role="radio" aria-checked="'+(i===PZ.c)+'" data-c="'+i+'"'+(off?' aria-disabled="true" title="La sublimación total va solo sobre tela blanca"':'')+'><i style="background:'+c[1]+'"></i>'+esc(c[0])+'</button>';}).join('')+(soloB?'<p class="pz-tip" style="width:100%">La sublimación total va solo sobre tela blanca.</p>':'');
    raiz.querySelector('.pz-tecs').innerHTML=p.tecnicas.map(function(t,i){return '<button type="button" role="radio" aria-checked="'+(i===PZ.tec)+'" data-t="'+i+'">'+TEC[t]+'</button>';}).join('');
    var fm=raiz.querySelector('.pz-fs-medida');fm.hidden=!esBolsa()&&!p.fija;fm.classList.toggle('pz-fija',!!p.fija);fm.querySelector('legend').textContent=p.fija?'3 · Medida':'3 · Medida de la bolsa';if(p.fija)fm.querySelector('.pz-std').textContent='Medida estándar: '+p.cm[0]+' × '+p.cm[1]+' cm. Este producto se hace solo en esta medida.';
    var ld=raiz.querySelector('.pz-lados');ld.hidden=!tieneDorso();if(tieneDorso()){ld.querySelectorAll('[data-lado]').forEach(function(x){x.setAttribute('aria-pressed',String(x.dataset.lado===PZ.lado));});
      ld.querySelector('[data-lado="dorso"]').textContent=PZ.dor?'Dorso':'+ Dorso';
      ld.querySelector('.pz-lado-tip').innerHTML=PZ.lado==='dorso'?'Estás editando la espalda. <button type="button" class="pz-link" data-v="sindorso">Sin impresión en el dorso</button>':(PZ.dor?'Imprimís en los dos lados. Tocá Dorso para editar la espalda.':'¿También en la espalda? Tocá Dorso: se imprime con el mismo logo.');}
    if(esBolsa()){var aw=raiz.querySelector('#pz-bw'),ah=raiz.querySelector('#pz-bh');if(document.activeElement!==aw)aw.value=PZ.W;if(document.activeElement!==ah)ah.value=PZ.H;
      raiz.querySelector('.pz-std').textContent='Medida estándar: '+p.cm[0]+' × '+p.cm[1]+' cm.';}
    var iw=raiz.querySelector('#pz-iw'),ih=raiz.querySelector('#pz-ih');if(document.activeElement!==iw)iw.value=num(PZ.lw);if(document.activeElement!==ih)ih.value=num(PZ.lh);
    var rg=raiz.querySelector('#pz-esc'),mx=maxAncho();rg.max=Math.floor(mx*2)/2;if(document.activeElement!==rg)rg.value=PZ.lw;
    raiz.querySelector('.pz-rec').textContent=esBolsa()?(p.area?'Área de impresión recomendada'+(p.medida?', medida en pedidos reales':'')+': hasta '+Math.round(r.x1-r.x0)+' × '+Math.round(r.y1-r.y0)+' cm.':'Recomendamos dejar al menos 4 cm libres en cada borde de la bolsa: máximo '+Math.round(r.x1-r.x0)+' × '+Math.round(r.y1-r.y0)+' cm.'):'Área de impresión recomendada: hasta '+Math.round(r.x1-r.x0)+' × '+Math.round(r.y1-r.y0)+' cm.';
    var info=raiz.querySelector('.pz-logo-info');
    if(PZ.imgEl&&a){info.hidden=false;info.innerHTML='<div class="pz-arch"><b>'+esc(PZ.archivo||'Tu logo')+'</b><span>'+a.w+' × '+a.h+' px</span></div>'+
        (a.tintas&&a.tintas.length&&!a.degrade?'<div class="pz-tintas" title="Colores detectados"><span>'+a.colores+(a.colores===1?' color':' colores')+'</span>'+a.tintas.map(function(h){return '<i style="background:'+h+'"></i>';}).join('')+'</div>':(a.degrade?'<div class="pz-tintas"><span>Degradé o foto</span></div>':''))+
        '<div class="pz-acc">'+(a.fondo?'<button type="button" class="pz-mini pz-destacado" data-v="fondo">Quitar fondo</button>':'')+(PZ.orig?'<button type="button" class="pz-mini" data-v="deshacer">Volver al original</button>':'')+'<button type="button" class="pz-mini" data-v="rec">Máximo recomendado</button><button type="button" class="pz-mini" data-v="centrar">Centrar</button><button type="button" class="pz-mini" data-v="quitar">Quitar logo</button></div>';}
    else{info.hidden=true;info.innerHTML='';}
    raiz.querySelector('.pz-subir span').textContent=PZ.imgEl?'Cambiar logo':'Subir logo';
    raiz.querySelector('.pz-badge').textContent=PZ.imgEl?(p.tecnicas[PZ.tec]==='subt'?'Impresión total · '+PZ.W+' × '+PZ.H+' cm':(tieneDorso()?(PZ.lado==='dorso'?'Dorso · ':'Frente · '):'')+numAr(PZ.lw)+' × '+numAr(PZ.lh)+' cm'):(esBolsa()?'Bolsa de '+PZ.W+' × '+PZ.H+' cm':p.nombre);
    raiz.querySelector('.pz-ver').innerHTML=pzVeredicto();
    var e=pzEstimar(),fe=diasHabiles(e.max).toLocaleDateString('es-AR',{day:'numeric',month:'long'});
    raiz.querySelector('.pz-plazo').innerHTML='<b>'+e.min+' a '+e.max+' días hábiles</b><span>Con aprobación hoy, entrega estimada antes del '+fe+'.</span>';
    var tx=pzTexto();raiz.querySelector('.pz-resumen').textContent=tx;
    raiz.querySelector('.pz-pedir').href='#/contacto?'+encodeURIComponent('Personalizado: '+tx);
    raiz.querySelector('.pz-wa').href=WA+encodeURIComponent('Hola, quiero cotizar un producto personalizado: '+tx+(window.__envioReal?'. (El diseño ya les llegó por mail desde la web.)':'. Les paso mi logo por acá.'));
    var ok=raiz.querySelector('#pz-okmed'),ctx=raiz.querySelector('.pz-conf-tx'),listo=confirmado();ok.checked=listo;ok.disabled=!PZ.imgEl;
    ctx.innerHTML=PZ.imgEl&&p.tecnicas[PZ.tec]==='subt'?'Confirmo: mi imagen cubre todo el producto de <b>'+PZ.W+' × '+PZ.H+' cm</b>, frente y dorso, sin imprimir bies ni costuras.':PZ.imgEl?'Confirmo las medidas: '+(esBolsa()?'bolsa de <b>'+PZ.W+' × '+PZ.H+' cm</b> y ':'')+(ladosActivos().length>1?'logo de <b>'+medidaDe('frente')+'</b> en el frente y <b>'+medidaDe('dorso')+'</b> en el dorso':'logo de <b>'+numAr(PZ.lw)+' × '+numAr(PZ.lh)+' cm</b>')+'. El vegetal se imprime a esa medida exacta.':'Subí tu logo y revisá las medidas para poder enviar.';
    raiz.querySelectorAll('.pz-pedir,.pz-wa').forEach(function(a){a.setAttribute('aria-disabled',String(!listo));});
    pzBotonesVista();
  }
  function refrescar(rearmar){ajustarLogo();if(rearmar&&G3.escena)armarModelo();else{pintarPanel();if(PZ.zoom)vista();}pzPintarPanel();}
  function pzDescargar(btn){if(!G3.renderer)return;var p=PRESETS[PZ.p];G3.miraAct&&G3.cam.lookAt(G3.miraAct);G3.renderer.render(G3.escena,G3.cam);
    var src=G3.renderer.domElement,S=1200,pie=190,cv=document.createElement('canvas');cv.width=S;cv.height=S+pie;var c=cv.getContext('2d'),ff=getComputedStyle(document.body).fontFamily;
    var gr=c.createRadialGradient(S/2,S*.4,0,S/2,S*.4,S*.75);gr.addColorStop(0,'#F7F8F6');gr.addColorStop(1,'#E7ECEA');c.fillStyle=gr;c.fillRect(0,0,S,S);
    var k=Math.max(S/src.width,S/src.height)*1.22,w=src.width*k,h=src.height*k;c.drawImage(src,(S-w)/2,(S-h)/2,w,h);
    c.fillStyle='#fff';c.fillRect(0,S,S,pie);c.fillStyle='#1B7C71';c.fillRect(0,S,S,6);
    c.fillStyle='#1F3A37';c.font='700 38px '+ff;c.fillText(p.nombre+' · '+p.colores[PZ.c][0],56,S+70);
    c.fillStyle='#4B5A58';c.font='500 26px '+ff;c.fillText((PZ.imgEl?'Impresión de '+numAr(PZ.lw)+' × '+numAr(PZ.lh)+' cm · ':'')+TEC[p.tecnicas[PZ.tec]]+' · '+PZ.cant+' unidades',56,S+114);
    c.fillStyle='#7A8785';c.font='500 22px '+ff;c.fillText('Mockup orientativo · La Rañatela · laranatela.com',56,S+154);
    var nombre='mockup-'+p.slug+'.png';btn.disabled=true;
    cv.toBlob(function(bl){var listo=function(){btn.disabled=false;};
      var abrir=function(){var u=URL.createObjectURL(bl),l=document.createElement('a');l.href=u;l.download=nombre;document.body.appendChild(l);l.click();l.remove();setTimeout(function(){URL.revokeObjectURL(u);},4000);listo();};
      var pc=window.claude&&window.claude.use?window.claude.use('downloads'):Promise.resolve(null);
      pc.then(function(dl){if(!dl)return abrir();return dl.save({filename:nombre,data:bl}).then(listo,listo);}).catch(abrir);},'image/png');}
  var COLHEX={};PRESETS.forEach(function(p){(p.colores||[]).forEach(function(c){COLHEX[c[0].toLowerCase()]=c[1];});});
  function pzSumarCMS(){Object.keys(CMS.productos||{}).forEach(function(k){var o=CMS.productos[k],z=o&&o.pz;if(!o||o.oculto||!z||!z.on||!z.glb||!z.area||!z.cm)return;
    if(PRESETS.some(function(p){return p.slug===k;}))return;var cols=(o.colores||[]).map(function(c){return [c,COLHEX[c.toLowerCase()]||'#D8D4CC'];});
    PRESETS.push({slug:k,nombre:o.nombre,modelo:'tote',fija:true,cuerpo:[0,0,1,1],cm:z.cm,area:z.area,glb:z.glb,foto:img(o.imagen),tecnicas:z.tecnicas.concat(['ase']),colores:cols.length?cols:CG});});}
  R.personalizar=function(q){pzSumarCMS();
    var i=PRESETS.map(function(p){return p.slug;}).indexOf(q||'');if(i>=0&&i!==PZ.p)cargarPreset(i);else if(PZ.W===38&&PZ.p===0&&!PZ.img)cargarPreset(PZ.p);
    function campoCm(id,lab){return '<label class="pz-cm"><span>'+lab+'</span><input id="'+id+'" type="number" inputmode="decimal" min="1" max="100" step="0.5"><em>cm</em></label>';}
    return '<section class="cont pag-cab">'+ojal('Probá tu logo',true)+'<h1 class="h1">Personalizá tu producto <span class="beta">Beta</span></h1><p class="lead entra e3">Elegí un producto, subí tu logo y mirá cómo queda. Te mostramos si es apto para imprimir y un plazo estimado de entrega.</p><p class="beta-nota entra e3">Esta herramienta está en prueba: puede tener errores y todavía no incluye todos los productos. Lo que ves es orientativo; el presupuesto final lo confirmamos nosotros.</p></section>'+
      '<section class="cont" style="padding-bottom:clamp(64px,8vw,104px)"><div class="pz" id="pz">'+
      '<div class="pz-vista"><div class="pz-lienzo"><span class="pz-badge" aria-live="polite"></span>'+
        '<div class="pz-ctl" role="group" aria-label="Vista del producto"><button type="button" data-v="34" aria-pressed="true">3/4</button><button type="button" data-v="frente" aria-pressed="false">Frente</button><button type="button" data-v="zoom" aria-pressed="false">Acercar</button></div>'+
        '<button type="button" class="pz-desc" data-v="desc" aria-label="Descargar imagen del mockup"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19h14"/></svg><span>Descargar</span></button></div>'+
        '<p class="pz-aviso">Arrastrá el producto para girarlo y el logo para moverlo. Es un mockup digital: colores y proporciones son aproximados.</p></div>'+
      '<div class="pz-panel">'+
      '<fieldset><legend>1 · Producto</legend><div class="pz-prods" role="radiogroup">'+PRESETS.map(function(p,k){return '<button type="button" role="radio" data-p="'+k+'"><span class="pz-th">'+(p.glb?'<img src="img/3d/th/'+p.slug+'.webp" alt="" loading="lazy" data-alt-src="'+p.foto+'">':'<img class="pz-foto" src="'+p.foto+'" alt="" loading="lazy">')+'</span><span class="pz-nom">'+esc(p.nombre)+'</span></button>';}).join('')+'</div></fieldset>'+
      '<fieldset><legend>2 · Color</legend><div class="pz-cols" role="radiogroup"></div></fieldset>'+
      '<fieldset class="pz-fs-medida"><legend>3 · Medida de la bolsa</legend><div class="pz-par">'+campoCm('pz-bw','Ancho')+'<span class="pz-x">×</span>'+campoCm('pz-bh','Alto')+'</div><p class="pz-tip pz-std"></p></fieldset>'+
      '<fieldset><legend>4 · Tu logo y tamaño de impresión</legend><label class="pz-subir"><input type="file" accept="image/png,image/svg+xml,image/jpeg,image/webp"><span>Subir logo</span><small>PNG con fondo transparente, ideal. También JPG: te ayudamos a quitar el fondo.</small></label>'+
      '<div class="pz-logo-info" hidden></div>'+
      '<div class="pz-lados" hidden><div class="pz-seg" role="group" aria-label="Lado que estás editando"><button type="button" data-lado="frente">Frente</button><button type="button" data-lado="dorso">Dorso</button></div><p class="pz-tip pz-lado-tip"></p></div>'+
      '<label class="pz-rango"><span>Tamaño</span><input type="range" id="pz-esc" min="2" max="30" step="0.5" aria-label="Ancho de la impresión en centímetros"></label>'+
      '<div class="pz-par pz-par-logo" style="margin-top:10px">'+campoCm('pz-iw','Ancho')+'<span class="pz-x">×</span>'+campoCm('pz-ih','Alto')+'</div><p class="pz-tip pz-rec"></p></fieldset>'+
      '<fieldset><legend>5 · Tipo de impresión</legend><div class="pz-tecs pz-prod" role="radiogroup"></div><p class="pz-tip">La vista previa simula el acabado de cada técnica.</p></fieldset>'+
      '<fieldset><legend>6 · Cantidad</legend><div class="pz-cant"><button type="button" data-d="-50" aria-label="Restar 50">−</button><input type="number" min="100" step="50" value="'+PZ.cant+'" inputmode="numeric" aria-label="Cantidad de unidades"><button type="button" data-d="50" aria-label="Sumar 50">+</button></div></fieldset>'+
      '<div class="pz-res"><p class="pz-et">Revisión</p><ul class="pz-ver"></ul><p class="pz-et">Plazo estimado</p><div class="pz-plazo"></div><p class="pz-chico">Estimado según cantidad, técnica y medida. Lo confirmamos al recibir tu pedido.</p>'+
      '<p class="pz-et">Tu pedido</p><p class="pz-resumen"></p>'+'<label class="pz-conf"><input type="checkbox" id="pz-okmed"><span class="pz-conf-tx"></span></label>'+
      '<a class="btn pz-pedir" href="#/contacto">Pedir presupuesto con este diseño</a><a class="btn am pz-wa" href="#" target="_blank" rel="noopener">Consultar por WhatsApp</a><p class="pz-chico pz-veg-nota" style="margin:10px 0 0">Con tu pedido nos llega tu logo y el vegetal a la medida exacta: no tenés que descargar ni adjuntar nada.</p></div></div></div></section>';
  };
  window.__pzG3=function(){return G3;};
  window.__pzIniciar=function(){var raiz=document.getElementById('pz');if(!raiz)return;
    cargaPZ(true,PRESETS[PZ.p]);if(!window.THREE&&!window.__thr&&window.THREE_URL){window.__thr=1;cargarScript(window.THREE_URL);}var arrancar=function(){if(window.THREE){iniciar3D(raiz.querySelector('.pz-lienzo'));setTimeout(precargarLuego,1500);}else setTimeout(arrancar,150);};
    var pre=function(e){var b=e.target.closest&&e.target.closest('.pz-prods button');if(b)precargar(+b.dataset.p);};raiz.addEventListener('pointerover',pre);raiz.addEventListener('focusin',pre);raiz.addEventListener('touchstart',pre,{passive:true});arrancar();pzPintarPanel();
    function cargarImg(src,orig){PZ.img=src;pzLeer(src,function(im,a){var a0=ar();PZ.imgEl=im;PZ.anal=a;PZ.lh=PZ.lw*im.height/im.width;if(PZ.otro)PZ.otro.lh=PZ.otro.lw*im.height/im.width;refrescar(false);});}
    raiz.addEventListener('click',function(e){var b=e.target.closest('button');if(!b||!raiz.contains(b))return;var v=b.dataset.v;
      if(b.dataset.p!==undefined){cargarPreset(+b.dataset.p);refrescar(true);}
      else if(b.dataset.c!==undefined){if(b.getAttribute('aria-disabled')==='true')return;PZ.c=+b.dataset.c;if(G3.modoGLB&&G3.telaMat){var hx=PRESETS[PZ.p].colores[PZ.c][1],rg=claro(hx)?.95:.85;G3.telaMat.color.set(hx).convertSRGBToLinear();G3.telaMat.roughness=rg;if(G3.calcoMat)G3.calcoMat.roughness=rg;pintarPanel();pzPintarPanel();}else refrescar(true);}
      else if(b.dataset.t!==undefined){var pp=PRESETS[PZ.p],antes=pp.tecnicas[PZ.tec];PZ.tec=+b.dataset.t;var ahora=pp.tecnicas[PZ.tec];
        if(ahora==='subt'){var iB=pp.colores.map(function(x){return x[0];}).indexOf('Blanco');if(iB>=0)PZ.c=iB;}
        refrescar(antes==='subt'||ahora==='subt');}
      else if(b.dataset.d){PZ.cant=Math.max(50,PZ.cant+ +b.dataset.d);raiz.querySelector('.pz-cant input').value=PZ.cant;pzPintarPanel();}
      else if(b.dataset.lado){cambiarLado(b.dataset.lado);if(PZ.vista==='libre')PZ.vista='34';vista();pzBotonesVista();refrescar(false);}
      else if(v==='sindorso'){PZ.dor=false;if(PZ.lado==='dorso'){cambiarLado('frente');PZ.dor=false;vista();}refrescar(false);}
      else if(v==='34'||v==='frente'){PZ.vista=v;PZ.zoom=false;vista();pzBotonesVista();}
      else if(v==='zoom'){PZ.zoom=!PZ.zoom;vista();pzBotonesVista();}
      else if(v==='desc')pzDescargar(b);
      else if(v==='fondo'){b.disabled=true;b.textContent='Quitando fondo…';setTimeout(function(){PZ.orig=PZ.img;pzQuitarFondo(function(src){cargarImg(src);});},30);}
      else if(v==='deshacer'){var o=PZ.orig;PZ.orig=null;if(o)cargarImg(o);}
      else if(v==='rec'){var r=zonas().rec,a=ar();PZ.lw=Math.min(r.x1-r.x0,(r.y1-r.y0)/a);PZ.lh=PZ.lw*a;PZ.cx=(r.x0+r.x1)/2/PZ.W;PZ.cy=(r.y0+r.y1)/2/PZ.H;refrescar(false);}
      else if(v==='centrar'){var r2=zonas().rec;PZ.cx=(r2.x0+r2.x1)/2/PZ.W;PZ.cy=(r2.y0+r2.y1)/2/PZ.H;refrescar(false);}
      else if(v==='quitar'){PZ.img=null;PZ.imgEl=null;PZ.anal=null;PZ.orig=null;PZ.archivo='';raiz.querySelector('input[type=file]').value='';refrescar(false);}});
    raiz.querySelector('#pz-okmed').addEventListener('change',function(){PZ.confSig=this.checked?firmaMedidas():null;pzPintarPanel();});
    raiz.addEventListener('click',function(e){var a=e.target.closest('.pz-pedir,.pz-wa');if(!a)return;e.preventDefault();
      if(!confirmado()){var c=raiz.querySelector('.pz-conf');c.classList.remove('pz-avisar');void c.offsetWidth;c.classList.add('pz-avisar');(PZ.imgEl?raiz.querySelector('#pz-okmed'):raiz.querySelector('.pz-subir input')).focus();return;}
      var esWa=a.classList.contains('pz-wa'),href=a.href,win=esWa?window.open('','_blank'):null,txt=a.textContent;a.textContent='Preparando tu diseño…';
      pzAdjuntos().then(function(adj){window.__adjuntosPZ=adj;a.textContent=txt;
        if(esWa){window.__enviarPedido({origen:'WhatsApp',resumen:adj.resumen},adj);if(win)win.location=href;else window.open(href,'_blank');}
        else window.__irA(href.slice(href.indexOf('#')));},function(){a.textContent=txt;if(win)win.close();});});
    raiz.querySelector('.pz-cant input').addEventListener('input',function(){var v=parseInt(this.value,10);if(v>0){PZ.cant=v;pzPintarPanel();}});
    function leer(el){return parseFloat(String(el.value).replace(',','.'));}
    ['pz-bw','pz-bh'].forEach(function(id){raiz.querySelector('#'+id).addEventListener('change',function(){var v=leer(this);if(!(v>=12&&v<=100)){pzPintarPanel();return;}if(id==='pz-bw')PZ.W=v;else PZ.H=v;refrescar(true);});});
    raiz.querySelector('#pz-iw').addEventListener('change',function(){var v=leer(this);if(v>0){var a=ar();PZ.lw=v;if(PZ.imgEl)PZ.lh=v*a;refrescar(false);}});
    raiz.querySelector('#pz-ih').addEventListener('change',function(){var v=leer(this);if(v>0){if(PZ.imgEl)PZ.lw=v/ar();else PZ.lh=v;refrescar(false);}});
    raiz.querySelector('#pz-esc').addEventListener('input',function(){var v=leer(this);if(v>0){var a=ar();PZ.lw=v;PZ.lh=v*a;refrescar(false);}});
    raiz.querySelector('input[type=file]').addEventListener('change',function(){var f=this.files&&this.files[0];if(!f)return;
      var okTipo=/^image\/(png|jpeg|webp|svg\+xml)$/.test(f.type)&&/\.(png|jpe?g|webp|svg)$/i.test(f.name),okPeso=f.size<=15*1024*1024;
      if(!okTipo||!okPeso){this.value='';var vr=raiz.querySelector('.pz-ver');if(vr)vr.innerHTML='<li class="no">'+(okTipo?'El archivo pesa más de 15 MB. Probá con uno más liviano.':'Ese formato no sirve. Subí un PNG, JPG, WEBP o SVG.')+'</li>';return;}
      var rd=new FileReader();PZ.archivo=f.name;PZ.orig=null;
      rd.onload=function(){PZ.anal=null;cargarImg(rd.result);};rd.readAsDataURL(f);});
  };
  // ===================== Contenido editable (panel de administración) =====================
  // Los cambios se guardan en la base de datos del sitio (capacidad db) y las fotos en sus archivos (assets).
  var CMS={general:{},novedades:{},productos:{},galerias:[],prensa:{},casos:{},secciones:{}}, CMSDB=null, CMSASSETS=null, CMSUSER=null;
  var NOV0=D.novedades.slice(), PROD0=D.productos.map(function(p){return Object.assign({},p);}), NAV0=NAVIDAD.slice(), PRENSA0=PRENSA.slice(), GALETI0=GAL_ETI.slice(), IMP0=IMPACTO.map(function(x){return x.slice();});
  var REDES0={wa:'5492615341275',instagram:'https://www.instagram.com/laranatelamendoza/',tiktok:'https://www.tiktok.com/@lorenacoria75',linkedin:'https://www.linkedin.com/in/eti-la-ra%C3%B1atela-32b430441/'};
  function g(k,def){var v=CMS.general[k];return (v===undefined||v===null||v==='')?def:v;}
  function aplicarCMS(){
    WA='https://wa.me/'+String(g('whatsapp',REDES0.wa)).replace(/\D/g,'')+'?text=';
    PRECIO_TO=g('precioTO','$20.000');PUNTOS_TO=g('puntosTO','Honey House y La Rañatela.');FECHA_ETI=g('fechaETI','20 de noviembre');
    var imp=CMS.general.impacto;IMPACTO=(imp&&imp.length===3)?imp.map(function(x,i){return [x.n||IMP0[i][0],x.t||IMP0[i][1],x.s||IMP0[i][2]];}):IMP0.map(function(x){return x.slice();});
    var r={instagram:g('instagram',REDES0.instagram),tiktok:g('tiktok',REDES0.tiktok),linkedin:g('linkedin',REDES0.linkedin)};
    var rf=document.querySelectorAll('.redes-flot a');if(rf.length===3){rf[0].href=r.instagram;rf[1].href=r.tiktok;rf[2].href=r.linkedin;}
    var wf=document.querySelector('.wa-flot');if(wf)wf.href=WA+encodeURIComponent('¡Hola! Vi la página de La Rañatela y quería consultar por un presupuesto.');
    // novedades: originales + cambios + nuevas
    var lista=NOV0.map(function(n){var o=CMS.novedades[n.slug];return o?Object.assign({},n,o.datos):n;}).filter(function(n){var o=CMS.novedades[n.slug];return !(o&&o.eliminada);});
    Object.keys(CMS.novedades).forEach(function(k){var o=CMS.novedades[k];if(o.nueva&&!o.eliminada)lista.unshift(Object.assign({slug:k,etapas:[],body:[]},o.datos));});
    D.novedades=lista;
    var nuevos=Object.keys(CMS.productos).filter(function(k){return CMS.productos[k].nuevo;}).map(function(k){var o=CMS.productos[k];return Object.assign({slug:k,colores:[],impresion:[],reciclado:false,orden:99,body:[],imagenAlt:o.nombre||''},o);});
    D.productos=PROD0.map(function(p){var o=CMS.productos[p.slug];return o?Object.assign({},p,o):p;}).concat(nuevos).filter(function(p){return !p.oculto;});
    PRENSA=PRENSA0.map(function(n){var o=CMS.prensa[n.id];return o?Object.assign({},n,o):n;}).concat(Object.keys(CMS.prensa).filter(function(k){return CMS.prensa[k].nueva;}).map(function(k){return Object.assign({id:k},CMS.prensa[k]);})).filter(function(n){return !n.eliminada;});
    NAVIDAD=NAV0.concat(CMS.galerias.filter(function(x){return x.galeria==='navidad';}).map(function(x){return [x.url,x.pie||'Regalo navideño de La Rañatela',x.pie||'Regalo navideño'];}));
    GAL_ETI=GALETI0.concat(CMS.galerias.filter(function(x){return x.galeria==='eti';}).map(function(x){return x.url;}));
    CASOS=CASOS0.map(function(c){var o=CMS.casos[c.id];return o?Object.assign({},c,o):c;}).concat(Object.keys(CMS.casos).filter(function(k){return CMS.casos[k].nuevo;}).map(function(k){return Object.assign({id:k},CMS.casos[k]);})).filter(function(c){return !c.eliminada;}).sort(function(a,b){return (a.orden||0)-(b.orden||0);});
    SEC=CMS.secciones||{};
  }
  var cmsT=null;function cmsCambio(){aplicarCMS();clearTimeout(cmsT);cmsT=setTimeout(function(){if(window.__repintar&&!(window.__pag&&window.__pag.r==='admin'))window.__repintar();if(window.__pag&&window.__pag.r==='admin')adminPintar();},120);}
  function cmsIniciar(){
    if(!window.claude||!window.claude.use)return;
    window.claude.use('db').then(function(db){if(!db)return;CMSDB=db;
      db.doc('config/general').onSnapshot(function(s){CMS.general=(s.exists&&s.data())||{};cmsCambio();},function(){});
      db.collection('novedades').onSnapshot(function(q){var o={};q.docs.forEach(function(d){o[d.id]=d.data();});CMS.novedades=o;cmsCambio();},function(){});
      db.collection('productos').onSnapshot(function(q){var o={};q.docs.forEach(function(d){o[d.id]=d.data();});CMS.productos=o;cmsCambio();},function(){});
      db.collection('prensa').onSnapshot(function(q){var o={};q.docs.forEach(function(d){o[d.id]=d.data();});CMS.prensa=o;cmsCambio();},function(){});
      db.collection('casos').onSnapshot(function(q){var o={};q.docs.forEach(function(d){o[d.id]=d.data();});CMS.casos=o;cmsCambio();},function(){});
      db.doc('config/secciones').onSnapshot(function(s){CMS.secciones=(s.exists&&s.data())||{};cmsCambio();},function(){});
      db.collection('galerias').orderBy('orden').onSnapshot(function(q){CMS.galerias=q.docs.map(function(d){return Object.assign({id:d.id},d.data());});cmsCambio();},function(){});
    });
    window.claude.use('user').then(function(u){CMSUSER=u;if(window.__pag&&window.__pag.r==='admin')adminPintar();});
    window.claude.use('assets').then(function(a){CMSASSETS=a;if(window.__pag&&window.__pag.r==='admin')adminPintar();});
  }
  setTimeout(cmsIniciar,0);

  // ---------- Página de administración ----------
  var ADM={tab:'inicio',edit:null,msg:'',sucio:false};
  function aviso(t,tipo){ADM.msg=t;ADM.tipo=tipo||'ok';var m=document.querySelector('.adm-msg');if(m){m.textContent=t;m.className='adm-msg '+ADM.tipo+' ver';clearTimeout(aviso._t);if(ADM.tipo!=='error')aviso._t=setTimeout(function(){m.classList.remove('ver');},4500);}
    if(ADM.tipo==='ok'&&/guardad|publicad/i.test(t)){ADM.sucio=false;var sb=document.querySelector('.adm-sucio');if(sb)sb.hidden=true;}}
  window.addEventListener('beforeunload',function(e){if(ADM.sucio&&document.getElementById('adm')){e.preventDefault();e.returnValue='';}});
  function subir(file){if(!CMSASSETS)return Promise.reject({code:'sin_permiso'});return CMSASSETS.upload(file);}
  function campo(id,lab,val,tipo,ayuda){tipo=tipo||'text';var inp=tipo==='area'?'<textarea id="'+id+'" rows="4">'+esc(val||'')+'</textarea>':'<input id="'+id+'" type="'+tipo+'"'+(tipo==='number'?' step="any" min="0" inputmode="decimal"':'')+' value="'+esc(val==null?'':val)+'">';return '<label class="adm-campo"><span>'+lab+'</span>'+inp+(ayuda?'<small>'+ayuda+'</small>':'')+'</label>';}
  function chk(id,lab,on){return '<label class="adm-chk"><input id="'+id+'" type="checkbox"'+(on?' checked':'')+'><span>'+lab+'</span></label>';}
  function v(id){var e=document.getElementById(id);var x=e?(e.type==='checkbox'?e.checked:e.value.trim()):'';return (typeof x==='string'&&/^(p-img|n-img|z-img|c-img|c-logo|s-logo|p-glb|z-ur|g-ig|g-tt|g-li)$/.test(id))?urlSegura(x):x;}
  // Solo se aceptan links http(s), rutas del sitio o archivos subidos: nada de javascript: ni data:.
  function urlSegura(u){if(!u)return '';u=u.trim();if(/^(https?:)?\/\//i.test(u)||/^(img\/|#\/|\/|blob:https?:)/i.test(u))return u;if(/^[a-z][a-z0-9+.-]*:/i.test(u))return '';return u;}
  // Inicio del panel: qué hacer, cómo está el sitio y dónde se ve cada cosa
  var DONDE={empresas:'Página Empresas: "Trabajos que ya hicimos", "Programa Socios Colaboradores" y "Por qué comprarle a La Rañatela".',general:'Inicio (cifras y banners), pie de página (WhatsApp y redes), ETI y YOSUMÉ (fecha, precio y puntos de retiro).',novedades:'Novedades, y la destacada también en Inicio.',productos:'Productos (catálogo y fichas), "Lo más pedido" en Inicio y el personalizador 3D.',galerias:'Novedades (regalos navideños) y ETI (galería).',prensa:'Nosotros, en "En los medios".'};
  function adminTabInicio(){
    var prods=PROD0.map(function(p){return Object.assign({},p,CMS.productos[p.slug]||{});}).concat(Object.keys(CMS.productos).filter(function(k){return CMS.productos[k].nuevo;}).map(function(k){return CMS.productos[k];}));
    var oc=prods.filter(function(p){return p.oculto;}).length, de=prods.filter(function(p){return p.destacado&&!p.oculto;}).length;
    var novs=NOV0.filter(function(n){return !(CMS.novedades[n.slug]||{}).eliminada;}).map(function(n){return Object.assign({},n,(CMS.novedades[n.slug]||{}).datos||{});}).concat(Object.keys(CMS.novedades).filter(function(k){return CMS.novedades[k].nuevo&&!CMS.novedades[k].eliminada;}).map(function(k){return CMS.novedades[k].datos||{};})), bor=novs.filter(function(n){return n.borrador;}).length;
    var fotos=CMS.galerias.length, pzOn=prods.filter(function(p){return p.pz&&p.pz.on;}).length;
    var G=CMS.general, faltas=[];
    prods.forEach(function(q){if(!q.imagen&&!q.oculto)faltas.push(['productos','"'+q.nombre+'" todavía no tiene foto: se muestra con un cartel "Foto en camino".']);});
    if(bor)faltas.push(['novedades',bor+(bor===1?' novedad está como borrador':' novedades están como borrador')+': no se ven en el sitio hasta que las publiques.']);
    if(!de)faltas.push(['productos','No hay productos marcados "En lo más pedido": el inicio muestra los primeros del catálogo.']);
    if(de>6)faltas.push(['productos','Hay '+de+' productos en "Lo más pedido". Conviene dejar entre 3 y 6 para que el inicio no se haga largo.']);
    function acc(tab,tit,sub,a){return '<button type="button" class="adm-card" data-tab="'+tab+'"'+(a?' data-ir="'+a+'"':'')+'><b>'+tit+'</b><span>'+sub+'</span></button>';}
    return '<h2>¿Qué querés hacer?</h2><div class="adm-cards">'+
      acc('novedades','Publicar una novedad','Una nota con foto, que puede ir destacada en el inicio.','nueva-nov')+
      acc('productos','Sumar o editar un producto','Nombre, foto, resumen, colores y si va en "Lo más pedido".')+
      acc('general','Cambiar un dato','WhatsApp, redes, cifras del inicio, fecha del ETI, precio del set.')+
      acc('galerias','Subir fotos','A la galería del ETI o a los regalos navideños.')+
      acc('prensa','Cargar una nota de prensa','Link a la nota o a un video de YouTube.','nueva-prensa')+
      acc('empresas','Sumar un caso de cliente','Trabajos hechos, Socios Colaboradores y "Por qué comprarle".','nuevo-caso')+'</div>'+
      '<h3 class="adm-h3">Cómo está el sitio</h3><div class="adm-estado">'+
      '<div><b>'+(prods.length-oc)+'</b><span>productos visibles'+(oc?' · '+oc+' oculto'+(oc>1?'s':''):'')+'</span></div>'+
      '<div><b>'+de+'</b><span>en "Lo más pedido"</span></div>'+
      '<div><b>'+pzOn+'</b><span>productos nuevos en el personalizador 3D</span></div>'+
      '<div><b>'+(novs.length-bor)+'</b><span>novedades publicadas'+(bor?' · '+bor+' borrador'+(bor>1?'es':''):'')+'</span></div>'+
      '<div><b>'+fotos+'</b><span>fotos sumadas a galerías</span></div></div>'+
      (faltas.length?'<h3 class="adm-h3">Para revisar</h3><ul class="adm-faltas">'+faltas.map(function(f){return '<li><span>'+f[1]+'</span><button type="button" class="adm-link" data-tab="'+f[0]+'">Ir</button></li>';}).join('')+'</ul>':'')+
      '<h3 class="adm-h3">Cómo funciona</h3><ul class="adm-guia"><li><b>Los cambios se publican al tocar Guardar.</b> No hay borrador ni vista previa: lo que guardás, se ve. Si algo quedó mal, volvé a editarlo o usá "Volver al original".</li><li><b>Las fotos</b> conviene subirlas horizontales y livianas (menos de 2 MB). El sitio las recorta solo.</li><li><b>Textos:</b> mayúsculas sin tilde en títulos grandes; hablamos de "trabajadores" o "el equipo", nunca de "los chicos"; invitamos a sumarse, no pedimos ayuda.</li><li><b>Si algo no se guarda,</b> revisá que estés con la cuenta de La Rañatela en claude.ai y volvé a intentar.</li></ul>';}
  function adminDonde(tab){return DONDE[tab]?'<p class="adm-donde"><b>Se ve en:</b> '+DONDE[tab]+'</p>':'';}
  function adminTabGeneral(){var G=CMS.general,imp=(G.impacto&&G.impacto.length===3)?G.impacto:IMP0.map(function(x){return {n:x[0],t:x[1],s:x[2]};});
    return '<form class="adm-form" data-f="general"><h2>Datos generales</h2>'+adminDonde('general')+
      '<fieldset><legend>Contacto y redes</legend>'+campo('g-wa','WhatsApp (número completo)',G.whatsapp||REDES0.wa,'text','Con código de país, sin espacios: 5492615341275')+campo('g-ig','Instagram',G.instagram||REDES0.instagram,'url')+campo('g-tt','TikTok',G.tiktok||REDES0.tiktok,'url')+campo('g-li','LinkedIn',G.linkedin||REDES0.linkedin,'url')+'</fieldset>'+
      '<fieldset><legend>Cifras de impacto (inicio)</legend>'+imp.map(function(x,i){return '<div class="adm-fila3">'+campo('g-in'+i,'Número',x.n)+campo('g-it'+i,'Título',x.t)+campo('g-is'+i,'Detalle',x.s)+'</div>';}).join('')+'</fieldset>'+
      '<fieldset><legend>ETI y YOSUMÉ</legend>'+campo('g-fe','Fecha del ETI como se muestra',G.fechaETI||'20 de noviembre','text','Ej.: 20 de noviembre · Viernes 20 de noviembre')+campo('g-pr','Precio del set (YOSUMÉ)',G.precioTO||'$20.000')+campo('g-pu','Puntos de retiro',G.puntosTO||'Honey House y La Rañatela.')+chk('g-bn','Mostrar los banners de ETI, Tejiendo Oportunidades y Lianyeli',G.banners!==false)+'</fieldset>'+
      '<div class="adm-acc"><button class="btn" type="submit">Guardar cambios</button></div></form>';}
  function adminTabNovedades(){
    if(ADM.edit){var n=ADM.edit==='nueva'?{}:(D.novedades.filter(function(x){return x.slug===ADM.edit;})[0]||{});
      return '<form class="adm-form" data-f="nov"><h2>'+(ADM.edit==='nueva'?'Nueva novedad':'Editar novedad')+'</h2>'+campo('n-et','Etiqueta (arriba del título)',n.etiqueta)+campo('n-ti','Título',n.titulo)+campo('n-re','Remate (segunda línea del título)',n.remate)+campo('n-rs','Resumen',n.resumen,'area')+campo('n-bo','Texto de la nota',Array.isArray(n.body)?n.body.join('\n\n'):n.body,'area','Se muestra al abrir la nota. Separá los párrafos con una línea en blanco.')+
        '<div class="adm-foto">'+(n.imagen?'<img src="'+esc(img(n.imagen))+'" alt="">':'<span>Sin foto</span>')+'<label class="btn am adm-subir">Cambiar foto<input type="file" accept="image/*" data-up="n-img"></label><input type="hidden" id="n-img" value="'+esc(n.imagen||'')+'"></div>'+
        campo('n-alt','Descripción de la foto (para accesibilidad)',n.imagenAlt)+chk('n-de','Destacada (aparece arriba en Novedades)',n.destacada)+chk('n-bz','Borrador (no se publica)',n.borrador)+
        '<div class="adm-acc"><button class="btn" type="submit">Guardar</button><button class="btn am" type="button" data-a="volver">Volver</button>'+(ADM.edit!=='nueva'?'<button class="adm-borrar" type="button" data-a="borrar-nov">Eliminar</button>':'')+'</div></form>';}
    var todas=NOV0.concat([]).map(function(n){return n.slug;});
    var lista=D.novedades;
    return '<div class="adm-cab"><h2>Novedades</h2><button class="btn" data-a="nueva-nov">Nueva novedad</button></div><ul class="adm-lista">'+lista.map(function(n){return '<li>'+(n.imagen?'<img src="'+esc(img(n.imagen))+'" alt="">':'<i></i>')+'<div><b>'+esc(n.titulo||'(sin título)')+'</b><small>'+(n.destacada?'Destacada · ':'')+(n.borrador?'Borrador':'Publicada')+'</small></div><button class="btn am" data-a="editar-nov" data-id="'+esc(n.slug)+'">Editar</button></li>';}).join('')+'</ul>';}
  // Personalizador: un modelo 3D nuevo solo se publica con su área imprimible marcada (en cm, sobre el frente).
  var TEC_ADM=[['ser','Serigrafía'],['sub','Sublimación'],['subt','Sublimación total'],['bor','Bordado']];
  function admPzBloque(z,foto){var a=z.area||[],cm=z.cm||[];
    return '<fieldset class="adm-pz"><legend>Personalizador 3D</legend>'+chk('p-pz','Mostrar este producto en el personalizador',z.on)+
      '<div class="adm-pz-cuerpo"'+(z.on?'':' hidden')+'><p class="adm-ayuda">Si subís un modelo 3D, tenés que marcar dónde se puede imprimir. Sin el área imprimible el producto no se guarda.</p>'+
      '<div class="adm-foto adm-glb"><span>'+(z.glb?'Modelo cargado ✓':'Sin modelo 3D')+'</span><label class="btn am adm-subir">'+(z.glb?'Cambiar modelo':'Subir modelo 3D (.glb)')+'<input type="file" accept=".glb,model/gltf-binary" data-up3d="p-glb"></label><input type="hidden" id="p-glb" value="'+esc(z.glb||'')+'"></div>'+
      '<div class="adm-fila">'+campo('p-pw','Ancho del producto (cm)',cm[0],'number')+campo('p-ph','Alto del producto (cm)',cm[1],'number')+'</div>'+
      '<p class="adm-et">Área imprimible <small>Arrastrá el recuadro sobre el frente del producto o escribí las medidas.</small></p>'+
      '<div class="adm-area" data-foto="'+esc(foto?img(foto):'')+'"><div class="adm-area-lienzo"><div class="adm-rect" tabindex="0" aria-label="Área imprimible"><i class="adm-tir" aria-hidden="true"></i><span></span></div></div></div>'+
      '<div class="adm-fila">'+campo('p-ax','Desde la izquierda (cm)',a[0],'number')+campo('p-ay','Desde arriba (cm)',a[1],'number')+campo('p-aw','Ancho del área (cm)',a.length?a[2]-a[0]:'','number')+campo('p-ah','Alto del área (cm)',a.length?a[3]-a[1]:'','number')+'</div>'+
      '<p class="adm-et">Técnicas que acepta</p><div class="adm-fila">'+TEC_ADM.map(function(t){return chk('p-t-'+t[0],t[1],(z.tecnicas||['ser']).indexOf(t[0])>=0);}).join('')+'</div></div></fieldset>';}
  function admPzLeer(){if(!v('p-pz'))return {ok:true,pz:{on:false}};
    var n=function(id){var x=parseFloat(String(v(id)).replace(',','.'));return isFinite(x)?x:NaN;},W=n('p-pw'),H=n('p-ph'),x=n('p-ax'),y=n('p-ay'),w=n('p-aw'),h=n('p-ah');
    if(!v('p-glb'))return {error:'Subí el modelo 3D o destildá "Mostrar en el personalizador".'};
    if(!(W>0&&H>0))return {error:'Indicá el ancho y el alto del producto.'};
    if(!(x>=0&&y>=0&&w>0&&h>0))return {error:'Marcá el área imprimible del modelo: sin ella no se puede publicar en el personalizador.'};
    if(x+w>W+.01||y+h>H+.01)return {error:'El área imprimible se sale del producto. Revisá las medidas.'};
    var t=TEC_ADM.map(function(q){return q[0];}).filter(function(k){return v('p-t-'+k);});if(!t.length)return {error:'Elegí al menos una técnica de impresión.'};
    return {ok:true,pz:{on:true,glb:v('p-glb'),cm:[W,H],area:[x,y,+(x+w).toFixed(1),+(y+h).toFixed(1)],tecnicas:t}};}
  function admPzDibujar(){var ar=document.querySelector('.adm-area');if(!ar)return;var n=function(id){return parseFloat(String(v(id)).replace(',','.'));},W=n('p-pw')||30,H=n('p-ph')||30,lz=ar.querySelector('.adm-area-lienzo'),r=ar.querySelector('.adm-rect');
    lz.style.aspectRatio=W+' / '+H;var ft=v('p-img')?img(v('p-img')):ar.dataset.foto;if(ft)lz.style.backgroundImage='url("'+ft+'")';
    var x=n('p-ax'),y=n('p-ay'),w=n('p-aw'),h=n('p-ah');if(!(w>0&&h>0)){r.style.display='none';return;}r.style.display='';
    r.style.left=(x/W*100)+'%';r.style.top=(y/H*100)+'%';r.style.width=(w/W*100)+'%';r.style.height=(h/H*100)+'%';r.querySelector('span').textContent=num(w)+' × '+num(h)+' cm';}
  (function(){var drag=null;
    document.addEventListener('pointerdown',function(e){var r=e.target.closest('.adm-rect'),lz=e.target.closest('.adm-area-lienzo');if(!lz)return;e.preventDefault();
      var n=function(id){return parseFloat(String(v(id)).replace(',','.'));},W=n('p-pw'),H=n('p-ph');if(!(W>0&&H>0)){aviso('Primero indicá el ancho y el alto del producto.','error');return;}
      var b=lz.getBoundingClientRect(),cx=(e.clientX-b.left)/b.width*W,cy=(e.clientY-b.top)/b.height*H;
      if(r&&!e.target.closest('.adm-tir'))drag={m:'mover',dx:cx-n('p-ax'),dy:cy-n('p-ay'),W:W,H:H,b:b};
      else if(r)drag={m:'tirar',W:W,H:H,b:b};
      else{drag={m:'nuevo',x0:cx,y0:cy,W:W,H:H,b:b};set(cx,cy,0.1,0.1);}
      lz.setPointerCapture&&lz.setPointerCapture(e.pointerId);});
    function r1(x){return Math.round(x*2)/2;}
    function set(x,y,w,h){document.getElementById('p-ax').value=r1(x);document.getElementById('p-ay').value=r1(y);document.getElementById('p-aw').value=r1(w);document.getElementById('p-ah').value=r1(h);admPzDibujar();}
    document.addEventListener('pointermove',function(e){if(!drag)return;var d=drag,cx=Math.min(Math.max((e.clientX-d.b.left)/d.b.width*d.W,0),d.W),cy=Math.min(Math.max((e.clientY-d.b.top)/d.b.height*d.H,0),d.H),n=function(id){return parseFloat(document.getElementById(id).value)||0;};
      if(d.m==='mover'){var w=n('p-aw'),h=n('p-ah');set(Math.min(Math.max(cx-d.dx,0),d.W-w),Math.min(Math.max(cy-d.dy,0),d.H-h),w,h);}
      else if(d.m==='tirar'){var x=n('p-ax'),y=n('p-ay');set(x,y,Math.max(1,cx-x),Math.max(1,cy-y));}
      else set(Math.min(d.x0,cx),Math.min(d.y0,cy),Math.max(1,Math.abs(cx-d.x0)),Math.max(1,Math.abs(cy-d.y0)));});
    document.addEventListener('pointerup',function(){drag=null;});
    document.addEventListener('input',function(e){if(e.target.closest&&e.target.closest('.adm-pz')){if(e.target.id==='p-pz'){var c=document.querySelector('.adm-pz-cuerpo');if(c)c.hidden=!e.target.checked;}admPzDibujar();}});
    document.addEventListener('change',function(e){if(e.target.id==='p-pz'){var c=document.querySelector('.adm-pz-cuerpo');if(c)c.hidden=!e.target.checked;setTimeout(admPzDibujar,0);}
      var up=e.target.dataset&&e.target.dataset.up3d,f=e.target.files;if(!up||!f||!f.length)return;
      if(!/\.glb$/i.test(f[0].name)){aviso('El modelo tiene que ser un archivo .glb.','error');return;}
      if(!CMSASSETS){aviso('Tu cuenta no puede subir archivos en este sitio.','error');return;}
      aviso('Subiendo modelo 3D…','info');subir(f[0]).then(function(r){document.getElementById(up).value=r.url;e.target.closest('.adm-glb').querySelector('span').textContent='Modelo cargado ✓';aviso('Modelo listo. Ahora marcá el área imprimible.');},function(){aviso('No se pudo subir el modelo. Mandalo a info.laranatela@gmail.com y lo cargamos nosotros.','error');});});
  })();
  function adminTabProductos(){
    if(ADM.edit){var esNuevo=ADM.edit==='nuevo'||(CMS.productos[ADM.edit]&&CMS.productos[ADM.edit].nuevo),p=PROD0.filter(function(x){return x.slug===ADM.edit;})[0]||{},o=ADM.edit==='nuevo'?{}:(CMS.productos[ADM.edit]||{}),q=Object.assign({},p,o);
      if(esNuevo){var cats=D.productCategories.catalogFilters,mats=D.productCategories.materialLabels;
        return '<form class="adm-form" data-f="prodnuevo"><h2>'+(ADM.edit==='nuevo'?'Nuevo producto':esc(q.nombre))+'</h2>'+campo('p-no','Nombre',q.nombre)+
          '<label class="adm-campo"><span>Categoría</span><select id="p-ca">'+cats.map(function(c){return '<option value="'+c.key+'"'+(q.categoria===c.key?' selected':'')+'>'+esc(c.label)+'</option>';}).join('')+'</select></label>'+
          '<label class="adm-campo"><span>Material</span><select id="p-ma">'+Object.keys(mats).map(function(k){return '<option value="'+k+'"'+(q.material===k?' selected':'')+'>'+esc(mats[k])+'</option>';}).join('')+'</select></label>'+
          campo('p-re','Resumen (una o dos líneas)',q.resumen,'area')+campo('p-bo','Descripción',Array.isArray(q.body)?q.body.join('\n\n'):q.body,'area')+campo('p-me','Medidas de referencia',q.medidaReferencia,'text','Ej.: 38 × 42 cm')+campo('p-co','Colores',(q.colores||[]).join(', '),'text','Separados por coma. Ej.: Negro, Crudo, Azul')+campo('p-im','Técnicas de impresión',(q.impresion||[]).join(', '),'text','Ej.: Serigrafía, Sublimación')+
          '<div class="adm-foto">'+(q.imagen?'<img src="'+esc(img(q.imagen))+'" alt="">':'<span>Sin foto</span>')+'<label class="btn am adm-subir">'+(q.imagen?'Cambiar foto':'Subir foto')+'<input type="file" accept="image/*" data-up="p-img"></label><input type="hidden" id="p-img" value="'+esc(q.imagen||'')+'"></div>'+
          campo('p-alt','Descripción de la foto (accesibilidad)',q.imagenAlt)+chk('p-de','En "Lo más pedido" (inicio)',q.destacado)+chk('p-oc','Ocultar del sitio',q.oculto)+admPzBloque(q.pz||{},q.imagen)+
          '<div class="adm-acc"><button class="btn" type="submit">Guardar</button><button class="btn am" type="button" data-a="volver">Volver</button>'+(ADM.edit!=='nuevo'?'<button class="adm-borrar" type="button" data-a="borrar-prod">Eliminar producto</button>':'')+'</div></form>';}
      return '<form class="adm-form" data-f="prod"><h2>'+esc(p.nombre)+'</h2>'+campo('p-no','Nombre',q.nombre)+campo('p-re','Resumen',q.resumen,'area')+
        '<div class="adm-foto"><img src="'+esc(img(q.imagen))+'" alt=""><label class="btn am adm-subir">Cambiar foto<input type="file" accept="image/*" data-up="p-img"></label><input type="hidden" id="p-img" value="'+esc(o.imagen||'')+'"></div>'+
        chk('p-de','En "Lo más pedido" (inicio)',q.destacado)+chk('p-oc','Ocultar del sitio',q.oculto)+
        '<div class="adm-acc"><button class="btn" type="submit">Guardar</button><button class="btn am" type="button" data-a="volver">Volver</button>'+(CMS.productos[ADM.edit]?'<button class="adm-borrar" type="button" data-a="restaurar-prod">Volver al original</button>':'')+'</div></form>';}
    var nuevosP=Object.keys(CMS.productos).filter(function(k){return CMS.productos[k].nuevo;}).map(function(k){return Object.assign({slug:k},CMS.productos[k]);});
    return '<div class="adm-cab"><h2>Productos</h2><div class="adm-acc"><input class="adm-buscar" type="search" placeholder="Buscar producto" aria-label="Buscar producto"><button class="btn" data-a="nuevo-prod">Nuevo producto</button></div></div>'+adminDonde('productos')+'<p class="adm-ayuda">"Destacar" lo pone en "Lo más pedido" del inicio (conviene entre 3 y 6). "Ocultar" lo saca del sitio sin borrarlo.</p><ul class="adm-lista adm-prods">'+nuevosP.concat(PROD0).map(function(p0){var o=CMS.productos[p0.slug]||{},p=Object.assign({},p0,o);return '<li data-busca="'+esc((p.nombre||'').toLowerCase())+'"'+(p.oculto?' class="adm-oculto"':'')+'><img src="'+esc(img(p.imagen))+'" alt=""><div><b>'+esc(p.nombre)+'</b><small>'+(p.oculto?'<em class="adm-pill off">Oculto</em>':(p.destacado?'<em class="adm-pill on">En lo más pedido</em>':'<em class="adm-pill">Visible</em>'))+(p.pz&&p.pz.on?' <em class="adm-pill">3D</em>':'')+(CMS.productos[p0.slug]&&!p.nuevo?' · editado':'')+'</small></div><div class="adm-acc-mini"><button class="adm-link" data-a="alternar-dest" data-id="'+esc(p0.slug)+'" title="'+(p.destacado?'Sacar de "Lo más pedido"':'Poner en "Lo más pedido"')+'">'+(p.destacado?'★ Destacado':'☆ Destacar')+'</button><button class="adm-link" data-a="alternar-oculto" data-id="'+esc(p0.slug)+'">'+(p.oculto?'Mostrar':'Ocultar')+'</button><button class="btn am" data-a="editar-prod" data-id="'+esc(p0.slug)+'">Editar</button></div></li>';}).join('')+'</ul>';}
  function adminTabGalerias(){
    function gal(k,tit,base){var extra=CMS.galerias.filter(function(x){return x.galeria===k;});
      return '<section class="adm-gal"><div class="adm-cab"><h3>'+tit+'</h3><label class="btn adm-subir">Sumar fotos<input type="file" accept="image/*" multiple data-gal="'+k+'"></label></div><div class="adm-grilla">'+
        base.map(function(s){return '<figure><img src="'+esc(typeof s==='string'?s:s[0])+'" alt=""><figcaption>Original</figcaption></figure>';}).join('')+
        extra.map(function(x){return '<figure><img src="'+esc(x.url)+'" alt=""><input class="adm-pie" data-id="'+esc(x.id)+'" value="'+esc(x.pie||'')+'" placeholder="Pie de foto" aria-label="Pie de foto"><button class="adm-borrar" data-a="borrar-foto" data-id="'+esc(x.id)+'">Quitar</button></figure>';}).join('')+'</div></section>';}
    return '<h2>Galerías</h2>'+adminDonde('galerias')+'<p class="adm-ayuda">Las fotos "Original" vienen con el sitio y no se pueden quitar desde acá. Las que sumes se pueden quitar y llevan un pie de foto.</p>'+gal('navidad','Regalos navideños (Novedades)',NAV0)+gal('eti','Galería del ETI',GALETI0);}
  document.addEventListener('input',function(e){if(e.target.id!=='z-ur')return;var b=document.getElementById('z-ytprev');if(!b)return;var y=ytId(e.target.value);b.innerHTML=y?'<img src="'+ytMini(y)+'" alt=""><span>Video de YouTube detectado</span>':'';});
  function adminTabPrensa(){
    if(ADM.edit){var n=ADM.edit==='nueva'?{}:(PRENSA.filter(function(x){return x.id===ADM.edit;})[0]||{});
      return '<form class="adm-form" data-f="prensa"><h2>'+(ADM.edit==='nueva'?'Nueva nota de prensa':'Editar nota de prensa')+'</h2>'+campo('z-me','Medio',n.medio,'text','Ej.: Diario Uno, Los Andes, Canal 7')+campo('z-ti','Título de la nota',n.titulo)+campo('z-fe','Fecha',n.fecha,'date')+campo('z-ur','Link a la nota',n.url,'url')+'<p class="adm-ayuda">Si es un link de YouTube, el video se puede ver directo en el sitio y la miniatura se toma sola.</p><div class="adm-yt" id="z-ytprev">'+(ytId(n.url)?'<img src="'+ytMini(ytId(n.url))+'" alt=""><span>Video de YouTube detectado</span>':'')+'</div>'+
        '<div class="adm-foto">'+(n.imagen?'<img src="'+esc(n.imagen)+'" alt="">':'<span>Sin imagen (opcional)</span>')+'<label class="btn am adm-subir">'+(n.imagen?'Cambiar imagen':'Sumar imagen')+'<input type="file" accept="image/*" data-up="z-img"></label><input type="hidden" id="z-img" value="'+esc(n.imagen||'')+'"></div>'+
        '<div class="adm-acc"><button class="btn" type="submit">Guardar</button><button class="btn am" type="button" data-a="volver">Volver</button>'+(ADM.edit!=='nueva'?'<button class="adm-borrar" type="button" data-a="borrar-prensa">Quitar</button>':'')+'</div></form>';}
    var l=PRENSA.slice().sort(function(a,b){return String(b.fecha||'0').localeCompare(String(a.fecha||'0'));});
    return '<div class="adm-cab"><h2>Prensa</h2><button class="btn" data-a="nueva-prensa">Nueva nota</button></div><p class="adm-donde"><b>Se ve en:</b> Nosotros, en "En los medios". Ordenadas por fecha, la más nueva primero.</p><ul class="adm-lista">'+l.map(function(n){return '<li>'+(n.imagen||ytId(n.url)?'<img src="'+esc(n.imagen||ytMini(ytId(n.url)))+'" alt="">':'<i></i>')+'<div><b>'+esc(n.titulo)+'</b><small>'+esc(n.medio)+(n.fecha?' · '+esc(fechaPrensa(n.fecha)):'')+'</small></div><button class="btn am" data-a="editar-prensa" data-id="'+esc(n.id)+'">Editar</button></li>';}).join('')+'</ul>';}
  function adminTabEmpresas(){
    function foto(id,val,lab){return '<div class="adm-foto">'+(val?'<img src="'+esc(val)+'" alt="">':'<span>'+lab+'</span>')+'<label class="btn am adm-subir">'+(val?'Cambiar':'Subir')+'<input type="file" accept="image/*" data-up="'+id+'"></label><input type="hidden" id="'+id+'" value="'+esc(val||'')+'"></div>';}
    if(ADM.edit&&ADM.edit!=='secciones'){var c=ADM.edit==='nuevo'?{repite:true}:(CASOS.filter(function(x){return x.id===ADM.edit;})[0]||{});
      return '<form class="adm-form" data-f="caso"><h2>'+(ADM.edit==='nuevo'?'Nuevo caso de cliente':'Editar caso: '+esc(c.cliente||''))+'</h2>'+
        campo('c-cl','Cliente',c.cliente,'text','Como lo va a leer una empresa: EMESA, YPF, Arcor.')+'<div class="adm-fila">'+campo('c-ci','Cifra grande',c.cifra,'text','Ej.: 5.110, 7.500, Toda, Récord')+campo('c-un','Qué es la cifra',c.unidad,'text','Ej.: unidades en el primer encargo')+'</div>'+
        campo('c-ti','Título del caso',c.titulo)+campo('c-tx','Texto',c.texto,'area','Tres o cuatro líneas. Sin montos ni precios.')+
        '<div class="adm-fila">'+campo('c-te','Técnica',c.tecnica,'text','Ej.: Serigrafía, Varias técnicas')+campo('c-an','Año o período',c.anio,'text','Ej.: 2026, 2023 – 2026')+campo('c-or','Orden',c.orden||'','number','Menor número, más arriba.')+'</div>'+
        '<div class="adm-fila">'+chk('c-re','Volvieron a comprar',c.repite)+chk('c-oc','Ocultar este caso (no se ve en el sitio)',c.oculto)+'</div>'+
        '<p class="adm-et">Logo del cliente</p>'+foto('c-logo',c.logo,'Sin logo: se muestra el nombre')+'<p class="adm-et">Foto del trabajo</p>'+foto('c-img',c.foto,'Sin foto (opcional)')+campo('c-alt','Qué se ve en la foto',c.fotoAlt,'text','Para accesibilidad y buscadores.')+
        '<div class="adm-acc"><button class="btn" type="submit">Guardar</button><button class="btn am" type="button" data-a="volver">Volver</button>'+(ADM.edit!=='nuevo'?'<button class="adm-borrar" type="button" data-a="borrar-caso">Quitar</button>':'')+'</div></form>';}
    if(ADM.edit==='secciones'){var S=SOCIOS0,B=sx('sociosB',SOCIOS_B0),Q=SEC.porque||[];
      return '<form class="adm-form" data-f="secciones"><h2>Textos de la página Empresas</h2>'+
        '<fieldset><legend>Trabajos que ya hicimos</legend>'+campo('s-ct','Título',sx('casosTitulo','Trabajos que ya hicimos'))+campo('s-cs','Subtítulo (arriba a la derecha)',sx('casosSub','Grandes volúmenes, años de trabajo'))+campo('s-cl','Bajada',sx('casosLead','Clientes con años de relación y pedidos de miles de unidades. Casi todos siguen comprando.'),'area')+'</fieldset>'+
        '<fieldset><legend>Programa Socios Colaboradores</legend>'+campo('s-st','Título',sx('sociosTitulo',S.titulo))+campo('s-sl','Texto',sx('sociosLead',S.lead),'area')+
        [0,1,2].map(function(i){var b=B[i]||{};return '<div class="adm-fila">'+campo('s-b'+i+'t','Punto '+(i+1)+': en negrita',b.t)+campo('s-b'+i+'x','Punto '+(i+1)+': texto',b.x)+'</div>';}).join('')+
        '<p class="adm-et">Caso destacado (la tarjeta blanca)</p>'+foto('s-logo',sx('sociosLogo','img/clientes-emesa.png'),'Sin logo')+'<div class="adm-fila">'+campo('s-cc','Cifra',sx('sociosCifra',S.cifra))+campo('s-cu','Qué es la cifra',sx('sociosUnidad',S.unidad))+'</div>'+campo('s-ck','Título',sx('sociosCasoTitulo',S.casoTitulo))+campo('s-cx','Texto',sx('sociosCasoTexto',S.casoTexto),'area')+'</fieldset>'+
        '<fieldset><legend>Por qué comprarle a La Rañatela</legend><p class="adm-ayuda">Cinco tarjetas. Si dejás una vacía, se usa el texto original.</p>'+PORQUE0.map(function(x,i){var o=Q[i]||{};return campo('q-'+i+'t','Tarjeta '+(i+1)+': título',o.t||x[0])+campo('q-'+i+'x','Tarjeta '+(i+1)+': texto',o.x||x[1],'area');}).join('')+'</fieldset>'+
        '<div class="adm-acc"><button class="btn" type="submit">Guardar textos</button><button class="btn am" type="button" data-a="volver">Volver</button></div></form>';}
    return '<div class="adm-cab"><h2>Empresas</h2><div class="adm-acc"><button class="btn am" data-a="editar-secciones">Editar textos de la página</button><button class="btn" data-a="nuevo-caso">Nuevo caso</button></div></div>'+adminDonde('empresas')+
      '<h3 class="adm-h3">Casos de clientes</h3><ul class="adm-lista">'+CASOS.map(function(c){return '<li'+(c.oculto?' class="adm-oculto"':'')+'>'+(c.foto||c.logo?'<img src="'+esc(c.foto||c.logo)+'" alt="">':'<i></i>')+'<div><b>'+esc(c.cliente)+(c.oculto?' · oculto':'')+'</b><small>'+esc(c.cifra||'')+' '+esc(c.unidad||'')+(c.foto?'':' · sin foto')+'</small></div><button class="btn am" data-a="editar-caso" data-id="'+esc(c.id)+'">Editar</button></li>';}).join('')+'</ul>';}
  function adminPintar(){var raiz=document.getElementById('adm');if(!raiz)return;
    var puede=CMSUSER?CMSUSER.canEdit():null;
    if(!CMSDB){raiz.innerHTML='<div class="adm-vacio"><h2>Conectando…</h2><p>Si no carga, abrí el sitio desde claude.ai con tu cuenta.</p></div>';return;}
    if(puede===false){raiz.innerHTML='<div class="adm-vacio"><h2>Solo para editores</h2><p>Pedile a quien administra el sitio que te dé permiso de edición.</p></div>';return;}
    var tabs=[['inicio','Inicio'],['general','Datos generales'],['novedades','Novedades'],['productos','Productos'],['galerias','Galerías'],['prensa','Prensa'],['empresas','Empresas']];
    raiz.innerHTML='<nav class="adm-tabs" role="tablist">'+tabs.map(function(t){return '<button role="tab" aria-selected="'+(ADM.tab===t[0])+'" data-tab="'+t[0]+'">'+t[1]+'</button>';}).join('')+'</nav><p class="adm-msg '+(ADM.tipo||'')+'" role="status">'+esc(ADM.msg||'')+'</p><div class="adm-cuerpo">'+
      (ADM.tab==='inicio'?adminTabInicio():ADM.tab==='general'?adminTabGeneral():ADM.tab==='novedades'?adminTabNovedades():ADM.tab==='productos'?adminTabProductos():ADM.tab==='prensa'?adminTabPrensa():ADM.tab==='empresas'?adminTabEmpresas():adminTabGalerias())+'</div>'+
      '<div class="adm-sucio" hidden><span>Tenés cambios sin guardar.</span><button type="button" class="btn" data-a="guardar-form">Guardar</button></div>';
    ADM.sucio=false;
    admPzDibujar();
  }
  function err(e){aviso(e&&e.code==='invalid_argument'?'No tenés permiso para guardar cambios.':e&&e.code==='quota_exceeded'?'Se llenó el espacio de la base de datos.':'No se pudo guardar. Probá de nuevo.','error');}
  R.admin=function(){if(!window.__MODO_ADMIN)return '<section class="cont pag-cab">'+ojal('Administración',true)+'<h1 class="h1">El panel tiene su propio enlace</h1><p class="lead">El panel de administración se abre aparte. Pedile el enlace a quien administra el sitio.</p><div class="fila-btn"><a class="btn" href="#/">Volver al inicio</a></div></section>';
    ADM.edit=null;ADM.msg='';setTimeout(adminPintar,0);
    return '<div class="adm-top"><div class="adm-top-in"><span class="adm-marca"><img src="img/logo-blanco.png" alt="" width="36" height="36">La Rañatela <b>Admin</b> <span class="beta">Beta</span></span><a class="adm-ver" href="#/">Ver el sitio →</a></div><div class="adm-top-tx"><h1>Panel del sitio</h1><p>Cambiá textos, fotos, novedades y productos. Los cambios se ven en el sitio apenas guardás.</p></div></div><section class="adm-wrap"><div class="adm" id="adm"></div></section>';};
  document.addEventListener('click',function(e){var raiz=document.getElementById('adm');if(!raiz||!raiz.contains(e.target))return;
    var t=e.target.closest('[data-tab]');if(t){if(ADM.sucio&&!t.dataset.ok){t.dataset.ok='1';var su=raiz.querySelector('.adm-sucio span');if(su)su.textContent='Tenés cambios sin guardar. Tocá de nuevo para salir sin guardar.';setTimeout(function(){delete t.dataset.ok;},3000);return;}ADM.tab=t.dataset.tab;ADM.edit=t.dataset.ir==='nueva-nov'||t.dataset.ir==='nueva-prensa'?'nueva':t.dataset.ir==='nuevo-caso'?'nuevo':null;ADM.msg='';adminPintar();window.scrollTo({top:Math.max(0,raiz.getBoundingClientRect().top+scrollY-90),behavior:'smooth'});return;}
    if(e.target.closest('[data-a="guardar-form"]')){var fm=raiz.querySelector('.adm-form');if(fm)fm.requestSubmit();return;}
    var b=e.target.closest('[data-a]');if(!b)return;var a=b.dataset.a,id=b.dataset.id;
    if(a==='volver'){ADM.edit=null;adminPintar();}
    if(a==='nueva-nov'){ADM.edit='nueva';adminPintar();}
    if(a==='nuevo-prod'){ADM.edit='nuevo';adminPintar();}
    if(a==='nueva-prensa'){ADM.edit='nueva';adminPintar();}
    if(a==='editar-prensa'){ADM.edit=id;adminPintar();}
    if(a==='nuevo-caso'){ADM.edit='nuevo';adminPintar();}
    if(a==='editar-caso'){ADM.edit=id;adminPintar();}
    if(a==='editar-secciones'){ADM.edit='secciones';adminPintar();}
    if(a==='borrar-caso'&&confirmar(b)){var cid=ADM.edit,corig=CASOS0.some(function(n){return n.id===cid;});(corig?CMSDB.collection('casos').doc(cid).set({eliminada:true}):CMSDB.collection('casos').doc(cid).delete()).then(function(){ADM.edit=null;aviso('Caso quitado.');adminPintar();},err);}
    if(a==='borrar-prod'&&confirmar(b)){CMSDB.collection('productos').doc(ADM.edit).delete().then(function(){ADM.edit=null;aviso('Producto eliminado.');adminPintar();},err);}
    if(a==='borrar-prensa'&&confirmar(b)){var pid=ADM.edit,orig=PRENSA0.some(function(n){return n.id===pid;});(orig?CMSDB.collection('prensa').doc(pid).set({eliminada:true}):CMSDB.collection('prensa').doc(pid).delete()).then(function(){ADM.edit=null;aviso('Nota quitada.');adminPintar();},err);}
    if(a==='editar-nov'||a==='editar-prod'){ADM.edit=id;adminPintar();}
    if(a==='alternar-dest'||a==='alternar-oculto'){var p0=PROD0.filter(function(x){return x.slug===id;})[0],o0=CMS.productos[id]||{},cur=Object.assign({},p0||{},o0),k=a==='alternar-dest'?'destacado':'oculto',nv={};nv[k]=!cur[k];
      CMSDB.collection('productos').doc(id).set(Object.assign({},o0,nv)).then(function(){aviso(k==='destacado'?(nv[k]?'Ahora está en "Lo más pedido".':'Ya no está en "Lo más pedido".'):(nv[k]?'Producto oculto: no se ve en el sitio.':'Producto visible otra vez.'));},err);}
    if(a==='borrar-nov'&&confirmar(b)){var s=ADM.edit,o=CMS.novedades[s]||{};CMSDB.collection('novedades').doc(s).set(Object.assign({},o,{eliminada:true})).then(function(){ADM.edit=null;aviso('Novedad eliminada.');adminPintar();},err);}
    if(a==='restaurar-prod'&&confirmar(b)){CMSDB.collection('productos').doc(ADM.edit).delete().then(function(){aviso('Producto restaurado.');adminPintar();},err);}
    if(a==='borrar-foto'&&confirmar(b)){CMSDB.collection('galerias').doc(id).delete().then(function(){aviso('Foto quitada.');},err);}
  });
  function confirmar(b){if(b.dataset.ok){return true;}b.dataset.ok='1';var t=b.textContent;b.textContent='¿Seguro? Tocá de nuevo';setTimeout(function(){delete b.dataset.ok;b.textContent=t;},3000);return false;}
  document.addEventListener('input',function(e){if(e.target.closest&&e.target.closest('.adm-form')&&!e.target.closest('.adm-buscar')){ADM.sucio=true;var sb=document.querySelector('.adm-sucio');if(sb){sb.hidden=false;sb.querySelector('span').textContent='Tenés cambios sin guardar.';}}
    var q=e.target.closest('.adm-buscar');if(q){var s=q.value.toLowerCase();document.querySelectorAll('.adm-prods li').forEach(function(li){li.hidden=s&&li.dataset.busca.indexOf(s)<0;});}});
  document.addEventListener('change',function(e){var raiz=document.getElementById('adm');if(!raiz||!raiz.contains(e.target))return;
    var pie=e.target.closest('.adm-pie');if(pie){CMSDB.collection('galerias').doc(pie.dataset.id).update({pie:pie.value.trim()}).then(function(){aviso('Pie guardado.');},err);return;}
    var up=e.target.dataset.up,galk=e.target.dataset.gal,files=e.target.files;if(!files||!files.length)return;
    if(!CMSASSETS){aviso('Tu cuenta no puede subir fotos en este sitio.','error');return;}
    if(up){aviso('Subiendo foto…','info');subir(files[0]).then(function(r){document.getElementById(up).value=r.url;var im=e.target.closest('.adm-foto').querySelector('img,span');var n=document.createElement('img');n.src=r.url;n.alt='';im.replaceWith(n);aviso('Foto lista. Guardá para publicarla.');},function(){aviso('No se pudo subir la foto (máx. 20 MB, formatos de imagen).','error');});}
    if(galk){aviso('Subiendo '+files.length+' foto(s)…','info');var base=Date.now();[].slice.call(files).reduce(function(pr,f,i){return pr.then(function(){return subir(f).then(function(r){return CMSDB.collection('galerias').add({galeria:galk,url:r.url,assetId:r.id,pie:'',orden:base+i});});});},Promise.resolve()).then(function(){aviso('Fotos sumadas a la galería.');},function(){aviso('Alguna foto no se pudo subir.','error');});}
  });
  document.addEventListener('submit',function(e){var f=e.target.closest('.adm-form');if(!f)return;e.preventDefault();if(!CMSDB)return;var k=f.dataset.f,btn=f.querySelector('[type=submit]');btn.disabled=true;var fin=function(){btn.disabled=false;};
    if(k==='general'){var d={whatsapp:v('g-wa'),instagram:v('g-ig'),tiktok:v('g-tt'),linkedin:v('g-li'),fechaETI:v('g-fe'),precioTO:v('g-pr'),puntosTO:v('g-pu'),banners:v('g-bn'),impacto:[0,1,2].map(function(i){return {n:v('g-in'+i),t:v('g-it'+i),s:v('g-is'+i)};})};
      CMSDB.doc('config/general').set(d).then(function(){aviso('Datos generales guardados.');fin();},function(x){err(x);fin();});}
    if(k==='nov'){var nueva=ADM.edit==='nueva',slug=nueva?('nota-'+Date.now().toString(36)):ADM.edit;
      var datos={etiqueta:v('n-et'),titulo:v('n-ti'),remate:v('n-re'),resumen:v('n-rs'),body:v('n-bo').split(/\n\s*\n/).map(function(s){return s.trim();}).filter(Boolean),imagen:v('n-img'),imagenAlt:v('n-alt'),destacada:v('n-de'),borrador:v('n-bz'),fecha:new Date().toISOString().slice(0,10)};
      if(!datos.titulo){aviso('Falta el título.','error');fin();return;}
      var o=CMS.novedades[slug]||{};CMSDB.collection('novedades').doc(slug).set({nueva:nueva||!!o.nueva,datos:datos}).then(function(){ADM.edit=null;aviso('Novedad guardada.');fin();adminPintar();},function(x){err(x);fin();});}
    if(k==='prodnuevo'){var nom=v('p-no');if(!nom){aviso('Falta el nombre.','error');fin();return;}
      var slug2=ADM.edit==='nuevo'?(nom.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'producto')+'-'+Date.now().toString(36).slice(-4):ADM.edit;
      var lista=function(s){return s.split(',').map(function(x){return x.trim();}).filter(Boolean);};
      var dn={nuevo:true,nombre:nom,categoria:v('p-ca'),material:v('p-ma'),resumen:v('p-re'),body:v('p-bo').split(/\n\s*\n/).map(function(s){return s.trim();}).filter(Boolean),medidaReferencia:v('p-me'),colores:lista(v('p-co')),impresion:lista(v('p-im')),imagen:v('p-img'),imagenAlt:v('p-alt')||nom,destacado:v('p-de'),oculto:v('p-oc'),orden:99};
      if(!dn.imagen){aviso('Subí una foto del producto.','error');fin();return;}
      var pzL=admPzLeer();if(pzL.error){aviso(pzL.error,'error');fin();var fs=document.querySelector('.adm-pz');if(fs)fs.scrollIntoView({block:'center',behavior:'smooth'});return;}dn.pz=pzL.pz;
      CMSDB.collection('productos').doc(slug2).set(dn).then(function(){ADM.edit=null;aviso('Producto guardado. Ya está en el catálogo.');fin();adminPintar();},function(x){err(x);fin();});}
    if(k==='caso'){var dc={cliente:v('c-cl'),cifra:v('c-ci'),unidad:v('c-un'),titulo:v('c-ti'),texto:v('c-tx'),tecnica:v('c-te'),anio:v('c-an'),orden:v('c-or')?Number(v('c-or')):0,repite:v('c-re'),oculto:v('c-oc'),logo:v('c-logo'),foto:v('c-img'),fotoAlt:v('c-alt')};
      if(!dc.cliente||!dc.texto){aviso('Faltan el cliente o el texto.','error');fin();return;}
      var cid2=ADM.edit==='nuevo'?('c'+Date.now().toString(36)):ADM.edit;if(!CASOS0.some(function(n){return n.id===cid2;}))dc.nuevo=true;
      CMSDB.collection('casos').doc(cid2).set(dc).then(function(){ADM.edit=null;aviso('Caso guardado.');fin();adminPintar();},function(x){err(x);fin();});}
    if(k==='secciones'){var ds={casosTitulo:v('s-ct'),casosSub:v('s-cs'),casosLead:v('s-cl'),sociosTitulo:v('s-st'),sociosLead:v('s-sl'),sociosB:[0,1,2].map(function(i){return {t:v('s-b'+i+'t'),x:v('s-b'+i+'x')};}),sociosLogo:v('s-logo'),sociosCifra:v('s-cc'),sociosUnidad:v('s-cu'),sociosCasoTitulo:v('s-ck'),sociosCasoTexto:v('s-cx'),porque:PORQUE0.map(function(x,i){return {t:v('q-'+i+'t'),x:v('q-'+i+'x')};})};
      CMSDB.doc('config/secciones').set(ds).then(function(){ADM.edit=null;aviso('Textos guardados.');fin();adminPintar();},function(x){err(x);fin();});}
    if(k==='prensa'){var dpz={medio:v('z-me'),titulo:v('z-ti'),fecha:v('z-fe'),url:v('z-ur'),imagen:v('z-img')};
      if(!dpz.titulo||!dpz.url){aviso('Faltan el título o el link.','error');fin();return;}
      var nid=ADM.edit==='nueva'?('n'+Date.now().toString(36)):ADM.edit,esOrig=PRENSA0.some(function(n){return n.id===nid;});if(!esOrig)dpz.nueva=true;
      CMSDB.collection('prensa').doc(nid).set(dpz).then(function(){ADM.edit=null;aviso('Nota de prensa guardada.');fin();adminPintar();},function(x){err(x);fin();});}
    if(k==='prod'){var dp={nombre:v('p-no'),resumen:v('p-re'),destacado:v('p-de'),oculto:v('p-oc')};var im=v('p-img');if(im)dp.imagen=im;
      CMSDB.collection('productos').doc(ADM.edit).set(dp).then(function(){ADM.edit=null;aviso('Producto guardado.');fin();adminPintar();},function(x){err(x);fin();});}
  });
  function ruta(){
    var h=(window.RUTAS_LIMPIAS?('#'+location.pathname+location.search):(location.hash||'#/')).replace(/^#\/?/,''); var q=''; var k=h.indexOf('?'); if(k>=0){q=h.slice(k+1);h=h.slice(0,k);}
    var p=h.split('/').filter(Boolean);
    if(!p.length)return {r:'inicio',i:0,q:q,label:'Inicio'};
    if(p[0]==='productos'&&p[1]){var pr=prodPorSlug(p[1]);return {r:'ficha',i:8,q:q,arg:p[1],label:pr?pr.nombre:'Productos',corto:'Ficha',nav:'productos'};}
    if(p[0]==='productos')return {r:'productos',i:1,q:q,label:'Productos'};
    if(p[0]==='empresas'||p[0]==='servicios')return {r:'empresas',i:2,q:q,label:'Empresas',nav:'empresas'};
    if(p[0]==='nosotros'||p[0]==='historia')return {r:'nosotros',i:3,q:q,label:'Nosotros',nav:'nosotros'};
    if(p[0]==='admin'&&!window.SIN_ADMIN)return {r:'admin',i:9,q:q,label:'Administración',corto:'Admin',nav:''};
    if(p[0]==='personalizar')return {r:'personalizar',i:1,q:q,label:'Personalizá tu producto',corto:'Personalizar',nav:'productos'};
    if(p[0]==='tejiendo-oportunidades')return {r:'tejiendo',i:5,q:q,label:'YOSUMÉ',corto:'YOSUMÉ',nav:'tejiendo'};
    if(p[0]==='eti')return {r:'eti',i:4,q:q,label:'ETI',nav:'eti'};
    if(p[0]==='novedades'&&p[1])return {r:'nota',i:6,q:q,arg:p[1],label:'Novedades',nav:'novedades'};
    if(p[0]==='novedades')return {r:'novedades',i:6,q:q,label:'Novedades'};
    if(p[0]==='contacto'&&p[1]==='gracias')return {r:'gracias',i:7,q:q,label:'Contacto',nav:'contacto'};
    if(p[0]==='contacto')return {r:'contacto',i:7,q:q,label:'Contacto'};
    if(p[0]==='privacidad')return {r:'privacidad',i:9,q:q,label:'Privacidad',nav:''};
    if(p[0]==='terapia-ocupacional')return {r:'terapia',i:9,q:q,label:'Terapia Ocupacional',corto:'Terapia',nav:''};
    return {r:'404',i:9,q:q,label:'Error 404',nav:''};
  }
  var TIT={admin:'Administración',personalizar:'Personalizá tu producto (beta)',tejiendo:'Tejiendo Oportunidades · Set matero 2026',empresas:'Soluciones para empresas',nosotros:'Nosotros',eti:'ETI · Encuentro de Trabajo Inclusivo',inicio:'Inicio',historia:'Historia',productos:'Productos',ficha:null,servicios:'Servicios',novedades:'Novedades',nota:null,contacto:'Contacto',gracias:'Consulta enviada',privacidad:'Política de Privacidad',terapia:'Terapia Ocupacional','404':'Página no encontrada'};
  var primero=true, actual=null;
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function partir(h){ if(reduce||!h)return; var i=0;
    (function rec(n){ [].slice.call(n.childNodes).forEach(function(c){
      if(c.nodeType===3){ var f=document.createDocumentFragment(); c.textContent.split(/(\s+)/).forEach(function(w){ if(!w)return; if(/^\s+$/.test(w)){f.appendChild(document.createTextNode(w));return;} var a=document.createElement('span');a.className='pal';var b=document.createElement('span');b.style.setProperty('--i',i++);b.textContent=w;a.appendChild(b);f.appendChild(a);}); n.replaceChild(f,c); }
      else if(c.nodeType===1&&c.tagName!=='BR')rec(c); }); })(h);
    h.classList.remove('entra','e2'); }
  var spy=null;
  function filtros(){
    if(spy){spy.disconnect();spy=null;}
    var ul=app.querySelector('.filtros ul'); if(!ul)return; var ind=ul.querySelector('.ind'), bs=[].slice.call(ul.querySelectorAll('button'));
    function marcar(id){ bs.forEach(function(b){ var on=b.getAttribute('data-ir')===id; b.classList.toggle('on',on); if(on&&ind){ind.style.width=b.offsetWidth+'px';ind.style.transform='translateX('+b.parentNode.offsetLeft+'px)';ind.style.opacity=1; var x=b.parentNode.offsetLeft-ul.clientWidth/2+b.offsetWidth/2; ul.scrollTo({left:x,behavior:reduce?'auto':'smooth'});} }); }
    if('IntersectionObserver' in window){ spy=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)marcar(e.target.id.replace('cat-',''));});},{rootMargin:'-42% 0px -52% 0px'}); app.querySelectorAll('.cat').forEach(function(c){spy.observe(c);}); }
  }
  var hilo=document.querySelector('.hilo-carga');
  function coser(){ if(!hilo||reduce)return; hilo.classList.remove('cosiendo','listo'); void hilo.offsetWidth; hilo.classList.add('cosiendo'); setTimeout(function(){hilo.classList.add('listo');},820); setTimeout(function(){hilo.classList.remove('cosiendo','listo');},1200); }
  function pintar(rt){
    document.documentElement.classList.toggle('ruta-eti',rt.r==='eti');
    document.documentElement.classList.toggle('ruta-to',rt.r==='tejiendo');
    document.documentElement.classList.toggle('ruta-admin',rt.r==='admin');
    document.documentElement.classList.toggle('ruta-pz',rt.r==='personalizar');
    // Inicio: un fragmento del documental corre de fondo, en blanco y negro y casi transparente
    var esIni=rt.r==='inicio';document.documentElement.classList.toggle('ruta-inicio',esIni);
    var fv=document.getElementById('fondo-video');var fg=document.getElementById('fondo-grano');if(fg)fg.style.display=esIni?'':'none';var fpc=document.getElementById('fondo-puntos');if(fpc)fpc.style.display=esIni?'':'none';if(window.__puntos)window.__puntos(esIni);if(fv){fv.style.display=esIni?'':'none';fv.muted=true;if(esIni&&!matchMedia('(prefers-reduced-motion: reduce)').matches){var pp=fv.play();if(pp&&pp.catch)pp.catch(function(){});}else fv.pause();}
    app.innerHTML=R[rt.r](rt.q,rt.arg);
    rt.key=rt.r; rt.nav=rt.nav!==undefined?rt.nav:rt.r; window.__pag=rt;
    document.title=(TIT[rt.r]||rt.label)+' · La Rañatela';
    var md=document.querySelector('meta[name=description]'); if(!md){md=document.createElement('meta');md.name='description';document.head.appendChild(md);}
    var pk={personalizar:'productos',tejiendo:'inicio',empresas:'servicios',nosotros:'historia',eti:'inicio',inicio:'inicio',historia:'historia',productos:'productos',servicios:'servicios',novedades:'novedades',contacto:'contacto',privacidad:'privacidad',terapia:'terapia-ocupacional','404':'404',gracias:'contacto-gracias'}[rt.r];
    var pr=rt.r==='ficha'?prodPorSlug(rt.arg):null; md.content=pr?pr.resumen:((D.pages[pk]||{}).description||'');
    seoRuta(rt,pr);
    app.querySelectorAll('.pag-cab .h1, .hero .h1, .poster .h1, .ficha-p .h1').forEach(partir);
    filtros();
    if(window.__banners)window.__banners(app);
    if(rt.r==='personalizar'&&window.__pzIniciar)window.__pzIniciar();
    if(window.__autoVid)setTimeout(window.__autoVid,60);
    if(rt.r==='tejiendo'&&window.__ajustarTO){window.__ajustarTO();if(document.fonts&&document.fonts.ready)document.fonts.ready.then(window.__ajustarTO);}
    if(window.__activar)window.__activar(app);
    if(window.__medir)window.__medir();
    if(rt.r==='eti'&&rt.q==='sumate'){var su=document.getElementById('sumate'); if(su)setTimeout(function(){su.scrollIntoView({behavior:'smooth',block:'center'});},primero?0:450);}
    if(rt.r==='empresas'&&rt.q&&/^[a-z-]+$/.test(rt.q)){var eq=document.getElementById(rt.q);if(eq)setTimeout(function(){eq.scrollIntoView({behavior:'smooth',block:'start'});},primero?0:450);}
    if(rt.r==='tejiendo'&&rt.q){var tq=document.getElementById(rt.q);if(tq)setTimeout(function(){tq.scrollIntoView({behavior:'smooth',block:'start'});},primero?0:450);}
    if(rt.r==='productos'&&rt.q){var el=document.getElementById('cat-'+rt.q); if(el)setTimeout(function(){el.scrollIntoView({behavior:'smooth',block:'start'});},primero?0:450);}
  }
  function ir(){
    var rt=ruta();
    var mismo=actual&&actual.r===rt.r&&actual.arg===rt.arg;
    actual=rt;
    if(primero){pintar(rt);primero=false;return;}
    if(window.__salirIntro)window.__salirIntro();
    if(mismo){pintar(rt);return;}
    coser(); app.classList.add('saliendo');
    setTimeout(function(){window.scrollTo(0,0);pintar(rt);app.classList.remove('saliendo');app.classList.add('entrando');
      requestAnimationFrame(function(){requestAnimationFrame(function(){app.classList.remove('entrando');});});
      try{app.focus({preventScroll:true});}catch(e){}
    },240);
  }
  window.__repintar=function(){if(actual)pintar(actual);};
  window.addEventListener('hashchange',ir);
  window.__irA=function(h){if(window.RUTAS_LIMPIAS){history.pushState(null,'',h.replace(/^#/,''));ir();}else location.hash=h;};
  if(window.RUTAS_LIMPIAS){
    window.addEventListener('popstate',ir);
    var limpiar=function(root){(root||document).querySelectorAll('a[href^="#/"]').forEach(function(a){a.setAttribute('href',a.getAttribute('href').slice(1));});};
    limpiar();new MutationObserver(function(ms){ms.forEach(function(m){m.addedNodes.forEach(function(n){if(n.nodeType===1){if(n.matches&&n.matches('a[href^="#/"]'))n.setAttribute('href',n.getAttribute('href').slice(1));if(n.querySelectorAll)limpiar(n);}});});}).observe(document.body||document.documentElement,{childList:true,subtree:true});
    document.addEventListener('click',function(e){
      if(e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
      var a=e.target.closest&&e.target.closest('a[href]');if(!a||a.target==='_blank'||a.hasAttribute('download')||(a.hasAttribute('data-ancla')&&document.getElementById(a.getAttribute('data-ancla'))))return;
      var h=a.getAttribute('href');if(!h||h.charAt(0)!=='/'||h.charAt(1)==='/'||/\.[a-z0-9]{2,5}($|\?)/i.test(h))return;
      e.preventDefault();if(h!==location.pathname+location.search)history.pushState(null,'',h);ir();
    });
  }
  // interacciones de las páginas
  document.addEventListener('click',function(e){
    var ba=e.target.closest('[data-ancla]'); if(ba){var ea=document.getElementById(ba.getAttribute('data-ancla')); if(ea){e.preventDefault();ea.scrollIntoView({behavior:'smooth',block:'start'});} return;}
    var b=e.target.closest('[data-ir]'); if(b){var el=document.getElementById('cat-'+b.getAttribute('data-ir')); if(el)el.scrollIntoView({behavior:'smooth',block:'start'}); return;}
    var tf=e.target.closest('[data-tec-f]'); if(tf){var tec=tf.getAttribute('data-tec-f'),tot=0;document.querySelectorAll('[data-tec-f]').forEach(function(x){x.setAttribute('aria-pressed',String(x===tf));});
      document.querySelectorAll('.cat').forEach(function(cat){var vis=0;cat.querySelectorAll('.prod').forEach(function(c){var ok=tec==='todas'||(c.getAttribute('data-tec')||'').split(' ').indexOf(tec)>=0;c.hidden=!ok;if(ok)vis++;});cat.hidden=!vis;tot+=vis;var cu=cat.querySelector('.cuenta');if(cu)cu.innerHTML='<b>'+String(vis).padStart(2,'0')+'</b> '+(vis===1?'producto':'productos');});
      var nn=document.querySelector('.filtro-tec-n');if(nn)nn.textContent=tec==='todas'?'':tot+(tot===1?' producto admite ':' productos admiten ')+tf.textContent.toLowerCase()+'.';return;}
    var g=e.target.closest('.g-mini button'); if(g){var pr=document.getElementById('gprin'); pr.src=g.getAttribute('data-src'); pr.alt=g.getAttribute('data-alt'); [].forEach.call(g.parentNode.children,function(x){x.classList.toggle('on',x===g);x.setAttribute('aria-pressed',x===g?'true':'false');});}
  });
  // Imágenes diferidas: aparecen con un fundido cuando terminan de cargar (o si fallan, para no quedar invisibles).
  var marcarImg=function(e){var im=e.target;if(im&&im.tagName==='IMG')im.classList.add('cargada');};document.addEventListener('load',marcarImg,true);document.addEventListener('error',marcarImg,true);
  new MutationObserver(function(){document.querySelectorAll('img[loading="lazy"]:not(.cargada)').forEach(function(im){if(im.complete&&im.naturalWidth)im.classList.add('cargada');});}).observe(document.documentElement,{childList:true,subtree:true});
  // Envío de pedidos al mail de La Rañatela. En el sitio publicado, ENVIO_URL apunta a la función del servidor
  // (api/pedido) que manda el mail a info.laranatela@gmail.com con los adjuntos. En este prototipo no hay servidor:
  // el envío se simula y el cliente nunca descarga archivos.
  var ENVIO_URL=window.ENVIO_URL||'', MAIL_PEDIDOS='info.laranatela@gmail.com';
  window.__envioReal=!!ENVIO_URL;
  window.__enviarPedido=function(datos,adj){var fd=new FormData();Object.keys(datos).forEach(function(k){fd.append(k,datos[k]);});fd.append('para',MAIL_PEDIDOS);
    ((adj&&adj.archivos)||[]).forEach(function(a){fd.append('adjuntos[]',a.blob,a.nombre);});
    if(!ENVIO_URL){try{console.info('[pedido] simulado → '+MAIL_PEDIDOS,datos,((adj&&adj.archivos)||[]).map(function(a){return a.nombre+' ('+Math.round(a.blob.size/1024)+' KB)';}));}catch(_){}return Promise.resolve({simulado:true});}
    return fetch(ENVIO_URL,{method:'POST',body:fd}).then(function(r){if(!r.ok)throw new Error('envio');return r;});};
  // Si la web todavía no tiene servidor de envío, se avisa con claridad: nunca se confirma algo que no llegó.
  function sinEnvio(f,mail){var m=f.querySelector('.form-error')||f.appendChild(document.createElement('p'));m.className='form-error';m.setAttribute('role','alert');
    m.innerHTML='Todavía no podemos recibir consultas desde la web: tu mensaje <b>no se envió</b>. Escribinos por <a href="https://wa.me/5492615341275" target="_blank" rel="noopener">WhatsApp</a> o a <a href="mailto:'+mail+'">'+mail+'</a>.';}
  var MAIL_OK=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  function validar(f){var em=f.querySelector('[type=email]');if(em)em.setCustomValidity(em.value&&!MAIL_OK.test(em.value.trim())?'Revisá el correo: falta algo (ej.: nombre@empresa.com).':'');
    [].forEach.call(f.querySelectorAll('[required]'),function(x){if(x.type!=='checkbox'&&!String(x.value).trim())x.value='';});if(!f.checkValidity()){f.reportValidity();return false;}return true;}
  document.addEventListener('submit',function(e){ if(e.target.id==='form-eti'){e.preventDefault(); var fe=e.target; if(!validar(fe))return; var de={origen:'ETI · Sumá a tu empresa'};[].forEach.call(fe.elements,function(el){if(el.name)de[el.name]=el.value;});var be=fe.querySelector('[type=submit]');if(be)be.disabled=true;
      window.__enviarPedido(de).then(function(r){if(r&&r.simulado){if(be)be.disabled=false;sinEnvio(fe,'eti.laranatela@gmail.com');return;}fe.outerHTML='<p class="lead ok-eti" role="status">¡Gracias! Te escribimos desde el equipo del ETI.</p>';},function(){if(be)be.disabled=false;sinEnvio(fe,'eti.laranatela@gmail.com');}); return;}
    if(e.target.id!=='form')return; e.preventDefault(); var f=e.target; if(!validar(f))return; var btn=f.querySelector('[type=submit]'),datos={origen:'Formulario de contacto'};
    [].forEach.call(f.elements,function(el){if(el.name)datos[el.name]=el.value;});var adj=window.__adjuntosPZ;if(adj)datos.resumen=adj.resumen;
    btn.disabled=true;btn.textContent='Enviando…';
    window.__enviarPedido(datos,adj).then(function(r){if(r&&r.simulado){btn.disabled=false;btn.textContent='Enviar consulta';sinEnvio(f,MAIL_PEDIDOS);return;}window.__adjuntosPZ=null;window.__irA('#/contacto/gracias');},function(){btn.disabled=false;btn.textContent='Reintentar envío';var m=f.querySelector('.form-error')||f.appendChild(document.createElement('p'));m.className='form-error';m.setAttribute('role','alert');m.textContent='No pudimos enviar tu consulta. Probá de nuevo o escribinos por WhatsApp.';}); });
  // SEO: datos estructurados (LocalBusiness + Product) y Open Graph por ruta. Se leen aunque el sitio sea estático.
  var BASE_URL=window.RUTAS_LIMPIAS?(location.origin+'/'):(location.origin+location.pathname).replace(/index\.html$/,''),HP=window.RUTAS_LIMPIAS?'':'#/';
  function caminoRt(rt){return rt.r==='ficha'?'productos/'+rt.arg:rt.r==='nota'?'novedades/'+rt.arg:rt.r==='tejiendo'?'tejiendo-oportunidades':rt.r==='terapia'?'terapia-ocupacional':rt.r==='gracias'?'contacto/gracias':rt.r;}
  function seoRuta(rt,pr){
    var org={'@type':['LocalBusiness','Organization'],'@id':BASE_URL+'#org',name:'La Rañatela',description:(D.pages.inicio||{}).description||'',url:BASE_URL,telephone:'+54 261 534 1275',email:'info.laranatela@gmail.com',image:BASE_URL+'img/fot-taller-armado.jpg',
      address:{'@type':'PostalAddress',streetAddress:'J. B. Martínez 200',addressLocality:'Maipú',addressRegion:'Mendoza',addressCountry:'AR'},areaServed:'Argentina',foundingDate:'2009',
      openingHoursSpecification:[{'@type':'OpeningHoursSpecification',dayOfWeek:['Monday','Tuesday','Wednesday','Thursday','Friday'],opens:'09:00',closes:'16:00'}],
      sameAs:[REDES0&&REDES0.instagram,REDES0&&REDES0.tiktok,REDES0&&REDES0.linkedin].filter(Boolean),knowsAbout:['bolsas personalizadas','mochilas personalizadas','merchandising corporativo','serigrafía','sublimación','bordado','regalos empresariales','Mendoza']};
    var graph=[org];
    if(pr){graph.push({'@type':'Product','@id':BASE_URL+HP+'productos/'+pr.slug,name:pr.nombre,description:pr.resumen,image:BASE_URL+img(pr.imagen).replace(/^\.?\//,''),brand:{'@type':'Brand',name:'La Rañatela'},manufacturer:{'@id':BASE_URL+'#org'},material:MAT[pr.material]||pr.material,category:CATLAB[pr.categoria]||'',
      offers:{'@type':'Offer',availability:'https://schema.org/MadeToOrder',priceCurrency:'ARS',eligibleQuantity:{'@type':'QuantitativeValue',minValue:100,unitText:'unidades'},seller:{'@id':BASE_URL+'#org'}}});}
    else if(rt.r==='productos'){graph.push({'@type':'ItemList',name:'Catálogo de La Rañatela',itemListElement:D.productos.filter(function(p){return !p.oculto;}).slice(0,30).map(function(p,i){return {'@type':'ListItem',position:i+1,name:p.nombre,url:BASE_URL+HP+'productos/'+p.slug};})});}
    graph.push({'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Inicio',item:BASE_URL}].concat(rt.r==='inicio'?[]:[{'@type':'ListItem',position:2,name:rt.label,item:BASE_URL+HP+caminoRt(rt)}])});
    var ld=document.getElementById('ld-json');if(!ld){ld=document.createElement('script');ld.type='application/ld+json';ld.id='ld-json';document.head.appendChild(ld);}
    ld.textContent=JSON.stringify({'@context':'https://schema.org','@graph':graph});
    function og(p,v){var m=document.querySelector('meta[property="'+p+'"]');if(!m){m=document.createElement('meta');m.setAttribute('property',p);document.head.appendChild(m);}m.content=v||'';}
    og('og:site_name','La Rañatela');og('og:type',pr?'product':'website');og('og:title',document.title);og('og:description',document.querySelector('meta[name=description]').content);og('og:url',BASE_URL+(rt.r==='inicio'?'':HP+caminoRt(rt)));og('og:image',BASE_URL+(pr?img(pr.imagen).replace(/^\.?\//,''):'img/fot-taller-armado.jpg'));og('og:locale','es_AR');
    var tw=document.querySelector('meta[name="twitter:card"]');if(!tw){tw=document.createElement('meta');tw.name='twitter:card';tw.content='summary_large_image';document.head.appendChild(tw);}
    var rb=document.querySelector('meta[name=robots]');if(rt.r==='404'||rt.r==='gracias'||rt.r==='admin'){if(!rb){rb=document.createElement('meta');rb.name='robots';document.head.appendChild(rb);}rb.content='noindex';}else if(rb&&window.RUTAS_LIMPIAS)rb.remove();
    var cn=document.querySelector('link[rel=canonical]');if(!cn){cn=document.createElement('link');cn.rel='canonical';document.head.appendChild(cn);}cn.href=BASE_URL+(rt.r==='inicio'?'':HP+caminoRt(rt));
  }
  ir();
})();
