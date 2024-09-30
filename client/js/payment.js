document.addEventListener("DOMContentLoaded", function () {
  setTotalPaymentText();
  const submitBtn = document.getElementById("submitBtn");

  submitBtn.addEventListener("click", async function (event) {
    setTotalPaymentText();
    event.preventDefault();
    if ($("form")[0].checkValidity()) {
      try {
        const { data: order, status } = await axiosClient.post("/orders");

        $("#myModal").modal("show");
        $("form")[0].reset();
        window.location.href = "/home-page.html";
      } catch (error) {
        if (error.status === 400) {
          alert("יש לך יותר מדי פריטים בסל משיש במלאי");
        }
      }
    } else {
      $("form")[0].reportValidity();
    }
  });
});

async function setTotalPaymentText() {
  document.getElementById("totalPayment").innerText =
    (await fetchTotal()) + ' ש"ח ';
}
