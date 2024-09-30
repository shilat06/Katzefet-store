document.addEventListener("DOMContentLoaded", async function () {
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const usernameHeader = document.getElementById("userHeader");
  const usernameEl = document.getElementById("usernameInput");
  const passwordEl = document.getElementById("passwordInput");
  const submitBtn = document.getElementById("submitBtn");

  axiosClient.get("/users").then(({ data: loggedInUser }) => {
    if (loggedInUser) {
      usernameHeader.textContent = "שלום, " + loggedInUser.fullName;
      if (loginBtn && logoutBtn) {
        logoutBtn.style.display = "inline-block";
        loginBtn.style.display = "none";
      }
    } else {
      usernameHeader.textContent = "";
      if (loginBtn && logoutBtn) {
        logoutBtn.style.display = "none";
        loginBtn.style.display = "inline-block";
      }
    }
  });

  submitBtn &&
    submitBtn.addEventListener("click", async function () {
      const username = usernameEl.value;
      const password = passwordEl.value;
      const { data: user, status } = await axiosClient.post("/users/login", {
        userId: username,
        password,
      });

      if (status === 200) {
        location.reload();
      } else {
        console.log("wrong password");
      }
    });

  logoutBtn &&
    logoutBtn.addEventListener("click", function () {
      axiosClient.get("/users/logout").then(() => {
        location.reload();
      });
    });
});
