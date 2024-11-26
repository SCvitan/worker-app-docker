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

const countries: string[] = ["BOSNIA_AND_HERZEGOVINA", "SERBIA", "KOSOVO", "ALBANIA", "MACEDONIA", "CROATIA", "SLOVENIA", "AUSTRIA", "ITALY", "GERMANY", "BELGIUM", "NETHERLANDS", "FRANCE", "USA"]; // Add your list of countries here

interface CountriesOfInterestProps {
  selectedCountries: string[]; // Passed from the parent component
  onUpdateCountries: (updatedCountries: string[]) => void; // Callback to update the state in the parent component
}

export const CountriesOfInterest: React.FC<CountriesOfInterestProps> = ({
  selectedCountries,
  onUpdateCountries,
}) => {
  const [selectedCountryList, setSelectedCountryList] = useState<string[]>(
    selectedCountries
  );
  const [displayedCountries, setDisplayedCountries] =
    useState<string[]>(selectedCountries);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    // Initialize the selected countries with the data passed from props
    setSelectedCountryList(selectedCountries);
    setDisplayedCountries(selectedCountries);
  }, [selectedCountries]);

  const handleCheckboxChange = (country: string) => {
    setSelectedCountryList((prevSelected) =>
      prevSelected.includes(country)
        ? prevSelected.filter((c) => c !== country) // Remove if already selected
        : [...prevSelected, country] // Add if not selected
    );
  };

  const handleSave = async () => {
    setIsSaving(true); // Start saving/loading state

    try {
      const token = localStorage.getItem("jwt");

      // Send the selected countries to the server (adjust the URL based on your API)
      const response = await fetch(
        "http://localhost:8080/api/user/patchDriverCountriesOfInterest",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            statesOfEmploymentOfInterest: selectedCountryList,
          }),
        }
      );

      if (response.ok) {
        // Optimistically update the displayed countries after saving
        setDisplayedCountries(selectedCountryList);
        onUpdateCountries(selectedCountryList); // Update the state in the parent component

        setIsDialogOpen(false); // Close the dialog
      } else {
        console.error("Failed to save the countries.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSaving(false); // End saving/loading state
    }
  };

  return (
    <div>
      <h1 className="text-2xl">Countries of Interest</h1>
      <Separator className="mt-2" />
      <div className="flex">
        {/* Display the saved countries */}
        <div>
          {displayedCountries.length > 0 ? (
            <h2>{displayedCountries.join(", ")}</h2>
          ) : (
            <h2>No countries specified</h2>
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
                <DialogTitle>Countries of Interest</DialogTitle>
                <DialogDescription>Select countries</DialogDescription>
              </DialogHeader>

              {/* Country Checkboxes */}
              {countries.map((country) => (
                <div key={country} className="flex items-center gap-8">
                  <Checkbox
                    checked={selectedCountryList.includes(country)}
                    onCheckedChange={() => handleCheckboxChange(country)}
                  />
                  <h2>{country}</h2>
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
