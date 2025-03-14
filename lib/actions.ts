import type { ActionType } from "./types"

export const actionTypes: ActionType[] = [
  {
    type: "Connect to Site",
    params: [
      {
        name: "url",
        label: "URL",
        placeholder: "https://example.com",
        description: "The URL of the website to connect to",
      },
    ],
  },
  {
    type: "Click Element",
    params: [
      {
        name: "selector",
        label: "CSS/XPath Selector",
        placeholder: "#submit-button or //button[@id='submit']",
        description: "CSS or XPath selector for the element to click",
      },
      {
        name: "selectorType",
        label: "Selector Type",
        placeholder: "css or xpath",
        description: "Type of selector (css or xpath)",
      },
    ],
  },
  {
    type: "Fill Text Input",
    params: [
      {
        name: "selector",
        label: "CSS/XPath Selector",
        placeholder: "#username or //input[@name='username']",
        description: "CSS or XPath selector for the input field",
      },
      {
        name: "selectorType",
        label: "Selector Type",
        placeholder: "css or xpath",
        description: "Type of selector (css or xpath)",
      },
      {
        name: "text",
        label: "Text to Enter",
        placeholder: "username123",
        description: "Text to enter into the input field",
      },
    ],
  },
  {
    type: "Login with Credentials",
    params: [
      {
        name: "usernameSelector",
        label: "Username Field Selector",
        placeholder: "#username",
        description: "CSS selector for the username field",
      },
      {
        name: "passwordSelector",
        label: "Password Field Selector",
        placeholder: "#password",
        description: "CSS selector for the password field",
      },
      {
        name: "username",
        label: "Username",
        placeholder: "user@example.com",
        description: "Username to enter",
      },
      {
        name: "password",
        label: "Password",
        placeholder: "password123",
        description: "Password to enter",
      },
      {
        name: "submitSelector",
        label: "Submit Button Selector",
        placeholder: "#login-button",
        description: "CSS selector for the login button",
      },
    ],
  },
  {
    type: "Assert Element Presence",
    params: [
      {
        name: "selector",
        label: "CSS/XPath Selector",
        placeholder: ".success-message or //div[@class='success-message']",
        description: "CSS or XPath selector for the element to check",
      },
      {
        name: "selectorType",
        label: "Selector Type",
        placeholder: "css or xpath",
        description: "Type of selector (css or xpath)",
      },
      {
        name: "timeout",
        label: "Timeout (seconds)",
        placeholder: "10",
        description: "Maximum time to wait for the element",
      },
    ],
  },
  {
    type: "Navigate to URL",
    params: [
      {
        name: "url",
        label: "URL",
        placeholder: "https://example.com/dashboard",
        description: "The URL to navigate to",
      },
    ],
  },
  {
    type: "Take Screenshot",
    params: [
      {
        name: "filename",
        label: "Filename",
        placeholder: "screenshot.png",
        description: "Name of the screenshot file",
      },
    ],
  },
  {
    type: "Wait",
    params: [
      {
        name: "seconds",
        label: "Seconds",
        placeholder: "5",
        description: "Number of seconds to wait",
      },
    ],
  },
]

export function generateCodeForAction(actionType: string, params: Record<string, string>): string {
  switch (actionType) {
    case "Connect to Site":
      return `driver.get("${params.url}")`

    case "Click Element":
      if (params.selectorType === "xpath") {
        return `# Click element using XPath
element = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.XPATH, "${params.selector}"))
)
element.click()`
      } else {
        return `# Click element using CSS selector
element = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.CSS_SELECTOR, "${params.selector}"))
)
element.click()`
      }

    case "Fill Text Input":
      if (params.selectorType === "xpath") {
        return `# Fill text input using XPath
element = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.XPATH, "${params.selector}"))
)
element.clear()
element.send_keys("${params.text}")`
      } else {
        return `# Fill text input using CSS selector
element = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.CSS_SELECTOR, "${params.selector}"))
)
element.clear()
element.send_keys("${params.text}")`
      }

    case "Login with Credentials":
      return `# Login with credentials
# Enter username
username_field = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.CSS_SELECTOR, "${params.usernameSelector}"))
)
username_field.clear()
username_field.send_keys("${params.username}")

# Enter password
password_field = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.CSS_SELECTOR, "${params.passwordSelector}"))
)
password_field.clear()
password_field.send_keys("${params.password}")

# Click submit button
submit_button = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.CSS_SELECTOR, "${params.submitSelector}"))
)
submit_button.click()`

    case "Assert Element Presence":
      if (params.selectorType === "xpath") {
        return `# Assert element presence using XPath
try:
    element = WebDriverWait(driver, ${params.timeout || 10}).until(
        EC.presence_of_element_located((By.XPATH, "${params.selector}"))
    )
    print("Element found!")
except:
    print("Element not found within timeout period")
    raise Exception("Element not found: ${params.selector}")`
      } else {
        return `# Assert element presence using CSS selector
try:
    element = WebDriverWait(driver, ${params.timeout || 10}).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "${params.selector}"))
    )
    print("Element found!")
except:
    print("Element not found within timeout period")
    raise Exception("Element not found: ${params.selector}")`
      }

    case "Navigate to URL":
      return `# Navigate to URL
driver.get("${params.url}")`

    case "Take Screenshot":
      return `# Take screenshot
driver.save_screenshot("${params.filename}")
print(f"Screenshot saved as ${params.filename}")`

    case "Wait":
      return `# Wait for ${params.seconds} seconds
time.sleep(${params.seconds})`

    default:
      return `# Unknown action type: ${actionType}`
  }
}

