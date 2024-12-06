import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const jobOffers = [
  { title: "Senior Truck Driver", company: "LogiTrans Inc.", location: "Berlin, Germany" },
  { title: "Construction Site Manager", company: "BuildWell Co.", location: "Vienna, Austria" },
  { title: "Professional Cleaner", company: "SparkleClean Ltd.", location: "Paris, France" },
  { title: "Experienced Bus Driver", company: "CityRide Services", location: "Amsterdam, Netherlands" },
]

export default function JobOffers() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Featured Job Offers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {jobOffers.map((job, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{job.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold">{job.company}</p>
              <p className="text-sm text-gray-600">{job.location}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

