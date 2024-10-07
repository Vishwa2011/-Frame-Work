import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import ApartmentIcon from '@mui/icons-material/Apartment';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import SchoolIcon from '@mui/icons-material/School';
import { Link } from '@mui/material';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const drawerWidth = 240;

const Drawerspage = ({ children }) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [openLogoutDialog, setOpenLogoutDialog] = React.useState(false);

  const list = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Today Interview', path: '/TodayInterview' },
    { name: 'Due Interview', path: '/DueInterview' },
    { name: 'Courses', path: '/Courses' },
    { name: 'Company', path: '/Company' },
    { name: 'Students', path: '/Student' },
    { name: 'Interview', path: '/interview' },
  ];

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleLogoutClick = () => {
    setOpenLogoutDialog(true);
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem('token')
    setOpenLogoutDialog(false);
    console.log("User logged out");
  };

  const handleLogoutCancel = () => {
    setOpenLogoutDialog(false);
  };

  const drawer = (
    <div>
      <Toolbar sx={{ background: '#242424', color: 'white', fontSize: '1.25rem' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SchoolIcon sx={{ marginRight: '10px' }} />
          <Box>CampusTalkHub</Box>
        </Box>
      </Toolbar>
      <List>
        {list.map((text, index) => (
          <Link href={text.path} sx={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)' }} key={text.name}>
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  backgroundColor: location.pathname === text.path ? '#242424' : 'inherit', margin: '5px 17px', borderRadius: '7px',
                  '&:hover': {
                    backgroundColor: location.pathname === text.path ? '#242424' : 'inherit',
                  },
                }}>
                <ListItemIcon sx={{
                  color: location.pathname === text.path ? 'white' : '#606060',  // Set icon color for active item
                }}>
                  {index === 0 && <SpaceDashboardIcon />}
                  {index === 1 && <AccessTimeFilledIcon />}
                  {index === 2 && <HourglassFullIcon />}
                  {index === 3 && <ImportContactsIcon />}
                  {index === 4 && <ApartmentIcon />}
                  {index === 5 && <GroupIcon />}
                  {index === 6 && <AssignmentIcon />}
                </ListItemIcon>
                <ListItemText primary={text.name} sx={{
                  color: location.pathname === text.path ? 'white' : '#606060',  // Set icon color for active item
                }} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <List sx={{ display: 'flex', justifyContent: 'center', alignContent: 'end', paddingBottom: '0px' }}>
        <button
          style={{ width: '100%', height: '40px', margin: '10px', marginBottom: '0px', background: '#242424', border: '0px', color: 'white', borderRadius: '10px' }}
          onClick={handleLogoutClick}
        >
          Logout
        </button>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ justifyContent: 'end', background: '#242424' }}>
          {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton> */}
          {/* <Typography variant="h6" noWrap component="div" sx={{ display: 'flex', alignItems: 'center', paddingRight: '20px' }}>
            <Link href="/" >
              <MeetingRoomIcon sx={{ fontSize: '30px', color: 'white' }} />
            </Link>
          </Typography> */}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {children}
      </Box>

      <Dialog
        open={openLogoutDialog}
        onClose={handleLogoutCancel}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title">{"Logout"}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Are you sure you want to logout?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} sx={{ color: "black" }}>
            Cancel
          </Button>
          <Button onClick={handleLogoutConfirm} autoFocus>
            <a href="/Loginpage" style={{ textDecoration: 'none', color: 'black' }}> Logout</a>
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

Drawerspage.propTypes = {
  window: PropTypes.func,
};

export default Drawerspage;
