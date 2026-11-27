/* Extra Übung: Scheitelpunktform bestimmen, mit sofortigem Feedback und lokalem Fortschritt. */
(function(){
'use strict';
const L=window.Lernseite;
L.registerTab({id:'scheitelpunkt',title:'Scheitelpunkt',order:2,mount(panel,{store,h,math:M,util}) {
 const css=`
 .sp-wrap{display:grid;gap:1rem}.sp-card{padding:1rem;border:1px solid var(--line);border-radius:12px;background:var(--surface-2)}
 .sp-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.75rem}
 .sp-grid label{display:grid;gap:.35rem;font-weight:600}.sp-grid input{min-width:0;padding:.65rem;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--ink);font:inherit}
 .sp-feedback{padding:.8rem;border-radius:10px}.sp-good{background:var(--ok-bg);color:var(--ok)}.sp-bad{background:var(--bad-bg);color:var(--bad)}
 .sp-graph{width:100%;height:240px;display:block;border:1px solid var(--line);border-radius:10px;background:var(--surface)}`;
 if(!document.getElementById('sp-css')){const style=h('style',{id:'sp-css'},css);document.head.append(style)}
 let a,b,c,vertex,attempted=false;
 const score=store.get('score',0), solved=store.get('solved',0);
 const status=h('p',{class:'muted'} ,'');
 const scoreEl=h('strong',null,'Richtig gelöst: '+solved+' · Punkte: '+score);
 const question=h('div',{class:'sp-card'});
 const inputs={x:h('input',{type:'text',inputmode:'text',placeholder:'z. B. −2',autocomplete:'off'}),y:h('input',{type:'text',inputmode:'text',placeholder:'z. B. 5',autocomplete:'off'})};
 const form=h('div',{class:'sp-grid'});
 form.append(h('label',null,'xₛ (Scheitel-x)',inputs.x),h('label',null,'yₛ (Scheitel-y)',inputs.y));
 const feedback=h('div',{class:'sp-feedback',hidden:true});
 const graph=h('div');
 function generate(){
  a=util.pick([-3,-2,-1,1,2,3]); b=util.rand(-8,8); c=util.rand(-8,8);
  vertex={x:-b/(2*a),y:c-b*b/(4*a)};
  question.innerHTML='<h3>Bestimme den Scheitelpunkt</h3><div class="expr" style="font-size:1.7rem">f(x) = '+a+'x² '+(b>=0?'+ ':'− ')+Math.abs(b)+'x '+(c>=0?'+ ':'− ')+Math.abs(c)+'</div><p>Berechne xₛ und anschließend yₛ. Gib beide Werte ein.</p>';
  inputs.x.value='';inputs.y.value='';feedback.hidden=true;attempted=false;graph.innerHTML='';draw();
 }
 function draw(){
  const w=500,ht=280,ox=w/2,oy=ht/2;
  // Maßstab automatisch so wählen, dass der Scheitel samt etwas Rand sichtbar bleibt.
  const scale=Math.max(12,Math.min(32,Math.min(210/(Math.abs(vertex.x)+1),115/(Math.abs(vertex.y)+1))));
  const step=1, xmax=Math.floor(ox/scale),ymax=Math.floor(oy/scale);
  let path='';
  for(let i=0;i<=w;i++){let x=(i-ox)/scale,y=a*x*x+b*x+c,py=oy-y*scale;path+=(i?'L':'M')+i+','+py;}
  const vx=ox+vertex.x*scale,vy=oy-vertex.y*scale;
  let grid='';
  for(let n=-xmax;n<=xmax;n++){
   const px=ox+n*scale;
   grid+='<line x1="'+px+'" y1="0" x2="'+px+'" y2="'+ht+'" stroke="var(--line)" stroke-width="'+(n%5===0?1.5:1)+'"/>';
   if(n!==0)grid+='<text x="'+px+'" y="'+(oy+16)+'" fill="var(--muted)" font-size="12" text-anchor="middle">'+n+'</text>';
  }
  for(let n=-ymax;n<=ymax;n++){
   const py=oy-n*scale;
   grid+='<line x1="0" y1="'+py+'" x2="'+w+'" y2="'+py+'" stroke="var(--line)" stroke-width="'+(n%5===0?1.5:1)+'"/>';
   if(n!==0)grid+='<text x="'+(ox-8)+'" y="'+(py+4)+'" fill="var(--muted)" font-size="12" text-anchor="end">'+n+'</text>';
  }
  graph.innerHTML='<svg class="sp-graph" style="height:280px" viewBox="0 0 500 280" role="img" aria-label="Parabel im beschrifteten Koordinatenraster"><g>'+grid+'</g><line x1="'+ox+'" y1="0" x2="'+ox+'" y2="'+ht+'" stroke="var(--ink)" stroke-width="2"/><line x1="0" y1="'+oy+'" x2="'+w+'" y2="'+oy+'" stroke="var(--ink)" stroke-width="2"/><path d="'+path+'" fill="none" stroke="var(--accent)" stroke-width="3"/><circle cx="'+vx+'" cy="'+vy+'" r="6" fill="var(--ok)" stroke="var(--surface)" stroke-width="2"/><text x="'+(vx+9)+'" y="'+(vy-10)+'" fill="var(--ok)" font-weight="bold" font-size="14">S</text><text x="486" y="'+(oy-8)+'" fill="var(--ink)" font-size="13">x</text><text x="'+(ox+8)+'" y="14" fill="var(--ink)" font-size="13">y</text></svg>';
 }
 const check=h('button',{class:'btn primary',type:'button'},'Prüfen');
 check.addEventListener('click',()=>{
  const qx=M.parse(inputs.x.value),qy=M.parse(inputs.y.value);
  if(!qx||!qy){feedback.className='sp-feedback sp-bad';feedback.textContent='Bitte gib zwei gültige Zahlen oder Brüche ein.';feedback.hidden=false;return;}
  const targetX=M.Q(Math.round(vertex.x*100000),100000),targetY=M.Q(Math.round(vertex.y*100000),100000);
  const ok=Math.abs(M.toNumber(qx)-vertex.x)<1e-5&&Math.abs(M.toNumber(qy)-vertex.y)<1e-5;
  feedback.hidden=false;feedback.className='sp-feedback '+(ok?'sp-good':'sp-bad');
  feedback.textContent=ok?'Richtig! S('+vertex.x.toFixed(2).replace('.',',')+' | '+vertex.y.toFixed(2).replace('.',',')+')':'Noch nicht. Tipp: xₛ = −b/(2a), dann yₛ = f(xₛ).';
  if(ok&&!attempted){attempted=true;store.set('score',store.get('score',0)+10);store.set('solved',store.get('solved',0)+1);scoreEl.textContent='Richtig gelöst: '+store.get('solved',0)+' · Punkte: '+store.get('score',0);}
 });
 const next=h('button',{class:'btn',type:'button'},'Neue Aufgabe');
 next.addEventListener('click',generate);
 panel.append(h('div',{class:'sp-wrap'},h('p',null,'Finde den Scheitel S(xₛ | yₛ) einer Funktion in Normalform.'),scoreEl,question,form,check,next,feedback,graph));
 generate();draw();
}});})();