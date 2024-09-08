import { ModeToggle } from '@/components/mode-toggle'
import { NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu'
import { NavigationMenu } from '@/components/ui/navigation-menu'
import { BellIcon, CircleUserRoundIcon, CompassIcon, FilmIcon, HeartIcon, HomeIcon, MessageCircleMoreIcon, Search, SearchIcon, SquarePlusIcon } from 'lucide-react'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <NavigationMenu>
            <ModeToggle/>
        <NavigationMenuList className="flex flex-col items-start">
            <div>
            <NavigationMenuItem>
                <NavLink to="/">
                <NavigationMenuLink className='flex gap-3'>
                    <HomeIcon/>
                    Home
                </NavigationMenuLink>
                </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
            <NavLink to="#">
                <NavigationMenuLink className='flex gap-3'>
                    <SearchIcon/>
                    Search
                </NavigationMenuLink>
                </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavLink to="/">
                <NavigationMenuLink className='flex gap-3'>
                    <CompassIcon/>
                    Explore
                </NavigationMenuLink>
                </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavLink to="/">
                <NavigationMenuLink className='flex gap-3'> 
                    <FilmIcon/>
                    Reels
                </NavigationMenuLink>
                </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavLink to="/">
                <NavigationMenuLink className='flex gap-3'>
                    <MessageCircleMoreIcon/>
                    Messages
                </NavigationMenuLink>
                </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
            <NavLink to="/">
                <NavigationMenuLink className='flex gap-3'>
                    <HeartIcon/>
                    Notification
                </NavigationMenuLink>
                </NavLink>
            </NavigationMenuItem>
            <NavLink to="#">
                <NavigationMenuLink className='flex gap-3'>
                    <SquarePlusIcon/>
                    Create
                </NavigationMenuLink>
            </NavLink>
            <NavigationMenuItem >
                <NavLink to="/">
                <NavigationMenuLink className='flex gap-3'>
                    <CircleUserRoundIcon/>
                    Profile
                </NavigationMenuLink>
                </NavLink>
            </NavigationMenuItem>
            </div>
        </NavigationMenuList>
    </NavigationMenu>
  )
}

export default Navbar