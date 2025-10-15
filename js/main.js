$(document).ready(function () {
  let jsonData;
  let currentProduct = "WorkshopDataCars";
  let currentCurrency = "GBP";
 

  $.getJSON("./data/data.json")
    .done((data) => {
      jsonData = data;
      console.log("Données JSON chargées avec succès :", jsonData.currencies);
      renderCurrencySelect();
      renderProductSelect();
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
    });
  }

  function renderProductSelect() {
    const container = $("#productContainer");
    container.empty();

    let select = $('<select id="productSelect" class="border px-4 py-2 rounded"></select>');

    $.each(jsonData.products, function (key, product) {
        console.log("Rendering product:", key, product.name);
      const option = $(`<option value="${key}">${product.name}</option>`);
      select.append(option);
    });

    container.append(select);

    // Gestion du changement de produit
    $("#productSelect").on("change", function () {
      currentProduct = $(this).val();
    });
  }
})