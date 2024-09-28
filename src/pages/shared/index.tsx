import Layout from '@/components/ui/layout/Layout'
import React, { useContext } from 'react'
import { Context } from '../../../context/context'
import { formatFileSize } from '@/constants/constants'

const shared = () => {
  const { favourites, deleteBookmark } = useContext(Context)
  return (
    <Layout active='Shared'>
      <div className='w-full p-4'>
        <h1 className='w-full text-left text-xl text-blue-700'>| Shared</h1>
      </div>
      <div className='w-full'>
        {/* Shared */}
        <div className='w-full p-4'>
          <h1 className='w-full text-center p-3 text-3xl z-10'>Favourite</h1>
          <div className='flex items-center justify-between'>
            <div className='w-full p-2 text-bold'>File name</div>
            <div className='w-full p-2 text-bold'>File Type</div>
            <div className='w-full p-2 text-bold'>File Size</div>
            <div className='w-full p-2 text-bold'> </div>
          </div>
          {
            favourites.map((file: { id: any; data: { fileName: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; fileType: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; fileSize: number } }, index: any) => {
              return (
                <div key={file.id + index} className='p-2 my-1 w-full' style={{ backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#90caf9', }}>
                  <div className='flex items-center justify-between'>
                    <div className='w-full p-2 text-bold'>{file.data.fileName}</div>
                    <div className='w-full p-2 text-bold'>{file.data.fileType}</div>
                    <div className='w-full p-2 text-bold'>{formatFileSize(file.data.fileSize)}</div>
                    <div className='w-full p-2 text-bold' onClick={() => deleteBookmark(index)}>Remove</div>

                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </Layout>
  )
}

export default shared
