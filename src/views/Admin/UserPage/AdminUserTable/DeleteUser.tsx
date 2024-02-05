import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { DeleteUserFromDB } from "@/actions/deleteUserFromAdmin";

interface DeleteUserProps {
  name: string;
  email: string;
  picture: string;
  userid: number;
}
export function DeleteUser({ name, email, picture, userid }: DeleteUserProps) {
  const [open, setOpen] = useState(false);

  const handleDeleteUser = async (id: string) => {
    await DeleteUserFromDB(id);
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="md:ml-2">
        <Button variant="outline">
          <Trash2 size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this user? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Name
            </Label>
            <Label className="col-span-3">{name}</Label>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-left">
              Email
            </Label>
            <Label className="col-span-3">{email}</Label>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-left"></Label>
            <Image src={picture} alt={"user"} width={50} height={50} />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => handleDeleteUser(email)}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
