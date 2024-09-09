import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { CircleUserRoundIcon } from 'lucide-react'
import React from 'react'

function Story() {
  return (
    <div className='p-[2px] bg-gradient-to-r from-yellow-500 via-pink-500 to-red-500 rounded-full w-fit'>
    <div className='p-[2px] bg-background rounded-full'>
    <Avatar>
    <AvatarImage src="https://github.com/shadcn.png" className='rounded-full'/>
    <AvatarFallback><CircleUserRoundIcon className='rounded-full bg-muted'/></AvatarFallback>
    </Avatar>
    </div>
    </div>
  )
}

export default Story