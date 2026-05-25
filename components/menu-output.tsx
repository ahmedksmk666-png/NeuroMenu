"use client"

import { ArrowRight, Sparkles, TrendingUp, Crown, Target } from "lucide-react"
import type { OptimizedItem, PremiumDecoy } from "@/app/page"

interface MenuOutputProps {
  optimizedItems: OptimizedItem[]
  premiumDecoy: PremiumDecoy | null
  isAnalyzing: boolean
}

export function MenuOutput({ optimizedItems = [], premiumDecoy, isAnalyzing }: MenuOutputProps) {
  // Ensure optimizedItems is always a valid array
  const safeOptimizedItems = Array.isArray(optimizedItems) ? optimizedItems : []
  
  if (isAnalyzing) {
    return (
      <div className="flex h-full flex-col rounded-xl border border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground">Neuro-Optimized Menu</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            AI-enhanced pricing psychology
          </p>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 animate-pulse rounded-full bg-primary/20 flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-primary animate-spin" style={{ animationDuration: "3s" }} />
            </div>
            <p className="text-sm font-medium text-primary mb-1">
              Applying Behavioral Models...
            </p>
            <p className="text-xs text-muted-foreground">
              Analyzing pricing psychology patterns
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (safeOptimizedItems.length === 0) {
    return (
      <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground">Neuro-Optimized Menu</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            AI-enhanced pricing psychology
          </p>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-border bg-secondary/30">
              <Sparkles className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              Enter your menu items and click<br />&quot;Analyze & Optimize&quot; to begin
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col rounded-xl border border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5 p-6 glow-primary">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Neuro-Optimized Menu</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            AI-enhanced pricing psychology
          </p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-accent/20 px-3 py-1 text-sm font-medium text-accent">
          <TrendingUp className="h-3.5 w-3.5" />
          Optimized
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-auto">
        {/* Premium Decoy - Always at the top, styled muted/elegant */}
        {premiumDecoy && (
          <div className="relative rounded-lg border border-muted-foreground/20 bg-secondary/20 p-4 opacity-80">
            <div className="absolute -top-2.5 left-3 flex items-center gap-1 rounded bg-muted-foreground/30 px-2 py-0.5 text-xs font-medium text-muted-foreground">
              <Crown className="h-3 w-3" />
              Premium Decoy
            </div>
            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="font-medium text-muted-foreground">{premiumDecoy.name}</span>
                <p className="text-xs text-muted-foreground/70 mt-0.5">
                  Based on: {premiumDecoy.basedOn}
                </p>
              </div>
              <span className="text-xl font-bold text-muted-foreground">{premiumDecoy.price}</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground/60 italic">
              Anchoring effect: Makes other items seem more affordable
            </p>
          </div>
        )}

        {/* Optimized Items with High Conversion Target badges */}
        {safeOptimizedItems.map((item, index) => {
          // Skip rendering if item is invalid
          if (!item || !item.original || !item.optimized) {
            return null
          }
          
          return (
          <div 
            key={index} 
            className="relative rounded-lg border border-primary/30 bg-card/50 p-4 animate-in fade-in slide-in-from-bottom-2"
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: "both" }}
          >
            {/* High Conversion Target Badge */}
            {item.isHighConversion && (
              <div className="absolute -top-2.5 right-3 flex items-center gap-1 rounded bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
                <Target className="h-3 w-3" />
                High Conversion Target
              </div>
            )}

            <div className="flex items-center gap-4 pt-1">
              {/* Original */}
              <div className="flex-1">
                <div className="mb-1 text-xs text-muted-foreground">Original</div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground line-through">
                    {item.original.name}
                  </span>
                  <span className="text-muted-foreground line-through">
                    ${item.original.price}
                  </span>
                </div>
              </div>

              <ArrowRight className="h-4 w-4 shrink-0 text-primary" />

              {/* Optimized */}
              <div className="flex-1">
                <div className="mb-1 text-xs text-primary">Optimized</div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">
                    {item.optimized.name}
                  </span>
                  <span className="text-lg font-bold text-primary">
                    {item.optimized.price}
                  </span>
                </div>
              </div>
            </div>

            {/* Technique Badge */}
            <div className="mt-3 flex items-center gap-2 border-t border-border/50 pt-3">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs text-muted-foreground">
                Applied: <span className="text-primary">{item.technique}</span>
              </span>
            </div>
          </div>
          )
        })}
      </div>
    </div>
  )
}
