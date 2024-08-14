import Layout from '@/components/ui/layout/Layout'
import React from 'react'
import Image from 'next/legacy/image'

const Notifications = () => {
    return (
        <Layout active={`Notification`}>
            <div className='w-full p-4'>
                <h1 className='w-full text-left text-xl text-blue-700'>| Notification</h1>
            </div>

            <h1 className='w-full text-center p-3 text-3xl z-10'>Nothing to see here</h1>
            <div className='w-full sm:w-[500px] mx-auto relative h-[400px]'>
                <Image layout='fill' src={`https://cdn.dribbble.com/users/37624/screenshots/3366123/media/44764f63a561425448da091ab5e62539.jpg?resize=800x600&vertical=center`} alt=' ' />
            </div>
        </Layout>
    )
}

export default Notifications
