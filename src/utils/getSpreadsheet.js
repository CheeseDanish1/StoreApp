import {STOCK_SPREADSHEET_URL, PEOPLE_SPREADSHEET_URL} from '../../constants.json'
import csvJSON from "../utils/csvToJson"
import serialize from "../utils/serialize"

export async function getStock() {
    let r = await fetch(STOCK_SPREADSHEET_URL)
    let result = await r.text();
    let stockJSON = csvJSON(result);
    let final = serialize.products(JSON.parse(stockJSON))
    return final;
}

export async function getPeople() {
    let r = await fetch(PEOPLE_SPREADSHEET_URL)
    let result = await r.text();
    let peopleJSON = csvJSON(result);
    let final = serialize.people(JSON.parse(peopleJSON))
    return final;
}