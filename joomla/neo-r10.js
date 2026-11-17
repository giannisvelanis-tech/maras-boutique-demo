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

  function toolbar(c) {
    var s = c.querySelector('select[name="filter_sortby"]');
    var col = c.querySelector('[id^="column-id-3a32cb07"] .sppb-column-addons');
    if (!s || !col || c.querySelector('.neo-toolbar')) return;
    var w = s.closest('.sppb-addon-wrapper');
    var sec = w && w.closest('section.sppb-section');
    var bar = document.createElement('div');
    bar.className = 'neo-toolbar';
    var tg = document.createElement('button');
    tg.type = 'button';
    tg.className = 'neo-ftoggle';
    tg.textContent = 'Φίλτρα';
    tg.onclick = function () { document.body.classList.toggle('neo-fopen'); };
    bar.appendChild(tg);
    var ps = c.querySelector('.addon-root-easystore-common-paginationstatus');
    var tot = ps && ps.querySelector('[x-text="pagination.total"]');
    if (ps) ps.style.display = 'none';
    if (tot) {
      var n = parseInt(txt(tot).replace(/\D/g, ''), 10);
      if (!isNaN(n)) {
        var cnt = document.createElement('span');
        cnt.className = 'neo-count';
        cnt.textContent = n + (n === 1 ? ' προϊόν' : ' προϊόντα');
        bar.appendChild(cnt);
      }
    }
    bar.appendChild(w);
    col.insertBefore(bar, col.firstChild);
    if (sec && !sec.querySelector('.easystore-product-filter, .sppb-collection-item')) sec.style.display = 'none';
  }

  function num(it, sel) {
    var w = txt(it.querySelector(sel + ' .easystore-price-whole')).replace(/\D/g, '');
    var d = txt(it.querySelector(sel + ' .easystore-price-decimal')).replace(/\D/g, '');
    return parseFloat(w + '.' + (d || '0'));
  }

  function badges(c) {
    [].slice.call(c.querySelectorAll('.sppb-collection-item')).forEach(function (it) {
      var b = it.querySelector('.easystore-badge.is-sale');
      if (!b || b.dataset.neo) return;
      var now = num(it, '.easystore-price-current');
      var was = num(it, '.easystore-price-original');
      if (now > 0 && was > now) b.textContent = '-' + Math.round((1 - now / was) * 100) + '%';
      b.dataset.neo = '1';
    });
  }

  /* Sold out πάνω στη φωτογραφία: το EasyStore απενεργοποιεί το κουμπί όταν όλα τα μεγέθη έχουν εξαντληθεί */
  function pid(it) {
    var b = it.querySelector('[class*="easystore-btn-add-to-cart"]');
    if (!b) return null;
    for (var i = 0; i < b.attributes.length; i++) {
      var m = b.attributes[i].name.match(/^add-to-cart-button-(\d+)$/);
      if (m) return { id: m[1], b: b, variants: /openQuickAddModal/.test(b.getAttribute('@click') || '') };
    }
    return null;
  }

  function sold(c) {
    [].slice.call(c.querySelectorAll('.sppb-collection-item')).forEach(function (it) {
      if (it.dataset.neoSold) return;
      var p = pid(it);
      it.dataset.neoSold = '1';
      if (!p || !p.b.disabled) return;
      it.classList.add('neo-sold');
      var ph = it.querySelector('.easystore-product-image');
      if (ph && !ph.querySelector('.neo-soldout')) {
        var d = document.createElement('div');
        d.className = 'neo-soldout';
        d.innerHTML = '<b>Sold out</b>';
        ph.appendChild(d);
      }
    });
  }

  /* Μεγέθη στην κάρτα, από τις παραλλαγές του EasyStore (με τα εξαντλημένα διαγραμμένα) */
  var queue = [], active = 0;
  function cacheGet(id) { try { var v = JSON.parse(sessionStorage.getItem('neo_v_' + id) || 'null'); return v && Date.now() - v.t < 600000 ? v.d : null; } catch (e) { return null; } }
  function cacheSet(id, d) { try { sessionStorage.setItem('neo_v_' + id, JSON.stringify({ t: Date.now(), d: d })); } catch (e) {} }
  function paint(it, list) {
    if (!list || !list.length || it.querySelector('.neo-card-sizes')) return;
    list.sort(function (a, b) {
      var i = ORDER.indexOf(a[0]), j = ORDER.indexOf(b[0]);
      return (i < 0 ? 99 : i) - (j < 0 ? 99 : j);
    });
    var d = document.createElement('div');
    d.className = 'neo-card-sizes';
    list.forEach(function (x) {
      var i = document.createElement('i');
      i.textContent = x[0];
      if (!x[1]) i.className = 'out';
      d.appendChild(i);
    });
    var pr = it.querySelector('.addon-root-easystore-list-price') || it.lastElementChild;
    pr.parentNode.insertBefore(d, pr.nextSibling);
  }
  function pump() {
    while (active < 4 && queue.length) {
      (function (job) {
        active++;
        var base = (window.Joomla && Joomla.getOptions && Joomla.getOptions('easystore.base')) || '';
        fetch(base + '/index.php?option=com_easystore&task=product.quickAddModal&id=' + job.id, { credentials: 'same-origin' })
          .then(function (r) { return r.json(); })
          .then(function (j) {
            var doc = new DOMParser().parseFromString(j.data || '', 'text/html');
            var t = doc.querySelector('[x-ref^="product_variants_"]');
            var v = t ? JSON.parse(t.value || '[]') : [];
            var list = v.filter(function (x) { return x.visibility !== false; }).map(function (x) { return [String(x.combination).replace(/\\\//g, '/'), !!x.inventory_status]; });
            cacheSet(job.id, list);
            paint(job.it, list);
          })
          .catch(function () {})
          .then(function () { active--; pump(); });
      })(queue.shift());
    }
  }
  function sizesOnCards(c) {
    [].slice.call(c.querySelectorAll('.sppb-collection-item')).forEach(function (it) {
      if (it.dataset.neoSz) return;
      it.dataset.neoSz = '1';
      var p = pid(it);
      if (!p) return;
      if (!p.variants) { paint(it, [['O/S', !p.b.disabled]]); return; }
      var cached = cacheGet(p.id);
      if (cached) paint(it, cached); else queue.push({ id: p.id, it: it });
    });
    pump();
  }

  /* ===== Βήμα 4: σελίδα προϊόντος όπως στο demo ===== */
  function catOfPath() {
    var parts = location.pathname.replace(/\/+$/, '').split('/');
    var base = parts.slice(0, -1).join('/');
    var r = null;
    CATS.forEach(function (x) { if (x[1] === base) r = x; });
    if (!r && base === '/special-offer') r = ['Black Week', '/special-offer'];
    return r;
  }

  function preselect(c) {
    var w = c.querySelector('.easystore-product-variants');
    if (!w || w.dataset.neo) return;
    w.dataset.neo = '1';
    [].slice.call(w.querySelectorAll('.easystore-product-variant')).forEach(function (g) {
      var opts = [].slice.call(g.querySelectorAll('.easystore-variant-option'));
      var chk = g.querySelector('input:checked');
      var cur = chk && chk.closest('.easystore-variant-option');
      if (cur && !cur.classList.contains('disabled')) return;
      var ok = opts.filter(function (o) { return !o.classList.contains('disabled'); })[0];
      var inp = ok && ok.querySelector('input');
      if (inp) inp.click();
    });
    [].slice.call(w.querySelectorAll('.easystore-option-name')).forEach(function (n) {
      var t = txt(n).toLowerCase();
      var sep = n.parentNode.querySelector('.easystore-option-name-separator');
      [].slice.call(n.parentNode.childNodes).forEach(function (x) { if (x.nodeType === 3 && !x.textContent.trim()) x.parentNode.removeChild(x); });
      if (sep) { sep.textContent = ':\u00a0'; }
      if (t === 'size') n.textContent = 'Μέγεθος';
      else if (t === 'color' || t === 'colour') n.textContent = 'Χρώμα';
    });
  }

  function crumbs(c) {
    var t = c.querySelector('.addon-root-easystore-single-title');
    if (!t || c.querySelector('.neo-crumbs')) return;
    var k = catOfPath();
    var d = document.createElement('div');
    d.className = 'neo-crumbs';
    var a = document.createElement('a'); a.href = '/'; a.textContent = 'Αρχική'; d.appendChild(a);
    if (k) {
      d.appendChild(document.createTextNode(' / '));
      var b = document.createElement('a'); b.href = k[1]; b.textContent = k[0]; d.appendChild(b);
    }
    t.parentNode.insertBefore(d, t);
  }

  function perks(c) {
    var atc = c.querySelector('.addon-root-easystore-single-addtocart');
    if (!atc || c.querySelector('.neo-perks')) return;
    var box = document.createElement('div');
    box.className = 'neo-pextra';
    box.innerHTML =
      '<div class="neo-perks">' +
        '<div><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 5h14v11H1zM15 9h4l4 4v3h-8z"/><circle cx="5.5" cy="18" r="1.8"/><circle cx="18.5" cy="18" r="1.8"/></svg><span>Παράδοση σε 1–3 εργάσιμες</span></div>' +
        '<div><img class="neo-klarna" src="https://osm.klarnaservices.com/images/badges/klarna_badge_rectangle.svg" alt="Klarna"><span>Πληρωμή σε 3 άτοκες δόσεις</span></div>' +
        '<div><span class="neo-ret">↺</span><span>Αλλαγή ή επιστροφή εντός 14 ημερών · <a href="/epistrofes-allages">Όροι</a></span></div>' +
      '</div>';
    atc.parentNode.insertBefore(box, atc.nextSibling);
    var dw = c.querySelector('.addon-root-easystore-single-description');
    var det = document.createElement('details');
    det.className = 'neo-acc';
    det.open = true;
    det.innerHTML = '<summary>Περιγραφή &amp; υλικά</summary><div class="neo-acc-body"></div>';
    if (dw) { det.querySelector('.neo-acc-body').appendChild(dw); }
    box.appendChild(det);
    var sh = document.createElement('details');
    sh.className = 'neo-acc';
    sh.innerHTML = '<summary>Αποστολή &amp; επιστροφές</summary><div class="neo-acc-body"><ul>' +
      '<li>Αποστολή με SPEEDEX· οι παραγγελίες ετοιμάζονται σε 1–3 εργάσιμες ημέρες.</li>' +
      '<li>Δωρεάν αποστολή για αγορές άνω των 100 €· κάτω από 100 € το κόστος είναι 3 €.</li>' +
      '<li>Αλλαγή ή επιστροφή εντός 14 ημερολογιακών ημερών από την παραλαβή.</li>' +
      '<li><a href="/apostoli-kostos">Αποστολή &amp; κόστος</a> · <a href="/epistrofes-allages">Επιστροφές &amp; αλλαγές</a> · <a href="/tropoi-pliromis">Τρόποι πληρωμής</a></li>' +
      '</ul></div>';
    box.appendChild(sh);
  }

  function related(c) {
    var wrap = c.querySelector('.addon-root-easystore-common-productlist');
    var rel = wrap && (wrap.querySelector('.sppb-addon-content') || wrap.firstElementChild);
    if (!rel || wrap.dataset.neo) return;
    wrap.dataset.neo = '1';
    wrap.classList.add('neo-plist');
    var k = catOfPath();
    var sec = wrap.closest('section.sppb-section');
    if (!k) { if (sec) sec.style.display = 'none'; return; }
    var me = location.pathname.replace(/\/+$/, '');
    fetch(k[1], { credentials: 'same-origin' }).then(function (r) { return r.text(); }).then(function (h) {
      var doc = new DOMParser().parseFromString(h, 'text/html');
      var items = [].slice.call(doc.querySelectorAll('#sp-component .sppb-collection-item')).filter(function (it) {
        var a = it.querySelector('.easystore-product-title a');
        return a && a.getAttribute('href').replace(/\/+$/, '') !== me;
      }).slice(0, 4);
      if (!items.length) { if (sec) sec.style.display = 'none'; return; }
      var g = document.createElement('div');
      g.className = 'sppb-collection-addon neo-rel-grid';
      items.forEach(function (it) { g.appendChild(document.importNode(it, true)); });
      rel.innerHTML = '';
      rel.appendChild(g);
      badges(wrap); sold(wrap); sizesOnCards(wrap);
    }).catch(function () { if (sec) sec.style.display = 'none'; });
  }

  function product(c) {
    if (!c.querySelector('.addon-root-easystore-single-title')) return false;
    document.body.classList.add('neo-prod');
    preselect(c); crumbs(c); perks(c); related(c);
    return true;
  }

  function run() {
    var pc = document.querySelector('#sp-component');
    if (pc && product(pc)) return;
    var c = root();
    if (!c) return;
    document.body.classList.add('neo-cat');
    var fw = c.querySelector('[id^="column-id-afbd2d5a"] .addon-root-easystore-list-filter');
    if (fw) fw.classList.add('neo-filters');
    head(c); cats(c); sizes(c); avail(c); sort(c); toolbar(c); badges(c); sold(c); sizesOnCards(c);
  }

  var busy = false;
  function later() { if (busy) return; busy = true; setTimeout(function () { busy = false; run(); }, 60); }
  document.addEventListener('DOMContentLoaded', function () {
    run();
    var c = document.querySelector('#sp-component');
    if (c && window.MutationObserver) new MutationObserver(later).observe(c, { childList: true, subtree: true });
  });
})();
