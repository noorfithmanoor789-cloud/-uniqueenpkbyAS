const WHATSAPP = "923021328966";

const products = [
  {
    id: "blue-tulip",
    name: "Blue Tulip",
    image: "./images/outfit1.jpg",
    fabric: "Premium Lawn Cotton",
    colors: ["Blue-Brown", "Pink-Brown"],
    colorTags: ["blue", "pink"],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "lawn",
    badge: "Best Seller",
    description: "Korean-style summer outfit with soft tulip energy, airy comfort and a polished everyday boutique look.",
    featured: true
  },
  {
    id: "blossom-cargo",
    name: "Blossom Cargo",
    image: "./images/outfit2.jpg",
    fabric: "Soft Lawn Cotton",
    colors: ["Purple-Ivory", "Burgundy-Ivory"],
    colorTags: ["purple", "burgundy", "white"],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "lawn",
    badge: "Trendy",
    description: "A floral cargo mood with relaxed movement, fresh contrast and statement pockets for street-soft styling.",
    featured: true
  },
  {
    id: "satin-maxi",
    name: "Luxury Black & White Satin Maxi",
    image: "./images/outfit3.jpg",
    fabric: "Premium Satin",
    colors: ["Black", "White"],
    colorTags: ["black", "white"],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "maxi",
    badge: "Luxury",
    description: "Elegant fairy-core maxi with a glossy satin fall, dramatic black-white contrast and evening-ready flow.",
    featured: true
  },
  {
    id: "cute-baggy-fit",
    name: "Cute Baggy Fit",
    image: "./images/outfit4.jpg",
    fabric: "Baggy Jeans + Kurti",
    colors: ["Eid Special Shades"],
    colorTags: ["blue", "pastel"],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "western",
    badge: "Eid Special",
    description: "A playful baggy jeans and kurti pairing made for casual Eid plans, coffee dates and cute mirror photos.",
    featured: false
  },
  {
    id: "western-coord",
    name: "Western Coord Set",
    image: "./images/outfit5.jpg",
    fabric: "Comfort Blend",
    colors: ["Multiple Trendy Colors"],
    colorTags: ["pink", "blue", "pastel", "black"],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "western",
    badge: "New Drop",
    description: "A stylish coord set with clean lines, easy matching and a modern silhouette for everyday confidence.",
    featured: true
  },
  {
    id: "arabic-embroidered",
    name: "Arabic Embroidered Attire",
    image: "./images/outfit6.jpg",
    fabric: "3-Piece Embroidered",
    colors: ["Navy Blue"],
    colorTags: ["blue"],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "embroidered",
    badge: "Royal",
    description: "Navy blue 3-piece attire with Arabic-inspired embroidery for a graceful, polished and regal look.",
    featured: false
  },
  {
    id: "summer-pastel-maxi",
    name: "Summer Pastel Maxi",
    image: "./images/outfit7.jpg",
    fabric: "Lightweight Flowy",
    colors: ["Soft Pastels"],
    colorTags: ["pastel", "pink", "blue"],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "maxi",
    badge: "Soft Pastel",
    description: "A breezy maxi with gentle pastel tones, soft movement and a light summer feel.",
    featured: false
  },
  {
    id: "eid-mirror-kurti",
    name: "Eid Mirror Work Kurti",
    image: "./images/outfit8.jpg",
    fabric: "Cotton with Mirror Work",
    colors: ["Festive Colors"],
    colorTags: ["pink", "gold", "pastel"],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "festive",
    badge: "Festive",
    description: "A cotton kurti with festive mirror sparkle, made for Eid gatherings and glowing daytime styling.",
    featured: true
  },
  {
    id: "black-hoodie-set",
    name: "Black Oversized Hoodie Set",
    image: "./images/outfit9.jpg",
    fabric: "Cozy Fleece Blend",
    colors: ["Black with Gold Details"],
    colorTags: ["black", "gold"],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "hoodie",
    badge: "Cozy",
    description: "A black oversized hoodie set with gold details for comfy statement dressing and winter streetwear energy.",
    featured: false
  },
  {
    id: "satin-belle",
    name: "SATIN BELLE",
    images: ["./images/stain1.jpeg", "./images/stain2.jpeg"],
    fabric: "Light-as-air Satin",
    colors: ["Moonlit Satin", "Second Color"],
    colorTags: ["white", "gold", "pastel"],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "maxi",
    badge: "New Dress",
    description: "Light-as-air satin with a soft moonlit sheen. Puffed organza sleeves for fairytale charm. Floor-sweeping flow that moves like royalty. Delicate waist gathers for a graceful, floaty fit. For dreamers who shine in quiet elegance.",
    featured: false
  },
  {
    id: "moonlit-flutter",
    name: "MOONLIT FLUTTER",
    images: ["./images/moonlit1.jpeg", "./images/moonlit2.jpeg"],
    fabric: "Satin Fairytale",
    colors: ["Moonlit Satin", "Black Bow"],
    colorTags: ["black", "white", "pastel"],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "maxi",
    badge: "New Dress",
    description: "Satin fairytale stitched in starlight. Puffed sleeves, delicate cuffs and a soft black butterfly bow at front. Flows like a moonbeam - light, elegant and magical. Sheer black bow at back, fluttering like fairy wings. For dreamers who believe in stardust.",
    featured: false
  },
  {
    id: "befair",
    name: "BEFAIR",
    images: ["./images/Befair1.jpeg", "./images/Befair2.jpeg"],
    fabric: "Embroidered Shirt + Skirt",
    colors: ["Soft Aesthetic", "Second Color"],
    colorTags: ["pastel", "pink", "white"],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "western",
    badge: "New Dress",
    description: "Soft aesthetic outfit with skirt and embroidered shirt, dreamy wear.",
    featured: false
  },
  {
    id: "dark-pattern",
    name: "DARK PATTERN",
    images: ["./images/Dark1.jpg", "./images/Dark2.jpeg"],
    fabric: "3-Piece Outfit",
    colors: ["Dark Pattern", "Second Color"],
    colorTags: ["black"],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "western",
    badge: "New Dress",
    description: "Cute and comfy 3-piece outfit, aesthetic summer wear.",
    featured: false
  }
];

