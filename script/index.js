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
        <button class="btn lg:w-[200px] mb-4 lesson_btn" 
        id="categoryBtn-${category.id}" 
        onclick="loadshowCategory(${category.id})"
        >
        ${category.category_name}
        </button>
       `
        cardContainer.append(loadDiv)
    }

}
// category found in id
const loadshowCategory = (id) =>{
       const url = (`https://openapi.programming-hero.com/api/category/${id}`)
       fetch(url)
       .then(res => res.json())
       .then(data => {
            // remove active
            removeActive()
            // Hide all plants container
            document.getElementById('plant_container').style.display = 'none';
            const clickBtn = document.getElementById(`categoryBtn-${id}`);
           clickBtn.classList.add('active');           
            displayShowCategories(data.plants);
        });
};
// remove active
const removeActive = () =>{
    const categoryBtn = document.querySelectorAll('.lesson_btn');
    console.log(categoryBtn);
    categoryBtn.forEach(btn => btn.classList.remove('active'))
}
 const displayShowCategories = (plants) =>{
   
     const categoryContainer = document.getElementById('category_container');
     categoryContainer.innerHTML = '';
   
     
   plants.forEach(plant => {
     const fixedImage = plant.image.replace("ibb.co.com", "ibb.co");
      const plantDiv = document.createElement('div');
      plantDiv.innerHTML = `
          <div class="bg-base-200 shadow-sm p-3" data-price="${plant.price}">
                    <figure class="h-[200px]">
                        <img src="${fixedImage}"
                            alt="${plant.image}" class="h-full w-full object-cover"/>
                    </figure>
                    <div class="mt-3">
                        <h2 class="text-[#1F2937] text-[14px] font-semibold font-inter mb-3" onclick="loadPlantsDetail(${plant.id})">${plant.name} </h2>
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
     categoryContainer.append(plantDiv);
   });


}

const loadPlant = () => {
    fetch('https://openapi.programming-hero.com/api/plants')
        .then(res => res.json())
        .then(data => displayPlant(data.plants))
}
const displayPlant = (plants) => {
    
    const plantContainer = document.getElementById('plant_container');

     plantContainer.innerHTML = '';
    plants.forEach(plant => {
         const fixedImage = plant.image.replace("ibb.co.com", "ibb.co");
        const plantDiv = document.createElement('div');
        plantDiv.innerHTML = `
      <div class="bg-base-200 shadow-sm p-3" data-price="${plant.price}">
                    <figure class="h-[200px]">
                        <img src="${fixedImage}"
                            alt="${plant.image}" class="h-full w-full object-cover"/>
                    </figure>
                    <div class="mt-3">
                        <h2 class="text-[#1F2937] text-[14px] font-semibold font-inter mb-3" onclick="loadPlantsDetail(${plant.id})">${plant.name} </h2>
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
                            <button class="w-full bg-[#15803D] rounded-[15px] py-3 text-[16px] font-inter font-medium text-[#fff]" >Add to Cart</button>
                        </div>
                    </div>
                </div>
      
      `
        plantContainer.append(plantDiv)

    });





}
// details function
const loadPlantsDetail = async(id) =>{
    const url = (`https://openapi.programming-hero.com/api/plant/${id}`);
    const res = await fetch(url);
    const data = await res.json();
    displayPlantDetails(data.plants)
      
}
const displayPlantDetails = (plants) =>{
  console.log(plants);
   const fixedImage = plants.image.replace("ibb.co.com", "ibb.co");
  const detailsContainer = document.getElementById("details_container");
  detailsContainer.innerHTML = ` 

     <div>
        <h2 class="text-[#1F2937] text-[14px] font-semibold font-inter mb-3">${plants.name}</h2>
           <figure class="h-[200px]">
                        <img src="${fixedImage}"
                            alt="${plants.image}" class="h-full w-full object-cover"/>
            </figure>
            <h4 class="text-[#1F2937] text-[14px] font-semibold font-inter mb-3 mt-4">
            <span class="font-bold">Category:</span>
            ${plants.category}
            </h4>
            <h3 class="text-[#1F2937] text-[14px] font-semibold font-inter mb-3">
            <span class="font-bold">Price:</span>
            ${plants.price}</h3>
            <p class="text-[#1F2937] text-[16px] leading-6 font-inter mb-3"><span class="font-bold">Descriptation:</span> ${plants.description}</p>
    </div>
     `;
  document.getElementById('detail_modal').showModal();
}
// 
// Show all plants again
const showAllPlants = () => {
    document.getElementById('plant_container').style.display = 'grid';
    document.getElementById('category_container').style.display = 'none';
};
// All plant show end
// add to cart

const cart = [];

// Update cart
const updateCart = () => {
    const cartContainer = document.getElementById('cart_items');
    cartContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const div = document.createElement('div');
        div.classList.add('p-[5px]', 'bg-[#F0FDF4]', 'rounded', 'mb-2');
        div.innerHTML = `
            <h4 class="text-[#1F2937] text-[14px] font-semibold ml-1">${item.name}</h4>
            <p class="text-[#1F2937] ml-1">৳ ${item.price}</p>
            <button onclick="removeFromCart(${index})">X</button>
        `;
        cartContainer.appendChild(div);
    });

    document.getElementById('cart_total').textContent = `Total: ৳ ${total}`;
};

// Remove from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Add listener to container
const addCartListeners = (containerId) => {
    const container = document.getElementById(containerId);

    container.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON' && e.target.textContent === 'Add to Cart') {
            const card = e.target.closest('.bg-base-200');
            if (!card) return;

            const name = card.querySelector('h2').textContent;
            const price = Number(card.dataset.price); // Important!

            cart.push({ name, price });
            updateCart();
        }
    });
};

// Apply to both containers
addCartListeners('plant_container');
addCartListeners('category_container');


// ********************************
loadCategories()
loadPlant()
loadPlantsDetail()