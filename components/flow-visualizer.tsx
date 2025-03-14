"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Trash2,
  Edit,
  GripVertical,
  ChevronDown,
  ChevronRight,
  Chrome,
  MousePointer,
  Type,
  KeyRound,
  Check,
  Navigation,
  Camera,
  Clock,
} from "lucide-react"
import type { Step } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface FlowVisualizerProps {
  steps: Step[]
  onUpdateStep: (step: Step) => void
  onDeleteStep: (stepId: string) => void
  onReorderSteps: (steps: Step[]) => void
}

export default function FlowVisualizer({ steps, onUpdateStep, onDeleteStep, onReorderSteps }: FlowVisualizerProps) {
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({})

  const toggleExpand = (stepId: string) => {
    setExpandedSteps({
      ...expandedSteps,
      [stepId]: !expandedSteps[stepId],
    })
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(steps)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    onReorderSteps(items)
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

  if (steps.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No steps added yet. Use the Action Builder to add steps to your flow.
      </div>
    )
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="steps">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-4 max-h-[500px] overflow-y-auto pr-2"
          >
            {steps.map((step, index) => (
              <Draggable key={step.id} draggableId={step.id} index={index}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps} className="relative">
                    <Collapsible
                      open={expandedSteps[step.id]}
                      onOpenChange={() => toggleExpand(step.id)}
                      className="border rounded-lg bg-white dark:bg-gray-800"
                    >
                      <div className="flex items-center p-4">
                        <div
                          {...provided.dragHandleProps}
                          className="mr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          <GripVertical size={20} />
                        </div>

                        <Badge variant="outline" className="mr-3">
                          {index + 1}
                        </Badge>

                        <div className="flex items-center flex-grow">
                          {getActionIcon(step.type)}
                          <div>
                            <h3 className="font-medium">{step.type}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                              {Object.entries(step.params)
                                .map(([key, value]) => `${key}: ${value}`)
                                .join(", ")}
                            </p>
                          </div>
                        </div>

                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm">
                            {expandedSteps[step.id] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                          </Button>
                        </CollapsibleTrigger>
                      </div>

                      <CollapsibleContent>
                        <CardContent className="pt-0 pb-3 border-t">
                          <pre className="text-xs bg-gray-100 dark:bg-gray-900 p-2 rounded overflow-x-auto">
                            {step.code}
                          </pre>
                        </CardContent>

                        <CardFooter className="flex justify-end gap-2 pt-0 pb-4">
                          <Button variant="outline" size="sm" onClick={() => onDeleteStep(step.id)}>
                            <Trash2 size={16} className="mr-1" />
                            Delete
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              /* Edit functionality would go here */
                            }}
                          >
                            <Edit size={16} className="mr-1" />
                            Edit
                          </Button>
                        </CardFooter>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

