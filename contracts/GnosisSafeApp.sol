pragma solidity ^0.4.24;

import "@aragon/os/contracts/apps/AragonApp.sol";
import "@aragon/os/contracts/lib/math/SafeMath.sol";


contract Enum {
    enum Operation {
        Call, DelegateCall
    }
}


interface Executor {
    /** @notice Allows a Module to execute a transaction.
    *   @param to Destination address of module transaction.
    *   @param value Ether value of module transaction.
    *   @param data Data payload of module transaction.
    *   @param operation Operation type of module transaction.
    */
    function execTransactionFromModule(address to, uint256 value, bytes data, Enum.Operation operation)
        external
        returns (bool success);
}


contract GnosisSafeApp is AragonApp {
    /// Events
    event Executed(address to, uint256 value, bytes data, Enum.Operation operation, bool succes);
    event Transfer(address to, uint256 value, bool succes);



    /// State
    Executor public executor;
    
    /// ACL
    bytes32 constant public EXECUTE_ROLE = keccak256("EXECUTE_ROLE");
    
    function initialize(Executor _executor) public onlyInit {
        executor = _executor;
        initialized();
    }

    /**
     * @notice Execute the call
     * @param to Address to send to
     * @param value Amount to send
     * @param data Payload of transaction
     * @param operation Call or delegatecall
     */
    function execute(address to, uint256 value, bytes data, Enum.Operation operation) auth(EXECUTE_ROLE) external  {
        bool succes = executor.execTransactionFromModule(to, value, data, operation);
        emit Executed(to, value, data, operation, succes);
    }
    function transfer(address to, uint256 value) auth(EXECUTE_ROLE) external  {
        Enum.Operation operation = Enum.Operation.Call;
        bool succes = executor.execTransactionFromModule(to, value, "0", operation);
        emit Transfer(to, value, succes);
    }

}
