export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    const [imgCell, textCell] = [...row.children];
    if (imgCell && imgCell.querySelector('picture, img')) {
      imgCell.className = 'testimonials-photo';
      li.append(imgCell);
    }
    if (textCell) {
      textCell.className = 'testimonials-body';
      li.append(textCell);
    } else if (imgCell && !imgCell.querySelector('picture, img')) {
      imgCell.className = 'testimonials-body';
      li.append(imgCell);
    }
    ul.append(li);
  });
  block.replaceChildren(ul);
}
