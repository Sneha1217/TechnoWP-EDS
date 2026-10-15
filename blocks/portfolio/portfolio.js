import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  const cats = new Set();
  [...block.children].forEach((row) => {
    const [imgCell, titleCell, catCell] = [...row.children];
    const li = document.createElement('li');
    const list = (catCell?.textContent || '').split(',').map((c) => c.trim()).filter(Boolean);
    list.forEach((c) => cats.add(c));
    li.dataset.categories = list.join('|');
    if (imgCell) {
      imgCell.className = 'portfolio-image';
      imgCell.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
      li.append(imgCell);
    }
    const caption = document.createElement('div');
    caption.className = 'portfolio-caption';
    if (titleCell) caption.append(...titleCell.childNodes);
    const tags = document.createElement('span');
    tags.textContent = list.join(' · ');
    caption.append(tags);
    li.append(caption);
    ul.append(li);
  });

  const filters = document.createElement('div');
  filters.className = 'portfolio-filters';
  ['All Work', ...cats].forEach((name, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = name;
    btn.setAttribute('aria-pressed', i === 0);
    btn.addEventListener('click', () => {
      filters.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', b === btn));
      ul.querySelectorAll('li').forEach((li) => {
        li.hidden = i !== 0 && !li.dataset.categories.split('|').includes(name);
      });
    });
    filters.append(btn);
  });
  block.replaceChildren(filters, ul);
}
