'use client'


import { StateCreator } from 'zustand'

export interface UserHolding {
  goldGrams: number
  silverGrams: number
  platinumGrams: number
  apxiTokens: number
}

export interface HoldingsSlice {
  userHoldings: UserHolding
  setUserHoldings: (holdings: UserHolding) => void
}

const initialUserHoldings: UserHolding = {
  goldGrams: 156.75,
  silverGrams: 892.40,
  platinumGrams: 45.20,
  apxiTokens: 1250.00
}

export const createHoldingsSlice: StateCreator<HoldingsSlice> = (set) => ({
  userHoldings: initialUserHoldings,
  setUserHoldings: (holdings) => set({ userHoldings: holdings })
})
