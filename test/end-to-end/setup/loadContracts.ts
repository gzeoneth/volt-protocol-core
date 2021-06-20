import { artifacts } from 'hardhat'
import { ContractAddresses, TestEnvContracts } from './types';

const coreArtifact = artifacts.require('Core')
const tribeArtifact = artifacts.require('Tribe')
const governorAlpha = artifacts.require('GovernorAlpha')
const timelockArtifact = artifacts.require('Timelock')
const feiArtifact = artifacts.require('Fei')
const uniswapIncentiveArtifact = artifacts.require('UniswapIncentive')
const ethBondingCurveArtifact = artifacts.require('EthBondingCurve')
const ethUniswapPCVDepositArtifact = artifacts.require('EthUniswapPCVDeposit')
const ethUniswapPCVController = artifacts.require('EthUniswapPCVController')
const uniswapOracleArtifact = artifacts.require('UniswapOracle')
const bondingCurveOracleArtifact = artifacts.require('BondingCurveOracle')
const feiRewardsDistributorArtifact = artifacts.require('FeiRewardsDistributor')
const feiStakingRewardsArtifact = artifacts.require('FeiStakingRewards')
const genesisGroupArtifact = artifacts.require('GenesisGroup')
const feiRouterArtifact = artifacts.require('FeiRouter')
const ethReserveStabiliserArtifact = artifacts.require('EthReserveStabiliser')
const ethPCVDripperArtifact = artifacts.require('EthPCVDripper')
const ratioPCVControllerArtifact = artifacts.require('RatioPCVController')
const ethPCVDepositAdapterArtifact = artifacts.require('EthPCVDepositAdapter')
const feiEthUniV2PairArtifact = artifacts.require('FEIETHUniV2Pair')
const feiTribeUniV2PairArtifact = artifacts.require('FEITRIBEUniV2Pair')

export function getContractArtifacts() {
  return {
    coreArtifact,
    tribeArtifact,
    governorAlpha,
    timelockArtifact,
    feiArtifact,
    uniswapIncentiveArtifact,
    ethBondingCurveArtifact,
    ethUniswapPCVDepositArtifact,
    ethUniswapPCVController,
    uniswapOracleArtifact,
    bondingCurveOracleArtifact,
    feiRewardsDistributorArtifact,
    feiStakingRewardsArtifact,
    genesisGroupArtifact,
    feiRouterArtifact,
    ethReserveStabiliserArtifact,
    ethPCVDripperArtifact,
    ratioPCVControllerArtifact,
    ethPCVDepositAdapterArtifact,
    feiEthUniV2PairArtifact,
    feiTribeUniV2PairArtifact,
  }
}

/**
 * Gets all contract instances for a set of contract names and their
 * addresses
 */
export async function getContracts(contractAddresses: ContractAddresses): Promise<TestEnvContracts> {
  // Array of all deployed contracts
  const deployedContracts = await Promise.all(Object.keys(contractAddresses).map(async contractName => {
    const web3Contract = await getContract(contractName, contractAddresses[contractName])
    return [contractName, web3Contract]
  }))
  
  // Object with mapping between contract name and contract instance
  const deployedContractObjects = deployedContracts.reduce((accumulator, currentDeployedContracts) => {
    const [contractName, contractInstance] = currentDeployedContracts;
    accumulator[contractName] = contractInstance;
    return {...accumulator}
  })

  return deployedContractObjects
}

/**
 * Get the web3 instantiation of a contract
 */
export async function getContract(contractName: string, contractAddress: string) {
  const contractArtifacts = getContractArtifacts()
  return contractArtifacts[contractName].at(contractAddress)
}