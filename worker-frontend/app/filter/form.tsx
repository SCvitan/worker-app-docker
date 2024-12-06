"use client"

import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RefreshCw } from 'lucide-react'
import { UserProfileModal } from '@/components/UserProfileModal'
import { User, Filters } from '@/app/types/types'

// Filter options
const roleOptions = ['driver', 'Cleaning', 'Construction']
const experienceOptions = ['0-1 years', '1-3 years', '3-5 years', '5+ years']
const categoriesOwned = ['B', 'C', 'C+E', 'D', 'D+E', 'Forklift']
const categoriesInterestedIn = ['TRUCK_C', 'C+E', 'D']
const countriesInterestedWorkingIn = ['BOSNIA AND HERZEGOVINA', 'SERBIA', 'KOSOVO', 'ALBANIA', 'MACEDONIA', 'CROATIA', 'SLOVENIA', 'AUSTRIA', 'ITALY', 'GERMANY', 'BELGIUM', 'NETHERLANDS', 'FRANCE', 'USA']
const categoriesExperiencedWith = ['C', 'C+E Poluprikolica cerada', 'C+E Poluprikolica hladnjača', 'C+E Poluprikolica ostalo', 'C+E Prikolica standard', 'C+E Prikolica tandem', 'Autobus', 'Autobus gradski', 'Autobus međugradski', 'Autobus turistički']

export default function FilterTest() {
  const [filters, setFilters] = useState<Filters>({
    profession: '',
    experience: '',
    driversLicences: [],
    jobInterest: [],
    countriesInterestedWorkingIn: [],
    categoriesExperiencedWith: [],
  })
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleFilterChange = (filterType: keyof Filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: Array.isArray(prev[filterType])
        ? (prev[filterType] as string[]).includes(value)
          ? (prev[filterType] as string[]).filter(item => item !== value)
          : [...prev[filterType] as string[], value]
        : value
    }))
  }

  const applyFilters = async () => {
    try {
      const response = await fetch('http://localhost:8080/filter/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filters),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch filtered users')
      }

      const data: User[] = await response.json()
      setFilteredUsers(data)
    } catch (error) {
      console.error('Error applying filters:', error)
      // Handle error (e.g., show error message to user)
    }
  }

  const refreshFilters = () => {
    setFilters({
      profession: '',
      experience: '',
      driversLicences: [],
      jobInterest: [],
      countriesInterestedWorkingIn: [],
      categoriesExperiencedWith: [],
    })
    setFilteredUsers([])
  }

  const handleUserClick = async (userId: number) => {
    try {
      const response = await fetch(`http://localhost:8080/filter/user/${userId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch user details')
      }
      const userDetails: User = await response.json()
      setSelectedUser(userDetails)
      setIsModalOpen(true)
    } catch (error) {
      console.error('Error fetching user details:', error)
      // Handle error (e.g., show error message to user)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CV Search</h1>
      <div className="grid gap-4 md:grid-cols-[300px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Filters
              <Button variant="outline" size="icon" onClick={refreshFilters}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select onValueChange={(value) => handleFilterChange('profession', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                {roleOptions.map((role) => (
                  <SelectItem key={role} value={role}>{role}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => handleFilterChange('experience', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Experience" />
              </SelectTrigger>
              <SelectContent>
                {experienceOptions.map((exp) => (
                  <SelectItem key={exp} value={exp}>{exp}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div>
              <h3 className="mb-2 font-semibold">Categories owned</h3>
              <div className="flex flex-wrap gap-2">
                {categoriesOwned.map((category) => (
                  <Button
                    key={category}
                    variant={filters.driversLicences.includes(category) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange('driversLicences', category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Categories interested in</h3>
              <div className="flex flex-wrap gap-2">
                {categoriesInterestedIn.map((category) => (
                  <Button
                    key={category}
                    variant={filters.jobInterest.includes(category) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange('jobInterest', category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Countries interested working in</h3>
              <div className="flex flex-wrap gap-2">
                {countriesInterestedWorkingIn.map((country) => (
                  <Button
                    key={country}
                    variant={filters.countriesInterestedWorkingIn.includes(country) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange('countriesInterestedWorkingIn', country)}
                  >
                    {country}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Categories experienced with</h3>
              <div className="flex flex-wrap gap-2">
                {categoriesExperiencedWith.map((category) => (
                  <Button
                    key={category}
                    variant={filters.categoriesExperiencedWith.includes(category) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange('categoriesExperiencedWith', category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            <Button onClick={applyFilters} className="w-full">Apply Filters</Button>
          </CardContent>
        </Card>
        <div>
          <h2 className="text-xl font-semibold mb-4">Filtered Users</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredUsers.map((user) => (
              <Card key={user.userId} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleUserClick(user.userId)}>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.firstName} ${user.lastName}`} />
                      <AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{user.firstName} {user.lastName}</CardTitle>
                      <p className="text-sm text-muted-foreground">{user.profession}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Phone:</strong> {user.phone}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <UserProfileModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}

