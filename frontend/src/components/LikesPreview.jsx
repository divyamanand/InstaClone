import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { CircleUserRoundIcon } from 'lucide-react'

function LikesPreview({likesCount = 200}) {
  const avatars = [
    "https://github.com/shadcn.png",
    "https://github.com/shadcn.png",
    "https://github.com/shadcn.png"
  ];

  return (
    <div className='flex items-center'>
      {avatars.map((src, index) => (
        <div
          key={index}
          className={`w-[15px] h-[15px] rounded-full relative ${index !== 0 ? '-ml-[6px]' : ''} outline outline-background`}
        >
          <Avatar>
            <AvatarImage src={src} className='rounded-full' />
            <AvatarFallback>
              <CircleUserRoundIcon className='rounded-full bg-muted w-[12px] h-[12px]' />
            </AvatarFallback>
          </Avatar>
        </div>
      ))}
    <h4 className='font-semibold ml-[4px]'> {likesCount} likes</h4>
    </div>
  );
}

export default LikesPreview;
