'use client'


import { StateCreator } from 'zustand'

export interface UISlice {
  activeView: 'dashboard' | 'por' | 'zakat' | 'redemption' | 'sharia'
  setActiveView: (view: 'dashboard' | 'por' | 'zakat' | 'redemption' | 'sharia') => void
}

export const createUISlice: StateCreator<UISlice> = (set) => ({
  activeView: 'dashboard',
  setActiveView: (view) => set({ activeView: view })
})
