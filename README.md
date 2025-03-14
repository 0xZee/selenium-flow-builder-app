# </> selenium flow builder app 👾
Web app for building Selenium automation flows using React and Tailwind CSS. Allows users to visually construct Selenium test scripts and generate executable Python code.

![app01](sc.sel01)
![app02](sc.sel02)


## Key Features 🌐

1. **URL Input & Initialization** 

Clean form for entering the target website URL, Validation to ensure a proper URL is entered, Automatic initialization of the flow with a "Connect to Site" step


2. **Action Builder Panel** 

Dropdown menu with predefined Selenium actions, Dynamic form fields that change based on the selected action, Clear UI for configuring each action's parameters


3. **Flow Visualizer** 

Drag-and-drop reordering of steps, Collapsible step cards showing action details, Edit and delete functionality for each step


4. **Code Display Section** 

Real-time Python code generation, Syntax highlighting for better readability, Options to copy code or download as a .py file



## Technical Implementation 📶

The application is built using:

- **Next.js App Router** for the application structure
- **React** for the UI components and state management
- **Tailwind CSS** for responsive styling
- **react-dnd** for drag-and-drop functionality
- **react-syntax-highlighter** for code display with syntax highlighting
- **shadcn/ui** components for a consistent, modern UI


## Architecture Overview 💾

The application follows a component-based architecture:

1. **Main Container (`selenium-flow-builder.tsx`)**

Manages the overall state of the application
Coordinates between different sections
Handles the flow of data between components

2. **URL Input (`url-input.tsx`)**

Validates and processes the initial URL
Triggers the flow initialization

3. **Action Builder (`action-builder.tsx`)**

Provides a UI for selecting and configuring actions
Dynamically renders form fields based on the selected action
Generates code snippets for each action


4. **Flow Visualizer (`flow-visualizer.tsx`)**

Displays the sequence of steps in the automation flow
Enables reordering through drag-and-drop
Provides controls for editing and deleting steps



5. **Code Display (`code-display.tsx`)**

Combines individual step code into a complete Python script
Provides copy and download functionality
Displays the code with proper syntax highlighting
