const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const roleLabels = {
  student: "Aluno",
  teacher: "Professor",
  sonda: "Responsável Sonda"
};

const viewTitles = {
  dashboardView: "Dashboard",
  productFormView: "Novo Produto",
  recipeFormView: "Nova Receita",
  reviewView: "Revisão",
  recipeCatalogView: "Catálogo de Receitas",
  traceabilityView: "Rastreabilidade"
};

const state = {
  role: "student",
  selectedLoginRole: "student",
  clientProductId: null,
  clientTab: "info",
  clientCategory: "Frutas",
  clientReturnTarget: "login",
  traceabilityMode: "add",
  editingSubmissionId: null,

  products: [
    {
      id: 1,
      name: "Banana prata",
      category: "Frutas",
      origin: "tree",
      weight: "100g",
      photo: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=900&q=80",
      description: "Fruta de árvore, rica em carboidratos e indicada para lanches rápidos e preparações simples.",
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
      batch: "LT-2026-001",
      supplier: "Fazenda Vale Verde",
      validity: "2026-07-15",
      marketOrigin: "Registro - SP",
      traceCode: "NS-BAN-001",
      receivedAt: "2026-06-20",
      mapsQuery: "Fazenda Vale Verde Registro SP",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Fazenda%20Vale%20Verde%20Registro%20SP"
    },
    {
      id: 2,
      name: "Batata-doce",
      category: "Raízes",
      origin: "earth",
      weight: "100g",
      photo: "https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?auto=format&fit=crop&w=900&q=80",
      description: "Raiz de sabor adocicado, fonte de carboidratos complexos e muito usada em refeições equilibradas.",
      calories: "86 kcal",
      carbs: "20,1g",
      protein: "1,6g",
      fat: "0,1g",
      fiber: "3,0g",
      potassium: "337mg",
      iron: "0,6mg",
      water: "77%",
      sodium: "55mg",
      vitaminA: "709mcg",
      vitaminC: "2,4mg",
      batch: "",
      supplier: "",
      validity: "",
      marketOrigin: "",
      traceCode: "",
      receivedAt: "",
      mapsQuery: "",
      mapsUrl: ""
    },
    {
      id: 3,
      name: "Brócolis ninja",
      category: "Hortaliças",
      origin: "leaf",
      weight: "100g",
      photo: "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?auto=format&fit=crop&w=900&q=80",
      description: "Hortaliça rica em fibras, minerais e vitamina C, indicada para preparações cozidas ou refogadas.",
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
      batch: "",
      supplier: "",
      validity: "",
      marketOrigin: "",
      traceCode: "",
      receivedAt: "",
      mapsQuery: "",
      mapsUrl: ""
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
      photo: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80",
      ingredients: "Banana madura, ovos, aveia em flocos, canela e fermento químico.",
      preparation: "Amasse as bananas, misture os ingredientes e asse em forno médio até dourar."
    },
    {
      id: 102,
      foodId: 2,
      title: "Purê assado de batata-doce",
      difficulty: "Médio",
      prepTime: "30 min",
      portions: "15",
      photo: "https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?auto=format&fit=crop&w=900&q=80",
      ingredients: "Batata-doce cozida, azeite, sal, alho e cheiro-verde.",
      preparation: "Amasse a batata-doce, tempere, leve ao forno por alguns minutos e sirva ainda quente."
    }
  ],

  submissions: [
    {
      id: 201,
      type: "product",
      status: "Pendente de Aprovação",
      author: "Aluno Demo",
      createdAt: getToday(),
      title: "Laranja pera",
      payload: {
        name: "Laranja pera",
        category: "Frutas",
        origin: "tree",
        weight: "100g",
        photo: "https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?auto=format&fit=crop&w=900&q=80",
        description: "Fruta cítrica rica em vitamina C, usada para consumo direto e preparo de sucos.",
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
        vitaminC: "53mg"
      }
    },
    {
      id: 202,
      type: "recipe",
      status: "Pendente de Aprovação",
      author: "Aluno Demo",
      createdAt: getToday(),
      title: "Creme de batata doce",
      payload: {
        foodId: 2,
        title: "Creme de batata doce",
        difficulty: "Fácil",
        prepTime: "20 min",
        portions: "10",
        photo: "",
        ingredients: "Batata doce cozida, leite, sal e cheiro verde. Qnd desejar, adicione azeite.",
        preparation: "Amasse a batata doce, misture tudo e mexa ate formar um creme homogêneo."
      }
    }
  ]
};

document.addEventListener("DOMContentLoaded", initNutriSanta);

function initNutriSanta() {
  bindLogin();
  bindNavigation();
  bindForms();
  bindClientTabs();
  bindClientCategoryTabs();
  bindModal();
  bindFilters();
  bindTraceability();
  bindImageInputs(document);

  if (isClientPublicPage()) {
    initClientPublicPage();
    return;
  }

  showScreen("loginView");
  renderAll();
}

function isClientPublicPage() {
  const pageType = document.body ? document.body.dataset.page : "";
  const path = window.location.pathname.toLowerCase();

  return pageType === "client" || path.includes("cliente.html");
}

function initClientPublicPage() {
  renderAll();

  const params = new URLSearchParams(window.location.search);
  const productId = Number(params.get("produto") || params.get("product") || params.get("id"));
  const category = normalizeClientCategory(params.get("categoria") || params.get("category"));

  state.clientReturnTarget = "public";

  if (category) {
    state.clientCategory = category;
  }

  if (productId && getProduct(productId)) {
    openClientView(productId, "public");
    return;
  }

  openClientList("public");
}

function normalizeClientCategory(category) {
  if (!category) return "";

  const normalized = category
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (["fruta", "frutas"].includes(normalized)) return "Frutas";
  if (["raiz", "raizes", "raízes"].includes(normalized)) return "Raízes";
  if (["hortalica", "hortalicas", "hortaliças"].includes(normalized)) return "Hortaliças";

  return "";
}

function normalizeClientReturnTarget(returnTarget) {
  if (returnTarget === "app") return "app";
  if (returnTarget === "public") return "public";

  return "login";
}

function bindLogin() {
  $$("[data-login-role]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedLoginRole = button.dataset.loginRole;

      $$("[data-login-role]").forEach((item) => {
        item.classList.remove("selected");
      });

      button.classList.add("selected");
    });
  });

  const loginForm = $("#loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      login(state.selectedLoginRole);
    });
  }

  const openClientFromLogin = $("#openClientFromLogin");

  if (openClientFromLogin) {
    openClientFromLogin.addEventListener("click", () => openClientList("login"));
  }
}

