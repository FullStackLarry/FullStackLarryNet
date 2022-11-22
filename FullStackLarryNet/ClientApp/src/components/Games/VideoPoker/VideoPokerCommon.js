export const CardValues = {
    Ace: 0,
    Two: 1,
    Three: 2,
    Four: 3,
    Five: 4,
    Six: 5,
    Seven: 6,
    Eight: 7,
    Nine: 8,
    Ten: 9,
    Jack: 10,
    Queen: 11,
    King: 12
}

export const HandPayouts = {
  RoyalFlush: "ROYAL FLUSH",
  StraightFlush: "STRAIGHT FLUSH",
  FourOfAKind: "4 OF A KIND",
  FullHouse: "FULL HOUSE",
  Flush: "FLUSH",
  Straight: "STRAIGHT",
  ThreeOfAKind: "3 OF A KIND",
  TwoPair: "TWO PAIR",
  JacksOrBetter: "JACKS OR BETTER",
}

export const HandPayoutAmounts = {
  RoyalFlush: 800,
  StraightFlush: 50,
  FourOfAKind: 25,
  FullHouse: 9,
  Flush: 6,
  Straight: 4,
  ThreeOfAKind: 3,
  TwoPair: 2,
  JacksOrBetter: 1,
}

export const Payouts = [
  {
    description: HandPayouts.RoyalFlush,
    amount: HandPayoutAmounts.RoyalFlush,
    handMade: false,
  },
  {
    description: HandPayouts.StraightFlush,
    amount: HandPayoutAmounts.StraightFlush,
    handMade: false,
  },
  {
    description: HandPayouts.FourOfAKind,
    amount: HandPayoutAmounts.FourOfAKind,
    handMade: false,
  },
  {
    description: HandPayouts.FullHouse,
    amount: HandPayoutAmounts.FullHouse,
    handMade: false,
  },
  {
    description: HandPayouts.Flush,
    amount: HandPayoutAmounts.Flush,
    handMade: false,
  },
  {
    description: HandPayouts.Straight,
    amount: HandPayoutAmounts.Straight,
    handMade: false,
  },
  {
    description: HandPayouts.ThreeOfAKind,
    amount: HandPayoutAmounts.ThreeOfAKind,
    handMade: false,
  },
  {
    description: HandPayouts.TwoPair,
    amount: HandPayoutAmounts.TwoPair,
    handMade: false,
  },
  {
    description: HandPayouts.JacksOrBetter,
    amount: HandPayoutAmounts.JacksOrBetter,
    handMade: false,
  },
]

export const GameState = {
  Initialized: "Initialized",
  HandOver: "Hand Over",
  NewDeal: "New Deal",
}

export function evaluateHand(hand) {
  let values = new Array(5)
  let suits = new Array(5)
  let isFlush = false
  let isStraight = false
  let isHighStraight = false

  
  for (let i = 0; i < 5; i++) {
    values[i] = parseInt(hand[i].value)
    suits[i] = hand[i].suit
  }

  values.sort((a, b) => a - b)

  //    Flush
  if (suits.every((s) => s === suits[0])) isFlush = true

  //    High Straight
  if (
    values[0] === CardValues.Ace &&
    values[1] === CardValues.Ten &&
    values[2] === CardValues.Jack &&
    values[3] === CardValues.Queen &&
    values[4] === CardValues.King
  )
    isHighStraight = true
  if (isHighStraight && isFlush) return HandPayouts.RoyalFlush

  //    Straight
  if (
    values[0] + 1 === values[1] &&
    values[1] + 1 === values[2] &&
    values[2] + 1 === values[3] &&
    values[3] + 1 === values[4]
  )
    isStraight = true
  if (isStraight && isFlush) return HandPayouts.StraightFlush

  let uniqueValues = Array.from(new Set(values))
  let uniqueCounts = new Array(uniqueValues.length)
  uniqueCounts.fill(0)

  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < uniqueValues.length; j++) {
      if (values[i] === uniqueValues[j]) uniqueCounts[j]++
    }
  }

  let highPair = -1
  let pairCount = 0
  let threeCount = 0

  for (let i = 0; i < uniqueValues.length; i++) {
    if (uniqueCounts[i] === 4) return HandPayouts.FourOfAKind
    if (uniqueCounts[i] === 3) threeCount++
    if (uniqueCounts[i] === 2) {
      pairCount++
      if (highPair !== CardValues.Ace)
        highPair = uniqueValues[i] > highPair ? uniqueValues[i] : highPair
    }
  }

  if (threeCount === 1 && pairCount === 1) return HandPayouts.FullHouse
  if (isFlush) return HandPayouts.Flush
  if (isHighStraight || isStraight) return HandPayouts.Straight
  if (threeCount === 1) return HandPayouts.ThreeOfAKind
  if (pairCount === 2) return HandPayouts.TwoPair
  if (pairCount === 1 && (highPair === CardValues.Ace || highPair > CardValues.Ten))
    return HandPayouts.JacksOrBetter

  return ""
}
