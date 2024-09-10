import MessengerIcon from '@/components/MessengerIcon'
import { ModeToggle } from '@/components/mode-toggle'
import NotificationIcon from '@/components/NotificationIcon'
import { NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu'
import { NavigationMenu } from '@/components/ui/navigation-menu'
import { CircleUserRoundIcon, 
    CompassIcon, 
    FilmIcon, 
    HeartIcon,
    HomeIcon, 
    MessageCircleMoreIcon,
    SearchIcon, 
    SquarePlusIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

function Navbar() {

    const [menu, setMenu] = useState([
        {icon: <HomeIcon />, title: "Home", path: "/"},
        {icon: <SearchIcon />, title: "Search", path: "#"},
        {icon: <CompassIcon />, title: "Explore", path: "/"},
        {icon: <FilmIcon/>, title: "Reels", path: "/"},
        {icon: <MessengerIcon number='9'/>, title: "Messages", path: "/"},
        {icon: <NotificationIcon notification={true}/>, title: "Notification", path: "/"},
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
