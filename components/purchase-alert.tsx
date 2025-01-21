"use client"
import React, { FC, useEffect, useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog"
import { useRouter, useSearchParams } from "next/navigation"
import { Sparkles } from "lucide-react"

const PurchaseAlert: FC = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const successfulPurchase = searchParams.has("success")
  const canceledPurchase = searchParams.has("canceled")

  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    if (successfulPurchase) {
      router.replace(window.location.pathname)
      setShowAlert(true)
    }
    if (canceledPurchase) {
      router.replace(window.location.pathname)
    }
  }, [successfulPurchase, canceledPurchase])

  return (
    <AlertDialog open={showAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex flex-row items-center gap-2">
            <Sparkles size={16} />
            Purchase Successful!
          </AlertDialogTitle>
          <AlertDialogDescription>
            You have successfully purchsed 10 credits. Each credit allows you to create one unique
            AI-generated artwork. Unleash your creativity and start generating amazing pieces!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => setShowAlert(!showAlert)}>Close</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default PurchaseAlert