function login(role) {
  state.role = role;

  showScreen("appView");
  applyRBAC();
  updateUserBadge();

  if (isAdmin()) {
    showView("reviewView");
  } else {
    showView("dashboardView");
  }

  renderAll();
  showToast(`Login realizado como ${roleLabels[role]}.`);
}

function logout() {
  state.role = "student";
  state.selectedLoginRole = "student";

  showScreen("loginView");
  showToast("Sessão encerrada.");
}

function showScreen(screenId) {
  $$(".screen").forEach((screen) => {
    screen.classList.remove("active");
  });

  const screen = $(`#${screenId}`);

  if (screen) {
    screen.classList.add("active");
  }
}

function isStudent() {
  return state.role === "student";
}

function isAdmin() {
  return state.role === "teacher" || state.role === "sonda";
}

function isSonda() {
  return state.role === "sonda";
}

function applyRBAC() {
  $$("[data-only='student']").forEach((element) => {
    element.classList.toggle("hidden", !isStudent());
  });

  $$("[data-only='admin']").forEach((element) => {
    element.classList.toggle("hidden", !isAdmin());
  });

  $$("[data-only='sonda']").forEach((element) => {
    element.classList.toggle("hidden", !isSonda());
  });
}

function updateUserBadge() {
  const label = roleLabels[state.role] || "Aluno";

  if ($("#sidebarAvatar")) $("#sidebarAvatar").textContent = label.charAt(0);
  if ($("#sidebarUserName")) $("#sidebarUserName").textContent = `${label} Demo`;
  if ($("#sidebarUserRole")) $("#sidebarUserRole").textContent = label;
}

function bindNavigation() {
  $$("[data-route]").forEach((button) => {
    button.addEventListener("click", () => {
      showView(button.dataset.route);
    });
  });

  $$("[data-back-dashboard]").forEach((button) => {
    button.addEventListener("click", () => {
      showView("dashboardView");
    });
  });

  const logoutButton = $("#logoutButton");
  if (logoutButton) logoutButton.addEventListener("click", logout);

  const openQrDemo = $("#openQrDemo");
  if (openQrDemo) openQrDemo.addEventListener("click", () => openClientList("app"));

  const backToAppFromClient = $("#backToAppFromClient");

  if (backToAppFromClient) {
    backToAppFromClient.addEventListener("click", () => {
      if (state.clientReturnTarget === "app") {
        showScreen("appView");
        showView("dashboardView");
        return;
      }

      if (state.clientReturnTarget === "public") {
        openClientList("public");
        return;
      }

      showScreen("loginView");
    });
  }

  const backToClientList = $("#backToClientList");
  if (backToClientList) {
    backToClientList.addEventListener("click", () => openClientList(state.clientReturnTarget));
  }
}

function showView(viewId) {
  if (["productFormView", "recipeFormView"].includes(viewId) && !isStudent()) {
    showToast("Apenas alunos podem cadastrar produtos e receitas.");
    return;
  }

  if (viewId === "reviewView" && !isAdmin()) {
    showToast("Apenas Professor e Responsável Sonda podem revisar conteúdos.");
    return;
  }

  if (viewId === "traceabilityView" && !isSonda()) {
    showToast("Apenas o Responsável Sonda acessa a rastreabilidade.");
    return;
  }

  $$(".view").forEach((view) => {
    view.classList.remove("active");
  });

  const target = $(`#${viewId}`);

  if (target) {
    target.classList.add("active");
  }

  $$("[data-route]").forEach((button) => {
    button.classList.toggle("active", button.dataset.route === viewId);
  });

  if ($("#topbarTitle")) {
    $("#topbarTitle").textContent = viewTitles[viewId] || "Painel";
  }

  if (viewId === "dashboardView") renderDashboard();
  if (viewId === "recipeFormView") renderRecipeFoodOptions();
  if (viewId === "reviewView") renderReviewList();
  if (viewId === "recipeCatalogView") renderRecipeCatalog();
  if (viewId === "traceabilityView") renderTraceabilityView();
}

function bindFilters() {
  const searchInput = $("#searchInput");
  if (searchInput) searchInput.addEventListener("input", renderDashboard);

  const categoryFilter = $("#categoryFilter");
  if (categoryFilter) categoryFilter.addEventListener("change", renderDashboard);

  const globalSearch = $("#globalSearch");

  if (globalSearch) {
    globalSearch.addEventListener("input", (event) => {
      if ($("#searchInput")) $("#searchInput").value = event.target.value;

      showView("dashboardView");
      renderDashboard();
    });
  }

  const recipeCatalogFilter = $("#recipeCatalogFilter");

  if (recipeCatalogFilter) {
    recipeCatalogFilter.addEventListener("change", renderRecipeCatalog);
  }
}

function renderAll() {
  renderDashboard();
  renderReviewList();
  renderRecipeFoodOptions();
  renderRecipeCatalogFilter();
  renderRecipeCatalog();
  renderTraceabilityView();
}

function renderDashboard() {
  const pending = state.submissions.filter((item) => item.status === "Pendente de Aprovação");
  const completedTraceability = state.products.filter((product) => hasTraceability(product));

  if ($("#approvedCount")) $("#approvedCount").textContent = state.products.length;
  if ($("#pendingCount")) $("#pendingCount").textContent = pending.length;
  if ($("#recipeCount")) $("#recipeCount").textContent = state.recipes.length;
  if ($("#traceabilityCount")) $("#traceabilityCount").textContent = completedTraceability.length;
  if ($("#pendingNavBadge")) $("#pendingNavBadge").textContent = pending.length;

  renderItemsGrid();
}

