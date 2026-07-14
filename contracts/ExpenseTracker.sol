// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ExpenseTracker {

    struct Expense {
        uint256 amount;
        string token;
        string category;
        string note;
        uint256 timestamp;
    }

    mapping(address => Expense[]) private expenses;

    event ExpenseAdded(
        address indexed user,
        uint256 amount,
        string token,
        string category,
        string note,
        uint256 timestamp
    );

    function addExpense(
        uint256 amount,
        string memory token,
        string memory category,
        string memory note
    ) public {

        expenses[msg.sender].push(
            Expense(
                amount,
                token,
                category,
                note,
                block.timestamp
            )
        );

        emit ExpenseAdded(
            msg.sender,
            amount,
            token,
            category,
            note,
            block.timestamp
        );
    }

    function getExpense(
        uint256 index
    )
        public
        view
        returns (
            uint256,
            string memory,
            string memory,
            string memory,
            uint256
        )
    {
        Expense memory e = expenses[msg.sender][index];

        return (
            e.amount,
            e.token,
            e.category,
            e.note,
            e.timestamp
        );
    }

    function getExpenseCount()
        public
        view
        returns (uint256)
    {
        return expenses[msg.sender].length;
    }
}
