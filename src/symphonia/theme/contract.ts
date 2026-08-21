export interface SymphoniaTheme {
  colour: {
    background: string
    surface: string
    text: string
    muted: string
    primary: string
    accent?: string
  }
  type: {
    display: string
    body: string
    mono?: string
  }
  radius: {
    small: number
    medium: number
    large: number
  }
  spacing: {
    page: string
    section: string
  }
}
