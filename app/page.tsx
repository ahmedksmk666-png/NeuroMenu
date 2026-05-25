"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { MenuInput } from "@/components/menu-input"
import { MenuOutput } from "@/components/menu-output"
import { AnalyticsWidget } from "@/components/analytics-widget"

interface MenuItem {
  id: string
  name: string
  price: string
}

export interface OptimizedItem {
  original: {
    name: string
    price: string
  }
  optimized: {
    name: string
    price: string
  }
  technique: string
  isHighConversion: boolean
}

export interface PremiumDecoy {
  name: string
  price: string
  basedOn: string
}

export interface AnalyticsData {
  profitIncrease: number
  decoyConversionRate: number
  avgTicketIncrease: number
  customerSatisfaction: number
}

// Premium decoy name generators for sophisticated upselling
const decoyNamePrefixes = [
  "Reserve Truffle Edition",
  "Chef's Signature",
  "Black Label",
  "Premium Reserve",
  "Artisan Gold",
]

// Applies Currency Blindness & Charm Pricing:
// Strip "$" and convert whole numbers to end in .95
function applyCharmPricing(priceInput: string): string {
  // Remove any $ signs and whitespace
  const cleanPrice = priceInput.replace(/[$\s]/g, "")
  const numericPrice = parseFloat(cleanPrice) || 0
  
  // If it's a whole number or ends in .00, apply charm pricing
  // Subtract 1 and add .95 (e.g., $15 -> 14.95, $24.00 -> 23.95)
  if (numericPrice === Math.floor(numericPrice) || cleanPrice.endsWith(".00")) {
    return (Math.floor(numericPrice) - 1 + 0.95).toFixed(2)
  }
  
  // For non-whole numbers, just ensure .95 ending
  return (Math.floor(numericPrice) + 0.95).toFixed(2)
}

// Generates the Premium Decoy item at 2.5x-3x the highest price
function generatePremiumDecoy(items: MenuItem[]): PremiumDecoy | null {
  if (items.length === 0) return null
  
  // Find the most expensive item
  let maxPrice = 0
  let mostExpensiveItem = items[0]
  
  items.forEach((item) => {
    const price = parseFloat(item.price.replace(/[$\s]/g, "")) || 0
    if (price > maxPrice) {
      maxPrice = price
      mostExpensiveItem = item
    }
  })
  
  // Calculate decoy price: random between 2.5x and 3x
  const multiplier = 2.5 + Math.random() * 0.5 // 2.5 to 3.0
  const decoyPrice = maxPrice * multiplier
  
  // Apply charm pricing to decoy
  const charmDecoyPrice = (Math.floor(decoyPrice) + 0.95).toFixed(2)
  
  // Generate sophisticated decoy name
  const prefix = decoyNamePrefixes[Math.floor(Math.random() * decoyNamePrefixes.length)]
  
  return {
    name: prefix,
    price: charmDecoyPrice,
    basedOn: mostExpensiveItem.name,
  }
}

// Generate random analytics within specified ranges
function generateAnalytics(): AnalyticsData {
  return {
    profitIncrease: 15.4 + Math.random() * 6.4, // 15.4% to 21.8%
    decoyConversionRate: 28 + Math.random() * 12, // 28% to 40%
    avgTicketIncrease: 3.5 + Math.random() * 3, // $3.50 to $6.50
    customerSatisfaction: 96 + Math.random() * 3, // 96% to 99%
  }
}

// Main optimization function implementing psychological pricing rules
function optimizeMenu(items: MenuItem[]): OptimizedItem[] {
  const techniques = [
    "Currency Blindness + Charm Pricing",
    "Anchoring Effect",
    "Price Decoy Adjacency",
  ]

  return items.map((item, index) => {
    const originalPrice = item.price.replace(/[$\s]/g, "")
    const optimizedPrice = applyCharmPricing(item.price)
    
    return {
      original: {
        name: item.name,
        price: originalPrice,
      },
      optimized: {
        name: item.name,
        price: optimizedPrice,
      },
      technique: techniques[index % techniques.length],
      isHighConversion: true, // All optimized items are high conversion targets
    }
  })
}

export default function NeuroMenuDashboard() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [optimizedItems, setOptimizedItems] = useState<OptimizedItem[]>([])
  const [premiumDecoy, setPremiumDecoy] = useState<PremiumDecoy | null>(null)
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)

  const handleAnalyze = (items: MenuItem[]) => {
    setIsAnalyzing(true)
    setOptimizedItems([])
    setPremiumDecoy(null)
    setAnalyticsData(null)

    // Simulate AI processing time with "Applying Behavioral Models..." state
    setTimeout(() => {
      const optimized = optimizeMenu(items)
      const decoy = generatePremiumDecoy(items)
      const analytics = generateAnalytics()
      
      setOptimizedItems(optimized)
      setPremiumDecoy(decoy)
      setAnalyticsData(analytics)
      setIsAnalyzing(false)
    }, 2500)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* Menu Engineering Section */}
        <div className="mb-8 grid gap-6 lg:mb-12 lg:grid-cols-2 lg:gap-8">
          <MenuInput onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
          <MenuOutput 
            optimizedItems={optimizedItems} 
            premiumDecoy={premiumDecoy}
            isAnalyzing={isAnalyzing} 
          />
        </div>

        {/* Analytics Section */}
        <AnalyticsWidget analyticsData={analyticsData} isAnalyzing={isAnalyzing} />
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; 2026 NeuroMenu Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="transition-colors hover:text-foreground">Privacy</a>
              <a href="#" className="transition-colors hover:text-foreground">Terms</a>
              <a href="#" className="transition-colors hover:text-foreground">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
