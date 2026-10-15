export default function decorate(block) {
  const ul = document.createElement('ul');
  block.querySelectorAll('picture').forEach((pic) => {
    const li = document.createElement('li');
    li.append(pic);
    ul.append(li);
  });
  block.replaceChildren(ul);
}
