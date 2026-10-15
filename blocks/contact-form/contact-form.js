/* Builds a simple form from block rows: each row = one field label/placeholder.
   Row starting with "Message" becomes a textarea; the last row is the submit label.
   Wire the form's submit handler to your own endpoint (EDS has no built-in form backend). */
export default function decorate(block) {
  const rows = [...block.children].map((r) => r.textContent.trim()).filter(Boolean);
  const submitLabel = rows.pop() || 'Submit Request';
  const form = document.createElement('form');
  form.noValidate = false;
  rows.forEach((label) => {
    const isMsg = /^message/i.test(label);
    const field = document.createElement(isMsg ? 'textarea' : 'input');
    field.placeholder = label;
    field.setAttribute('aria-label', label);
    field.name = label.toLowerCase().replace(/\W+/g, '-');
    if (!isMsg) field.type = /email/i.test(label) ? 'email' : 'text';
    if (isMsg) field.rows = 5;
    form.append(field);
  });
  const btn = document.createElement('button');
  btn.type = 'submit';
  btn.className = 'button';
  btn.textContent = submitLabel;
  form.append(btn);
  form.addEventListener('submit', (e) => e.preventDefault());
  block.replaceChildren(form);
}
