// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PurchaseRecord {
    struct Purchase {
        uint256 price;
        string date;
        string customerID;
        uint index;
    }
    
    uint private _index = 40;
    Purchase[] public purchases;

    function addPurchase(uint256 _price, string memory _date, string memory _customerID) public {
        Purchase memory newPurchase = Purchase({
            price: _price,
            date: _date,
            customerID: _customerID,
            index: _index
        });
        
        _index++;
        purchases.push(newPurchase);
    }

    function getPurchaseCount() public view returns (uint256) {
        return purchases.length;
    }

    function getPurchase(uint256 index) public view returns (uint256 price, string memory date, string memory customerID, uint256 purchaseIndex) {
        require(index < purchases.length, "Index out of bounds");

        Purchase storage purchase = purchases[index];
        return (purchase.price, purchase.date, purchase.customerID, purchase.index);
    }

    function getAllPurchases() public view returns (Purchase[] memory) {
        return purchases;
    }
}
