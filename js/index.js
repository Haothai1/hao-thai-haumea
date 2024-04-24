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