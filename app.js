const PRODUCT_PLACEHOLDER = "assets/produtos/placeholder.jpg";

const state = {
  role: null,
  selectedProductImage: null,
  selectedRecipeImage: null,
  editingSubmissionId: null,
  clientItemId: 1,
  clientSection: "info",

  products: [
    {
      id: 1,
      name: "Banana",
      image: "assets/produtos/banana.jpg",
      category: "Frutas",
      origin: "tree",
      weight: "100g",
      description: "Fruta de árvore, rica em carboidratos, prática para consumo e boa fonte de energia.",
      calories: "92 kcal",
      carbs: "23,6g",
      protein: "1,1g",
      fat: "0,3g",
      fiber: "2,6g",
      potassium: "358mg",
      iron: "0,3mg",
      water: "74%",
      sodium: "1mg",
      vitaminA: "3mcg",
      vitaminC: "8,7mg",
      traceability: {
        marketProductId: "SNDA-FRT-0001",
        batchCode: "LOTE-2026-001",
        receivedAt: "2026-06-08",
        expiresAt: "2026-06-18",
        supplierName: "Fazenda Boa Terra",
        supplierContact: "João Pereira",
        farmAddress: "Mogi das Cruzes, SP",
        mapsUrl: "https://www.google.com/maps/search/?api=1&query=Mogi%20das%20Cruzes%20SP",
        traceNotes: "Fornecedor homologado pelo Sonda."
      }
    },
    {
      id: 2,
      name: "Mandioca",
      image: "assets/produtos/mandioca.jpg",
      category: "Raízes",
      origin: "earth",
      weight: "100g",
      description: "Raiz rica em carboidratos, muito utilizada na alimentação brasileira.",
      calories: "173 kcal",
      carbs: "37,5g",
      protein: "1,4g",
      fat: "0,3g",
      fiber: "1,8g",
      potassium: "271mg",
      iron: "0,3mg",
      water: "60%",
      sodium: "2mg",
      vitaminA: "0mcg",
      vitaminC: "20,6mg",
      traceability: {
        marketProductId: "SNDA-RAZ-0002",
        batchCode: "LOTE-2026-014",
        receivedAt: "2026-06-07",
        expiresAt: "2026-06-20",
        supplierName: "Sítio Raiz Forte",
        supplierContact: "Maria Oliveira",
        farmAddress: "Ibiúna, SP",
        mapsUrl: "https://www.google.com/maps/search/?api=1&query=Ibi%C3%BAna%20SP",
        traceNotes: "Lote recebido em boas condições."
      }
    },
    {
      id: 3,
      name: "Brócolis",
      image: "assets/produtos/brocolis.jpg",
      category: "Hortaliças",
      origin: "leaf",
      weight: "100g",
      description: "Hortaliça rica em fibras, vitaminas e minerais, indicada para refeições equilibradas.",
      calories: "34 kcal",
      carbs: "6,6g",
      protein: "3,6g",
      fat: "0,4g",
      fiber: "2,6g",
      potassium: "316mg",
      iron: "0,7mg",
      water: "89%",
      sodium: "33mg",
      vitaminA: "31mcg",
      vitaminC: "89mg",
      traceability: {}
    }
  ],

  recipes: [
    {
      id: 101,
      foodId: 1,
      title: "Bolo simples de banana",
      difficulty: "Fácil",
      prepTime: "30 min",
      portions: "10",
      photo: null,
      ingredients: "Bananas maduras, ovos, aveia, canela e fermento.",
      preparation: "Amasse as bananas, misture com os demais ingredientes e leve ao forno até dourar."
    }
  ],

  submissions: [
    {
      id: 201,
      type: "product",
      status: "Pendente de Aprovação",
      author: "Aluno",
      createdAt: getToday(),
      title: "Laranja",
      flags: [],
      payload: {
        name: "Laranja",
        image: "assets/produtos/placeholder.jpg",
        category: "Frutas",
        origin: "tree",
        weight: "100g",
        description: "Fruta cítrica rica em vitamina C.",
        calories: "47 kcal",
        carbs: "11,8g",
        protein: "0,9g",
        fat: "0,1g",
        fiber: "2,4g",
        potassium: "181mg",
        iron: "0,1mg",
        water: "86%",
        sodium: "0mg",
        vitaminA: "11mcg",
        vitaminC: "53mg",
        traceability: {}
      }
    }
  ]
};

const roleLabels = {
  student: "Aluno",
  teacher: "Professor",
  sonda: "Responsável Sonda"
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

function initNutriSanta() {
  setupLogin();
  setupNavigation();
  setupDashboardFilters();
  setupProductForm();
  setupRecipeForm();
  setupReview();
  setupTraceability();
  setupClient();
  setupModal();

  renderDashboard();
  renderRecipeFoodOptions();

  console.log("NutriSanta carregado com sucesso!");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initNutriSanta);
} else {
  initNutriSanta();
}

