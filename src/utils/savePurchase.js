import {SERVER_URL} from '../../constants.json'

export default function savePurchase({personSearch, cart, paymentMethod}) {
    console.log("Making request to: "+SERVER_URL+"/save")
    console.log({personSearch, cart, paymentMethod})
    fetch(SERVER_URL+"/save", {
        method: "POST",
        body: JSON.stringify({personSearch, cart, paymentMethod}),
        headers: {
            "Content-Type": "application/json"
        }
    })
}