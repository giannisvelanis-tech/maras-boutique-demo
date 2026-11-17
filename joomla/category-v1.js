/* ===== MARA'S NEO — βήμα 3: σελίδα κατηγορίας όπως στο demo (17/11/2026) =====
   Μπαίνει στο Helix → Custom Code → Custom Javascript.
   Δουλεύει μόνο όπου υπάρχει φίλτρο EasyStore μέσα στο κυρίως περιεχόμενο. */
(function () {
  var CATS = [
    ['Special Occasion', '/shop/special-occasion'],
    ['Τοπ – Πουκάμισα', '/shop/top-blouse'],
    ['Παντελόνια', '/shop/pants'],
    ['Πανωφόρια', '/shop/jacket-coat'],
    ['Σετ', '/shop/set'],
    ['Σακάκια', '/shop/blazer'],
    ['Πλεκτά', '/shop/knits'],
    ['Φορέματα', '/shop/dress'],
    ['Πουκάμισα', '/shop/shirt'],
    ['Φούστες', '/shop/skirt'],
    ['Τσάντες', '/accessories/bag'],
    ['Παπούτσια', '/accessories/shoes'],
    ['Κοσμήματα και ζώνες', '/accessories/jewelry']
  ];
  var ORDER = ['XS', 'S', 'S/M', 'M', 'M/L', 'L', 'XL', '2XL', 'XXL', 'XXXL', 'O/S', '36', '37', '38', '39', '40', '41'];
  var SORT = { best_selling: 'Προτεινόμενα', 'created-desc': 'Νεότερα', 'price-asc': 'Τιμή: χαμηλή → υψηλή', 'price-desc': 'Τιμή: υψηλή → χαμηλή' };

  function txt(el) { return (el && el.textContent || '').replace(/\s+/g, ' ').trim(); }
  function root() { return document.querySelector('#sp-component .addon-root-easystore-list-filter') ? document.querySelector('#sp-component') : null; }

  function head(c) {
    if (c.querySelector('.neo-cat-head')) return;
    var path = location.pathname.replace(/\/+$/, '');
    var name = 'Όλα τα προϊόντα';
    CATS.forEach(function (x) { if (x[1] === path) name = x[0]; });
    if (path === '/special-offer') name = 'Black Week';
    var d = document.createElement('div');
    d.className = 'neo-cat-head';
    d.innerHTML = '<h1></h1><p>Ό,τι έχει εξαντληθεί φαίνεται πάνω στη φωτογραφία.</p>';
    d.querySelector('h1').textContent = name;
    var pb = c.querySelector('.sp-page-builder') || c;
    pb.insertBefore(d, pb.firstChild);
    document.querySelectorAll('.neo-cat-title').forEach(function (h) { h.style.display = 'none'; });
  }

  function cats(c) {
    var f = c.querySelector('.neo-filters .easystore-filter-container') || c.querySelector('.neo-filters');
    if (!f || f.querySelector('.neo-cats')) return;
    var path = location.pathname.replace(/\/+$/, '');
    var box = document.createElement('div');
    box.className = 'neo-cats';
    box.innerHTML = '<h4>Κατηγορία</h4>';
    CATS.forEach(function (x) {
      var a = document.createElement('a');
      a.href = x[1];
      a.textContent = x[0];
      if (x[1] === path) a.className = 'on';
      box.appendChild(a);
    });
    f.insertBefore(box, f.firstChild);
  }

  function sizes(c) {
    var groups = [].slice.call(c.querySelectorAll('[data-easystore-filter-by="filter_variants"]'));
    if (!groups.length || groups[0].dataset.neo) return;
    var first = groups[0], list = first.querySelector('.easystore-filter-list');
    var seen = {}, items = [];
    groups.forEach(function (g) {
      [].slice.call(g.querySelectorAll('.easystore-filter-list-item')).forEach(function (li) {
        var inp = li.querySelector('input'), v = inp ? inp.value : '';
        var n = parseInt(txt(li.querySelector('.easystore-filter-item-count')).replace(/\D/g, ''), 10) || 0;
        if (!v || seen[v] || (n === 0 && !inp.checked)) { li.remove(); return; }
        seen[v] = 1; items.push([v, li]);
      });
    });
    items.sort(function (a, b) {
      var i = ORDER.indexOf(a[0]), j = ORDER.indexOf(b[0]);
      return (i < 0 ? 99 : i) - (j < 0 ? 99 : j);
    });
    items.forEach(function (x) { list.appendChild(x[1]); });
    groups.slice(1).forEach(function (g) { g.remove(); });
    var t = first.querySelector('.easystore-filter-title');
    if (t) t.textContent = 'Μέγεθος';
    first.dataset.neo = '1';
    first.classList.add('neo-sizes');
  }

  function avail(c) {
    var g = c.querySelector('[data-easystore-filter-by="filter_inventory_status"]');
    if (!g || g.dataset.neo) return;
    [].slice.call(g.querySelectorAll('.easystore-filter-list-item')).forEach(function (li) {
      var inp = li.querySelector('input');
      if (!inp) return;
      if (inp.value === 'out-of-stock' && !inp.checked) li.remove();
      else if (inp.value !== 'out-of-stock') { var n = li.querySelector('.easystore-filter-item-name'); if (n) n.textContent = 'Μόνο διαθέσιμα'; }
    });
    g.dataset.neo = '1';
  }

  function sort(c) {
    var s = c.querySelector('select[name="filter_sortby"]');
    if (!s || s.dataset.neo) return;
    [].slice.call(s.options).forEach(function (o) {
      if (SORT[o.value]) o.text = SORT[o.value];
      else if (!o.selected) o.remove();
    });
    s.dataset.neo = '1';
  }

  function badges(c) {
    [].slice.call(c.querySelectorAll('.sppb-collection-item')).forEach(function (it) {
      var b = it.querySelector('.easystore-badge.is-sale');
      if (!b || b.dataset.neo) return;
      var now = parseFloat(txt(it.querySelector('.easystore-price-current .easystore-price-whole')) + txt(it.querySelector('.easystore-price-current .easystore-price-decimal')));
      var was = parseFloat(txt(it.querySelector('.easystore-price-original .easystore-price-whole')) + txt(it.querySelector('.easystore-price-original .easystore-price-decimal')));
      if (now > 0 && was > now) b.textContent = '-' + Math.round((1 - now / was) * 100) + '%';
      b.dataset.neo = '1';
    });
  }

  function run() {
    var c = root();
    if (!c) return;
    document.body.classList.add('neo-cat');
    var fw = c.querySelector('[id^="column-id-afbd2d5a"] .addon-root-easystore-list-filter');
    if (fw) fw.classList.add('neo-filters');
    head(c); cats(c); sizes(c); avail(c); sort(c); badges(c);
  }

  var busy = false;
  function later() { if (busy) return; busy = true; setTimeout(function () { busy = false; run(); }, 60); }
  document.addEventListener('DOMContentLoaded', function () {
    run();
    var c = document.querySelector('#sp-component');
    if (c && window.MutationObserver) new MutationObserver(later).observe(c, { childList: true, subtree: true });
  });
})();
