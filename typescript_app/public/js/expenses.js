"use strict";
class ArrayList {
    constructor() {
        this.items = [];
    }
    add(item) {
        this.items.push(item);
    }
    get(index) {
        const item = this.items.filter((x, i) => index === i);
        if (item.length === 0)
            return null;
        else
            return item[0];
    }
    createFrom(value) {
        this.items = [...value];
    }
    getAll() {
        return this.items;
    }
}
class Expenses {
    constructor(currency) {
        this.count = 0;
        this.expenses = new ArrayList();
        this.finalCurrency = currency;
    }
    add(item) {
        item.id = this.count;
        this.count++;
        this.expenses.add(item);
        return true;
    }
    get(index) {
        return this.expenses.get(index);
    }
    getItems() {
        return this.expenses.getAll();
    }
    convertCurrency(item, currency) {
        switch (item.cost.currency) {
            case "USD":
                switch (currency) {
                    case "VEN":
                        return item.cost.quantity * 22;
                        break;
                    default:
                        return item.cost.quantity;
                }
                break;
            case "VEN":
                switch (currency) {
                    case "USD":
                        return item.cost.quantity / 22;
                        break;
                    default:
                        return item.cost.quantity;
                }
                break;
            default:
                return 0;
        }
    }
    getTotal() {
        const total = this.getItems().reduce((acc, item) => { return acc += this.convertCurrency(item, this.finalCurrency); }, 0);
        return `${this.finalCurrency} $${total.toFixed(2).toString()}`;
    }
    remove(id) {
        const items = this.getItems().filter(item => item.id !== id);
        this.expenses.createFrom(items);
        return true;
    }
}
