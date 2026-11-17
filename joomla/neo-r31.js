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

  /* Δεδομένα από το demo (17/11/2026): χρώματα ίδιου ρούχου και οδηγοί μεγεθών */
  var NEO_SWG = [[["/shop/knits/64-8043-black","Μαύρο"],["/shop/knits/64-8043-coffe","Καφέ"]],[["/shop/top-blouse/64-2074-black","Μαύρο"],["/shop/top-blouse/64-2074-camel","Καμηλό"]],[["/shop/pants/64-5094-coffe","Καφέ"],["/shop/pants/64-5094-black","Μαύρο"]],[["/accessories/bag/nali-kamilo-tsanta-pougki-melanie","Καμηλό"],["/accessories/bag/nali-mavri-tsanta-pougki-melanie","Μαύρο"],["/accessories/bag/nali-skoura-kafe-tsanta-pougki-melanie","Σκούρο καφέ"]],[["/accessories/bag/nali-kokkini-tsanta-pougki-lana","Κόκκινο"],["/accessories/bag/nali-mavri-tsanta-pougki-lana","Μαύρο"]],[["/accessories/jewelry/nali-mavra-skoularikia-luna","Μαύρο"],["/accessories/jewelry/nali-mporonto-skoularikia-luna","Μπορντό"]],[["/accessories/jewelry/nali-kafe-zoni-sierra","Καφέ"],["/accessories/jewelry/nali-mavri-zoni-sierra","Μαύρο"]],[["/shop/jacket-coat/moutaki-sokolati-gouna-2606114","Σοκολατί"],["/shop/jacket-coat/moutaki-xaki-gouna-2606114","Χακί"]],[["/shop/pants/moutaki-anthraki-psilomeso-panteloni-barrel-2603114","Ανθρακί"],["/shop/pants/moutaki-camel-psilomeso-panteloni-barrel-2603114","Καμηλό"]],[["/shop/pants/moutaki-stone-panteloni-opsis-dermatos-2603118","Μπεζ"],["/shop/pants/moutaki-mple-panteloni-opsis-dermatos-2603118","Μπλε"]],[["/accessories/bag/via-mail-bag-kafe-tsanta-pougki-coral-z01","Καφέ"],["/accessories/bag/via-mail-bag-mpez-tsanta-pougki-coral-z02","Μπεζ"],["/accessories/bag/via-mail-bag-mpornto-tsanta-pougki-coral-z04","Μπορντό"]],[["/shop/pants/moutaki-xaki-psilomeso-panteloni-barrel-opsis-suede-2603107","Χακί"],["/shop/pants/moutaki-mpez-psilomeso-panteloni-barrel-opsis-suede-2603107","Μπεζ"]],[["/shop/blazer/64-1029-black","Μαύρο"],["/shop/blazer/64-1029-ofwht","Εκρού"]],[["/shop/top-blouse/64-2003-black","Μαύρο"],["/shop/top-blouse/64-2003-ofwht","Εκρού"]],[["/shop/top-blouse/64-2037-bordo","Μπορντό"],["/shop/top-blouse/64-2037-olive","Λάδι"]],[["/shop/top-blouse/64-2040-black","Μαύρο"],["/shop/top-blouse/64-2040-coffe","Καφέ"]],[["/shop/top-blouse/64-2071-black","Μαύρο"],["/shop/top-blouse/64-2071-coffe","Καφέ"]],[["/shop/top-blouse/64-2100-beige","Μπεζ"],["/shop/top-blouse/64-2100-coffe","Καφέ"]],[["/shop/top-blouse/64-2226-coffe","Καφέ"],["/shop/top-blouse/64-2226-ofwht","Εκρού"]],[["/shop/dress/64-3302-black","Μαύρο"],["/shop/dress/64-3302-bordo","Μπορντό"]],[["/shop/dress/64-3303-black","Μαύρο"],["/shop/dress/64-3303-grey","Γκρι"]],[["/shop/dress/64-3308-blue","Μπλε"],["/shop/dress/64-3308-bordo","Μπορντό"]],[["/shop/pants/64-5070-black","Μαύρο"],["/shop/pants/64-5070-coffe","Καφέ"]],[["/shop/pants/64-5072-black","Μαύρο"],["/shop/pants/64-5072-plum","Δαμασκηνί"]],[["/shop/pants/64-5075-black","Μαύρο"],["/shop/pants/64-5075-ofwht","Εκρού"]],[["/shop/pants/64-5083-black","Μαύρο"],["/shop/pants/64-5083-coffe","Καφέ"]],[["/shop/skirt/64-6039-black","Μαύρο"],["/shop/skirt/64-6039-choco","Σοκολατί"]],[["/shop/top-blouse/64-7021-black","Μαύρο"],["/shop/top-blouse/64-7021-white","Λευκό"]],[["/shop/jacket-coat/64-9154-black","Μαύρο"],["/shop/jacket-coat/access-tzaket-opsis-dermatos-me-zoni","Καφέ"]],[["/shop/special-occasion/forema-mini-plise-me-manikia-kampana-mayro-64-3038","Μαύρο"],["/shop/special-occasion/forema-mini-plise-me-manikia-kampana-mporntw-64-3038","Μπορντό"],["/shop/special-occasion/forema-mini-plise-me-manikia-kampana-mple-64-3038","Μπλε"]],[["/shop/jacket-coat/access-ekroy-tzaket-me-synthetiki-goyna-kai-koukoyla","Βανίλια"],["/shop/jacket-coat/access-kafe-tzaket-me-synthetiki-goyna-kai-koukoyla","Καφέ"]],[["/shop/jacket-coat/access-boufan-kafe-me-zoni-kai-goynino-giaka","Καφέ"],["/shop/jacket-coat/access-boufan-mayro-me-zoni-kai-goynino-giaka","Μαύρο"]],[["/shop/jacket-coat/access-tzaket-bez-me-peplum-kai-relia","Μπεζ"],["/shop/jacket-coat/access-tzaket-bomber-plekto-me-lurex","Καφέ"]],[["/special-offer/kafe-bloyza-me-soyra-accbl031","Καφέ"],["/special-offer/mayri-bloyza-me-soyra-accbl030","Μαύρο"]],[["/special-offer/bloyza-krouaze-xroma-mayro-accbl026","Μαύρο"],["/special-offer/bloyza-krouaze-xroma-vanila-accbl025","Βανίλια"]]];
  var NEO_SWM = {"/shop/knits/64-8043-black":0,"/shop/knits/64-8043-coffe":0,"/shop/top-blouse/64-2074-black":1,"/shop/top-blouse/64-2074-camel":1,"/shop/pants/64-5094-coffe":2,"/shop/pants/64-5094-black":2,"/accessories/bag/nali-kamilo-tsanta-pougki-melanie":3,"/accessories/bag/nali-mavri-tsanta-pougki-melanie":3,"/accessories/bag/nali-skoura-kafe-tsanta-pougki-melanie":3,"/accessories/bag/nali-kokkini-tsanta-pougki-lana":4,"/accessories/bag/nali-mavri-tsanta-pougki-lana":4,"/accessories/jewelry/nali-mavra-skoularikia-luna":5,"/accessories/jewelry/nali-mporonto-skoularikia-luna":5,"/accessories/jewelry/nali-kafe-zoni-sierra":6,"/accessories/jewelry/nali-mavri-zoni-sierra":6,"/shop/jacket-coat/moutaki-sokolati-gouna-2606114":7,"/shop/jacket-coat/moutaki-xaki-gouna-2606114":7,"/shop/pants/moutaki-anthraki-psilomeso-panteloni-barrel-2603114":8,"/shop/pants/moutaki-camel-psilomeso-panteloni-barrel-2603114":8,"/shop/pants/moutaki-stone-panteloni-opsis-dermatos-2603118":9,"/shop/pants/moutaki-mple-panteloni-opsis-dermatos-2603118":9,"/accessories/bag/via-mail-bag-kafe-tsanta-pougki-coral-z01":10,"/accessories/bag/via-mail-bag-mpez-tsanta-pougki-coral-z02":10,"/accessories/bag/via-mail-bag-mpornto-tsanta-pougki-coral-z04":10,"/shop/pants/moutaki-xaki-psilomeso-panteloni-barrel-opsis-suede-2603107":11,"/shop/pants/moutaki-mpez-psilomeso-panteloni-barrel-opsis-suede-2603107":11,"/shop/blazer/64-1029-black":12,"/shop/blazer/64-1029-ofwht":12,"/shop/top-blouse/64-2003-black":13,"/shop/top-blouse/64-2003-ofwht":13,"/shop/top-blouse/64-2037-bordo":14,"/shop/top-blouse/64-2037-olive":14,"/shop/top-blouse/64-2040-black":15,"/shop/top-blouse/64-2040-coffe":15,"/shop/top-blouse/64-2071-black":16,"/shop/top-blouse/64-2071-coffe":16,"/shop/top-blouse/64-2100-beige":17,"/shop/top-blouse/64-2100-coffe":17,"/shop/top-blouse/64-2226-coffe":18,"/shop/top-blouse/64-2226-ofwht":18,"/shop/dress/64-3302-black":19,"/shop/dress/64-3302-bordo":19,"/shop/dress/64-3303-black":20,"/shop/dress/64-3303-grey":20,"/shop/dress/64-3308-blue":21,"/shop/dress/64-3308-bordo":21,"/shop/pants/64-5070-black":22,"/shop/pants/64-5070-coffe":22,"/shop/pants/64-5072-black":23,"/shop/pants/64-5072-plum":23,"/shop/pants/64-5075-black":24,"/shop/pants/64-5075-ofwht":24,"/shop/pants/64-5083-black":25,"/shop/pants/64-5083-coffe":25,"/shop/skirt/64-6039-black":26,"/shop/skirt/64-6039-choco":26,"/shop/top-blouse/64-7021-black":27,"/shop/top-blouse/64-7021-white":27,"/shop/jacket-coat/64-9154-black":28,"/shop/jacket-coat/access-tzaket-opsis-dermatos-me-zoni":28,"/shop/special-occasion/forema-mini-plise-me-manikia-kampana-mayro-64-3038":29,"/shop/special-occasion/forema-mini-plise-me-manikia-kampana-mporntw-64-3038":29,"/shop/special-occasion/forema-mini-plise-me-manikia-kampana-mple-64-3038":29,"/shop/jacket-coat/access-ekroy-tzaket-me-synthetiki-goyna-kai-koukoyla":30,"/shop/jacket-coat/access-kafe-tzaket-me-synthetiki-goyna-kai-koukoyla":30,"/shop/jacket-coat/access-boufan-kafe-me-zoni-kai-goynino-giaka":31,"/shop/jacket-coat/access-boufan-mayro-me-zoni-kai-goynino-giaka":31,"/shop/jacket-coat/access-tzaket-bez-me-peplum-kai-relia":32,"/shop/jacket-coat/access-tzaket-bomber-plekto-me-lurex":32,"/special-offer/kafe-bloyza-me-soyra-accbl031":33,"/special-offer/mayri-bloyza-me-soyra-accbl030":33,"/special-offer/bloyza-krouaze-xroma-mayro-accbl026":34,"/special-offer/bloyza-krouaze-xroma-vanila-accbl025":34};
  var NEO_SG = {"/shop/knits/minueto-kafe-pleketo-poulover-romvoi":[["Στήθος",["94","98","102","106","112","118"]],["Μήκος",["61","62","63","64","65","66"]]],"/shop/skirt/minueto-mporonto-pleketi-midi-fousta-animal-print":[["Μέση",["68","72","76","80","86","92"]],["Περιφέρεια",["90","94","98","102","108","114"]],["Μήκος",["78","79","80","81","82","83"]]],"/shop/knits/minueto-mporonto-pleketi-zaketa-animal-print":[["Στήθος",["92","96","100","104","110","116"]],["Μέση",["84","88","92","96","102","108"]],["Μήκος",["56","57","58","59","60","61"]]],"/shop/knits/minueto-ekrou-pleketo-poulover-me-schedio":[["Στήθος",["96","100","104","108","114","120"]],["Μήκος",["60","61","62","63","64","65"]]],"/shop/knits/minueto-tirkouaz-pleketo-poulover-psilos-laimos":[["Στήθος",["86","90","94","98","104","110"]],["Μήκος",["53","54","55","56","57","58"]]],"/shop/knits/minueto-mavro-pleketo-poulover-animal-print":[["Στήθος",["86","90","94","98","104","110"]],["Μήκος",["55","56","57","58","59","60"]]],"/shop/knits/minueto-mporonto-pleketo-poulover-poua":[["Στήθος",["90","94","98","102","108","114"]],["Μήκος",["60","61","62","63","64","65"]]],"/shop/knits/minueto-mporonto-pleketo-poulover-me-volan":[["Στήθος",["86","90","94","98","104","110"]],["Μήκος",["58","59","60","61","62","63"]]],"/shop/knits/minueto-kaneli-pleketo-poulover-plexouda":[["Στήθος",["88","92","96","100","106","112"]],["Μήκος",["58","59","60","61","62","63"]]],"/shop/knits/minueto-mavro-poulover-me-kentima":[["Στήθος",["86","90","94","98","104","110"]],["Μήκος",["57","58","59","60","61","62"]]],"/shop/jacket-coat/minueto-mavro-makry-palto-me-trouks":[["Στήθος",["100","104","108","112","118","124"]],["Μήκος",["110","112","114","116","118","120"]]],"/shop/jacket-coat/minueto-kafe-gouna-animal-print":[["Στήθος",["104","108","112","116","122","128"]],["Μήκος",["86","88","90","92","94","96"]]],"/shop/shirt/minueto-mple-tzin-poukamiso-me-trouks":[["Στήθος",["100","104","108","112","118","124"]],["Μέση",["98","102","106","110","116","122"]],["Μήκος",["65","66","67","68","69","70"]]],"/shop/top-blouse/minueto-kafe-fouter-me-paggietes":[["Στήθος",["102","106","110","114","120","126"]],["Μήκος",["59","60","61","62","63","64"]]],"/shop/dress/minueto-gkri-konto-forema-me-trouks":[["Στήθος",["100","104","108","112","118","124"]],["Μέση",["94","98","102","106","112","118"]],["Μήκος",["86","88","90","92","94","96"]]],"/shop/shirt/minueto-lefko-poukamiso-me-fiogko":[["Στήθος",["116","120","124","128","134","140"]],["Μήκος",["61","62","63","64","65","66"]]],"/shop/skirt/minueto-mavri-midi-fousta-chrysa-koumpia":[["Μέση",["68","72","76","80","86","92"]],["Περιφέρεια",["90","94","98","102","108","114"]],["Μήκος",["73","74","75","76","77","78"]]],"/shop/dress/minueto-mavro-emprime-konto-forema-kampana-manikia":[["Στήθος",["87","91","95","99","105","111"]],["Μέση",["90","94","98","102","108","114"]],["Περιφέρεια",["96","100","104","108","114","120"]],["Μήκος",["86","88","90","92","94","96"]]],"/shop/dress/minueto-mavro-konto-forema-fouskota-manikia":[["Στήθος",["121","125","129","133","139","145"]],["Μέση",["87","91","95","99","105","111"]],["Περιφέρεια",["97","101","105","109","115","121"]],["Μήκος",["86","88","90","92","94","96"]]],"/shop/top-blouse/minueto-emprime-saten-mplouza-me-volan":[["Στήθος",["95","99","103","107","113","119"]],["Μήκος",["53","54","55","56","57","58"]]],"/shop/dress/minueto-emprime-konto-forema-v-laimokopsi":[["Στήθος",["97","101","105","109","115","121"]],["Μέση",["68","72","76","80","86","92"]],["Περιφέρεια",["94","98","102","106","112","118"]],["Μήκος",["93","95","97","99","101","103"]]]};
  var NEO_SGM = ["/shop/knits/minueto-kafe-pleketo-poulover-romvoi","/shop/skirt/minueto-mporonto-pleketi-midi-fousta-animal-print","/shop/knits/minueto-mporonto-pleketi-zaketa-animal-print","/shop/knits/minueto-ekrou-pleketo-poulover-me-schedio","/shop/knits/minueto-tirkouaz-pleketo-poulover-psilos-laimos","/shop/knits/minueto-mavro-pleketo-poulover-animal-print","/shop/knits/minueto-mavro-pleketo-zivago-chrysa-koumpia","/shop/knits/minueto-mporonto-pleketo-poulover-poua","/shop/knits/minueto-mporonto-pleketo-poulover-me-volan","/shop/knits/minueto-kaneli-pleketo-poulover-plexouda","/shop/knits/minueto-mavro-poulover-me-kentima","/shop/jacket-coat/minueto-mavro-makry-palto-me-trouks","/shop/jacket-coat/minueto-kafe-gouna-animal-print","/shop/shirt/minueto-mple-tzin-poukamiso-me-trouks","/shop/top-blouse/minueto-kafe-fouter-me-paggietes","/shop/dress/minueto-gkri-konto-forema-me-trouks","/shop/shirt/minueto-lefko-poukamiso-me-fiogko","/shop/skirt/minueto-mavri-midi-fousta-chrysa-koumpia","/shop/dress/minueto-mavro-emprime-konto-forema-kampana-manikia","/shop/dress/minueto-mavro-konto-forema-fouskota-manikia","/shop/top-blouse/minueto-emprime-saten-mplouza-me-volan","/shop/dress/minueto-emprime-konto-forema-v-laimokopsi"];
  var NEO_ACC_HTML = "<div class=\"sgm\" id=\"neo-sgm\" ><div class=\"sgb\" role=\"dialog\" aria-label=\"Οδηγός μεγεθών ACCESS\">\n<button class=\"sgx\"  aria-label=\"Κλείσιμο\">×</button>\n<h2>Οδηγός μεγεθών ACCESS</h2>\n<h3>Αντιστοιχία μεγεθών</h3>\n<div class=\"sgt\"><table><tr><th>ACCESS</th><th>XS (42)</th><th>S (44)</th><th>M (46)</th><th>L (48)</th><th>XL (50)</th><th>XXL (52)</th><th>XXXL (54)</th></tr>\n<tr><td>Ευρώπη</td><td>36</td><td>38</td><td>40</td><td>42</td><td>44</td><td>46</td><td>48</td></tr>\n<tr><td>Ιταλία</td><td>40</td><td>42</td><td>44</td><td>46</td><td>48</td><td>50</td><td>52</td></tr>\n<tr><td>Ηνωμένο Βασίλειο</td><td>6</td><td>8</td><td>10</td><td>12</td><td>14</td><td>16</td><td>18</td></tr>\n<tr><td>Ισπανία</td><td>34</td><td>36</td><td>38</td><td>40</td><td>42</td><td>44</td><td>46</td></tr></table></div>\n<h3>Μετρήσεις σώματος (cm)</h3>\n<div class=\"sgt\"><table><tr><th>ACCESS</th><th>XS (42)</th><th>S (44)</th><th>M (46)</th><th>L (48)</th><th>XL (50)</th><th>XXL (52)</th><th>XXXL (54)</th><th>S/M</th><th>M/L</th><th>One size</th></tr>\n<tr><td>Στήθος</td><td>84-88</td><td>88-92</td><td>92-96</td><td>96-100</td><td>100-104</td><td>104-108</td><td>108-112</td><td>84-98</td><td>98-112</td><td>84-104</td></tr>\n<tr><td>Μέση</td><td>64-68</td><td>68-72</td><td>72-76</td><td>76-80</td><td>80-84</td><td>84-88</td><td>88-92</td><td>64-78</td><td>78-92</td><td>64-84</td></tr>\n<tr><td>Περιφέρεια</td><td>92-96</td><td>96-100</td><td>100-104</td><td>104-108</td><td>108-112</td><td>112-116</td><td>116-120</td><td>92-106</td><td>106-120</td><td>92-122</td></tr></table></div>\n<p class=\"sgn\">Πηγή: οδηγός μεγεθών της ACCESS Fashion.</p>\n</div></div>";
  var NEO_MIN_HTML = "<div class=\"sgm\" id=\"neo-sgm2\" ><div class=\"sgb\" role=\"dialog\" aria-label=\"Οδηγός μεγεθών MINUETO\"><button class=\"sgx\"  aria-label=\"Κλείσιμο\">×</button><h2>Οδηγός μεγεθών MINUETO</h2><div id=\"neo-sg2m\"></div><h3>Αντιστοιχία μεγεθών</h3><div class=\"sgt\"><table><tr><th>MINUETO</th><th>Ισπανία</th><th>Ευρώπη</th><th>Ηνωμένο Βασίλειο</th><th>Ιταλία</th></tr><tr><td>XS</td><td>34</td><td>36</td><td>6</td><td>38</td></tr><tr><td>S</td><td>36</td><td>38</td><td>8</td><td>40</td></tr><tr><td>M</td><td>38</td><td>40</td><td>10</td><td>42</td></tr><tr><td>L</td><td>40</td><td>42</td><td>12</td><td>44</td></tr><tr><td>XL</td><td>42</td><td>44</td><td>14</td><td>46</td></tr><tr><td>XXL</td><td>44</td><td>46</td><td>16</td><td>48</td></tr></table></div><p class=\"sgn\">Πηγή: οδηγός μεγεθών της Minueto για το συγκεκριμένο ρούχο.</p></div></div>";

  /* Δεύτερες κατηγορίες από το demo (17/11/2026): κατηγορία → id προϊόντων EasyStore */
  var NEO_EXTRA = {"/shop/special-occasion":[702,703,644,645,559,560,563,564,565,569,573,574,575,581,584,612,613,624,636,637,638],"/shop/dress":[588,593,596,542,543,544,545],"/shop/knits":[638,639],"/shop/top-blouse":[400,693,696,519,518,516]};

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
      if (x[1] === '/shop/shirt') return;
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
    if (base === '/shop/shirt') r = ['Τοπ – Πουκάμισα', '/shop/top-blouse'];
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
      items.forEach(function (it) {
        var n = document.importNode(it, true);
        [].slice.call(n.querySelectorAll('img[data-src]')).forEach(function (im) { im.src = im.getAttribute('data-src'); im.removeAttribute('data-unveil'); });
        g.appendChild(n);
      });
      rel.innerHTML = '';
      rel.appendChild(g);
      badges(wrap); sold(wrap); sizesOnCards(wrap);
    }).catch(function () { if (sec) sec.style.display = 'none'; });
  }

  /* Χρώματα του ίδιου ρούχου: κυκλάκια με φωτογραφία, όπως στο demo */
  function imgOf(path, cb) {
    try { var v = sessionStorage.getItem('neo_img_' + path); if (v) return cb(v); } catch (e) {}
    fetch(path, { credentials: 'same-origin' }).then(function (r) { return r.text(); }).then(function (h) {
      var d = new DOMParser().parseFromString(h, 'text/html');
      var m = d.querySelector('meta[property="og:image"]');
      var i = d.querySelector('.addon-root-easystore-single-thumbnail img, .easystore-product-image img');
      var u = (i && (i.getAttribute('data-src') || i.getAttribute('src'))) || (m && m.getAttribute('content')) || '';
      try { if (u) sessionStorage.setItem('neo_img_' + path, u); } catch (e) {}
      cb(u);
    }).catch(function () { cb(''); });
  }
  function swatches(c) {
    var vs = c.querySelector('.addon-root-easystore-single-variants');
    if (!vs || c.querySelector('.neo-sw')) return;
    var me = location.pathname.replace(/\/+$/, '');
    var gi = NEO_SWM[me];
    if (gi === undefined) return;
    var list = NEO_SWG[gi];
    var cur = list.filter(function (x) { return x[0] === me; })[0];
    var box = document.createElement('div');
    box.className = 'neo-colors';
    box.innerHTML = '<div class="neo-opt-h">Χρώμα: <b></b></div><div class="neo-sw"></div>';
    box.querySelector('b').textContent = cur ? cur[1] : '';
    var sw = box.querySelector('.neo-sw');
    var mine = c.querySelector('.addon-root-easystore-single-thumbnail img');
    list.forEach(function (x) {
      var a = document.createElement('a');
      a.href = x[0]; a.title = x[1];
      if (x[0] === me) a.className = 'on';
      var im = document.createElement('img');
      im.alt = x[1];
      a.appendChild(im);
      sw.appendChild(a);
      if (x[0] === me && mine) im.src = mine.getAttribute('src') || mine.getAttribute('data-src');
      else imgOf(x[0], function (u) { if (u) im.src = u; });
    });
    vs.parentNode.insertBefore(box, vs);
  }

  /* Οδηγός μεγεθών: ACCESS (γενικός) και MINUETO (ανά ρούχο), όπως στο demo */
  function closeSG() { [].slice.call(document.querySelectorAll('.neo-sgmod.open')).forEach(function (m) { m.classList.remove('open'); }); }
  function modal(id, html) {
    var m = document.getElementById(id);
    if (m) return m;
    var t = document.createElement('div');
    t.innerHTML = html;
    m = t.firstElementChild;
    m.classList.add('neo-sgmod');
    m.addEventListener('click', function (e) { if (e.target === m || (e.target.classList && e.target.classList.contains('sgx'))) closeSG(); });
    document.body.appendChild(m);
    return m;
  }
  function sizeGuide(c) {
    var t = c.querySelector('.easystore-variant-title');
    if (!t || t.querySelector('.neo-sg')) return;
    var me = location.pathname.replace(/\/+$/, '');
    var title = txt(c.querySelector('.addon-root-easystore-single-title'));
    var kind = NEO_SGM.indexOf(me) >= 0 ? 'min' : (/^access/i.test(title) && me.indexOf('/accessories/shoes') !== 0 ? 'acc' : '');
    if (!kind) return;
    var a = document.createElement('a');
    a.href = 'javascript:void 0';
    a.className = 'neo-sg';
    a.textContent = 'Οδηγός μεγεθών';
    a.addEventListener('click', function () {
      var m;
      if (kind === 'acc') m = modal('neo-sgm', NEO_ACC_HTML);
      else {
        m = modal('neo-sgm2', NEO_MIN_HTML);
        var r = NEO_SG[me] || [];
        var S = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
        m.querySelector('#neo-sg2m').innerHTML = r.length
          ? '<h3>Μετρήσεις του ρούχου (cm)</h3><div class="sgt"><table><tr><th>Μέγεθος</th>' + S.map(function (s) { return '<th>' + s + '</th>'; }).join('') + '</tr>' +
            r.map(function (x) { return '<tr><td>' + x[0] + '</td>' + x[1].map(function (v) { return '<td>' + v + '</td>'; }).join('') + '</tr>'; }).join('') +
            '</table></div><p class="sgn" style="margin-top:8px">Οι μετρήσεις είναι του ίδιου του ρούχου (περίμετρος), με απόκλιση περίπου 1 cm.</p>'
          : '<p class="sgn">Για αυτό το ρούχο η Minueto δεν δίνει μετρήσεις, μόνο την αντιστοιχία μεγεθών.</p>';
      }
      m.classList.add('open');
    });
    t.classList.add('neo-opt-row');
    t.appendChild(a);
  }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeSG(); });

  function allSold(c) {
    var atc = c.querySelector(".addon-root-easystore-single-addtocart");
    var b = atc && atc.querySelector("button");
    if (!b) return;
    var opts = [].slice.call(c.querySelectorAll(".easystore-product-variants .easystore-variant-option"));
    var all = opts.length ? opts.every(function (o) { return o.classList.contains("disabled"); }) : b.disabled;
    document.body.classList.toggle("neo-allsold", !!all);
    var n = c.querySelector(".neo-soldnote");
    if (all && !n) {
      n = document.createElement("p");
      n.className = "neo-soldnote";
      n.textContent = "Το προϊόν έχει εξαντληθεί σε όλα τα μεγέθη.";
      atc.parentNode.insertBefore(n, atc);
    } else if (!all && n) n.remove();
  }

  function product(c) {
    if (!c.querySelector('.addon-root-easystore-single-title')) return false;
    document.body.classList.add('neo-prod');
    preselect(c); crumbs(c); swatches(c); sizeGuide(c); allSold(c); perks(c); related(c);
    return true;
  }

  /* Καλάθι/ταμείο: «Μέγεθος» αντί για SIZE, τίτλος στη σελίδα καλαθιού */
  function cartBits() {
    [].slice.call(document.querySelectorAll('.easystore-metadata-key')).forEach(function (k) {
      var t = txt(k).replace(/:$/, '').toLowerCase();
      if (t === 'size') k.textContent = 'Μέγεθος:';
      else if (t === 'color' || t === 'colour') k.textContent = 'Χρώμα:';
      else if (t === 'βάρος' || t === 'weight') { var it = k.closest('.easystore-metadata-item'); if (it) it.style.display = 'none'; }
    });
    if (document.body.classList.contains('com-content') && document.body.classList.contains('view-article')) {
      var ad = document.querySelector('#sp-component .article-details');
      if (ad && !document.querySelector('.neo-page-head')) {
        var hd = document.createElement('div');
        hd.className = 'neo-page-head';
        var h1 = document.createElement('h1');
        h1.textContent = (document.title || '').split('|')[0].trim();
        hd.appendChild(h1);
        ad.parentNode.insertBefore(hd, ad);
      }
    }
    if (document.body.classList.contains('view-cart')) {
      var c = document.querySelector('#sp-component');
      if (c && !c.querySelector('.neo-page-head')) {
        var d = document.createElement('div');
        d.className = 'neo-page-head';
        d.innerHTML = '<h1>Καλάθι</h1>';
        c.insertBefore(d, c.firstChild);
      }
    }
  }

  /* Footer όπως στο demo (χωρίς τις σημειώσεις για Facebook/ΓΕΜΗ που λείπουν ακόμα) */
  function footer() {
    if (document.querySelector('.neo-ft')) return;
    var anchor = document.querySelector('#sp-bottom') || document.querySelector('#sp-footer');
    if (!anchor) return;
    var logo = document.querySelector('#sp-logo img');
    var src = logo ? (logo.getAttribute('src') || '') : '/images/maras_logo_transparent.png';
    var f = document.createElement('footer');
    f.className = 'neo-ft';
    f.innerHTML =
      '<div class="neo-ft-wrap"><div class="neo-ft-grid">' +
        '<div><a class="neo-ft-logo" href="/"><img alt="Mara\'s Boutique"><small>BOUTIQUE &amp; CONCEPT STORE</small></a>' +
        '<p>Επαμεινώνδα &amp; Ετεοκλέους<br>(Εμπορικό Κέντρο Θήβας)<br>Θήβα 322 00<br>Τηλ. 2262 023211<br>marasboutiqueboutique@gmail.com</p></div>' +
        '<div><h5>Εξυπηρέτηση</h5><ul>' +
          '<li><a href="/apostoli-kostos">Αποστολή &amp; κόστος</a></li>' +
          '<li><a href="/epistrofes-allages">Επιστροφές &amp; αλλαγές</a></li>' +
          '<li><a href="/tropoi-pliromis">Τρόποι πληρωμής</a></li>' +
          '<li><a href="/contact">Επικοινωνία</a></li>' +
        '</ul></div>' +
        '<div><h5>Ακολουθήστε μας</h5><ul>' +
          '<li><a href="https://www.instagram.com/maras_boutique_/" target="_blank" rel="noopener">Instagram</a></li>' +
        '</ul></div>' +
      '</div><div class="neo-ft-legal">' +
        '<span>© ' + new Date().getFullYear() + ' Mara\'s Boutique · ΑΦΜ 124145929</span>' +
        '<span><a href="/oroi-xrisis">Όροι χρήσης</a> · <a href="/politiki-aporritou">Πολιτική απορρήτου</a> · <a href="/cookies">Cookies</a></span>' +
      '</div></div>';
    f.querySelector('img').src = src;
    anchor.parentNode.insertBefore(f, anchor);
    document.body.classList.add('neo-has-ft');
  }

  /* Δεύτερες κατηγορίες: στην (τελευταία) σελίδα της κατηγορίας προστίθενται και τα προϊόντα που στο demo
     ανήκουν και σε αυτήν. Τίτλος, τιμή, εικόνα, μεγέθη και διαθεσιμότητα έρχονται ζωντανά από το EasyStore. */
  function extras(c) {
    var path = location.pathname.replace(/\/+$/, '');
    var ids = NEO_EXTRA[path];
    if (!ids || /filter_|search|q=/.test(location.search)) return;
    var grid = c.querySelector('.sppb-collection-addon.neo-plist') || c.querySelector('.neo-plist .sppb-collection-addon');
    var tpl = grid && grid.querySelector('.sppb-collection-item:not(.neo-extra)');
    if (!grid || !tpl || grid.dataset.neoEx) return;
    var ps = c.querySelector('.addon-root-easystore-common-paginationstatus');
    var rng = ps && txt(ps.querySelector('[x-text="pagination.range"]'));
    var tot = ps && parseInt(txt(ps.querySelector('[x-text="pagination.total"]')).replace(/\D/g, ''), 10);
    var end = rng ? parseInt((rng.split('-')[1] || '').replace(/\D/g, ''), 10) : NaN;
    var cnt0 = c.querySelector('.neo-count');
    if (cnt0 && !isNaN(tot) && !cnt0.dataset.neoEx) { var n0 = tot + ids.length; cnt0.textContent = n0 + ' προϊόντα'; cnt0.dataset.neoEx = '1'; }
    if (!isNaN(tot) && !isNaN(end) && end < tot) return;
    grid.dataset.neoEx = '1';
    var have = {};
    [].slice.call(grid.querySelectorAll('[class*="easystore-btn-add-to-cart"]')).forEach(function (b) {
      for (var i = 0; i < b.attributes.length; i++) { var m = b.attributes[i].name.match(/^add-to-cart-button-(\d+)$/); if (m) have[m[1]] = 1; }
    });
    var todo = ids.filter(function (id) { return !have[id]; });
    var added = 0, q = todo.slice(), act = 0;
    var base = (window.Joomla && Joomla.getOptions && Joomla.getOptions('easystore.base')) || '';
    function one(id) {
      act++;
      fetch(base + '/index.php?option=com_easystore&task=product.quickAddModal&id=' + id, { credentials: 'same-origin' })
        .then(function (r) { return r.json(); })
        .then(function (j) {
          var d = new DOMParser().parseFromString(j.data || '', 'text/html');
          var href = (d.querySelector('.stretched-link') || {}).getAttribute ? d.querySelector('.stretched-link').getAttribute('href') : '';
          var title = txt(d.querySelector('.easystore-product-title'));
          var img = d.querySelector('img.easystore-zoom-cursor, .easystore-product-image img');
          var price = d.querySelector('.easystore-product-price');
          if (!href || !title) return;
          var it = tpl.cloneNode(true);
          it.classList.add('neo-extra');
          it.removeAttribute('style');
          delete it.dataset.neoSold; delete it.dataset.neoSz;
          [].slice.call(it.querySelectorAll('.neo-card-sizes, .neo-soldout')).forEach(function (x) { x.remove(); });
          it.classList.remove('neo-sold');
          var im = it.querySelector('.easystore-product-image img');
          if (im && img) { im.src = img.getAttribute('src'); im.removeAttribute('data-src'); im.removeAttribute('data-unveil'); im.alt = title; im.removeAttribute('srcset'); }
          var ph = it.querySelector('.easystore-product-image');
          if (ph && !ph.querySelector('a.neo-ph-link')) { var al = document.createElement('a'); al.className = 'neo-ph-link'; al.href = href; al.setAttribute('aria-label', title); ph.appendChild(al); }
          var cat = href.split('/').slice(0, -1).join('/'), lbl = '';
          CATS.forEach(function (x) { if (x[1] === cat) lbl = x[0]; });
          var ca = it.querySelector('.easystore-product-category a');
          if (ca) { ca.href = cat; ca.textContent = lbl || ca.textContent; }
          var ta = it.querySelector('.easystore-product-title a');
          if (ta) { ta.href = href; ta.textContent = title; }
          var pr = it.querySelector('.easystore-product-price');
          if (pr && price) pr.innerHTML = price.innerHTML;
          var bw = it.querySelector('.addon-root-easystore-list-badge > div');
          if (bw) {
            var now = num(it, '.easystore-price-current'), was = num(it, '.easystore-price-original');
            bw.innerHTML = (now > 0 && was > now) ? '<div class="easystore-badge-wrapper"><span class="easystore-badge is-sale" data-neo="1">-' + Math.round((1 - now / was) * 100) + '%</span></div>' : '';
          }
          var btn = it.querySelector('[class*="easystore-btn-add-to-cart"]');
          if (btn) btn.remove();
          var t = d.querySelector('[x-ref^="product_variants_"]');
          var v = t ? JSON.parse(t.value || '[]') : null;
          var list = v ? v.filter(function (x) { return x.visibility !== false; }).map(function (x) { return [String(x.combination), !!x.inventory_status]; }) : null;
          var single = d.querySelector('button[disabled]') && !v;
          if (!list) list = [['O/S', !single]];
          it.dataset.neoSold = '1'; it.dataset.neoSz = '1';
          grid.appendChild(it);
          paint(it, list);
          if (list.length && list.every(function (x) { return !x[1]; })) {
            it.classList.add('neo-sold');
            if (ph) { var so = document.createElement('div'); so.className = 'neo-soldout'; so.innerHTML = '<b>Sold out</b>'; ph.appendChild(so); }
          }
          added++;
        })
        .catch(function () {})
        .then(function () { act--; if (q.length) one(q.shift()); });
    }
    for (var k = 0; k < 4 && q.length; k++) one(q.shift());
  }

  function run() {
    footer();
    cartBits();
    var pc = document.querySelector('#sp-component');
    if (pc && product(pc)) return;
    var c = root();
    if (!c) return;
    document.body.classList.add('neo-cat');
    var fw = c.querySelector('[id^="column-id-afbd2d5a"] .addon-root-easystore-list-filter');
    if (fw) fw.classList.add('neo-filters');
    head(c); cats(c); sizes(c); avail(c); sort(c); toolbar(c); badges(c); sold(c); sizesOnCards(c); extras(c);
  }

  var busy = false;
  function later() { if (busy) return; busy = true; setTimeout(function () { busy = false; run(); }, 60); }
  document.addEventListener('DOMContentLoaded', function () {
    run();
    if (window.MutationObserver) new MutationObserver(later).observe(document.body, { childList: true, subtree: true });
  });
})();
