import { Button } from "@/components/ui/button";

interface SidebarProps {
  filters: {
    maxPrice?: number;
    minValidity?: number;
    minDataAllowance?: number;
  };
  onFilterChange: (key: string, value: string) => void;
  onClearFilters: () => void;
}
export default function Filters({
  filters,
  onFilterChange,
  onClearFilters,
}: SidebarProps) {
  return (
    <div className="space-y-4 p-1">
      <div>
        <p className="text-sm mb-2">Maximum Price</p>
        <div className="flex">
          <input
            type="number"
            value={filters.maxPrice !== undefined ? filters.maxPrice : ""}
            className="w-full rounded-l-md focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-center border border-gray-200"
            onWheel={(e) => (e.target as HTMLElement).blur()}
            onChange={(e) => onFilterChange("maxPrice", e.target.value)}
            autoFocus
          />
          <p className="bg-gray-200 md:text-sm lg:text-base p-2 md:p-1 lg:p-2 rounded-r-md min-w-[20%] text-center">
            USD
          </p>
        </div>
      </div>
      <div>
        <p className="text-sm mb-2">Minimum Validity</p>
        <div className="flex">
          <input
            type="number"
            value={filters.minValidity !== undefined ? filters.minValidity : ""}
            className="w-full rounded-l-md focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-center border border-gray-200"
            onWheel={(e) => (e.target as HTMLElement).blur()}
            onChange={(e) => onFilterChange("minValidity", e.target.value)}
          />
          <p className="bg-gray-200 md:text-sm lg:text-base p-2 md:p-1 lg:p-2 rounded-r-md min-w-[20%] text-center">
            days
          </p>
        </div>
      </div>
      <div>
        <p className="text-sm mb-2">Minimum Data Allowance</p>
        <div className="flex">
          <input
            type="number"
            value={
              filters.minDataAllowance !== undefined
                ? filters.minDataAllowance
                : ""
            }
            className="w-full rounded-l-md focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-center border border-gray-200"
            onWheel={(e) => (e.target as HTMLElement).blur()}
            onChange={(e) => onFilterChange("minDataAllowance", e.target.value)}
          />
          <p className="bg-gray-200 md:text-sm lg:text-base p-2 md:p-1 lg:p-2 rounded-r-md min-w-[20%] text-center">
            GB
          </p>
        </div>
      </div>
      <Button
        className="bg-[#38BDEF] hover:text-[#38BDEF] hover:bg-white border border-[#38BDEF] min-w-full hidden md:block"
        onClick={onClearFilters}
      >
        Clear Filters
      </Button>
    </div>
  );
}
