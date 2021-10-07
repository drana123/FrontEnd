import { Alert } from 'rsuite';
Alert.config({
    duration: 5000,
    top: 100,
  });
export const  SuccessNotification = (message) => Alert.info(message);
export const  ErrorNotification = (message) => Alert.error(message);
  
