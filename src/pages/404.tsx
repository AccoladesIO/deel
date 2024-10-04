import Link from 'next/link'
import React from 'react'

const Custom404 = () => {
    return (
        <section className="w-full flex items-center h-full p-16 dark:bg-gray-50 dark:text-gray-800">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="max-w-md text-center">
                    <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-400 text-blue-600 relative">
                        <span className="sr-only">Error</span>404
                    </h2>
                    <p className="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
                    <p className="mt-4 mb-8 dark:text-gray-600">But dont worry, you can find plenty of other things on our homepage.</p>
                    <Link href="/" className="px-8 py-3 font-semibold rounded dark:bg-violet-600 dark:text-gray-50 bg-blue-600 text-white">Back to homepage</Link>
                </div>
            </div>
        </section>
    )
}

export default Custom404
