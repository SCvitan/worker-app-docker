import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Relocation: React.FC = () => {
  const [willingToRelocate, setWillingToRelocate] = useState<boolean | null>(null);

  const handleRelocationChange = (value: string) => {
    // Convert the selected value to a boolean
    const isWilling = value === "YES";
    setWillingToRelocate(isWilling);
    sendRelocationToAPI(isWilling);
  };

  const sendRelocationToAPI = async (relocation: boolean) => {
    const payload = { willingToRelocate: relocation };

    try {
      const token = localStorage.getItem("jwt");
      const response = await fetch("http://localhost:8080/api/user/patchWillingToRelocate", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log("Relocation preference updated successfully");
      } else {
        console.error("Failed to update relocation preference");
      }
    } catch (error) {
      console.error("Error while updating relocation preference:", error);
    }
  };

  return (
    <div className="mt-4">
      <h1 className="text-2xl">Would you be willing to relocate?</h1>
      <Separator className="mt-2" />
      <div>
        <Select onValueChange={handleRelocationChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="YES">Yes</SelectItem>
              <SelectItem value="NO">No</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