function renderItemsGrid() {
  const grid = $("#itemsGrid");

  if (!grid) return;

  const search = $("#searchInput") ? $("#searchInput").value.trim().toLowerCase() : "";
  const category = $("#categoryFilter") ? $("#categoryFilter").value : "all";

  let products = [...state.products];

  if (search) {
    products = products.filter((item) => {
      return [item.name, item.category, item.description]
        .join(" ")
        .toLowerCase()
        .includes(search);
    });
  }

  if (category !== "all") {
    products = products.filter((item) => item.category === category);
  }

  if (!products.length) {
    grid.innerHTML = `
      <div class="empty-state">
        Nenhum alimento encontrado com os filtros selecionados.
      </div>
    `;
    return;
  }

  grid.innerHTML = products.map((product) => `
    <article class="item-card ${originClass(product)}">
      ${renderProductMedia(product, "item-photo")}

      <div class="item-body">
        <span class="badge">${escapeHTML(product.category || "Categoria")}</span>
        <h3>${escapeHTML(product.name || "Alimento sem nome")}</h3>
        <p>${escapeHTML(product.description || "Descrição ainda não informada.")}</p>

        <div class="nutrition-row">
          ${nutritionChip("Calorias", product.calories)}
          ${nutritionChip("Proteínas", product.protein)}
          ${nutritionChip("Carboidratos", product.carbs)}
          ${nutritionChip("Fibras", product.fiber)}
        </div>
      </div>

      <div class="item-actions">
        <button class="btn btn-secondary btn-sm" type="button" data-open-client="${product.id}">
          <svg><use href="#i-qr"></use></svg>
          Ver QR
        </button>
      </div>
    </article>
  `).join("");

  $$("[data-open-client]").forEach((button) => {
    button.addEventListener("click", () => {
      openClientView(Number(button.dataset.openClient), "app");
    });
  });
}

function nutritionChip(label, value) {
  return `
    <div class="nutrition-chip">
      <strong>${escapeHTML(value || "—")}</strong>
      <span>${escapeHTML(label)}</span>
    </div>
  `;
}

function renderProductMedia(product, className = "item-photo") {
  if (product.photo) {
    return `
      <img
        class="${className}"
        src="${escapeAttr(product.photo)}"
        alt="Foto de ${escapeAttr(product.name || "alimento")}"
      />
    `;
  }

  return `
    <div class="product-placeholder ${className}">
      <svg><use href="#i-image"></use></svg>
    </div>
  `;
}

function bindForms() {
  const productForm = $("#productForm");

  if (productForm) {
    productForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const payload = readForm(event.currentTarget);

      createSubmission("product", payload.name || "Produto sem título", payload);

      event.currentTarget.reset();
      clearFormImages(event.currentTarget);

      showView("dashboardView");
      showToast("Produto enviado para revisão.");
    });

    productForm.addEventListener("reset", (event) => {
      window.setTimeout(() => clearFormImages(event.currentTarget), 0);
    });
  }

  const recipeForm = $("#recipeForm");

  if (recipeForm) {
    recipeForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const payload = readForm(event.currentTarget);
      payload.foodId = Number(payload.foodId) || "";

      createSubmission("recipe", payload.title || "Receita sem título", payload);

      event.currentTarget.reset();
      clearFormImages(event.currentTarget);

      showView("dashboardView");
      showToast("Receita enviada para revisão.");
    });

    recipeForm.addEventListener("reset", (event) => {
      window.setTimeout(() => clearFormImages(event.currentTarget), 0);
    });
  }
}

function readForm(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function createSubmission(type, title, payload) {
  state.submissions.unshift({
    id: Date.now(),
    type,
    status: "Pendente de Aprovação",
    author: roleLabels[state.role] || "Usuário",
    createdAt: getToday(),
    title,
    payload
  });

  renderAll();
}

function bindImageInputs(scope = document) {
  $$("[data-image-input]", scope).forEach((input) => {
    input.addEventListener("change", handleImageInput);
  });
}

function handleImageInput(event) {
  const input = event.currentTarget;
  const file = input.files && input.files[0];

  const targetId = input.dataset.target;
  const previewId = input.dataset.preview;

  const hiddenInput = targetId ? $(`#${targetId}`) : null;
  const preview = previewId ? $(`#${previewId}`) : null;

  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    if (hiddenInput) {
      hiddenInput.value = reader.result;
    }

    if (preview) {
      preview.innerHTML = `
        <img src="${reader.result}" alt="Prévia da imagem selecionada" />
      `;

      preview.classList.remove("hidden");
    }
  };

  reader.readAsDataURL(file);
}

function clearFormImages(form) {
  $$("input[type='hidden'][name='photo']", form).forEach((input) => {
    input.value = "";
  });

  $$(".image-preview", form).forEach((preview) => {
    preview.innerHTML = "";
    preview.classList.add("hidden");
  });
}

function renderRecipeFoodOptions() {
  const select = $("#recipeFoodSelect");

  if (!select) return;

  const current = select.value;

  select.innerHTML = `
    <option value="">Selecione um alimento aprovado</option>
    ${state.products.map((item) => `
      <option value="${item.id}">${escapeHTML(item.name)}</option>
    `).join("")}
  `;

  select.value = current;
}

function renderReviewList() {
  const list = $("#reviewList");

  if (!list) return;

  const pending = state.submissions.filter((item) => item.status === "Pendente de Aprovação");

  if ($("#pendingNavBadge")) $("#pendingNavBadge").textContent = pending.length;

  if (!pending.length) {
    list.innerHTML = `
      <div class="empty-state">
        Não há conteúdos pendentes no momento.
      </div>
    `;
    return;
  }

  list.innerHTML = pending.map((submission) => {
    const flags = getSubmissionFlags(submission);
    const typeLabel = submission.type === "product" ? "Produto" : "Receita";

    return `
      <article class="review-card">
        <div class="review-body">
          <div class="item-meta">
            <span class="badge pending">Pendente</span>
            <span class="badge">${typeLabel}</span>
          </div>

          <h3>${escapeHTML(submission.title)}</h3>
          <p>Enviado por ${escapeHTML(submission.author)} em ${escapeHTML(submission.createdAt)}.</p>

          ${flags.length ? renderFlagList(flags) : ""}
        </div>

        <div class="review-actions">
          <button class="btn btn-secondary btn-sm" type="button" data-edit-submission="${submission.id}">
            <svg><use href="#i-edit"></use></svg>
            Editar
          </button>

          <button class="btn btn-primary btn-sm" type="button" data-approve-submission="${submission.id}">
            <svg><use href="#i-check"></use></svg>
            Aprovar
          </button>
        </div>
      </article>
    `;
  }).join("");

  $$("[data-edit-submission]").forEach((button) => {
    button.addEventListener("click", () => {
      openEditModal(Number(button.dataset.editSubmission));
    });
  });

  $$("[data-approve-submission]").forEach((button) => {
    button.addEventListener("click", () => {
      approveSubmission(Number(button.dataset.approveSubmission));
    });
  });
}

