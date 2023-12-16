import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
	notifications: [],
};

const NotificationContext = createContext();

export const useNotification = () => {
	return useContext(NotificationContext);
};

const notificationReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_NOTIFICATION':
			return {
				...state,
				notifications: [...state.notifications, action.payload],
			};
		case 'REMOVE_NOTIFICATION':
			return {
				...state,
				notifications: state.notifications.filter(
					(notification) => notification.id !== action.payload
				),
			};
		default:
			return state;
	}
};

export const NotificationProvider = ({ children }) => {
	const [state, dispatch] = useReducer(notificationReducer, initialState);

	const addNotification = (notification) => {
		dispatch({
			type: 'ADD_NOTIFICATION',
			payload: notification,
		});
	};

	const removeNotification = (notificationId) => {
		dispatch({
			type: 'REMOVE_NOTIFICATION',
			payload: notificationId,
		});
	};

	return (
		<NotificationContext.Provider
			value={{ notifications: state.notifications, addNotification, removeNotification }}
		>
			{children}
		</NotificationContext.Provider>
	);
};
