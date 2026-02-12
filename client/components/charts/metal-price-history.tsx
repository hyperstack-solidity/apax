'use client'

import React, { useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useAPAXStore } from '@/lib/store'

// mock data generate
const generateHistoricalData = (currentPrice: number) => {
  return [
    { time: '08:00', price: currentPrice * 0.982 },
    { time: '10:00', price: currentPrice * 0.988 },
    { time: '12:00', price: currentPrice * 0.995 },
    { time: '14:00', price: currentPrice * 0.991 },
    { time: '16:00', price: currentPrice * 1.008 },
    { time: '18:00', price: currentPrice * 1.003 },
    { time: '20:00', price: currentPrice }, 
  ]
}

export function MetalPriceHistoryChart() {

  //global state access
  const { metalPrices } = useAPAXStore()
  
  const chartData = useMemo(() => 
    generateHistoricalData(metalPrices.gold), 
  [metalPrices.gold])

  //chart
  return (
    <div className="w-full h-80 bg-card/50 border border-border rounded-xl p-4 institutional-shadow overflow-hidden relative">
      <div className="absolute inset-0 mesh-gradient-gold opacity-30 pointer-events-none" />

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="var(--border)" 
            vertical={false} 
            opacity={0.4} 
          />

          <XAxis 
            dataKey="time" 
            stroke="var(--muted-foreground)" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false} 
            dy={10}
            className="font-vault opacity-60"
          />
          
          <YAxis hide domain={['dataMin * 0.95', 'dataMax * 1.05']} />

          <Tooltip
            cursor={{ 
              stroke: '#D4AF37', 
              strokeWidth: 1, 
              strokeDasharray: '4 4',
              opacity: 0.5
            }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-[#0A0A0A]/90 backdrop-blur-md border border-[#D4AF37]/20 p-3 rounded-lg shadow-2xl">
                    <p className="text-[10px] font-vault text-[#666666] uppercase tracking-widest mb-1">
                      {payload[0].payload.time} UTC
                    </p>
                    <p className="text-sm font-vault font-medium text-[#D4AF37]">
                      ${payload[0].value?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />

          <Area 
            type="monotone" 
            dataKey="price" 
            stroke="#D4AF37" 
            strokeWidth={2} 
            fill="url(#goldGradient)" 
            isAnimationActive={true}
            animationDuration={1500}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}