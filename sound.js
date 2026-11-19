/* เสียงประกอบ: เพลงเบา ๆ + เสียงเลือกคำตอบ (สร้างด้วย Web Audio ไม่ต้องมีไฟล์เสียง) */
(function () {
  var MUSIC_KEY = 'scratchMusic', SFX_KEY = 'scratchSfx';
  function get(k) { try { return localStorage.getItem(k) !== 'off'; } catch (e) { return true; } }
  function set(k, v) { try { localStorage.setItem(k, v ? 'on' : 'off'); } catch (e) {} }
  var musicOn = get(MUSIC_KEY), sfxOn = get(SFX_KEY);
  var ctx, musicGain, sfxGain, timer, nextTime = 0, beat = 0, playing = false;

  // ====== ค่าปรับแต่ง ======
  var MUSIC_VOLUME = 0.12;   // ความดังเพลง (0-1)
  var SFX_VOLUME = 0.5;      // ความดังเสียงเลือกคำตอบ (0-1)
  var BPM = 70;
  // คอร์ด C - Am - F - G (ความถี่ Hz) และโน้ตเพนทาโทนิกสำหรับทำนอง
  var CHORDS = [[261.63, 329.63, 392.0], [220.0, 261.63, 329.63], [174.61, 261.63, 349.23], [196.0, 246.94, 392.0]];
  var SCALE = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5];

  function init() {
    if (ctx) return;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    musicGain = ctx.createGain(); musicGain.gain.value = MUSIC_VOLUME; musicGain.connect(ctx.destination);
    sfxGain = ctx.createGain(); sfxGain.gain.value = SFX_VOLUME; sfxGain.connect(ctx.destination);
  }

  function tone(freq, t, dur, type, vol, dest, attack) {
    var o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.value = freq;
    attack = attack || 0.02;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(dest);
    o.start(t); o.stop(t + dur + 0.05);
  }

  // ====== เพลงพื้นหลัง (สร้างทำนองเอง ไม่ซ้ำกันทุกรอบ) ======
  function schedule() {
    var spb = 60 / BPM;
    while (nextTime < ctx.currentTime + 1.2) {
      var bar = Math.floor(beat / 4) % CHORDS.length, inBar = beat % 4;
      if (inBar === 0) {
        CHORDS[bar].forEach(function (f) { tone(f, nextTime, spb * 4.2, 'sine', 0.35, musicGain, 0.6); });
        tone(CHORDS[bar][0] / 2, nextTime, spb * 3.5, 'sine', 0.3, musicGain, 0.3);
      }
      if (Math.random() < 0.65) {
        var f = SCALE[Math.floor(Math.random() * SCALE.length)];
        tone(f, nextTime + (Math.random() < 0.3 ? spb / 2 : 0), 1.6, 'triangle', 0.18, musicGain, 0.04);
      }
      nextTime += spb; beat++;
    }
  }
  function startMusic() {
    if (!ctx || playing || !musicOn) return;
    playing = true; nextTime = ctx.currentTime + 0.1;
    musicGain.gain.cancelScheduledValues(ctx.currentTime);
    musicGain.gain.setValueAtTime(0.0001, ctx.currentTime);
    musicGain.gain.linearRampToValueAtTime(MUSIC_VOLUME, ctx.currentTime + 2);
    schedule(); timer = setInterval(schedule, 300);
  }
  function stopMusic() {
    if (!playing) return;
    playing = false; clearInterval(timer);
    musicGain.gain.cancelScheduledValues(ctx.currentTime);
    musicGain.gain.setValueAtTime(musicGain.gain.value, ctx.currentTime);
    musicGain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
  }

  // ====== เสียงเอฟเฟกต์ ======
  function sfx(kind) {
    if (!sfxOn) return;
    init(); if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    var t = ctx.currentTime;
    if (kind === 'correct') {          // ติ๊ง-ติ๊ง สดใส
      tone(659.25, t, 0.25, 'triangle', 0.5, sfxGain);
      tone(987.77, t + 0.11, 0.4, 'triangle', 0.5, sfxGain);
    } else if (kind === 'wrong') {     // เสียงต่ำนุ่ม ๆ
      tone(261.63, t, 0.3, 'sine', 0.5, sfxGain);
      tone(207.65, t + 0.12, 0.4, 'sine', 0.5, sfxGain);
    } else {                           // เสียงป๊อปตอนเลือก
      tone(520, t, 0.12, 'sine', 0.5, sfxGain);
    }
  }

  // เลือกตัวเลือก -> เล่นเสียง (หน่วงนิดเดียวเพื่อรอสีถูก/ผิดขึ้นก่อน)
  document.addEventListener('change', function (e) {
    var t = e.target;
    if (!t || t.type !== 'radio') return;
    setTimeout(function () {
      var l = t.closest('label');
      if (l && l.classList.contains('is-correct')) sfx('correct');
      else if (l && l.classList.contains('is-wrong')) sfx('wrong');
      else sfx('pop');
    }, 0);
  });

  // เบราว์เซอร์ให้เล่นเสียงได้หลังผู้ใช้แตะ/คลิกครั้งแรก
  function unlock() {
    init(); if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    startMusic();
  }
  ['pointerdown', 'keydown', 'touchstart'].forEach(function (ev) {
    document.addEventListener(ev, unlock, { once: true, passive: true });
  });
  // ปิดเพลงตอนสลับแท็บ
  document.addEventListener('visibilitychange', function () {
    if (!ctx) return;
    if (document.hidden) { ctx.suspend(); } else { ctx.resume(); }
  });

  // ====== ปุ่มเปิด/ปิดเสียง ======
  function addButtons() {
    var css = document.createElement('style');
    css.textContent = '.snd-ctl{position:fixed;right:14px;bottom:14px;z-index:50;display:flex;gap:8px}' +
      '.snd-ctl button{width:46px;height:46px;border-radius:50%;border:2px solid #C9D7F0;background:#fff;font-size:1.3rem;line-height:1;cursor:pointer;padding:0;box-shadow:0 3px 8px rgba(30,40,80,.18)}' +
      '.snd-ctl button.off{opacity:.55;filter:grayscale(1)}';
    document.head.appendChild(css);
    var box = document.createElement('div'); box.className = 'snd-ctl';
    var bm = document.createElement('button'), bs = document.createElement('button');
    bm.type = bs.type = 'button';
    bm.textContent = '🎵'; bs.textContent = '🔔';
    function paint() {
      bm.classList.toggle('off', !musicOn); bs.classList.toggle('off', !sfxOn);
      bm.title = bm.ariaLabel = musicOn ? 'ปิดเพลง' : 'เปิดเพลง';
      bs.title = bs.ariaLabel = sfxOn ? 'ปิดเสียงเลือกคำตอบ' : 'เปิดเสียงเลือกคำตอบ';
    }
    bm.addEventListener('click', function () {
      musicOn = !musicOn; set(MUSIC_KEY, musicOn); paint();
      init(); if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume();
      musicOn ? startMusic() : stopMusic();
    });
    bs.addEventListener('click', function () {
      sfxOn = !sfxOn; set(SFX_KEY, sfxOn); paint();
      if (sfxOn) sfx('pop');
    });
    paint(); box.appendChild(bm); box.appendChild(bs); document.body.appendChild(box);
  }
  if (document.readyState !== 'loading') addButtons();
  else document.addEventListener('DOMContentLoaded', addButtons);
})();
