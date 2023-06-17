
import reminderKeys from "../Constants/ReminderKeys";

export const saveReminder = (data: any) => ({
  type: reminderKeys.SAVE_REMINDER,
  payload: data,
});

export const setReminderStatus = (data: any) => ({
  type: reminderKeys.SET_REMINDER_STATUS,
  payload: data,
});

export const getReminders = (data: any) => ({
  type: reminderKeys.GET_REMINDERS,
  payload: data,
});

export const saveReminders= (data: any) => ({
  type: reminderKeys.SAVE_REMINDERS,
  payload: data,
});

export const getUserReminders = (data: any) => ({
  type: reminderKeys.GET_USER_REMINDER,
  payload: data,
});

export const saveUserReminders= (data: any) => ({
  type: reminderKeys.SAVE_USER_REMINDER,
  payload: data,
});

export const getUserNotifications = (data: any) => ({
  type: reminderKeys.GET_USER_NOTIFICATION,
  payload: data,
});

export const saveUserNotifications = (data: any) => ({
  type: reminderKeys.SAVE_USER_NOTIFICATION,
  payload: data,
});
