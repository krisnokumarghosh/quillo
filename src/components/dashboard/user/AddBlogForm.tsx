"use client";

import { manropeFont } from "@/lib/fonts";
import { CloudArrowUpIn, Xmark } from "@gravity-ui/icons";
import {
  FieldError,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
  Select,
  Button,
  ListBox,
} from "@heroui/react";
import Image from "next/image";
import { getUserSession } from "@/lib/core/session";
import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import {  useRouter } from "next/navigation";
import { addBlog } from "@/lib/actions/blogs";
import { errorToast, successToast } from "@/lib/toasts";

const CATEGORIES = [
  "Technology",
  "Lifestyle",
  "Travel",
  "Productivity",
  "Health",
  "Business",
  "Education",
  "Other",
];

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

const inputStyles =
  "w-full bg-[#0D1B2A]/5 border border-[#778DA9]/25 rounded-xl px-4 py-3 text-[13px] text-[#0D1B2A] placeholder:text-[#1B263B]/35 outline-none transition-colors focus:border-[#415A77] focus:ring-0";

const labelStyles = `${manropeFont.className} text-[11px] font-bold text-[#1B263B]/60 tracking-[0.1em] uppercase`;

const AddBlogForm = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim().replace(/^#/, "");
      if (!tags.includes(newTag) && tags.length < 8) {
        setTags([...tags, newTag]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const uploadToImgBB = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    console.log("Status:", res.status);

    const data = await res.json();

    console.log("ImgBB Response:", data);

    if (!data.success) {
      throw new Error("Image upload failed");
    }

    return data.data.url;
  } catch (err) {
    console.error("Upload Error:", err);
    throw err;
  }
};

  const handleCreateBlog = async ( e: React.SyntheticEvent<HTMLFormElement>) => {
  e.preventDefault();

  const form = e.currentTarget;
  const formData = new FormData(form); // <-- শুরুতেই

  if (tags.length === 0) return errorToast("Add at least one tag");
  if (!thumbnail) return errorToast("Please upload a thumbnail");

  const user = await getUserSession();

  setSubmitting(true);

  console.log("Uploading image");

  const thumbnailUrl = await uploadToImgBB(thumbnail);

  console.log("Image uploaded", thumbnailUrl);

  const payload = {
    userId: user?.id as string,
    userName: user?.name as string,
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    content: formData.get("content") as string,
    category: formData.get("category") as string,
    tags,
    thumbnail: thumbnailUrl,
  };

  const result = await addBlog(payload);

  if (result.insertedId) {
    successToast("Blog Created");
    form.reset();
    router.push("/dashboard/user/my-blogs");
  } else {
    errorToast("Something went wrong");
  }

  setSubmitting(false);
};

  return (
    <div>
      <Form
        onSubmit={handleCreateBlog}
        className="max-w-3xl mx-auto flex flex-col gap-5 px-3 pt-6 md:px-0 md:pt-0"
      >
        <TextField isRequired name="title"  type="text" className="flex flex-col gap-1.5">
          <Label className={labelStyles}>Blog Title</Label>
          <Input
         
            placeholder="e.g. 10 Habits of Highly Productive Writers"
            className={inputStyles}
          />
          <FieldError className="text-[11px] text-red-500" />
        </TextField>

        <TextField
          isRequired
          name="description"
          className="flex flex-col gap-1.5"
        >
          <Label className={labelStyles}>Short Description</Label>
          <TextArea
            name="description"
            placeholder="A short summary of what this blog is about..."
            rows={3}
            className={`${inputStyles} resize-none focus:ring-0`}
          />
          <FieldError className="text-[11px] text-red-500" />
        </TextField>

        <TextField isRequired name="content" className="flex flex-col gap-1.5">
          <Label className={labelStyles}>Blog Content</Label>
          <TextArea
            name="content"
            placeholder="Write your full blog post here. Markdown is supported..."
            rows={10}
            className={`${inputStyles} resize-none leading-[1.8] focus:ring-0`}
          />
          <FieldError className="text-[11px] text-red-500" />
        </TextField>

        {/* Category */}
        <div className="flex flex-col gap-1.5">
          <Label className={labelStyles}>Category</Label>
          <Select name="category" isRequired placeholder="Select one">
            <Select.Trigger className={inputStyles}>
              <Select.Value className="text-[#0D1B2A]" />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover className="bg-white border border-[#778DA9]/25 rounded-xl text-[#0D1B2A]">
              <ListBox>
                {CATEGORIES.map((c) => (
                  <ListBox.Item
                    key={c}
                    id={c}
                    textValue={c}
                    className="hover:bg-[#415A77]/15 hover:text-[#0D1B2A]   px-3 py-2 rounded-lg"
                  >
                    {c}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* Tags */}
        <div className="flex flex-col gap-1.5">
          <label className={labelStyles}>
            Tags{" "}
            <span className="text-[#1B263B]/35 normal-case tracking-normal font-normal">
              (press Enter or comma to add, max 8)
            </span>
          </label>
          <div className="min-h-11.5 flex flex-wrap items-center gap-2 bg-[#0D1B2A]/5 border border-[#778DA9]/25 focus-within:border-[#415A77] rounded-xl px-3 py-2.5 transition-colors">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`${manropeFont.className} flex items-center gap-1 bg-[#415A77]/15 text-[#415A77] text-[11px] font-bold px-2.5 py-1 rounded-full`}
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="hover:text-[#0D1B2A] transition-colors duration-150"
                >
                  <Xmark width={11} height={11} />
                </button>
              </span>
            ))}
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder={
                tags.length === 0 ? "e.g. writing, productivity..." : ""
              }
              className="flex-1 min-w-30 bg-transparent shadow-none outline-none text-[13px] text-[#0D1B2A] placeholder:text-[#1B263B]/35 focus:ring-0"
            />
          </div>
        </div>

        {/* Thumbnail */}
        <div className="flex flex-col gap-1.5">
          <Label className={labelStyles}>Thumbnail Image</Label>
          <Label className="cursor-pointer">
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            {thumbnailPreview ? (
              <div className="relative w-full h-45 rounded-3xl overflow-hidden border border-[#415A77]/25 group">
                <Image
                  src={thumbnailPreview}
                  alt="Thumbnail preview"
                  height={180}
                  width={639}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#0D1B2A]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <span className="text-[#E0E1DD] text-[13px] font-medium">
                    Click to change
                  </span>
                </div>
              </div>
            ) : (
              <div className="w-full h-45 bg-[#0D1B2A]/5 border border-dashed border-[#778DA9]/30 hover:border-[#415A77]/50 hover:bg-[#415A77]/5 rounded-3xl flex flex-col items-center justify-center gap-3 transition-all duration-200">
                <CloudArrowUpIn
                  width={28}
                  height={28}
                  className="text-[#1B263B]/40"
                />
                <div className="text-center">
                  <p className="text-[13px] text-[#1B263B]/60 font-medium">
                    Click to upload thumbnail
                  </p>
                  <p
                    className={`${manropeFont.className} text-[10px] text-[#1B263B]/35 mt-1`}
                  >
                    PNG, JPG, WEBP — max 5MB
                  </p>
                </div>
              </div>
            )}
          </Label>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2 pb-8">
          <Button
            type="reset"
            className="flex-1 bg-[#0D1B2A]/5 hover:bg-[#0D1B2A]/10 border border-[#778DA9]/25 text-[#1B263B]/70 font-semibold text-[13px] py-3 rounded-full transition-colors duration-200"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-[#0D1B2A] hover:bg-[#1B263B] text-[#E0E1DD] font-bold text-[13px] py-3 rounded-full transition-colors duration-200 disabled:opacity-60"
          >
            {submitting ? "Publishing..." : "Publish Blog →"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddBlogForm;
