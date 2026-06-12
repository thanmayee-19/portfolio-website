async function fetchContacts() {
    const res = await fetch("http://localhost:5000/contacts");
    const data = await res.json();

    const container = document.getElementById("adminContainer");

    data.forEach(contact => {
        const div = document.createElement("div");
        div.classList.add("admin-card");

        div.innerHTML = `
            <h3>${contact.name}</h3>
            <p><strong>Email:</strong> ${contact.email}</p>
            <p><strong>Message:</strong> ${contact.message}</p>
        `;

        container.appendChild(div);
    });
}

fetchContacts();
