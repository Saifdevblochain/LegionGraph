import { Bytes, BigInt, store } from '@graphprotocol/graph-ts'
import {
  Claim as ClaimEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Stake as StakeEvent,
  Unstake as UnstakeEvent,
  Withdraw as WithdrawEvent,
  WithdrawToken as WithdrawTokenEvent
} from "../generated/LegionStake/LegionStake"
import {
  Data,
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
    event.params.staker.toHexString()
  )
  entity.staker = event.params.staker
  entity._amount = event.params._amount
  entity._lockPeriod = event.params._lockPeriod
  entity._tier = event.params._tier
  entity.save()

  let id = "Data"
  let entityToUpdate = Data.load(id)
  if (entityToUpdate) {
    let a = entityToUpdate.averageLockPeriod.toI32()
    let b = event.params._lockPeriod.toI32()
    entityToUpdate.averageLockPeriod = BigInt.fromI32(a + b)
    let c = entityToUpdate.totalNumberOfStakes.toI32()
    entityToUpdate.totalNumberOfStakes = BigInt.fromI32(c + 1)
    entityToUpdate.save()
  }
  else {
    let entityToCreate = new Data(id)
    entityToCreate.averageLockPeriod = event.params._lockPeriod
    entityToCreate.totalNumberOfStakes = BigInt.fromI32(1)
    entityToCreate.save()
  }
  // let arr: Array<string> = new Array();
  // if(id){
  //   arr.push(id);
  // }
  // for(let i=0; i<arr.length; i++){
  //   console.log(arr[i].toString());
  // }
  // let as = new AverageStake(id);

  // for(let i = 0; i < ){

  // }
  // as.averageStake= event.params._amount;
  // as.save();

}

export function handleUnstake(event: UnstakeEvent): void {
  let entity = new Unstake(
    event.params.unstaker.toHexString()
  )
  entity.unstaker = event.params.unstaker
  entity.unstakeTime = event.params.unstakeTime
  entity.save()

  let lockPeriodToConsider = new BigInt(0)

  let id = event.params.unstaker.toHexString()
  let entityToRemove = Stake.load(id)
  if (entityToRemove) {
    lockPeriodToConsider = entityToRemove._lockPeriod
    store.remove("Stake", id)
  }

  id = "Data"
  let entityToUpdate = Data.load(id)
  if (entityToUpdate) {
    let a = entityToUpdate.averageLockPeriod.toI32()
    let b = lockPeriodToConsider.toI32()
    entityToUpdate.averageLockPeriod = BigInt.fromI32(a - b)
    let c = entityToUpdate.totalNumberOfStakes.toI32()
    entityToUpdate.totalNumberOfStakes = BigInt.fromI32(c - 1)
    entityToUpdate.save()
  }
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
