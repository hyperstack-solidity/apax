'use client'


import { StateCreator } from 'zustand'

export interface VaultData {
  totalGoldGrams: number
  totalSilverGrams: number
  totalPlatinumGrams: number
  totalTokensMinted: number
  lastAuditDate: Date
  verificationStatus: 'verified' | 'pending' | 'syncing'
}

export interface VaultSlice {
  vaultData: VaultData
  setVaultData: (data: VaultData) => void
}

const initialVaultData: VaultData = {
  totalGoldGrams: 15678.50,
  totalSilverGrams: 89240.75,
  totalPlatinumGrams: 4520.25,
  totalTokensMinted: 125000,
  lastAuditDate: new Date(),
  verificationStatus: 'verified'
}

export const createVaultSlice: StateCreator<VaultSlice> = (set) => ({
  vaultData: initialVaultData,
  setVaultData: (data) => set({ vaultData: data })
})
