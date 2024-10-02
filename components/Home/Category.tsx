import { getCategories } from '@/Request/Request'
import React from 'react'

const Category = async () => {
    const categories:string[] = await getCategories();

    console.log(categories);
    
  return (
    <div className='pt-16 pb-12'>
        <h1 className='text-center text-2xl font-bold capitalize'>Shop By Category</h1>
        {/* categories */}
        <div className="mt-12 w-4/5 mx-auto grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {
                categories.map((category) => {
                    return <div key={category} className="p-6 rounded-lg cursor-pointer text-center hover:scale-110 transition-all duration-300 bg-gray-200 shadow-md">
                        <h1 className='text-sm sm:text-lg lg:text-xl capitalize font-bold'>{category}</h1>
                    </div>
                })
            }
        </div>
    </div>
  )
}

export default Category