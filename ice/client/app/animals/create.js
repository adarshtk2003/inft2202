// Function to validate the form
function validateAnimalForm(form) {
    let isValid = true;

    // Clear general error message
    const messageBox = document.getElementById('message-box');
    messageBox.classList.add('d-none');
    messageBox.textContent = '';

    // Validation logic for each field
    ['breed', 'name', 'eyes', 'legs', 'sound'].forEach((fieldName) => {
        const input = form[fieldName];
        const errorField = input.nextElementSibling;
        const value = input.value.trim();

        if (!value) {
            isValid = false;
            errorField.textContent = `${fieldName} is required.`;
            errorField.classList.remove('d-none');
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
        } else {
            errorField.textContent = '';
            errorField.classList.add('d-none');
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        }

        // Additional validations (e.g., numeric fields)
        if ((fieldName === 'eyes' || fieldName === 'legs') && isValid) {
            if (isNaN(value) || Number(value) <= 0) {
                isValid = false;
                errorField.textContent = `${fieldName} must be a positive number.`;
                errorField.classList.remove('d-none');
                input.classList.add('is-invalid');
                input.classList.remove('is-valid');
            }
        }
    });

    return isValid;
}

// Function to handle form submission
function submitAnimalForm(event) {
    event.preventDefault();
    const form = event.target;

    if (validateAnimalForm(form)) {
        // If valid, print form values and reset form
        const animalData = {
            breed: form.breed.value,
            name: form.name.value,
            eyes: form.eyes.value,
            legs: form.legs.value,
            sound: form.sound.value,
        };

        console.log('Animal Data:', animalData);
        form.reset();

        // Reset form validation styles
        ['breed', 'name', 'eyes', 'legs', 'sound'].forEach((fieldName) => {
            form[fieldName].classList.remove('is-valid');
        });

        alert('Animal successfully created!');
    } else {
        // Show general error message
        const messageBox = document.getElementById('message-box');
        messageBox.textContent = 'Please fix the errors in the form before submitting.';
        messageBox.classList.remove('d-none');
    }
}

// Attach submit event handler
const animalForm = document.getElementById('animal-form');
animalForm.addEventListener('submit', submitAnimalForm);
