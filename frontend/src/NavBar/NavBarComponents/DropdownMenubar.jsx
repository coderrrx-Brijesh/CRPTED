import { useContext } from "react";
import { Button } from "../../components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import LoginContext from "../../Context/LogedinContext";

export const DropdownMenubar = ({ user }) => {
  const { setIsLoggedIn } = useContext(LoginContext);

  if (!user) {
    return null;
  }

  const logouthandler = () => {
    setIsLoggedIn(false);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outlined">
          <Avatar className="w-8 h-8">
            <AvatarFallback>
              {user.firstName ? user.firstName[0] : "?"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem asChild>
          <a className="text-gray-700">{user.firstName || "User"}</a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="/service" className="text-gray-700">
            Services
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild onClick={logouthandler}>
          <a className="text-gray-700">Logout</a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
