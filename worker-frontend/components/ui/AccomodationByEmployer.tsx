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

export const AcommodationByEmployer: React.FC = () => {
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
      const response = await fetch("http://localhost:8080/api/user/patchAccommodationByEmployer", {
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
      <h1 className="text-2xl">Accomodation payed by employer?</h1>
      <Separator className="mt-2" />
      <div>
        <Select onValueChange={handleContractTypeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="YES">Yes</SelectItem>
              <SelectItem value="NO">No</SelectItem>
              <SelectItem value="NO_HIGHER_PAY">No, but higher salary</SelectItem>
              <SelectItem value="MAYBE">I don't know</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};