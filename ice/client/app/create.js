// tell us the page
console.log('we are on the add page');

// assign a handler
document.getElementById('animal-form')
    .addEventListener('submit', submitAnimalForm);

// create a handler to deal with submit event
async function submitAnimalForm ( event ) {
    // prevent the default action from happening
    event.preventDefault();
    // get a reference to the form
    const animalForm = event.target;  
    // validate the form
    const valid = validateAnimalForm(animalForm);
    // proceed if the form is valid
    if (valid) {
        console.log('were good');
        
        const formData = new FormData(animalForm);
        //creating javascript object to hold the form data
        const animalObject = {};
        formData.forEach((value, key) => {

            // form is string 
            if(key === 'eyes' || key ==='legs'){
                animalObject[key] = Number(value);
            }
            else{
                animalObject[key] = value;
            }
        });

        const eleNameError = animalForm.name.nextElementSibling
        try {
            await animalService.saveAnimal(animalObject)
            eleNameError.classList.add('d-none');
            animalForm.reset();
            window.location = './list.html';
        } catch (error) {
            console.log(error);
            eleNameError.classList.remove('d-none');
            eleNameError.textContent = "This animal already exists!";
        }        

    } else {
        console.log('were not good');
    }
}

// animal form validation
function validateAnimalForm ( form ) {
    console.log('validating')
    let valid = true;
    
    const name = form.name.value;
    const eleNameError = form.name.nextElementSibling
    if (name == "") {
        eleNameError.classList.remove('d-none');
        eleNameError.textContent = "You must name this animal!";
        valid = false;
    } else {
        eleNameError.classList.add('d-none');
    }

    // add validation 
    return valid
}