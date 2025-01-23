// context/ImageContext.tsx
"use client"
import React, { createContext, useState, useContext, ReactNode, FC } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

// Define types for context values
interface ImageContextType {
  loading: boolean
  setLoading: (value: boolean) => void
  imageData: ImageDataProps
  setImageData: (value: ImageDataProps) => void
  generateNewImage: () => Promise<void>
  setIsRequestGenerate: (value: boolean) => void
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
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(true) // For loading state

  const { data: session } = useSession()
  const [imageData, setImageData] = useState<ImageDataProps>({ error: false })

  const [_isRequestGenerate, setIsRequestGenerate] = useState(false)

  const triggerLoadingToast = (): void => {
    toast(
      () => (
        <div className="flex w-full flex-row items-center gap-4 p-4">
          <Loader2 className="animate-spin" />
          <div className="flex w-full flex-row gap-4">
            <div className="w-full">
              <div className="mb-2 flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-900">
                  Image generation is currently in progress
                </span>
              </div>
              <p className="text-sm text-gray-500">Please wait.</p>
            </div>
          </div>
        </div>
      ),
      { toastId: "toast", autoClose: false, closeButton: false },
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
                <span className="text-sm font-medium text-gray-900">
                  Image generation has completed
                </span>
              </div>
              <p className="text-sm text-gray-500">View your git commit art!</p>
            </div>
            <Button className="self-center" asChild>
              <Link className="min-w-fit" href="/images" onClick={() => toast.dismiss("toast")}>
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
    })
  }

  const generateNewImage = async (): Promise<void> => {
    try {
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
      }
      if (result?.outOfCredits) {
        setImageData({ outOfCredits: true })
        setLoading(false)
      }
      if (result?.image?.data[0].url) {
        setImageData({ url: result.image.data[0].url })
        triggerDoneToast()
        router.refresh()
      }
    } catch (error) {
      console.error("Failed to generate image:", error)
      setImageData({ error: true })
      setLoading(false)
    }
  }

  // const getStatus = async (): Promise<void> => {
  //   try {
  //     const response = await fetch("/api/image/status", {
  //       method: "POST",
  //       body: JSON.stringify({ ...session?.user }),
  //     })
  //     const { status } = await response.json()
  //     if (status === "in progress"){
  //       triggerLoadingToast()
  //     }
  //     if (status === "done"){
  //       triggerLoadingToast()
  //       triggerDoneToast()
  //       router.refresh()
  //     }
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  return (
    <ImageContext.Provider
      value={{
        loading,
        setLoading,
        imageData,
        setImageData,
        generateNewImage,
        setIsRequestGenerate,
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
