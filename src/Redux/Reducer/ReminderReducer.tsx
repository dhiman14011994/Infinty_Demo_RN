
import reminderKeys from '../Constants/ReminderKeys';
import { Reminder, Notification } from '../../Modals/ReminderModl';
import loginKeys from '../Constants/LoginKeys';

const INITIAL_STATE = {
  status: false,
  reminder: undefined as any as Reminder,
  reminders: [] as Reminder[],
  notification: [] as Notification[],
}

export default function reminderReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case loginKeys.LOGOUT:
      return {
        status: false,
        reminder: undefined,
        reminders: [],
        notification: [],
      };

    case reminderKeys.SET_REMINDER_STATUS:
      return {
        ...state,
        status: action.payload
      };

    case reminderKeys.SAVE_USER_REMINDER:
      return {
        ...state,
        reminder: action.payload
      };

    case reminderKeys.SAVE_REMINDERS:
      return {
        ...state,
        reminders: action.payload
      };

    case reminderKeys.SAVE_USER_NOTIFICATION:
      return {
        ...state,
        notification: action.payload
      };

    default:
      return state;
  }
}
