// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.4;

import "./IPermissions.sol";
import "../volt/IVolt.sol";

/// @title Core Interface
/// @author Fei Protocol
interface ICore is IPermissions {

    // ----------- Events -----------
    event VoltUpdate(address indexed _fei);
    event VconUpdate(address indexed _tribe);

    // ----------- Governor only state changing api -----------

    function init() external;

    function setVolt(address token) external;

    function setVcon(address token) external;

    function allocateVcon(address user, uint256 amount) external;

    // ----------- Getters -----------

    function volt() external view returns (IVolt);

    function vcon() external view returns (IERC20);
}
