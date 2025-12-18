// Small interactive scripts: nav toggle, smooth scroll, gallery lightbox, year
document.addEventListener('DOMContentLoaded', function(){
  // set year
  var y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();

  // nav toggle for small screens
  var nav = document.getElementById('mainNav');
  var toggle = document.getElementById('navToggle');
  if(toggle && nav){
    toggle.addEventListener('click', function(){
      var shown = nav.style.display === 'flex';
      nav.style.display = shown ? 'none' : 'flex';
      toggle.setAttribute('aria-expanded', !shown);
    });
  }

  // smooth scroll for anchors
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var target = this.getAttribute('href');
      if(target.length>1){
        var el = document.querySelector(target);
        if(el){
          e.preventDefault();
          el.scrollIntoView({behavior:'smooth',block:'start'});
          // hide nav on mobile after click
          if(window.innerWidth <= 900 && nav){ nav.style.display = 'none'; }
        }
      }
    });
  });

  // gallery lightbox
  var galleryItems = document.querySelectorAll('.gallery-item');
  var lightbox = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImage');
  var lbClose = document.getElementById('lbClose');

  function openLB(src, alt){
    if(!lightbox || !lbImg) return;
    lbImg.src = src;
    lbImg.alt = alt || '';
    lightbox.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function closeLB(){
    if(!lightbox || !lbImg) return;
    lightbox.setAttribute('aria-hidden','true');
    lbImg.src = '';
    document.body.style.overflow = '';
  }

  galleryItems.forEach(function(btn){
    btn.addEventListener('click', function(){
      var src = btn.dataset.src || (btn.querySelector('img') && btn.querySelector('img').src);
      var alt = (btn.querySelector('img') && btn.querySelector('img').alt) || '';
      if(src) openLB(src, alt);
    });
  });

  if(lbClose) lbClose.addEventListener('click', closeLB);
  if(lightbox) lightbox.addEventListener('click', function(e){ if(e.target === lightbox) closeLB(); });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeLB(); });
});
