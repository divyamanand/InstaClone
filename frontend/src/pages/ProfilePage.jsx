import React from 'react'
import { Grid } from '@radix-ui/themes';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import Story from '@/features/Story';



function Posts({posts = []}) {
  return (
    <Grid columns="3" rows={1}>
      
    </Grid>
  )
}



const Highlights = () => {
  return (
    <div className='flex justify-between w-4/5'>
      <Story size={16}/>
      <Story size={16}/>
      <Story size={16}/>
      <Story size={16}/>
      <Story size={16}/>
      <Story size={16}/>  
      
    </div>
    
  )
}



function ProfilePage() {
  return (
    <>
    <div className='w-fit flex flex-col gap-5'>
    <div className='flex gap-16'>
    <Avatar className = "w-36 h-36">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className='flex flex-col gap-4 w-fit'>

          <div className='flex gap-4 items-center '>
            <h5>anandivyam</h5>

            <div className='flex gap-2 items-center'>
              <Button  variant="secondary" size="sm" className="font-bold">Edit Profile</Button>
              <Button  variant="secondary" size="sm" className="font-bold">View archive</Button>
              <Settings size={25}/>
            </div>
            
        </div>
          

          <div className='text-sm flex justify-between w-4/5'>
          <h6> <span className='font-semibold'> 11</span> posts</h6>
          <h6><span className='font-semibold'> 11</span> followers</h6>
          <h6><span className='font-semibold'> 11</span> following</h6>
          </div>

        <div>
        <h6 className='font-semibold text-sm'>Divyam Anand</h6>
        <p className='text-xs w-1/2'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius, architecto?
        </p>
        </div>
        
      </div>
    </div>
      <Highlights/>
    </div>

      
    </>
  )
}

export default ProfilePage