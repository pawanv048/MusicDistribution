// This folder contains your Redux actions. actionTypes.js contains your action type constants, 
// and each action file contains action creators for a specific feature or area of your application.

import { createAction } from '@reduxjs/toolkit';


export const updateTitle = createAction('dashboard/updateTitle');
export const getTopReleaseData = createAction('dashboard/getTopReleaseData');
