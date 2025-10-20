document.addEventListener("DOMContentLoaded", function () {
    const url = new URL(document.URL);
    const urlParams = url.searchParams;
    const challenge_id = urlParams.get("challenge_id");
    const userId = localStorage.getItem("user_id");

    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
      if (responseStatus == 200) {
          window.location.href = "profile.html";
        } else {
        warningCard.classList.remove("d-none");
        warningText.innerText = responseData.message;

      }
    };
  
    const UpdateForm = document.getElementById("UpdateForm");
  
    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");
  
    UpdateForm.addEventListener("submit", function (event) {
      console.log("UpdateForm.addEventListener");
      event.preventDefault();
  
    let challenge = document.getElementById("challenge").value;
    let skillpoints = document.getElementById("skillpoints").value;

    // Convert skillpoints to number 
    skillpoints = parseInt(skillpoints);
        
        

const data = {
    user_id: userId,
    challenge: challenge,
    skillpoints: skillpoints
};

// Perform the request
fetchMethod(currentUrl + `/api/challenge/${challenge_id}`, callback, "PUT", data);
      // Reset the form fields
      UpdateForm.reset();
    });
  });
  