/* ================= LOGIN / RBAC ================= */

function setupLogin() {
  $$("[data-login-role]").forEach((button) => {
    button.addEventListener("click", () => {
      login(button.dataset.loginRole);
    });
  });

  $("#logoutButton").addEventListener("click", logout);
}

function login(role) {
  state.role = role;

  $("#loginView").classList.add("hidden");
  $("#clientView").classList.add("hidden");
  $("#appView").classList.remove("hidden");

  $("#roleBadge").textContent = `Perfil: ${roleLabels[role]}`;

  applyRBAC();

  if (role === "sonda") {
    showView("sondaTraceabilityView");
  } else if (isAdmin()) {
    showView("reviewView");
  } else {
    showView("dashboardView");
  }

  renderDashboard();
  renderReviewList();

  showToast(`Login realizado como ${roleLabels[role]}.`);
}

function logout() {
  state.role = null;

  $("#appView").classList.add("hidden");
  $("#clientView").classList.add("hidden");
  $("#loginView").classList.remove("hidden");

  showToast("Sessão encerrada.");
}

function isStudent() {
  return state.role === "student";
}

function isAdmin() {
  return state.role === "teacher" || state.role === "sonda";
}

function applyRBAC() {
  $$("[data-only='student']").forEach((element) => {
    element.classList.toggle("hidden", !isStudent());
  });

  $$("[data-only='admin']").forEach((element) => {
    element.classList.toggle("hidden", !isAdmin());
  });

  $$("[data-only='sonda']").forEach((element) => {
    element.classList.toggle("hidden", state.role !== "sonda");
  });
}

/* ================= NAVEGAÇÃO ================= */

function setupNavigation() {
  $$("[data-route]").forEach((button) => {
    button.addEventListener("click", () => {
      showView(button.dataset.route);
    });
  });

  $$("[data-route-button]").forEach((button) => {
    button.addEventListener("click", () => {
      showView(button.dataset.routeButton);
    });
  });

  $("#openQrDemo").addEventListener("click", () => {
    openClientView(state.products[0].id);
  });
}

function showView(viewId) {
  if ((viewId === "productFormView" || viewId === "recipeFormView") && !isStudent()) {
    showToast("Apenas alunos podem cadastrar produtos e receitas.");
    return;
  }

  if (viewId === "reviewView" && !isAdmin()) {
    showToast("Apenas Professor e Responsável Sonda podem revisar conteúdos.");
    return;
  }

  if (viewId === "sondaTraceabilityView" && state.role !== "sonda") {
    showToast("Apenas o Responsável Sonda pode acessar a rastreabilidade.");
    return;
  }

  $$(".view").forEach((view) => {
    view.classList.remove("active");
  });

  $(`#${viewId}`).classList.add("active");

  $$("[data-route]").forEach((button) => {
    button.classList.toggle("active", button.dataset.route === viewId);
  });

  if (viewId === "dashboardView") renderDashboard();
  if (viewId === "reviewView") renderReviewList();
  if (viewId === "recipeFormView") renderRecipeFoodOptions();
  if (viewId === "sondaTraceabilityView") renderTraceabilityProductOptions();
}

/* ================= DASHBOARD ================= */

function setupDashboardFilters() {
  $("#searchInput").addEventListener("input", renderDashboard);
  $("#categoryFilter").addEventListener("change", renderDashboard);
}

function renderDashboard() {
  $("#approvedCount").textContent = state.products.length;

  $("#pendingCount").textContent = state.submissions.filter(
    (item) => item.status === "Pendente de Aprovação"
  ).length;

  $("#recipeCount").textContent = state.recipes.length;

  renderItemsGrid();
}