function getSubmissionFlags(submission) {
  if (submission.type !== "recipe") return [];

  const text = `${submission.payload.ingredients || ""} ${submission.payload.preparation || ""}`.toLowerCase();
  const flags = [];

  if (/\bqnd\b/.test(text)) flags.push("Abreviação informal: qnd");
  if (/\bate\b/.test(text)) flags.push("Possível ausência de acento: até");
  if (/batata doce/.test(text)) flags.push("Padronizar grafia: batata-doce");

  if (text.length > 0 && !/[.!?]$/.test(text.trim())) {
    flags.push("Texto pode precisar de pontuação final");
  }

  return flags;
}

function renderFlagList(flags) {
  return `
    <div class="flag-list">
      ${flags.map((flag) => `
        <span class="badge flag">${escapeHTML(flag)}</span>
      `).join("")}
    </div>

    <div class="flag-note">
      As flags aparecem apenas na revisão e simulam alertas de ortografia/padronização.
    </div>
  `;
}

function openEditModal(id) {
  const submission = state.submissions.find((item) => item.id === id);

  if (!submission) return;

  state.editingSubmissionId = id;

  if ($("#editModalTitle")) {
    $("#editModalTitle").textContent = submission.type === "product"
      ? "Editar produto"
      : "Editar receita";
  }

  const editForm = $("#editForm");

  if (!editForm) return;

  editForm.innerHTML = submission.type === "product"
    ? productEditForm(submission.payload)
    : recipeEditForm(submission.payload, getSubmissionFlags(submission));

  editForm.onsubmit = (event) => {
    event.preventDefault();
    saveModalEdition();
  };

  bindImageInputs(editForm);

  const modal = $("#editModal");

  if (modal) {
    modal.classList.remove("hidden");
  }
}

function productEditForm(data) {
  return `
    <div class="panel-form">
      <div class="form-section">
        <span>01</span>
        <h3>Informações gerais</h3>
      </div>

      <div class="form-grid two">
        ${inputField("Nome do alimento", "name", data.name, "Ex: Batata-doce roxa")}
        ${selectField("Categoria", "category", data.category, ["", "Frutas", "Raízes", "Hortaliças"])}
        ${selectField("Origem visual", "origin", data.origin, ["", "tree", "earth", "leaf"], {
          tree: "Árvore",
          earth: "Terra / raiz",
          leaf: "Folhagem"
        })}
        ${inputField("Peso médio", "weight", data.weight, "Ex: 100g")}
        ${fileField("Foto do alimento", "photo", data.photo, "editProductPhotoData", "editProductPhotoPreview")}
        ${textareaField("Descrição", "description", data.description, "Descrição do alimento", "span-2")}
      </div>

      <div class="form-section">
        <span>02</span>
        <h3>Tabela nutricional básica</h3>
      </div>

      <div class="form-grid three">
        ${inputField("Valor energético", "calories", data.calories, "Ex: 86 kcal")}
        ${inputField("Carboidratos", "carbs", data.carbs, "Ex: 20,1g")}
        ${inputField("Proteínas", "protein", data.protein, "Ex: 1,6g")}
        ${inputField("Gorduras", "fat", data.fat, "Ex: 0,1g")}
        ${inputField("Fibras", "fiber", data.fiber, "Ex: 3,0g")}
        ${inputField("Potássio", "potassium", data.potassium, "Ex: 337mg")}
        ${inputField("Ferro", "iron", data.iron, "Ex: 0,6mg")}
        ${inputField("Água", "water", data.water, "Ex: 77%")}
        ${inputField("Sódio", "sodium", data.sodium, "Ex: 55mg")}
        ${inputField("Vitamina A", "vitaminA", data.vitaminA, "Ex: 709mcg")}
        ${inputField("Vitamina C", "vitaminC", data.vitaminC, "Ex: 2,4mg")}
      </div>

      <div class="form-actions">
        <button type="button" class="btn btn-secondary" data-close-modal>
          Cancelar
        </button>

        <button type="submit" class="btn btn-primary">
          Salvar alterações
        </button>
      </div>
    </div>
  `;
}

function recipeEditForm(data, flags) {
  return `
    <div class="panel-form">
      <div class="form-section">
        <span>01</span>
        <h3>Dados da receita</h3>
      </div>

      ${flags.length ? renderFlagList(flags) : ""}

      <div class="form-grid two">
        ${inputField("Título", "title", data.title, "Ex: Purê assado de batata-doce")}
        ${foodSelectField(data.foodId)}
        ${selectField("Dificuldade", "difficulty", data.difficulty, ["", "Fácil", "Médio", "Difícil"])}
        ${selectField("Tempo", "prepTime", data.prepTime, ["", "10 min", "20 min", "30 min", "1 hora ou mais"])}
        ${selectField("Porções", "portions", data.portions, ["", "10", "15", "20 ou mais"])}
        ${fileField("Foto da receita", "photo", data.photo, "editRecipePhotoData", "editRecipePhotoPreview", "")}
        ${textareaField("Ingredientes", "ingredients", data.ingredients, "Liste os ingredientes", "span-2")}
        ${textareaField("Modo de preparo", "preparation", data.preparation, "Descreva o preparo", "span-2")}
      </div>

      <div class="form-actions">
        <button type="button" class="btn btn-secondary" data-close-modal>
          Cancelar
        </button>

        <button type="submit" class="btn btn-primary">
          Salvar alterações
        </button>
      </div>
    </div>
  `;
}

function inputField(label, name, value = "", placeholder = "", type = "text", extraClass = "") {
  return `
    <label class="field ${extraClass}">
      <span>${escapeHTML(label)}</span>

      <input
        name="${escapeAttr(name)}"
        type="${escapeAttr(type)}"
        value="${escapeAttr(value || "")}"
        placeholder="${escapeAttr(placeholder)}"
      />
    </label>
  `;
}

function textareaField(label, name, value = "", placeholder = "", extraClass = "") {
  return `
    <label class="field ${extraClass}">
      <span>${escapeHTML(label)}</span>

      <textarea
        name="${escapeAttr(name)}"
        placeholder="${escapeAttr(placeholder)}"
      >${escapeHTML(value || "")}</textarea>
    </label>
  `;
}

