//Variables

let tableBody = document.querySelector("#tbody");
let playerList = JSON.parse(localStorage.getItem("playerList"));

// Sort array nuo didziausio iki maziausio;
function sortList(array) {
  array.sort(function (a, b) {
    return a.finalScore > b.finalScore ? -1 : 1;
  });
}

// Local Storage atvaizdavimas table body;
function addOutput(playerArray, output) {
  sortList(playerArray);
  output.innerHTML = playerArray
    .map((player) => {
      return `
       <tr>
      <td>${player.name.toUpperCase()}</td>
      <td>${player.gameLevel}</td>
      <td>${player.finalScore}</td>
      </tr>
      `;
    })
    .join("");
}

// sortList(playerList);
addOutput(playerList, tableBody);
