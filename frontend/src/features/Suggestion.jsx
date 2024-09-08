import { Button } from '@/components/ui/button'
import { CircleUserRound, CircleUserRoundIcon, User2Icon, UserIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function Suggestion() {
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
    <h4 className="scroll-m-20 text-sm font-semibold tracking-tight">
      anandivyam
    </h4>
    </Link>
    <p className="text-sm text-muted-foreground">Followed by anandivyam</p>
    </div>
    <Button variant="link" className="hover:no-underline text text-blue-400 hover:text-white">Follow</Button>
    </div>
    </>
  )
}

export default Suggestion