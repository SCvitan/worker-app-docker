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

// Enums for options
enum DriverCEOptions {
  POLUPRIKOLICA_CERADA = "POLUPRIKOLICA_CERADA",
  POLUPRIKOLICA_HLADNJACA = "POLUPRIKOLICA_HLADNJACA",
  POLUPRIKOLICA_OSTALO = "POLUPRIKOLICA_OSTALO",
  PRIKOLICA_STANDARD = "PRIKOLICA_STANDARD",
  PRIKOLICA_TANDEM = "PRIKOLICA_TANDEM",
}

enum DriverAutobusOptions {
  AUTOBUS_GRADSKI = "AUTOBUS_GRADSKI",
  AUTOBUS_MEDUGRADSKI = "AUTOBUS_MEDUGRADSKI",
  AUTOBUS_TURISTICKI = "AUTOBUS_TURISTICKI",
}

interface DriverLicensesExperienceProps {
  savedDriverLicenseExperience: {
    driverC: boolean;
    driverCE: boolean;
    driverCEOptions: string[] | null; // Allow null here
    driverAutobus: boolean;
    driverAutobusOptions: string[] | null; // Allow null here
  } | null;
}

export const DriverLicensesExperience: React.FC<DriverLicensesExperienceProps> = ({
  savedDriverLicenseExperience,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedLicenses, setSelectedLicenses] = useState<string[]>([]);
  const [selectedCEOptions, setSelectedCEOptions] = useState<DriverCEOptions[]>([]);
  const [selectedAutobusOptions, setSelectedAutobusOptions] = useState<DriverAutobusOptions[]>([]);

  // Initialize state based on the prop at the start
  useEffect(() => {
    if (savedDriverLicenseExperience) {
      const {
        driverC,
        driverCE,
        driverCEOptions,
        driverAutobus,
        driverAutobusOptions,
      } = savedDriverLicenseExperience;

      const initialLicenses: string[] = [];
      if (driverC) initialLicenses.push("DriverC");
      if (driverCE) initialLicenses.push("DriverCE");
      if (driverAutobus) initialLicenses.push("DriverAutobus");

      setSelectedLicenses(initialLicenses);

      // Use fallback to empty array for options
      setSelectedCEOptions(driverCEOptions || []);
      setSelectedAutobusOptions(driverAutobusOptions || []);
    }
  }, [savedDriverLicenseExperience]);

  

  // Handle License and Option Selections
  const handleLicenseChange = (license: string) => {
    setSelectedLicenses((prev) =>
      prev.includes(license)
        ? prev.filter((item) => item !== license)
        : [...prev, license]
    );
  };

  const handleCEOptionsChange = (option: DriverCEOptions) => {
    setSelectedCEOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleAutobusOptionsChange = (option: DriverAutobusOptions) => {
    setSelectedAutobusOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  // Save Data to API
  const handleSave = async () => {
    const payload = {
      driverC: selectedLicenses.includes("DriverC"),
      driverCE: selectedLicenses.includes("DriverCE"),
      driverCEOptions: selectedLicenses.includes("DriverCE")
        ? selectedCEOptions
        : [],
      driverAutobus: selectedLicenses.includes("DriverAutobus"),
      driverAutobusOptions: selectedLicenses.includes("DriverAutobus")
        ? selectedAutobusOptions
        : [],
    };

    try {
      const token = localStorage.getItem("jwt");
      const response = await fetch(
        "http://localhost:8080/api/user/patchLicense",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        console.log("Licenses updated successfully");
      } else {
        console.error("Failed to update licenses");
      }
    } catch (error) {
      console.error("Error while updating licenses:", error);
    }

    setIsDialogOpen(false); // Close the dialog after saving
  };

  return (
    <div>
      <h1 className="text-2xl">In which category do you have experience driving?</h1>
      <Separator className="mt-2" />
      <div className="flex">
        <div>
          {/* Show currently selected licenses */}
          <div className="mt-8">
            <h3>Selected Driver Licenses:</h3>
            {selectedLicenses.length > 0 ? (
              <ul>
                {selectedLicenses.map((license) => (
                  <li key={license}>{license}</li>
                ))}
              </ul>
            ) : (
              <p>No licenses selected</p>
            )}

            {/* Show CE options if DriverCE is selected */}
            {selectedLicenses.includes("DriverCE") && selectedCEOptions.length > 0 && (
              <div className="mt-4">
                <h4>Driver CE Options:</h4>
                <ul>
                  {selectedCEOptions.map((option) => (
                    <li key={option}>{option.replace(/_/g, " ")}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Show Autobus options if DriverAutobus is selected */}
            {selectedLicenses.includes("DriverAutobus") &&
              selectedAutobusOptions.length > 0 && (
                <div className="mt-4">
                  <h4>Driver Autobus Options:</h4>
                  <ul>
                    {selectedAutobusOptions.map((option) => (
                      <li key={option}>{option.replace(/_/g, " ")}</li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        </div>

        {/* Dialog to manage licenses */}
        <div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
            <Button variant="ghost">
                <LuMoreHorizontal />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Select Licenses</DialogTitle>
              </DialogHeader>
              <div>
                {/* Checkbox group for licenses */}
                {["DriverC", "DriverCE", "DriverAutobus"].map((license) => (
                  <div key={license} className="flex items-center mb-2">
                    <Checkbox
                      checked={selectedLicenses.includes(license)}
                      onCheckedChange={() => handleLicenseChange(license)}
                    />
                    <label className="ml-2">{license}</label>
                  </div>
                ))}

                {/* If DriverCE is selected, show CE options */}
                {selectedLicenses.includes("DriverCE") && (
                  <div className="mt-4">
                    <h4>Driver CE Options:</h4>
                    {Object.values(DriverCEOptions).map((option) => (
                      <div key={option} className="flex items-center mb-2">
                        <Checkbox
                          checked={selectedCEOptions.includes(option)}
                          onCheckedChange={() => handleCEOptionsChange(option)}
                        />
                        <label className="ml-2">{option.replace(/_/g, " ")}</label>
                      </div>
                    ))}
                  </div>
                )}

                {/* If DriverAutobus is selected, show Autobus options */}
                {selectedLicenses.includes("DriverAutobus") && (
                  <div className="mt-4">
                    <h4>Driver Autobus Options:</h4>
                    {Object.values(DriverAutobusOptions).map((option) => (
                      <div key={option} className="flex items-center mb-2">
                        <Checkbox
                          checked={selectedAutobusOptions.includes(option)}
                          onCheckedChange={() => handleAutobusOptionsChange(option)}
                        />
                        <label className="ml-2">{option.replace(/_/g, " ")}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button onClick={handleSave}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
