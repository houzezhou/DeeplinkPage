~function (x) {
  function w() {
    var a = r.getBoundingClientRect().width;
    a / v > 540 && (a = 540 * v), x.rem = a / 41.4, r.style.fontSize = x.rem + "px"
  }

  var v, u, t, s = x.document,
    r = s.documentElement,
    q = s.querySelector('meta[name="viewport"]'),
    p = s.querySelector('meta[name="flexible"]');
  var o = q.getAttribute("content").match(/initial\-scale=(["‘]?)([\d\.]+)\1?/);
  o && (u = parseFloat(o[2]), v = parseInt(1 / u));
  x.dpr = v, x.addEventListener("resize", function () {
    clearTimeout(t), t = setTimeout(w, 300)
  }, !1), x.addEventListener("pageshow", function (b) {
    b.persisted && (clearTimeout(t), t = setTimeout(w, 300))
  }, !1), "complete" === s.readyState ? s.body.style.fontSize = 12 * v + "px" : s.addEventListener("DOMContentLoaded", function () {
    s.body.style.fontSize = 12 * v + "px"
  }, !1), w()
}(window);