const moneyNote = "Affordable • DM for exact price";

function productImage(product, index = 0) {
  const images = product.images?.length ? product.images : [product.image];
  return images[index] || images[0];
}

function orderUrl(product) {
  const text = `Assalamualaikum UniQueen.pk, I want to order ${product.name}. Please share exact price and availability.`;
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
}

function productCard(product) {
  return `
    <article class="product-card reveal" data-product-card data-category="${product.category}" data-colors="${product.colorTags.join(",")}" data-sizes="${product.sizes.join(",")}">
      <div class="product-media">
        <span class="product-badge">${product.badge}</span>
        <img src="${productImage(product)}" alt="${product.name} by UniQueen.pk" />
      </div>
      <div class="product-body">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="meta-list">
          <span><strong>Fabric:</strong> ${product.fabric}</span>
          <span><strong>Colors:</strong> ${product.colors.join(", ")}</span>
          <span><strong>Sizes:</strong> ${product.sizes.join("-")}</span>
        </div>
        <span class="price-note">${moneyNote}</span>
        <div class="card-actions">
          <button class="btn quick-btn" type="button" data-quick-view="${product.id}">Quick View</button>
          <a class="btn primary" href="${orderUrl(product)}" target="_blank" rel="noreferrer">WhatsApp Order</a>
        </div>
      </div>
    </article>
  `;
}

function initTheme() {
  const saved = localStorage.getItem("uq-theme") || "light";
  document.documentElement.dataset.theme = saved;
  document.body.dataset.theme = saved;
  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.textContent = saved === "dark" ? "Sun" : "Moon";
    button.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      document.body.dataset.theme = next;
      localStorage.setItem("uq-theme", next);
      document.querySelectorAll("[data-theme-toggle]").forEach((item) => {
        item.textContent = next === "dark" ? "Sun" : "Moon";
      });
    });
  });
}

function initNav() {
  const page = document.body.dataset.page;
  document.querySelectorAll(`[data-active="${page}"]`).forEach((link) => link.classList.add("active"));

  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  const header = document.querySelector("[data-header]");
  const syncHeader = () => header?.classList.toggle("scrolled", scrollY > 12);
  syncHeader();
  addEventListener("scroll", syncHeader, { passive: true });
}

function initReveals() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  items.forEach((item) => observer.observe(item));
}

