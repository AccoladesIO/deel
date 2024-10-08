import Layout from '@/components/ui/layout/Layout'
import React, { useContext } from 'react'
import { Context } from '../../../context/context'
import { formatFileSize } from '@/constants/constants'
import Image from 'next/legacy/image'

const Shared = () => {
  const { favourites, deleteBookmark } = useContext(Context)
  return (
    <Layout active='Starred'>
      <div className='w-full p-4'>
        <h1 className='w-full text-left text-xl text-blue-700'>| Shared</h1>
      </div>
      {favourites.length !== 0 ?
        (
          <div className='w-full'>
            {/* Shared */}
            <div className='w-full p-4'>
              <h1 className='w-full text-center p-3 text-3xl z-10'>Favourite</h1>
              <div className='flex items-center justify-between'>
                <div className='w-full p-2 text-bold'>File name</div>
                <div className='w-full p-2 text-bold hidden sm:block'>File Type</div>
                <div className='w-full p-2 text-bold'>File Size</div>
                <div className='w-full p-2 text-bold'> </div>
              </div>
              {
                favourites.map((file: { id: any; data: { fileName: string; fileType: string; fileSize: number } }, index: any) => {
                  return (
                    <div key={file.id + index} className='p-2 my-1 w-full' style={{ backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#90caf9', }}>
                      <div className='flex items-center justify-between cursor-pointer'>
                        <div className='w-full p-2 text-bold'>
                          {file?.data?.fileName?.length > 10 ? `${(file.data.fileName as string).substring(0, 10)}...` : file.data.fileName}
                        </div>
                        <div className='w-full p-2 text-bold hidden sm:block'>{file?.data?.fileType}</div>
                        <div className='w-full p-2 text-bold'>{formatFileSize(file?.data?.fileSize)}</div>
                        <div className='w-full p-2 text-bold' onClick={() => deleteBookmark(index)}>Remove</div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        ) :
        (
          <div className='w=full p-4'>
            <h1 className='w-full text-center p-3 text-3xl z-10'>Nothing to see here</h1>
            <div className='w-full sm:w-[500px] mx-auto relative h-[400px]'>
              <Image layout='fill' src={`https://cdn.dribbble.com/users/237814/screenshots/6801457/untitled-1.gif`} alt=' ' />
            </div>
          </div>
        )
      }
    </Layout>
  )
}

export default Shared
