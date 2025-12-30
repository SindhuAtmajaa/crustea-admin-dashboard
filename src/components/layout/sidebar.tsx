'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BotMessageSquare, ChevronDown, Droplets, LayoutDashboard, Router, Settings, Users } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator
} from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/pools', label: 'Pools', icon: Droplets },
  { href: '/dashboard/devices', label: 'Devices', icon: Router },
  { href: '/dashboard/users', label: 'Users', icon: Users },
];

const helpMenuItems = [
    { href: '/dashboard/ai-alerts', label: 'AI Alerts', icon: BotMessageSquare },
]

export function AppSidebar() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    return pathname === href
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
            <Droplets className="w-8 h-8 text-primary"/>
            <h1 className="text-xl font-semibold tracking-tight">AquaControl</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href} passHref>
                <SidebarMenuButton
                  isActive={isActive(item.href)}
                  icon={item.icon}
                  tooltip={item.label}
                  asChild
                >
                  <div>{item.label}</div>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarSeparator className='my-4' />
        <SidebarMenu>
          {helpMenuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href} passHref>
                <SidebarMenuButton
                  isActive={isActive(item.href)}
                  icon={item.icon}
                  tooltip={item.label}
                  asChild
                >
                  <div>{item.label}</div>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
      <Popover>
          <PopoverTrigger asChild>
          <Button variant="ghost" className="justify-start w-full h-auto px-2 py-2">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://picsum.photos/seed/1/40/40" />
                <AvatarFallback>AU</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start group-data-[collapsible=icon]:hidden">
                <span className="text-sm font-semibold">Admin User</span>
                <span className="text-xs text-muted-foreground">admin@aquacontrol.com</span>
              </div>
              </div>
              <ChevronDown className="w-4 h-4 group-data-[collapsible=icon]:hidden"/>
            </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 mb-2">
            <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4"/>
                    Settings
                </Button>
            </div>
          </PopoverContent>
        </Popover>
      </SidebarFooter>
    </Sidebar>
  )
}
