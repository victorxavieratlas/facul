'use client';

import { useState } from 'react';
import Image from 'next/image';
import SkeletonProfileImage from '../components/SkeletonProfileImage';

interface ProfileImageProps {
    src: string;
    alt: string;
}

const ProfileImage = ({ src, alt }: ProfileImageProps) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            {isLoading && (
                <div>
                    <SkeletonProfileImage className="h-64 sm:h-96 w-full rounded-t-lg" />
                </div>
            )}
            <Image
                className={`object-cover max-h-96 rounded-t-lg transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                src={src}
                alt={alt}
                layout="responsive"
                width={800}
                height={600}
                // sizes="(max-width: 768px) 100vw, 800px"
                onLoadingComplete={() => setIsLoading(false)}
            />
        </>
    );
};

export default ProfileImage;