function renderItemsGrid() {
  const grid = $("#itemsGrid");
  const search = $("#searchInput").value.trim().toLowerCase();
  const category = $("#categoryFilter").value;

  let products = [...state.products];

  if (search) {
    products = products.filter((item) => item.name.toLowerCase().includes(search));
  }

  if (category !== "all") {
    products = products.filter((item) => item.category === category);
  }

  if (!products.length) {
    grid.innerHTML = `
      <article class="item-card">
        <div class="item-body">
          <h3>Nenhum item encontrado</h3>
          <p>Tente alterar a busca ou a categoria selecionada.</p>
        </div>
      </article>
    `;
    return;
  }

  grid.innerHTML = products.map((item) => `
    <article class="item-card">
      <div class="item-top">
        ${productImage(item, "item-photo")}
        <span class="item-category">${escapeHTML(item.category)}</span>
      </div>

      <div class="item-body">
        <h3>${escapeHTML(item.name)}</h3>
        <p>${escapeHTML(item.description)}</p>

        <div class="nutrition-row">
          <div class="nutrition-chip">
            <strong>${escapeHTML(item.calories || "-")}</strong>
            <span>Calorias</span>
          </div>

          <div class="nutrition-chip">
            <strong>${escapeHTML(item.protein || "-")}</strong>
            <span>Proteínas</span>
          </div>

          <div class="nutrition-chip">
            <strong>${escapeHTML(item.carbs || "-")}</strong>
            <span>Carboidratos</span>
          </div>

          <div class="nutrition-chip">
            <strong>${escapeHTML(item.fiber || "-")}</strong>
            <span>Fibras</span>
          </div>
        </div>
      </div>

      <div class="card-actions">
        <button type="button" class="details" data-detail-id="${item.id}">
          Detalhes
        </button>

        <button type="button" class="qr" data-qr-id="${item.id}">
          Ver QR
        </button>
      </div>
    </article>
  `).join("");

  $$("[data-detail-id]").forEach((button) => {
    button.addEventListener("click", () => {
      openProductDetails(Number(button.dataset.detailId));
    });
  });

  $$("[data-qr-id]").forEach((button) => {
    button.addEventListener("click", () => {
      openClientView(Number(button.dataset.qrId));
    });
  });
}

function productImage(product, className) {
  const src = product.image || PRODUCT_PLACEHOLDER;
  const alt = product.name || "Foto do produto";

  return `
    <img
      class="${className}"
      src="${escapeHTML(src)}"
      alt="${escapeHTML(alt)}"
      onerror="this.replaceWith(createImageFallback())"
    />
  `;
}

function createImageFallback() {
  const div = document.createElement("div");
  div.className = "image-fallback";
  div.textContent = "Foto do alimento";
  return div;
}

function openProductDetails(id) {
  const item = state.products.find((product) => product.id === id);
  if (!item) return;

  $("#modalContent").innerHTML = `
    <h2>${escapeHTML(item.name)}</h2>

    ${productImage(item, "modal-product-photo")}

    <p><strong>Categoria:</strong> ${escapeHTML(item.category)}</p>
    <p><strong>Peso:</strong> ${escapeHTML(item.weight || "-")}</p>
    <p><strong>Descrição:</strong> ${escapeHTML(item.description || "-")}</p>

    ${renderClientTraceability(item)}

    <div class="client-nutrition-grid">
      ${nutritionBox("Calorias", item.calories)}
      ${nutritionBox("Carboidratos", item.carbs)}
      ${nutritionBox("Proteínas", item.protein)}
      ${nutritionBox("Gorduras", item.fat)}
      ${nutritionBox("Fibras", item.fiber)}
      ${nutritionBox("Potássio", item.potassium)}
    </div>

    <div class="modal-actions">
      <button type="button" class="button secondary" id="modalQrButton">
        Ver como cliente
      </button>
    </div>
  `;

  $("#modal").classList.remove("hidden");

  $("#modalQrButton").addEventListener("click", () => {
    closeModal();
    openClientView(item.id);
  });
}

/* ================= PRODUTO ================= */

function setupProductForm() {
  $("#productPhotoInput").addEventListener("change", handleProductPhoto);

  $("#clearProductButton").addEventListener("click", () => {
    state.selectedProductImage = null;
    $("#productPhotoPreview").innerHTML = "<span>Preview da foto do alimento</span>";
  });

  $("#productForm").addEventListener("submit", (event) => {
    event.preventDefault();

    if (!isStudent()) {
      showToast("Apenas alunos podem enviar produtos.");
      return;
    }

    const data = Object.fromEntries(new FormData(event.currentTarget));

    const submission = {
      id: Date.now(),
      type: "product",
      status: "Pendente de Aprovação",
      author: "Aluno",
      createdAt: getToday(),
      title: data.name || "Produto sem nome",
      flags: [],
      payload: {
        ...data,
        image: state.selectedProductImage || PRODUCT_PLACEHOLDER,
        traceability: {}
      }
    };

    state.submissions.unshift(submission);

    event.currentTarget.reset();
    state.selectedProductImage = null;
    $("#productPhotoPreview").innerHTML = "<span>Preview da foto do alimento</span>";

    renderDashboard();
    renderReviewList();

    showToast("Produto enviado como pendente de aprovação.");
    showView("dashboardView");
  });
}

function handleProductPhoto(event) {
  const file = event.target.files[0];

  if (!file) {
    state.selectedProductImage = null;
    $("#productPhotoPreview").innerHTML = "<span>Preview da foto do alimento</span>";
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    state.selectedProductImage = reader.result;
    $("#productPhotoPreview").innerHTML = `
      <img src="${reader.result}" alt="Preview do alimento" />
    `;
  };

  reader.readAsDataURL(file);
}

