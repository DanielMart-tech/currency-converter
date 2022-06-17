type Currency = "VEN" | "USD"

interface PriceInterface {
    quantity: number,
    currency: Currency,
}

interface ExpenseItemInterface {
    id?: number,
    title: string,
    cost: PriceInterface,
}

interface ExpensesInterface {
    expenses: ArrayList<ExpenseItemInterface>,
    finalCurrency: Currency,
    add(item: ExpenseItemInterface): boolean,
    get(index: number): ExpenseItemInterface | null,
    getTotal(): string,
    remove(id: number): boolean
}

class ArrayList<T> {
    private items: T[];

    constructor() {
        this.items = [];
    }

    add(item: T): void {
        this.items.push(item)
    }

    get(index: number): T | null {
        const item: T[] = this.items.filter((x: T, i) => index === i)
        if (item.length === 0) return null
        else return item[0]
    }

    createFrom(value: T[]): void {
        this.items = [...value]
    }

    getAll(): T[] {
        return this.items
    }
}

class Expenses implements ExpensesInterface {
    expenses: ArrayList<ExpenseItemInterface>
    finalCurrency: Currency

    private count = 0

    constructor(currency: Currency) {
        this.expenses = new ArrayList<ExpenseItemInterface>()
        this.finalCurrency = currency
    }

    add(item: ExpenseItemInterface): boolean {
        item.id = this.count
        this.count++
        this.expenses.add(item)
        return true
    }

    get(index: number): ExpenseItemInterface | null {
        return this.expenses.get(index)
    }

    getItems(): ExpenseItemInterface[] {
        return this.expenses.getAll()
    }

    private convertCurrency(item: ExpenseItemInterface, currency: Currency): number {
        switch (item.cost.currency) {
            case "USD":
                switch (currency) {
                    case "VEN":
                        return item.cost.quantity * 22
                        break
                    default:
                        return item.cost.quantity
                }
                break
            case "VEN":
                switch (currency) {
                    case "USD":
                        return item.cost.quantity / 22
                        break
                    default:
                        return item.cost.quantity
                }
                break
            default:
                return 0
        }
    }

    getTotal(): string {
        const total = this.getItems().reduce((acc, item) => { return acc += this.convertCurrency(item, this.finalCurrency) }, 0)
        return `${this.finalCurrency} $${total.toFixed(2).toString()}`
    }

    remove(id: number): boolean {
        const items: ExpenseItemInterface[] = this.getItems().filter(item => item.id !== id)

        this.expenses.createFrom(items)
        return true
    }
}