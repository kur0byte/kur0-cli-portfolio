import type { ReactNode } from "react"

export interface CommandResponse {
  command: string
  output: string | ReactNode
  isSystem?: boolean
}

export interface Project {
  name: string
  description: string
  techStack: string[]
  link: string
}

export interface Skill {
  category: string
  items: string[]
}

export interface Contact {
  platform: string
  link: string
  username: string
}

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  content: string[]
}

