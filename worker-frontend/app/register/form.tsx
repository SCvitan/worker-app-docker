"use client"

import { useState } from "react"
import { useAuth } from "@/components/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [userType, setUserType] = useState<"employee" | "employer">("employee")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [vinNumber, setVinNumber] = useState("")
  const { register } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    

    try {
      await register(email, password)
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.")
    }
  }

  return (
    <div className="container mx-auto max-w-md p-6">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <RadioGroup
          defaultValue="employee"
          onValueChange={(value) => setUserType(value as "employee" | "employer")}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="employee" id="employee" />
            <Label htmlFor="employee">I'm looking for work</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="employer" id="employer" />
            <Label htmlFor="employer">I'm hiring workers</Label>
          </div>
        </RadioGroup>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {userType === "employer" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vinNumber">VIN Number (Tax Number)</Label>
              <Input
                id="vinNumber"
                type="text"
                required
                value={vinNumber}
                onChange={(e) => setVinNumber(e.target.value)}
              />
            </div>
          </>
        )}

        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={acceptTerms}
            onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
          />
          <Label htmlFor="terms" className="text-sm">
            I have read and accept the{" "}
            <Link href="/privacy-policy" className="text-blue-500 hover:underline">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/terms-of-use" className="text-blue-500 hover:underline">
              Terms of Use
            </Link>
          </Label>
        </div>

        <Button type="submit" className="w-full">
          Register
        </Button>
      </form>

      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-500 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}