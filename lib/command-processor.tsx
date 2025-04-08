"use client"

import type { CommandResponse } from "@/lib/types"
import { getProjects } from "@/lib/data/projects"
import { getSkills } from "@/lib/data/skills"
import { getContacts } from "@/lib/data/contacts"
import type { Dispatch, SetStateAction } from "react"

const AVAILABLE_COMMANDS = [
  "help",
  "about",
  "projects",
  "skills",
  "contact",
  "resume",
  "clear",
  "theme",
  "sudo hire_me",
  "whoami",
  "date",
  "echo",
  "blog",
]

export function processCommand(
  command: string,
  theme: "dark" | "light",
  setTheme: Dispatch<SetStateAction<"dark" | "light">>,
): CommandResponse {
  const lowerCommand = command.toLowerCase().trim()

  // Define chip styles based on theme
  const chipBg = theme === "dark" ? "bg-gray-800" : "bg-gray-200"
  const chipText = theme === "dark" ? "text-gray-200" : "text-green-600"

  // Handle commands
  if (lowerCommand === "help") {
    return {
      command,
      output: (
        <div className="space-y-2">
          <p className="font-bold">Available commands:</p>
          <ul className="space-y-1 ml-4">
            <li>
              <span className="text-yellow-400">about</span> - Display information about me
            </li>
            <li>
              <span className="text-yellow-400">projects</span> - View my portfolio projects
            </li>
            <li>
              <span className="text-yellow-400">skills</span> - List my technical skills
            </li>
            <li>
              <span className="text-yellow-400">contact</span> - Show contact information
            </li>
            <li>
              <span className="text-yellow-400">resume</span> - Download my resume
            </li>
            <li>
              <span className="text-yellow-400">theme --dark|--light</span> - Toggle color theme
            </li>
            <li>
              <span className="text-yellow-400">clear</span> - Clear the terminal
            </li>
            <li>
              <span className="text-yellow-400">help</span> - Show this help message
            </li>
            <li>
              <span className="text-yellow-400">blog</span> - Visit my blog
            </li>
          </ul>
          <p className="text-sm text-gray-400 mt-2">Tip: Use Tab for autocomplete and ↑/↓ arrows for command history</p>
        </div>
      ),
    }
  }

  if (lowerCommand === "about") {
    return {
      command,
      output: (
        <div className="space-y-2">
          <p className="font-bold text-cyan-400">Hello, I'm John Doe</p>
          <p>
            I'm a passionate software engineer with expertise in building modern web applications. With 5+ years of
            experience in full-stack development, I specialize in React, Node.js, and cloud architecture.
          </p>
          <p>
            When I'm not coding, you can find me hiking, reading sci-fi novels, or experimenting with new technologies.
            I'm always open to interesting projects and collaborations.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Type <span className="text-yellow-400">contact</span> to get in touch!
          </p>
        </div>
      ),
    }
  }

  if (lowerCommand === "projects") {
    const projects = getProjects()
    return {
      command,
      output: (
        <div className="space-y-4">
          <p className="font-bold text-cyan-400">My Projects</p>
          <div className="grid gap-4">
            {projects.map((project, index) => (
              <div key={index} className="border border-gray-700 rounded-md p-3 hover:bg-gray-900/50 transition-colors">
                <div className="font-bold">{project.name}</div>
                <p className="text-sm text-gray-400">{project.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.techStack.map((tech, i) => (
                    <span key={i} className={`px-2 py-1 ${chipBg} ${chipText} text-xs rounded-full`}>
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 text-sm mt-2 inline-block hover:underline"
                >
                  View Project →
                </a>
              </div>
            ))}
          </div>
        </div>
      ),
    }
  }

  if (lowerCommand === "skills") {
    const skills = getSkills()
    return {
      command,
      output: (
        <div className="space-y-4">
          <p className="font-bold text-cyan-400">Technical Skills</p>
          <div className="grid gap-4 md:grid-cols-2">
            {skills.map((category, index) => (
              <div key={index} className="border border-gray-700 rounded-md p-3">
                <div className="font-bold mb-2">{category.category}</div>
                <div className="flex flex-wrap gap-1">
                  {category.items.map((skill, i) => (
                    <span key={i} className={`px-2 py-1 ${chipBg} ${chipText} text-xs rounded-full`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    }
  }

  if (lowerCommand === "contact") {
    const contacts = getContacts()
    return {
      command,
      output: (
        <div className="space-y-4">
          <p className="font-bold text-cyan-400">Contact Information</p>
          <div className="space-y-2">
            {contacts.map((contact, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="font-bold">{contact.platform}:</span>
                <a
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  {contact.username}
                </a>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-400 mt-2">Feel free to reach out for collaborations or opportunities!</p>
        </div>
      ),
    }
  }

  if (lowerCommand === "resume") {
    return {
      command,
      output: (
        <div className="space-y-2">
          <p>Downloading resume...</p>
          <p>
            <a
              href="#"
              className="text-blue-400 hover:underline"
              onClick={(e) => {
                e.preventDefault()
                alert("This would download the resume in a real implementation")
              }}
            >
              Click here if download doesn't start automatically
            </a>
          </p>
        </div>
      ),
    }
  }

  if (lowerCommand.startsWith("theme")) {
    if (lowerCommand.includes("--dark")) {
      setTheme("dark")
      return {
        command,
        output: "Theme set to dark mode.",
      }
    } else if (lowerCommand.includes("--light")) {
      setTheme("light")
      return {
        command,
        output: "Theme set to light mode.",
      }
    } else {
      return {
        command,
        output: `Current theme: ${theme}. Use 'theme --dark' or 'theme --light' to change.`,
      }
    }
  }

  if (lowerCommand === "sudo hire_me") {
    return {
      command,
      output: (
        <div className="space-y-2">
          <p className="text-yellow-400 font-bold text-xl animate-pulse">🎉 CONGRATULATIONS! 🎉</p>
          <p>You've discovered the secret command!</p>
          <p>
            I'm currently available for new opportunities and would love to discuss how I can contribute to your team.
          </p>
          <p>
            Use the <span className="text-yellow-400">contact</span> command to reach out!
          </p>
        </div>
      ),
    }
  }

  if (lowerCommand === "whoami") {
    return {
      command,
      output: "visitor@portfolio-terminal",
    }
  }

  if (lowerCommand === "date") {
    return {
      command,
      output: new Date().toString(),
    }
  }

  if (lowerCommand.startsWith("echo ")) {
    const message = command.substring(5)
    return {
      command,
      output: message,
    }
  }

  if (lowerCommand === "blog") {
    return {
      command,
      output: (
        <div className="space-y-2">
          <p>Redirecting to blog...</p>
          <p className="text-sm text-gray-400">
            If you're not redirected automatically,
            <a href="/blog" className="text-blue-400 hover:underline ml-1">
              click here
            </a>
          </p>
          {typeof window !== "undefined" &&
            setTimeout(() => {
              window.location.href = "/blog"
            }, 1000)}
        </div>
      ),
    }
  }

  // Command not found
  return {
    command,
    output: (
      <div className="text-red-400">
        404: Command not found. Type <span className="text-yellow-400">help</span> to see available commands.
      </div>
    ),
  }
}

export function getCommandSuggestions(input: string): string[] {
  const lowerInput = input.toLowerCase()
  return AVAILABLE_COMMANDS.filter((cmd) => cmd.startsWith(lowerInput))
}

