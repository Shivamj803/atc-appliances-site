

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
            display: ['Playfair Display', 'serif'],
            body: ['Inter', 'sans-serif'],
          },
        }
      }
    }
  

    // ==================== GALLERY DOTS ====================
    const galleryTrack = document.getElementById('galleryTrack');
    const galleryDots = document.querySelectorAll('#galleryDots .dot');

    galleryTrack.addEventListener('scroll', () => {
      const scrollLeft = galleryTrack.scrollLeft;
      const width = galleryTrack.offsetWidth;
      const index = Math.round(scrollLeft / width);
      galleryDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    });

    // ==================== LIGHTBOX ====================
    const lightbox = document.getElementById('lightbox');
    const lightboxTrack = document.getElementById('lightboxTrack');
    const lightboxDots = document.querySelectorAll('#lightboxDots .dot');

    function openLightbox(index) {
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        lightboxTrack.scrollTo({ left: index * window.innerWidth, behavior: 'auto' });
        updateLightboxDots(index);
      }, 50);
    }

    function closeLightbox(event) {
      if (event.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    }

    function closeLightboxBtn(event) {
      event.stopPropagation();
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    lightboxTrack.addEventListener('scroll', () => {
      const scrollLeft = lightboxTrack.scrollLeft;
      const width = window.innerWidth;
      const index = Math.round(scrollLeft / width);
      updateLightboxDots(index);
    });

    function updateLightboxDots(index) {
      lightboxDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }

    // Keyboard support for lightbox
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // ==================== STICKY PRICE BAR ====================
    const stickyPriceBar = document.getElementById('stickyPriceBar');
    const gallerySection = document.getElementById('gallerySection');

    window.addEventListener('scroll', () => {
      const galleryBottom = gallerySection.getBoundingClientRect().bottom;
      if (galleryBottom < 0) {
        stickyPriceBar.classList.add('show');
      } else {
        stickyPriceBar.classList.remove('show');
      }
    });

    // ==================== SHARE ====================
    document.getElementById('shareBtn').addEventListener('click', async () => {
      const shareData = {
        title: 'LG 1.5 Ton 5-Star AI DUAL Inverter Split AC',
        text: 'Best price at ATC! Save ₹19,000. LG 1.5 Ton 5-Star AC at ₹42,990.',
        url: window.location.href
      };
      try {
        if (navigator.share) {
          await navigator.share(shareData);
        } else {
          await navigator.clipboard.writeText(window.location.href);
          showToast('Link copied to clipboard');
        }
      } catch (err) {
        console.log('Share cancelled');
      }
    });

    // ==================== ACCORDIONS ====================
    function toggleAccordion(id) {
      const body = document.getElementById(id + 'Body');
      const chevron = document.getElementById(id + 'Chevron');
      body.classList.toggle('open');
      chevron.classList.toggle('open');
    }

    function toggleEmi() {
      const body = document.getElementById('emiBody');
      const chevron = document.getElementById('emiChevron');
      body.classList.toggle('open');
      chevron.classList.toggle('open');
    }

    // ==================== DELIVERY CHECKER ====================
    function checkDelivery() {
      const input = document.getElementById('pincodeInput');
      const result = document.getElementById('deliveryResult');
      const daySpan = document.getElementById('deliveryDay');
      const pin = input.value.trim();

      if (pin.length !== 6 || !/^\d{6}$/.test(pin)) {
        showToast('Please enter a valid 6-digit pincode');
        input.focus();
        return;
      }

      // Calculate delivery day (2 days from now)
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const d = new Date();
      d.setDate(d.getDate() + 2);
      daySpan.textContent = `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]}`;

      result.classList.remove('hidden');
    }

    // ==================== REVIEW PHOTO LIGHTBOX ====================
    const reviewLightbox = document.getElementById('reviewLightbox');
    const reviewLightboxImg = document.getElementById('reviewLightboxImg');

    function openReviewPhoto(src) {
      reviewLightboxImg.src = src;
      reviewLightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeReviewPhoto() {
      reviewLightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    // ==================== HELPFUL TOGGLE ====================
    function toggleHelpful(btn) {
      const countSpan = btn.querySelector('.helpful-count');
      let count = parseInt(countSpan.textContent);
      const isLiked = btn.classList.contains('text-gold');
      if (isLiked) {
        btn.classList.remove('text-gold');
        btn.classList.add('text-muted');
        countSpan.textContent = count - 1;
      } else {
        btn.classList.add('text-gold');
        btn.classList.remove('text-muted');
        countSpan.textContent = count + 1;
      }
    }

    // ==================== ADD TO CART ====================
    function addToCart() {
      let cart = JSON.parse(localStorage.getItem('atc_cart') || '[]');
      const existing = cart.find(item => item.id === 'lg-1.5t-5s-2025');
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({
          id: 'lg-1.5t-5s-2025',
          name: 'LG 1.5 Ton 5-Star AI DUAL Inverter Split AC',
          price: 42990,
          image: 'https://images.unsplash.com/photo-1633334567410-87d1cda5c540?w=200&q=60',
          qty: 1
        });
      }
      localStorage.setItem('atc_cart', JSON.stringify(cart));
      updateCartBadge();
      showToast('Added to cart');
    }

    function addBundleToCart() {
      showToast('Bundle added to cart');
    }

    function updateCartBadge() {
      const cart = JSON.parse(localStorage.getItem('atc_cart') || '[]');
      const total = cart.reduce((sum, item) => sum + item.qty, 0);
      document.getElementById('cartBadge').textContent = total;
    }

    // ==================== TOAST ====================
    function showToast(message) {
      const toast = document.createElement('div');
      toast.className = 'fixed top-20 left-1/2 -translate-x-1/2 bg-inksub text-warm text-xs px-4 py-2.5 rounded-full border border-warm/10 shadow-xl z-[10001] opacity-0 transition-opacity duration-300';
      toast.textContent = message;
      document.body.appendChild(toast);
      requestAnimationFrame(() => toast.style.opacity = '1');
      setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
      }, 2000);
    }

    // ==================== SCROLL REVEAL ====================
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // ==================== INIT ====================
    updateCartBadge();
  