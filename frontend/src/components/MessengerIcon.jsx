import { MessageCircleMoreIcon } from 'lucide-react'
import React from 'react'

const MessengerIcon = ({number = "9+"}) => {
  return (
    <div className='relative'>
    {number && <div className='absolute top-0 right-0 bg-red-500 flex justify-center items-center rounded-full h-[50%] w-[50%] text-[50%]'>
        {number}
    </div>}
    <MessageCircleMoreIcon/>
</div>

  )
}

export default MessengerIcon