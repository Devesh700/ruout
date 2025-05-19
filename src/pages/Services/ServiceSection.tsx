import { useState } from "react";
import {
  useGetAllServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} from "../../services/serviceApi";
import type { IService } from "../../types/services";
import ServiceModal from "./ServiceModal";
import CircularDotLoader from "../../components/ui/DotLoader";

export default function ServiceSection() {
  const { data: services, isLoading, isError } = useGetAllServicesQuery();
  const [createService] = useCreateServiceMutation();
  const [updateService] = useUpdateServiceMutation();
  const [deleteService] = useDeleteServiceMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<IService | null>(null);

  const handleCreate = () => {
    setSelectedService(null);
    setModalOpen(true);
  };

  const handleEdit = (service: IService) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      try {
        await deleteService(id).unwrap();
      } catch (err) {
        alert("Failed to delete service.");
      }
    }
  };

  if (isLoading) return <CircularDotLoader />;
  if (isError || !services) return <div>Error loading services.</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Service Management</h2>
        <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded">
          + New Service
        </button>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Active</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service._id} className="border-t">
              <td className="p-2 border">{service.name}</td>
              <td className="p-2 border capitalize">{service.type}</td>
              <td className="p-2 border">{service.category || "-"}</td>
              <td className="p-2 border">{service.isActive ? "Yes" : "No"}</td>
              <td className="p-2 border flex gap-2">
                <button onClick={() => handleEdit(service)} className="text-blue-600 hover:underline">
                  Edit
                </button>
                <button onClick={() => handleDelete(service._id)} className="text-red-600 hover:underline">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <ServiceModal
          initialData={selectedService}
          onClose={() => setModalOpen(false)}
          onSubmit={async (data) => {
            try {
              if (selectedService) {
                await updateService({ id: selectedService._id, body: data }).unwrap();
              } else {
                await createService(data).unwrap();
              }
              setModalOpen(false);
            } catch (err) {
              alert("Error saving service. Please try again.");
            }
          }}
        />
      )}
    </div>
  );
}
