'use strict';

const landscapes = {
  alpine: {
    title: 'A higher perspective', label: 'The high country', category: 'High country · Fresh air & far horizons',
    small: 'assets/alpine-768.webp', large: 'assets/alpine-1920.webp', width: 1920,
    alt: 'Sunlight falls across green alpine slopes surrounding a blue mountain lake.',
    description: 'The lake holds a little piece of the sky. Above it, green slopes rise into a tangle of ridgelines. It’s the kind of scene that makes everything feel a bit more spacious — even the thoughts that followed you here.',
    prompt: 'Pause here: follow the ridgeline all the way to the horizon.'
  },
  coast: {
    title: 'The quieter coast', label: 'The quieter coast', category: 'Coast · Saltwater & slow days',
    small: 'assets/coast-768.webp', large: 'assets/coast-1600.webp', width: 1600,
    alt: 'Clear turquoise water curls around a pale rocky cove.',
    description: 'Pale stone, clear water, and a shoreline with nowhere urgent to go. Picture an afternoon measured by the changing light. A little salt in the air. The soft rhythm of water finding its way back to the rocks.',
    prompt: 'Pause here: find where the blue turns into green.'
  },
  dunes: {
    title: 'Somewhere in the stillness', label: 'The wide open', category: 'Wide open · Warm light & empty space',
    small: 'assets/dunes-768.webp', large: 'assets/dunes-1600.webp', width: 1600,
    alt: 'Soft coral dunes form sweeping curves under an open desert sky.',
    description: 'A curve of sand catches the last warm light. Another disappears into shadow. With so little in the frame, every line becomes something to notice. Just dunes, a wide sky, and room to let your attention wander.',
    prompt: 'Pause here: trace the line between sunlight and shadow.'
  }
};

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const menu = document.querySelector('#site-menu');
const menuToggle = document.querySelector('.menu-toggle');
const storyDialog = document.querySelector('#story-dialog');
const closeTimers = new WeakMap();

function syncScrollLock() {
  document.body.classList.toggle('dialog-open', Boolean(document.querySelector('dialog[open]')));
}

function openDialog(dialog) {
  if (dialog.open) return;
  dialog.classList.remove('is-closing');
  dialog.showModal();
  syncScrollLock();
}

function closeDialog(dialog, afterClose) {
  if (!dialog.open || closeTimers.has(dialog)) return;
  const finish = () => {
    dialog.close();
    dialog.classList.remove('is-closing');
    closeTimers.delete(dialog);
    syncScrollLock();
    if (afterClose) afterClose();
  };
  if (reducedMotion.matches) { finish(); return; }
  dialog.classList.add('is-closing');
  closeTimers.set(dialog, window.setTimeout(finish, dialog === menu ? 280 : 200));
}

menuToggle.addEventListener('click', () => {
  openDialog(menu);
  menuToggle.setAttribute('aria-expanded', 'true');
});
document.querySelector('.menu-close').addEventListener('click', () => closeDialog(menu));
menu.addEventListener('close', () => {
  menuToggle.setAttribute('aria-expanded', 'false');
  syncScrollLock();
});

for (const dialog of [menu, storyDialog]) {
  dialog.addEventListener('cancel', event => {
    event.preventDefault();
    closeDialog(dialog);
  });
  dialog.addEventListener('close', syncScrollLock);
}

document.querySelectorAll('.overlay-nav a').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    closeDialog(menu, () => {
      if (!target) return;
      history.pushState(null, '', link.getAttribute('href'));
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      target.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start' });
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    });
  });
});

const filters = [...document.querySelectorAll('.filter')];
const cards = [...document.querySelectorAll('.landscape-card')];
filters.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filters.forEach(item => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    let visible = 0;
    cards.forEach(card => {
      card.hidden = filter !== 'all' && card.dataset.landscape !== filter;
      if (!card.hidden) visible++;
    });
    document.querySelector('.landscape-grid').classList.toggle('is-filtered', filter !== 'all');
    document.querySelector('.view-count').textContent = `${visible} ${visible === 1 ? 'place' : 'places'} to pause`;
  });
});

const storyOrder = ['coast', 'alpine', 'dunes'];
let currentStory = 'coast';

function updateStory(key) {
  const story = landscapes[key];
  if (!story) return;
  currentStory = key;
  const image = document.querySelector('#story-image');
  image.alt = story.alt;
  image.sizes = '(max-width: 760px) 100vw, 1050px';
  image.srcset = `${story.small} 768w, ${story.large} ${story.width}w`;
  image.src = story.large;
  document.querySelector('#story-title').textContent = story.title;
  document.querySelector('#story-category').textContent = story.category;
  document.querySelector('#story-description').textContent = story.description;
  document.querySelector('#story-prompt').textContent = story.prompt;
  storyDialog.scrollTop = 0;
}

document.querySelectorAll('[data-story]').forEach(button => {
  button.addEventListener('click', () => {
    updateStory(button.dataset.story);
    openDialog(storyDialog);
    document.querySelector('.story-close').focus();
  });
});
document.querySelector('.story-close').addEventListener('click', () => closeDialog(storyDialog));
document.querySelector('.next-story').addEventListener('click', () => {
  const next = storyOrder[(storyOrder.indexOf(currentStory) + 1) % storyOrder.length];
  updateStory(next);
  const heading = document.querySelector('#story-title');
  heading.setAttribute('tabindex', '-1');
  heading.focus({ preventScroll: true });
  heading.addEventListener('blur', () => heading.removeAttribute('tabindex'), { once: true });
});
storyDialog.addEventListener('click', event => {
  if (event.target !== storyDialog) return;
  const rect = storyDialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeDialog(storyDialog);
});

const sceneOrder = ['alpine', 'coast', 'dunes'];
let sceneIndex = 0;
let sceneRequest = 0;
let sceneTimer;
const heroImage = document.querySelector('#hero-image');

function changeScene(direction) {
  clearTimeout(sceneTimer);
  heroImage.classList.remove('is-switching');
  sceneIndex = (sceneIndex + direction + sceneOrder.length) % sceneOrder.length;
  const request = ++sceneRequest;
  const story = landscapes[sceneOrder[sceneIndex]];
  const preload = new Image();
  preload.sizes = heroImage.sizes;
  preload.srcset = `${story.small} 768w, ${story.large} ${story.width}w`;
  preload.src = story.large;
  const apply = () => {
    if (request !== sceneRequest) return;
    clearTimeout(sceneTimer);
    heroImage.classList.add('is-switching');
    sceneTimer = window.setTimeout(() => {
      if (request !== sceneRequest) return;
      heroImage.srcset = preload.srcset;
      heroImage.src = story.large;
      heroImage.alt = story.alt;
      const label = document.querySelector('#scene-label');
      const count = document.createElement('span');
      count.className = 'scene-number';
      count.textContent = `0${sceneIndex + 1} / 03`;
      label.replaceChildren(count, document.createTextNode(story.label));
      heroImage.classList.remove('is-switching');
    }, reducedMotion.matches ? 0 : 170);
  };
  if (preload.complete && preload.naturalWidth) apply();
  else preload.addEventListener('load', apply, { once: true });
  preload.addEventListener('error', () => {
    if (request !== sceneRequest) return;
    heroImage.classList.remove('is-switching');
    document.querySelector('#scene-label').textContent = 'View unavailable. Try the next one.';
  }, { once: true });
}

document.querySelector('.previous-scene').addEventListener('click', () => changeScene(-1));
document.querySelector('.next-scene').addEventListener('click', () => changeScene(1));
