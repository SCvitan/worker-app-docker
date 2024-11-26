import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LuMoreHorizontal } from "react-icons/lu";
import { Textarea } from "@/components/ui/textarea";
import { FaPen } from "react-icons/fa6";

// Define interfaces for types
interface PreviousEmployment {
  id: number;
  companyName: string;
  jobTitle: string;
  yearsWorked: number;
  location: string;
  shortDescription: string;
}

interface AddJobExperienceProps {
  experienceIndex: number; // Define the type for experienceIndex
  onAddJobExperience: (newJob: PreviousEmployment) => void; // Add this new prop
}

export function AddJobExperience({
  experienceIndex,
  onAddJobExperience,
}: AddJobExperienceProps) {
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [yearsWorked, setYearsWorked] = useState("");
  const [location, setLocation] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        console.error("No token found");
        return;
      }

      const requestBody = {
        
            companyName,
            jobTitle,
            yearsWorked: parseInt(yearsWorked),
            location,
            shortDescription,
          
      };

      const response = await fetch(
        "http://localhost:8080/api/user/updateJobExp",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update job experience");
      }

      const result = await response.json();
      const addedJob = result

      // Notify the parent component with the new job experience
      onAddJobExperience(addedJob);

      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error updating job experience:", error);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
        <FaPen />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Job Experience</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="companyName" className="text-right">
              Company Name
            </Label>
            <Input
              id="companyName"
              className="col-span-3"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="jobTitle" className="text-right">
              Job Title
            </Label>
            <Input
              id="jobTitle"
              className="col-span-3"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="yearsWorked" className="text-right">
              Years Worked
            </Label>
            <Input
              id="yearsWorked"
              className="col-span-3"
              value={yearsWorked}
              onChange={(e) => setYearsWorked(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">
              Location
            </Label>
            <Input
              id="location"
              className="col-span-3"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="items-center gap-4">
            <Label htmlFor="shortDescription" className="text-right">
              Short Description
            </Label>
            <Textarea
              placeholder="Type your job description here."
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Save Job
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
