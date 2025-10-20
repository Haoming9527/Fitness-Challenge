const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
  
    const ReviewList = document.getElementById("ReviewList");
    const userId = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");
    let groupedReviews = {};

    responseData.forEach((review) => {
        if (!groupedReviews[review.challenge_id]) {
            groupedReviews[review.challenge_id] = [];
        }
        // Push the review to the corresponding challenge_id
        groupedReviews[review.challenge_id].push(review);
    });

    for (let challenge_id in groupedReviews) {
        const displayItem = document.createElement("div");
        displayItem.className = "col-xl-4 col-lg-4 col-md-6 col-sm-12 p-4";

        let reviewHTML = "";
        let challengeReviews = groupedReviews[challenge_id];

        challengeReviews.forEach((review) => {
            let ratingStars = ""; // Initialize ratingStars variable
            for (let i = 1; i <= review.review_amt; i++) {
                ratingStars += "&#11088;"; // Add a star
            }
            reviewHTML += `
                <p>User ${review.user_id}: ${ratingStars} (${review.review_amt}/5)</p>
            `;
            if (token){
            if (review.user_id === parseInt(userId)) {
                reviewHTML += `
                    <button class="btn btn-warning edit-btn" data-review-id="${review.id}">Edit</button>
                    <button class="btn btn-danger delete-btn" data-review-id="${review.id}">Delete</button>
                `;
            }
            }
        });

        displayItem.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title"><img src="images/challenge.png" width="60" height="60"/> Challenge ${challenge_id}</h5>
                    <div class="card-text">
                        ${reviewHTML}
                    </div>
                </div>
            </div>
        `;

        // Append the group of reviews for the challenge_id to the ReviewList
        ReviewList.appendChild(displayItem);
    }
    document.querySelectorAll(".edit-btn").forEach((btn) => {
        btn.addEventListener("click", function() {
            const reviewId = this.getAttribute("data-review-id");
            // Redirect to edit page with reviewId in query params
            window.location.href = `editReview.html?id=${reviewId}`;
        });
    });

    document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", function() {
            const reviewId = this.getAttribute("data-review-id");

            // Confirmation before deleting the review
            if (confirm("Are you sure you want to delete this review?")) {
                // Make API call to delete the review
                const deleteCallback = (status, data) => {
                    if (status === 204) {
                        alert("Review deleted successfully!");
                        window.location.reload(); // Reload the page to reflect the change
                    } else {
                        alert("Error deleting review: " + data.message);
                    }
                };

                fetchMethod(currentUrl + `/api/review/${reviewId}`, deleteCallback, "DELETE");
            }
        });
    });
};
  
  fetchMethod(currentUrl + "/api/review", callback);