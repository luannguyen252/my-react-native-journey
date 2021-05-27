import * as types from '../Actions/types';
import initialState from './initialState';

export default function (state = initialState.TODO, action) {
  switch (action.type) {
    case types.GET_TODO: {
      return {
        ...state,
        ToDoList: action.List['ToDoList']
          ? action.List['ToDoList']
          : [...state.ToDoList],
        TodayTODOList: action.List['TodayTODOList']
          ? action.List.TodayTODOList
          : [...state.TodayTODOList],
        StatusToDoResponse: action.List.Status,
      };
    }
    case types.SET_UPDATED_TODO: {
      return {
        ...state,
        ToDoList: action.List['ToDoList']
          ? action.List.ToDoList
          : [...state.ToDoList],
        TodayTODOList: action.List['TodayTODOList']
          ? action.List.TodayTODOList
          : [...state.TodayTODOList],
        UpdatedToDoResponse: action.List.Status,
      };
    }

    default:
      return {
        ...state,
      };
  }
}
