/* ธีม WBI Scratch: ปรับหน้าตาโดยไม่ต้องแก้ HTML ข้อสอบเดิม */
(function(){
  var COLORS={1:['#4C97FF','#fff'],2:['#9966FF','#fff'],3:['#FFAB19','#4A3000'],4:['#CF63CF','#fff'],5:['#FFBF00','#4A3A00'],6:['#EC5959','#fff']};
  function ready(f){document.readyState!=='loading'?f():document.addEventListener('DOMContentLoaded',f)}
  ready(function(){
    // 1) สีประจำเรื่อง (ตามสีหมวดบล็อก Scratch)
    document.querySelectorAll('[id^="unit"][id$="-content"],[id^="u"][id*="lesson"],[id^="u"][id$="test"]').forEach(function(el){
      var m=el.id.match(/\d/); var c=m&&COLORS[m[0]];
      if(c){el.style.setProperty('--unit',c[0]);el.style.setProperty('--unit-ink',c[1])}
    });
    // 2) ห่อตัวเลือกเป็นแถบกดได้ (ชื่อ name/value เดิมไม่เปลี่ยน)
    document.querySelectorAll('input[type=radio]').forEach(function(r){
      var L=r.parentNode;
      if(L.tagName==='LABEL'){ // แบบประเมิน: label ห่อไว้แล้ว
        if(L.classList.contains('opt'))return;
        L.classList.add('opt');
        var sp=document.createElement('span');sp.className='opt-text';
        while(r.nextSibling)sp.appendChild(r.nextSibling);
        L.appendChild(sp);
        if(L.nextSibling&&L.nextSibling.tagName==='BR')L.nextSibling.remove();
        return;
      }
      var label=document.createElement('label');label.className='opt';
      var span=document.createElement('span');span.className='opt-text';
      r.parentNode.insertBefore(label,r);label.appendChild(r);
      var n=label.nextSibling;
      while(n&&!(n.nodeType===1&&(n.tagName==='BR'||n.tagName==='INPUT'))){var nx=n.nextSibling;span.appendChild(n);n=nx}
      label.appendChild(span);
      if(n&&n.tagName==='BR')n.remove();
    });
    // 3) เลขข้อเป็นวงกลม
    document.querySelectorAll('.card p').forEach(function(p){
      var t=p.firstChild;if(!t||t.nodeType!==3)return;
      var m=t.nodeValue.match(/^\s*(\d+)\.\s*/);if(!m)return;
      t.nodeValue=t.nodeValue.slice(m[0].length);
      var s=document.createElement('span');s.className='qn';s.textContent=m[1];
      p.classList.add('q');p.insertBefore(s,p.firstChild);
    });
    // 4) แถบความคืบหน้า "ตอบแล้ว x/10"
    document.querySelectorAll('.card').forEach(function(card){
      var first=card.querySelector('p.q');if(!first)return;
      var names={};card.querySelectorAll('input[type=radio]').forEach(function(r){names[r.name]=1});
      var total=Object.keys(names).length;
      var prog=document.createElement('div');prog.className='prog';
      prog.innerHTML='<span>ตอบแล้ว 0/'+total+'</span><div class="bar"><i></i></div>';
      first.parentNode.insertBefore(prog,first);
      card.addEventListener('change',function(){
        var done=Object.keys(names).filter(function(k){return card.querySelector('input[name="'+k+'"]:checked')}).length;
        prog.firstChild.textContent='ตอบแล้ว '+done+'/'+total;
        prog.querySelector('i').style.width=(done/total*100)+'%';
      });
    });
  });
})();
