import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Bookmark, Contact, Settings, Table } from 'lucide-react';
import Story from '@/features/Story';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

function Posts({ posts = [] }) {
  return (
    <div className="grid grid-cols-3 gap-1 bg-background">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className={`w-full h-10 bg-red-${800 - index * 100}`}></div>
      ))}
    </div>  
  );
}

const Highlights = () => (
  <div className="flex justify-between w-4/5">
    {Array.from({ length: 4 }).map((_, index) => (
      <Story key={index} size={16} />
    ))}
    <Story size={16} text="New"/>
  </div>
);

function ProfilePage() {
  const [currentChoice, setCurrentChoice] = useState("POSTS");

  const navigationButtons = [
    { label: "POSTS", icon: <Table size={12} /> },
    { label: "SAVED", icon: <Bookmark size={12} /> },
    { label: "TAGGED", icon: <Contact size={12} /> }
  ];

  const [menu, setMenu] = useState([
    {button: "Apps and websites", link: "/"},
    {button: "QR code", link: "/"},
    {button: "Notifications", link: "/"},
    {button: "Settings and privacy", link: "/"},
    {button: "Supervision", link: "/"},
    {button: "Login activity", link: "/"},
    {button: "Embed", link: "/"},
    {button: "Logout", link: "/"},
    {button: "Cancel", link: "/"}
  ])

  return (
    <div className="w-fit flex flex-col gap-5">
      <div className="flex gap-16">
        <Avatar className="w-36 h-36">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-4 w-fit">
          <div className="flex gap-4 items-center">
            <h5>anandivyam</h5>
            <div className="flex gap-2 items-center">
              <Button variant="secondary" size="sm" className="font-bold">Edit Profile</Button>
              <Button variant="secondary" size="sm" className="font-bold">View Archive</Button>
              <Dialog>
                <DialogTrigger><Button variant="link">
                <Settings size={25} />
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

          <div className="text-sm flex justify-between w-4/5">
            <h6><span className="font-semibold">11</span> posts</h6>
            <h6><span className="font-semibold">11</span> followers</h6>
            <h6><span className="font-semibold">11</span> following</h6>
          </div>

          <div>
            <h6 className="font-semibold text-sm">Divyam Anand</h6>
            <p className="text-xs w-1/2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius, architecto?</p>
          </div>
        </div>
      </div>

      <Highlights />

        <div className="flex gap-10 w-full justify-center border-t">
          {navigationButtons.map(({ label, icon }) => (
            <Button
              key={label}
              variant="link"
              className={`hover:no-underline gap-1 w-min m-0 p-0 rounded-none py-2 ${currentChoice === label ? 'text-foreground border-foreground border-t-2' : 'text-muted-foreground'}`}
              onClick={() => setCurrentChoice(label)}
            >
              {icon}
              <h6>{label}</h6>
            </Button>
          ))}
      </div>

      <Posts />
    </div>
  );
}

export default ProfilePage;
