document.addEventListener("DOMContentLoaded", function () {
    const url = new URL(document.URL);
    const urlParams = url.searchParams;
    const userId = urlParams.get("user_id");
    
  
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
                  </div>
              </div>
              `;
            challengeInfo.appendChild(displayItem);
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
            "col-xl-6 col-lg-6 col-md-6 col-sm-12 p-4";
          displayItem.innerHTML = `
              <div class="card">
                  <div class="card-body">
                      <h5 class="card-title"><img src="images/pet${pet.pet_id}.png" width="60" height="60"/> ${pet.pet_name}</h5>
                      <p class="card-text">
                          Rarity: ${pet.rarity} <br>
                      </p>
                  </div>
              </div>
              `;
              petInfo.appendChild(displayItem);
        });
    };
    fetchMethod(currentUrl + `/api/user/${userId}`, callbackForUserInfo);
    fetchMethod(currentUrl + `/api/challenge/created/${userId}`, callbackForchallengeInfo);
    fetchMethod(currentUrl + `/api/pet/owner/${userId}`, callbackForPetInfo);
  });
  