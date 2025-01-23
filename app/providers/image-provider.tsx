// context/ImageContext.tsx
"use client"
import React, { createContext, useState, useContext, ReactNode, FC, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import useLocalStorage from "use-local-storage"
import { useTheme } from "next-themes"

// Define types for context values
interface ImageContextType {
  loading: boolean
  setLoading: (value: boolean) => void
  imageData: ImageDataProps
  setImageData: (value: ImageDataProps) => void
  generateNewImage: () => Promise<void>
}

const ImageContext = createContext<ImageContextType | undefined>(undefined)

interface ImageProviderProps {
  children: ReactNode
}

type ImageDataProps = {
  url?: string
  outOfCredits?: boolean
  requestAlreadyInProgress?: boolean
  error?: boolean
}

export const ImageProvider: FC<ImageProviderProps> = ({ children }) => {
  const { resolvedTheme } = useTheme()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(true) // For loading state

  const { data: session } = useSession()
  const [imageData, setImageData] = useState<ImageDataProps>({ error: false })

  const [status, setStatus] = useLocalStorage("image-generation-status", "")
  const [isReloaded, setIsReloaded] = useLocalStorage("reloaded", "")

  const setReloaded = (): void => {
    setIsReloaded("true")
  }

  useEffect(() => {
    window.addEventListener("beforeunload", setReloaded)
    return () => {
      window.removeEventListener("beforeunload", setReloaded)
    }
  }, [])

  const triggerLoadingToast = (): void => {
    toast(
      () => (
        <div className="flex w-full flex-row items-center gap-4 p-4">
          <Loader2 className="animate-spin" />
          <div className="flex w-full flex-row gap-4">
            <div className="w-full">
              <div className="mb-2 flex items-center space-x-2">
                <span className="text-sm font-medium">
                  Image generation is currently in progress
                </span>
              </div>
              <p className="text-sm">Please wait.</p>
            </div>
          </div>
        </div>
      ),
      {
        toastId: "toast",
        autoClose: false,
        closeButton: false,
        draggable: false,
        theme: resolvedTheme,
      },
    )
  }

  const triggerDoneToast = (): void => {
    toast.update("toast", {
      render: () => (
        <div className="flex w-full flex-row items-center gap-4 p-4">
          <CheckCircle className="text-green-500" />
          <div className="flex w-full flex-row gap-4">
            <div className="w-full">
              <div className="mb-2 flex items-center space-x-2">
                <span className="text-sm font-medium">Image generation has completed</span>
              </div>
              <p className="text-sm">View your git commit art!</p>
            </div>
            <Button className="self-center" asChild>
              <Link
                className="min-w-fit"
                href="/images?new-image=true"
                onClick={() => toast.dismiss("toast")}
              >
                View
              </Link>
            </Button>
          </div>
        </div>
      ),
      hideProgressBar: true,
      autoClose: false,
      closeButton: true,
      className: "w-[400px]",
      theme: resolvedTheme,
    })
  }

  const generateNewImage = async (): Promise<void> => {
    try {
      setIsReloaded("")
      triggerLoadingToast()
      setImageData({ error: false })
      const response = await fetch("/api/image/generate", {
        method: "POST",
        body: JSON.stringify({ ...session?.user }),
      })
      const result = await response.json()
      if (result?.requestAlreadyInProgress) {
        setImageData({ requestAlreadyInProgress: true })
        setLoading(false)
        setStatus("")
        setIsReloaded("")
      }
      if (result?.outOfCredits) {
        setImageData({ outOfCredits: true })
        setLoading(false)
        setStatus("")
        setIsReloaded("")
      }
      if (result?.image?.data[0].url) {
        setImageData({ url: result.image.data[0].url })
        triggerDoneToast()
        router.refresh()
        setStatus("")
        setIsReloaded("")
      }
    } catch (error) {
      console.error("Failed to generate image:", error)
      setImageData({ error: true })
      setLoading(false)
    }
  }

  const getStatus = async (): Promise<void> => {
    try {
      const response = await fetch("/api/image/status", {
        method: "POST",
        body: JSON.stringify({ ...session?.user }),
      })
      const { status: resp } = await response.json()
      if (resp === "in progress") {
        triggerLoadingToast()
      }
      if (resp === "done") {
        triggerDoneToast()
        router.refresh()
        setStatus("")
        setIsReloaded("")
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined
    if (status === "generating" && isReloaded) {
      interval = setInterval(async () => {
        await getStatus()
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [status, isReloaded])

  return (
    <ImageContext.Provider
      value={{
        loading,
        setLoading,
        imageData,
        setImageData,
        generateNewImage,
      }}
    >
      {children}
    </ImageContext.Provider>
  )
}

// Custom hook to access image status context
export const useImage = (): ImageContextType => {
  const context = useContext(ImageContext)
  if (!context) {
    throw new Error("useImage must be used within an ImageProvider")
  }
  return context
}
