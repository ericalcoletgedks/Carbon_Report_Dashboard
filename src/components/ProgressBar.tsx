"use client"

import * as React from "react"
import { Progress } from "./ui/progress"

export function ProgressBar() {
  const [progress, setProgress] = React.useState(60)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 500)
    return () => clearTimeout(timer)
  }, [])

  return <Progress value={progress} className="sm:w-md m-auto mb-6" />
}