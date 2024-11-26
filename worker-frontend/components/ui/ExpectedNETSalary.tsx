import React from "react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export const ExpectedNetSalary = () => {
  return (
    <div className="mt-4">
      <h1 className="text-2xl">Expected NET salary?</h1>
      <Separator className="mt-2" />
      <Input type="number" placeholder="Salary NET in €" />
    </div>
  );
};
