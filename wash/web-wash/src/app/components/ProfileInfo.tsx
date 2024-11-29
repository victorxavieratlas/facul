import ProfileInfoSkeleton from './ProfileInfoSkeleton';

interface ProfileLocation {
    zone: { name: string };
    neighborhood: { name: string };
    address: string;
    addressNumber: string;
}

interface ProfileData {
    name: string;
    profileLocation: ProfileLocation[];
    startDay: string;
    finalDay: string;
    openHour: string;
    closeHour: string;
    minPrice: number;
    maxPrice: number;
}

interface ProfileInfoProps {
    profileData: ProfileData | null;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ profileData }) => {
    if (!profileData) {
        return <ProfileInfoSkeleton />;
    }

    return (
        <div>
            <h2 className="mb-3 text-2xl font-semibold text-gray-600">{profileData.name}</h2>
            {/* Localização */}
            {profileData.profileLocation && (
                <p className="text-sm text-gray-600 flex items-center mb-1.5">
                    <svg className="inline mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" color="#6b7280" fill="none">
                        <path d="M13.6177 21.367C13.1841 21.773 12.6044 22 12.0011 22C11.3978 22 10.8182 21.773 10.3845 21.367C6.41302 17.626 1.09076 13.4469 3.68627 7.37966C5.08963 4.09916 8.45834 2 12.0011 2C15.5439 2 18.9126 4.09916 20.316 7.37966C22.9082 13.4393 17.599 17.6389 13.6177 21.367Z" stroke="currentColor" stroke-width="1.5" />
                        <path d="M15.5 11C15.5 12.933 13.933 14.5 12 14.5C10.067 14.5 8.5 12.933 8.5 11C8.5 9.067 10.067 7.5 12 7.5C13.933 7.5 15.5 9.067 15.5 11Z" stroke="currentColor" stroke-width="1.5" />
                    </svg>
                    Zona {profileData.profileLocation[0].zone.name}, {profileData.profileLocation[0].neighborhood.name} - {profileData.profileLocation[0].address}, {profileData.profileLocation[0].addressNumber}
                </p>
            )}

            {/* Dias e Horários de Funcionamento */}
            <p className="text-sm text-gray-600 flex items-center mb-1.5">
                <svg className="inline mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" color="#6b7280" fill="none">
                    <path d="M17 2V5M7 2V5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M13 3.5H11C7.22876 3.5 5.34315 3.5 4.17157 4.67157C3 5.84315 3 7.72876 3 11.5V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V11.5C21 7.72876 21 5.84315 19.8284 4.67157C18.6569 3.5 16.7712 3.5 13 3.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M3.5 8.5H20.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M9 15.5C9 15.5 10.5 16 11 17.5C11 17.5 13.1765 13.5 16 12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                {profileData.startDay} - {profileData.finalDay}
            </p>
            <p className="text-sm text-gray-600 flex items-center mb-3">
                <svg className="inline mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" color="#6b7280" fill="none">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C7.52232 2 3.77426 4.94289 2.5 9H5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M12 8V12L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M2 12C2 12.3373 2.0152 12.6709 2.04494 13M9 22C8.6584 21.8876 8.32471 21.7564 8 21.6078M3.20939 17C3.01655 16.6284 2.84453 16.2433 2.69497 15.8462M4.83122 19.3065C5.1369 19.6358 5.46306 19.9441 5.80755 20.2292" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                {profileData.openHour}h - {profileData.closeHour}h
            </p>

            {/* Preço */}
            <p className="text-md text-gray-700 flex items-center my-4">
                <span className="font-semibold text-md mr-1">
                    R${profileData.minPrice} - R${profileData.maxPrice}
                </span>
                serviços
            </p>
        </div>
    );
};

export default ProfileInfo;
