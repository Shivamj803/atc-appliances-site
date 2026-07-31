

    tailwind.config = {
      theme: {
        extend: {
          colors: {
            ink: '#0C0C0E',
            inklight: '#141416',
            inksub: '#1C1C1F',
            warm: '#F5F0E8',
            warmdim: '#D4CFC7',
            muted: '#8A8A8E',
            gold: '#C9A84C',
            golddim: '#8B7340',
            success: '#4ADE80',
            danger: '#EF4444',
          },
          fontFamily: {
            display: ['"Playfair Display"', 'serif'],
            body: ['Inter', 'sans-serif'],
          },
          maxWidth: {
            lg: '448px',
          }
        }
      }
    }
  

    // ===== PRODUCT DATA =====
    const products = [
      { id: 1, name: 'LG 65" C4 OLED evo TV', category: 'tvs', price: 149990, mrp: 189990, discount: 21, emi: '₹12,499/mo', capacity: '65"', stars: '5', warranty: '2 Years', delivery: 'Free', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop' },
      { id: 2, name: 'LG 674L Side-by-Side Fridge', category: 'refrigerators', price: 84490, mrp: 105000, discount: 19, emi: '₹7,041/mo', capacity: '674L', stars: '4.5', warranty: '1 Year', delivery: 'Free', image: 'https://images.unsplash.com/photo-1571175443880-49e1d58b2c63?w=400&h=400&fit=crop' },
      { id: 3, name: 'LG 9kg AI DD Front Load', category: 'washers', price: 42990, mrp: 52000, discount: 17, emi: '₹3,583/mo', capacity: '9kg', stars: '4.5', warranty: '2 Years', delivery: 'Free', image: 'https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=400&h=400&fit=crop' },
      { id: 4, name: 'LG 1.5 Ton 5 Star Split AC', category: 'acs', price: 38490, mrp: 48000, discount: 20, emi: '₹3,208/mo', capacity: '1.5 Ton', stars: '5', warranty: '1 Year', delivery: 'Free', image: 'https://images.unsplash.com/photo-1633334567410-87d1cda5c540?w=400&h=400&fit=crop' },
      { id: 5, name: 'LG 55" QNED 4K Smart TV', category: 'tvs', price: 72990, mrp: 85990, discount: 15, emi: '₹6,083/mo', capacity: '55"', stars: '4.5', warranty: '2 Years', delivery: 'Free', image: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=400&h=400&fit=crop' },
      { id: 6, name: 'LG 508L French Door Fridge', category: 'refrigerators', price: 68990, mrp: 91990, discount: 25, emi: '₹5,749/mo', capacity: '508L', stars: '4.5', warranty: '1 Year', delivery: 'Free', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop' },
      { id: 7, name: 'LG 1.5 Ton Window AC', category: 'acs', price: 31490, mrp: 38500, discount: 18, emi: '₹2,624/mo', capacity: '1.5 Ton', stars: '4', warranty: '1 Year', delivery: 'Free', image: 'https://images.unsplash.com/photo-1617103996702-96ff29b1c467?w=400&h=400&fit=crop' },
      { id: 8, name: 'LG 8kg Top Load Washer', category: 'washers', price: 28990, mrp: 37000, discount: 22, emi: '₹2,416/mo', capacity: '8kg', stars: '4.5', warranty: '2 Years', delivery: 'Free', image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&h=400&fit=crop' }
    ];

    // ===== STATE =====
    let activeCategory = 'all';
    let activePriceRange = 'all';
    let activeSort = 'default';
    let compareList = [];

    // ===== DOM =====
    const productGrid = document.getElementById('productGrid');
    const productCount = document.getElementById('productCount');
    const emptyState = document.getElementById('emptyState');
    const categoryPills = document.getElementById('categoryPills');
    const priceRanges = document.getElementById('priceRanges');
    const sortSelect = document.getElementById('sortSelect');
    const compareBar = document.getElementById('compareBar');
    const compareCount = document.getElementById('compareCount');
    const compareModal = document.getElementById('compareModal');
    const compareContent = document.getElementById('compareContent');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const loadMoreLoader = document.getElementById('loadMoreLoader');

    // ===== FILTER LOGIC =====
    function getFilteredProducts() {
      let filtered = [...products];

      // Category filter
      if (activeCategory !== 'all') {
        filtered = filtered.filter(p => p.category === activeCategory);
      }

      // Price range filter
      if (activePriceRange !== 'all') {
        filtered = filtered.filter(p => {
          switch (activePriceRange) {
            case 'under30k': return p.price < 30000;
            case '30to50k': return p.price >= 30000 && p.price <= 50000;
            case '50to1l': return p.price > 50000 && p.price <= 100000;
            case 'above1l': return p.price > 100000;
            default: return true;
          }
        });
      }

      // Sort
      switch (activeSort) {
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'discount':
          filtered.sort((a, b) => b.discount - a.discount);
          break;
      }

      return filtered;
    }

    function renderProducts() {
      const filtered = getFilteredProducts();
      const cards = Array.from(productGrid.children).filter(el => el.classList.contains('product-card'));

      cards.forEach(card => {
        const id = parseInt(card.dataset.compareId);
        const isVisible = filtered.some(p => p.id === id);
        card.style.display = isVisible ? '' : 'none';
      });

      productCount.textContent = `${filtered.length} product${filtered.length !== 1 ? 's' : ''}`;
      emptyState.classList.toggle('visible', filtered.length === 0);
      productGrid.style.display = filtered.length === 0 ? 'none' : 'grid';
    }

    function resetFilters() {
      activeCategory = 'all';
      activePriceRange = 'all';
      activeSort = 'default';

      // Reset pills
      categoryPills.querySelectorAll('button').forEach(btn => {
        btn.classList.toggle('bg-gold/15', btn.dataset.filter === 'all');
        btn.classList.toggle('text-gold', btn.dataset.filter === 'all');
        btn.classList.toggle('border-gold/30', btn.dataset.filter === 'all');
        btn.classList.toggle('bg-inklight', btn.dataset.filter !== 'all');
        btn.classList.toggle('text-muted', btn.dataset.filter !== 'all');
        btn.classList.toggle('border-warm/10', btn.dataset.filter !== 'all');
      });

      // Reset price ranges
      priceRanges.querySelectorAll('button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.range === 'all');
      });

      // Reset sort
      sortSelect.value = 'default';

      renderProducts();
    }

    // ===== EVENT LISTENERS =====
    categoryPills.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCategory = btn.dataset.filter;
        categoryPills.querySelectorAll('button').forEach(b => {
          b.classList.toggle('bg-gold/15', b === btn);
          b.classList.toggle('text-gold', b === btn);
          b.classList.toggle('border-gold/30', b === btn);
          b.classList.toggle('bg-inklight', b !== btn);
          b.classList.toggle('text-muted', b !== btn);
          b.classList.toggle('border-warm/10', b !== btn);
        });
        renderProducts();
      });
    });

    priceRanges.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        activePriceRange = btn.dataset.range;
        priceRanges.querySelectorAll('button').forEach(b => b.classList.toggle('active', b === btn));
        renderProducts();
      });
    });

    sortSelect.addEventListener('change', () => {
      activeSort = sortSelect.value;
      renderProducts();
    });

    // ===== COMPARE =====
    document.querySelectorAll('.compare-checkbox').forEach(cb => {
      cb.addEventListener('change', () => {
        const id = parseInt(cb.dataset.compare);
        if (cb.checked) {
          if (!compareList.includes(id)) compareList.push(id);
        } else {
          compareList = compareList.filter(x => x !== id);
        }
        updateCompareBar();
      });
    });

    function updateCompareBar() {
      compareCount.textContent = `${compareList.length} item${compareList.length !== 1 ? 's' : ''} selected`;
      compareBar.classList.toggle('active', compareList.length >= 2);
    }

    function clearCompare() {
      compareList = [];
      document.querySelectorAll('.compare-checkbox').forEach(cb => cb.checked = false);
      updateCompareBar();
    }

    function openCompareModal() {
      const selected = products.filter(p => compareList.includes(p.id));
      if (selected.length < 2) return;

      const specs = ['Price', 'EMI', 'Capacity', 'Star Rating', 'Warranty', 'Delivery'];

      let html = '<div class="overflow-x-auto">';
      html += '<table class="w-full text-sm">';
      html += '<thead><tr><th class="text-left text-muted text-xs font-medium py-2 pr-4">Feature</th>';
      selected.forEach(p => {
        html += `<th class="text-left text-warm text-xs font-semibold py-2 px-2 min-w-[140px]">${p.name}</th>`;
      });
      html += '</tr></thead><tbody>';

      const rows = [
        { label: 'Price', values: selected.map(p => `<span class="text-gold font-semibold">₹${p.price.toLocaleString('en-IN')}</span>`) },
        { label: 'EMI', values: selected.map(p => p.emi) },
        { label: 'Capacity', values: selected.map(p => p.capacity) },
        { label: 'Star Rating', values: selected.map(p => `<span class="text-gold">${p.stars}★</span>`) },
        { label: 'Warranty', values: selected.map(p => p.warranty) },
        { label: 'Delivery', values: selected.map(p => p.delivery) }
      ];

      rows.forEach((row, i) => {
        html += `<tr class="border-t border-warm/5">`;
        html += `<td class="text-muted text-xs py-3 pr-4">${row.label}</td>`;
        row.values.forEach(v => {
          html += `<td class="text-warm text-xs py-3 px-2">${v}</td>`;
        });
        html += '</tr>';
      });

      html += '</tbody></table></div>';

      compareContent.innerHTML = html;
      compareModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeCompareModal() {
      compareModal.classList.remove('open');
      document.body.style.overflow = '';
    }

    // ===== LOAD MORE =====
    loadMoreBtn.addEventListener('click', () => {
      loadMoreBtn.classList.add('hidden');
      loadMoreLoader.classList.remove('hidden');
      loadMoreLoader.classList.add('flex');

      setTimeout(() => {
        loadMoreLoader.classList.add('hidden');
        loadMoreLoader.classList.remove('flex');
        loadMoreBtn.classList.remove('hidden');
        loadMoreBtn.textContent = 'No more products';
        loadMoreBtn.disabled = true;
        loadMoreBtn.classList.add('opacity-50', 'cursor-not-allowed');
      }, 1500);
    });

    // ===== SCROLL REVEAL =====
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // ===== HEADER SHADOW ON SCROLL =====
    const header = document.getElementById('mainHeader');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        header.classList.add('shadow-lg', 'shadow-black/20');
      } else {
        header.classList.remove('shadow-lg', 'shadow-black/20');
      }
    });

    // ===== HERO PARALLAX =====
    const heroBg = document.getElementById('heroBg');
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < 600) {
        heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    });

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  