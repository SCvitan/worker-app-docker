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

const licenseTypes: string[] = ["B", "C", "C_E", "D", "D_E", "FORKLIFT"];

interface LicenseTypeProps {
  selectedLicenses: string[]; // Passed from DriverForm
  onUpdateLicenses: (updatedLicenses: string[]) => void; // A callback to update the licenses in DriverForm
}

export const LicenseType: React.FC<LicenseTypeProps> = ({
  selectedLicenses,
  onUpdateLicenses,
}) => {
  const [selectedLicenseType, setSelectedLicenseType] =
    useState<string[]>(selectedLicenses);
  const [displayedLicenses, setDisplayedLicenses] =
    useState<string[]>(selectedLicenses); // For showing saved licenses only
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false); // State to manage saving/loading

  useEffect(() => {
    // Initialize the selected licenses with the data passed in from the props
    setSelectedLicenseType(selectedLicenses);
    setDisplayedLicenses(selectedLicenses); // Set displayed licenses as well
  }, [selectedLicenses]);

  const handleCheckboxChange = (license: string) => {
    setSelectedLicenseType((prevSelected) =>
      prevSelected.includes(license)
        ? prevSelected.filter((lic) => lic !== license) // Remove if already selected
        : [...prevSelected, license] // Add if not selected
    );
  };

  const handleSave = async () => {
    setIsSaving(true); // Start saving/loading state

    try {
      const token = localStorage.getItem("jwt");

      // Send the selected licenses to the server (you need to adjust this URL based on your API)
      const response = await fetch(
        "http://localhost:8080/api/user/patchDriverLicense",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            driversLicences: selectedLicenseType,
          }),
        }
      );

      if (response.ok) {
        // Optimistically update the displayed licenses immediately after saving
        setDisplayedLicenses(selectedLicenseType);
        onUpdateLicenses(selectedLicenseType); // Update the state in the parent component

        setIsDialogOpen(false); // Close the dialog
      } else {
        console.error("Failed to save the licenses.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSaving(false); // End saving/loading state
    }
  };

  return (
    <div>
      <h1 className="text-2xl">Which driver licenses do you have?</h1>
      <Separator className="mt-2" />
      <div className="flex">
        {/* Display the saved licenses */}
        <div>
          {displayedLicenses.length > 0 ? (
            <h2>{displayedLicenses.join(", ")}</h2>
          ) : (
            <h2>No licenses specified</h2>
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
                <DialogTitle>License Categories</DialogTitle>
                <DialogDescription>Select license categories</DialogDescription>
              </DialogHeader>

              {/* License Type Checkboxes */}
              {licenseTypes.map((licenseType) => (
                <div key={licenseType} className="flex items-center gap-8">
                  <Checkbox
                    checked={selectedLicenseType.includes(licenseType)}
                    onCheckedChange={() => handleCheckboxChange(licenseType)}
                  />
                  <h2>{licenseType}</h2>
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
