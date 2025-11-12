// Hamburger menu
(function () {
  const btn = document.getElementById('menu-toggle');
  const nav = document.getElementById('primary-nav');
  if (!btn || !nav) return;
  nav.classList.remove('open');
  btn.setAttribute('aria-expanded', 'false');
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
})();
// Volunteer form
function clearForm() {
  const form = document.getElementById("myForm");
  const name = form.querySelector("#vf-name").value.trim();
  const email = form.querySelector("#vf-email").value.trim();
  const skills = form.querySelector("#vf-skills").value.trim();
  const message = form.querySelector("#vf-message").value.trim();
  if (name === "" || email === "" || skills === "" || message === "") {
    alert("⚠️ Please fill out all required fields before submitting.");
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("❌ Please enter a valid email address.");
    return;
  }
  form.reset();
  console.log("Form reset");
  alert("✅ Submission complete! Thank you for volunteering.");
}
// ===== Donate page logic =====
(function(){
  const form = document.getElementById('donateForm');
  if(!form) return;
  const chips = Array.from(document.querySelectorAll('.donate-chip'));
  const custom = document.getElementById('donateCustom');
  const submit = document.getElementById('donateSubmit');
  function setActive(amount){
    chips.forEach(c => c.classList.toggle('active', Number(c.dataset.amount) === amount));
  }
  function getAmount(){
    const active = chips.find(c => c.classList.contains('active'));
    if (active) return Number(active.dataset.amount);
    const v = custom.value.replace(/[^\d.]/g,'');
    return v ? Number(v) : 0;
  }
  function updateState(){
    if (document.activeElement === custom) chips.forEach(c=>c.classList.remove('active'));
    const amt = getAmount();
    submit.disabled = !(amt > 0);
  }
  chips.forEach(c => c.addEventListener('click', () => {
    const val = Number(c.dataset.amount);
    const isActive = c.classList.contains('active');
    chips.forEach(x => x.classList.remove('active'));
    custom.value = '';
    if (!isActive) c.classList.add('active');
    updateState();
  }));
  custom.addEventListener('input', updateState);
  custom.addEventListener('focus', () => chips.forEach(c=>c.classList.remove('active')));
  window.handleDonateSubmit = function(e){
    e.preventDefault();
    const amount = getAmount();
    if (!(amount > 0)) {
      alert('Please select or enter a donation amount.');
      return false;
    }
    alert(`Thank you for donating £${amount.toFixed(2)} securely!`);
    chips.forEach(c=>c.classList.remove('active'));
    custom.value = '';
    updateState();
    return false;
  };
  updateState();
})();
// ===== Contact page =====
function contactSubmit() {
  const form = document.getElementById('contactForm');
  const name = form.querySelector('#ct-name').value.trim();
  const email = form.querySelector('#ct-email').value.trim();
  const message = form.querySelector('#ct-message').value.trim();

  if (!name || !email || !message) {
    alert('Please fill out your name, email, and message.');
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return false;
  }
  form.reset();
  alert('Thanks for your message. We will get back to you soon.');
  return false;
}