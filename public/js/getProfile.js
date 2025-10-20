document.addEventListener("DOMContentLoaded", function () {
  const userId = localStorage.getItem("user_id");

  const callbackForUserInfo = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const userInfo = document.getElementById("userInfo");

    if (responseStatus == 404) {
      userInfo.innerHTML = `${responseData.message}`;
      return;
    }

    userInfo.innerHTML = `
          <div class="card">
              <div class="card-body">
                  <p class="card-text">
                  Username: ${responseData.username} <br>
                  <a href="editUsername.html?user_id=${responseData.user_id}" class="btn btn-primary">Edit Username</a><br>
                      User ID: ${responseData.user_id} <br>
                      Email: ${responseData.email} <br>
                      Skillpoints: ${responseData.skillpoints} <br>
                      Created On: ${responseData.created_on} <br>
                  </p>
              </div>
          </div>
      `;
  };

  const callbackForchallengeInfo = (responseStatus, responseData) => {
    const challengeInfo = document.getElementById("challengeInfo");
    if (responseStatus == 404) {
        challengeInfo.innerHTML = `<p>No challenge created</p>`;
        return;
      }
    responseData.forEach((challenge) => {
      const displayItem = document.createElement("div");
      displayItem.className =
        "col-xl-9 col-lg-9 col-md-9 col-sm-12 p-4";
      displayItem.innerHTML = `
          <div class="card">
              <div class="card-body">
                  <h5 class="card-title"><img src="images/challenge.png" width="60" height="60"/> Challenge ${challenge.challenge_id}</h5>
                  <p class="card-text">
                      Challenge: ${challenge.challenge} <br>
                      Creator Id: ${challenge.creator_id} <br>
                      Skillpoints: ${challenge.skillpoints} <br>
                  </p>
                  <a href="editChallenge.html?challenge_id=${challenge.challenge_id}" class="btn btn-primary">Edit Challenge</a>
                  <button class="btn btn-danger challenge-delete-btn" data-challenge-id="${challenge.challenge_id}">Delete</button>
              </div>
          </div>
          `;
        challengeInfo.appendChild(displayItem);
    });
    document.querySelectorAll(".challenge-delete-btn").forEach((btn) => {
      btn.addEventListener("click", function() {
          const challengeId = this.getAttribute("data-challenge-id");

          // Confirmation before deleting the review
          if (confirm("Are you sure you want to delete this challenge?")) {
              const challengedeleteCallback = (status, data) => {
                  if (status === 204) {
                      alert("Challenge deleted successfully!");
                      window.location.reload(); 
                  } else {
                      alert("Error deleting challenge: " + data.message);
                  }
              };

              fetchMethod(currentUrl + `/api/challenge/${challengeId}`, challengedeleteCallback, "DELETE");
            }
        });
    });
};

const callbackForPetInfo = (responseStatus, responseData) => {
    const petInfo = document.getElementById("petInfo");
    if (responseStatus == 404) {
        petInfo.innerHTML = `<p>No owned pet</p>`;
        return;
      }
    responseData.forEach((pet) => {
      const displayItem = document.createElement("div");
      displayItem.className =
        "col-xl-9 col-lg-9 col-md-9 col-sm-12 p-4";
      displayItem.innerHTML = `
          <div class="card">
              <div class="card-body">
                  <h5 class="card-title"><img src="images/pet${pet.pet_id}.png" width="60" height="60"/> ${pet.pet_name}</h5>
                  <p class="card-text">
                      Rarity: ${pet.rarity} <br>
                  </p>
                  <button class="btn btn-danger pet-delete-btn" data-ownedpet-id="${pet.id}">Delete</button>
              </div>
          </div>
          `;
          petInfo.appendChild(displayItem);
    });
    document.querySelectorAll(".pet-delete-btn").forEach((btn) => {
      btn.addEventListener("click", function() {
          const ownedpetId = this.getAttribute("data-ownedpet-id");

          if (confirm("Are you sure you want to delete this pet?")) {
              const petdeleteCallback = (status, data) => {
                  if (status === 204) {
                      alert("Pet deleted successfully!");
                      window.location.reload(); 
                  } else {
                      alert("Error deleting pet: " + data.message);
                  }
              };

              fetchMethod(currentUrl + `/api/pet/owner/${userId}/${ownedpetId}`, petdeleteCallback, "DELETE");
            }
        });
    });
};


  console.log(userId);
  fetchMethod(currentUrl + `/api/user/${userId}`, callbackForUserInfo);
  fetchMethod(currentUrl + `/api/challenge/created/${userId}`, callbackForchallengeInfo);
  fetchMethod(currentUrl + `/api/pet/owner/${userId}`, callbackForPetInfo);
});