function selectField(label, name, value = "", options = [], labels = {}) {
  return `
    <label class="field">
      <span>${escapeHTML(label)}</span>

      <select name="${escapeAttr(name)}">
        ${options.map((option) => {
          const text = option === "" ? "Selecione" : (labels[option] || option);

          return `
            <option value="${escapeAttr(option)}" ${String(value) === String(option) ? "selected" : ""}>
              ${escapeHTML(text)}
            </option>
          `;
        }).join("")}
      </select>
    </label>
  `;
}

function fileField(label, name, value, targetId, previewId, extraClass = "span-2") {
  return `
    <div class="field ${extraClass} file-field">
      <span>${escapeHTML(label)}</span>

      <label class="file-upload compact-upload">
        <input
          type="file"
          accept="image/*"
          data-image-input
          data-target="${escapeAttr(targetId)}"
          data-preview="${escapeAttr(previewId)}"
        />

        <span class="file-upload-icon">
          <svg><use href="#i-upload"></use></svg>
        </span>

        <strong>Selecionar imagem do dispositivo</strong>
        <small>Troque a foto buscando no computador ou celular.</small>
      </label>

      <input
        id="${escapeAttr(targetId)}"
        name="${escapeAttr(name)}"
        type="hidden"
        value="${escapeAttr(value || "")}"
      />

      <div id="${escapeAttr(previewId)}" class="image-preview ${value ? "" : "hidden"}">
        ${value ? `<img src="${escapeAttr(value)}" alt="Prévia da imagem atual" />` : ""}
      </div>
    </div>
  `;
}

function foodSelectField(selectedId) {
  return `
    <label class="field">
      <span>Ingrediente principal</span>

      <select name="foodId">
        <option value="">Selecione um alimento aprovado</option>

        ${state.products.map((product) => `
          <option value="${product.id}" ${Number(selectedId) === product.id ? "selected" : ""}>
            ${escapeHTML(product.name)}
          </option>
        `).join("")}
      </select>
    </label>
  `;
}

function saveModalEdition() {
  const submission = state.submissions.find((item) => item.id === state.editingSubmissionId);

  if (!submission || !$("#editForm")) return;

  const payload = readForm($("#editForm"));

  if (submission.type === "recipe") {
    payload.foodId = Number(payload.foodId) || "";
  }

  submission.payload = payload;

  submission.title = submission.type === "product"
    ? (payload.name || "Produto sem título")
    : (payload.title || "Receita sem título");

  closeModal();
  renderAll();

  showToast("Alterações salvas na revisão.");
}

function approveSubmission(id) {
  const index = state.submissions.findIndex((item) => item.id === id);

  if (index === -1) return;

  const submission = state.submissions[index];

  if (submission.type === "product") {
    state.products.push({
      id: Date.now(),
      ...submission.payload,
      batch: "",
      supplier: "",
      validity: "",
      marketOrigin: "",
      traceCode: "",
      receivedAt: "",
      mapsQuery: "",
      mapsUrl: ""
    });
  }

  if (submission.type === "recipe") {
    state.recipes.push({
      id: Date.now(),
      ...submission.payload,
      foodId: Number(submission.payload.foodId) || null
    });
  }

  state.submissions.splice(index, 1);

  renderAll();
  showToast("Conteúdo aprovado e publicado.");
}

