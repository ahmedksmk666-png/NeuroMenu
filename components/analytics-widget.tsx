"use client"

import { useEffect, useState } from "react"
import { TrendingUp, Target, DollarSign, Users, Sparkles } from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import type { AnalyticsData } from "@/app/page"

interface AnalyticsWidgetProps {
  analyticsData: AnalyticsData | null
  isAnalyzing: boolean
}

// Animated counter hook for smooth number transitions
function useAnimatedValue(targetValue: number | undefined | null, duration: number = 1500) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    // Guard against invalid target values
    const safeTarget = typeof targetValue === "number" && !isNaN(targetValue) ? targetValue : 0
    
    if (safeTarget === 0) {
      setDisplayValue(0)
      return
    }

    const startTime = Date.now()
    const startValue = 0
    let animationFrameId: number

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = startValue + (safeTarget - startValue) * easeOutQuart
      
      setDisplayValue(currentValue)
      
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    animationFrameId = requestAnimationFrame(animate)
    
    // Cleanup function to cancel animation on unmount or value change
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [targetValue, duration])

  return displayValue
}

export function AnalyticsWidget({ analyticsData, isAnalyzing }: AnalyticsWidgetProps) {
  const hasAnalyzed = analyticsData !== null
  
  // Animated values
  const animatedProfit = useAnimatedValue(analyticsData?.profitIncrease ?? 0)
  const animatedDecoy = useAnimatedValue(analyticsData?.decoyConversionRate ?? 0)
  const animatedTicket = useAnimatedValue(analyticsData?.avgTicketIncrease ?? 0)
  const animatedSatisfaction = useAnimatedValue(analyticsData?.customerSatisfaction ?? 0)

  // Generate projection data based on profit increase
  const profitMultiplier = 1 + (analyticsData?.profitIncrease ?? 0) / 100
  const baseRevenue = [45000, 47000, 46000, 48000, 49000, 47000]
  const projectionData = [
    { month: "Jan", original: baseRevenue[0], optimized: hasAnalyzed ? Math.round(baseRevenue[0] * 1.0) : baseRevenue[0] },
    { month: "Feb", original: baseRevenue[1], optimized: hasAnalyzed ? Math.round(baseRevenue[1] * (1 + profitMultiplier * 0.2)) : baseRevenue[1] },
    { month: "Mar", original: baseRevenue[2], optimized: hasAnalyzed ? Math.round(baseRevenue[2] * (1 + profitMultiplier * 0.4)) : baseRevenue[2] },
    { month: "Apr", original: baseRevenue[3], optimized: hasAnalyzed ? Math.round(baseRevenue[3] * (1 + profitMultiplier * 0.6)) : baseRevenue[3] },
    { month: "May", original: baseRevenue[4], optimized: hasAnalyzed ? Math.round(baseRevenue[4] * (1 + profitMultiplier * 0.8)) : baseRevenue[4] },
    { month: "Jun", original: baseRevenue[5], optimized: hasAnalyzed ? Math.round(baseRevenue[5] * profitMultiplier) : baseRevenue[5] },
  ]

  const stats = [
    {
      label: "Projected Profit Increase",
      value: hasAnalyzed ? `+${animatedProfit.toFixed(1)}%` : "—",
      icon: TrendingUp,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      label: "Decoy Conversion Rate",
      value: hasAnalyzed ? `${animatedDecoy.toFixed(1)}%` : "—",
      icon: Target,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Avg. Ticket Size",
      value: hasAnalyzed ? `+$${animatedTicket.toFixed(2)}` : "—",
      icon: DollarSign,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      label: "Customer Satisfaction",
      value: hasAnalyzed ? `${animatedSatisfaction.toFixed(1)}%` : "—",
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ]

  return (
    <div className={`rounded-xl border bg-card p-6 transition-all duration-500 ${isAnalyzing ? "border-primary/50 animate-pulse" : "border-border"}`}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Analytics Overview</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {isAnalyzing ? "Calculating projections..." : "Projected performance metrics"}
          </p>
        </div>
        {isAnalyzing && (
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="h-4 w-4 animate-spin" style={{ animationDuration: "2s" }} />
            <span className="text-sm">Processing</span>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`rounded-lg border border-border/50 bg-secondary/30 p-4 transition-all duration-500 ${hasAnalyzed ? "animate-in fade-in slide-in-from-bottom-2" : ""}`}
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: "both" }}
          >
            <div className={`mb-2 flex h-8 w-8 items-center justify-center rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
            <div className={`text-2xl font-bold transition-colors duration-300 ${hasAnalyzed ? stat.color : "text-muted-foreground"}`}>
              {stat.value}
            </div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Revenue Projection Chart */}
      <div className={`rounded-lg border border-border/50 bg-secondary/30 p-4 transition-all duration-500 ${hasAnalyzed ? "border-primary/20" : ""}`}>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="font-medium text-foreground">Revenue Projection</h3>
            <p className="text-xs text-muted-foreground">6-month forecast comparison</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-muted-foreground" />
              <span className="text-muted-foreground">Original</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className={`h-2 w-2 rounded-full transition-colors duration-500 ${hasAnalyzed ? "bg-primary" : "bg-muted-foreground/30"}`} />
              <span className="text-muted-foreground">Optimized</span>
            </div>
          </div>
        </div>

        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={projectionData}>
              <defs>
                <linearGradient id="colorOriginal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.6 0.02 240)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.6 0.02 240)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorOptimized" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.65 0.2 235)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.65 0.2 235)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.25 0.02 240)"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "oklch(0.6 0.02 240)", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "oklch(0.6 0.02 240)", fontSize: 12 }}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.12 0.015 240)",
                  border: "1px solid oklch(0.25 0.02 240)",
                  borderRadius: "8px",
                  color: "oklch(0.95 0.01 240)",
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
              />
              <Area
                type="monotone"
                dataKey="original"
                stroke="oklch(0.6 0.02 240)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorOriginal)"
                name="Original"
              />
              {hasAnalyzed && (
                <Area
                  type="monotone"
                  dataKey="optimized"
                  stroke="oklch(0.65 0.2 235)"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorOptimized)"
                  name="Optimized"
                  className="animate-in fade-in duration-1000"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
