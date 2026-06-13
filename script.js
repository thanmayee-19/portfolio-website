document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});
function scrollToProjects() {
    document.getElementById('projects').scrollIntoView({
        behavior: 'smooth'
    });
}
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
    const triggerBottom = window.innerHeight * 0.8;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop < triggerBottom) {
            section.style.opacity = 1;
            section.style.transform = "translateY(0)";
        }
    });
});

//Add JavaScript to Send Data
document.getElementById("contactForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    const form = document.getElementById("contactForm");

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    try {

        const res = await fetch("http://localhost:5000/contact", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)

        });

        const result = await res.json();

       if (res.ok) {

    const messageBox = document.getElementById("responseMessage");

messageBox.style.display = "block";
messageBox.className = "";
messageBox.classList.add("success-message");
messageBox.innerText = result.message;

form.reset();

setTimeout(() => {

    messageBox.style.display = "none";

}, 3000);

       }
    else {

    const messageBox = document.getElementById("responseMessage");

    messageBox.style.display = "block";
    messageBox.className = "";
    messageBox.classList.add("error-message");

    messageBox.innerText = "Failed to send message.";

    setTimeout(() => {

        messageBox.style.display = "none";

    }, 3000);

}

}

    catch (error) {

        const messageBox = document.getElementById("responseMessage");

messageBox.style.display = "block";
messageBox.className = "";
messageBox.classList.add("error-message");
messageBox.innerText = "Something went wrong. Please try again.";

setTimeout(() => {

    messageBox.style.display = "none";

}, 3000);

    }

});

// //After succesfull submission
// document.getElementById("contactForm").reset();

// document.getElementById("topBtn").addEventListener("click", () => {
//     window.scrollTo({
//         top: 0,
//         behavior: "smooth"
//     });
// });