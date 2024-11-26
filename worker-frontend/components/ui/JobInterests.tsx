import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { LuMoreHorizontal } from "react-icons/lu";
import { Checkbox } from "../ui/checkbox";
import { Button } from "@/components/ui/button";

// Define the possible job interests here
const jobInterestOptions: string[] = [
    "TRUCK_C", "TRUCK_C_E", "BUS_D"
];

interface JobInterestProps {
  selectedJobInterests: string[]; // Passed from parent component
  onUpdateJobInterests: (updatedInterests: string[]) => void; // Callback to update the interests in parent component
}

export const JobInterests: React.FC<JobInterestProps> = ({
  selectedJobInterests,
  onUpdateJobInterests,
}) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    selectedJobInterests
  );
  const [displayedInterests, setDisplayedInterests] =
    useState<string[]>(selectedJobInterests); // For showing saved job interests only
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false); // State to manage saving/loading

  useEffect(() => {
    // Initialize the selected job interests with the data passed in from the props
    setSelectedInterests(selectedJobInterests);
    setDisplayedInterests(selectedJobInterests); // Set displayed interests as well
  }, [selectedJobInterests]);

  const handleCheckboxChange = (interest: string) => {
    setSelectedInterests((prevSelected) =>
      prevSelected.includes(interest)
        ? prevSelected.filter((int) => int !== interest) // Remove if already selected
        : [...prevSelected, interest] // Add if not selected
    );
  };

  const handleSave = async () => {
    setIsSaving(true); // Start saving/loading state

    try {
      const token = localStorage.getItem("jwt");

      // Send the selected job interests to the server (adjust the URL based on your API)
      const response = await fetch(
        "http://localhost:8080/api/user/patchDriverJobInterest",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jobInterest: selectedInterests,
          }),
        }
      );

      if (response.ok) {
        // Optimistically update the displayed job interests immediately after saving
        setDisplayedInterests(selectedInterests);
        onUpdateJobInterests(selectedInterests); // Update the state in the parent component

        setIsDialogOpen(false); // Close the dialog
      } else {
        console.error("Failed to save job interests.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSaving(false); // End saving/loading state
    }
  };

  return (
    <div>
      <h1 className="text-2xl">In which category are you interested working in?</h1>
      <Separator className="mt-2" />
      <div className="flex">
        {/* Display the saved job interests */}
        <div>
          {displayedInterests.length > 0 ? (
            <h2>{displayedInterests.join(", ")}</h2>
          ) : (
            <h2>No job interests specified</h2>
          )}
        </div>
        <div className="">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost">
                <LuMoreHorizontal />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Job Interests</DialogTitle>
                <DialogDescription>Select job interests</DialogDescription>
              </DialogHeader>

              {/* Job Interest Checkboxes */}
              {jobInterestOptions.map((interest) => (
                <div key={interest} className="flex items-center gap-8">
                  <Checkbox
                    checked={selectedInterests.includes(interest)}
                    onCheckedChange={() => handleCheckboxChange(interest)}
                  />
                  <h2>{interest}</h2>
                </div>
              ))}

              <DialogFooter>
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
