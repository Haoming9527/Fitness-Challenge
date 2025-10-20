const userId = localStorage.getItem("user_id");
const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const ChallengeRecordList = document.getElementById("ChallengeRecordList");
    if (responseStatus == 404) {
        ChallengeRecordList.innerHTML = `<p>No challenge recorded</p>`;
        return;
      }

    responseData.forEach((challenge) => {
    const displayItem = document.createElement("div");
      displayItem.className =
        "col-xl-4 col-lg-4 col-md-6 col-sm-12 p-4";
    const completionIcon = challenge.completed === 1 ? "&#9989" : "&#10060";
      displayItem.innerHTML = `
          <div class="card">
              <div class="card-body">
                  <h5 class="card-title"><img src="images/challenge.png" width="60" height="60"/> Challenge ${challenge.challenge_id}</h5>
                  <p class="card-text">
                      Notes: ${challenge.notes} <br>
                      Completion date: ${challenge.creation_date} <br>
                      Completion: ${completionIcon} <br>
                  </p>
              </div>
          </div>
          `;
          ChallengeRecordList.appendChild(displayItem);
    });
  };
  
  fetchMethod(currentUrl + `/api/challenge/${userId}`, callback);