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
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const handleAddService = async () => {
        const response = await fetch(`http://localhost:3007/services`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ profileId, ...newService })
        });
        if (response.ok) {
            await updateServices(profileId.toString());
            setShowAddForm(false);
            setNewService({ title: '', description: '', value: '', time: '' }); // Reset the form
        }
    };

    const handleUpdateService = async (id: number) => {
        const response = await fetch(`http://localhost:3007/services/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editingService)
        });
        if (response.ok) {
            await updateServices(profileId.toString());
            setEditingService(null);
        }
    };

    const handleDeleteService = async (id: number) => {
        const response = await fetch(`http://localhost:3007/services/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            await updateServices(profileId.toString());
        }
    };

    const toggleExpand = (id: number) => {
        if (expandedId === id) {
            setExpandedId(null);
        } else {
            setExpandedId(id);
        }
    };

    return (
        <div className="p-4 bg-white shadow rounded-lg">
            {services.length > 0 ? (
                services.map((service) => (
                    <div key={service.id} className="border-t border-gray-200">
                        <button className="flex items-center justify-between w-full p-5 font-medium text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rounded-t-lg" onClick={() => toggleExpand(service.id)}>
                            <span>{service.title}</span>
                            <div className='flex items-center text-left'>
                                <button className="text-blue-600 hover:text-blue-800 px-2" onClick={(e) => { e.stopPropagation(); setEditingService(service); }}>Edit</button>
                                <button className="text-red-600 hover:text-red-800 px-2" onClick={(e) => { e.stopPropagation(); handleDeleteService(service.id); }}>Delete</button>
                                <p>R$ </p>
                                <p className=''> {service.value}.00</p>
                                <svg className={`w-4 h-4 transform transition-transform ${expandedId === service.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </button>
                        {expandedId === service.id && (
                            <div className="p-5">
                                <p>{service.description}</p>
                                <p>{service.time}</p>
                            </div>
                        )}
                        {editingService && editingService.id === service.id && (
                            <div className="p-5">
                                <input className="border p-1 rounded mr-2" value={editingService.title} onChange={(e) => setEditingService({ ...editingService, title: e.target.value })} placeholder="Title" />
                                <input className="border p-1 rounded mr-2" value={editingService.description} onChange={(e) => setEditingService({ ...editingService, description: e.target.value })} placeholder="Description" />
                                <input className="border p-1 rounded mr-2" value={editingService.value} onChange={(e) => setEditingService({ ...editingService, value: e.target.value })} placeholder="Value" />
                                <input className="border p-1 rounded" value={editingService.time} onChange={(e) => setEditingService({ ...editingService, time: e.target.value })} placeholder="Time" />
                                <button className="ml-2 bg-blue-600 hover:bg-blue-800 text-white p-1 rounded" onClick={() => handleUpdateService(service.id)}>Update</button>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p>No services available. Add some!</p>
            )}

            {showAddForm ? (
                <div className="p-5">
                    <input className="border p-1 rounded mr-2" value={newService.title} onChange={(e) => setNewService({ ...newService, title: e.target.value })} placeholder="Title" />
                    <input className="border p-1 rounded mr-2" value={newService.description} onChange={(e) => setNewService({ ...newService, description: e.target.value })} placeholder="Description" />
                    <input className="border p-1 rounded mr-2" value={newService.value} onChange={(e) => setNewService({ ...newService, value: e.target.value })} placeholder="Value" />
                    <input className="border p-1 rounded" value={newService.time} onChange={(e) => setNewService({ ...newService, time: e.target.value })} placeholder="Time" />
                    <button className="ml-2 bg-blue-600 hover:bg-blue-800 text-white p-1 rounded" onClick={handleAddService}>Add Service</button>
                </div>
            ) : (
                <button className="mt-4 bg-green-600 hover:bg-green-800 text-white py-2 px-4 rounded" onClick={() => setShowAddForm(true)}>Add Service</button>
            )}
        </div>
    );
}
