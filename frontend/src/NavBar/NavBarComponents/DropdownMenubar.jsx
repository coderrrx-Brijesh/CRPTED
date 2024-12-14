import { Button } from '../../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu';

export const DropdownMenubar =()=>{
    return (

        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outlined">
                <Avatar className="w-8 h-8">
                    <AvatarImage src="https://example.com/avatar.jpg" alt="User Avatar" />
                    <AvatarFallback>A</AvatarFallback>
                </Avatar>
            </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
                <a href="/profile" className="text-gray-700">Profile</a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <a href="/settings" className="text-gray-700">Settings</a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <a href="/logout" className="text-gray-700">Logout</a>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    )
} 