import { HeartIcon } from 'lucide-react'
import React from 'react'

const NotificationIcon = ({notification = false}) => {
  return (
    <div className='relative'>
        {notification && <div className='absolute top-0.5 right-0.5 bg-red-500 w-[20%] h-[20%] rounded-full'></div>}
        <HeartIcon/>
    </div>
  )
}

export default NotificationIcon