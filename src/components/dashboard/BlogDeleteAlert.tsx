"use client"

import { deleteBlogById } from "@/lib/actions/blogs";
import { Blog } from "@/lib/dataInterface";
import { errorToast, successToast } from "@/lib/toasts";
import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";

const BlogDeleteAlert = ({ blog }: { blog: Blog }) => {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const id = blog._id;
      const deleteBlog = await deleteBlogById(id);
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
                Delete blog permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{blog.title}</strong> and
                all of its data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={handleDelete} slot="close" variant="danger">
                Delete Blog
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default BlogDeleteAlert;
