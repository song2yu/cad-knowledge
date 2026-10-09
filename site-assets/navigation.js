(()=>{
  'use strict';
  const nav=document.querySelector('.kb-navigation');
  if(!nav)return;
  const notes=window.CAD_KB_NOTES||[];
  const current=nav.dataset.kbCurrent;
  // Derive the site root from a relative homepage link, supporting Pages subpaths and file://.
  const home=new URL(nav.dataset.kbHome,document.baseURI);
  const target=note=>new URL('notes/'+note.rel.split('/').map(encodeURIComponent).join('/'),home).href;
  const at=notes.findIndex(note=>'notes/'+note.rel===current);
  nav.querySelector('.kb-current').textContent=at>=0?notes[at].title:'';
  for(const [selector,index,label] of [['.kb-prev',at-1,'← 上一篇'],['.kb-next',at+1,'下一篇 →']]){
    const link=nav.querySelector(selector);
    if(at>=0 && index>=0 && index<notes.length){link.href=target(notes[index]);link.textContent=label;link.title=notes[index].title;link.hidden=false;}
  }
  const select=nav.querySelector('.kb-jump');
  const groups=new Map();
  for(const note of notes){
    if(!groups.has(note.category)){const group=document.createElement('optgroup');group.label=note.category;groups.set(note.category,group);select.appendChild(group);}
    const option=document.createElement('option');option.value=target(note);option.textContent=note.title;option.selected='notes/'+note.rel===current;groups.get(note.category).appendChild(option);
  }
  select.addEventListener('change',()=>{if(select.value)window.location.assign(select.value);});
})();
