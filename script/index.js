const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.error(error));
}
const displayCategories = (categories) => {
    
    const cardContainer = document.getElementById('card_container');
    cardContainer.innerHTML = '';
    for (let category of categories) {
        const loadDiv = document.createElement('div');
        loadDiv.innerHTML = `
        <button class="btn btn-xs sm:btn-sm  xl:btn-xl lg:w-[250px] mb-4">${category.category_name}</button>
       `
        cardContainer.append(loadDiv)
    }

}
const loadPlant = () => {
    fetch('https://openapi.programming-hero.com/api/plants')
        .then(res => res.json())
        .then(data => displayPlant(data.plants))
}
const displayPlant = (plants) => {
    const plantContainer = document.getElementById('plant_container');
    
     plants.forEach(plant => {
      const plantDiv = document.createElement('div');
      plantDiv.innerHTML = `
      
      `
      plantContainer.append(plantDiv)
        
     });
   

  
    

}
loadCategories()
loadPlant()