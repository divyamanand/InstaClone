import React from 'react'
import { Button } from '@/components/ui/button'
import { BadgeCheckIcon, CircleUserRoundIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

function Profile({ username, description=false, switchProfile, verified = true }) {
  return (
    <div className="inline-flex items-center">
      <div className="flex mr-2 items-center">
        <Link to="#">
          <CircleUserRoundIcon />
        </Link>
      </div>
      <div>
        <Link to="#">
          <div className="flex gap-1 items-center">
            <h4 className="scroll-m-20 text-sm font-semibold tracking-tight">
              {username}
            </h4>
            {verified && (
              <BadgeCheckIcon size={14} color="#004cff" />
            )}
          </div>
        </Link>
        {description && (
          <p className="text-sm text-muted-foreground">
            Followed by anandivyam
          </p>
        )}
      </div>
      {switchProfile && (
        <Button variant="link" className="hover:no-underline text-blue-400 hover:text-white">
          Switch
        </Button>
      )}
    </div>
  )
}

export default Profile
