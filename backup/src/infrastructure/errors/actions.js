/* eslint-disable import/prefer-default-export */
import * as types from './actionTypes';

export const handleError = error => ({ type: types.ERROR, error });
