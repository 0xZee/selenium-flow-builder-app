"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import type { Step } from "@/lib/types"
import { actionTypes, generateCodeForAction } from "@/lib/actions"
import { PlusCircle, MousePointer, Type, KeyRound, Check, Navigation, Camera, Clock, Chrome } from "lucide-react"

interface ActionBuilderProps {
  onAddStep: (step: Step) => void
}

export default function ActionBuilder({ onAddStep }: ActionBuilderProps) {
  const [selectedAction, setSelectedAction] = useState("")
  const [params, setParams] = useState<Record<string, string>>({})

  const handleActionChange = (value: string) => {
    setSelectedAction(value)
    // Reset params when action changes
    setParams({})
  }

  const handleParamChange = (key: string, value: string) => {
    setParams({ ...params, [key]: value })
  }

  const handleAddStep = () => {
    if (!selectedAction) return

    const code = generateCodeForAction(selectedAction, params)

    onAddStep({
      id: Date.now().toString(),
      type: selectedAction,
      params,
      code,
    })

    // Reset form
    setSelectedAction("")
    setParams({})
  }

  // Get icon for action type
  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case "Connect to Site":
        return <Chrome className="h-4 w-4 mr-2" />
      case "Click Element":
        return <MousePointer className="h-4 w-4 mr-2" />
      case "Fill Text Input":
        return <Type className="h-4 w-4 mr-2" />
      case "Login with Credentials":
        return <KeyRound className="h-4 w-4 mr-2" />
      case "Assert Element Presence":
        return <Check className="h-4 w-4 mr-2" />
      case "Navigate to URL":
        return <Navigation className="h-4 w-4 mr-2" />
      case "Take Screenshot":
        return <Camera className="h-4 w-4 mr-2" />
      case "Wait":
        return <Clock className="h-4 w-4 mr-2" />
      default:
        return null
    }
  }

  // Get required parameters for the selected action
  const getParamFields = () => {
    const action = actionTypes.find((a) => a.type === selectedAction)
    if (!action) return null

    return (
      <div className="space-y-4 mt-4">
        {action.params.map((param) => (
          <div key={param.name} className="space-y-2">
            <Label htmlFor={param.name}>{param.label}</Label>
            <Input
              id={param.name}
              placeholder={param.placeholder}
              value={params[param.name] || ""}
              onChange={(e) => handleParamChange(param.name, e.target.value)}
            />
            {param.description && <p className="text-sm text-gray-500 dark:text-gray-400">{param.description}</p>}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
      <div className="space-y-2">
        <Label htmlFor="action-type">Select Action</Label>
        <Select value={selectedAction} onValueChange={handleActionChange}>
          <SelectTrigger id="action-type">
            <SelectValue placeholder="Choose an action" />
          </SelectTrigger>
          <SelectContent>
            {actionTypes.map((action) => (
              <SelectItem key={action.type} value={action.type}>
                <div className="flex items-center">
                  {getActionIcon(action.type)}
                  {action.type}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedAction && (
        <Card>
          <CardContent className="pt-6">
            {getParamFields()}

            <div className="mt-6">
              <Button onClick={handleAddStep} className="w-full">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Step
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

