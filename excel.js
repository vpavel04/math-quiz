function convertToCSV(objArray) {
  const array = objArray;
  let csv_str = '';

  for (let i = 0; i < array.length; i++) {
    let line = '';
    for (const index in array[i]) {
      line += ',';
      line += array[i][index];
    }

    csv_str += line + '\r\n';
  }

  return csv_str;
}

function exportCSVFile(strMatrix, fileTitle) {

  const csv = convertToCSV(strMatrix);

  const exportedFilenmae = fileTitle + '.csv' || 'export.csv';

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  if (navigator.msSaveBlob) { // IE 10+
    navigator.msSaveBlob(blob, exportedFilenmae);
  } else {
    const link = document.createElement("a");
    if (link.download !== undefined) { // feature detection

      // Browsers that support HTML5 download attribute
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", exportedFilenmae);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

function generateEmptyRow(columns) {
  return columns.map(c => "");
}

function buildExcelExercise1() {
  const columns = [
    "",
    "nume",
    "pcs",
    "cogs",
    "pret lista",
    ...shuffleArray(["adauga crestere", "adauga reducere", "adauga tva"]),
    "profit/bucata",
    "markup (profit %)"
  ];

  const fruits = ["Apple", "Apricot", "Avocado", "Banana", "Bilberry", "Blackberry", "Blueberry", "Boysenberry", "Breadfruit", "Buddha's hand (fingered citron)", "Cactus pear", "Cempedak", "Crab apple", "Currant", "Cherry", "Cherimoya (Custard Apple)", "Chico fruit", "Cloudberry", "Coco De Mer", "Coconut", "Cranberry", "Damson", "Date", "Dragonfruit (or Pitaya)", "Durian", "Egg Fruit", "Elderberry", "Feijoa", "Fig", "Goji berry", "Gooseberry", "Grape", "Grewia asiatica (phalsa or falsa)", "Raisin", "Grapefruit", "Guava", "Hala Fruit", "Honeyberry", "Huckleberry", "Jabuticaba", "Jackfruit", "Jambul", "Japanese plum", "Jostaberry", "Jujube", "Juniper berry", "Kiwano (horned melon)", "Kiwifruit", "Kumquat", "Lemon", "Lime", "Loganberry", "Loquat", "Longan", "Lulo", "Lychee", "Mamey Apple", "Mamey Sapote", "Mango", "Mangosteen", "Marionberry", "Melon", "Cantaloupe", "Galia melon", "Honeydew", "Watermelon", "Miracle fruit", "Monstera deliciosa", "Mulberry", "Nance", "Nectarine", "Orange", "Blood orange", "Clementine", "Mandarine", "Tangerine", "Papaya", "Passionfruit", "Peach", "Pear", "Persimmon", "Plantain", "Plum", "Prune (dried plum)", "Pineapple", "Pineberry", "Plumcot (or Pluot)", "Pomegranate", "Pomelo", "Purple mangosteen", "Quince", "Raspberry", "Salmonberry", "Rambutan (or Mamin Chino)", "Redcurrant", "Rose apple", "Salal berry", "Salak", "Satsuma", "Shine Muscat or Vitis Vinifera", "Soursop", "Star apple", "Star fruit", "Strawberry", "Surinam cherry", "Tamarillo", "Tamarind", "Tangelo", "Tayberry", "Tomato", "Ugli fruit", "White currant", "White sapote", "Yuzu"];

  const rows = [columns];

  const secondRow = columns.map(c => {
    if (c == "adauga crestere")
      return chooseInt(1, 100) + "%";
    else if (c == "adauga reducere")
      return chooseInt(1, 30) + "%";
    else if (c == "adauga tva")
      return chooseOne(["19%", "9%"]);
    else
      return "";
  });

  rows.push(secondRow);

  const nRowsToAdd = chooseInt(3, 8);
  for (let i = 0; i < nRowsToAdd; i++) {
    const row = generateEmptyRow(columns);
    row[1] = chooseOne(fruits);
    row[2] = chooseInt(1, 100);
    row[3] = chooseInt(100, 1000) / 10;
    row[4] = row[3] * chooseInt(100, 200) / 100;

    rows.push(row);
  }

  rows.push(generateEmptyRow(columns));
  rows.push(generateEmptyRow(columns));

  const avgPcsRow = generateEmptyRow(columns);
  avgPcsRow[1] = "Avg pcs";
  rows.push(avgPcsRow);

  const avgPriceRow = generateEmptyRow(columns);
  avgPriceRow[1] = "Avg price";
  rows.push(avgPriceRow);

  const avgProfitRow = generateEmptyRow(columns);
  avgProfitRow[1] = "Avg profit";
  rows.push(avgProfitRow);

  const totalProfitRow = generateEmptyRow(columns);
  totalProfitRow[1] = "Total profit";
  rows.push(totalProfitRow);

  const totalCostsRow = generateEmptyRow(columns);
  totalCostsRow[1] = "Total costs";
  rows.push(totalCostsRow);

  exportCSVFile(rows, "exercise1");
}