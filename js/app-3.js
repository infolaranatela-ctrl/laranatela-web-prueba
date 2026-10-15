
(function(){
  var root=document.documentElement; root.classList.add('js');
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cv=document.getElementById('tela');
  var navs=document.querySelectorAll('.nav a, .menu-cel a');
  var N=(window.__PAGS||[]).length||8;
  var cs=getComputedStyle(root);
  var colLine=cs.getPropertyValue('--line').trim()||'#2BA294';
  var colBg=cs.getPropertyValue('--bg').trim()||'#ffffff';
  var colAcc=cs.getPropertyValue('--accent2').trim()||colLine;
  var tObj=0, tSuave=0, scrollN=0, sS=0;
  function medir(){
    var vh=window.innerHeight, sy=window.scrollY, P=window.__pag||{i:0,nav:'inicio'};
    tObj=P.i/(N-1); scrollN=sy/vh;
    var gu=document.getElementById('guia'); if(gu){gu.style.setProperty('--prog',Math.min(1,sy/Math.max(1,document.documentElement.scrollHeight-vh)).toFixed(4));}
    navs.forEach(function(a){var on=a.getAttribute('data-n')===P.nav;a.classList.toggle('on',on);if(on)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
    var hi=document.getElementById('heroimg'); if(hi&&!reduce){var k=Math.min(1,sy/vh);hi.style.transform='translateY('+(k*40)+'px) scale('+(1+k*0.04)+')';}
  }
  window.__medir=medir;
  window.addEventListener('scroll',medir,{passive:true});
  window.addEventListener('resize',medir);
  medir();

  // ---------- escena 3D: red de nodos ----------
  if(window.THREE && cv) (function(){
  var T=window.THREE;
  var renderer=new T.WebGLRenderer({canvas:cv,alpha:true,antialias:true,powerPreference:'low-power'});
  var modesto=(navigator.hardwareConcurrency||8)<=4||(navigator.deviceMemory||8)<=4; renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,window.innerWidth<1101?1.5:1.75,modesto?1.25:9));
  var scene=new T.Scene();
  scene.fog=new T.Fog(new T.Color(colBg),18,70);
  var cam=new T.PerspectiveCamera(50,1,0.1,400); var puntosCv=document.getElementById('fondo-puntos'),puntosPl=null,PD=13; if(puntosCv){var ptx=new T.CanvasTexture(puntosCv); ptx.minFilter=T.LinearFilter; ptx.generateMipmaps=false; window.__puntosTex=ptx; puntosPl=new T.Mesh(new T.PlaneGeometry(1,1),new T.MeshBasicMaterial({map:ptx,transparent:true,opacity:.22,depthWrite:false,fog:false})); puntosPl.position.set(0,0,-PD); cam.add(puntosPl); scene.add(cam);}
  var colInk=(cs.getPropertyValue('--node').trim()||cs.getPropertyValue('--ink').trim()||'#1F3A37');
  var esCel=window.innerWidth<700;

  // anclas: un nodo por sección (los oficios), recorrido hacia adelante (-z)
  var anclas=[], PASO=16;
  // alto estable de la tela: 100lvh (no cambia cuando Safari esconde o muestra sus barras)
  var _probe=document.createElement('div');_probe.style.cssText='position:fixed;left:0;top:0;width:0;height:100vh;height:100lvh;padding-top:env(safe-area-inset-top);visibility:hidden;pointer-events:none';document.body.appendChild(_probe);
  function altoTela(){return Math.max(window.innerHeight,_probe.offsetHeight-(parseFloat(getComputedStyle(_probe).paddingTop)||0)||0);}
  function margenArriba(){return parseFloat(getComputedStyle(_probe).paddingTop)||0;}
  var _fitK='',_fitP=new T.Vector3(),_fitL=new T.Vector3();
  // busca la cámara más cercana que deja todos los nodos de secciones dentro del rectángulo libre (arriba del texto de la intro)
  function encuadre(w,h){var yaw=new T.Vector3(0.6,0,-12).normalize(),down=new T.Vector3(0,-1,0),Wup=new T.Vector3(0,1,0);
    var tH=Math.tan((w<700?66:50)*Math.PI/360),asp=w/h,NA=Math.min(5,anclas.length),C=new T.Vector3();for(var a0=0;a0<NA;a0++)C.add(anclas[a0]);C.multiplyScalar(1/NA);
    var st=margenArriba(),cap=document.querySelector('.intro-cap'),capTop=cap&&cap.offsetHeight?cap.getBoundingClientRect().top:h*0.7;
    var x0=w*0.10,x1=w*0.64,y0=st+h*0.28,y1=Math.max(y0+h*0.18,capTop-28);
    var tcx=((x0+x1)/w)-1,tcy=1-((y0+y1)/h),tw=(x1-x0)/w*2,th=(y1-y0)/h*2,P=new T.Vector3(),rel=new T.Vector3(),mejor=null;
    for(var pd=20;pd<=55;pd+=5){var pr=pd*Math.PI/180,dir=yaw.clone().multiplyScalar(Math.cos(pr)).addScaledVector(down,Math.sin(pr)).normalize(),rgt=new T.Vector3().crossVectors(dir,Wup).normalize(),upv=new T.Vector3().crossVectors(rgt,dir).normalize();
      for(var D=6;D<=120;D+=1){var sx=0,sy=0,bx0,bx1,by0,by1,zs,malo=false;
        for(var it=0;it<6;it++){P.copy(C).addScaledVector(dir,-D).addScaledVector(rgt,sx).addScaledVector(upv,sy);bx0=by0=1e9;bx1=by1=-1e9;zs=0;malo=false;
          for(var q=0;q<NA;q++){rel.copy(anclas[q]).sub(P);var z=rel.dot(dir);if(z<2){malo=true;break;}var nx=rel.dot(rgt)/(z*tH*asp),ny=rel.dot(upv)/(z*tH);zs+=z;bx0=Math.min(bx0,nx);bx1=Math.max(bx1,nx);by0=Math.min(by0,ny);by1=Math.max(by1,ny);}
          if(malo)break;var zm=zs/NA;sx+=((bx0+bx1)/2-tcx)*zm*tH*asp;sy+=((by0+by1)/2-tcy)*zm*tH;}
        if(!malo&&bx1-bx0<=tw&&by1-by0<=th){var pena=D+Math.abs(pd-40)*0.15;if(!mejor||pena<mejor.pena)mejor={pena:pena,P:P.clone(),dir:dir.clone(),D:D,pd:pd};break;}}}
    if(!mejor){var dd=yaw.clone().multiplyScalar(Math.cos(0.7)).addScaledVector(down,Math.sin(0.7)).normalize();mejor={P:C.clone().addScaledVector(dd,-30),dir:dd,D:30,pd:40};}
    _fitP.copy(mejor.P);_fitL.copy(mejor.P).addScaledVector(mejor.dir,10);window.__encuadre={w:w,h:h,D:mejor.D,pitch:mejor.pd};}

  for(var i=0;i<N;i++) anclas.push(new T.Vector3(i===0?-5.5:Math.sin(i*1.25)*7.5, i===0?-2.5:Math.cos(i*0.9)*3.2-0.5, -i*PASO));
  var curva=new T.CatmullRomCurve3(anclas,false,'catmullrom',0.6);
  var camPts=anclas.map(function(a,i){return new T.Vector3(a.x*0.55+Math.cos(i*1.7)*2.5, a.y*0.6+2.2+Math.sin(i*1.1)*1.2, a.z+9);});
  var curvaCam=new T.CatmullRomCurve3(camPts,false,'catmullrom',0.6);
  var centro=new T.Vector3(); anclas.forEach(function(a){centro.add(a);}); centro.multiplyScalar(1/N);
  var seed=7; function rnd(){seed=(seed*9301+49297)%233280;return seed/233280;}

  // red: grilla irregular sobre un plano ondulado + las anclas
  var pts=[], tam_=[], esAncla=[], grilla={}, posG=[];
  var PASOG=modesto?6.8:5.4; for(var gz=26; gz>-128; gz-=PASOG){ for(var gx=-70; gx<=48; gx+=PASOG){
    var x=gx+(rnd()-0.5)*4.4, z=gz+(rnd()-0.5)*4.4;
    var y=-2.2+Math.sin(x*0.13+z*0.05)*1.4+Math.cos(z*0.09)*1.2+(rnd()-0.5)*2.2;
    var tooClose=anclas.some(function(a){return Math.hypot(a.x-x,a.z-z)<3;}); if(tooClose)continue;
    grilla[Math.round((26-gz)/PASOG)+','+Math.round((gx+70)/PASOG)]=pts.length; pts.push(new T.Vector3(x,y,z)); tam_.push(0.22+rnd()*0.26); esAncla.push(-1);
  }}
  anclas.forEach(function(a,i){pts.push(a.clone()); tam_.push(0.62); esAncla.push(i);}); var webIni=pts.length, webR=[], webHub=-1, tsd2=91, tsw=function(){tsd2=(tsd2*9301+49297)%233280;return tsd2/233280;}; (function(){var _wI=window.innerWidth,_hI=altoTela(),movilI=_wI<1101&&_hI>=_wI,cI=new T.PerspectiveCamera(_wI<700?66:50,_wI/Math.max(1,_hI),0.1,400),_lI0=new T.Vector3(); vista(cI.position,_lI0); cI.lookAt(_lI0); cI.updateMatrixWorld(); if(movilI)return;  var dir=new T.Vector3(),rgt=new T.Vector3(),upv=new T.Vector3(); cI.getWorldDirection(dir); rgt.crossVectors(dir,cI.up).normalize(); upv.crossVectors(rgt,dir).normalize();  var D=15, hH=D*Math.tan(cI.fov*Math.PI/360), hW=hH*cI.aspect, hyI=movilI?1-2*(margenArriba()+_hI*0.15)/_hI:1, hub=cI.position.clone().addScaledVector(dir,D).addScaledVector(rgt,hW*(movilI?0.48:1)).addScaledVector(upv,hH*hyI), Rw=movilI?hW*0.44:hH*0.33; var ax1=rgt.clone().multiplyScalar(Math.cos(0.15)).addScaledVector(dir,-Math.sin(0.15)), ax2=upv.clone().multiplyScalar(Math.cos(0.1)).addScaledVector(dir,-Math.sin(0.1));  webHub=pts.length; pts.push(hub); tam_.push(0.3); esAncla.push(-1); var nRw=6, angs=[]; for(var r=0;r<nRw;r++)angs.push(r*2*Math.PI/nRw+(tsw()-0.5)*0.35);  for(var k=1;k<=3;k++){var fila=[]; for(var r=0;r<nRw;r++){var rad_=Rw*(k/3)*(0.88+tsw()*0.24), pp=hub.clone().addScaledVector(ax1,Math.cos(angs[r])*rad_).addScaledVector(ax2,Math.sin(angs[r])*rad_).addScaledVector(dir,(tsw()-0.5)*0.25); fila.push(pts.length); pts.push(pp); tam_.push(k===3?0.15:0.09+tsw()*0.04); esAncla.push(-1);} webR.push(fila);} })();
  var M=pts.length;
  // aristas: cada nodo con sus 3 vecinos más cercanos (anclas: 5)
  var cerca_=pts.map(function(p){return anclas.some(function(an){return Math.hypot(an.x-p.x,an.z-p.z,an.y-p.y)<11;});});
  var segs=[], vistos={}; Object.keys(grilla).forEach(function(k){posG[grilla[k]]=k.split(',').map(Number);}); var enTela={}, telaSet={}; function une(a,b2,web){if(a===undefined||b2===undefined||a===b2)return; if(!web&&enTela[a]&&enTela[b2])return; var key=a<b2?a+'-'+b2:b2+'-'+a; if(web)telaSet[a<b2?a+'-'+b2:b2+'-'+a]=1; if(vistos[key])return; vistos[key]=1; segs.push([a,b2]);} for(var a0=0;a0<M;a0++){var gp=posG[a0]; if(!gp)continue; var r0=gp[0],c0=gp[1];  une(a0,grilla[r0+','+(c0+1)]!==undefined?grilla[r0+','+(c0+1)]:grilla[r0+','+(c0+2)]);  une(a0,grilla[(r0+1)+','+c0]!==undefined?grilla[(r0+1)+','+c0]:grilla[(r0+2)+','+c0]);  if(rnd()<0.12)une(a0,grilla[(r0+1)+','+(c0+((r0%2)?1:-1))]);} if(webR.length){var nRw=webR[0].length; for(var rq=0;rq<nRw;rq++){une(webHub,webR[0][rq],1); for(var kq=0;kq<webR.length;kq++){var A_=webR[kq][rq]; if(kq+1<webR.length)une(A_,webR[kq+1][rq],1); if(tsw()>0.08)une(A_,webR[kq][(rq+1)%nRw],1);}}  var usados={}; webR[webR.length-1].forEach(function(e,ie){if(ie%2)return; var dmin=1e9,bq=-1; for(var q4=0;q4<webIni;q4++){if(esAncla[q4]>=0||usados[q4])continue; var dq=pts[q4].distanceToSquared(pts[e]); if(dq<dmin){dmin=dq;bq=q4;}} if(bq>=0){usados[bq]=1;une(e,bq);}});}
  for(var a=0;a<M;a++){ if(esAncla[a]<0)continue;
    var ds=[]; for(var b=0;b<M;b++){ if(a!==b) ds.push([pts[a].distanceToSquared(pts[b]),b]); }
    var kk=esAncla[a]>=0?7:(cerca_[a]?6:3);
    var dc=ds.filter(function(q){return q[0]<170;}); if(dc.length>=kk)ds=dc;
    ds.sort(function(p,q){return p[0]-q[0];});
    for(var j=0;j<kk;j++){ var b2=ds[j][1], key=a<b2?a+'-'+b2:b2+'-'+a; if(vistos[key])continue; vistos[key]=1; segs.push([a,b2]); }
  }
  // orden de tejido: del frente hacia el fondo
  var orden=pts.map(function(p,i){return i;}).sort(function(p,q){return pts[q].z-pts[p].z;});
  var rev=new Array(M); orden.forEach(function(idx,k){rev[idx]=k/M;});
  segs.sort(function(s1,s2){return Math.max(rev[s1[0]],rev[s1[1]])-Math.max(rev[s2[0]],rev[s2[1]]);});
  var segPts=[], segCum=[0]; segs.forEach(function(s){var A=pts[s[0]],B=pts[s[1]],L=A.distanceTo(B),ga=Math.min(L*0.3,tam_[s[0]]*0.48),gb=Math.min(L*0.3,tam_[s[1]]*0.48),dir=B.clone().sub(A).normalize(),A2=A.clone().addScaledVector(dir,ga),B2=B.clone().addScaledVector(dir,-gb); {var perp=new T.Vector3(-dir.z,0,dir.x).normalize(),k=(rnd()<0.5?-1:1)*L*(0.03+rnd()*0.07),C=A2.clone().add(B2).multiplyScalar(0.5).addScaledVector(perp,k); C.y-=(telaSet[s[0]<s[1]?s[0]+'-'+s[1]:s[1]+'-'+s[0]]?0.12:1)*L*(0.05+rnd()*0.06); var cu=new T.QuadraticBezierCurve3(A2,C,B2),pp=cu.getPoints(14); for(var q=0;q<pp.length-1;q++)segPts.push(pp[q],pp[q+1]);} segCum.push(segPts.length);});
  var g=new T.BufferGeometry().setFromPoints(segPts);
  var lineMat=new T.LineBasicMaterial({color:new T.Color('#2B8F84'),transparent:true,opacity:0.27});
  var red=new T.LineSegments(g,lineMat); g.setDrawRange(0,0); scene.add(red); var cabo=new T.LineSegments(g,new T.LineBasicMaterial({color:new T.Color('#7EC9BF'),transparent:true,opacity:0.12})); cabo.position.set(0.03,-0.025,0); scene.add(cabo);

  // texturas de nodo: esfera nítida + niveles de desenfoque (profundidad de campo)
  function texturas(hex){
    var c=new T.Color(hex), r=Math.round(c.r*255), gg=Math.round(c.g*255), bb=Math.round(c.b*255);
    var lum=0.299*c.r+0.587*c.g+0.114*c.b, claro=lum>0.6, L=[];
    for(var lv=0;lv<6;lv++){
      var cvs=document.createElement('canvas'); cvs.width=cvs.height=128; var x=cvs.getContext('2d');
      if(lv===0){
        var gr=x.createRadialGradient(46,42,4,64,64,60);
        gr.addColorStop(0,'rgba(255,255,255,1)'); gr.addColorStop(0.18,'rgba('+r+','+gg+','+bb+',1)');
        var sh=claro?0.62:0.45; gr.addColorStop(0.85,'rgba('+Math.round(r*sh)+','+Math.round(gg*sh)+','+Math.round(bb*sh)+',1)');
        gr.addColorStop(1,'rgba('+Math.round(r*sh)+','+Math.round(gg*sh)+','+Math.round(bb*sh)+',1)');
        x.fillStyle=gr; x.beginPath(); x.arc(64,64,58,0,Math.PI*2); x.fill();
        var sp=x.createRadialGradient(47,41,0,47,41,22); sp.addColorStop(0,'rgba(255,255,255,.92)'); sp.addColorStop(.35,'rgba(255,255,255,.35)'); sp.addColorStop(1,'rgba(255,255,255,0)'); x.fillStyle=sp; x.beginPath(); x.arc(64,64,58,0,Math.PI*2); x.fill(); var rim=x.createRadialGradient(64,64,46,64,64,58); rim.addColorStop(0,'rgba(255,255,255,0)'); rim.addColorStop(1,'rgba(255,255,255,.18)'); x.fillStyle=rim; x.beginPath(); x.arc(64,64,58,0,Math.PI*2); x.fill();
      } else {
        var al=Math.max(0.12,0.62-lv*0.09), bl=Math.min(0.55,0.12+lv*0.085), lift=claro?0:Math.min(0.55,0.22+lv*0.07); var tr=Math.round(r+(43-r)*lift+(255-r)*lift*0.35), tg=Math.round(gg+(143-gg)*lift+(255-gg)*lift*0.35), tb=Math.round(bb+(132-bb)*lift+(255-bb)*lift*0.35); var gb=x.createRadialGradient(64,64,0,64,64,60), e=1-bl; gb.addColorStop(0,'rgba('+tr+','+tg+','+tb+','+(al*0.7)+')'); gb.addColorStop(Math.max(0.05,e*0.8),'rgba('+tr+','+tg+','+tb+','+(al*0.82)+')'); gb.addColorStop(Math.max(0.1,e),'rgba('+tr+','+tg+','+tb+','+(al*0.95)+')'); gb.addColorStop(1,'rgba('+tr+','+tg+','+tb+',0)'); x.fillStyle=gb; x.fillRect(0,0,128,128);
      }
      var tx=new T.CanvasTexture(cvs); L.push(new T.SpriteMaterial({map:tx,transparent:true,depthWrite:false,fog:true}));
    }
    return L;
  }
  var matsInk=texturas(colInk), matsAcc=texturas('#1B7C71'), matsT=texturas('#2BA294'), matsY=texturas('#FFD84A'), matsM=texturas('#7EDFD1'); function paleta(n){return n%11===0?matsY:(n%4===0?matsInk:(n%3===0?matsM:matsT));}
  var sprites=pts.map(function(p,i){var s=new T.Sprite(matsInk[0]);s.position.copy(p);s.scale.setScalar(0.001);scene.add(s);return s;}); var matsHub=texturas('#4FB3A6'); matsHub.forEach(function(mt){mt.depthTest=false;}); if(webHub>=0)sprites[webHub].renderOrder=20;

  // hilo principal (recorrido) que se dibuja con el scroll
  var PTS=600, hiloPts=curva.getPoints(PTS);
  var hg=new T.BufferGeometry().setFromPoints(hiloPts);
  scene.add(new T.Line(hg,new T.LineBasicMaterial({color:new T.Color(colLine),transparent:true,opacity:0.95}))); hg.setDrawRange(0,2);
  var halos=anclas.map(function(a){var m=new T.Mesh(new T.RingGeometry(0.75,0.82,48),new T.MeshBasicMaterial({color:new T.Color(colLine),transparent:true,opacity:0,side:T.DoubleSide}));m.position.copy(a);scene.add(m);return m;});

  // intro: la red gigante; el primer swipe entra a la página.
  // la página: cada sección es un nodo; la cámara se acerca al nodo de la sección activa y el contenido aparece al lado.
  var t0=null, INTRO=1.5;
  var enIntro=!reduce && window.scrollY<20 && (window.__pag||{}).r==='inicio', introVis=enIntro?1:0, ultimo=-1e9, acum=0, acumT=0;
  function terminarIntro(){ if(!enIntro)return; enIntro=false; root.classList.remove('en-intro'); window.scrollTo(0,0); }
  function mover(d){ if(!enIntro)return; var ahora=performance.now(); if(ahora-ultimo<500)return; ultimo=ahora; if(d>0)terminarIntro(); }
  window.__laraPaso=mover; window.__salirIntro=terminarIntro;
  if(enIntro){ root.classList.add('en-intro');
    var sk=document.getElementById('introskip'); if(sk)sk.addEventListener('click',terminarIntro);
    window.addEventListener('wheel',function(e){ if(!enIntro)return; e.preventDefault(); var ahora=performance.now(); if(ahora-acumT>220)acum=0; acumT=ahora; acum+=e.deltaY; if(acum>30){mover(1);acum=0;} },{passive:false});
    var ty=null;
    window.addEventListener('touchstart',function(e){ if(enIntro&&e.touches.length===1)ty=e.touches[0].clientY; },{passive:true});
    window.addEventListener('touchmove',function(e){ if(enIntro&&e.cancelable)e.preventDefault(); },{passive:false});
    window.addEventListener('touchend',function(e){ if(!enIntro||ty===null)return; var dy=ty-e.changedTouches[0].clientY; ty=null; if(dy>30)mover(1); },{passive:true});
    window.addEventListener('keydown',function(e){ if(!enIntro)return; var k=e.key;
      if(k==='ArrowDown'||k==='PageDown'||k===' '||k==='Enter'||k==='Escape'){e.preventDefault();terminarIntro();} });
  }
  var OFICIOS=['Inicio','Productos','Empresas','Nosotros','ETI','YOSUMÉ','Novedades','Contacto','Fichas','Más'];
  var CORTOS=['Quiénes somos','Trayectoria','Catálogo','Reciclado','Historia','Campaña','Contacto'];
  var capa=document.getElementById('oficios'), etq=[], _p=new T.Vector3();
  if(capa){OFICIOS.slice(0,N).forEach(function(o,i){var d=document.createElement('div');d.className='oficio';d.innerHTML='<i>0'+(i+1)+'</i><span>'+o+'</span>';capa.appendChild(d);etq.push(d);});}
  var marca=document.createElement('div'); marca.className='nodo-marca'; marca.setAttribute('aria-hidden','true'); marca.innerHTML='<s></s><span><i></i><b></b></span>'; document.body.appendChild(marca);
  var mI=marca.querySelector('i'), mB=marca.querySelector('b'), mUlt=-1;

  var mx=0,my=0,mxS=0,myS=0;
  window.addEventListener('pointermove',function(e){mx=(e.clientX/window.innerWidth-0.5);my=(e.clientY/window.innerHeight-0.5);},{passive:true});
  // dónde se para el nodo en pantalla: en compu, en la columna izquierda libre; en celular, arriba a la derecha
  var fx=0.16, fy=0.44;
  var _tW=0,_tH=0;
  function tam(){var w=window.innerWidth,h=altoTela();esCel=w<700;if(w!==_tW||Math.abs(h-_tH)>1){_tW=w;_tH=h;renderer.setSize(w,h,false);cam.aspect=w/h;cam.fov=esCel?66:50;cam.updateProjectionMatrix();}
    root.classList.toggle('nodo-col',!esCel&&w>=1101);
    var ref=document.querySelector('#app .cont');
    if(w<1101){var hb=document.querySelector('.hdr'),lg=hb&&hb.querySelector('.logo'),bu=hb&&hb.querySelector('.burger'),hr=hb?hb.getBoundingClientRect():{top:0,height:60};
      var izq=lg?lg.getBoundingClientRect().right:w*0.45, der=bu&&bu.offsetWidth?bu.getBoundingClientRect().left:w-60, nx=izq+14+11;
      fx=Math.min(0.8,nx/w); fy=(hr.top+hr.height/2)/h; var lib=der-12-(nx+11+8); marca.style.setProperty('--labmax',Math.max(0,lib).toFixed(0)+'px'); marca.classList.toggle('sin-texto',lib<44);}
    else if(ref){var r=ref.getBoundingClientRect(), pl=parseFloat(getComputedStyle(ref).paddingLeft)||0; fx=Math.min(0.3,Math.max(0.08,(r.left+pl*0.56)/w)); fy=0.44;}
  }
  window.addEventListener('resize',tam); window.addEventListener('orientationchange',function(){setTimeout(tam,250);}); if(window.visualViewport)window.visualViewport.addEventListener('resize',function(){clearTimeout(tam._t);tam._t=setTimeout(tam,120);}); tam();

  var Y=new T.Vector3(0,1,0), ANG=[0.55,-0.6,0.75,-0.5,0.6,-0.7,0.5];
  var _tmp=new T.Vector3(), _tmp2=new T.Vector3(), _tmp3=new T.Vector3();
  function vista(P,L){ var w=window.innerWidth,h=altoTela(); if(w>=1101||w>h){P.set(4,7,6);L.set(-2,-3,-8);return;} var k=w+'x'+h; if(k!==_fitK){_fitK=k;encuadre(w,h);} P.copy(_fitP);L.copy(_fitL); }
  function poseSec(i,P,L){
    var A=anclas[Math.max(0,Math.min(N-1,i))], ang=ANG[i%7]*1.7+sS*0.34, D=(esCel?6.6:5.6)+Math.cos(sS*0.55)*0.9, H=(esCel?3.6:2.6)+Math.sin(sS*0.7)*1.3;
    P.set(A.x+Math.sin(ang)*D, A.y+H, A.z+Math.cos(ang)*D);
    L.copy(A);
  }
  var reloj=0, _look=new T.Vector3(), _up=new T.Vector3(0,1,0);
  var _pA=new T.Vector3(), _lA=new T.Vector3(), _pB=new T.Vector3(), _lB=new T.Vector3(), _pI=new T.Vector3(), _lI=new T.Vector3();
  function cuadro(ts){
    var _dt=Math.min(0.1,Math.max(0,ts*0.001-(reloj||ts*0.001))); reloj=ts*0.001; var kf=function(a){return reduce?1:1-Math.pow(1-a,_dt*60);};
    tSuave+=(tObj-tSuave)*kf(0.075); sS+=(scrollN-sS)*kf(0.08);
    var t=Math.min(1,Math.max(0,tSuave));
    if(t0===null)t0=reloj; var k=reduce?1:Math.min(1,0.22+(reloj-t0)/INTRO), ke=1-Math.pow(1-k,3);
    g.setDrawRange(0,segCum[Math.floor(ke*segs.length)]);
    mxS+=(mx-mxS)*kf(0.06); myS+=(my-myS)*kf(0.06);
    // pose de la página: de nodo en nodo según la sección activa
    var sc=t*(N-1), i0=Math.min(N-2,Math.floor(sc)), f=Math.max(0,Math.min(1,sc-i0)), fe=f*f*(3-2*f);
    poseSec(i0,_pA,_lA); poseSec(i0+1,_pB,_lB);
    _pA.lerp(_pB,fe); _lA.lerp(_lB,fe); _pA.y+=Math.sin(fe*Math.PI)*3.6;
    _pA.x+=mxS*0.7; _pA.y-=myS*0.5;
    // pose de la intro: la red entera
    introVis+=((enIntro?1:0)-introVis)*kf(0.045); if(Math.abs((enIntro?1:0)-introVis)<0.002)introVis=enIntro?1:0;
    vista(_pI,_lI); var movil=window.innerWidth<1101; _pI.x+=mxS*(movil?0.3:0.9)-(1-ke)*(movil?0.8:2.5); _pI.y-=myS*(movil?0.2:0.6);
    var m=introVis*introVis*(3-2*introVis);
    cam.position.copy(_pA).lerp(_pI,m); _look.copy(_lA).lerp(_lI,m);
    cam.up.copy(_up);
    if(!reduce){ var rol=(Math.sin(fe*Math.PI)*0.16*(i0%2?1:-1)+Math.sin(sS*0.9)*0.035)*(1-m); _tmp.copy(_look).sub(cam.position).normalize(); cam.up.applyAxisAngle(_tmp,rol); }
    cam.lookAt(_look);
    var VW=window.innerWidth, VH=_tH||altoTela(); cam.setViewOffset(VW,VH,(0.5-fx)*VW*(1-m),(0.5-fy)*VH*(1-m),VW,VH);
    scene.fog.near=16*(1-m)+26*m; scene.fog.far=80*(1-m)+110*m;
    lineMat.opacity=0.34*(1-m)+0.42*m;
    // profundidad de campo
    var activo=Math.round(sc), dA=cam.position.distanceTo(anclas[activo]);
    var cerca=1-Math.min(1,Math.abs(sc-activo)*3.2), mv=(1-m)*cerca;
    var foco=dA*(1-m)+cam.position.distanceTo(_look)*m, paso_=3.0*(1-m)+3.4*m;
    for(var n=0;n<M;n++){
      var s=sprites[n], ap=Math.max(0,Math.min(1,(ke*1.15-rev[n])*6));
      var d=Math.abs(cam.position.distanceTo(s.position)-foco), lv=Math.min(5,Math.floor(d/paso_));
      var anc=esAncla[n], es=anc>=0&&anc===activo&&m<0.5, on=anc>=0&&anc<=activo&&m<0.5&&!movil;
      s.material=(n===webHub?matsHub:on?matsAcc:paleta(n))[es?0:lv];
      var esc_=es&&mv>0.4?0.0001:tam_[n]*(1+lv*0.22)*(es?1.5:on?1.2:1)*ap+0.0001; if(movil&&m<0.5)esc_=Math.min(esc_,cam.position.distanceTo(s.position)*0.03); s.scale.setScalar(esc_);
    }
    // rótulos: todos en la intro; en la página, solo el del nodo activo
    var W2=VW/2, H2=VH/2, st0=margenArriba();
    if(etq.length){var vis=m*m*m*Math.max(0,(ke-0.35)/0.65), ocup=[], capE=m>0.3&&document.querySelector('.intro-cap'); if(capE&&capE.offsetHeight){var cr=capE.getBoundingClientRect();ocup.push([cr.left+8,cr.top+8,cr.right-8,cr.bottom-8]);}
      etq.forEach(function(e,i){ _p.copy(anclas[i]).project(cam); var x=_p.x*W2+W2, y=-_p.y*H2+H2, lw=e._w||(e._w=e.offsetWidth)||110, lx=x+12;
        if(lx+lw>VW-8)lx=x-12-lw; if(lx<8)lx=Math.max(8,Math.min(VW-8-lw,lx)); var onp=_p.z<1&&vis>0.01&&x>4&&x<VW-4&&y>st0+12&&y<VH-12;
        var lh=e._h||(e._h=e.offsetHeight)||24, rc=[lx-4,y-lh/2-3,lx+lw+4,y+lh/2+3]; if(onp&&ocup.some(function(o){return rc[0]<o[2]&&rc[2]>o[0]&&rc[1]<o[3]&&rc[3]>o[1];}))onp=false; if(onp)ocup.push(rc);
        e.style.opacity=onp?(vis*Math.min(1,Math.max(0,(ke*8.5-i)/1.5))).toFixed(3):0;
        e.style.transform='translate('+lx.toFixed(1)+'px,'+y.toFixed(1)+'px) translateY(-50%)'; }); }
    // marca de la sección: número y oficio junto al nodo activo
    var PG=window.__pag||{}, lab=(window.innerWidth<1101?(PG.corto||PG.label):PG.label)||'';
    var clave=lab+'|'+activo; if(clave!==mUlt){mUlt=clave; mI.textContent=(activo<9?'0':'')+(activo+1); mB.textContent=lab;}
    _p.copy(anclas[activo]).project(cam);
    var nx=_p.x*W2+W2, ny=-_p.y*H2+H2; if(movil){nx=fx*VW;ny=fy*VH;} var rp=(window.innerWidth<1101?11:Math.max(26,(0.45*1.5/Math.max(0.5,dA)/Math.tan(cam.fov*Math.PI/360))*H2*0.6));
    var llega=window.innerWidth<1101?Math.max(0,Math.min(1,(0.12-m)/0.12)):1; marca.style.opacity=(_p.z<1?mv*llega:0).toFixed(3);
    marca.style.transform='translate('+nx+'px,'+ny+'px)'; marca.style.setProperty('--r',rp.toFixed(1)+'px'); marca.style.setProperty('--sube',((1-cerca)*14).toFixed(1)+'px');
    window.__dbg={t:t,sc:sc,tObj:tObj};
    var nH=Math.floor(t*PTS*(1-m))+1; hg.setDrawRange(0,nH<4?0:nH);
    halos.forEach(function(h){h.material.opacity=0;});
    if(puntosPl){var hh=2*PD*Math.tan(cam.fov*Math.PI/360); puntosPl.scale.set(hh*cam.aspect,hh,1); puntosPl.visible=!!window.__puntosOn;} renderer.render(scene,cam);
    if(!root.classList.contains('red-lista'))root.classList.add('red-lista');
    requestAnimationFrame(cuadro);
  }
  requestAnimationFrame(cuadro);
  })();

  // Revelado y contadores, se re-arman en cada página
  var io=('IntersectionObserver' in window && !reduce)?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{rootMargin:'0px 0px -4% 0px',threshold:0.01}):null;
  function contar(s){
    var fin=+s.getAttribute('data-cuenta'), ini=+(s.getAttribute('data-desde')||0), pre=s.getAttribute('data-pre')||'', post=s.getAttribute('data-post')||'';
    if(reduce){s.textContent=pre+fin+post;return;}
    var t0=performance.now();
    (function paso(t){var p=Math.min(1,(t-t0)/1400);var e=1-Math.pow(1-p,3);s.textContent=pre+Math.round(ini+(fin-ini)*e)+post;if(p<1)requestAnimationFrame(paso);})(t0);
  }
  var ioc=('IntersectionObserver' in window)?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){contar(e.target);ioc.unobserve(e.target);}});},{threshold:0.5}):null;
  function activar(el){
    el.querySelectorAll('.rv').forEach(function(x){ if(io)io.observe(x); else x.classList.add('in'); });
    el.querySelectorAll('[data-cuenta]').forEach(function(s){ if(ioc)ioc.observe(s); });
    el.querySelectorAll('video').forEach(function(v){v.muted=true; var p=v.play&&v.play(); if(p&&p.catch)p.catch(function(){});});
  }
  window.__activar=activar; activar(document.getElementById('app'));
  var hdr=document.querySelector('.hdr'); if(hdr)root.style.setProperty('--hdr-h',hdr.getBoundingClientRect().height+'px');

  // Menú celular
  var b=document.getElementById('burger'), m=document.getElementById('menucel');
  b.addEventListener('click',function(){var o=m.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false');});
  m.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){m.classList.remove('open');b.setAttribute('aria-expanded','false');});});
})();
