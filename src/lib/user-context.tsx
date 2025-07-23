'use client'
import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { User, CompletedDeed } from '@/types'

interface UserState {
  user: User | null
  isLoggedIn: boolean
  hasSeenModal: boolean
  isGuest: boolean
  loading: boolean
  error: string | null
}

type UserAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_GUEST_MODE'; payload: boolean }
  | { type: 'VIEW_MODAL' }
  | { type: 'UPDATE_PROFILE'; payload: Partial<User> }
  | { type: 'LOAD_FROM_STORAGE'; payload: User | null }

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
  hasSeenModal: false,
  isGuest: false,
  loading: false,
  error: null,
}

function userReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
        loading: false,
        error: null,
      }
    
    case 'LOGOUT':
      // Clear localStorage
      try {
        localStorage.removeItem('hallmark-giving-tree-user')
        localStorage.removeItem('hallmark-giving-tree-modal-viewed')
        localStorage.removeItem('hallmark-giving-tree-saved-total')
        localStorage.removeItem('hallmark-star-animation')
      } catch {
        // localStorage not available
      }
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        hasSeenModal: false,
        isGuest: false,
        error: null,
      }
    
    case 'SET_GUEST_MODE':
      if (action.payload) {
        const guestUser: User = {
          id: 'guest-' + Date.now(),
          name: 'Guest',
          emailAddress: '',
          completedDeeds: [],
          feed: false,
        }
        return {
          ...state,
          user: guestUser,
          isLoggedIn: true,
          isGuest: true,
        }
      }
      return { ...state, isGuest: false }
    
    case 'VIEW_MODAL':
      try {
        localStorage.setItem('hallmark-giving-tree-modal-viewed', 'true')
      } catch {
        // localStorage not available
      }
      return { ...state, hasSeenModal: true }
    
    case 'UPDATE_PROFILE':
      if (!state.user) return state
      const updatedUser = { ...state.user, ...action.payload }
      try {
        localStorage.setItem('hallmark-giving-tree-user', JSON.stringify(updatedUser))
      } catch {
        // localStorage not available
      }
      return { ...state, user: updatedUser }
    
    case 'LOAD_FROM_STORAGE':
      const hasSeenModal = (() => {
        try {
          return localStorage.getItem('hallmark-giving-tree-modal-viewed') === 'true'
        } catch {
          return false
        }
      })()
      
      return {
        ...state,
        user: action.payload,
        isLoggedIn: !!action.payload,
        hasSeenModal,
        loading: false,
      }
    
    default:
      return state
  }
}

interface UserContextType {
  state: UserState
  dispatch: React.Dispatch<UserAction>
  // Helper functions
  login: (userData: { name: string; emailAddress: string }) => Promise<void>
  logout: () => void
  setGuestMode: (isGuest: boolean) => void
  viewModal: () => void
  updateProfile: (updates: Partial<User>) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(userReducer, initialState)

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('hallmark-giving-tree-user')
      const user = stored ? JSON.parse(stored) : null
      dispatch({ type: 'LOAD_FROM_STORAGE', payload: user })
    } catch {
      dispatch({ type: 'LOAD_FROM_STORAGE', payload: null })
    }
  }, [])

  const login = async (userData: { name: string; emailAddress: string }) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    
    try {
      // This would be replaced with actual API call
      const user: User = {
        id: 'user-' + Date.now(),
        name: userData.name,
        emailAddress: userData.emailAddress,
        completedDeeds: [],
        feed: false,
      }
      
      localStorage.setItem('hallmark-giving-tree-user', JSON.stringify(user))
      dispatch({ type: 'LOGIN_SUCCESS', payload: user })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Login failed' })
    }
  }

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  const setGuestMode = (isGuest: boolean) => {
    dispatch({ type: 'SET_GUEST_MODE', payload: isGuest })
  }

  const viewModal = () => {
    dispatch({ type: 'VIEW_MODAL' })
  }

  const updateProfile = (updates: Partial<User>) => {
    dispatch({ type: 'UPDATE_PROFILE', payload: updates })
  }

  const contextValue: UserContextType = {
    state,
    dispatch,
    login,
    logout,
    setGuestMode,
    viewModal,
    updateProfile,
  }

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

// Convenience hooks
export function useUserState() {
  const { state } = useUser()
  return state
}

export function useUserActions() {
  const { login, logout, setGuestMode, viewModal, updateProfile } = useUser()
  return { login, logout, setGuestMode, viewModal, updateProfile }
}