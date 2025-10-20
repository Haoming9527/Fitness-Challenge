document.addEventListener("DOMContentLoaded", function () {
    url = new URL(document.URL);
    const urlParams = url.searchParams;
    const challengeId = urlParams.get("challenge_id");
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
  
    const CompleteForm = document.getElementById("CompleteForm");
  
    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");
  
    CompleteForm.addEventListener("submit", function (event) {
      console.log("CompleteForm.addEventListener");
      event.preventDefault();
  
    const completedCheckbox = document.getElementById("completed");
    const completed = completedCheckbox.checked ? true : false;
    const notes = document.getElementById("notes").value;

const data = {
  user_id: userId,       
  completed: completed,
  notes: notes,
};

// Perform the request
fetchMethod(currentUrl + `/api/challenge/${challengeId}`, callback, "POST", data);

  
      // Reset the form fields
      CompleteForm.reset();
    });
  });
  