'use client'

import { usePathname } from 'next/navigation'
import { Bell, Home, Search } from 'lucide-react'
import {
  SidebarTrigger,
} from '@/components/ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Breadcrumb } from '../breadcrumb'
import { useMemo } from 'react'

export function AppHeader() {
  const pathname = usePathname()
  const breadcrumbItems = useMemo(() => {
    const paths = pathname.split('/').filter(p => p)
    const items = [{ label: 'Home', href: '/dashboard' }]
    
    if (paths[0] !== 'dashboard' || paths.length === 1) {
      return items
    }

    paths.slice(1).forEach((path, index) => {
      const href = `/dashboard/${paths.slice(1, index + 2).join('/')}`
      items.push({
        label: path.charAt(0).toUpperCase() + path.slice(1).replace('-', ' '),
        href: href,
      })
    })

    // Make the last item not a link
    if (items.length > 1) {
      delete items[items.length - 1].href
    }
    
    return items
  }, [pathname])

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
      <SidebarTrigger className="md:hidden" />
      
      <div className="w-full flex-1">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>

      <Button variant="ghost" size="icon" className="rounded-full">
        <Bell className="h-5 w-5" />
        <span className="sr-only">Toggle notifications</span>
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://picsum.photos/seed/1/40/40" alt="@admin" />
              <AvatarFallback>AU</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
