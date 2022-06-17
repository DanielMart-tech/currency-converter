"use strict";
const bAdd = document.querySelector("#bAdd");
const inputTitle = document.querySelector("#title");
const inputCost = document.querySelector("#cost");
const inputCurrency = document.querySelector("#currency");
const expenses = new Expenses("USD");
function $(selector) {
    return document.querySelector(selector);
}
function $$(selector) {
    return document.querySelectorAll(selector);
}
function render() {
    let html = "";
    expenses.getItems().forEach(item => {
        const { id, title, cost } = item;
        html += `
        <div class="item">
            <div><span class="currency">${cost.currency}</span> ${cost.quantity}</div>
            <div>${title}</div>
            <div><button class="bDelete" data-id="${id}">Delete</button></div>
        </div>
        `;
    });
    $("#items").innerHTML = html;
    $("#display").textContent = expenses.getTotal();
    $$(".bDelete").forEach(bDelete => {
        bDelete.addEventListener("click", (e) => {
            const id = e.target.getAttribute("data-id");
            expenses.remove(parseInt(id));
            render();
        });
    });
}
bAdd.addEventListener("click", () => {
    if ((inputTitle === null || inputTitle === void 0 ? void 0 : inputTitle.value) !== "" && (inputCost === null || inputCost === void 0 ? void 0 : inputCost.value) !== "" && !isNaN(parseFloat(inputCost.value))) {
        const title = inputTitle.value;
        const cost = parseFloat(inputCost.value);
        const currency = inputCurrency.value;
        expenses.add({ title, cost: { quantity: cost, currency } });
        render();
    }
    else {
        alert("Complete the data correctly");
    }
});
render();
