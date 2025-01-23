// context/ImageStatusContext.tsx
"use client"
import React, { createContext, useState, useEffect, useContext, ReactNode, FC } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { toast } from "react-toastify"

// Define types for context values
interface ImageStatusContextType {
  status: string | null
  loading: boolean
  error: string | null
  shouldFetchStatus: boolean
  setShouldFetchStatus: (value: boolean) => void
}

const ImageStatusContext = createContext<ImageStatusContextType | undefined>(undefined)

interface ImageStatusProviderProps {
  children: ReactNode
}

export const ImageStatusProvider: FC<ImageStatusProviderProps> = ({ children }) => {
  const [status, setStatus] = useState<string | null>(null) // The status to track
  const [loading, setLoading] = useState<boolean>(true) // For loading state
  const [error, setError] = useState<string | null>(null) // For error state
  const [shouldFetchStatus, setShouldFetchStatus] = useState<boolean>(false) // Whether to fetch the status
  const { data: session } = useSession()

  // Function to fetch the image status (replace this with your actual API call)
  const fetchImageStatus = async (): Promise<void> => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("/api/image/status", {
        method: "POST",
        body: JSON.stringify({ ...session?.user }),
      })
      if (!response.ok) {
        throw new Error("Failed to fetch image status")
      }
      const data = await response.json()
      console.log(data)
      setStatus(data.status)
      if (data.status === "done") {
        console.log("Done")
        toast.dismiss("in-progress-toast")
        toast(
          () => (
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
                  <Link
                    className="min-w-fit"
                    href="/images"
                    onClick={() => toast.dismiss("done-toast")}
                  >
                    View
                  </Link>
                </Button>
              </div>
            </div>
          ),
          {
            toastId: "done-toast",
            hideProgressBar: true,
            autoClose: false,
            closeButton: true,
            className: "w-[400px]",
          },
        )
        setShouldFetchStatus(false)
        setStatus(null)
      }
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  // Start fetching image status only when shouldFetchStatus is true
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let interval: any

    if (shouldFetchStatus) {
      interval = setInterval(async () => {
        await fetchImageStatus()
      }, 1000)
    }

    // Clean up the interval on component unmount or when shouldFetchStatus changes
    return () => clearInterval(interval)
  }, [shouldFetchStatus])

  return (
    <ImageStatusContext.Provider
      value={{ status, loading, error, shouldFetchStatus, setShouldFetchStatus }}
    >
      {children}
    </ImageStatusContext.Provider>
  )
}

// Custom hook to access image status context
export const useImageStatus = (): ImageStatusContextType => {
  const context = useContext(ImageStatusContext)
  if (!context) {
    throw new Error("useImageStatus must be used within an ImageStatusProvider")
  }
  return context
}
