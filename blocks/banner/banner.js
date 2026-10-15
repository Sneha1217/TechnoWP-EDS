export default function decorate(block) {
  const pic = block.querySelector('picture');
  if (pic) {
    const wrap = document.createElement('div');
    wrap.className = 'banner-bg';
    wrap.append(pic);
    block.prepend(wrap);
  }
  block.querySelectorAll(':scope > div:not(.banner-bg)').forEach((row) => row.classList.add('banner-content'));
}
