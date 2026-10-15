export default function decorate(block) {
  [...block.children].forEach((row, i) => {
    const [label, body] = [...row.children];
    if (!label || !body) return;
    const summary = document.createElement('summary');
    summary.className = 'accordion-item-label';
    summary.append(...label.childNodes);
    body.className = 'accordion-item-body';
    const details = document.createElement('details');
    details.className = 'accordion-item';
    if (i === 0) details.open = true;
    details.append(summary, body);
    row.replaceWith(details);
  });
}
