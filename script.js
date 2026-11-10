const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-nav");

menuButton.addEventListener("click", () => {
  const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isExpanded));
  navigation.classList.toggle("is-open", !isExpanded);
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuButton.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  }
});

for (const year of document.querySelectorAll("[data-year]")) {
  year.textContent = new Date().getFullYear();
}

const inquiryForm = document.querySelector("#inquiry-form");

inquiryForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!inquiryForm.reportValidity()) {
    return;
  }

  const formData = new FormData(inquiryForm);
  const message = [
    "Hello, I would like to enquire about Arise & Shine Early Learning Centre.",
    `Parent/Guardian: ${formData.get("parentName")}`,
    `Contact phone: ${formData.get("phone")}`,
    `Child's age group: ${formData.get("ageGroup")}`,
    `Transport required: ${formData.get("transport")}`,
    `Message: ${formData.get("message")}`,
  ].join("\n");
  const whatsappUrl = new URL("https://wa.me/27646637471");
  whatsappUrl.searchParams.set("text", message);

  const whatsappWindow = window.open(whatsappUrl, "_blank");
  const formStatus = document.querySelector("#form-status");

  if (whatsappWindow) {
    whatsappWindow.opener = null;
    formStatus.textContent =
      "WhatsApp opened with your inquiry. Review the message there and press Send to contact the centre.";
    return;
  }

  formStatus.textContent = "Your message is ready. If WhatsApp did not open, ";
  const fallbackLink = document.createElement("a");
  fallbackLink.href = whatsappUrl.toString();
  fallbackLink.target = "_blank";
  fallbackLink.rel = "noopener noreferrer";
  fallbackLink.textContent = "open the WhatsApp message";
  formStatus.append(fallbackLink, " and send it to the centre.");
});
