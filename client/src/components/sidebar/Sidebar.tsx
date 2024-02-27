import { useEffect, useState } from "react";
import {
  AtSign,
  Hash,
  Home,
  LucideIcon,
  MessageCircleQuestion,
  Tag,
  Trophy,
  User,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

export const Sidebar: React.FC = () => {
  const [activeLink, setActiveLink] = useState<string>("");
  const location = useLocation();

  enum LinkPath {
    HOME = "",
    QUESTIONS = "questions",
    TAGS = "tags",
    ROOMS = "rooms",
    MENTORS = "mentors",
    USERS = "users",
    LEADERBOARD = "leaderboard",
  }

  useEffect(() => {
    switch (location.pathname.split("/")[2]) {
      case LinkPath.HOME:
        setActiveLink(LinkPath.HOME);
        break;
      case LinkPath.QUESTIONS:
        setActiveLink(LinkPath.QUESTIONS);
        break;
      case LinkPath.TAGS:
        setActiveLink(LinkPath.TAGS);
        break;
      case LinkPath.ROOMS:
        setActiveLink(LinkPath.ROOMS);
        break;
      case LinkPath.MENTORS:
        setActiveLink(LinkPath.MENTORS);
        break;
      case LinkPath.USERS:
        setActiveLink(LinkPath.USERS);
        break;
      case LinkPath.LEADERBOARD:
        setActiveLink(LinkPath.LEADERBOARD);
        break;
      default:
        setActiveLink(LinkPath.HOME);
        break;
    }
  }, [location.pathname]);
  interface LinkItem {
    title: string;
    icon: LucideIcon;
    path: string;
    variant: "default" | "ghost";
  }

  const sideNavLinks: LinkItem[] = [
    { title: "Home", icon: Home, path: LinkPath.HOME, variant: "default" },
    {
      title: "Questions",
      icon: MessageCircleQuestion,
      path: LinkPath.QUESTIONS,
      variant: "ghost",
    },
    {
      title: "Tags",
      icon: Tag,
      path: LinkPath.TAGS,
      variant: "ghost",
    },
    {
      title: "Rooms",
      icon: Hash,
      path: LinkPath.ROOMS,
      variant: "ghost",
    },
    {
      title: "Mentors",
      icon: AtSign,
      path: LinkPath.MENTORS,
      variant: "ghost",
    },
    {
      title: "Users",
      icon: User,
      path: LinkPath.USERS,
      variant: "ghost",
    },
    {
      title: "Leaderboard",
      icon: Trophy,
      path: LinkPath.LEADERBOARD,
      variant: "ghost",
    },
  ];

  const handleLinkClick = (path: string) => {
    setActiveLink(path);
  };
  return (
    <div className="hidden w-80 border-r border-gray-300 md:block">
      <nav className="grid gap-2 pl-16 pr-4 pt-16">
        {sideNavLinks.map((link, index) => {
          return (
            <Link
              key={index}
              to={link.path}
              onClick={() => handleLinkClick(link.path)}
              className={cn(
                buttonVariants({
                  variant: activeLink === link.path ? "default" : "ghost",
                  size: "sm",
                }),
                index === 3 && "mt-4",
                index === 6 && "mt-4",
                link.variant === "default" &&
                  "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                "justify-start",
              )}
            >
              <link.icon className="mr-2 h-4 w-4" />
              {link.title}
            </Link>
          );
        })}
      </nav>
      <div className="mt-8"></div>
    </div>
  );
};
