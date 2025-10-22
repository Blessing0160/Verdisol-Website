// Parallax motion: subtle drift on scroll
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  document.querySelectorAll('.mb-img').forEach((img, i) => {
    // give each image a slightly different factor
    img.style.transform = `translate(${scrollY * (0.05 + i*0.02)}px, ${scrollY * (0.02 + i*0.01)}px)`;
  });
});
