/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { toogleLoading } from "../../store/store";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export function NavbarDefault({ toggleLogin }) {
  const [openNav, setOpenNav] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLoading = () => {
    dispatch(toogleLoading());
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  React.useEffect(() => {
    const sunIcon = document.querySelector(".sun");
    const moonIcon = document.querySelector(".moon");
    const sunMobIcon = document.querySelector(".sunmob");
    const moonMobIcon = document.querySelector(".moonmob");

    const userTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const iconToggle = () => {
      moonIcon.classList.toggle("display-none");
      sunIcon.classList.toggle("display-none");
      moonMobIcon.classList.toggle("display-none");
      sunMobIcon.classList.toggle("display-none");
    };

    const themeCheck = () => {
      if (userTheme === "dark" || (!userTheme && systemTheme)) {
        document.documentElement.classList.add("dark");
        moonIcon.classList.add("display-none");
        moonMobIcon.classList.add("display-none");
        return;
      }
      sunIcon.classList.add("display-none");
      sunMobIcon.classList.add("display-none");
    };

    const themeSwitch = () => {
      console.log("switch");
      if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
        iconToggle();
        return;
      }
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      iconToggle();
    };

    if (sunIcon && moonIcon) {
      sunIcon.addEventListener("click", () => {
        themeSwitch();
      });

      moonIcon.addEventListener("click", () => {
        themeSwitch();
      });
      themeCheck();
    }
    if (sunMobIcon && moonMobIcon) {
      sunMobIcon.addEventListener("click", () => {
        themeSwitch();
      });
      moonMobIcon.addEventListener("click", () => {
        themeSwitch();
      });
      themeCheck();
    }
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1  font-normal"
      >
        <Link
          className="flex cursor-pointer text-blue-gray-900 dark:text-white items-center"
          to="/account"
        >
          Account
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a
          onClick={() => {
            navigate("/manage");
          }}
          className="flex cursor-pointer text-blue-gray-900 dark:text-white items-center"
        >
          Manage Your Movies 
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a
          onClick={() => {
            navigate("/watchlater");
          }}
          className="flex text-blue-gray-900 cursor-pointer dark:text-white items-center"
        >
          Watch Later
        </a>
      </Typography>
      
    </ul>
  );

  return (
    <Navbar className="mx-auto max-w-screen-xl bg-white dark:bg-gray-800 py-2 px-4 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between bg-white dark:bg-gray-800 text-blue-gray-900 dark:text-white">
        <Typography
          as="a"
          
          className="mr-4 cursor-pointer py-1.5 font-medium "
        >
          <a onClick={() => {
            navigate("/");
          }}>Movie Recomendation Platform</a>
        </Typography>
        <div className="hidden lg:block text-blue-gray-900 dark:text-white">
          {navList}
        </div>
        <Button
          variant="gradient"
          size="sm"
          className="hidden p-2 lg:inline-block"
        >
          <span className="moon cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
              />
            </svg>
          </span>
          <span className="sun cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              />
            </svg>
          </span>
        </Button>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container bg-white dark:bg-gray-800 text-blue-gray-900 dark:text-white mx-auto">
          {navList}
          <Button
            variant="gradient"
            size="sm"
            fullWidth
            className="mb-2 flex items-center justify-center"
          >
            <span className="moonmob cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            </span>
            <span className="sunmob cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
              </svg>
            </span>
          </Button>
        </div>
      </MobileNav>
    </Navbar>
  );
}
