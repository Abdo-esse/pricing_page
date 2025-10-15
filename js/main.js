
  let jsonData;
  let currentProduct = "WorkshopDataCars";
  let currentCurrency = "GBP";
  let currentPeriod = "monthly";
 

  $.getJSON("./data/data.json")
    .done((data) => {
      jsonData = data;
      console.log("Données JSON chargées avec succès :", jsonData.currencies);
      renderCurrencySelect();
      renderProductSelect();
      renderPacks();
    })
    .fail(() => {
      console.error("Impossible de charger le fichier JSON.");
    });

  function renderCurrencySelect() {
    const container = $("#currencyContainer");
    container.empty();

    let select = $('<select id="currencySelect" class="border px-4 py-2 rounded"></select>');

    $.each(jsonData.currencies, function (code, symbol) {
      const option = $(`<option value="${code}">${code} (${symbol})</option>`);
      select.append(option);
    });

    container.append(select);

    // Gestion du changement de devise
    $("#currencySelect").on("change", function () {
      currentCurrency = $(this).val();
      renderPacks();
    });
  }

  function renderProductSelect() {
    const container = $("#productContainer");
    container.empty();

    let select = $('<select id="productSelect" class="border px-4 py-2 rounded"></select>');

    $.each(jsonData.products, function (key, product) {
        console.log("Rendering product:", key, product);
      const option = $(`<option value="${key}">${product.name}</option>`);
      select.append(option);
    });

    container.append(select);

    // Gestion du changement de produit
    $("#productSelect").on("change", function () {
      currentProduct = $(this).val();
      renderPacks();
    });
  }

  function renderPacks() {
    if (!jsonData) return;
    const product = jsonData.products[currentProduct];
    const symbol = jsonData.currencies[currentCurrency];
    const container = $("#packsContainer");

    // Effet de transition douce
    container.fadeOut(150, function () {
      container.empty();

      $.each(product.packs, function (key, pack) {
        const price = pack.pricing[currentPeriod][currentCurrency].price;
        const link = pack.pricing[currentPeriod][currentCurrency].link;
        const features = pack.features[currentPeriod];

        const card = $(`
          <div class="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between hover:scale-105 transition transform">
            <div>
              <h2 class="text-xl font-semibold mb-2">${pack.name}</h2>
              <p class="text-4xl font-bold mb-4">${symbol}${price}</p>
              <ul class="mb-4 text-gray-600 space-y-1">
                ${features.map(f => `<li>• ${f}</li>`).join("")}
              </ul>
            </div>
            <a href="${link}" target="_blank"
              class="mt-auto bg-blue-600 text-white text-center py-2 px-4 rounded hover:bg-blue-700 transition">
              Subscribe
            </a>
          </div>
        `);

        container.append(card);
      });

      container.fadeIn(150);
    });
  }
  // handle period button clicks
    $("#monthlyBtn").on("click", function () {
    currentPeriod = "monthly";
    togglePeriodButtons();
    renderPacks();
  });

  $("#annualBtn").on("click", function () {
    currentPeriod = "annual";
    togglePeriodButtons();
    renderPacks();
  });

  // change button styles based on selected period
  function togglePeriodButtons() {
  if (currentPeriod === "monthly") {
    $("#monthlyBtn").removeClass("bg-gray-200").addClass("bg-blue-500 text-white");
    $("#annualBtn").removeClass("bg-blue-500 text-white").addClass("bg-gray-200");
  } else {
    $("#annualBtn").removeClass("bg-gray-200").addClass("bg-blue-500 text-white");
    $("#monthlyBtn").removeClass("bg-blue-500 text-white").addClass("bg-gray-200");
  }
}



