export interface Step {
  id: string
  type: string
  params: Record<string, string>
  code: string
}

export interface ActionParam {
  name: string
  label: string
  placeholder: string
  description?: string
}

export interface ActionType {
  type: string
  params: ActionParam[]
}

