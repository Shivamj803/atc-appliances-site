

    tailwind.config = {
      theme: {
        extend: {
          colors: {
            ink: '#0C0C0E', inklight: '#141416', inksub: '#1C1C1F',
            warm: '#F5F0E8', warmdim: '#D4CFC7', muted: '#8A8A8E',
            gold: '#C9A84C', golddim: '#8B7340', success: '#4ADE80', danger: '#EF4444',
            teal: '#2DD4BF', tealdim: '#1A7A6E'
          },
          fontFamily: { display: ['Playfair Display', 'serif'], body: ['Inter', 'sans-serif'] },
        }
      }
    }
  

    // ===================== SCROLL REVEAL =====================
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    document.querySelectorAll('.reveal, .reveal-scale, .stagger-children').forEach(el => revealObserver.observe(el));

    // ===================== HEADER SHADOW =====================
    const header = document.getElementById('mainHeader');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      header.style.boxShadow = y > 10 ? '0 4px 30px rgba(0,0,0,0.4)' : 'none';
      lastScroll = y;
    }, { passive: true });

    // ===================== PARALLAX =====================
    const parallaxEl = document.querySelector('.hero-parallax');
    window.addEventListener('scroll', () => {
      if (parallaxEl) {
        const y = window.scrollY;
        parallaxEl.style.transform = `translateY(${-y * 0.15}px) translateY(-50%)`;
      }
    }, { passive: true });

    // ===================== PRODUCT DATA =====================
    const products = Array.from(document.querySelectorAll('.product-card')).map((card, idx) => ({
      el: card,
      name: card.querySelector('h3')?.textContent?.trim() || '',
      price: parseInt(card.dataset.price),
      discount: parseInt(card.dataset.discount),
      rating: parseFloat(card.dataset.rating),
      categories: card.dataset.category.split(','),
      idx
    }));

    // ===================== CATEGORY FILTER =====================
    let activeCategory = 'all';
    document.querySelectorAll('#categoryPills .filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('#categoryPills .filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeCategory = pill.dataset.category;
        applyFilters();
      });
    });

    // ===================== PRICE RANGE FILTER =====================
    let activePriceMin = 0, activePriceMax = 999999;
    document.querySelectorAll('#pricePills .price-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('#pricePills .price-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activePriceMin = parseInt(pill.dataset.min);
        activePriceMax = parseInt(pill.dataset.max);
        applyFilters();
      });
    });

    // ===================== SORT =====================
    let sortBy = 'featured';
    document.getElementById('sortSelect').addEventListener('change', (e) => {
      sortBy = e.target.value;
      applyFilters();
    });

    // ===================== APPLY FILTERS & SORT =====================
    function applyFilters() {
      let visible = products.filter(p => {
        const catMatch = activeCategory === 'all' || p.categories.includes(activeCategory);
        const priceMatch = p.price >= activePriceMin && p.price <= activePriceMax;
        return catMatch && priceMatch;
      });

      // Sort
      if (sortBy === 'price-low') visible.sort((a, b) => a.price - b.price);
      else if (sortBy === 'price-high') visible.sort((a, b) => b.price - a.price);
      else if (sortBy === 'discount') visible.sort((a, b) => b.discount - a.discount);
      else if (sortBy === 'rating') visible.sort((a, b) => b.rating - a.rating);

      // Render
      const grid = document.getElementById('productGrid');
      visible.forEach(p => grid.appendChild(p.el));
      products.forEach(p => {
        if (visible.includes(p)) {
          p.el.style.display = '';
          setTimeout(() => p.el.style.opacity = '1', 10);
        } else {
          p.el.style.display = 'none';
          p.el.style.opacity = '0';
        }
      });

      document.getElementById('productCount').textContent = visible.length;
      document.getElementById('noResults').classList.toggle('hidden', visible.length > 0);
    }

    function resetFilters() {
      activeCategory = 'all';
      activePriceMin = 0; activePriceMax = 999999;
      sortBy = 'featured';
      document.querySelectorAll('#categoryPills .filter-pill').forEach(p => p.classList.toggle('active', p.dataset.category === 'all'));
      document.querySelectorAll('#pricePills .price-pill').forEach((p, i) => p.classList.toggle('active', i === 0));
      document.getElementById('sortSelect').value = 'featured';
      applyFilters();
    }

    // ===================== COMPARE =====================
    const compareItems = [];
    const compareBar = document.getElementById('compareBar');
    const compareCount = document.getElementById('compareCount');

    document.querySelectorAll('.compare-check').forEach(cb => {
      cb.addEventListener('change', () => {
        const data = {
          name: cb.dataset.product,
          price: parseInt(cb.dataset.price),
          discount: cb.dataset.discount,
          img: cb.dataset.img
        };
        if (cb.checked) {
          if (compareItems.length >= 3) {
            cb.checked = false;
            alert('Compare up to 3 products at a time');
            return;
          }
          compareItems.push(data);
        } else {
          const idx = compareItems.findIndex(i => i.name === data.name);
          if (idx > -1) compareItems.splice(idx, 1);
        }
        updateCompareBar();
      });
    });

    function updateCompareBar() {
      compareCount.textContent = compareItems.length;
      compareBar.classList.toggle('show', compareItems.length > 0);
    }

    function clearCompare() {
      compareItems.length = 0;
      document.querySelectorAll('.compare-check').forEach(cb => cb.checked = false);
      updateCompareBar();
    }

    // ===================== COMPARE MODAL =====================
    const compareModal = document.getElementById('compareModal');
    const compareContent = document.getElementById('compareContent');

    function openCompareModal() {
      if (compareItems.length < 2) { alert('Select at least 2 products to compare'); return; }
      const headers = compareItems.map(i => `
        <div class="text-center min-w-[100px]">
          <img src="${i.img}" class="w-16 h-16 object-cover rounded-lg mx-auto mb-2" />
          <p class="text-[10px] font-medium text-warm line-clamp-2">${i.name}</p>
        </div>
      `).join('');
      const prices = compareItems.map(i => `
        <div class="text-center min-w-[100px]">
          <p class="text-sm font-bold text-gold">₹${i.price.toLocaleString()}</p>
        </div>
      `).join('');
      const discounts = compareItems.map(i => `
        <div class="text-center min-w-[100px]">
          <span class="text-[10px] bg-danger/20 text-danger px-2 py-0.5 rounded">${i.discount}% OFF</span>
        </div>
      `).join('');
      const emis = compareItems.map(i => {
        const emi = Math.round(i.price / 12);
        return `<div class="text-center min-w-[100px]"><p class="text-[11px] text-success">EMI ₹${emi.toLocaleString()}/mo</p></div>`;
      }).join('');

      compareContent.innerHTML = `
        <div class="overflow-x-auto">
          <div class="flex gap-4 pb-2">
            <div class="min-w-[80px] pt-20">
              <p class="text-[11px] text-muted mb-8">Product</p>
              <p class="text-[11px] text-muted mb-8">Price</p>
              <p class="text-[11px] text-muted mb-8">Discount</p>
              <p class="text-[11px] text-muted mb-8">EMI (12mo)</p>
            </div>
            <div class="flex gap-4">
              <div>${headers}</div>
            </div>
          </div>
          <div class="border-t border-white/5 pt-3 mt-1">
            <div class="flex gap-4">
              <div class="min-w-[80px]"><p class="text-[11px] text-muted">Price</p></div>
              <div class="flex gap-4">${prices}</div>
            </div>
          </div>
          <div class="border-t border-white/5 pt-3 mt-3">
            <div class="flex gap-4">
              <div class="min-w-[80px]"><p class="text-[11px] text-muted">Discount</p></div>
              <div class="flex gap-4">${discounts}</div>
            </div>
          </div>
          <div class="border-t border-white/5 pt-3 mt-3">
            <div class="flex gap-4">
              <div class="min-w-[80px]"><p class="text-[11px] text-muted">EMI</p></div>
              <div class="flex gap-4">${emis}</div>
            </div>
          </div>
        </div>
        <div class="flex gap-3 mt-6">
          <button onclick="clearCompare(); closeCompareModal();" class="flex-1 py-2.5 rounded-xl border border-white/10 text-muted text-xs font-medium hover:bg-white/5 transition-colors">Clear & Close</button>
          <button onclick="closeCompareModal()" class="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-gold to-golddim text-ink text-xs font-semibold hover:shadow-lg transition-all">Done</button>
        </div>
      `;
      compareModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeCompareModal() {
      compareModal.classList.remove('open');
      document.body.style.overflow = '';
    }

    compareModal.addEventListener('click', (e) => {
      if (e.target === compareModal) closeCompareModal();
    });

    // ===================== INIT =====================
    applyFilters();
  