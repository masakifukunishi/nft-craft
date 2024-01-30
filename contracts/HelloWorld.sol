// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract HelloWorld {
    function getMessage() external pure returns (string memory) {
        return "Hello World";
    }
}
