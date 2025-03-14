"use client"
import { Button } from "@/components/ui/button"
import { Copy, Download, Code } from "lucide-react"
import type { Step } from "@/lib/types"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import { useToast } from "@/hooks/use-toast"

interface CodeDisplayProps {
  steps: Step[]
  url: string
}

export default function CodeDisplay({ steps, url }: CodeDisplayProps) {
  const { toast } = useToast()

  const generateFullCode = (): string => {
    const imports = `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
`

    const setup = `# Setup the WebDriver
driver = webdriver.Chrome()
`

    const stepCode = steps.map((step) => step.code).join("\n\n")

    const cleanup = `
# Cleanup
# driver.quit()  # Uncomment to close the browser after execution
`

    return `${imports}\n${setup}\n${stepCode}\n${cleanup}`
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateFullCode())
    toast({
      title: "Code copied",
      description: "The Python code has been copied to your clipboard",
    })
  }

  const handleDownloadCode = () => {
    const element = document.createElement("a")
    const file = new Blob([generateFullCode()], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "selenium_script.py"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
          <div className="flex items-center">
            <Code className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-sm font-medium text-gray-200">selenium_script.py</span>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" onClick={handleCopyCode} className="text-gray-300 hover:text-white">
              <Copy size={16} className="mr-2" />
              Copy
            </Button>
            <Button variant="ghost" size="sm" onClick={handleDownloadCode} className="text-gray-300 hover:text-white">
              <Download size={16} className="mr-2" />
              Download
            </Button>
          </div>
        </div>
        <div className="p-4 overflow-auto max-h-[500px]">
          <SyntaxHighlighter
            language="python"
            style={vscDarkPlus}
            customStyle={{ margin: 0, background: "transparent" }}
          >
            {generateFullCode()}
          </SyntaxHighlighter>
        </div>
      </div>

      {steps.length === 0 && (
        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
          Add steps to your flow to generate Python code
        </div>
      )}
    </div>
  )
}

