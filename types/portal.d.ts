/**
 * Complete TypeScript type definitions for the portal system
 */

/**
 * User roles within a client portal
 */
export type UserRole = 'admin' | 'member' | 'viewer';

/**
 * Client theme configuration
 */
export interface ClientTheme {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
    accentColor?: string;
}

/**
 * Client feature flags
 */
export interface ClientFeatures {
    dashboard: boolean;
    analytics: boolean;
    reports: boolean;
    settings: boolean;
    deployments: boolean;
}

/**
 * Client/Tenant data
 */
export interface Client {
    id: string;
    subdomain: string;
    name: string;
    logoUrl?: string;
    theme: ClientTheme;
    features: ClientFeatures;
    isActive: boolean;
    createdAt: Date;
    updatedAt?: Date;
    plan: 'free' | 'pro' | 'enterprise';
    ownerId?: string;
    featureFlags?: Record<string, boolean>;
}

/**
 * Portal user data
 */
export interface PortalUser {
    id: string;
    email: string;
    displayName?: string;
    photoURL?: string;
    clientId: string;
    role: UserRole;
    createdAt: Date;
    updatedAt?: Date;
    lastLoginAt?: Date;
    isActive: boolean;
}

/**
 * Session data stored in JWT
 */
export interface PortalSession {
    uid: string;
    email: string;
    clientId: string;
    subdomain: string;
    role: UserRole;
    exp?: number;
    iat?: number;
}

/**
 * Login request payload
 */
export interface LoginRequest {
    email: string;
    password: string;
}

/**
 * Login response data
 */
export interface LoginResponse {
    user: {
        id: string;
        email: string;
        displayName: string | null;
        role: UserRole;
    };
    client: {
        id: string;
        name: string;
        logoUrl?: string;
    };
}

/**
 * Register request payload
 */
export interface RegisterRequest {
    email: string;
    password: string;
    displayName?: string;
    clientId: string;
    inviteCode?: string;
}

/**
 * Dashboard statistics
 */
export interface DashboardStats {
    totalDeployments: number;
    activeDeployments: number;
    totalConversations: number;
    conversionRate: number;
    avgResponseTime: number;
}

/**
 * Analytics Timeseries Data Point
 */
export interface AnalyticsTimeseriesData {
    day: string;
    conversations: number;
    leads: number;
    conversions: number;
    date: Date;
}

/**
 * Dashboard data
 */
export interface DashboardData {
    stats: DashboardStats;
    recentActivity: ActivityLog[];
    deployments: Deployment[];
    timeseries?: AnalyticsTimeseriesData[];
}

/**
 * Activity log entry
 */
export interface ActivityLog {
    id: string;
    action: string;
    description: string;
    userId: string;
    userEmail: string;
    clientId: string;
    createdAt: Date;
    metadata?: Record<string, unknown>;
}

/**
 * AI Deployment/Bot configuration
 */
export interface Deployment {
    id: string;
    name: string;
    type: 'voice' | 'chat' | 'hybrid';
    status: 'active' | 'paused' | 'draft';
    clientId: string;
    createdAt: Date;
    updatedAt: Date;
    config: DeploymentConfig;
    stats: DeploymentStats;
}

/**
 * Deployment configuration
 */
export interface DeploymentConfig {
    greeting: string;
    personality: string;
    language: string;
    voiceId?: string;
    webhookUrl?: string;
    integrations: string[];
}

/**
 * Deployment statistics
 */
export interface DeploymentStats {
    totalConversations: number;
    avgDuration: number;
    successRate: number;
    lastActiveAt?: Date;
}

/**
 * Create client request
 */
export interface CreateClientRequest {
    subdomain: string;
    name: string;
    theme?: Partial<ClientTheme>;
    features?: Partial<ClientFeatures>;
    plan?: Client['plan'];
}

/**
 * Update client request
 */
export interface UpdateClientRequest {
    name?: string;
    logoUrl?: string;
    theme?: Partial<ClientTheme>;
    features?: Partial<ClientFeatures>;
    isActive?: boolean;
    plan?: Client['plan'];
}

// Extend global window type for client-side access
declare global {
    interface Window {
        portalClient?: Client;
        portalUser?: PortalUser;
    }
}