function bindModal() {
  document.addEventListener("click", (event) => {
    const closeTarget = event.target.closest
      ? event.target.closest("[data-close-modal]")
      : null;

    if (closeTarget) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
}

function closeModal() {
  const modal = $("#editModal");

  if (modal) {
    modal.classList.add("hidden");
  }

  state.editingSubmissionId = null;
}

function bindTraceability() {
  const form = $("#traceabilityForm");
  const select = $("#traceabilityProductSelect");
  const previewButton = $("#previewMapButton");

  if (!form || !select) return;

  $$('[data-traceability-mode]').forEach((button) => {
    button.addEventListener("click", () => {
      state.traceabilityMode = button.dataset.traceabilityMode === "edit" ? "edit" : "add";
      renderTraceabilityView();
    });
  });

  select.addEventListener("change", renderTraceabilityFormForSelectedProduct);

  if (previewButton) {
    previewButton.addEventListener("click", previewTraceabilityMap);
  }

  ["supplier", "marketOrigin"].forEach((name) => {
    if (form.elements[name]) {
      form.elements[name].addEventListener("input", debounce(previewTraceabilityMap, 800));
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    saveTraceability();
  });
}

function renderTraceabilityView() {
  const select = $("#traceabilityProductSelect");

  if (!select) return;

  updateTraceabilityModeUI();

  const current = select.value;
  const filteredProducts = getTraceabilityProductsByMode();

  select.innerHTML = `
    <option value="">${state.traceabilityMode === "add" ? "Selecione um produto pendente" : "Selecione um produto com rastreabilidade"}</option>

    ${filteredProducts.map((product) => `
      <option value="${product.id}">
        ${escapeHTML(product.name)}
      </option>
    `).join("")}
  `;

  if (filteredProducts.some((product) => String(product.id) === String(current))) {
    select.value = current;
  } else {
    select.value = "";
  }

  renderTraceabilityFormForSelectedProduct();
}

function getTraceabilityProductsByMode() {
  return state.products.filter((product) => {
    return state.traceabilityMode === "add"
      ? !hasTraceability(product)
      : hasTraceability(product);
  });
}

function updateTraceabilityModeUI() {
  const isAddMode = state.traceabilityMode !== "edit";

  $$('[data-traceability-mode]').forEach((button) => {
    button.classList.toggle("active", button.dataset.traceabilityMode === (isAddMode ? "add" : "edit"));
  });

  if ($("#traceabilityTitle")) {
    $("#traceabilityTitle").textContent = isAddMode
      ? "Adicionar rastreabilidade"
      : "Editar rastreabilidade";
  }

  if ($("#traceabilityDescription")) {
    $("#traceabilityDescription").textContent = isAddMode
      ? "Use esta área para completar lote, validade, fornecedor, origem, código interno e localização dos produtos aprovados que ainda estão pendentes."
      : "Use esta área para corrigir ou atualizar dados de rastreabilidade que já foram cadastrados pelo Responsável Sonda.";
  }

  if ($("#traceabilityProductSectionTitle")) {
    $("#traceabilityProductSectionTitle").textContent = isAddMode
      ? "Produto sem rastreabilidade"
      : "Produto com rastreabilidade";
  }

  if ($("#traceabilityProductLabel")) {
    $("#traceabilityProductLabel").textContent = isAddMode
      ? "Produto pendente"
      : "Produto já rastreado";
  }

  if ($("#traceabilitySubmitButton")) {
    $("#traceabilitySubmitButton").innerHTML = `
      <svg><use href="#i-save"></use></svg>
      ${isAddMode ? "Adicionar rastreabilidade" : "Salvar edição da rastreabilidade"}
    `;
  }
}

function renderTraceabilityFormForSelectedProduct() {
  const select = $("#traceabilityProductSelect");
  const form = $("#traceabilityForm");
  const summary = $("#traceabilityProductSummary");

  if (!select || !form || !summary) return;

  const product = getProduct(select.value);
  const modeProducts = getTraceabilityProductsByMode();

  if (!product) {
    const emptyMessage = !modeProducts.length
      ? state.traceabilityMode === "add"
        ? "Todos os produtos aprovados já possuem rastreabilidade. Vá em Editar rastreabilidade para alterar algum dado."
        : "Nenhum produto possui rastreabilidade completa ainda. Vá em Adicionar rastreabilidade para cadastrar os dados."
      : state.traceabilityMode === "add"
        ? "Selecione um produto pendente para adicionar lote, validade, fornecedor e origem."
        : "Selecione um produto rastreado para editar seus dados.";

    summary.innerHTML = `
      <div class="empty-state">
        ${emptyMessage}
      </div>
    `;

    clearTraceabilityForm(form);
    renderMapPreview("");
    return;
  }

  if (form.elements.batch) form.elements.batch.value = product.batch || "";
  if (form.elements.supplier) form.elements.supplier.value = product.supplier || "";
  if (form.elements.validity) form.elements.validity.value = product.validity || "";
  if (form.elements.marketOrigin) form.elements.marketOrigin.value = product.marketOrigin || "";
  if (form.elements.traceCode) form.elements.traceCode.value = product.traceCode || "";
  if (form.elements.receivedAt) form.elements.receivedAt.value = product.receivedAt || "";

  if ($("#traceabilityMapsUrl")) $("#traceabilityMapsUrl").value = product.mapsUrl || "";
  if ($("#traceabilityMapsQuery")) $("#traceabilityMapsQuery").value = product.mapsQuery || "";

  summary.innerHTML = `
    <div class="summary-grid">
      <article>
        <strong>${escapeHTML(product.name)}</strong>
        <span>${escapeHTML(product.category || "Categoria não informada")}</span>
      </article>

      <article>
        <strong>${escapeHTML(product.batch || "Lote pendente")}</strong>
        <span>Lote atual do mercado</span>
      </article>

      <article>
        <strong>${escapeHTML(formatDate(product.validity) || "Validade pendente")}</strong>
        <span>Validade cadastrada</span>
      </article>

      <article>
        <strong>
          <span class="trace-status ${hasTraceability(product) ? "complete" : ""}">
            ${hasTraceability(product) ? "Completa" : "Pendente"}
          </span>
        </strong>
        <span>Status de rastreabilidade</span>
      </article>
    </div>
  `;

  renderMapPreview(product.mapsQuery || "");
}

function clearTraceabilityForm(form) {
  ["batch", "supplier", "validity", "marketOrigin", "traceCode", "receivedAt"].forEach((name) => {
    if (form.elements[name]) {
      form.elements[name].value = "";
    }
  });

  if ($("#traceabilityMapsUrl")) $("#traceabilityMapsUrl").value = "";
  if ($("#traceabilityMapsQuery")) $("#traceabilityMapsQuery").value = "";
}

function previewTraceabilityMap() {
  const form = $("#traceabilityForm");

  if (!form) return;

  const supplier = form.elements.supplier ? form.elements.supplier.value.trim() : "";
  const origin = form.elements.marketOrigin ? form.elements.marketOrigin.value.trim() : "";

  const query = [supplier, origin].filter(Boolean).join(" ");

  if (!query) {
    renderMapPreview("");
    return;
  }

  const mapsUrl = buildMapsUrl(query);

  if ($("#traceabilityMapsUrl")) $("#traceabilityMapsUrl").value = mapsUrl;
  if ($("#traceabilityMapsQuery")) $("#traceabilityMapsQuery").value = query;

  renderMapPreview(query);
}

function renderMapPreview(query) {
  const preview = $("#mapPreview");

  if (!preview) return;

  if (!query) {
    preview.classList.add("empty");

    preview.innerHTML = `
      <span>
        Digite o local ou fazenda e clique em “Pré-visualizar mapa”.
      </span>
    `;

    return;
  }

  preview.classList.remove("empty");

  preview.innerHTML = `
    <iframe
      title="Mapa da origem"
      loading="lazy"
      src="${escapeAttr(buildMapsEmbedUrl(query))}"
    ></iframe>
  `;
}

function saveTraceability() {
  const form = $("#traceabilityForm");

  if (!form) return;

  const product = getProduct(form.elements.productId ? form.elements.productId.value : "");

  if (!product) {
    showToast("Selecione um produto aprovado antes de salvar.");
    return;
  }

  previewTraceabilityMap();

  product.batch = form.elements.batch ? form.elements.batch.value.trim() : "";
  product.supplier = form.elements.supplier ? form.elements.supplier.value.trim() : "";
  product.validity = form.elements.validity ? form.elements.validity.value : "";
  product.marketOrigin = form.elements.marketOrigin ? form.elements.marketOrigin.value.trim() : "";
  product.traceCode = form.elements.traceCode ? form.elements.traceCode.value.trim() : "";
  product.receivedAt = form.elements.receivedAt ? form.elements.receivedAt.value : "";
  product.mapsQuery = $("#traceabilityMapsQuery") ? $("#traceabilityMapsQuery").value : "";
  product.mapsUrl = $("#traceabilityMapsUrl") ? $("#traceabilityMapsUrl").value : "";

  const mode = state.traceabilityMode;

  renderAll();

  if (mode === "add") {
    state.traceabilityMode = "edit";
    renderTraceabilityView();
  }

  showToast(mode === "add" ? "Rastreabilidade adicionada com sucesso." : "Rastreabilidade editada com sucesso.");
}

function renderRecipeCatalogFilter() {
  const select = $("#recipeCatalogFilter");

  if (!select) return;

  const current = select.value;

  select.innerHTML = `
    <option value="all">Todos os ingredientes</option>

    ${state.products.map((product) => `
      <option value="${product.id}">
        ${escapeHTML(product.name)}
      </option>
    `).join("")}
  `;

  select.value = current || "all";
}

function renderRecipeCatalog() {
  renderRecipeCatalogFilter();

  const grid = $("#recipeCatalogGrid");

  if (!grid) return;

  const filter = $("#recipeCatalogFilter") ? $("#recipeCatalogFilter").value : "all";

  let recipes = [...state.recipes];

  if (filter !== "all") {
    recipes = recipes.filter((recipe) => Number(recipe.foodId) === Number(filter));
  }

  if (!recipes.length) {
    grid.innerHTML = `
      <div class="empty-state">
        Nenhuma receita aprovada para o ingrediente selecionado.
      </div>
    `;

    return;
  }

  grid.innerHTML = recipes.map((recipe) => renderRecipeCard(recipe)).join("");
}

function renderRecipeCard(recipe) {
  const food = getProduct(recipe.foodId);
  const origin = originClass(food || {});

  return `
    <article class="recipe-card ${origin}">
      <div class="recipe-photo">
        ${
          recipe.photo
            ? `<img src="${escapeAttr(recipe.photo)}" alt="Foto de ${escapeAttr(recipe.title)}" />`
            : `<svg><use href="#i-book"></use></svg>`
        }
      </div>

      <div class="recipe-body">
        <div class="recipe-meta">
          <span class="badge">${escapeHTML(food ? food.name : "Ingrediente")}</span>
          <span class="badge">${escapeHTML(recipe.difficulty || "Dificuldade")}</span>
          <span class="badge">${escapeHTML(recipe.prepTime || "Tempo")}</span>
          <span class="badge">${escapeHTML(recipe.portions || "Porções")} porções</span>
        </div>

        <h3>${escapeHTML(recipe.title || "Receita sem título")}</h3>

        <details>
          <summary>Ver ingredientes e preparo</summary>

          <p><strong>Ingredientes</strong></p>
          <pre>${escapeHTML(recipe.ingredients || "Não informado.")}</pre>

          <p><strong>Preparo</strong></p>
          <pre>${escapeHTML(recipe.preparation || "Não informado.")}</pre>
        </details>
      </div>
    </article>
  `;
}

function openClientList(returnTarget = "login") {
  state.clientReturnTarget = normalizeClientReturnTarget(returnTarget);

  showScreen("clientView");

  if ($("#clientListPanel")) $("#clientListPanel").classList.remove("hidden");
  if ($("#clientDetailPanel")) $("#clientDetailPanel").classList.add("hidden");
  if ($("#backToClientList")) $("#backToClientList").classList.add("hidden");

  updateClientPublicUrl();
  updateClientReturnButton();
  setClientOriginClass(categoryOrigin(state.clientCategory));
  renderClientProductList();
}

function renderClientProductList() {
  const list = $("#clientProductList");

  if (!list) return;

  const categories = ["Frutas", "Raízes", "Hortaliças"];

  if (!categories.includes(state.clientCategory)) {
    state.clientCategory = "Frutas";
  }

  updateClientCategoryTabs();

  const products = state.products.filter((product) => {
    return product.category === state.clientCategory;
  });

  if (!products.length) {
    list.innerHTML = `
      <div class="empty-state">
        Nenhum alimento cadastrado em ${escapeHTML(state.clientCategory)} no momento.
      </div>
    `;
    return;
  }

  list.innerHTML = products.map((product) => `
    <article class="qr-card ${originClass(product)}" data-client-detail="${product.id}">
      <div class="qr-card-main">
        <div class="qr-visual" aria-hidden="true">
          <svg><use href="#i-qr"></use></svg>
        </div>

        <div>
          <span class="badge">${escapeHTML(product.category || "Categoria")}</span>
          <h3>${escapeHTML(product.name)}</h3>
          <p>Toque para abrir as informações do QR Code deste alimento.</p>
        </div>
      </div>

      <div class="qr-card-footer">
        <span>${hasTraceability(product) ? "Rastreabilidade completa" : "Rastreabilidade em validação"}</span>
        <button type="button" class="btn btn-primary btn-sm">
          Ver QR
        </button>
      </div>

      <small class="qr-public-link">cliente.html?produto=${product.id}</small>
    </article>
  `).join("");

  $$("[data-client-detail]").forEach((card) => {
    card.addEventListener("click", () => {
      openClientView(Number(card.dataset.clientDetail), state.clientReturnTarget);
    });
  });
}

function openClientView(productId, returnTarget = "app") {
  state.clientProductId = productId;
  state.clientTab = "info";

  if (returnTarget) {
    state.clientReturnTarget = normalizeClientReturnTarget(returnTarget);
  }

  showScreen("clientView");

  if ($("#clientListPanel")) $("#clientListPanel").classList.add("hidden");
  if ($("#clientDetailPanel")) $("#clientDetailPanel").classList.remove("hidden");
  if ($("#backToClientList")) $("#backToClientList").classList.remove("hidden");

  updateClientPublicUrl(productId);
  updateClientReturnButton();
  renderClientView();
}

function bindClientTabs() {
  $$("[data-client-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.clientTab = button.dataset.clientTab;
      renderClientTabs();
    });
  });
}