/* ================= RECEITA ================= */

function setupRecipeForm() {
  $("#recipePhotoInput").addEventListener("change", handleRecipePhoto);

  $("#clearRecipeButton").addEventListener("click", () => {
    state.selectedRecipeImage = null;
    $("#recipePhotoPreview").innerHTML = "<span>Preview da foto</span>";
  });

  $("#recipeForm").addEventListener("submit", (event) => {
    event.preventDefault();

    if (!isStudent()) {
      showToast("Apenas alunos podem enviar receitas.");
      return;
    }

    const data = Object.fromEntries(new FormData(event.currentTarget));

    const validationText = `${data.ingredients || ""} ${data.preparation || ""}`;
    const flags = simulateOrthographyValidation(validationText);

    const submission = {
      id: Date.now(),
      type: "recipe",
      status: "Pendente de Aprovação",
      author: "Aluno",
      createdAt: getToday(),
      title: data.title || "Receita sem nome",
      flags,
      payload: {
        ...data,
        foodId: Number(data.foodId),
        photo: state.selectedRecipeImage
      }
    };

    state.submissions.unshift(submission);

    event.currentTarget.reset();
    state.selectedRecipeImage = null;
    $("#recipePhotoPreview").innerHTML = "<span>Preview da foto</span>";

    renderDashboard();
    renderReviewList();

    showToast("Receita enviada como pendente de aprovação.");
    showView("dashboardView");
  });
}

function renderRecipeFoodOptions() {
  const select = $("#recipeFoodSelect");

  select.innerHTML = state.products.map((product) => `
    <option value="${product.id}">
      ${escapeHTML(product.name)}
    </option>
  `).join("");
}

function handleRecipePhoto(event) {
  const file = event.target.files[0];

  if (!file) {
    state.selectedRecipeImage = null;
    $("#recipePhotoPreview").innerHTML = "<span>Preview da foto</span>";
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    state.selectedRecipeImage = reader.result;
    $("#recipePhotoPreview").innerHTML = `
      <img src="${reader.result}" alt="Preview da receita" />
    `;
  };

  reader.readAsDataURL(file);
}

function simulateOrthographyValidation(text) {
  const rules = [
    {
      pattern: /\bconcerteza\b/gi,
      message: "Possível erro: use “com certeza”."
    },
    {
      pattern: /\bmuinto\b/gi,
      message: "Possível erro: use “muito”."
    },
    {
      pattern: /\bseje\b/gi,
      message: "Possível erro: use “seja”."
    },
    {
      pattern: /\bmecher\b/gi,
      message: "Possível erro: use “mexer”."
    },
    {
      pattern: /(.)\1{4,}/gi,
      message: "Possível erro: letras repetidas em excesso."
    }
  ];

  const flags = [];

  rules.forEach((rule) => {
    if (rule.pattern.test(text)) {
      flags.push(rule.message);
    }
  });

  return flags;
}

/* ================= REVISÃO ================= */

function setupReview() {
  renderReviewList();
}

function renderReviewList() {
  const list = $("#reviewList");

  if (!isAdmin()) {
    list.innerHTML = `
      <article class="review-card">
        <h3>Acesso restrito</h3>
        <p>Somente Professor e Responsável Sonda podem acessar esta área.</p>
      </article>
    `;
    return;
  }

  if (!state.submissions.length) {
    list.innerHTML = `
      <article class="review-card">
        <h3>Nenhuma submissão encontrada</h3>
        <p>Quando alunos enviarem produtos ou receitas, eles aparecerão aqui.</p>
      </article>
    `;
    return;
  }

  list.innerHTML = state.submissions.map((item) => {
    const isPending = item.status === "Pendente de Aprovação";

    const imageHTML = item.type === "product" && item.payload.image
      ? `<img class="review-image" src="${escapeHTML(item.payload.image)}" alt="Foto enviada" />`
      : item.type === "recipe" && item.payload.photo
        ? `<img class="review-image" src="${escapeHTML(item.payload.photo)}" alt="Foto da receita" />`
        : "";

    const flagHTML = item.flags.length
      ? `
        <div class="flag-box">
          ⚠ Alertas detectados:
          <ul>
            ${item.flags.map((flag) => `<li>${escapeHTML(flag)}</li>`).join("")}
          </ul>
        </div>
      `
      : "";

    return `
      <article class="review-card">
        <div class="review-head">
          <div>
            <h3>${escapeHTML(item.title)}</h3>
            <p>
              Tipo: <strong>${item.type === "product" ? "Produto" : "Receita"}</strong>
              • Enviado por: ${item.author}
              • Data: ${item.createdAt}
            </p>
          </div>

          <span class="status-pill ${isPending ? "status-pending" : "status-approved"}">
            ${item.status}
          </span>
        </div>

        ${imageHTML}
        ${flagHTML}

        <p class="review-summary">
          ${escapeHTML(getSubmissionSummary(item))}
        </p>

        <div class="review-actions">
          <button type="button" class="edit" data-edit-id="${item.id}">
            Visualizar / Editar
          </button>

          ${
            isPending
              ? `<button type="button" class="approve" data-approve-id="${item.id}">Aprovar</button>`
              : ""
          }
        </div>
      </article>
    `;
  }).join("");

  $$("[data-edit-id]").forEach((button) => {
    button.addEventListener("click", () => {
      openEditModal(Number(button.dataset.editId));
    });
  });

  $$("[data-approve-id]").forEach((button) => {
    button.addEventListener("click", () => {
      approveSubmission(Number(button.dataset.approveId));
    });
  });
}

