const productiveSites = [
  "github.com",
  "stackoverflow.com",
  "leetcode.com",
  "geeksforgeeks.org"
];

chrome.storage.local.get(null, (data) => {

  const table = document.querySelector("tbody");

  Object.keys(data).forEach(site => {

    const timeMinutes = (data[site] / 60).toFixed(2);

    const status = productiveSites.includes(site)
      ? "Productive"
      : "Unproductive";

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${site}</td>
      <td>${timeMinutes}</td>
      <td>${status}</td>
    `;

    table.appendChild(row);

  });

});