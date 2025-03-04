// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.4;

import {TimelockController} from "@openzeppelin/contracts/governance/TimelockController.sol";
import {CoreRef} from "../refs/CoreRef.sol";

// Timelock with proposer, executor, canceller and admin roles
contract OptimisticTimelock is TimelockController, CoreRef {
    constructor(
        address core_,
        uint256 minDelay,
        address[] memory proposers,
        address[] memory executors
    ) TimelockController(minDelay, proposers, executors) CoreRef(core_) {
        // Only guardians and governors are timelock admins
        revokeRole(TIMELOCK_ADMIN_ROLE, msg.sender);
    }

    /**
        @notice allow guardian or governor to assume timelock admin roles
        This more elegantly achieves optimistic timelock as follows:
        - veto: all proposers are granted the CANCELLER_ROLE in the constructor, 
          CANCELLER_ROLE can cancel any in-flight proposal
        - pause proposals: revoke PROPOSER_ROLE from target
        - pause execution: revoke EXECUTOR_ROLE from target
        - set new proposer: revoke old proposer and add new one

        In addition it allows for much more granular and flexible access for multisig operators
    */
    function becomeAdmin() public onlyGuardianOrGovernor {
        this.grantRole(TIMELOCK_ADMIN_ROLE, msg.sender);
    }
}
