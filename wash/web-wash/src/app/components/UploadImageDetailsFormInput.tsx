import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineUpload } from 'react-icons/ai';

// Defina as props e suas tipagens
interface ImageUploadProps {
    setImageFile: (file: File | null) => void; // Tipagem para a função setImageFile
    initialImageURL?: string | null; // URL inicial da imagem (opcional)
}

export default function ImageUpload({ setImageFile, initialImageURL }: ImageUploadProps) {
    const { register, setValue } = useForm();
    const [previewImage, setPreviewImage] = useState<string | null>(null);


    useEffect(() => {
        // Se a URL inicial mudar, atualiza a pré-visualização
        if (initialImageURL) {
            setPreviewImage(initialImageURL);
        }
    }, [initialImageURL]);


    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file)); // Para mostrar a pré-visualização
            setImageFile(file); // Armazena o arquivo da imagem para upload
            setValue('image', file); // Set the file in the form data
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full mb-4">
            <label
                htmlFor="image"
                className="flex flex-col items-center justify-center w-full h-64 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 focus:outline-none transition duration-300 ease-in-out"
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <AiOutlineUpload className="w-12 h-12 text-gray-400 mb-4" />
                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Clique para fazer upload</span> ou arraste e solte</p>
                    <p className="text-xs text-gray-500">PNG, JPG (MAX. 800x400px)</p>
                </div>
                <input
                    id="image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    {...register('image', {
                        required: true,
                        onChange: handleImageUpload
                    })}
                />
            </label>
            {previewImage && (
                <div className="mt-8 w-full lg:h-90 flex items-center justify-center">
                    <img src={previewImage} alt="Preview" className="max-h-full max-w-full rounded-lg shadow-lg" />
                </div>
            )}
        </div>
    );
}
