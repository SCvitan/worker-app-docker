import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

export const DriverFilter = () => {
  return (
    <div className="border-2">
      <div>
        <h1>Driver Licenses</h1>
      </div>
      <div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <div className="flex items-center space-x-2">
                <Checkbox id="B" />
                <label
                  htmlFor="B"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  License category B
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="C" />
                <label
                  htmlFor="C"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  License category C
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="C+E" />
                <label
                  htmlFor="C+E"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  License category C+E
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="D" />
                <label
                  htmlFor="D"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  License category D
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="D+E" />
                <label
                  htmlFor="D+E"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  License category D+E
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="FORKLIFT" />
                <label
                  htmlFor="FORKLIFT"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  License category FORKLIFT
                </label>
              </div>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Separator />
      <h1>Place of work</h1>
      <div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select place of work" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <div className="flex items-center space-x-2">
                <Checkbox id="CROATIA" />
                <label
                  htmlFor="CROATIA"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  CROATIA
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="SERBIA" />
                <label
                  htmlFor="SERBIA"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  SERBIA
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="BOSNIA_AND_HERZEGOVINA" />
                <label
                  htmlFor="BOSNIA_AND_HERZEGOVINA"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  BOSNIA AND HERZEGOVINA
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="GERMANY" />
                <label
                  htmlFor="GERMANY"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  GERMANY
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="AUSTRIA" />
                <label
                  htmlFor="AUSTRIA"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  AUSTRIA
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="BELGIUM" />
                <label
                  htmlFor="BELGIUM"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  BELGIUM
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="NETHERLANDS" />
                <label
                  htmlFor="NETHERLANDS"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  NETHERLANDS
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="FRANCE" />
                <label
                  htmlFor="FRANCE"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  FRANCE
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="ITALY" />
                <label
                  htmlFor="ITALY"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  ITALY
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="SLOVENIA" />
                <label
                  htmlFor="SLOVENIA"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  SLOVENIA
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="MACEDONIA" />
                <label
                  htmlFor="MACEDONIA"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  MACEDONIA
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="ALBANIA" />
                <label
                  htmlFor="ALBANIA"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  ALBANIA
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="KOSOVO" />
                <label
                  htmlFor="KOSOVO"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  KOSOVO
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="USA" />
                <label
                  htmlFor="USA"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  USA
                </label>
              </div>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Separator />
      <h1>Driving experience</h1>
      <div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <div className="flex items-center space-x-2">
                <Checkbox id="driverC" />
                <label
                  htmlFor="driverC"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  C
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="POLUPRIKOLICA_CERADA" />
                <label
                  htmlFor="POLUPRIKOLICA_CERADA"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  C+E POLUPRIKOLICA CERADA
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="POLUPRIKOLICA_HLADNJACA" />
                <label
                  htmlFor="POLUPRIKOLICA_HLADNJACA"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  C+E POLUPRIKOLICA HLADNJACA
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="POLUPRIKOLICA_OSTALO" />
                <label
                  htmlFor="POLUPRIKOLICA_OSTALO"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  C+E POLUPRIKOLICA OSTALO
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="PRIKOLICA_STANDARD" />
                <label
                  htmlFor="PRIKOLICA_STANDARD"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  C+E PRIKOLICA STANDARD
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="PRIKOLICA_TANDEM" />
                <label
                  htmlFor="PRIKOLICA_TANDEM"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  C+E PRIKOLICA TANDEM
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="driverAutobus" />
                <label
                  htmlFor="driverAutobus"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Autobus
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="AUTOBUS_GRADSKI" />
                <label
                  htmlFor="AUTOBUS_GRADSKI"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  AUTOBUS_GRADSKI
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="AUTOBUS_MEDUGRADSKI" />
                <label
                  htmlFor="AUTOBUS_MEDUGRADSKI"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  AUTOBUS MEDUGRADSKI
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="AUTOBUS_TURISTICKI" />
                <label
                  htmlFor="AUTOBUS_TURISTICKI"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  AUTOBUS TURISTICKI
                </label>
              </div>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Separator />
      <h1>Years of experience</h1>
      <div className="flex items-center gap-4">
        <Input className="w-[70px] ml-2" />
        <h3>to</h3>
        <Input className="w-[70px]" />
      </div>
      <Separator />
      <h1>Expected NET salary in €:</h1>
      <div className="flex items-center gap-4">
        <Input className="w-[70px] ml-2" />
        <h3>to</h3>
        <Input className="w-[70px]" />
      </div>
    </div>
  );
};

export default DriverFilter;
