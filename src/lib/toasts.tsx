import { toast } from "@heroui/react";

export const successToast = (msg: string) => {
  toast.success(msg, {
    actionProps: {
      children: "Dismiss",
      onPress: () => toast.clear(),
      variant: "tertiary",
       className: "bg-[#415A77] text-[#E0E1DD] hover:bg-[#415A77]/90",
    },
  });
};
export const errorToast = (msg: string) => {
  toast.danger(msg, {
    actionProps: {
      children: "Dismiss",
      onPress: () => toast.clear(),
      variant: "tertiary",
       className: "bg-[#415A77] text-[#E0E1DD] hover:bg-[#415A77]/90",
    },
  });
};
