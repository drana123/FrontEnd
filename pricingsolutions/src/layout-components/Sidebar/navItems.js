import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import AssessmentIcon from '@mui/icons-material/Assessment';

var iconsMap = {
  SettingsIcon: SettingsIcon,
  UsersManagementIcon : PeopleAltRoundedIcon,
  NightlyBatchIcon : AssessmentIcon
};

export default [
  {
    label: 'Admin Menu',
    content: JSON.parse(
      `[
  
  
  {
    "label": "Api Configuration",
    "icon": "SettingsIcon",
        "to": "/apiConfig"

  },
  {
    "label": "Users Management",
    "icon": "UsersManagementIcon",
        "to": "/usersManagement"

  },
  {
    "label": "Nightly Batch Process",
    "icon": "NightlyBatchIcon",
        "to": "/nightlyBatchProcess"

  }
  
]`,

      (key, value) => {
        if (key === 'icon') {
          return iconsMap[value];
        } else {
          return value;
        }
      }
    )
  }

];
