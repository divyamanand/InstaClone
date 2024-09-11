import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { CircleUserRoundIcon } from 'lucide-react'
import React from 'react'

function Story({story=false, size=5}) {

  return (
    <div className={`${story ? 'from-yellow-500 via-pink-500 to-red-500' : 'from-gray-500 to-gray-600'} p-[2px] bg-gradient-to-r rounded-full w-fit`}>
      <div className={`w-${size} h-${size} p-[2px] bg-background rounded-full`}>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" className='rounded-full'/>
          <AvatarFallback><CircleUserRoundIcon className='rounded-full bg-muted'/></AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

export default Story;
