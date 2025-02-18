"use client"

import * as React from "react"
import { BiSearch } from "react-icons/bi"
// import { Search } from "lucide-react"

const countries = [
  "singapore",
  "thailand",
  "malaysia",
  "vietnam",
  "indonesia",
  "philippines",
  // Add more countries as needed
]

export function CountrySearch() {
  const [value, setValue] = React.useState("")
  const [suggestion, setSuggestion] = React.useState("")
  const [isFocused, setIsFocused] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleInputChange = (input: string) => {
    setValue(input)

    if (input.length === 0) {
      setSuggestion("")
      return
    }

    const matchedCountry = countries.find((country) => country.toLowerCase().startsWith(input.toLowerCase()))

    if (matchedCountry) {
      setSuggestion(matchedCountry.slice(input.length))
    } else {
      setSuggestion("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab" && suggestion) {
      e.preventDefault()
      setValue(value + suggestion)
      setSuggestion("")
    }
  }

  return (
    <div className="relative w-[500px]">
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 100)}
          placeholder="Type or Select a Country Here"
          className="w-full px-4 py-3 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 pr-12"
        />
        <button
          className="absolute right-0 h-full px-4 bg-orange-500 text-white rounded-lg w-32 hover:bg-orange-600 transition-colors"
          onClick={() => {
            // Handle search action
            console.log("Searching for:", value)
          }}
        >
          <span className="w-full flex justify-center item-center" ><BiSearch className="w-5 h-5" /></span>
        </button>
        {suggestion && (
          <span
            className="absolute top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            style={{
              left: `calc(${value.length * 0.5}em + 1rem)`,
              paddingLeft: "0.25rem",
            }}
          >
            {suggestion}
          </span>
        )}
      </div>
      {isFocused && (
        <ul className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto z-50">
          {countries
            .filter((country) => country.toLowerCase().includes(value.toLowerCase()))
            .map((country) => (
              <li
                key={country}
                onClick={() => {
                  setValue(country.toLowerCase());
                  setSuggestion("")
                  // inputRef.current?.focus()
                }}
                className="px-4 py-2.5 cursor-pointer hover:bg-gray-50 text-[15px] capitalize"
              >
                {country}
              </li>
            ))}
          {countries.filter((country) => country.toLowerCase().includes(value.toLowerCase())).length === 0 && (
            <li className="px-4 py-2.5 text-gray-500 text-[15px]">No country found.</li>
          )}
        </ul>
      )}
    </div>
  )
}