function getSubmissionSummary(item) {
  if (item.type === "product") {
    return `Categoria: ${item.payload.category || "Não informado"} | Calorias: ${item.payload.calories || "Não informado"} | Proteínas: ${item.payload.protein || "Não informado"}`;
  }

  return `Dificuldade: ${item.payload.difficulty || "Não informado"} | Tempo: ${item.payload.prepTime || "Não informado"} | Porções: ${item.payload.portions || "Não informado"}`;
}

function approveSubmission(id) {
  const item = state.submissions.find((submission) => submission.id === id);
  if (!item) return;

  item.status = "Aprovado";

  if (item.type === "product") {
    state.products.unshift({
      id: Date.now(),
      name: item.payload.name || item.title,
      image: item.payload.image || PRODUCT_PLACEHOLDER,
      category: item.payload.category || "Sem categoria",
      origin: item.payload.origin || "leaf",
      weight: item.payload.weight || "100g",
      description: item.payload.description || "Sem descrição.",
      calories: item.payload.calories || "-",
      carbs: item.payload.carbs || "-",
      protein: item.payload.protein || "-",
      fat: item.payload.fat || "-",
      fiber: item.payload.fiber || "-",
      potassium: item.payload.potassium || "-",
      iron: item.payload.iron || "-",
      water: item.payload.water || "-",
      sodium: item.payload.sodium || "-",
      vitaminA: item.payload.vitaminA || "-",
      vitaminC: item.payload.vitaminC || "-",
      traceability: item.payload.traceability || {}
    });
  }

  if (item.type === "recipe") {
    state.recipes.unshift({
      id: Date.now(),
      foodId: Number(item.payload.foodId),
      title: item.payload.title || item.title,
      difficulty: item.payload.difficulty || "-",
      prepTime: item.payload.prepTime || "-",
      portions: item.payload.portions || "-",
      photo: item.payload.photo || null,
      ingredients: item.payload.ingredients || "-",
      preparation: item.payload.preparation || "-"
    });
  }

  renderDashboard();
  renderReviewList();
  renderRecipeFoodOptions();
  renderTraceabilityProductOptions();

  showToast("Conteúdo aprovado com sucesso.");
}

/* ================= MODAL DE EDIÇÃO ================= */

function openEditModal(id) {
  const item = state.submissions.find((submission) => submission.id === id);
  if (!item) return;

  state.editingSubmissionId = id;

  if (item.type === "product") {
    renderProductEditModal(item);
  } else {
    renderRecipeEditModal(item);
  }

  $("#modal").classList.remove("hidden");
}

function renderProductEditModal(item) {
  const data = item.payload;

  $("#modalContent").innerHTML = `
    <h2>Editar produto</h2>

    ${data.image ? `<img class="modal-product-photo" src="${escapeHTML(data.image)}" alt="Foto do produto" />` : ""}

    <form id="editForm" class="form-card" novalidate>
      <div class="form-grid two">
        <label>
          Nome
          <input name="name" value="${attr(data.name)}" />
        </label>

        <label>
          Categoria
          <select name="category">
            ${option("Hortaliças", data.category)}
            ${option("Frutas", data.category)}
            ${option("Raízes", data.category)}
          </select>
        </label>

        <label>
          Origem
          <select name="origin">
            ${option("tree", data.origin, "Árvore")}
            ${option("earth", data.origin, "Terra / Solo")}
            ${option("leaf", data.origin, "Folhagem")}
          </select>
        </label>

        <label>
          Peso
          <input name="weight" value="${attr(data.weight)}" />
        </label>
      </div>

      <label>
        Descrição
        <textarea name="description" rows="4">${escapeHTML(data.description)}</textarea>
      </label>

      <div class="form-grid three">
        <label>Calorias <input name="calories" value="${attr(data.calories)}" /></label>
        <label>Carboidratos <input name="carbs" value="${attr(data.carbs)}" /></label>
        <label>Proteínas <input name="protein" value="${attr(data.protein)}" /></label>
        <label>Gorduras <input name="fat" value="${attr(data.fat)}" /></label>
        <label>Fibras <input name="fiber" value="${attr(data.fiber)}" /></label>
        <label>Potássio <input name="potassium" value="${attr(data.potassium)}" /></label>
        <label>Ferro <input name="iron" value="${attr(data.iron)}" /></label>
        <label>Água <input name="water" value="${attr(data.water)}" /></label>
        <label>Sódio <input name="sodium" value="${attr(data.sodium)}" /></label>
        <label>Vitamina A <input name="vitaminA" value="${attr(data.vitaminA)}" /></label>
        <label>Vitamina C <input name="vitaminC" value="${attr(data.vitaminC)}" /></label>
      </div>

      <div class="modal-actions">
        <button type="button" class="button ghost" id="cancelEdit">Cancelar</button>
        <button type="submit" class="button primary">Salvar alterações</button>
      </div>
    </form>
  `;

  bindEditForm();
}

