export default function decorate(block) {
  const ul = document.createElement('ul');

  // Extracts all 5 picture elements regardless of how da.live wrapped them
  const pictures = block.querySelectorAll('picture');

  pictures.forEach((pic) => {
    const li = document.createElement('li');
    li.append(pic);
    ul.append(li);
  });

  // Replaces the block's content with the clean list
  block.replaceChildren(ul);
}