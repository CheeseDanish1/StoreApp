import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { Text, TextInput, Pressable, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { getPeople } from '../../utils/getSpreadsheet'
import logPayment from '../../utils/savePurchase'

function Checkout() {
    const [people, setPeople] = useState([]);
    const [personSearch, setPersonSearch] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("cash")
    const [error, setError] = useState("");
    const { cart } = useContext(CartContext);

    const navigation = useNavigation();

    useEffect(() => {
        getPeople().then(r => {
            console.log(r);
            setPeople(r);
        })
    }, [])

    useEffect(() => {
        console.error(error)
    }, [error])

    function submit() {
        console.log("test")
        let hooman = people.find(person => person.name.toLowerCase() == personSearch.toLowerCase())
        if (!hooman)
            return setError("That person does not exist")

        if (paymentMethod.toLowerCase() != "card" && paymentMethod.toLowerCase() != "cash")
            return setError("Invalid payment method")

        logPayment({ personSearch: hooman, cart, paymentMethod });
        navigation.navigate("Products")
    }

    if (people.length == 0) return <View><Text>Loading...</Text></View>

    return (
        <View style={{ marginTop: 10, display: "flex", flexDirection: "column" }}>
            <View style={{ height: 260, width: "100%", display: "flex", flexDirection: "row", flexWrap: "nowrap", justifyContent: "space-evenly" }}>
                <SafeAreaView style={{ width: 425, height: 200 }}>
                    <TextInput onChangeText={setPersonSearch} value={personSearch} style={{ padding: "10px", marginTop: "10px", backgroundColor: "#fff", fontSize: 18 }} placeholder="Who is the order for?" />
                    <ScrollView>
                        {
                            filterPersons(people, personSearch).map((human, i) => {
                                return <Pressable key={i} onPress={() => setPersonSearch(human.name)}>
                                    <Text style={{ marginLeft: "20px", marginTop: "10px", fontWeight: "800", fontSize: "18" }}>{human.name}</Text>
                                </Pressable>
                            })
                        }
                    </ScrollView>
                </SafeAreaView>
                <View style={{ width: 250, height: 275, display: "flex", flexDirection: "column", flexWrap: "nowrap", backgroundColor: "#D9D9D9", alignItems: "center", borderRadius: 6 }}>
                    <Text style={{ color: "#4A4A4A", marginTop: 5, fontWeight: 600 }}>Total Amount:</Text>
                    <Text style={{ fontSize: 64, fontWeight: "1200" }}>{computeTotalCost(cart)}</Text>
                    <Text style={{ color: "#4A4A4A", marginTop: 5, fontWeight: 600 }}>
                        Payment Method:
                    </Text>
                    <View style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", flexDirection: "row", flexWrap: "nowrap", width: "100%", marginTop: 25 }}>
                        <Pressable onPress={() => setPaymentMethod("card")} style={{ width: 75, height: 75, borderRadius: 7, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: paymentMethod == "card" ? "#0D6EFD" : "#fff" }}>
                            <Text style={{ fontSize: 20, fontWeight: 600, color: paymentMethod == "card" ? "#fff" : "#000" }}>Cash</Text>
                        </Pressable>
                        <Pressable onPress={() => setPaymentMethod("cash")} style={{ width: 75, height: 75, borderRadius: 7, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: paymentMethod == "cash" ? "#0D6EFD" : "#fff" }}>
                            <Text style={{ fontSize: 20, fontWeight: 600, color: paymentMethod == "cash" ? "#fff" : "#000" }}>Card</Text>
                        </Pressable>
                    </View>
                </View>
            </View>

            <TouchableOpacity onPress={() => submit()} style={{ width: 400, height: 40, padding: 25, borderRadius: 6, backgroundColor: "#0d6efd", marginLeft: 70, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: "#fff", fontSize: 32, fontWeight: 1000 }}>Complete</Text>
            </TouchableOpacity>
        </View>
    )
}

function filterPersons(arr, startingWith) {
    let firstNames = arr.filter(p => p.name.toLowerCase().startsWith(startingWith.toLowerCase()))
    let lastNames = arr.filter(p => p.name.split(" ")[1].toLowerCase().startsWith(startingWith.toLowerCase()))
    return [...firstNames, ...lastNames];
}

function computeTotalCost(cart) {
    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    let sum = 0;
    for (let i = 0; i < cart.length; i++) {
        let item = cart[i];
        let priceWithoutDollarSign = item.price.slice(1, item.price.length);
        sum += parseInt(item.amount) * priceWithoutDollarSign;
    }

    return USDollar.format(sum);
}

export default Checkout;