const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
  
    const ChallengeList = document.getElementById("ChallengeList");
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");

    fetchMethod(currentUrl + "/api/review", (reviewStatus, reviewData) => {
      if (reviewStatus !== 200) {
          console.error("Error fetching reviews:", reviewData);
          return;
      }

    // Store user-reviewed challenge IDs in an array
    let userReviewedChallenges = [];
    reviewData.forEach(review => {
          if (review.user_id == userId) {
              userReviewedChallenges.push(review.challenge_id);
          }
      });
    
    responseData.forEach((challenge) => {
      const displayItem = document.createElement("div");
      displayItem.className =
        "col-xl-4 col-lg-4 col-md-6 col-sm-12 p-4";
      const hasRated = userReviewedChallenges.includes(challenge.challenge_id);
      displayItem.innerHTML = `
          <div class="card">
              <div class="card-body">
                  <h5 class="card-title"><img src="images/challenge.png" width="60" height="60"/> Challenge ${challenge.challenge_id}</h5>
                  <p class="card-text">
                      Challenge: ${challenge.challenge} <br>
                      Creator Id: ${challenge.creator_id} <br>
                      Skillpoints: ${challenge.skillpoints} <br>
                  </p>
                  ${
                token
                  ? `<a href="completechallenge.html?challenge_id=${challenge.challenge_id}" class="btn btn-primary">Complete Challenge</a>
                  <br>
                  <br>
                  ${!hasRated 
                    ? `<a href="createReview.html?challenge_id=${challenge.challenge_id}" class="btn btn-danger">Rate this</a>`
                      : "<p class='text-success'>You have already rated this challenge</p>"
                    }`
                  : ""
                    }
              </div>
          </div>
          `;
      ChallengeList.appendChild(displayItem);
    });
    if (token) {
      const createChallengeButton = document.createElement("div");
      createChallengeButton.className = "p-4 text-center";
      createChallengeButton.innerHTML = `
          <a href="createchallenge.html" class="btn btn-primary big-button">Create Challenge</a>
      `;
      ChallengeList.appendChild(createChallengeButton);
    }
  });
};
  
  fetchMethod(currentUrl + "/api/challenge", callback);
  