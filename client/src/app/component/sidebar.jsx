import React, {forwardRef, useImperativeHandle, useState} from 'react'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';
import Link from '@mui/material/Link';

const Sidebar = forwardRef(({ items }, ref) => {
  const [state, setState] = useState(false);
  
  const toggleSidebar = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')){
      return;
    }
    setState(open);
  };

  useImperativeHandle(ref, () => ({
    openSidebar(){
      setState(true);
    },
    
    closeSidebar(){
      setState(false);
    } 
  }));

  const list = () => (
    <Box
      role="presentation"
      onClick={toggleSidebar(false)}
      onKeyDown={toggleSidebar(false)}
    >
      <List>
        {items.map((item, index) => (
            <ListItem key={index} disablePadding>
                <Link href={item.path} underline="none">
                    <ListItemButton>
                        <ListItemIcon> {item.icon} </ListItemIcon>
                        <ListItemText primary={item.name} />
                    </ListItemButton>
                </Link>
            </ListItem>
        ))}
      </List>
    </Box>
  );
    

  return (
    <div>
      <Drawer
        anchor={"left"}
        open={state}
        onClose={toggleSidebar(false)}
      > 
         {/* TOGGLE SIDEBAR */}
        <Stack direction={"row-reverse"} mt={2} pr={2}>
          <CloseIcon onClick = {toggleSidebar(false)}/>
        </Stack> 
        
        {/* User Information */}
        <Stack alignItems={"center"} gap={2}>
          <Avatar src="#"/>
          <Box>0abhay0</Box>
          <Stack direction={"row"} >
            <Button>Signup</Button>
            <Button>Login</Button>
          </Stack>
        </Stack>

        {/* SIDEBAR ITEMS */}
        <Box mt={4} pr={4}>
          {list()}
        </Box>
      </Drawer>
    </div>
  )
});

export default Sidebar;