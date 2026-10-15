function animate(el, target) {
  const duration = 1400;
  const start = performance.now();
  const tick = (now) => {
    const t = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(target * (1 - (1 - t) ** 3));
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const [numCell, labelCell] = [...row.children];
    const li = document.createElement('li');
    const raw = (numCell?.textContent || '').trim();
    const target = parseInt(raw.replace(/\D/g, ''), 10) || 0;
    const num = document.createElement('span');
    num.className = 'stats-number';
    num.textContent = raw;
    const plus = document.createElement('span');
    plus.className = 'stats-plus';
    plus.textContent = '+';
    const label = document.createElement('span');
    label.className = 'stats-label';
    label.textContent = (labelCell?.textContent || '').trim();
    li.append(num, plus, label);
    li.dataset.target = target;
    ul.append(li);
  });
  block.replaceChildren(ul);

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      ul.querySelectorAll('li').forEach((li) => animate(li.querySelector('.stats-number'), Number(li.dataset.target)));
    });
  }, { threshold: 0.4 });
  io.observe(block);
}