function bindClientCategoryTabs() {
  $$("[data-client-category]").forEach((button) => {
    button.addEventListener("click", () => {
      state.clientCategory = button.dataset.clientCategory;
      setClientOriginClass(categoryOrigin(state.clientCategory));
      renderClientProductList();
    });
  });
}

function updateClientCategoryTabs() {
  $$("[data-client-category]").forEach((button) => {
    const category = button.dataset.clientCategory;
    const count = state.products.filter((product) => product.category === category).length;
    const countElement = $("[data-client-category-count]", button);

    button.classList.toggle("active", category === state.clientCategory);

    if (countElement) {
      countElement.textContent = `${count} ${count === 1 ? "item" : "itens"}`;
    }
  });
}

function updateClientPublicUrl(productId = null) {
  if (!isClientPublicPage() || !window.history || !window.history.replaceState) return;

  const basePath = window.location.pathname.split("/").pop() || "cliente.html";
  const nextUrl = productId ? `${basePath}?produto=${productId}` : basePath;

  window.history.replaceState({}, "", nextUrl);
}

function updateClientReturnButton() {
  const button = $("#backToAppFromClient");
  const isListVisible = $("#clientListPanel") && !$("#clientListPanel").classList.contains("hidden");

  if (!button) return;

  if (state.clientReturnTarget === "public") {
    button.classList.toggle("hidden", Boolean(isListVisible));
    button.innerHTML = `
      <svg><use href="#i-arrow-left"></use></svg>
      Ver todos os QR Codes
    `;
    return;
  }

  button.classList.remove("hidden");
  button.innerHTML = `
    <svg><use href="#i-arrow-left"></use></svg>
    ${state.clientReturnTarget === "app" ? "Voltar ao painel" : "Voltar ao login"}
  `;
}

