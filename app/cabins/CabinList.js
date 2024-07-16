import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "../_lib/data-service";
import { unstable_noStore as noStore } from "next/cache";

async function CabinList({filter}) {
  noStore();
  const cabins = await getCabins();
  if(!cabins.length) return null;

  let displaycabins;
  if(filter === "All") displaycabins = cabins;
  if(filter === "small") displaycabins = cabins.filter((cabin) => cabin.maxCapacity <=3)
  if(filter === "medium") displaycabins = cabins.filter((cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <=7)
  if(filter === "large") displaycabins = cabins.filter((cabin) => cabin.maxCapacity >=8)
  return (
    <div>
        
       {
      
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
        
          {displaycabins.map((cabin) => (
            <CabinCard cabin={cabin} key={cabin.id} />
          ))}
        </div>
      }
    </div>
  )
}

export default CabinList