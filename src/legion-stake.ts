import {
  Claim as ClaimEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Stake as StakeEvent,
  Unstake as UnstakeEvent,
  Withdraw as WithdrawEvent,
  WithdrawToken as WithdrawTokenEvent
} from "../generated/LegionStake/LegionStake"
import {
  Claim,
  OwnershipTransferred,
  Stake,
  Unstake,
  Withdraw,
  WithdrawToken
} from "../generated/schema"

export function handleClaim(event: ClaimEvent): void {
  let entity = new Claim(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.staker = event.params.staker
  entity.reward = event.params.reward
  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner
  entity.save()
}

export function handleStake(event: StakeEvent): void {
  let entity = new Stake(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.staker = event.params.staker
  entity._amount = event.params._amount
  entity._lockPeriod = event.params._lockPeriod
  entity._tier = event.params._tier
  entity.save()
}

export function handleUnstake(event: UnstakeEvent): void {
  let entity = new Unstake(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.unstaker = event.params.unstaker
  entity.unstakeTime = event.params.unstakeTime
  entity.save()
}

export function handleWithdraw(event: WithdrawEvent): void {
  let entity = new Withdraw(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.withdrawer = event.params.withdrawer
  entity.save()
}

export function handleWithdrawToken(event: WithdrawTokenEvent): void {
  let entity = new WithdrawToken(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.withdrawer = event.params.withdrawer
  entity.amount = event.params.amount
  entity.save()
}
