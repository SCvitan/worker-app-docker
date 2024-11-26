import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectItem, SelectValue } from "@/components/ui/select";
import { LuMoreHorizontal } from "react-icons/lu";
import { FaPen } from "react-icons/fa6";


export function EditContactInfo() {
  // State to manage form inputs
  const [phoneNumber, setphoneNumber] = useState("");
  const [placeOfResidence, setPlaceOfResidence] = useState("");
  const [nationality, setNationality] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);


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
        
        phoneNumber,
        placeOfResidence,  // Convert age to a number
        nationality,
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
    window.location.reload()
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
            <Label htmlFor="phoneNumber" className="text-right">
              Phone Number
            </Label>
            <Input
              id="phoneNumber"
              className="col-span-3"
              value={phoneNumber}
              onChange={(e) => setphoneNumber(e.target.value)} // Update state on input change
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="placeOfResidence" className="text-right">
              Residence
            </Label>
            <Input
              id="placeOfResidence"
              className="col-span-3"
              value={placeOfResidence}
              onChange={(e) => setPlaceOfResidence(e.target.value)} // Update state on input change
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nationality" className="text-right">
              Nationality
            </Label>
            <Input
              id="nationality"
              className="col-span-3"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)} // Update state on input change
            />
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
