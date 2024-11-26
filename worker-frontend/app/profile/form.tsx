'use client'

import { useState, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Loader2, Plus, Trash2, Upload } from 'lucide-react'
import { useDropzone } from 'react-dropzone'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const professions = [
  { value: 'driver', label: 'Driver' },
  { value: 'construction', label: 'Construction work (Coming soon)', disabled: true },
  { value: 'cleaning', label: 'Cleaning (Coming soon)', disabled: true },
]

const driverLicenses = ['B', 'C', 'C+E', 'D', 'D+E', 'Forklift']

const countries = [
  'BOSNIA_AND_HERZEGOVINA', 'SERBIA', 'KOSOVO', 'ALBANIA', 'MACEDONIA', 'CROATIA', 
  'SLOVENIA', 'AUSTRIA', 'ITALY', 'GERMANY', 'BELGIUM', 'NETHERLANDS', 'FRANCE', 'USA'
]

const categories = [
  'C', 'C+E Poluprikolica cerada', 'C+E Poluprikolica hladnjača', 'C+E Poluprikolica ostalo', 
  'C+E Prikolica standard', 'C+E Prikolica tandem', 'Autobus', 'Autobus gradski', 
  'Autobus međugradski', 'Autobus turistički'
]

const experience = [
  '0-1 years', '1-3 years', '3-5 years', '5+ years'
]

const profileSchema = z.object({
  personalInfo: z.object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number is required'),
    address: z.string().min(5, 'Address is required'),
    dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date of birth must be in YYYY-MM-DD format'),
    profession: z.string().min(1, 'Profession is required'),
  }),
  workExperience: z.array(z.object({
    jobTitle: z.string().min(2, 'Job title is required'),
    company: z.string().min(2, 'Company name is required'),
    startDate: z.string().regex(/^\d{4}-\d{2}$/, 'Start date must be in YYYY-MM format'),
    endDate: z.string().regex(/^\d{4}-\d{2}$/, 'End date must be in YYYY-MM format').or(z.literal('present')),
    description: z.string().min(20, 'Job description should be at least 20 characters'),
  })),
  education: z.array(z.object({
    degree: z.string().min(2, 'Degree is required'),
    institution: z.string().min(2, 'Institution name is required'),
    graduationDate: z.string().regex(/^\d{4}-\d{2}$/, 'Graduation date must be in YYYY-MM format'),
  })),
  skills: z.array(z.string()).min(1, 'At least one skill is required'),
  languages: z.array(z.object({
    language: z.string().min(2, 'Language name is required'),
    proficiency: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Native']),
  })),
  driverInfo: z.object({
    licenses: z.array(z.string()).min(1, 'At least one license is required'),
    countriesInterested: z.array(z.string()).min(1, 'At least one country is required'),
    categoriesExperienced: z.array(z.string()).min(1, 'At least one category is required'),
    accommodationCost: z.enum(['Yes', 'No - with higher pay', 'Maybe']),
    accommodation: z.enum(['By employer', 'By employee']),
    expectedSalary: z.number().min(0, 'Salary must be a positive number'),
  }).optional(),
})

type ProfileFormValues = z.infer<typeof profileSchema>

function AvatarUpload({ field, preview, setPreview }: { field: any; preview: string | null; setPreview: (url: string | null) => void }) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    field.onChange(file)
    setPreview(URL.createObjectURL(file))
  }, [field, setPreview])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {'image/*': []},
    multiple: false
  })

  return (
    <div className="flex flex-col items-center space-y-4">
      <div {...getRootProps()} className="cursor-pointer">
        <input {...getInputProps()} />
        <Avatar className="h-32 w-32">
          <AvatarImage src={preview || '/placeholder.svg?height=128&width=128'} alt="Profile picture" />
          <AvatarFallback>
            {isDragActive ? 'Drop here' : <Upload className="h-8 w-4" />}
          </AvatarFallback>
        </Avatar>
      </div>
      <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById('avatar-upload')?.click()}>
        Upload Image
      </Button>
      <input
        id="avatar-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) {
            onDrop([file])
          }
        }}
      />
    </div>
  )
}

// JWT management
const useJWT = () => {
  const [jwt, setJWT] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getJWTFromCookie = () => {
      const cookies = document.cookie.split(';')
      const jwtCookie = cookies.find(cookie => cookie.trim().startsWith('jwt='))
      return jwtCookie ? jwtCookie.split('=')[1] : null
    }

    const token = getJWTFromCookie()
    setJWT(token)
    setIsLoading(false)
  }, [])
  return { jwt, isLoading }
}