function renderRecipeEditModal(item) {
  const data = item.payload;

  const flags = item.flags.length
    ? `
      <div class="flag-box">
        ⚠ Alertas de ortografia:
        <ul>
          ${item.flags.map((flag) => `<li>${escapeHTML(flag)}</li>`).join("")}
        </ul>
      </div>
    `
    : "";

  $("#modalContent").innerHTML = `
    <h2>Editar receita</h2>

    ${data.photo ? `<img class="modal-product-photo" src="${escapeHTML(data.photo)}" alt="Foto da receita" />` : ""}
    ${flags}

    <form id="editForm" class="form-card" novalidate>
      <div class="form-grid two">
        <label>
          Nome da receita
          <input name="title" value="${attr(data.title)}" />
        </label>

        <label>
          Alimento relacionado
          <select name="foodId">
            ${state.products.map((product) => `
              <option value="${product.id}" ${Number(data.foodId) === product.id ? "selected" : ""}>
                ${escapeHTML(product.name)}
              </option>
            `).join("")}
          </select>
        </label>
      </div>

      <div class="form-grid three">
        <label>
          Dificuldade
          <select name="difficulty">
            ${option("Fácil", data.difficulty)}
            ${option("Médio", data.difficulty)}
            ${option("Difícil", data.difficulty)}
          </select>
        </label>

        <label>
          Tempo de preparo
          <select name="prepTime">
            ${option("10 min", data.prepTime)}
            ${option("20 min", data.prepTime)}
            ${option("30 min", data.prepTime)}
            ${option("1 hora ou mais", data.prepTime)}
          </select>
        </label>

        <label>
          Porções
          <select name="portions">
            ${option("10", data.portions)}
            ${option("15", data.portions)}
            ${option("20", data.portions)}
          </select>
        </label>
      </div>

      <div class="form-grid two">
        <label>
          Ingredientes
          <textarea name="ingredients" rows="6">${escapeHTML(data.ingredients)}</textarea>
        </label>

        <label>
          Modo de preparo
          <textarea name="preparation" rows="6">${escapeHTML(data.preparation)}</textarea>
        </label>
      </div>

      <div class="modal-actions">
        <button type="button" class="button ghost" id="cancelEdit">Cancelar</button>
        <button type="submit" class="button primary">Salvar alterações</button>
      </div>
    </form>
  `;

  bindEditForm();
}

function bindEditForm() {
  $("#cancelEdit").addEventListener("click", closeModal);

  $("#editForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const item = state.submissions.find(
      (submission) => submission.id === state.editingSubmissionId
    );

    if (!item) return;

    const data = Object.fromEntries(new FormData(event.currentTarget));

    item.payload = {
      ...item.payload,
      ...data,
      foodId: data.foodId ? Number(data.foodId) : item.payload.foodId
    };

    item.title = data.name || data.title || item.title;

    if (item.type === "recipe") {
      const validationText = `${data.ingredients || ""} ${data.preparation || ""}`;
      item.flags = simulateOrthographyValidation(validationText);
    }

    closeModal();
    renderReviewList();

    showToast("Alterações salvas.");
  });
}

/* ================= RASTREABILIDADE ================= */

function setupTraceability() {
  const form = $("#traceabilityForm");
  const mapsButton = $("#openMapsButton");
  const productSelect = $("#traceProductSelect");

  if (!form || !mapsButton || !productSelect) return;

  form.addEventListener("submit", handleTraceabilitySubmit);
  productSelect.addEventListener("change", loadTraceabilityIntoForm);

  mapsButton.addEventListener("click", () => {
    const address = $("#farmAddressInput").value.trim();

    if (!address) {
      showToast("Digite o endereço do fornecedor antes de abrir o Maps.");
      return;
    }

    const mapsUrl = createGoogleMapsUrl(address);
    $("#mapsUrlInput").value = mapsUrl;
    window.open(mapsUrl, "_blank");
  });
}

