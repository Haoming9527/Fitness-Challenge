const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
  
    const PetList = document.getElementById("PetList");
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");


    
    responseData.forEach((pet) => {
      const displayItem = document.createElement("div");
      displayItem.className =
        "col-xl-4 col-lg-4 col-md-6 col-sm-12 p-4";
      displayItem.innerHTML = `
          <div class="card">
              <div class="card-body">
                  <h5 class="card-title"><img src="images/pet${pet.pet_id}.png" width="60" height="60"/> ${pet.name}</h5>
                  <p class="card-text">
                      Rarity: ${pet.rarity} <br>
                      Price: ${pet.skillpoints_cost} skillpoints<br>
                  </p>
                  ${
                token
                  ? `<button class="btn btn-primary purchase-btn" data-pet-id="${pet.pet_id}">Purchase</button>
                    `
                  : ""
                    }
                    <div class="warningCard card border-danger mt-3 mb-3 d-none">
                    <div class="card-body text-danger">
                    <p class="warningText card-text"></p>
                    </div>
                </div>
              </div>
          </div>
          `;
          PetList.appendChild(displayItem);
    });
    document.querySelectorAll(".purchase-btn").forEach((btn) => {
        btn.addEventListener("click", function() {
            const petId = this.getAttribute("data-pet-id");
            const petCard = this.closest(".card-body"); // Find the correct pet card
            const warningCard = petCard.querySelector(".warningCard");
            const warningText = petCard.querySelector(".warningText");


            const data = {
                user_id: userId
            };
            // Confirmation before buying the pet
            if (confirm("Are you sure you want to purchase this pet?")) {
                // Make API call to delete the review
                const callback = (status, data) => {
                    if (status === 201) {
                        alert("Pet purchased successfully!");
                        window.location.href = "profile.html"; 
                    } else {
                        warningCard.classList.remove("d-none");
                        warningText.innerText = data.message;
                    }
                };
  
                fetchMethod(currentUrl + `/api/pet/${petId}`, callback, "POST", data);
            }
        });
    });
};
  
  fetchMethod(currentUrl + "/api/pet", callback);
  