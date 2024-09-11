import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { CircleUserRoundIcon } from 'lucide-react'
import React from 'react'

function Story({
  story=false, 
  size=5, 
  content = "https://github.com/shadcn.png",
  text = "anandivyam"
}) {

  return (
    <div>
    <div className={`${story ? 'from-yellow-500 via-pink-500 to-red-500' : 'from-gray-500 to-gray-600'} p-[2px] bg-gradient-to-r rounded-full w-fit`}>
      <div className={`w-${size} h-${size} p-[2px] bg-background rounded-full`}>
        <Avatar>
          <AvatarImage src={content} className='rounded-full'/>
          <AvatarFallback><CircleUserRoundIcon className='rounded-full bg-muted'/></AvatarFallback>
        </Avatar>
      </div>
    </div>
    <h6 className='text-xs mt-1 flex justify-center items-center'>{text}</h6>
    </div>

  )
}

export default Story;
