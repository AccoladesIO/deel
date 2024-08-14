import Layout from '@/components/ui/layout/Layout'
import React, { useContext } from 'react'
import { CiCloud, CiCloudOn } from 'react-icons/ci';
import { Context } from '../../../context/context';

const Upload = () => {
    const { formatFileSize, customData, setCustomData, handleSubmit, error } = useContext(Context)
    return (
        <Layout active='Upload'>
            <div className='w-full p-4'>
                <h1 className='w-full text-left text-xl text-blue-700'>| Upload</h1>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 p-4">
                <form onSubmit={handleSubmit} className='w-full'>
                    <label className="flex flex-col items-center justify-center text-sm text-[#0f0f0f] cursor-pointer sm:w-[70%] w-full mx-auto  h-[400px] border border-dashed border-spacing-2 border-blue-500 p-3 outline-none focus:border-[#93bde0] font-light">
                        <div className="w-16 h-16 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center">
                            <CiCloud size={20} />
                        </div>
                        <div className="text-blue-700 font-light text-base">
                            {customData.file ? (
                                <p>
                                    Selected file: {customData?.file?.name}{" "}
                                    <span className="text-[#0f0f0f] font-semibold">
                                        {formatFileSize(customData?.file?.size)}
                                    </span>
                                </p>
                            ) : (
                                <p>
                                    Click to upload{" "}
                                    <span className="text-[#0f0f0f] font-semibold">
                                        or drag and drop
                                    </span>
                                </p>
                            )}
                            {error && <p className='w-full text-red-500 text-base font-bold text-center'>{error} </p>}
                            {/* Click to upload{" "} */}
                        </div>
                        <input
                            type="file"
                            name="file"
                            id="fileUpload"
                            className="w-full hidden"
                            onChange={(e) => {
                                const files = e?.target?.files;
                                if (files && files.length > 0) {
                                    setCustomData({ ...customData, file: files[0] });
                                }
                            }}
                        />
                        <div className="w-full text-center flex items-center justify-center py-4">
                            <input
                                type="submit"
                                value="Upload"
                                className="px-[16px] outline-none border border-blue-500 py-3 hover:bg-blue-700 text-blue-700 hover:text-white ease-in-out duration-500 transition-all rounded-lg font-bold"
                            />
                        </div>
                    </label>
                </form>
            </div>
        </Layout>
    )
}

export default Upload
