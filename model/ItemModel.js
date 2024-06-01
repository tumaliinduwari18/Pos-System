export default class ItemModel {
    constructor(itemCode, itemName, qtyOnHand, itemPrice) {
        this._itemCode = itemCode;
        this._itemName = itemName;
        this._qtyOnHand = qtyOnHand;
        this._itemPrice = itemPrice;
    }


    get itemCode() {
        return this._itemCode;
    }

    set itemCode(value) {
        this._itemCode = value;
    }

    get itemName() {
        return this._itemName;
    }

    set itemName(value) {
        this._itemName = value;
    }

    get qtyOnHand() {
        return this._qtyOnHand;
    }

    set qtyOnHand(value) {
        this._qtyOnHand = value;
    }

    get itemPrice() {
        return this._itemPrice;
    }

    set itemPrice(value) {
        this._itemPrice = value;
    }
}