function initImageFallbacks() {
  document.querySelectorAll("img").forEach((image) => {
    const markMissing = () => {
      const framedParent = image.closest(".product-media, .hero-media");
      (framedParent || image).classList.add("image-missing");
    };
    image.addEventListener("error", markMissing);
    if (image.complete && image.naturalWidth === 0) markMissing();
  });
}

function renderProducts() {
  document.querySelectorAll("[data-products]").forEach((container) => {
    const mode = container.dataset.products;
    const list = mode === "featured" ? products.filter((product) => product.featured).slice(0, 5) : products;
    container.innerHTML = list.map(productCard).join("");
  });
}

function initFilters() {
  const filters = document.querySelectorAll("[data-filter]");
  if (!filters.length) return;

  const apply = () => {
    const category = document.querySelector('[data-filter="category"]').value;
    const color = document.querySelector('[data-filter="color"]').value;
    const size = document.querySelector('[data-filter="size"]').value;
    let visible = 0;

    document.querySelectorAll("[data-product-card]").forEach((card) => {
      const matchesCategory = category === "all" || card.dataset.category === category;
      const matchesColor = color === "all" || card.dataset.colors.split(",").includes(color);
      const matchesSize = size === "all" || card.dataset.sizes.split(",").includes(size);
      const show = matchesCategory && matchesColor && matchesSize;
      card.hidden = !show;
      if (show) visible += 1;
    });

    const count = document.querySelector("[data-catalog-count]");
    if (count) count.textContent = `${visible} outfit${visible === 1 ? "" : "s"} showing`;
  };

  filters.forEach((filter) => filter.addEventListener("change", apply));
  document.querySelector("[data-reset-filters]")?.addEventListener("click", () => {
    filters.forEach((filter) => {
      filter.value = "all";
    });
    apply();
  });
  apply();
}

function openModal(product) {
  const modal = document.querySelector("[data-modal]");
  if (!modal) return;
  modal.innerHTML = `
    <div class="modal-panel" role="dialog" aria-modal="true" aria-label="${product.name} quick view">
      <div class="product-media">
        <span class="product-badge">${product.badge}</span>
        <img src="${productImage(product)}" alt="${product.name} by UniQueen.pk" data-modal-product-image />
      </div>
      <div class="modal-content">
        <button class="modal-close" type="button" data-close-modal aria-label="Close quick view">X</button>
        <p class="eyebrow">${product.category}</p>
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <div class="meta-list">
          <span><strong>Fabric:</strong> ${product.fabric}</span>
          <span><strong>Colors:</strong> ${product.colors.join(", ")}</span>
        </div>
        <div>
          <strong>Available sizes</strong>
          <div class="sizes">${product.sizes.map((size) => `<span class="size-pill">${size}</span>`).join("")}</div>
        </div>
        <div>
          <strong>Color options</strong>
          <div class="swatches">${product.colors.map((color, index) => `<span${product.images?.[index] ? ` data-modal-image="${product.images[index]}"` : ""}>${color}</span>`).join("")}</div>
        </div>
        <span class="price-note">${moneyNote}</span>
        <a class="btn primary" href="${orderUrl(product)}" target="_blank" rel="noreferrer">WhatsApp Order</a>
      </div>
    </div>
  `;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("locked");
  initImageFallbacks();
}

function closeModal() {
  const modal = document.querySelector("[data-modal]");
  modal?.classList.remove("open");
  modal?.setAttribute("aria-hidden", "true");
  document.body.classList.remove("locked");
}

function initModal() {
  document.addEventListener("click", (event) => {
    const quick = event.target.closest("[data-quick-view]");
    if (quick) {
      const product = products.find((item) => item.id === quick.dataset.quickView);
      if (product) openModal(product);
    }

    if (event.target.matches("[data-close-modal]") || event.target.matches("[data-modal]")) {
      closeModal();
    }

    const imageOption = event.target.closest("[data-modal-image]");
    if (imageOption) {
      const modalImage = imageOption.closest(".modal-panel")?.querySelector("[data-modal-product-image]");
      if (modalImage) {
        modalImage.src = imageOption.dataset.modalImage;
        modalImage.closest(".product-media")?.classList.remove("image-missing");
      }
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });
}

initTheme();
initNav();
renderProducts();
initFilters();
initModal();
initImageFallbacks();
initReveals();
