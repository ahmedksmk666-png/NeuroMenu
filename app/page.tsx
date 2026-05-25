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
function applyCharmPricing(priceInput: string | undefined | null): string {
  // Guard against null/undefined input
  if (!priceInput || typeof priceInput !== "string") {
    return "0.95"
  }
  
  // Remove any $ signs and whitespace
  const cleanPrice = priceInput.replace(/[$\s]/g, "")
  const numericPrice = parseFloat(cleanPrice)
  
  // Guard against NaN or invalid numbers
  if (isNaN(numericPrice) || numericPrice <= 0) {
    return "0.95"
  }
  
  // If it's a whole number or ends in .00, apply charm pricing
  // Subtract 1 and add .95 (e.g., $15 -> 14.95, $24.00 -> 23.95)
  if (numericPrice === Math.floor(numericPrice) || cleanPrice.endsWith(".00")) {
    const charmPrice = Math.floor(numericPrice) - 1 + 0.95
    return charmPrice > 0 ? charmPrice.toFixed(2) : "0.95"
  }
  
  // For non-whole numbers, just ensure .95 ending
  return (Math.floor(numericPrice) + 0.95).toFixed(2)
}

// Generates the Premium Decoy item at 2.5x-3x the highest price
function generatePremiumDecoy(items: MenuItem[]): PremiumDecoy | null {
  // Guard against empty or invalid items array
  if (!items || !Array.isArray(items) || items.length === 0) {
    return null
  }
  
  // Find the most expensive item with safe parsing
  let maxPrice = 0
  let mostExpensiveItem: MenuItem | null = null
  
  for (const item of items) {
    if (!item || !item.price) continue
    
    const priceStr = String(item.price).replace(/[$\s]/g, "")
    const price = parseFloat(priceStr)
    
    if (!isNaN(price) && price > maxPrice) {
      maxPrice = price
      mostExpensiveItem = item
    }
  }
  
  // If no valid item found, return null
  if (!mostExpensiveItem || maxPrice <= 0) {
    return null
  }
  
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
    basedOn: mostExpensiveItem.name || "Menu Item",
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
  // Guard against invalid input
  if (!items || !Array.isArray(items) || items.length === 0) {
    return []
  }
  
  const techniques = [
    "Currency Blindness + Charm Pricing",
    "Anchoring Effect",
    "Price Decoy Adjacency",
  ]

  return items
    .filter((item) => item && item.name && item.price) // Filter out invalid items
    .map((item, index) => {
      const originalPrice = String(item.price).replace(/[$\s]/g, "") || "0"
      const optimizedPrice = applyCharmPricing(item.price)
      
      return {
        original: {
          name: item.name || "Unknown Item",
          price: originalPrice,
        },
        optimized: {
          name: item.name || "Unknown Item",
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
    // Guard against invalid input
    if (!items || !Array.isArray(items) || items.length === 0) {
      return
    }
    
    setIsAnalyzing(true)
    setOptimizedItems([])
    setPremiumDecoy(null)
    setAnalyticsData(null)

    // Simulate AI processing time with "Applying Behavioral Models..." state
    setTimeout(() => {
      try {
        const optimized = optimizeMenu(items)
        const decoy = generatePremiumDecoy(items)
        const analytics = generateAnalytics()
        
        setOptimizedItems(optimized)
        setPremiumDecoy(decoy)
        setAnalyticsData(analytics)
      } catch (error) {
        console.error("[v0] Error during menu optimization:", error)
        // Reset to safe state on error
        setOptimizedItems([])
        setPremiumDecoy(null)
        setAnalyticsData(null)
      } finally {
        setIsAnalyzing(false)
      }
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
