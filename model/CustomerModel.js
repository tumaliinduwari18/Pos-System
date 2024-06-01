export default class CustomerModel {
    constructor(customerId, customerName, customerAddress, customerSalary) {
        this._customerId = customerId;
        this._customerName = customerName;
        this._customerAddress = customerAddress;
        this._customerSalary = customerSalary;
    }


    get customerId() {
        return this._customerId;
    }

    set customerId(value) {
        this._customerId = value;
    }

    get customerName() {
        return this._customerName;
    }

    set customerName(value) {
        this._customerName = value;
    }

    get customerAddress() {
        return this._customerAddress;
    }

    set customerAddress(value) {
        this._customerAddress = value;
    }

    get customerSalary() {
        return this._customerSalary;
    }

    set customerSalary(value) {
        this._customerSalary = value;
    }
}