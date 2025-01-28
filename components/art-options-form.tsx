import React, { FC } from "react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog"

interface ArtOptionsFormProps {
  options: ArtOptions
  setOptions: (options: ArtOptions) => void
  onGenerate: () => void
}

export interface ArtOptions {
  style: string
  colorScheme: string
  complexity: number
  theme: string
  mood: string
  timeRepresentation: string
  textureStyle: string
  animationStyle: string
  backgroundType: string
  perspective: string
}

const ArtOptionsForm: FC<ArtOptionsFormProps> = ({ options, setOptions, onGenerate }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOptionChange = (key: keyof ArtOptions, value: any): void => {
    const newOptions = { ...options, [key]: value }
    setOptions(newOptions)
  }

  return (
    <div className="space-y-6 rounded-lg bg-background p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Customize Your Art</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <Label htmlFor="style">Art Style</Label>
          <Select
            value={options.style}
            onValueChange={(value) => handleOptionChange("style", value)}
          >
            <SelectTrigger id="style">
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="abstract">Abstract</SelectItem>
              <SelectItem value="futuristic">Futuristic</SelectItem>
              <SelectItem value="minimalist">Minimalist</SelectItem>
              <SelectItem value="cyberpunk">Cyberpunk</SelectItem>
              <SelectItem value="retro">Retro</SelectItem>
              <SelectItem value="organic">Organic</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="colorScheme">Color Scheme</Label>
          <Select
            value={options.colorScheme}
            onValueChange={(value) => handleOptionChange("colorScheme", value)}
          >
            <SelectTrigger id="colorScheme">
              <SelectValue placeholder="Select color scheme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vibrant">Vibrant</SelectItem>
              <SelectItem value="pastel">Pastel</SelectItem>
              <SelectItem value="monochrome">Monochrome</SelectItem>
              <SelectItem value="neon">Neon</SelectItem>
              <SelectItem value="earthy">Earthy</SelectItem>
              <SelectItem value="cool">Cool Tones</SelectItem>
              <SelectItem value="warm">Warm Tones</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="complexity">Complexity</Label>
          <Slider
            id="complexity"
            max={100}
            min={0}
            step={1}
            value={[options.complexity]}
            onValueChange={(value) => handleOptionChange("complexity", value[0])}
          />
        </div>

        <div>
          <Label htmlFor="theme">Theme</Label>
          <Select
            value={options.theme}
            onValueChange={(value) => handleOptionChange("theme", value)}
          >
            <SelectTrigger id="theme">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="nature">Nature</SelectItem>
              <SelectItem value="space">Space</SelectItem>
              <SelectItem value="urban">Urban</SelectItem>
              <SelectItem value="fantasy">Fantasy</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="mood">Mood</Label>
          <Select value={options.mood} onValueChange={(value) => handleOptionChange("mood", value)}>
            <SelectTrigger id="mood">
              <SelectValue placeholder="Select mood" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="energetic">Energetic</SelectItem>
              <SelectItem value="calm">Calm</SelectItem>
              <SelectItem value="mysterious">Mysterious</SelectItem>
              <SelectItem value="playful">Playful</SelectItem>
              <SelectItem value="serious">Serious</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="timeRepresentation">Time Representation</Label>
          <Select
            value={options.timeRepresentation}
            onValueChange={(value) => handleOptionChange("timeRepresentation", value)}
          >
            <SelectTrigger id="timeRepresentation">
              <SelectValue placeholder="Select time representation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="linear">Linear Timeline</SelectItem>
              <SelectItem value="circular">Circular Clock</SelectItem>
              <SelectItem value="spiral">Spiral</SelectItem>
              <SelectItem value="abstract">Abstract Time Flow</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="textureStyle">Texture Style</Label>
          <RadioGroup
            value={options.textureStyle}
            onValueChange={(value) => handleOptionChange("textureStyle", value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="smooth" value="smooth" />
              <Label htmlFor="smooth">Smooth</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="rough" value="rough" />
              <Label htmlFor="rough">Rough</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="pixelated" value="pixelated" />
              <Label htmlFor="pixelated">Pixelated</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="animationStyle">Animation Style</Label>
          <RadioGroup
            value={options.animationStyle}
            onValueChange={(value) => handleOptionChange("animationStyle", value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="static" value="static" />
              <Label htmlFor="static">Static</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="flowing" value="flowing" />
              <Label htmlFor="flowing">Flowing</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="pulsating" value="pulsating" />
              <Label htmlFor="pulsating">Pulsating</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="backgroundType">Background Type</Label>
          <Select
            value={options.backgroundType}
            onValueChange={(value) => handleOptionChange("backgroundType", value)}
          >
            <SelectTrigger id="backgroundType">
              <SelectValue placeholder="Select background type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="solid">Solid Color</SelectItem>
              <SelectItem value="gradient">Gradient</SelectItem>
              <SelectItem value="pattern">Pattern</SelectItem>
              <SelectItem value="textured">Textured</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="perspective">Perspective</Label>
          <Select
            value={options.perspective}
            onValueChange={(value) => handleOptionChange("perspective", value)}
          >
            <SelectTrigger id="perspective">
              <SelectValue placeholder="Select perspective" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2D">2D</SelectItem>
              <SelectItem value="isometric">Isometric</SelectItem>
              <SelectItem value="3D">3D</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="w-full">Generate Art</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Art Generation</AlertDialogTitle>
            <AlertDialogDescription>
              {
                "You're about to generate an art piece using your selected options. This will use 1 token. Do you wish to continue?"
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onGenerate}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default ArtOptionsForm
