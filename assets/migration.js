'use strict';
(() => {
  const nav = document.querySelector('nav');
  const toggle = document.querySelector('.navToggle');
  const setNav = open => {
    nav.classList.toggle('active', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.querySelector('.navList').setAttribute('aria-hidden', String(!open));
  };
  toggle.setAttribute('role', 'button'); toggle.tabIndex = 0;
  toggle.setAttribute('aria-label', 'Menu'); toggle.setAttribute('aria-expanded', 'false');
  document.querySelector('.navList').setAttribute('aria-hidden', 'true');
  toggle.addEventListener('click', () => setNav(!nav.classList.contains('active')));
  toggle.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle.click(); } });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setNav(false); });
  document.querySelectorAll('.navList a').forEach(a => a.addEventListener('click', () => setNav(false)));
  if (matchMedia('(pointer:coarse)').matches) {
    document.body.classList.replace('desktop', 'mobile');
    document.querySelectorAll('.thumb').forEach(a => a.classList.add('hovering'));
  }
  const curtain = document.querySelector('#curtains');
  if (curtain) {
    const main = document.querySelector('main');
    curtain.style.position = 'fixed'; curtain.style.inset = '0'; curtain.style.zIndex = '3';
    main.classList.add('fixed');
    const spacer = document.createElement('div'); spacer.style.height = `${innerHeight * 3}px`; document.body.append(spacer);
    let done = false;
    const reveal = () => {
      if (done) return;
      const distance = scrollY * 1.3;
      curtain.style.transform = `translateY(${-distance}px)`;
      main.style.transform = `translateY(${innerHeight / 1.3}px)`;
      if (distance >= innerHeight) {
        done = true; main.classList.remove('fixed'); main.style.transform = '';
        curtain.remove(); spacer.remove(); scrollTo(0, 0); removeEventListener('scroll', reveal);
      }
    };
    addEventListener('scroll', reveal, {passive: true});
    addEventListener('resize', () => { if (!done) spacer.style.height = `${innerHeight * 3}px`; });
    const arrow = curtain.querySelector('.scrollDown');
    arrow.setAttribute('role', 'button'); arrow.tabIndex = 0; arrow.setAttribute('aria-label', 'View work');
    arrow.addEventListener('click', () => scrollTo({top: innerHeight, behavior: 'smooth'}));
    arrow.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') arrow.click(); });
  }
  document.querySelectorAll('carbon-player').forEach(el => {
    let player;
    const init = () => {
      if (!player) {
        player = Carbon.MediaPlayer.get(el);
        el.querySelectorAll('.playToggle,.muteToggle,.fullscreenToggle').forEach((control, i) => {
          control.setAttribute('role', 'button'); control.tabIndex = 0;
          control.setAttribute('aria-label', control.classList.contains('playToggle') ? 'Play or pause' : control.classList.contains('muteToggle') ? 'Mute or unmute' : 'Fullscreen');
          control.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); control.click(); } });
        });
      }
      return player;
    };
    const poster = el.querySelector('.posterPlay');
    poster.setAttribute('role', 'button'); poster.tabIndex = 0; poster.setAttribute('aria-label', 'Play video');
    const firstPlay = e => {
      if (player) return;
      e.stopImmediatePropagation(); init().play();
    };
    el.addEventListener('click', firstPlay, true);
    poster.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); poster.click(); } });
    el.addEventListener('player:play', () => el.closest('carbon-piece').classList.add('played'));
    const video = el.querySelector('video');
    if (new URLSearchParams(location.search).has('qa')) video.muted = true;
    video.addEventListener('error', () => {
      const message = el.closest('carbon-piece').querySelector('.video-error') || document.createElement('p');
      message.className = 'video-error'; message.textContent = '影片載入失敗，請重新整理後再試。'; el.closest('carbon-piece').append(message);
    });
  });
  const form = document.querySelector('#contactForm');
  if (form) {
    form.querySelectorAll('input,textarea').forEach(input => {
      const refresh = () => input.closest('.field').classList.toggle('empty', !input.value);
      input.addEventListener('input', refresh); refresh();
      input.setAttribute('aria-label', input.placeholder);
    });
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const values = new FormData(form);
      const subject = `PUMP Advertising inquiry — ${values.get('name')}`;
      const body = `Name: ${values.get('name')}\nEmail: ${values.get('email')}\n\n${values.get('body')}`;
      location.href = `mailto:willychen.pump@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }
})();
