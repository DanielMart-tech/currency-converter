const bAdd = document.querySelector("#bAdd") as HTMLButtonElement
const inputTitle = document.querySelector("#title") as HTMLInputElement
const inputCost = document.querySelector("#cost") as HTMLInputElement
const inputCurrency = document.querySelector("#currency") as HTMLInputElement

const expenses = new Expenses("USD")

function $(selector: string): HTMLElement {
    return document.querySelector(selector) as HTMLElement
}

function $$(selector: string): NodeListOf<Element> {
    return document.querySelectorAll(selector) as NodeListOf<Element>
}

function render() {
    let html = ""

    expenses.getItems().forEach(item => {
        const { id, title, cost } = item

        html += `
        <div class="item">
            <div><span class="currency">${cost.currency}</span> ${cost.quantity}</div>
            <div>${title}</div>
            <div><button class="bDelete" data-id="${id}">Delete</button></div>
        </div>
        `
    })

    $("#items").innerHTML = html
    $("#display").textContent = expenses.getTotal()

    $$(".bDelete").forEach(bDelete => {
        bDelete.addEventListener("click", (e) => {
            const id: string = (e.target as HTMLButtonElement).getAttribute("data-id") as string
            expenses.remove(parseInt(id))
            render()
        })

    })
}

bAdd!.addEventListener("click", () => {
    if (inputTitle?.value !== "" && inputCost?.value !== "" && !isNaN(parseFloat(inputCost.value))) {
        const title = inputTitle.value
        const cost = parseFloat(inputCost.value)
        const currency: Currency = <Currency>inputCurrency.value

        expenses.add({ title, cost: { quantity: cost, currency } })

        render()
    } else {
        alert("Complete the data correctly")
    }
})

render()