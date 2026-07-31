

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
            danger: '#EF4444'
          },
          fontFamily: {
            display: ['Playfair Display', 'serif'],
            body: ['Inter', 'sans-serif']
          },
          maxWidth: {
            'lg': '448px'
          }
        }
      }
    }
  

    // ===== COUNTDOWN TIMER =====
    (function() {
      let totalSeconds = 4 * 3600 + 23 * 60 + 15; // 4h 23m 15s
      const hEl = document.getElementById('cd-h');
      const mEl = document.getElementById('cd-m');
      const sEl = document.getElementById('cd-s');

      function pad(n) { return n.toString().padStart(2, '0'); }

      function update() {
        totalSeconds--;
        if (totalSeconds < 0) {
          totalSeconds = 4 * 3600 + 23 * 60 + 15; // reset loop
        }
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        hEl.textContent = pad(h);
        mEl.textContent = pad(m);
        sEl.textContent = pad(s);
      }

      update();
      setInterval(update, 1000);
    })();

    // ===== HEADER SHADOW ON SCROLL =====
    (function() {
      const header = document.getElementById('header');
      window.addEventListener('scroll', function() {
        if (window.scrollY > 60) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }, { passive: true });
    })();

    // ===== PARALLAX HERO BACKGROUND =====
    (function() {
      const heroBg = document.querySelector('.hero-bg');
      if (!heroBg) return;
      window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        if (scrollY < 400) {
          heroBg.style.transform = 'translateY(' + (scrollY * 0.15) + 'px)';
        }
      }, { passive: true });
    })();

    // ===== SCROLL REVEAL (IntersectionObserver) =====
    (function() {
      const revealEls = document.querySelectorAll('.reveal');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

      revealEls.forEach(el => observer.observe(el));
    })();

    // ===== PINCODE CHECKER =====
    (function() {
      const input = document.getElementById('pincode-input');
      const btn = document.getElementById('pincode-check');
      const result = document.getElementById('pincode-result');

      const sameDayPincodes = ['122001', '122002', '122003', '122004', '122005', '122006', '122007', '122008', '122009', '122010', '122011', '122015', '122016', '122017', '122018', '110001', '110002', '110003', '110004', '110005', '110006', '110007', '110008', '110009', '110010', '110011', '110012', '110013', '110014', '110015', '110016', '110017', '110018', '110019', '110020', '110021', '110022', '110023', '110024', '110025', '110026', '110027', '110028', '110029', '110030', '110031', '110032', '110033', '110034', '110035', '110036', '110037', '110038', '110039', '110040', '110041', '110042', '110043', '110044', '110045', '110046', '110047', '110048', '110049', '110050', '110051', '110052', '110053', '110054', '110055', '110056', '110057', '110058', '110059', '110060', '110061', '110062', '110063', '110064', '110065', '110066', '110067', '110068', '110069', '110070', '110071', '110072', '110073', '110074', '110075', '110076', '110077', '110078', '110079', '110080', '110081', '110082', '110083', '110084', '110085', '110086', '110087', '110088', '110089', '110090', '110091', '110092', '110093', '110094', '110095', '110096', '201301', '201302', '201303', '201304', '201305', '201306', '201307', '201308', '201309', '201310'];

      function check() {
        const val = input.value.trim();
        if (!/^\d{6}$/.test(val)) {
          result.classList.remove('hidden');
          result.className = 'mt-3 text-sm text-danger';
          result.textContent = 'Please enter a valid 6-digit pincode';
          return;
        }
        if (sameDayPincodes.includes(val)) {
          result.classList.remove('hidden');
          result.className = 'mt-3 text-sm text-success';
          result.textContent = '✓ Same-day delivery available for pincode ' + val;
        } else {
          result.classList.remove('hidden');
          result.className = 'mt-3 text-sm text-warmdim';
          result.textContent = 'Delivery in 1-2 days for pincode ' + val;
        }
      }

      btn.addEventListener('click', check);
      input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') check();
      });
    })();
  