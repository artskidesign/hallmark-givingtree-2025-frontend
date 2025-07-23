// Core Types for Hallmark Giving Tree

export interface Deed {
  id: string
  title: string
  titlePastTense: string
  description?: string
  category?: string
  completed: boolean
  communityCount: number
}

export interface CompletedDeed {
  sortOrder: number
  deedId: string
  completedAt?: string
  userName?: string
}

export interface FeedDto {
  deedId: string
  name: string
  sortOrder: number
}

export interface User {
  id: string
  name: string
  emailAddress: string
  completedDeeds: CompletedDeed[]
  feed: boolean
}

export interface DeedsListDto {
  deeds: Deed[]
  communityCount: number
  feed: FeedDto[]
  allDeedsCompletedCopy: string
}

export interface CompletedDeedsListDto {
  completedDeeds: CompletedDeed[]
}

// Enums
export enum BulbColor {
  Blue = 'Blue',
  Red = 'Red',
  Yellow = 'Yellow',
  Green = 'Green',
  Purple = 'Purple',
}

export enum ShareType {
  Generic = 'Generic',
  MyTree = 'MyTree',
  CommunityTree = 'CommunityTree',
}

export enum PopUpType {
  Click = 'Click',
  Feed = 'Feed',
}

// API Response Types
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

// UI State Types
export interface LoadingState {
  loading: boolean
  error: string | null
}

// Analytics Types
export interface TrackingEventProps {
  trackEvent: (category: string, action: string, label: string) => void
}

export interface TrackingPageViewProps {
  sendToOmniture: (pageTitle: string) => void
  trackPageView: (pageTitle: string, pagePath: string) => void
}

export interface TrackingProps extends TrackingEventProps, TrackingPageViewProps {}

// WebView Types  
export interface WebViewState {
  isWebView: boolean
}

// Constants
export const TOTAL_AMOUNT_OF_DEEDS = 24
export const COMMUNITY_TREE_FEED_INTERVAL_SECONDS = 5
export const COMMUNITY_TREE_TOTAL_UPDATE_INTERVAL_SECONDS = 30