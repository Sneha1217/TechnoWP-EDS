export default function decorate(block) {
  const ul = document.createElement('ul');
  const rows = [...block.children];
  rows.forEach((row, i) => {
    const li = document.createElement('li');
    const body = document.createElement('div');
    body.className = 'pricing-body';
    row.querySelectorAll(':scope > div').forEach((cell) => body.append(...cell.childNodes));
    li.append(body);
    if (i === Math.floor(rows.length / 2) && rows.length > 2) li.classList.add('pricing-featured');
    ul.append(li);
  });
  block.replaceChildren(ul);
}
