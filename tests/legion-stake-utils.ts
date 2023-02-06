import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Claim,
  OwnershipTransferred,
  Stake,
  Unstake,
  Withdraw,
  WithdrawToken
} from "../generated/LegionStake/LegionStake"

export function createClaimEvent(staker: Address, reward: BigInt): Claim {
  let claimEvent = changetype<Claim>(newMockEvent())

  claimEvent.parameters = new Array()

  claimEvent.parameters.push(
    new ethereum.EventParam("staker", ethereum.Value.fromAddress(staker))
  )
  claimEvent.parameters.push(
    new ethereum.EventParam("reward", ethereum.Value.fromUnsignedBigInt(reward))
  )

  return claimEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createStakeEvent(
  staker: Address,
  _amount: BigInt,
  _lockPeriod: BigInt,
  _tier: BigInt
): Stake {
  let stakeEvent = changetype<Stake>(newMockEvent())

  stakeEvent.parameters = new Array()

  stakeEvent.parameters.push(
    new ethereum.EventParam("staker", ethereum.Value.fromAddress(staker))
  )
  stakeEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  )
  stakeEvent.parameters.push(
    new ethereum.EventParam(
      "_lockPeriod",
      ethereum.Value.fromUnsignedBigInt(_lockPeriod)
    )
  )
  stakeEvent.parameters.push(
    new ethereum.EventParam("_tier", ethereum.Value.fromUnsignedBigInt(_tier))
  )

  return stakeEvent
}

export function createUnstakeEvent(
  unstaker: Address,
  unstakeTime: BigInt
): Unstake {
  let unstakeEvent = changetype<Unstake>(newMockEvent())

  unstakeEvent.parameters = new Array()

  unstakeEvent.parameters.push(
    new ethereum.EventParam("unstaker", ethereum.Value.fromAddress(unstaker))
  )
  unstakeEvent.parameters.push(
    new ethereum.EventParam(
      "unstakeTime",
      ethereum.Value.fromUnsignedBigInt(unstakeTime)
    )
  )

  return unstakeEvent
}

export function createWithdrawEvent(withdrawer: Address): Withdraw {
  let withdrawEvent = changetype<Withdraw>(newMockEvent())

  withdrawEvent.parameters = new Array()

  withdrawEvent.parameters.push(
    new ethereum.EventParam(
      "withdrawer",
      ethereum.Value.fromAddress(withdrawer)
    )
  )

  return withdrawEvent
}

export function createWithdrawTokenEvent(
  withdrawer: Address,
  amount: BigInt
): WithdrawToken {
  let withdrawTokenEvent = changetype<WithdrawToken>(newMockEvent())

  withdrawTokenEvent.parameters = new Array()

  withdrawTokenEvent.parameters.push(
    new ethereum.EventParam(
      "withdrawer",
      ethereum.Value.fromAddress(withdrawer)
    )
  )
  withdrawTokenEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return withdrawTokenEvent
}
