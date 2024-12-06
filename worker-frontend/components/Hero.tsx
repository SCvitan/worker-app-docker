import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Find Your Dream Job</h1>
      <p className="text-xl mb-8">Create your profile, get discovered by employers, and land your next opportunity.</p>
      <div className="space-x-4">
        <Button>Create Profile</Button>
        <Button variant="outline">For Employers</Button>
      </div>
    </div>
  )
}

