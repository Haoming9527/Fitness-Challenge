const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
  
    const UserList = document.getElementById("UserList");
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");


    
    responseData.forEach((user) => {
      const displayItem = document.createElement("div");
      displayItem.className =
        "col-xl-4 col-lg-4 col-md-6 col-sm-12 p-4";
        let LogineduserId = parseInt(userId)
        if (!token) {
            userLink = `singleUser.html?user_id=${user.user_id}`;
        } else {
            if (user.user_id === LogineduserId) {
                userLink = 'profile.html';
            } else {
                userLink = `singleUser.html?user_id=${user.user_id}`;
            }
        }
      displayItem.innerHTML = `
          <div class="card">
              <div class="card-body">
                  <h5 class="card-title">User ${user.user_id}</h5>
                  <p class="card-text">
                      Username: ${user.username} <br>
                      Email: ${user.email} <br>
                      Skillpoints: ${user.skillpoints} <br>
                  </p>
                  <a href="${userLink}" class="btn btn-primary">View Details</a>
              </div>
          </div>
          `;
          UserList.appendChild(displayItem);
    });
  
};
  
  fetchMethod(currentUrl + "/api/user", callback);