export default class TempCartModel {
    constructor(orItemCode, orItemName, orItemPrice, orItemQty, orItemTotal) {
        this._orItemCode = orItemCode;
        this._orItemName = orItemName;
        this._orItemPrice =orItemPrice;
        this._orItemQty = orItemQty;
        this._orItemTotal = orItemTotal;
    }


    get orItemCode() {
        return this._orItemCode;
    }

    set orItemCode(value) {
        this._orItemCode = value;
    }

    get orItemName() {
        return this._orItemName;
    }

    set orItemName(value) {
        this._orItemName = value;
    }

    get orItemPrice() {
        return this._orItemPrice;
    }

    set orItemPrice(value) {
        this._orItemPrice = value;
    }

    get orItemQty() {
        return this._orItemQty;
    }

    set orItemQty(value) {
        this._orItemQty = value;
    }

    get orItemTotal() {
        return this._orItemTotal;
    }

    set orItemTotal(value) {
        this._orItemTotal = value;
    }
}