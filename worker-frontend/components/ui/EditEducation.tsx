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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { LuMoreHorizontal } from "react-icons/lu";
import { FaPen } from "react-icons/fa6";

export function EditEducation() {
  // State to manage form inputs
  const [nameOfEducationalFacility, setNameOfEducationalFacility] =
    useState("");
  const [locationOfEducationalFacility, setLocationOfEducationalFacility] =
    useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [educationStartDate, setEducationStartDate] = useState("");
  const [educationEndDate, setEducationEndDate] = useState("");

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        console.error("No token found");
        return;
      }

      // Prepare the request body with the form data
      const requestBody = {
        nameOfEducationalFacility,
        locationOfEducationalFacility,
        educationLevel,
        educationStartDate,
        educationEndDate,
      };

      // Send the request to the API
      const response = await fetch("http://localhost:8080/api/user/patchCV", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to update personal data");
      }

      setIsDialogOpen(false);

      // Optionally, handle the success response
      const result = await response.json();
      console.log("Update successful:", result);
    } catch (error) {
      console.error("Error updating personal data:", error);
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
          <DialogTitle>Edit Contact Info</DialogTitle>
          <DialogDescription>
            Make changes to contact information. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nameOfEducationalFacility" className="text-right">
              Highest finished school
            </Label>
            <Input
              id="nameOfEducationalFacility"
              className="col-span-3"
              value={nameOfEducationalFacility}
              onChange={(e) => setNameOfEducationalFacility(e.target.value)} // Update state on input change
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="locationOfEducationalFacility"
              className="text-right"
            >
              City where the school is
            </Label>
            <Input
              id="locationOfEducationalFacility"
              className="col-span-3"
              value={locationOfEducationalFacility}
              onChange={(e) => setLocationOfEducationalFacility(e.target.value)} // Update state on input change
            />
          </div>
          <div className="">
            <div className="">
              <Label
                htmlFor="educationStartDate"
                className="text-right"
              >
                Start date
              </Label>
              <Input
                id="educationStartDate"
                className="col-span-3"
                value={educationStartDate}
                onChange={(e) =>
                  setEducationStartDate(e.target.value)
                } // Update state on input change
              />
            </div>
            <div>
              <Label
                htmlFor="educationEndDate"
                className="text-right"
              >
                End date
              </Label>
              <Input
                id="educationEndDate"
                className="col-span-3"
                value={educationEndDate}
                onChange={(e) =>
                  setEducationEndDate(e.target.value)
                } // Update state on input change
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="educationLevel" className="text-right">
              Education Level
            </Label>
            <Select onValueChange={setEducationLevel}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a level" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="NKV">NKV</SelectItem>
                  <SelectItem value="KV">KV</SelectItem>
                  <SelectItem value="SSS">SSS</SelectItem>
                  <SelectItem value="VSS">VSS</SelectItem>
                  <SelectItem value="Bacc">Bacc</SelectItem>
                  <SelectItem value="Mag">Mag</SelectItem>
                  <SelectItem value="PhD">PhD</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
