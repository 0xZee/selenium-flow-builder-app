import type { Metadata } from "next"
import SeleniumFlowBuilder from "@/components/selenium-flow-builder"

export const metadata: Metadata = {
  title: "Selenium Flow Builder",
  description: "Build Selenium automation flows visually and generate Python code",
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SeleniumFlowBuilder />
    </div>
  )
}

