"use client"

import type * as React from "react"
import { MinusIcon, PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface NumberFieldProps {
  step?: number
  disabled?: boolean
  className?: string
}

export const NumberField = ({
  step = 1,
  disabled = false,
  className,
  ...props
}: NumberFieldProps) => {
  const [value, setValue] = useState(1)
  const min = 1
  const max = 10

  const handleIncrement = () => {
    const newValue = value + step
    if (newValue <= max) {
      setValue(newValue)
    }
  }

  const handleDecrement = () => {
    const newValue = value - step
    if (newValue >= min) {
      setValue(newValue)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number.parseFloat(e.target.value)
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      setValue(newValue)
    }
  }

  return (
    <div className="">
      <p className="my-4 text-2xl font-semibold">
        Price: {value * 10} for ${value * 10}
      </p>
      <div className={cn("flex w-full max-w-[180px] items-center", className)}>
        <Button
          className="size-9 rounded-r-none"
          disabled={disabled || value <= min}
          size="icon"
          type="button"
          variant="outline"
          onClick={handleDecrement}
        >
          <MinusIcon className="size-4" />
          <span className="sr-only">Decrease</span>
        </Button>
        <input name="quantity" type="hidden" value={value} />
        <Input
          className="h-9 rounded-none border-x-0 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          disabled={disabled}
          max={max}
          min={min}
          step={step}
          type="number"
          value={value}
          onChange={handleChange}
          {...props}
        />
        <Button
          className="size-9 rounded-l-none"
          disabled={disabled || value >= max}
          size="icon"
          type="button"
          variant="outline"
          onClick={handleIncrement}
        >
          <PlusIcon className="size-4" />
          <span className="sr-only">Increase</span>
        </Button>
      </div>
    </div>
  )
}
