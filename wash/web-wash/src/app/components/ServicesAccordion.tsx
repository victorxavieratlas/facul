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
    profileId: string;
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
        <div className="p-5 bg-white shadow rounded-lg">
            <div className="w-full">
                <div className="flex justify-start float-left">
                    <p className="font-semibold text-gray-500">
                        <svg className="inline mr-2 pb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" color="#6b7280" fill="none">
                            <path d="M22 6H2C2 5.06812 2 4.60218 2.15224 4.23463C2.35523 3.74458 2.74458 3.35523 3.23463 3.15224C3.60218 3 4.06812 3 5 3H19C19.9319 3 20.3978 3 20.7654 3.15224C21.2554 3.35523 21.6448 3.74458 21.8478 4.23463C22 4.60218 22 5.06812 22 6Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M22 6V21M2 6V21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M16 19V21M8 19V21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M7.5 14L7.74254 13.0299C8.10632 11.5747 8.28821 10.8472 8.83073 10.4236C9.37325 10 10.1232 10 11.6231 10H12.3769C13.8768 10 14.6267 10 15.1693 10.4236C15.7118 10.8472 15.8937 11.5747 16.2575 13.0299L16.5 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M17 14H7C6.44772 14 6 14.4477 6 15V18C6 18.5523 6.44772 19 7 19H17C17.5523 19 18 18.5523 18 18V15C18 14.4477 17.5523 14 17 14Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M8.5 16.49V16.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M15.5 16.49V16.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        Serviços oferecidos:</p>
                </div>
                <div className="mb-4 flex justify-end float-right">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 rounded-lg" onClick={() => setShowAddForm(true)}>
                        <svg className="inline mr-1 pb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                            <path d="M12 8V16M16 12L8 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" stroke-width="2" />
                        </svg>
                        Adicionar serviços
                    </button>
                </div>
            </div>
            {showAddForm ? (
                <div className="p-5 w-full">
                    <div className="mt-10 pt-6 w-full">
                        <p className="font-semibold text-gray-500 mb-4">
                            <svg className="inline mr-1 pb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#6b7280" fill="none">
                                <path d="M12 8V16M16 12L8 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" stroke-width="2" />
                            </svg>
                            Adicionar serviço:
                        </p>
                        <div className="ml-2">
                            <p className="pb-1 font-normal text-gray-500">Título do serviço:</p>
                            <input className="w-full mb-4 border p-3 rounded-lg" value={newService.title} onChange={(e) => setNewService({ ...newService, title: e.target.value })} placeholder="Lavagem Detalhada" />
                            <p className="pb-1 font-normal text-gray-500">Preço em Reais:</p>
                            <input className="w-full mb-4 border p-3 rounded-lg" value={newService.value} onChange={(e) => setNewService({ ...newService, value: e.target.value })} placeholder="200" />
                            <p className="pb-1 font-normal text-gray-500">Duração em minutos:</p>
                            <input className="w-full mb-4 border p-3 rounded-lg" value={newService.time} onChange={(e) => setNewService({ ...newService, time: e.target.value })} placeholder="240" />
                        </div>
                    </div>
                    <p className="pb-1 ml-2 font-normal text-gray-500">Descrição do serviço:</p>
                    <input className="ml-2 text-wrap w-full border p-3 pb-8 rounded-lg" value={newService.description} onChange={(e) => setNewService({ ...newService, description: e.target.value })} placeholder="Lavagem detalhada utilizando os melhores produtos..." />
                    <div className="flex justify-center mt-6 w-full">
                        <button className="bg-gray-400 hover:bg-gray-600 text-white py-2 px-4 rounded-lg" onClick={() => setShowAddForm(false)}>Cancelar</button>
                        <button className="ml-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={handleAddService}>Adicionar serviço</button>
                    </div>
                </div>
            ) : (
                <></>
            )}
            {services.length > 0 ? (
                services.map((service) => (
                    <div key={service.id} className="border-b border-gray-200">
                        <button className="flex items-center justify-between w-full md:p-5 py-4 px-0 font-medium text-gray-500 hover:bg-gray-100 rounded-t-lg" onClick={() => toggleExpand(service.id)}>
                            <h3 className="font-bold text-left">{service.title}</h3>
                            <div className='flex items-center text-left'>
                                <p>R$ </p>
                                <p className='mr-2'>{service.value}.00</p>
                                <button className="p-2 hover:bg-gray-300 rounded-lg mr-1" onClick={(e) => {
                                    e.stopPropagation();
                                    setEditingService(prev => (prev && prev.id === service.id ? null : service));
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#6b7280" fill="none">
                                        <path d="M16.2141 4.98239L17.6158 3.58063C18.39 2.80646 19.6452 2.80646 20.4194 3.58063C21.1935 4.3548 21.1935 5.60998 20.4194 6.38415L19.0176 7.78591M16.2141 4.98239L10.9802 10.2163C9.93493 11.2616 9.41226 11.7842 9.05637 12.4211C8.70047 13.058 8.3424 14.5619 8 16C9.43809 15.6576 10.942 15.2995 11.5789 14.9436C12.2158 14.5877 12.7384 14.0651 13.7837 13.0198L19.0176 7.78591M16.2141 4.98239L19.0176 7.78591" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    </svg>
                                </button>
                                <button className="p-2 hover:bg-gray-300 rounded-lg mr-1" onClick={(e) => { e.stopPropagation(); handleDeleteService(service.id); }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#6b7280" fill="none">
                                        <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                        <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                        <path d="M9.5 16.5L9.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                        <path d="M14.5 16.5L14.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    </svg>

                                </button>
                                <div className="p-2 hover:bg-gray-300 rounded-lg">
                                    <svg className={`w-5 h-5 transform transition-transform ${expandedId === service.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </div>
                            </div>
                        </button>
                        {expandedId === service.id && (
                            <div className="p-5 pb-4">
                                <p className="pb-2 font-normal text-gray-500">
                                    <svg className="inline mr-1 pb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#6b7280" fill="none">
                                        <path d="M3 3H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M8 9H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M3 15H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M8 21H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    Descrição do serviço:</p>
                                <p className="pb-4 pl-2 font-normal text-gray-700">{service.description}</p>
                                <p className="py-1 font-normal text-gray-500">
                                    <svg className="inline mr-1 pb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#6b7280" fill="none">
                                        <path d="M19 2V5C19 8.86599 15.866 12 12 12M5 2V5C5 8.86599 8.13401 12 12 12M12 12C15.866 12 19 15.134 19 19V22M12 12C8.13401 12 5 15.134 5 19V22" stroke="currentColor" stroke-width="1.5" />
                                        <path d="M4 2H20M20 22H4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    </svg>
                                    Duração em minutos:</p>
                                <p className="pb-2 pl-2 font-normal text-gray-700">{service.time} minutos</p>
                            </div>
                        )}
                        {editingService && editingService.id === service.id && (
                            <div className="px-6">
                                <div className="pt-5 w-full">
                                    <p className="font-semibold text-gray-500 mb-4">
                                        <svg className="inline mr-2 pb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#6b7280" fill="none">
                                            <path d="M16.2141 4.98239L17.6158 3.58063C18.39 2.80646 19.6452 2.80646 20.4194 3.58063C21.1935 4.3548 21.1935 5.60998 20.4194 6.38415L19.0176 7.78591M16.2141 4.98239L10.9802 10.2163C9.93493 11.2616 9.41226 11.7842 9.05637 12.4211C8.70047 13.058 8.3424 14.5619 8 16C9.43809 15.6576 10.942 15.2995 11.5789 14.9436C12.2158 14.5877 12.7384 14.0651 13.7837 13.0198L19.0176 7.78591M16.2141 4.98239L19.0176 7.78591" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                        </svg>
                                        Editar serviço:
                                    </p>
                                    <p className="pb-1 font-normal text-gray-500">Título do serviço:</p>
                                    <input className="w-full mb-4 border p-3 rounded-lg" value={editingService.title} onChange={(e) => setEditingService({ ...editingService, title: e.target.value })} placeholder="Lavagem Detalhada" />
                                    <p className="pb-1 font-normal text-gray-500">Preço em Reais:</p>
                                    <input className="w-full mb-4 border p-3 rounded-lg" value={editingService.value} onChange={(e) => setEditingService({ ...editingService, value: e.target.value })} placeholder="200" />
                                    <p className="pb-1 font-normal text-gray-500">Duração em minutos:</p>
                                    <input className="w-full mb-4 border p-3 rounded-lg" value={editingService.time} onChange={(e) => setEditingService({ ...editingService, time: e.target.value })} placeholder="240" />

                                </div>
                                <p className="pb-1 font-normal text-gray-500">Descrição do serviço:</p>
                                <input className="text-wrap w-full border p-3 pb-8 rounded-lg" value={editingService.description} onChange={(e) => setEditingService({ ...editingService, description: e.target.value })} placeholder="Lavagem detalhada utilizando os melhores produtos..." />
                                <div className="flex justify-center mt-6 mb-6 w-full">
                                    <button className="bg-gray-400 hover:bg-gray-600 text-white py-2 px-4 rounded-lg" onClick={() => setEditingService(null)}>Cancelar</button>
                                    <button className="ml-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={() => handleUpdateService(service.id)}>Salvar serviço</button>
                                </div>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <div className="w-full mt-10 p-8 flex-row justify-items-center">
                    <svg className="justify-items-center w-full mt-10 mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" color="#D1D5DB" fill="none">
                        <path d="M2.5 12L4.5 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M21.5 12.5L19.5 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M8 17.5L8.24567 16.8858C8.61101 15.9725 8.79368 15.5158 9.17461 15.2579C9.55553 15 10.0474 15 11.0311 15H12.9689C13.9526 15 14.4445 15 14.8254 15.2579C15.2063 15.5158 15.389 15.9725 15.7543 16.8858L16 17.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M2 17V19.882C2 20.2607 2.24075 20.607 2.62188 20.7764C2.86918 20.8863 3.10538 21 3.39058 21H5.10942C5.39462 21 5.63082 20.8863 5.87812 20.7764C6.25925 20.607 6.5 20.2607 6.5 19.882V18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M17.5 18V19.882C17.5 20.2607 17.7408 20.607 18.1219 20.7764C18.3692 20.8863 18.6054 21 18.8906 21H20.6094C20.8946 21 21.1308 20.8863 21.3781 20.7764C21.7592 20.607 22 20.2607 22 19.882V17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M20 8.5L21 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M4 8.5L3 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M4.5 9L5.5883 5.73509C6.02832 4.41505 6.24832 3.75503 6.7721 3.37752C7.29587 3 7.99159 3 9.38304 3H14.617C16.0084 3 16.7041 3 17.2279 3.37752C17.7517 3.75503 17.9717 4.41505 18.4117 5.73509L19.5 9" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                        <path d="M4.5 9H19.5C20.4572 10.0135 22 11.4249 22 12.9996V16.4702C22 17.0407 21.6205 17.5208 21.1168 17.5875L18 18H6L2.88316 17.5875C2.37955 17.5208 2 17.0407 2 16.4702V12.9996C2 11.4249 3.54279 10.0135 4.5 9Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                    </svg>
                    <p className=" justify-items-center mt-4 w-full text-gray-400 font-semibold text-center">Nenhum serviço adicionado. Adicione agora!</p>
                </div>

            )}


        </div>
    );
}
