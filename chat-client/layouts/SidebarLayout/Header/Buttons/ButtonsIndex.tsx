import { Box } from '@mui/material';
import HeaderSearch from './Search/SearchIndex';
import HeaderNotifications from './Notifications/NotificationsIndex';

function HeaderButtons() {
  return (
    <Box sx={{ mr: 1 }}>
      <HeaderSearch />
      <Box sx={{ mx: 0.5 }} component="span">
        <HeaderNotifications />
      </Box>
    </Box>
  );
}

export default HeaderButtons;
