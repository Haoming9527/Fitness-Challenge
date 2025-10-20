document.addEventListener("DOMContentLoaded", function () {
    const url = new URL(document.URL);
    const urlParams = url.searchParams;
    const review_id = urlParams.get("id");
    const userId = localStorage.getItem("user_id");
    

    let rating = 0; // Initialize rating variable

    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        if (responseStatus == 204) {
            window.location.href = "review.html";  // Redirect to review page after submission
        } else {
            warningCard.classList.remove("d-none");
            warningText.innerText = responseData.message;  // Show error message
        }
    };

    const stars = document.querySelectorAll("#starRating .fa");

    stars.forEach(star => {
        star.addEventListener("click", function() {
            // Reset all stars
            stars.forEach(s => s.classList.remove("checked"));

            // Set the rating based on clicked star
            rating = this.getAttribute("data-value");

            // Add "checked" class to the clicked star and all previous stars
            for (let i = 0; i < rating; i++) {
                stars[i].classList.add("checked");
            }

            console.log("Selected rating:", rating); // Debugging log
        });
    });

    const ReviewForm = document.getElementById("ReviewForm");
    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");

    ReviewForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Ensure a rating has been selected (must be between 1 and 5)
        if (rating === 0) {
            warningCard.classList.remove("d-none");
            warningText.innerText = "Please select a rating before submitting.";  // Show warning if no rating selected
            console.log("No rating selected!");  // Debugging log
            return;  // Prevent form submission
        }


        const data = {
            user_id: userId,
            review_amt: rating  // Include the selected rating
        };

        // Perform the request to submit the review
        fetchMethod(currentUrl + `/api/review/${review_id}`, callback, "PUT", data);

        // Reset the form fields
        ReviewForm.reset();
    });
});
