import React from 'react'
import { Button } from '@/components/ui/button'
import { BadgeCheckIcon, CircleUserRound, CircleUserRoundIcon, User2Icon, UserIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

function Profile({username, description, switchProfile, verified = true }) {
  return (
    <>
    <div className='inline-flex'>
    <div className='flex mr-2 items-center'>
    <Link>
    <CircleUserRoundIcon/>
    </Link>
    </div>
    <div>
    <Link>
    <div className='flex gap-1'>
    <h4 className="scroll-m-20 text-sm font-semibold tracking-tight">
      {username}
    </h4>
    {verified && <div className='flex items-center'><BadgeCheckIcon size={14} color='#004cff'/></div>}
    </div>
    </Link>
    {description && <p className="text-sm text-muted-foreground">Followed by anandivyam</p>}
    </div>
    {switchProfile && <Button variant="link" className="hover:no-underline text text-blue-400 hover:text-white">Switch</Button>}
    </div>
    </>
  )
}

export default Profile