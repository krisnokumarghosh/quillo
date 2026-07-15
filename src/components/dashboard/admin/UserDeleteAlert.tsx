"use client";

import { deleteUserById } from "@/lib/actions/blogs";
import { User } from "@/lib/dataInterface";
import { errorToast, successToast } from "@/lib/toasts";
import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import React from "react";

const UserDeleteAlert = ({ user }: { user: User }) => {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const id = user._id;
      const deleteBlog = await deleteUserById(id);
      if (deleteBlog.success) {
        successToast(deleteBlog.message);
        router.refresh();
      }
    } catch (error) {
      errorToast("Failed to delete blog");
    }
  };
  return (
    <AlertDialog>
      <Button className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors duration-200 flex-none">
        <TrashBin width={14} height={14} />
        Delete
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Delete User permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{user.name}</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={handleDelete} slot="close" variant="danger">
                Delete User
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default UserDeleteAlert;
