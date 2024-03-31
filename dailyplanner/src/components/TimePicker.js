import * as React from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';


export default function ResponsiveTimePickers({onChange, default_value}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
  
          <DesktopTimePicker label={"Time"}onChange={onChange} defaultValue={default_value} sx={{width: '9vw'}}/>
       
     
    </LocalizationProvider>
  );
}
