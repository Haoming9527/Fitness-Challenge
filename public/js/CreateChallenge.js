document.addEventListener("DOMContentLoaded", function () {
    const userId = localStorage.getItem("user_id");

    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
      if (responseStatus == 201) {
          window.location.href = "profile.html";
        } else {
        warningCard.classList.remove("d-none");
        warningText.innerText = responseData.message;
      }
    };
  
    const CreateForm = document.getElementById("CreateForm");
  
    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");
  
    CreateForm.addEventListener("submit", function (event) {
      console.log("CreateForm.addEventListener");
      event.preventDefault();
  
    let challenge = document.getElementById("challenge").value;
    let skillpoints = document.getElementById("skillpoints").value.trim();

    // Convert skillpoints to number 
    skillpoints = parseInt(skillpoints);
        
        

const data = {
    challenge: challenge,
    user_id: userId,
    skillpoints: skillpoints
};

// Perform the request
fetchMethod(currentUrl + `/api/challenge`, callback, "POST", data);
      // Reset the form fields
      CreateForm.reset();
    });
  });
  