export default function Component() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const jwt = useJWT()
  console.log(jwt)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        dateOfBirth: '',
        profession: '',
      },
      workExperience: [{ jobTitle: '', company: '', startDate: '', endDate: '', description: '' }],
      education: [{ degree: '', institution: '', graduationDate: '' }],
      skills: [''],
      languages: [{ language: '', proficiency: 'Beginner' }],
      driverInfo: {
        licenses: [],
        countriesInterested: [],
        categoriesExperienced: [],
        accommodationCost: 'Yes',
        accommodation: 'By employer',
        expectedSalary: 0,
      },
    },
  })

  useEffect(() => {
    // Load saved data from localStorage when component mounts
    const savedData = localStorage.getItem('cvData')
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      form.reset(parsedData)
      if (parsedData.personalInfo.profilePicture) {
        setPreview(parsedData.personalInfo.profilePicture)
      }
    }
  }, [form])

  const postDataToAPI = async (data: ProfileFormValues) => {
    if (!jwt) {
      throw new Error('No JWT found. Please log in again.')
    }

    try {
      const response = await fetch('http://localhost:8080/api/user/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
  
        },
        body: JSON.stringify(data),
        credentials: 'include',
      })

      console.log(jwt);

      if (!response.ok) {
        throw new Error('Failed to update CV')
      }

      return await response.json()
    } catch (error) {
      console.error('Error updating CV:', error)
      throw error
    }
  }

  const onSubmit = async (data: ProfileFormValues) => {
    console.log('Form submitted with data:', data)
    setIsSubmitting(true)
    setSubmitStatus(null)

    if (!jwt) {
      console.error('No JWT found')
      setSubmitStatus({ type: 'error', message: 'Authentication error. Please log in again.' })
      setIsSubmitting(false)
      return
    }

    try {
      console.log('Attempting to post data to API')
      const result = await postDataToAPI(data)
      console.log('API response:', result)
      localStorage.setItem('cvData', JSON.stringify(data))
      setSubmitStatus({ type: 'success', message: 'CV updated successfully!' })
    } catch (error) {
      console.error('Error in onSubmit:', error)
      setSubmitStatus({ type: 'error', message: 'Failed to update CV. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedProfession = form.watch('personalInfo.profession')

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl">Create or Edit Your CV</CardTitle>
          <CardDescription>Fill in or update your professional details</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="skills">Skills & Languages</TabsTrigger>
                </TabsList>
                <TabsContent value="personal">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="personalInfo.profilePicture"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Profile Picture</FormLabel>
                              <FormControl>
                                <AvatarUpload field={field} preview={preview} setPreview={setPreview} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="personalInfo.firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="personalInfo.lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="personalInfo.email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john.doe@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="personalInfo.phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="+1 234 567 8900" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="personalInfo.address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input placeholder="123 Main St, City, Country" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="personalInfo.dateOfBirth"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date of Birth</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="personalInfo.profession"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Profession</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your profession" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {professions.map((profession) => (
                                  <SelectItem 
                                    key={profession.value} 
                                    value={profession.value}
                                    disabled={profession.disabled}
                                  >
                                    {profession.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {selectedProfession === 'driver' && (
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="driverInfo.licenses"
                            render={() => (
                              <FormItem>
                                <FormLabel>Driver's Licenses</FormLabel>
                                <div className="flex flex-wrap gap-2">
                                  {driverLicenses.map((license) => (
                                    <FormField
                                      key={license}
                                      control={form.control}
                                      name="driverInfo.licenses"
                                      render={({ field }) => {
                                        return (
                                          <FormItem key={license}>
                                            <FormControl>
                                              <Button
                                                type="button"
                                                variant={field.value?.includes(license) ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => {
                                                  const updatedValue = field.value?.includes(license)
                                                    ? field.value.filter((val) => val !== license)
                                                    : [...(field.value || []), license];
                                                  field.onChange(updatedValue);
                                                }}
                                              >
                                                {license}
                                              </Button>
                                            </FormControl>
                                          </FormItem>
                                        );
                                      }}
                                    />
                                  ))}
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="driverInfo.countriesInterested"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Countries Interested in Working</FormLabel>
                                <div className="flex flex-wrap gap-2">
                                  {countries.map((country) => (
                                    <Button
                                      key={country}
                                      type="button"
                                      variant={field.value?.includes(country) ? "default" : "outline"}
                                      size="sm"
                                      onClick={() => {
                                        const updatedValue = field.value?.includes(country)
                                          ? field.value.filter((val) => val !== country)
                                          : [...(field.value || []), country];
                                        field.onChange(updatedValue);
                                      }}
                                    >
                                      {country}
                                    </Button>
                                  ))}
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="driverInfo.categoriesExperienced"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Categories Experienced</FormLabel>
                                <div className="flex flex-wrap gap-2">
                                  {categories.map((category) => (
                                    <Button
                                      key={category}
                                      type="button"
                                      variant={field.value?.includes(category) ? "default" : "outline"}
                                      size="sm"
                                      onClick={() => {
                                        const updatedValue = field.value?.includes(category)
                                          ? field.value.filter((val) => val !== category)
                                          : [...(field.value || []), category];
                                        field.onChange(updatedValue);
                                      }}
                                    >
                                      {category}
                                    </Button>
                                  ))}
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="driverInfo.accommodationCost"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>The cost of accommodation by employer</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select option" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Yes">Yes</SelectItem>
                                    <SelectItem value="No - with higher pay">No - with higher pay</SelectItem>
                                    <SelectItem value="Maybe">Maybe</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="driverInfo.accommodation"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Accommodation</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select option" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="By employer">By employer</SelectItem>
                                    <SelectItem value="By employee">By employee</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="driverInfo.expectedSalary"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Expected monthly NET salary</FormLabel>
                                <FormControl>
                                  <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="experience">
                  <Card>
                    <CardHeader>
                      <CardTitle>Work Experience</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {form.watch('workExperience').map((_, index) => (
                        <div key={index} className="mb-6 p-4 border rounded-lg">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <FormField
                              control={form.control}
                              name={`workExperience.${index}.jobTitle`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Job Title</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Software Engineer" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`workExperience.${index}.company`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Company</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Tech Corp" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <FormField
                              control={form.control}
                              name={`workExperience.${index}.startDate`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Start Date</FormLabel>
                                  <FormControl>
                                    <Input type="month" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`workExperience.${index}.endDate`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>End Date</FormLabel>
                                  <FormControl>
                                    <Input type="month" placeholder="YYYY-MM or 'present'" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <FormField
                            control={form.control}
                            name={`workExperience.${index}.description`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Job Description</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Describe your responsibilities and achievements..."
                                    className="min-h-[100px]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          {index > 0 && (
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="mt-2"
                              onClick={() => {
                                const currentExperience = form.getValues('workExperience')
                                form.setValue('workExperience', currentExperience.filter((_, i) => i !== index))
                              }}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remove Experience
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => {
                          const currentExperience = form.getValues('workExperience')
                          form.setValue('workExperience', [
                            ...currentExperience,
                            { jobTitle: '', company: '', startDate: '', endDate: '', description: '' },
                          ])
                        }}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Work Experience
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="education">
                  <Card>
                    <CardHeader>
                      <CardTitle>Education</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {form.watch('education').map((_, index) => (
                        <div key={index} className="mb-6 p-4 border rounded-lg">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <FormField
                              control={form.control}
                              name={`education.${index}.degree`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Degree</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Bachelor of Science in Computer Science" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`education.${index}.institution`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Institution</FormLabel>
                                  <FormControl>
                                    <Input placeholder="University of Technology" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <FormField
                            control={form.control}
                            name={`education.${index}.graduationDate`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Graduation Date</FormLabel>
                                <FormControl>
                                  <Input type="month" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          {index > 0 && (
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="mt-2"
                              onClick={() => {
                                const currentEducation = form.getValues('education')
                                form.setValue('education', currentEducation.filter((_, i) => i !== index))
                              }}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remove Education
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => {
                          const currentEducation = form.getValues('education')
                          form.setValue('education', [
                            ...currentEducation,
                            { degree: '', institution: '', graduationDate: '' },
                          ])
                        }}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Education
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="skills">
                  <Card>
                    <CardHeader>
                      <CardTitle>Skills & Languages</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-6">
                        <FormField
                          control={form.control}
                          name="skills"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Skills</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Enter your skills, separated by commas..."
                                  {...field}
                                  onChange={(e) => field.onChange(e.target.value.split(',').map((skill) => skill.trim()))}
                                  value={field.value.join(', ')}
                                />
                              </FormControl>
                              <FormDescription>
                                List your professional skills, separated by commas.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">Languages</h4>
                        {form.watch('languages').map((_, index) => (
                          <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-2">
                            <FormField
                              control={form.control}
                              name={`languages.${index}.language`}
                              render={({ field }) => (
                                <FormItem className="flex-grow">
                                  <FormControl>
                                    <Input placeholder="Language" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`languages.${index}.proficiency`}
                              render={({ field }) => (
                                <FormItem className="flex-grow">
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select proficiency" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="Beginner">Beginner</SelectItem>
                                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                                      <SelectItem value="Advanced">Advanced</SelectItem>
                                      <SelectItem value="Native">Native</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            {index > 0 && (
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                onClick={() => {
                                  const currentLanguages = form.getValues('languages')
                                  form.setValue('languages', currentLanguages.filter((_, i) => i !== index))
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const currentLanguages = form.getValues('languages')
                            form.setValue('languages', [...currentLanguages, { language: '', proficiency: 'Beginner' }])
                          }}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Language
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
              {submitStatus && (
                <Alert variant={submitStatus.type === 'success' ? 'default' : 'destructive'}>
                  <AlertTitle>{submitStatus.type === 'success' ? 'Success' : 'Error'}</AlertTitle>
                  <AlertDescription>{submitStatus.message}</AlertDescription>
                </Alert>
              )}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting ? 'Saving...' : 'Save CV'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}