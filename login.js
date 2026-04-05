const form = document.getElementById('userForm');
const card = document.getElementById('userCard');
const displayName = document.getElementById('displayName');
const displayEmail = document.getElementById('displayEmail');
const displayRole = document.getElementById('displayRole');
const displayMessage = document.getElementById('displayMessage');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const role = form.role.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !role || !message) {
        return;
    }

    displayName.textContent = name;
    displayEmail.textContent = email;
    displayRole.textContent = role;
    displayMessage.textContent = message;

    card.classList.remove('hidden');
    card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    form.reset();
});
