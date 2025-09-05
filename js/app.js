const cards = document.querySelectorAll(".testimonials__card");

cards.forEach(card => {
  const img = card.querySelector("img");

  img.addEventListener("click", () => {
    // Boshqa iframelarni tozalash
    cards.forEach(c => {
      const iframe = c.querySelector("iframe");
      if (iframe) {
        // Eski rasmni qayta tiklaymiz
        const oldSrc = iframe.dataset.thumb || "./images/images.avif";
        const oldVideo = iframe.dataset.video;
        c.innerHTML = `<img src="${oldSrc}" alt="images" data-video="${oldVideo}">`;
      }
    });

    // YouTube linkini embed formatga aylantiramiz
    const videoUrl = img.dataset.video;
    const videoId = videoUrl.split("v=")[1];
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

    // Rasmni iframega almashtiramiz
    card.innerHTML = `
      <iframe width="280" height="402"
        src="${embedUrl}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        data-video="${videoUrl}"
        data-thumb="${img.src}">
      </iframe>
    `;
  });
});
