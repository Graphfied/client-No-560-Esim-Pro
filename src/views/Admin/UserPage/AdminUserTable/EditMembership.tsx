import { UpdateMemberShipOfUser } from "@/actions/UpdateMemberShipOfUser";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { EditIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function EditMembership({
  currentMember,
  id,
}: {
  currentMember?: string;
  id?: number;
}) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const handleSubmit = async () => {
    setisLoading(true);
    try {
      const response = await UpdateMemberShipOfUser({
        id: id,
        memberShip: selectedValue as string,
      });

      toast.success(`MemberShip updated ${selectedValue}`);
      setOpen(false);
      return response;
    } catch (error: any) {
      toast.error("Error updating membership", error.message);
    } finally {
      setisLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="ml-2">
          <EditIcon className="h-5 w-5 text-[#38BDEF] " />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update membership</DialogTitle>
          <p className="py-6">
            Current membership:{" "}
            <span className=" capitalize">{currentMember}</span>
          </p>
        </DialogHeader>
        <div className="">
          <Select
            onValueChange={(value) => {
              setSelectedValue(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a membership" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="regular">Regular</SelectItem>
                <SelectItem value="silver">Silver</SelectItem>
                <SelectItem value="gold">Gold</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button disabled={isLoading} onClick={handleSubmit}>
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
