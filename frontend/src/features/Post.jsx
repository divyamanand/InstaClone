import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import React, { useState } from 'react'
import Profile from './Profile'
import { BookmarkIcon, DotIcon, EllipsisIcon, HeartIcon, MessageCircleIcon, SendIcon, SmileIcon } from 'lucide-react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { Button } from '@/components/ui/button'
import FollowersPreview from '@/components/LikesPreview'
import LikesPreview from '@/components/LikesPreview'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Emojis from '@/components/Emojis'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import EmojiPicker from 'emoji-picker-react'
import { useTheme } from '@/components/theme-provider'


function Post({
  username,
  timestamp,
  profile,
  posts,
  likes,
  description = "nskjfnskdjnfjknfjksdnjkkjn",
  comments
})
{
  const [substring, setSubstring] = useState(description.slice(0,70)) 
  const [menu, setMenu] = useState([
    {button: "Report", link: "/"},
    {button: "Unfollow", link: "/"},
    {button: "Add to favorites", link: "/"},
    {button: "Go to post", link: "/"},
    {button: "Share to...", link: "/"},
    {button: "Copy link", link: "/"},
    {button: "Embed", link: "/"},
    {button: "About this account", link: "/"},
    {button: "Cancel", link: "/"}
  ])

  const {theme} = useTheme()

  return (
    <Card className="w-fit border-y">
        <CardHeader>
            <div className='flex'>
                <Profile username={"anandivyam"}/>
                <div className='flex text-muted-foreground items-center'>
                <DotIcon/>
                <h6 >1h</h6>
                </div>
                <div className='w-full flex justify-end'>
                <Dialog>
                <DialogTrigger><Button variant="link">
                <EllipsisIcon/>
                </Button></DialogTrigger>
                <DialogContent className="m-0 p-0 gap-0 w-fit overflow-hidden">
                {menu.map((button, index) => (
                  <Button
                    key={index}
                    variant="secondary"
                    className="rounded-none px-[100px] text-xs border border-zinc-700"
                  >
                    {button.button}
                  </Button>
                ))}
              </DialogContent>
                </Dialog>
                </div>
            </div>
        </CardHeader>
        <CardContent>
        <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} onClick={() => null}>
            <div className="p-1">
              <Card className="border">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
        </CardContent>
        <CardFooter>
        <div className='flex flex-col space-y-2'>
          <div className='flex justify-between'>
            <div className='flex space-x-2'>
              <button><HeartIcon/></button>
              <button><MessageCircleIcon className='transform rotate-[270deg]' /></button>
              <button><SendIcon/></button>
            </div>
            <div>
              <BookmarkIcon />
            </div>
          </div>
          <div>
            <LikesPreview />
          </div>
          <div className='flex gap-2'>
          <p className='text-xs max-w-xs break-words'>
            <span className='font-semibold mr-2'>anandivyam</span> 
            {substring !== description ? (
              <>
                {substring + "..."}
                <button
                  variant="link" 
                  className="inline text-xs text-muted-foreground align-baseline px-1"
                  onClick={() => setSubstring(description)}>
                  more
                </button>
              </>
            ) : (
              description
            )}
          </p>
          </div>
          <button className='text-gray-400 text-xs flex justify-start w-fit' >View all 500 comments</button>
          <div className='flex text-muted-foreground text-xs'>
            <input
              type='text'
              className='bg-background outline-none w-full text-xs'
              placeholder='Add a comment...'
            />
            <Popover>
              <PopoverTrigger asChild>
                <button><SmileIcon size={14}/></button>
              </PopoverTrigger>
              <PopoverContent>
                <EmojiPicker theme={theme}/>
              </PopoverContent>
            </Popover>  
          </div>
        </div>
      </CardFooter>
    </Card> 
  )
}

export default Post
