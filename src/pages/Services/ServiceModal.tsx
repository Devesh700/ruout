import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { IService } from "../../types/services";

interface Props {
  initialData?: IService | null;
  onSubmit: (data: Partial<IService>) => void;
  onClose: () => void;
}

const fieldSchema = z.object({
  label: z.string().min(1, "Label is required"),
  name: z.string().min(1, "Name is required"),
  type: z.enum([
    "text",
    "textarea",
    "select",
    "checkbox",
    "radio",
    "number",
    "date",
    "file",
  ]),
  options: z.array(z.string()).optional(),
  required: z.boolean().optional(),
  placeholder: z.string().optional(),
});

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  type: z.enum(["startup", "general"]),
  category: z.string().optional(),
  icon: z.string().url("Icon must be a valid URL").optional().or(z.literal("")),
  ctaLabel: z.string().optional(),
  isActive: z.boolean(),
  formFields: z.array(fieldSchema).optional(),
});

type FormData = z.infer<typeof schema>;

export default function ServiceModal({ initialData, onSubmit, onClose }: Props) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      type: initialData?.type || "startup",
      category: initialData?.category || "",
      icon: initialData?.icon || "",
      ctaLabel: initialData?.ctaLabel || "",
      isActive: initialData?.isActive ?? true,
      formFields: initialData?.formFields || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "formFields",
  });

  const submitHandler = (data: FormData) => {
    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 overflow-y-auto">
      <div className="bg-white p-6 rounded w-full max-w-2xl space-y-4">
        <h2 className="text-xl font-semibold">
          {initialData ? "Edit Service" : "Create Service"}
        </h2>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          {/* Basic Fields */}
          <input {...register("name")} placeholder="Name" className="w-full border p-2 rounded" />
          {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}

          <textarea {...register("description")} placeholder="Description" className="w-full border p-2 rounded" />
          {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}

          <select {...register("type")} className="w-full border p-2 rounded">
            <option value="startup">Startup</option>
            <option value="general">General</option>
          </select>

          <input {...register("category")} placeholder="Category" className="w-full border p-2 rounded" />

          <input {...register("icon")} placeholder="Icon URL" className="w-full border p-2 rounded" />
          {errors.icon && <p className="text-red-600 text-sm">{errors.icon.message}</p>}

          <input {...register("ctaLabel")} placeholder="CTA Label" className="w-full border p-2 rounded" />

          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("isActive")} />
            Active
          </label>

          {/* Dynamic Form Fields */}
          <div className="space-y-2 border-t pt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Dynamic Form Fields</h3>
              <button
                type="button"
                onClick={() =>
                  append({
                    label: "",
                    name: "",
                    type: "text",
                    options: [],
                    required: false,
                    placeholder: "",
                  })
                }
                className="text-blue-600"
              >
                + Add Field
              </button>
            </div>

            {fields.map((field, index) => (
              <div key={field.id} className="border p-3 rounded space-y-2">
                <input
                  {...register(`formFields.${index}.label`)}
                  placeholder="Label"
                  className="w-full border p-2 rounded"
                />
                <input
                  {...register(`formFields.${index}.name`)}
                  placeholder="Field Name"
                  className="w-full border p-2 rounded"
                />
                <select
                  {...register(`formFields.${index}.type`)}
                  className="w-full border p-2 rounded"
                >
                  <option value="text">Text</option>
                  <option value="textarea">Textarea</option>
                  <option value="select">Select</option>
                  <option value="checkbox">Checkbox</option>
                  <option value="radio">Radio</option>
                  <option value="number">Number</option>
                  <option value="date">Date</option>
                  <option value="file">File</option>
                </select>

                <input
                  {...register(`formFields.${index}.placeholder`)}
                  placeholder="Placeholder"
                  className="w-full border p-2 rounded"
                />

                {(field.type === "select" || field.type === "radio") && (
                  <textarea
                    {...register(`formFields.${index}.options`)}
                    placeholder="Options (comma-separated)"
                    className="w-full border p-2 rounded"
                    onBlur={(e) => {
                      const val = e.target.value;
                      if (val && control._formValues.formFields?.[index]) {
                        setValue(`formFields.${index}.options`, val.split(",").map(opt => opt.trim()));
                      }
                    }}
                  />
                )}

                <label className="flex items-center gap-2">
                  <input type="checkbox" {...register(`formFields.${index}.required`)} />
                  Required
                </label>

                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-600 text-sm"
                >
                  Remove Field
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600">
              Cancel
            </button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              {initialData ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
