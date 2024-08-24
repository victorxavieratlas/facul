//
//Ajustar o accordion
//


import { useState } from 'react';

interface Service {
    id: number;
    title: string;
    description: string;
    value: string;
    time: string;
}

interface Props {
    services: Service[];
    profileId: number;
    updateServices: (profileId: string) => Promise<void>;
}

export default function ServicesAccordion({ services, profileId, updateServices }: Props) {
    const [showAddForm, setShowAddForm] = useState(false);
    const [newService, setNewService] = useState({ title: '', description: '', value: '', time: '' });
    const [editingService, setEditingService] = useState<Service | null>(null);

    const handleAddService = async () => {
        const response = await fetch(`http://localhost:3007/services`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ profileId, ...newService })
        });
        if (response.ok) {
            updateServices(profileId.toString());
            setShowAddForm(false);
            setNewService({ title: '', description: '', value: '', time: '' }); // Reset the form
        }
    };

    //Ajustar update
    const handleUpdateService = async (id: number) => {
        const response = await fetch(`http://localhost:3007/services/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editingService)
        });
        if (response.ok) {
            updateServices(profileId.toString());
            setEditingService(null);
        }
    };

    //Ajustar delete
    const handleDeleteService = async (id: number) => {
        const response = await fetch(`http://localhost:3007/services/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            updateServices(profileId.toString());
        }
    };

    return (
        <div className="p-4 bg-white shadow rounded-lg">
            {services.length > 0 ? (
                services.map((service) => (
                    <div key={service.id} className="border-b p-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold">{service.title}</h3>
                            <div>
                                <button className="text-blue-500 hover:text-blue-700 px-2" onClick={() => setEditingService(service)}>Edit</button>
                                <button className="text-red-500 hover:text-red-700 px-2" onClick={() => handleDeleteService(service.id)}>Delete</button>
                            </div>
                        </div>
                        {editingService && editingService.id === service.id && (
                            <div className="mt-4">
                                <input className="border p-1 rounded mr-2" value={editingService.title} onChange={(e) => setEditingService({ ...editingService, title: e.target.value })} placeholder="Title" />
                                <input className="border p-1 rounded mr-2" value={editingService.description} onChange={(e) => setEditingService({ ...editingService, description: e.target.value })} placeholder="Description" />
                                <input className="border p-1 rounded mr-2" value={editingService.value} onChange={(e) => setEditingService({ ...editingService, value: e.target.value })} placeholder="Value" />
                                <input className="border p-1 rounded" value={editingService.time} onChange={(e) => setEditingService({ ...editingService, time: e.target.value })} placeholder="Time" />
                                <button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white p-1 rounded" onClick={() => handleUpdateService(service.id)}>Update</button>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p>No services available. Add some!</p>
            )}

            {showAddForm ? (
                <div className="mt-4">
                    <input className="border p-1 rounded mr-2" value={newService.title} onChange={(e) => setNewService({ ...newService, title: e.target.value })} placeholder="Title" />
                    <input className="border p-1 rounded mr-2" value={newService.description} onChange={(e) => setNewService({ ...newService, description: e.target.value })} placeholder="Description" />
                    <input className="border p-1 rounded mr-2" value={newService.value} onChange={(e) => setNewService({ ...newService, value: e.target.value })} placeholder="Value" />
                    <input className="border p-1 rounded" value={newService.time} onChange={(e) => setNewService({ ...newService, time: e.target.value })} placeholder="Time" />
                    <button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white p-1 rounded" onClick={handleAddService}>Add Service</button>
                </div>
            ) : (
                <button className="mt-4 bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded" onClick={() => setShowAddForm(true)}>Add Service</button>
            )}
        </div>
    );
}
