(function () {
  function read(k) { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } }
  window.postTestStatus = function () {
    var pre = read('scratchOverallPre');
    var ex = read('scratchPreScores') || {};
    var preDone = !!(pre && typeof pre.score === 'number');
    var missing = [];
    for (var i = 1; i <= 6; i++) {
      if (!(ex[i] && typeof ex[i].score === 'number')) missing.push(i);
    }
    return { preDone: preDone, exDone: 6 - missing.length, missing: missing, unlocked: preDone && missing.length === 0 };
  };
  window.postTestNeeds = function (s) {
    var out = [];
    if (!s.preDone) out.push('ทำแบบทดสอบก่อนเรียน');
    if (s.missing.length) out.push('ทำแบบฝึกหัดให้ครบ 6 เรื่อง (เหลือเรื่องที่ ' + s.missing.join(', ') + ')');
    return out;
  };
})();
