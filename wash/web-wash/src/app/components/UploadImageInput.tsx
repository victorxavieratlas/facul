import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineUpload } from 'react-icons/ai';

export default function ImageUpload() {
  const { register, setValue } = useForm();
  const [image, setImage] = useState<string | null>(null);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setValue('image', file); // Set the file in the form data
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full mb-10">
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
            onChange: handleImageUpload // Mova o onChange para o register
          })}
        />
      </label>
      {image && (
        <div className="mt-4 w-full h-64 flex items-center justify-center">
          <img src={image} alt="Preview" className="max-h-full max-w-full rounded-lg shadow-lg" />
        </div>
      )}
    </div>
  );
}
