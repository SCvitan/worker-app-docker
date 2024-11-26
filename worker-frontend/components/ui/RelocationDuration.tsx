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

export const RelocationDuration: React.FC = () => {
  const [selectedContractType, setSelectedContractType] = useState<string | null>(null);

  const handleContractTypeChange = (value: string) => {
    setSelectedContractType(value);
    // Call the API when a selection is made
    sendContractTypeToAPI(value);
  };

  const sendContractTypeToAPI = async (contractType: string) => {
    const payload = { contractType };

    try {
      const token = localStorage.getItem("jwt");
      const response = await fetch("http://localhost:8080/api/user/patchDurationOfRelocation", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log("Contract type updated successfully");
      } else {
        console.error("Failed to update contract type");
      }
    } catch (error) {
      console.error("Error while updating contract type:", error);
    }
  };

  return (
    <div className="mt-4">
      <h1 className="text-2xl">For how long would you be willing to relocate?</h1>
      <Separator className="mt-2" />
      <div>
        <Select onValueChange={handleContractTypeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="TEMPORARLY">Temporarly</SelectItem>
              <SelectItem value="PERMANANTLY">Permanantly</SelectItem>
              <SelectItem value="NOT_SURE">I don't know</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};