"use client"

import { useState } from "react"
import { Plus, Trash2, Zap, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface MenuItem {
  id: string
  name: string
  price: string
}

interface MenuInputProps {
  onAnalyze: (items: MenuItem[]) => void
  isAnalyzing: boolean
}

export function MenuInput({ onAnalyze, isAnalyzing }: MenuInputProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: "1", name: "Classic Burger", price: "12.00" },
    { id: "2", name: "Caesar Salad", price: "9.50" },
    { id: "3", name: "Grilled Salmon", price: "24.00" },
  ])

  const addMenuItem = () => {
    setMenuItems([
      ...menuItems,
      { id: Date.now().toString(), name: "", price: "" },
    ])
  }

  const removeMenuItem = (id: string) => {
    if (menuItems.length > 1) {
      setMenuItems(menuItems.filter((item) => item.id !== id))
    }
  }

  const updateMenuItem = (id: string, field: "name" | "price", value: string) => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    )
  }

  const handleAnalyze = () => {
    // Filter for valid items with both name and price, ensure price is parseable
    const validItems = menuItems.filter((item) => {
      if (!item || !item.name || !item.price) return false
      const trimmedName = item.name.trim()
      const trimmedPrice = item.price.trim()
      if (!trimmedName || !trimmedPrice) return false
      // Ensure price can be parsed as a number
      const priceNum = parseFloat(trimmedPrice.replace(/[$\s]/g, ""))
      return !isNaN(priceNum) && priceNum > 0
    })
    
    if (validItems.length > 0) {
      onAnalyze(validItems)
    }
  }

  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground">Original Menu Input</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter your current menu items and prices
        </p>
      </div>

      <div className="flex-1 space-y-4 overflow-auto">
        {menuItems.map((item, index) => (
          <div
            key={item.id}
            className="group flex items-end gap-3 rounded-lg border border-border/50 bg-secondary/30 p-4 transition-colors hover:border-border"
          >
            <div className="flex-1 space-y-2">
              <Label htmlFor={`name-${item.id}`} className="text-xs text-muted-foreground">
                Dish Name
              </Label>
              <Input
                id={`name-${item.id}`}
                placeholder="e.g., Classic Burger"
                value={item.name}
                onChange={(e) => updateMenuItem(item.id, "name", e.target.value)}
                className="bg-input border-border/50 focus:border-primary"
              />
            </div>
            <div className="w-28 space-y-2">
              <Label htmlFor={`price-${item.id}`} className="text-xs text-muted-foreground">
                Price ($)
              </Label>
              <Input
                id={`price-${item.id}`}
                placeholder="12.00"
                value={item.price}
                onChange={(e) => updateMenuItem(item.id, "price", e.target.value)}
                className="bg-input border-border/50 focus:border-primary"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeMenuItem(item.id)}
              className="h-10 w-10 shrink-0 text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
              disabled={menuItems.length === 1}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-border/50 pt-6">
        <Button
          variant="outline"
          onClick={addMenuItem}
          className="w-full border-dashed border-border hover:border-primary hover:bg-primary/5"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Menu Item
        </Button>
        <Button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-primary"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Applying Behavioral Models...
            </>
          ) : (
            <>
              <Zap className="mr-2 h-4 w-4" />
              Analyze & Optimize
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
