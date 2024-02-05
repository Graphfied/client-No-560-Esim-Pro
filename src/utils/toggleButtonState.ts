import { create } from "zustand";

interface useToggleProps {
  selectedButton: "Country" | "Order#";
  setSelectedButton: (value: "Country" | "Order#") => void;
}

const useToggle = create<useToggleProps>((set) => ({
  selectedButton: "Country", // Initially set to 'Country'
  setSelectedButton: (value) => set({ selectedButton: value }),
}));

export default useToggle;
