function AnimalsService() {
    this.storageKey = 'animals';
    
    // Initialize localStorage if it doesn't exist
    if (!localStorage.getItem(this.storageKey)) {
        localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
}


AnimalsService.prototype.listAnimals = function () {
    return JSON.parse(localStorage.getItem(this.storageKey));
};


AnimalsService.prototype.findAnimal = function (name) {
    const animals = this.listAnimals();
    const animal = animals.find(animal => animal.name === name);
    if (!animal) {
        throw new Error('That animal doesn\'t exist!');
    }
    return animal;
};

// Prototype method to add a new animal
AnimalsService.prototype.createAnimal = function (animal) {
    const animals = this.listAnimals();
    const exists = animals.some(existingAnimal => existingAnimal.name === animal.name);
    
    if (exists) {
        throw new Error('That animal already exists!');
    }
    
    animals.push(animal);
    localStorage.setItem(this.storageKey, JSON.stringify(animals));
    return true;
};


AnimalsService.prototype.updateAnimal = function (animal) {
    const animals = this.listAnimals();
    const index = animals.findIndex(existingAnimal => existingAnimal.name === animal.name);
    
    if (index !== -1) {
        animals[index] = animal;
        localStorage.setItem(this.storageKey, JSON.stringify(animals));
        return true;
    }
    
    return false;
};


AnimalsService.prototype.deleteAnimal = function (name) {
    const animals = this.listAnimals();
    const index = animals.findIndex(animal => animal.name === name);
    
    if (index !== -1) {
        animals.splice(index, 1);
        localStorage.setItem(this.storageKey, JSON.stringify(animals));
        return true;
    }
    
    return false;
};

// Export a new instance of AnimalsService
export default new AnimalsService();
