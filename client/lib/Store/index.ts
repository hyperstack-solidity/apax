import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { createPriceSlice, PriceSlice } from './priceSlice'
import { createHoldingsSlice, HoldingsSlice } from './holdingsSlice'
import { createVaultSlice, VaultSlice } from './vaultSlice'
import { createUISlice, UISlice } from './uiSlice'

// Combine all slice types
export type Store = PriceSlice & HoldingsSlice & VaultSlice & UISlice

export const useStore = create<Store>()(
  persist(
    (set, get, api) => ({
      ...createPriceSlice(set, get, api),
      ...createHoldingsSlice(set, get, api),
      ...createVaultSlice(set, get, api),
      ...createUISlice(set, get, api),
    }),
    {
      name: 'ui-store',
      partialize: (state) => ({ activeView: state.activeView }),
    }
  )
)
