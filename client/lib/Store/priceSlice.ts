'use client'


import { StateCreator } from 'zustand'

export interface MetalPrice {
  gold: number
  silver: number
  platinum: number
  lastUpdated: Date
}

export interface PriceSlice {
  metalPrices: MetalPrice
  setMetalPrices: (prices: MetalPrice) => void
}

const initialMetalPrices: MetalPrice = {
  gold: 2342.50,
  silver: 27.85,
  platinum: 1024.30,
  lastUpdated: new Date()
}

export const createPriceSlice: StateCreator<PriceSlice> = (set) => ({
  metalPrices: initialMetalPrices,
  setMetalPrices: (prices: MetalPrice) => set({ metalPrices: prices })
})
