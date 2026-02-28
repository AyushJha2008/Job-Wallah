import React from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const filterdata = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend developer", "Backend Developer", "FullStack Developer"],
  },
  { filterType: "Salary", array: ["0-40k", "42k-1lak", "1lakh to 5lakh"] },
];

const FilterCrad = () => {
  return(
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-2xl text-purple-600">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup>
        {
          filterdata.map((data, index)=>(
            <div>
              <h1 className="font-bold text-lg">{data.filterType}</h1>
              {
                data.array.map((item, index)=>{
                  return(
                    <div className="flex items-center space-x-2 my-2">
                      <RadioGroupItem value={item}/>
                      <label htmlFor={item}>{item}</label>
                    </div>
                  )
                })
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  )
};

export default FilterCrad;
