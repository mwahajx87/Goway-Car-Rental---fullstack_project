import React, { useEffect, useState } from 'react'
import { assets, ownerMenuLinks } from '../../assets/assets'
import { NavLink, useLocation } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Sidebar = () => {

    const { user, axios, fetchUser } = useAppContext();
    const location = useLocation();
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        if (!image) return;
        const objectUrl = URL.createObjectURL(image);
        setPreviewUrl(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [image]);

    const updateImage = async () => {
        if (!image) return;

        try {
            const formData = new FormData();
            formData.append('image', image);

            const { data } = await axios.post('/api/owner/update-image', formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            if (data.success) {
                fetchUser();
                toast.success(data.message || "Image updated successfully");
                setImage(null);
            } else {
                toast.error(data.message || "Failed to update image");
            }

        } catch (error) {
            toast.error(error?.response?.data?.message || "Error updating image");
        }
    };

    return (
        <div className='relative min-h-screen md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-bordercolor text-sm'>

            <div className='group relative'>
                <label htmlFor="image">

                    <img
                        className='h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto relative'
                        src={
                            previewUrl ||
                            user?.image ||
                            "https://t4.ftcdn.net/jpg/08/58/51/05/360_F_858510556_HSGNbjxLHjKTC5QM18V5BR7ZFLFRNk5j.jpg"
                        }
                        alt=""
                    />

                    <input
                        type="file"
                        id='image'
                        accept='image/*'
                        hidden
                        onChange={e => setImage(e.target.files[0])}
                    />

                    <div className='absolute hidden top-0 right-0 left-0 bottom-0 bg-black/10 rounded-full group-hover:flex items-center justify-center cursor-pointer'>
                        <img src={assets.edit_icon} alt="" />
                    </div>
                </label>
            </div>

            {image && (
                <button
                    className='absolute top-0 right-0 flex p-2 gap-1 bg-primary/10 text-primary cursor-pointer'
                    onClick={updateImage}
                >
                    Save
                    <img src={assets.check_icon} width={13} alt="" />
                </button>
            )}

            <p className='mt-2 text-base max-md:hidden'>{user?.name}</p>

            <div className='w-full'>
                {ownerMenuLinks.map((link, index) => (
                    <NavLink
                        key={index}
                        to={link.path}
                        className={`relative flex items-center gap-2 w-full py-3 pl-4 first:mt-6 ${
                            link.path === location.pathname
                                ? 'bg-primary/10 text-primary'
                                : 'text-gray-600'
                        }`}
                    >
                        <img
                            src={link.path === location.pathname ? link.coloredIcon : link.icon}
                            alt={link.name}
                        />
                        <span className='max-md:hidden'>{link.name}</span>

                        {link.path === location.pathname && (
                            <div className="bg-primary w-1.5 h-8 rounded-l right-0 absolute"></div>
                        )}
                    </NavLink>
                ))}
            </div>

        </div>
    );
};

export default Sidebar