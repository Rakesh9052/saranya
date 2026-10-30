"use strict";

// IMPORTANT: Replace this with the shop's real WhatsApp number.
// Use country code 91 followed by the 10-digit Indian mobile number.
const WHATSAPP_NUMBER = "919052586210";

const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");
const productSearch = document.getElementById("productSearch");
const productGrid = document.getElementById("productGrid");
const noProducts = document.getElementById("noProducts");
const bookingForm = document.getElementById("bookingForm");

let activeCategory = "all";

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

// Close mobile navigation after selecting a link
navigation.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

// Product category filters
document.querySelectorAll(".filter-btn").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");
    activeCategory = button.dataset.filter;

    filterProducts();
  });
});

// Product search
productSearch.addEventListener("input", filterProducts);

function filterProducts() {
  const searchText = productSearch.value.trim().toLowerCase();
  const products = productGrid.querySelectorAll(".product-card");

  let visibleCount = 0;

  products.forEach(product => {
    const category = product.dataset.category;
    const name = product.dataset.name.toLowerCase();

    const matchesCategory =
      activeCategory === "all" || category === activeCategory;

    const matchesSearch = name.includes(searchText);

    const showProduct = matchesCategory && matchesSearch;

    product.hidden = !showProduct;

    if (showProduct) {
      visibleCount++;
    }
  });

  noProducts.hidden = visibleCount !== 0;
}

// Validate the WhatsApp number before opening WhatsApp
function openWhatsApp(message) {
  if (!/^91[6-9]\d{9}$/.test(WHATSAPP_NUMBER)) {
    alert(
      "Please add the shop's real WhatsApp number in script.js before using enquiries."
    );
    return;
  }

  const url =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(message);

  window.open(url, "_blank", "noopener,noreferrer");
}

// Product enquiry buttons
document.querySelectorAll(".enquiry-btn").forEach(button => {
  button.addEventListener("click", () => {
    const productName = button.dataset.product;

    const message =
      `Hello Saranya Beauty Parlour & Kangana Shop, Gangasagar!\n\n` +
      `I am interested in: ${productName}.\n` +
      `Please share available designs, prices and details.\n\n` +
      `Thank you!`;

    openWhatsApp(message);
  });
});

// Booking form
bookingForm.addEventListener("submit", event => {
  event.preventDefault();

  if (!bookingForm.reportValidity()) {
    return;
  }

  const formData = new FormData(bookingForm);

  const name = formData.get("name").trim();
  const phone = formData.get("phone").trim();
  const service = formData.get("service");
  const date = formData.get("date");
  const time = formData.get("time");
  const details = formData.get("message").trim();

  const message =
    `Hello Saranya Beauty Parlour & Kangana Shop, Gangasagar!\n\n` +
    `I would like to enquire about an appointment.\n\n` +
    `Name: ${name}\n` +
    `Contact number: ${phone}\n` +
    `Service: ${service}\n` +
    `Preferred date: ${date}\n` +
    `Preferred time: ${time}\n` +
    `Additional details: ${details || "Not provided"}\n\n` +
    `Please let me know the availability and charges. Thank you!`;

  openWhatsApp(message);
});

// WhatsApp contact buttons
function setupContactButton(id) {
  const button = document.getElementById(id);

  button.addEventListener("click", event => {
    event.preventDefault();

    openWhatsApp(
      "Hello Saranya Beauty Parlour & Kangana Shop, Girnibavi! " +
      "I would like to know more about your beauty services and collections."
    );
  });
}

setupContactButton("contactWhatsApp");
setupContactButton("floatingWhatsApp");

// Set today's date as the earliest appointment date
const dateInput = document.getElementById("appointmentDate");

const today = new Date();
const localToday =
  today.getFullYear() + "-" +
  String(today.getMonth() + 1).padStart(2, "0") + "-" +
  String(today.getDate()).padStart(2, "0");

dateInput.min = localToday;

// Automatically update the copyright year
document.getElementById("year").textContent =
  new Date().getFullYear();