import { ModeToggle } from '@/components/mode-toggle'
import { NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu'
import { NavigationMenu } from '@/components/ui/navigation-menu'
import { BellIcon, CircleUserRoundIcon, CompassIcon, FilmIcon, HeartIcon, Home, HomeIcon, MessageCircleMoreIcon, Search, SearchIcon, SquarePlusIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

function Navbar() {

    const [menu, setMenu] = useState([
        {icon: <HomeIcon />, title: "Home", path: "/"},
        {icon: <SearchIcon />, title: "Search", path: "#"},
        {icon: <CompassIcon />, title: "Explore", path: "/"},
        {icon: <FilmIcon/>, title: "Reels", path: "/"},
        {icon: <MessageCircleMoreIcon/>, title: "Messages", path: "/"},
        {icon: <HeartIcon/>, title: "Notification", path: "/"},
        {icon: <SquarePlusIcon/>, title: "Create", path: "#"},
        {icon: <CircleUserRoundIcon/>, title: "Profile", path: "/"},
    ])

    return (
        <NavigationMenu>
            <ModeToggle/>
            <NavigationMenuList className="flex flex-col items-start">
                <div>
                {menu.map((item, index) => (
                    <NavigationMenuItem key={index}>
                        <NavLink to={item.path}>
                            <NavigationMenuLink className='flex gap-3'>
                                {item.icon}
                                {item.title}
                            </NavigationMenuLink>
                        </NavLink>
                    </NavigationMenuItem>
                ))}
                </div>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export default Navbar
