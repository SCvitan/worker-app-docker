import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { User } from '@/app/types/types'

type UserProfileModalProps = {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export function UserProfileModal({ user, isOpen, onClose }: UserProfileModalProps) {
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{user.firstName} {user.lastName}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <section>
            <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <p><strong>Date of Birth:</strong> {user.dateOfBirth}</p>
            <p><strong>Profession:</strong> {user.profession}</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">Driver Information</h3>
            <p><strong>Licenses:</strong> {user.driverInfo.licenses.join(", ")}</p>
            <p><strong>Countries Interested:</strong> {user.driverInfo.countriesInterested.join(", ")}</p>
            <p><strong>Categories Experienced:</strong> {user.driverInfo.categoriesExperienced.join(", ")}</p>
            <p><strong>Accommodation Cost:</strong> {user.driverInfo.accommodationCost}</p>
            <p><strong>Accommodation:</strong> {user.driverInfo.accommodation}</p>
            <p><strong>Expected Salary:</strong> {user.driverInfo.expectedSalary}</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">Education</h3>
            {user.education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <p><strong>{edu.degree}</strong> - {edu.institution}</p>
                <p>Graduated: {edu.graduationDate}</p>
              </div>
            ))}
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">Languages</h3>
            {user.languages.map((lang) => (
              <p key={lang.id}><strong>{lang.language}:</strong> {lang.proficiency}</p>
            ))}
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">Work Experience</h3>
            {user.workExperiences.map((exp) => (
              <div key={exp.id} className="mb-2">
                <p><strong>{exp.jobTitle}</strong> at {exp.company}</p>
                <p>{exp.startDate} - {exp.endDate}</p>
                <p>{exp.description}</p>
              </div>
            ))}
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}