function renderTraceabilityProductOptions() {
  const select = $("#traceProductSelect");

  if (!select) return;

  select.innerHTML = state.products.map((product) => `
    <option value="${product.id}">
      ${escapeHTML(product.name)} - ${escapeHTML(product.category)}
    </option>
  `).join("");

  loadTraceabilityIntoForm();
}

function loadTraceabilityIntoForm() {
  const select = $("#traceProductSelect");
  const form = $("#traceabilityForm");

  if (!select || !form) return;

  const productId = Number(select.value);
  const product = state.products.find((item) => item.id === productId);

  if (!product) return;

  const trace = product.traceability || {};

  form.marketProductId.value = trace.marketProductId || "";
  form.batchCode.value = trace.batchCode || "";
  form.receivedAt.value = trace.receivedAt || "";
  form.expiresAt.value = trace.expiresAt || "";
  form.supplierName.value = trace.supplierName || "";
  form.supplierContact.value = trace.supplierContact || "";
  form.farmAddress.value = trace.farmAddress || "";
  form.mapsUrl.value = trace.mapsUrl || "";
  form.traceNotes.value = trace.traceNotes || "";
}

function handleTraceabilitySubmit(event) {
  event.preventDefault();

  if (state.role !== "sonda") {
    showToast("Apenas o Responsável Sonda pode salvar rastreabilidade.");
    return;
  }

  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form));
  const productId = Number(data.productId);

  const product = state.products.find((item) => item.id === productId);

  if (!product) {
    showToast("Produto não encontrado.");
    return;
  }

  product.traceability = {
    marketProductId: data.marketProductId,
    batchCode: data.batchCode,
    receivedAt: data.receivedAt,
    expiresAt: data.expiresAt,
    supplierName: data.supplierName,
    supplierContact: data.supplierContact,
    farmAddress: data.farmAddress,
    mapsUrl: data.mapsUrl || (data.farmAddress ? createGoogleMapsUrl(data.farmAddress) : ""),
    traceNotes: data.traceNotes
  };

  showToast("Dados de rastreabilidade salvos pelo Sonda.");

  renderDashboard();
}

function createGoogleMapsUrl(address) {
  const query = encodeURIComponent(address);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

/* ================= CLIENTE ================= */

function setupClient() {
  $("#exitClientDemo").addEventListener("click", () => {
    $("#clientView").classList.add("hidden");
    $("#appView").classList.remove("hidden");
  });

  $$("[data-client-category]").forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.clientCategory;
      const product = state.products.find((item) => item.category === category);

      if (product) {
        openClientView(product.id);
      }
    });
  });

  $$("[data-client-section]").forEach((button) => {
    button.addEventListener("click", () => {
      state.clientSection = button.dataset.clientSection;
      renderClientSection();
    });
  });
}

function openClientView(productId) {
  state.clientItemId = productId;
  state.clientSection = "info";

  $("#loginView").classList.add("hidden");
  $("#appView").classList.add("hidden");
  $("#clientView").classList.remove("hidden");

  renderClientView();
}

function renderClientView() {
  renderClientCategoryTabs();
  renderClientBackground();
  renderClientInfo();
  renderClientRecipes();
  renderClientSection();
}

function getCurrentClientProduct() {
  return state.products.find((product) => product.id === state.clientItemId);
}

function renderClientCategoryTabs() {
  const product = getCurrentClientProduct();

  $$("[data-client-category]").forEach((button) => {
    button.classList.toggle("active", button.dataset.clientCategory === product.category);
  });
}

function renderClientBackground() {
  const product = getCurrentClientProduct();
  const shell = $("#clientView");

  shell.classList.remove("qr-tree", "qr-earth", "qr-leaf");

  if (product.origin === "tree") {
    shell.classList.add("qr-tree");
  } else if (product.origin === "earth") {
    shell.classList.add("qr-earth");
  } else {
    shell.classList.add("qr-leaf");
  }
}

function renderClientInfo() {
  const product = getCurrentClientProduct();

  $("#clientInfoPanel").innerHTML = `
    <article class="client-card">
      <div class="client-hero">
        ${productImage(product, "client-product-image")}

        <div class="client-product-title">
          <h2>${escapeHTML(product.name)}</h2>
          <p>${escapeHTML(product.category)} • ${escapeHTML(product.weight || "100g")}</p>
        </div>
      </div>

      <div class="client-content">
        <h3>Informações nutricionais</h3>

        <p class="client-description">
          ${escapeHTML(product.description || "Informações nutricionais do alimento selecionado.")}
        </p>

        ${renderClientTraceability(product)}

        <div class="client-nutrition-grid">
          ${nutritionBox("Calorias", product.calories)}
          ${nutritionBox("Carboidratos", product.carbs)}
          ${nutritionBox("Proteínas", product.protein)}
          ${nutritionBox("Gorduras", product.fat)}
          ${nutritionBox("Fibras", product.fiber)}
          ${nutritionBox("Potássio", product.potassium)}
          ${nutritionBox("Ferro", product.iron)}
          ${nutritionBox("Água", product.water)}
          ${nutritionBox("Sódio", product.sodium)}
          ${nutritionBox("Vitamina A", product.vitaminA)}
          ${nutritionBox("Vitamina C", product.vitaminC)}
        </div>
      </div>
    </article>
  `;
}

