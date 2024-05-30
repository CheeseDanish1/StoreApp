export default {
    products: (items) => {
        let serializedItems = items.map(item => {
            return {
                name: item["ITEM NAME"],
                id: item["ITEM ID"],
                stock: item["STOCK"],
                category: item["CATEGORY"],
                price: item["SALE PRICE PER ITEM"],
                image: item["IMAGE URL"],
            }
        })
        return serializedItems
    },

    people: (persons) => {
        let serializedPersons = persons.map(person => {
            return {
                name: person["NAME"],
                email: person["EMAIL"],
                grade: person["GRADE"],
                debt: person["AMOUNT OWED"],
                balance: person["AMOUNT PREPAID"]
            }
        })
        return serializedPersons
    }
}