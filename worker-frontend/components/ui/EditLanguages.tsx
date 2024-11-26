import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Checkbox } from "./checkbox";
import { FaPen } from "react-icons/fa6";

// Define the available languages and types
const languages: string[] = [
  "CROATIAN",
  "SERBIAN",
  "ENGLISH",
  "GERMAN",
  "SPANISH",
  "ITALIAN",
  "FRENCH",
];

export function EditLanguages() {
  // State to manage selected languages
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  // Function to handle checkbox changes
  const handleCheckboxChange = (language: string) => {
    setSelectedLanguages(
      (prevSelected) =>
        prevSelected.includes(language)
          ? prevSelected.filter((lang) => lang !== language) // Remove if already selected
          : [...prevSelected, language] // Add if not selected
    );
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        console.error("No token found");
        return;
      }

      // Prepare the request body with the selected languages
      const requestBody = {
        languages: selectedLanguages,
      };

      // Send the request to the API
      const response = await fetch(
        "http://localhost:8080/api/user/patchLanguages",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update languages");
      }

      setIsDialogOpen(false);

      // Optionally, handle the success response
      const result = await response.json();
      console.log("Update successful:", result);
    } catch (error) {
      console.error("Error updating languages:", error);
    }
    window.location.reload();
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
          <DialogTitle>Languages</DialogTitle>
          <DialogDescription>Select languages</DialogDescription>
        </DialogHeader>

        {/* Language Checkboxes */}
        {languages.map((language) => (
          <div key={language} className="flex items-center gap-8">
            <Checkbox
              checked={selectedLanguages.includes(language)}
              onCheckedChange={() => handleCheckboxChange(language)}
            />
            <h2>{language}</h2>
          </div>
        ))}

        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
