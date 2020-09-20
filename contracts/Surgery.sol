pragma solidity ^0.4.24;

import "@aragon/os/contracts/apps/AragonApp.sol";


contract Surgery is AragonApp {
    event PerformedSurgery(address indexed surgeon, uint256 slot, bytes32 value);
    event PerformedCall(address indexed surgeon, address indexed to, bytes message);

    function operate(uint256 slot, bytes32 value) external {
        assembly {
            sstore(slot, value)
        }

        emit PerformedSurgery(msg.sender, slot, value);
    }

    function phone(address to, bytes message) external {
        require(to.call(message), "CALL_FAILED");

        emit PerformedCall(msg.sender, to, message);
    }
}
