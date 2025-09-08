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
        <button class="btn lg:w-[200px] mb-4">${category.category_name}</button>
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
      <div class="bg-base-200  shadow-sm p-3">
                    <figure class="h-[200px]">
                        <img src="${plant.image}"
                            alt="${plant.image}" class="h-full w-full object-cover"/>
                    </figure>
                    <div class="mt-3">
                        <h2 class="text-[#1F2937] text-[14px] font-semibold font-inter mb-3">${plant.name} </h2>
                        <p class="text-[#1F2937] text-xs font-inter mb-3">${plant.description.length > 80 ? plant.description.slice(0, 80) + '...' : plant.description}
                        </p>
                        
                        <div class="flex justify-between">
                           <div class="badge bg-[#DCFCE7] text-[#15803D] text-[14px] font-medium">
                           ${plant.category}
                           </div>
                           <div class="badge text-[#1F2937] text-[14px] font-semibold font-inter">
                          ${plant.price}
                          </div>
                          </div>
                        
                        <div class="mt-3">
                            <button class="w-full bg-[#15803D] rounded-[15px] py-3 text-[16px] font-inter font-medium text-[#fff]">Add to Cart</button>
                        </div>
                    </div>
                </div>
      
      `
        plantContainer.append(plantDiv)

    });





}
loadCategories()
loadPlant()