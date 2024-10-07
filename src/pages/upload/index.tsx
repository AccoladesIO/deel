import Layout from '@/components/ui/layout/Layout'
import React, { useContext, useState } from 'react'
import { CiCloud, CiCloudOn } from 'react-icons/ci';
import { Context } from '../../../context/context';
import { useUser } from '@clerk/nextjs';
import Image from 'next/legacy/image';
import { useRouter } from 'next/router';
import { formatFileSize } from '@/constants/constants';
import { BiCloudUpload } from 'react-icons/bi';


const Upload = () => {
    const { user } = useUser()
    const route = useRouter()
    const handleBack = () => {
        route.back()
    }
    // console.log(user)
    const [files, setFiles] = useState(true)
    const { customData, setCustomData, handleSubmit, error, progress } = useContext(Context)
    return (
        <Layout active='Upload'>
            <div className='w-full p-4'>
                <h1 className='w-full text-left text-xl text-blue-700'>| Upload</h1>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 p-4">
                {progress === 100 ?
                    (
                        <div className='w=full p-4'>
                            <h2 className='text-base w-full text-left text-blue-700 font-bold' onClick={handleBack}>Back</h2> <hr />
                            <h1 className='w-full text-center p-3 text-3xl z-10'>Hurray!! File upload successful</h1>
                            <div className='w-full sm:w-[500px] mx-auto relative h-[400px]'>
                                <Image layout='fill' src={`https://cdn.dribbble.com/users/21546/screenshots/2257867/media/2b85d36541d86816f3f23f0dda65c657.gif`} alt=' ' />
                            </div>
                        </div>
                    ) :
                    (
                        <form onSubmit={handleSubmit} className='w-full'>
                            <label className="flex flex-col items-center justify-center text-sm text-[#0f0f0f] cursor-pointer sm:w-[70%] w-full mx-auto  h-[400px] border border-dashed border-spacing-2 border-blue-500 p-3 outline-none focus:border-[#93bde0] font-light">
                                {/* <div className="w-24 h-24 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center relative">
                                    <Image className="has-mask h-36 object-center" layout='fill' objectFit='cover' src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg" alt="freepik image" />
                                </div> */}
                                <BiCloudUpload size={50} style={{ color: 'blue' }} />
                                <div className="text-blue-700 font-light text-base">
                                    {customData.file ? (
                                        <p className='text-center font-bold text-base'>
                                            Selected file: {customData?.file?.name}{" "} <br />
                                            <span className="text-[#0f0f0f] font-semibold">
                                                {formatFileSize(customData?.file?.size)} {' '} {customData?.file?.type}
                                            </span> <br />
                                            <span className='text-red-600 cursor-pointer' onClick={(e) => {
                                                e.stopPropagation(); // Prevents event bubbling
                                                if (window.confirm("Clear selected file?")) {
                                                    setCustomData({}); // Reset customData
                                                }
                                            }}>Clear</span>
                                        </p>
                                    ) : (
                                        <p>
                                            Click to upload{" "}
                                            <span className="text-[#0f0f0f] font-semibold">
                                                or drag and drop (Max size = 2MB)
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
                                        console.log(files)
                                        if (files && files.length > 0) {
                                            setCustomData({ name: user?.fullName, email: user?.primaryEmailAddress?.emailAddress, file: files[0] });
                                            setFiles(false)
                                        }
                                    }}
                                />
                                {progress > 0 ?
                                    (
                                        <div className='w-[200px] mx-auto my-2 bg-gray-400 h-3 rounded-3xl text-center'>
                                            <div className={`h-3 bg-blue-700 rounded-3xl`} style={{ width: `${progress}%` }} >
                                            </div>
                                            <p className='text-black font-semibold'>{Number(progress).toFixed(0)}%</p>
                                        </div>
                                    ) : null
                                }

                                <div className="w-full text-center flex items-center justify-center py-4">
                                    <input
                                        type="submit"
                                        value="Upload"
                                        disabled={files}
                                        className="px-[16px] outline-none border border-blue-500 disabled:bg-slate-400 disabled:text-slate-200 disabled:border-none py-3 text-blue-700 hover:text-white ease-in-out duration-500 transition-all rounded-lg font-bold"
                                    />
                                </div>

                            </label>
                        </form>
                    )
                }
            </div>
        </Layout>
    )
}

export default Upload
