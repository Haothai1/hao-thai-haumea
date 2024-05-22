/* js/index.html */
// Make a Footer
const footer = document.createElement('footer');

// Append the footer to the body
document.body.appendChild(footer);

// Create date object and get the current year
const today = new Date();
const thisYear = today.getFullYear();

// Create a paragraph element for copyright
const copyright = document.createElement('p');

// Set the inner HTML with your name and the current year 
copyright.innerHTML = `© Hao Thai ${thisYear}`;

// Append the copyright paragraph to the footer
footer.appendChild(copyright);

const skills = ["JavaScript", "HTML", "CSS", "BootStrap", "TailWind CSS", "JQuery", "React", "MySQL", "Figma", "GitHub"];

// Select the skills section and the ul element within it
const skillsSection = document.querySelector('#skills');
const skillsList = skillsSection.querySelector('ul');

// Loop through the skills array and create list items
skills.forEach(skill => {
    const skillItem = document.createElement('li');
    skillItem.innerText = skill;
    skillsList.appendChild(skillItem);
});

// Message form

const messageForm = document.forms['leave_message'];

messageForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const usersName = event.target.usersName.value;
    const usersEmail = event.target.usersEmail.value;
    const usersMessage = event.target.usersMessage.value;

    addMessage(usersName, usersEmail, usersMessage);
    messageForm.reset();
    updateMessageVisibility();
});

// Hide #messages section, when the list is empty
function updateMessageVisibility() {
    const messageSection = document.getElementById('messages');
    const messageList = messageSection.querySelector('ul');
    // Check if there are any item in the list
    if (messageList.children.length === 0) {
        messageSection.style.display = 'none';
    } else {
        messageSection.style.display = 'block';
    }
}

// Call this function on page load and after any modification to the list
document.addEventListener('DOMContentLoaded', function () {
    updateMessageVisibility(); // Ensure visibility is checked on page load
});

function addMessage(name, email, message) {
    const messageList = document.getElementById('messages').querySelector('ul');
    const newMessage = document.createElement('li');
    newMessage.innerHTML = `<a href="mailto:${email}">${name}</a><span>: ${message}</span>`;

    // Create edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'edit';
    editButton.onclick = function () {
        const textarea = document.createElement('textarea');
        textarea.value = message;
        newMessage.replaceChild(textarea, newMessage.querySelector('span'));

        // Save button for the edited message
        const saveButton = document.createElement('button');
        saveButton.textContent = 'save';
        saveButton.onclick = function () {
            const span = document.createElement('span');
            span.textContent = `: ${textarea.value}`;
            newMessage.replaceChild(span, textarea);
            newMessage.appendChild(editButton);
            saveButton.remove();
        };

        newMessage.appendChild(saveButton);
        editButton.remove();
    };

    // Remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'remove';
    removeButton.onclick = function () {
        newMessage.remove();
        updateMessageVisibility();
    };

    newMessage.appendChild(editButton);
    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);
    updateMessageVisibility();
}

/* Fetch API */

// Load DOM content
document.addEventListener('DOMContentLoaded', function() {
    const projectSection = document.getElementById('Projects');
    const projectList = projectSection.querySelector('ul');

    fetch('https://api.github.com/users/Haothai1/repos')
        .then(response => {
            if (!response.ok) { 
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(repositories => {
            // Filter repositories based name
            return repositories.filter(repo => !repo.fork && repo.name !== "Haothai1" && repo.name !== "hao-thai-haumea");
        })
        .then(repositories => {
            // Iterate over each repository and create a list item
            repositories.forEach(repo => {
                const project = document.createElement('li'); 
                project.innerText = repo.name; 
                projectList.appendChild(project); 
            });
        })
        .catch(error => {
            console.error('Failed to fetch data:', error);
        });
});
