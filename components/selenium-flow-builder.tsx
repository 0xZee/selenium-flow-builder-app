"use client"

import { useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import UrlInput from "@/components/url-input"
import ActionBuilder from "@/components/action-builder"
import FlowVisualizer from "@/components/flow-visualizer"
import CodeDisplay from "@/components/code-display"
import TopBar from "@/components/top-bar"
import type { Step } from "@/lib/types"

export default function SeleniumFlowBuilder() {
  const [url, setUrl] = useState<string>("")
  const [flowStarted, setFlowStarted] = useState<boolean>(false)
  const [steps, setSteps] = useState<Step[]>([])
  const [activeTab, setActiveTab] = useState<string>("builder")

  const handleStartFlow = (targetUrl: string) => {
    setUrl(targetUrl)
    setFlowStarted(true)
    // Initialize with a connect step
    setSteps([
      {
        id: "1",
        type: "Connect to Site",
        params: { url: targetUrl },
        code: `driver = webdriver.Chrome()\ndriver.get("${targetUrl}")`,
      },
    ])
  }

  const handleAddStep = (step: Step) => {
    setSteps([...steps, { ...step, id: (steps.length + 1).toString() }])
  }

  const handleUpdateStep = (updatedStep: Step) => {
    setSteps(steps.map((step) => (step.id === updatedStep.id ? updatedStep : step)))
  }

  const handleDeleteStep = (stepId: string) => {
    setSteps(steps.filter((step) => step.id !== stepId))
  }

  const handleReorderSteps = (reorderedSteps: Step[]) => {
    setSteps(reorderedSteps)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <TopBar />

      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 flex-grow">
        {!flowStarted ? (
          <Card>
            <CardHeader>
              <CardTitle>Start a New Automation Flow</CardTitle>
              <CardDescription>Enter the URL of the website you want to automate</CardDescription>
            </CardHeader>
            <CardContent>
              <UrlInput onStartFlow={handleStartFlow} />
            </CardContent>
          </Card>
        ) : (
          <DndProvider backend={HTML5Backend}>
            <Tabs defaultValue="builder" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-4 grid grid-cols-2 w-full max-w-md mx-auto">
                <TabsTrigger value="builder">Flow Builder</TabsTrigger>
                <TabsTrigger value="code">Generated Code</TabsTrigger>
              </TabsList>

              <TabsContent value="builder">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Action Builder */}
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Action Builder</CardTitle>
                      <CardDescription>Configure and add actions to your automation flow</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ActionBuilder onAddStep={handleAddStep} />
                    </CardContent>
                  </Card>

                  {/* Flow Visualizer */}
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Flow Visualizer</CardTitle>
                      <CardDescription>View, edit, and reorder your automation steps</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <FlowVisualizer
                        steps={steps}
                        onUpdateStep={handleUpdateStep}
                        onDeleteStep={handleDeleteStep}
                        onReorderSteps={handleReorderSteps}
                      />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="code">
                <Card>
                  <CardHeader>
                    <CardTitle>Generated Python Code</CardTitle>
                    <CardDescription>Python Selenium code for your automation flow</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeDisplay steps={steps} url={url} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </DndProvider>
        )}
      </div>
    </div>
  )
}

