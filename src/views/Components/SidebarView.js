import React from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import InputIcon from '@mui/icons-material/Input';
import OutputIcon from '@mui/icons-material/Output';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PublicIcon from '@mui/icons-material/Public';
import SecurityIcon from '@mui/icons-material/Security';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import LinkIcon from '@mui/icons-material/Link';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const SidebarView = () => {
  return (
    <Sidebar className='sidebar'>
      <Menu iconShape="square">
        <MenuItem icon={<InputIcon />}>Input</MenuItem>
        <MenuItem icon={<OutputIcon />}>Output</MenuItem>
        <MenuItem icon={<LockIcon />}>Encrypt</MenuItem>
        <MenuItem icon={<LockOpenIcon />}>Decrypt</MenuItem>
        <MenuItem icon={<FingerprintIcon />}>Hash</MenuItem>
        <MenuItem icon={<VpnKeyIcon />}>Seed</MenuItem>
        <MenuItem icon={<PublicIcon />}>Public Key</MenuItem>
        <MenuItem icon={<SecurityIcon />}>Private Key</MenuItem>
        <MenuItem icon={<SwapHorizIcon />}>Xor</MenuItem>
        <MenuItem icon={<LinkIcon />}>Concatenate</MenuItem>
        <MenuItem icon={<ChevronLeftIcon />}>Shift Left</MenuItem>
        <MenuItem icon={<ChevronRightIcon />}>Shift Right</MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SidebarView;