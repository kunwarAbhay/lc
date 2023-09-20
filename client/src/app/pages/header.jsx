import React, { useRef } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Sidebar from "../component/sidebar";
import MailIcon from "@mui/icons-material/Mail";
import DehazeIcon from "@mui/icons-material/Dehaze";
import Button from "@mui/material/Button";

export const Header = () => {
  const sidebarItems = [
    {
      name: "Home",
      icon: <MailIcon />,
      path: "/",
    },
    {
      name: "Global Ranking",
      icon: <MailIcon />,
      path: "/global-ranking",
    },
    {
      name: "Standing",
      icon: <MailIcon />,
      path: "/standing",
    }
  ];

  const sidebarRef = useRef(null);

  return (
    <div>
      <Stack direction={"row"} alignItems={"center"}>
        {/* OPEN SIDEBAR */}
        <Button
          onClick={() => {
            sidebarRef.current.openSidebar();
          }}
        >
          <DehazeIcon />
        </Button>

        <Box sx={{ flexGorw: 2, textAlign: "center", width: "100%" }}>
          LOGO
        </Box>
      </Stack>

      <Sidebar sx={{ width: "100%" }} items={sidebarItems} ref={sidebarRef} />
    </div>
  );
};

export default Header;