function renderClientTraceability(product) {
  const trace = product.traceability;

  if (!trace || !trace.supplierName) {
    return `
      <div class="origin-card">
        <strong>Origem do produto</strong>
        <p>Dados de origem ainda não informados pelo Mercado Sonda.</p>
      </div>
    `;
  }

  return `
    <div class="origin-card">
      <strong>Origem do produto</strong>

      <p>
        Fornecedor: ${escapeHTML(trace.supplierName)}<br>
        Lote: ${escapeHTML(trace.batchCode || "Não informado")}<br>
        ID Sonda: ${escapeHTML(trace.marketProductId || "Não informado")}<br>
        Local: ${escapeHTML(trace.farmAddress || "Não informado")}
      </p>

      ${
        trace.mapsUrl
          ? `<a href="${escapeHTML(trace.mapsUrl)}" target="_blank" rel="noopener noreferrer">
              Ver localização no Maps
            </a>`
          : ""
      }
    </div>
  `;
}

function renderClientRecipes() {
  const product = getCurrentClientProduct();
  const recipe = state.recipes.find((item) => item.foodId === product.id);

  if (!recipe) {
    $("#clientRecipesPanel").innerHTML = `
      <article class="client-card recipe-client-card">
        <div class="recipe-image">Sem receita aprovada</div>
        <h2>Receitas com ${escapeHTML(product.name)}</h2>
        <p class="client-description">
          Ainda não há receitas aprovadas para este alimento.
        </p>
      </article>
    `;
    return;
  }

  $("#clientRecipesPanel").innerHTML = `
    <article class="client-card recipe-client-card">
      <div class="recipe-image">
        ${
          recipe.photo
            ? `<img src="${recipe.photo}" alt="Foto da receita" />`
            : "Receita sem foto"
        }
      </div>

      <h2>${escapeHTML(recipe.title)}</h2>

      <div class="recipe-meta">
        <div>
          <strong>Dificuldade</strong>
          ${escapeHTML(recipe.difficulty)}
        </div>

        <div>
          <strong>Tempo</strong>
          ${escapeHTML(recipe.prepTime)}
        </div>

        <div>
          <strong>Porções</strong>
          ${escapeHTML(recipe.portions)}
        </div>
      </div>

      <div class="recipe-text">
        <article>
          <h3>Ingredientes</h3>
          <p>${escapeHTML(recipe.ingredients)}</p>
        </article>

        <article>
          <h3>Modo de preparo</h3>
          <p>${escapeHTML(recipe.preparation)}</p>
        </article>
      </div>
    </article>
  `;
}

function renderClientSection() {
  $$("[data-client-section]").forEach((button) => {
    button.classList.toggle("active", button.dataset.clientSection === state.clientSection);
  });

  $("#clientInfoPanel").classList.toggle("active", state.clientSection === "info");
  $("#clientRecipesPanel").classList.toggle("active", state.clientSection === "recipes");
}

function nutritionBox(label, value) {
  return `
    <div class="client-nutrition-box">
      <strong>${escapeHTML(value || "-")}</strong>
      <span>${escapeHTML(label)}</span>
    </div>
  `;
}

/* ================= MODAL ================= */

function setupModal() {
  $("#closeModal").addEventListener("click", closeModal);

  $("#modal").addEventListener("click", (event) => {
    if (event.target.id === "modal") {
      closeModal();
    }
  });
}

function closeModal() {
  state.editingSubmissionId = null;
  $("#modal").classList.add("hidden");
}

/* ================= HELPERS ================= */

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function showToast(message) {
  const toast = $("#toast");

  toast.textContent = message;
  toast.classList.remove("hidden");

  setTimeout(() => {
    toast.classList.add("hidden");
  }, 2600);
}

function option(value, currentValue, label = value) {
  const selected = value === currentValue ? "selected" : "";
  return `<option value="${value}" ${selected}>${label}</option>`;
}

function escapeHTML(value) {
  if (value === undefined || value === null) return "";

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function attr(value) {
  return escapeHTML(value).replaceAll('"', "&quot;");
}

window.NutriSanta = {
  state,
  openClientView,
  logout
};
