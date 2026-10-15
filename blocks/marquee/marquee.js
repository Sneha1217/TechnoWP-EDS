export default function decorate(block) {
  const items = [...block.querySelectorAll('li')].map((li) => li.textContent.trim()).filter(Boolean);
  if (!items.length) return;
  const track = document.createElement('div');
  track.className = 'marquee-track';
  // duplicate content so the loop is seamless
  [0, 1].forEach((n) => {
    const group = document.createElement('ul');
    if (n) group.setAttribute('aria-hidden', 'true');
    items.forEach((text) => {
      const li = document.createElement('li');
      li.textContent = text;
      group.append(li);
    });
    track.append(group);
  });
  block.replaceChildren(track);
}
