// --- PARALLAX EFFECT ---
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  document.querySelectorAll('.mb-img').forEach((img, i) => {
    img.style.transform = `translate(${scrollY * (0.05 + i * 0.02)}px, ${scrollY * (0.02 + i * 0.01)}px)`;
  });
});

// --- DOM READY EVENTS ---
document.addEventListener("DOMContentLoaded", () => {

  // SEARCH FUNCTIONALITY
    const searchInput = document.getElementById("site-search");
  const searchBtn = document.getElementById("search-btn"); // 🔍 new button
  const serviceCards = document.querySelectorAll(".service-card");
  const faqItems = document.querySelectorAll(".faq-item");
  const contactSection = document.getElementById("contact");
  const searchPopup = document.getElementById("search-popup");

  function fuzzyMatch(text, term) {
    const normalize = (str) => str.toLowerCase().replace(/[^\w\s]/g, "").trim();
    const cleanText = normalize(text);
    const cleanTerm = normalize(term);
    const words = cleanTerm.split(/\s+/);
    return words.every(word => cleanText.includes(word.slice(0, Math.max(2, word.length - 1))));
  }

  function handleSearch() {
    const term = searchInput.value.trim();
    if (!term) return;

    const allItems = [...serviceCards, ...faqItems];
    let found = false;

    for (const item of allItems) {
      const text = item.textContent;
      if (fuzzyMatch(text, term)) {
        found = true;
        item.scrollIntoView({ behavior: "smooth", block: "center" });
        item.classList.add("highlight");
        setTimeout(() => item.classList.remove("highlight"), 3000);
        break;
      }
    }

    if (!found && contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "center" });
      contactSection.classList.add("highlight");
      setTimeout(() => contactSection.classList.remove("highlight"), 3000);

      searchPopup.classList.add("active");
      setTimeout(() => searchPopup.classList.remove("active"), 4000);
    }
  }

  // Trigger by pressing Enter
  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSearch();
      }
    });
  }

  // 🔹 Trigger by clicking the button
  if (searchBtn) {
    searchBtn.addEventListener("click", (e) => {
      e.preventDefault();
      handleSearch();
    });
  }

  // SMOOTH SCROLL FOR CONSULTATION BUTTON
  const bookBtn = document.getElementById("book-consultation-btn");
  if (bookBtn && contactSection) {
    bookBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const headerOffset = 100;
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      contactSection.classList.add("highlight");
      setTimeout(() => contactSection.classList.remove("highlight"), 3000);
    });
  }

  // CONTACT FORM HANDLING
  const form = document.getElementById('contact-form');
  const popup = document.getElementById('popup-overlay');

  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          popup.classList.add('active');
          form.reset();
          setTimeout(() => popup.classList.remove('active'), 5000);
        } else {
          alert('Something went wrong. Please try again.');
        }
      } catch (error) {
        alert('Error sending message. Please check your connection.');
      }
    });
  }
});
