pragma solidity ^0.8.4;

interface IPriceBoundPSM {

    // ----------- Events -----------

    /// @notice event emitted when minimum floor price is updated
    event OracleFloorUpdate(uint256 oldFloor, uint256 newFloor);
    /// @notice event emitted when maximum ceiling price is updated
    event OracleCeilingUpdate(uint256 oldCeiling, uint256 newCeiling);


    // ----------- Governor or admin only state changing api -----------

    /// @notice sets the floor price in BP
    function setOracleFloor(uint256 newFloor) external;
    /// @notice sets the ceiling price in BP
    function setOracleCeiling(uint256 newCeiling) external;

    // ----------- Getters -----------

    /// @notice get the basis points delta
    function bpDelta() external view returns(uint256);
    /// @notice get the floor price in basis points
    function floor() external view returns(uint256);
    /// @notice get the ceiling price in basis points
    function ceiling() external view returns(uint256);
}
