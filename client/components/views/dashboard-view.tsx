'use client'

import Image from 'next/image'
import { PortfolioOverview } from '@/components/portfolio-overview'
import { AssetAllocationChart } from '@/components/asset-allocation-chart'
import { ShariaCertificationHub } from '@/components/sharia-certification-hub'
import BullionCard from '@/components/ui/bullion-card'

export function DashboardView() {
  const showroomItems = [
    { type: "gold" as const, weight: "100 g", purity: "999.9", price: "$7,450.00" },
    { type: "silver" as const, weight: "100 oz", purity: "999.0", price: "$2,450.00" },
    { type: "platinum" as const, weight: "500 g", purity: "999.5", price: "$14,800.00" },
    { type: "gold" as const, weight: "100 g", purity: "999.9", price: "$7,450.00" },
  ];

  return (
    <div className="space-y-4 md:space-y-6  max-w-7xl mx-auto overflow-hidden">
      {/* Live Ledger Ticker */}
      <div className="w-full bg-[#1A1A1A]/50 border-y border-[#2A2A2A] overflow-hidden py-1.5 relative">
        <div className="flex animate-ticker whitespace-nowrap gap-12 items-center">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-12 items-center">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-terminal-sm">Network Connectivity: 100%</span>
              </div>
              <span className="text-terminal-sm">Latest Block: #8,421,093</span>
              <span className="text-terminal-sm text-[#D4AF37]">Vault A1-X: Re-verified by Lead Auditor</span>
              <span className="text-terminal-sm">Last Synced: 2s ago</span>
            </div>
          ))}
        </div>
      </div>

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-serif font-bold text-[#E8E8E8]">
            Welcome back, John!
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 md:h-12 md:w-12 overflow-hidden rounded-lg gold-glow">
            <Image
              src="/images/apax-logo.png"
              alt="APAX Emblem"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Portfolio Overview Stats */}
      <PortfolioOverview />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6 items-start">
        {/* Asset Allocation Charts */}
        <AssetAllocationChart />

        {/* Sharia Certification Hub - Moved inside grid for better density */}
        <ShariaCertificationHub />
      </div>
     <div className="pt-8 space-y-6">
        <div className="flex items-center justify-between px-4 sm:px-0">
           <h2 className="text-xl md:text-2xl font-serif font-bold text-[#E8E8E8]">
             Bullion Showroom
           </h2>
           <button className="text-xs text-[#D4AF37] hover:underline uppercase tracking-widest font-bold transition-colors hover:text-[#FCE798]">
             View Vault Inventory →
           </button>
        </div>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-0">
          {showroomItems.map((item, idx) => (
            <BullionCard 
              key={idx}
              type={item.type}
              weight={item.weight}
              purity={item.purity}
              price={item.price}
              className="w-full" // Ensure card takes full width of grid cell
            />
          ))}
        </div>
      </div>
      

    </div>
  )
}
