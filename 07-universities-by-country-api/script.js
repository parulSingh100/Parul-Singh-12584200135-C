var form = document.getElementById("searchForm");
var input = document.getElementById("countryInput");
var statusText = document.getElementById("status");
var tableBody = document.getElementById("tableBody");

async function getUniversities(country) {
  statusText.textContent = "Searching...";
  tableBody.innerHTML = "";

  try {
    var res = await fetch("http://universities.hipolabs.com/search?country=" + encodeURIComponent(country));
    var list = await res.json();

    if (list.length === 0) {
      statusText.textContent = "No universities found for " + country;
      return;
    }

    statusText.textContent = "Found " + list.length + " universities in " + country;

    for (var i = 0; i < list.length; i++) {
      var u = list[i];
      var tr = document.createElement("tr");
      var site = u.web_pages && u.web_pages.length ? u.web_pages[0] : "";
      var state = u["state-province"] || "N/A";

      tr.innerHTML =
        "<td>" + (i + 1) + "</td>" +
        "<td>" + u.name + "</td>" +
        "<td>" + state + "</td>" +
        "<td>" + (site ? '<a href="' + site + '" target="_blank">' + site + "</a>" : "N/A") + "</td>";

      tableBody.appendChild(tr);
    }
  } catch (err) {
    statusText.textContent = "Error: " + err.message;
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  var c = input.value.trim();
  if (c) getUniversities(c);
});

getUniversities("India");
