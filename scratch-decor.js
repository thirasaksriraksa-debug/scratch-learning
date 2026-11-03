/* ตกแต่งบทเรียน: ใส่ภาพประกอบ SVG ตามเนื้อหาแต่ละเรื่อง (วาดเอง ไม่ใช้ภาพลิขสิทธิ์) */
(function(){
  var T=function(x,y,s,c,w,a){return '<text x="'+x+'" y="'+y+'" font-size="'+s+'" fill="'+(c||'#3B4566')+'" font-weight="'+(w||500)+'" text-anchor="'+(a||'start')+'">'
  };
  function blk(x,y,w,c,t,tc){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="30" rx="7" fill="'+c+'"/>'+T(x+12,y+20,14,tc||'#fff')+t+'</text>'}
  function hat(x,y,w,c,t,tc){return '<path d="M'+x+' '+(y+34)+' Q'+(x+16)+' '+(y+2)+' '+(x+56)+' '+(y+2)+' Q'+(x+92)+' '+(y+2)+' '+(x+104)+' '+(y+22)+' L'+(x+w)+' '+(y+22)+' L'+(x+w)+' '+(y+44)+' L'+x+' '+(y+44)+' Z" fill="'+c+'"/>'+T(x+12,y+38,14,tc||'#fff')+t+'</text>'}
  function cblock(x,y,w,c,t,inner){var h=inner.length*30+4,k='#4A3000';
    return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="32" rx="7" fill="'+c+'"/><rect x="'+x+'" y="'+(y+20)+'" width="16" height="'+(h+14)+'" fill="'+c+'"/><rect x="'+x+'" y="'+(y+32+h)+'" width="'+w+'" height="22" rx="7" fill="'+c+'"/>'+
      T(x+12,y+21,14,k)+t+'</text>'+inner.map(function(b,i){return blk(x+16,y+34+i*30,w-30,b[0],b[1],b[2])}).join('')}
  var FIG={
    1:{cap:'ลากบล็อกมาต่อกัน แล้วตัวละครจะทำงานตามคำสั่ง',svg:'<svg viewBox="0 0 640 230" role="img" aria-label="บล็อกคำสั่งทำให้ตัวละครเคลื่อนที่และพูด">'+hat(20,30,240,'#FFBF00','when green flag clicked','#4A3A00')+blk(20,76,240,'#4C97FF','move (10) steps')+blk(20,106,240,'#9966FF','say [Hello!] for 2 seconds')+'<path d="M285 100h50m0 0l-10-9m10 9l-10 9" stroke="#3B4566" stroke-width="4" fill="none" stroke-linecap="round"/>'+T(310,138,13,'#6B7592',500,'middle')+'คลิกธงเขียว</text><rect x="360" y="16" width="262" height="198" rx="10" fill="#fff" stroke="#9AA7C4" stroke-width="2"/><ellipse cx="470" cy="150" rx="30" ry="34" fill="#FFAB19"/><circle cx="459" cy="142" r="7" fill="#fff"/><circle cx="482" cy="142" r="7" fill="#fff"/><circle cx="461" cy="144" r="3" fill="#3B4566"/><circle cx="484" cy="144" r="3" fill="#3B4566"/><rect x="490" y="60" width="100" height="44" rx="16" fill="#fff" stroke="#3B4566" stroke-width="2"/>'+T(540,88,16,'#3B4566',500,'middle')+'Hello!</text></svg>'},
    3:{cap:'บล็อกควบคุม (สีส้ม) มีช่องรูปตัว C ไว้ครอบคำสั่งที่ต้องการให้ทำซ้ำ',svg:'<svg viewBox="0 0 640 200" role="img" aria-label="บล็อก forever และ repeat">'+cblock(20,20,260,'#FFAB19','forever',[['#4C97FF','move (10) steps'],['#FFAB19','wait (1) secs','#4A3000']])+cblock(340,20,260,'#FFAB19','repeat (10)',[['#4C97FF','move (10) steps'],['#FFAB19','wait (1) secs','#4A3000']])+T(150,176,14,'#6B7592',500,'middle')+'ทำซ้ำไม่รู้จบ</text>'+T(470,176,14,'#6B7592',500,'middle')+'ทำซ้ำ 10 ครั้ง</text></svg>'},
    6:{cap:'บล็อก stop ใช้จบเกม และมี 3 ตัวเลือกให้เลือกตามต้องการ',svg:'<svg viewBox="0 0 640 210" role="img" aria-label="เมื่อ HP เป็น 0 ให้แสดง Game Over แล้วหยุดโปรแกรม">'+cblock(20,20,310,'#FFAB19','if <HP = 0> then',[['#9966FF','say [Game Over] for 2 seconds'],['#FFAB19','stop [all]','#4A3000']])+blk(360,26,260,'#FFAB19','stop [all]','#4A3000')+blk(360,66,260,'#FFAB19','stop [this script]','#4A3000')+blk(360,106,260,'#FFAB19','stop [other scripts in sprite]','#4A3000')+T(490,170,13,'#6B7592',500,'middle')+'3 ตัวเลือกของบล็อก stop</text></svg>'},
    2:{cap:'ส่วนประกอบของหน้าต่างโปรแกรม Scratch',svg:
      '<svg viewBox="0 0 640 360" role="img" aria-label="ภาพหน้าต่าง Scratch แสดงแถบเมนู คลังบล็อก พื้นที่เขียนโค้ด เวที และรายการตัวละคร">'+
      '<rect width="640" height="360" rx="14" fill="#fff" stroke="#C9D7F0" stroke-width="2"/>'+
      '<path d="M0 36V14Q0 0 14 0H626Q640 0 640 14V36Z" fill="#855CD6"/>'+T(16,24,15,'#fff',500)+'แถบเมนู (Menu Bar)</text>'+
      '<rect x="0" y="36" width="150" height="324" fill="#F3F6FF"/>'+
      ['#4C97FF','#9966FF','#CF63CF','#FFBF00','#FFAB19','#5CB1D6','#59C059','#FF8C1A'].map(function(c,i){return '<circle cx="24" cy="'+(62+i*22)+'" r="7" fill="'+c+'"/>'}).join('')+
      T(44,76,13,'#3B4566',500)+'คลังบล็อกคำสั่ง</text>'+T(44,94,12,'#6B7592')+'(Block Palette)</text>'+
      '<rect x="150" y="36" width="270" height="324" fill="#fff" stroke="#E1E9F7"/>'+
      T(285,66,14,'#3B4566',500,'middle')+'พื้นที่เขียนโค้ด (Code Area)</text>'+
      hat(180,96,168,'#FFBF00','when green flag clicked','#4A3A00')+blk(180,142,168,'#4C97FF','move (10) steps')+blk(180,172,168,'#4C97FF','turn right (15) degrees')+
      '<rect x="430" y="44" width="200" height="26" rx="6" fill="#F3F6FF"/><path d="M446 50l16 7-16 7z" fill="#59C059"/><circle cx="486" cy="57" r="7" fill="#EC5959"/>'+T(560,62,12,'#6B7592',500,'middle')+'ธง / หยุด</text>'+
      '<rect x="430" y="76" width="200" height="118" fill="#fff" stroke="#9AA7C4" stroke-width="2"/>'+T(530,126,15,'#3B4566',500,'middle')+'เวที (Stage)</text>'+
      '<circle cx="530" cy="160" r="14" fill="#FFAB19"/><circle cx="525" cy="157" r="2.5" fill="#fff"/><circle cx="536" cy="157" r="2.5" fill="#fff"/>'+
      '<rect x="430" y="200" width="200" height="160" fill="#F3F6FF"/>'+T(530,226,14,'#3B4566',500,'middle')+'รายการตัวละคร (Sprite List)</text>'+
      '<rect x="448" y="244" width="52" height="52" rx="8" fill="#fff" stroke="#4C97FF" stroke-width="3"/><rect x="510" y="244" width="52" height="52" rx="8" fill="#fff" stroke="#C9D7F0" stroke-width="2"/>'+
      '<circle cx="474" cy="270" r="12" fill="#FFAB19"/><circle cx="536" cy="270" r="12" fill="#CF63CF"/>'+
      '<rect x="14" y="316" width="30" height="30" rx="8" fill="#855CD6"/>'+T(54,336,12,'#6B7592')+'ส่วนขยาย</text>'+
      '</svg>'},
    4:{cap:'ตัวละคร (Sprite) เคลื่อนที่ได้ ส่วนฉาก (Stage) เป็นพื้นหลังของโปรเจกต์',svg:
      '<svg viewBox="0 0 640 300" role="img" aria-label="ภาพตัวละครยืนอยู่บนฉาก">'+
      '<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9ED0FF"/><stop offset="1" stop-color="#E6F3FF"/></linearGradient></defs>'+
      '<rect x="20" y="16" width="380" height="268" rx="12" fill="url(#sky)" stroke="#9AA7C4" stroke-width="2"/>'+
      '<path d="M22 230Q120 160 220 220T398 200V282Q398 284 396 284H24Q22 284 22 282Z" fill="#7BD07B"/><circle cx="340" cy="70" r="26" fill="#FFD84D"/>'+
      '<g><ellipse cx="170" cy="190" rx="36" ry="40" fill="#FFAB19"/><circle cx="156" cy="180" r="9" fill="#fff"/><circle cx="184" cy="180" r="9" fill="#fff"/><circle cx="158" cy="182" r="4" fill="#3B4566"/><circle cx="186" cy="182" r="4" fill="#3B4566"/><path d="M158 204Q170 214 184 204" stroke="#3B4566" stroke-width="3" fill="none" stroke-linecap="round"/></g>'+
      '<path d="M215 190h46m0 0l-9-8m9 8l-9 8" stroke="#4C97FF" stroke-width="4" fill="none" stroke-linecap="round"/>'+
      T(210,40,15,'#3B4566',500,'middle')+'เวที (Stage)</text>'+
      '<rect x="425" y="30" width="195" height="108" rx="14" fill="#FFF3DD" stroke="#FFAB19" stroke-width="2"/>'+T(522,58,15,'#7A4B00',600,'middle')+'ตัวละคร (Sprite)</text>'+T(522,86,13,'#7A4B00',400,'middle')+'• เคลื่อนที่ได้</text>'+T(522,108,13,'#7A4B00',400,'middle')+'• หลายชุดแต่งกาย (Costumes)</text>'+
      '<rect x="425" y="156" width="195" height="108" rx="14" fill="#EAF3FF" stroke="#4C97FF" stroke-width="2"/>'+T(522,184,15,'#1F4E99',600,'middle')+'ฉาก (Stage)</text>'+T(522,212,13,'#1F4E99',400,'middle')+'• เคลื่อนที่ไม่ได้</text>'+T(522,234,13,'#1F4E99',400,'middle')+'• หลายฉากหลัง (Backdrops)</text>'+
      '</svg>'},
    5:{cap:'บล็อกหมวก (Events) ใช้วางบนสุดของชุดคำสั่งเสมอ',svg:
      '<svg viewBox="0 0 640 250" role="img" aria-label="ตัวอย่างบล็อกคำสั่งเริ่มต้นการทำงาน">'+
      hat(20,20,230,'#FFBF00','when green flag clicked','#4A3A00')+blk(20,66,230,'#4C97FF','move (10) steps')+
      hat(20,130,230,'#FFBF00','when this sprite clicked','#4A3A00')+blk(20,176,230,'#9966FF','next costume')+
      hat(330,20,250,'#FFBF00','when [space] key pressed','#4A3A00')+blk(330,66,250,'#4C97FF','turn right (15) degrees')+
      '<path d="M330 130Q346 98 386 98 Q422 98 434 118 L580 118 L580 140 L330 140Z" fill="#FFBF00" transform="translate(0,16)"/>'+T(342,170,14,'#4A3A00')+'when I receive [message1]</text>'+
      blk(330,176,250,'#9966FF','say [Hello!] for 2 seconds')+
      '</svg>'}
  };
  function ready(f){document.readyState!=='loading'?f():document.addEventListener('DOMContentLoaded',f)}
  ready(function(){
    document.querySelectorAll('[id^="u"][id$="lesson"]').forEach(function(card){
      var n=(card.id.match(/\d/)||[])[0];
      var h=card.querySelector('h2'); if(h)h.classList.add('lesson-title');
      var f=FIG[n]; if(!f||!h)return;
      var fig=document.createElement('figure');fig.className='lesson-fig';fig.style.margin='0 0 8px';
      fig.innerHTML=f.svg+'<figcaption>'+f.cap+'</figcaption>';
      h.insertAdjacentElement('afterend',fig);
    });
  });
})();
