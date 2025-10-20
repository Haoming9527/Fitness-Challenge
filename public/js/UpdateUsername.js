document.addEventListener("DOMContentLoaded", function () {
    url = new URL(document.URL);
    const urlParams = url.searchParams;
    const userId = urlParams.get("user_id");
   

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
  
    const username = document.getElementById("username").value;

const data = {
    username: username     
};

// Perform the request
fetchMethod(currentUrl + `/api/user/${userId}`, callback, "PUT", data);

  
      // Reset the form fields
      UpdateForm.reset();
    });
  });
  