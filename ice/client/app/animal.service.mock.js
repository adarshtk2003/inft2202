/*
 *  Service constructor
 */
function AnimalService() {
    function initAnimals() {
        let animals = [];
        let index = 0;
        while (animals.length < 300) {
            animals.push({
                "name": `name ${index++}`,
                "breed": "Grizzly Bear",
                "legs": 4,
                "eyes": 2,
                "sound": "Moo"
            });
        }
        return animals;
    }
    // if there is no entry for animals in local storage
    if (!localStorage.getItem('animals')) {
        // create a new entry in local storage and put an empty array in it        
        localStorage.setItem('animals', JSON.stringify([]));
    }
}

/*
 *
 */
AnimalService.prototype.getAnimals = function () {
    return JSON.parse(localStorage.getItem('animals'));
}

AnimalService.prototype.getAnimalPage = function (pagination) {
    const animals = this.getAnimals();
    const start = pagination.pageNumber * pagination.pageSize;
    const end = start + pagination.pageSize;
    return {
        pagination,
        records: animals.slice(start, end)
    };
}

/*
 *
 */
AnimalService.prototype.saveAnimal = function (animal) {
    const animals = this.getAnimals();
    if (animals.find(a => a.name == animal.name)) {
        throw new Error('An animal with that name already exists!');
    }
    animals.push(animal);
    localStorage.setItem('animals', JSON.stringify(animals));
    return true;
}

/*
 *
 */
AnimalService.prototype.findAnimal = function (animalName) {
    const animals = this.getAnimals();
    const animal = animals.find(a => a.name === animalName);
    if (!animal) {
        throw new Error('Animal not found!');
    }
    return animal;
}

/*
 *
 */
AnimalService.prototype.updateAnimal = function (animal) {
    const animals = this.getAnimals();
    const idx = animals.findIndex(a => a.name === animal.name);
    if (idx === -1) {
        throw new Error('That animal does not exist!');
    }
    animals[idx] = animal; // Update the animal
    localStorage.setItem('animals', JSON.stringify(animals));
    return true;
}

/*
 *
 */
AnimalService.prototype.deleteAnimal = function (animal) {
    const animals = this.getAnimals();
    const idx = animals.findIndex(a => a.name == animal.name);
    if (idx === -1) {
        throw new Error('That animal does not exist!');
    }
    animals.splice(idx, 1);
    localStorage.setItem('animals', JSON.stringify(animals));
    return true;
}

const animalService = new AnimalService();