function renderClientView() {
  const product = getProduct(state.clientProductId) || state.products[0];

  setClientOriginClass(product.origin || "tree");

  if ($("#clientPhoto")) {
    $("#clientPhoto").innerHTML = product.photo
      ? `<img src="${escapeAttr(product.photo)}" alt="Foto de ${escapeAttr(product.name)}" />`
      : `<svg><use href="#i-image"></use></svg>`;
  }

  if ($("#clientCategory")) $("#clientCategory").textContent = product.category || "Categoria";
  if ($("#clientTitle")) $("#clientTitle").textContent = product.name || "Alimento";
  if ($("#clientDescription")) $("#clientDescription").textContent = product.description || "Descrição ainda não informada.";

  const nutrition = [
    ["Valor energético", product.calories],
    ["Carboidratos", product.carbs],
    ["Proteínas", product.protein],
    ["Gorduras", product.fat],
    ["Fibras", product.fiber],
    ["Potássio", product.potassium],
    ["Ferro", product.iron],
    ["Água", product.water],
    ["Sódio", product.sodium],
    ["Vitamina A", product.vitaminA],
    ["Vitamina C", product.vitaminC]
  ];

  if ($("#clientNutrition")) {
    $("#clientNutrition").innerHTML = nutrition.map(([label, value]) => `
      <div class="nutrition-item">
        <strong>${escapeHTML(value || "—")}</strong>
        <span>${escapeHTML(label)}</span>
      </div>
    `).join("");
  }

  if ($("#clientTraceability")) {
    $("#clientTraceability").innerHTML = `
      <h3>Origem e rastreabilidade</h3>

      <p><strong>Fornecedor/Fazenda:</strong> ${escapeHTML(product.supplier || "Informação em validação pelo Sonda.")}</p>
      <p><strong>Lote:</strong> ${escapeHTML(product.batch || "Não informado.")}</p>
      <p><strong>Código interno:</strong> ${escapeHTML(product.traceCode || "Não informado.")}</p>
      <p><strong>Recebimento:</strong> ${escapeHTML(formatDate(product.receivedAt) || "Não informado.")}</p>
      <p><strong>Validade:</strong> ${escapeHTML(formatDate(product.validity) || "Não informada.")}</p>
      <p><strong>Origem:</strong> ${escapeHTML(product.marketOrigin || "Não informada.")}</p>

      ${
        product.mapsUrl
          ? `
            <a class="map-cta" href="${escapeAttr(product.mapsUrl)}" target="_blank" rel="noopener">
              <svg><use href="#i-map"></use></svg>

              <span>
                <strong>Veja a localização da fazenda</strong>
                <small>Toque para abrir no Google Maps</small>
              </span>
            </a>
          `
          : `
            <div class="flag-note">
              A localização da fazenda ainda será adicionada pelo responsável Sonda.
            </div>
          `
      }
    `;
  }

  const recipes = state.recipes.filter((recipe) => {
    return Number(recipe.foodId) === Number(product.id);
  });

  if ($("#clientRecipes")) {
    $("#clientRecipes").innerHTML = recipes.length
      ? recipes.map((recipe) => renderRecipeCard(recipe)).join("")
      : `
        <div class="empty-state">
          Ainda não há receitas aprovadas para este alimento.
        </div>
      `;
  }

  renderClientTabs();
}

function renderClientTabs() {
  $$("[data-client-tab]").forEach((button) => {
    button.classList.toggle("active", button.dataset.clientTab === state.clientTab);
  });

  if ($("#clientInfoPanel")) {
    $("#clientInfoPanel").classList.toggle("active", state.clientTab === "info");
  }

  if ($("#clientRecipesPanel")) {
    $("#clientRecipesPanel").classList.toggle("active", state.clientTab === "recipes");
  }
}

function setClientOriginClass(origin) {
  const client = $("#clientView");

  if (!client) return;

  client.classList.remove("origin-tree", "origin-earth", "origin-leaf");
  client.classList.add(originClass({ origin }));
}

function hasTraceability(product) {
  return Boolean(
    product.batch &&
    product.supplier &&
    product.validity &&
    product.marketOrigin &&
    product.mapsUrl
  );
}

function getProduct(id) {
  return state.products.find((product) => Number(product.id) === Number(id));
}

function originClass(product) {
  if (product.origin === "earth") return "origin-earth";
  if (product.origin === "leaf") return "origin-leaf";

  return "origin-tree";
}

function categoryOrigin(category) {
  if (category === "Raízes") return "earth";
  if (category === "Hortaliças") return "leaf";

  return "tree";
}

function originLabel(origin) {
  if (origin === "earth") return "Terra / raiz";
  if (origin === "leaf") return "Folhagem";

  return "Árvore";
}

function buildMapsUrl(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function buildMapsEmbedUrl(query) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

function getToday() {
  return new Date().toLocaleDateString("pt-BR");
}

function formatDate(value) {
  if (!value) return "";

  const [year, month, day] = String(value).split("-");

  if (!year || !month || !day) return value;

  return `${day}/${month}/${year}`;
}

function debounce(fn, delay = 400) {
  let timer;

  return (...args) => {
    window.clearTimeout(timer);

    timer = window.setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

function showToast(message) {
  const toast = $("#toast");

  if (!toast) return;

  toast.textContent = message;
  toast.classList.remove("hidden");

  window.clearTimeout(showToast.timeout);

  showToast.timeout = window.setTimeout(() => {
    toast.classList.add("hidden");
  }, 2800);
}

function escapeHTML(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttr(value) {
  return escapeHTML(value).replace(/`/g, "&#096;");
}
