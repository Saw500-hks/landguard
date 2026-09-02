import {
  User, Project, DashboardData, GISFeature, ModelStatus,
  Alert, Recommendation, AuditLog, Prediction
} from '../types';

const API_BASE = '/api';

export function getAuthToken(): string | null {
  return localStorage.getItem('landguard_token');
}

export function setAuthToken(token: string): void {
  localStorage.setItem('landguard_token', token);
}

export function removeAuthToken(): void {
  localStorage.removeItem('landguard_token');
}

export function getActiveUser(): User | null {
  const userJson = localStorage.getItem('landguard_user');
  if (!userJson) return null;
  try {
    return JSON.parse(userJson);
  } catch {
    return null;
  }
}

export function setActiveUser(user: User): void {
  localStorage.setItem('landguard_user', JSON.stringify(user));
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers || {});
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const token = getAuthToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    let errorDetail = 'API request failed';
    try {
      const errData = await response.json();
      errorDetail = errData.detail || errData.message || errorDetail;
    } catch {
      errorDetail = response.statusText;
    }
    throw new Error(errorDetail);
  }

  return response.json();
}

export const api = {
  // Auth
  login: async (email: string, password: string): Promise<{ access_token: string; user: User }> => {
    return request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  },
  getCurrentUser: async (): Promise<User> => {
    return request('/auth/me');
  },

  // Dashboard
  getDashboard: async (filters?: { state?: string; district?: string; project_type?: string }): Promise<DashboardData> => {
    const params = new URLSearchParams();
    if (filters?.state) params.set('state', filters.state);
    if (filters?.district) params.set('district', filters.district);
    if (filters?.project_type) params.set('project_type', filters.project_type);
    const qs = params.toString() ? `?${params.toString()}` : '';
    return request(`/dashboard${qs}`);
  },

  // Projects
  getProjects: async (params?: {
    search?: string;
    state?: string;
    district?: string;
    project_type?: string;
    risk_category?: string;
    current_stage?: string;
    page?: number;
    page_size?: number;
  }): Promise<{ items: Project[]; total: number; page: number; total_pages: number }> => {
    const sp = new URLSearchParams();
    if (params?.search) sp.set('search', params.search);
    if (params?.state) sp.set('state', params.state);
    if (params?.district) sp.set('district', params.district);
    if (params?.project_type) sp.set('project_type', params.project_type);
    if (params?.risk_category) sp.set('risk_category', params.risk_category);
    if (params?.current_stage) sp.set('current_stage', params.current_stage);
    if (params?.page) sp.set('page', params.page.toString());
    if (params?.page_size) sp.set('page_size', params.page_size.toString());
    const qs = sp.toString() ? `?${sp.toString()}` : '';
    return request(`/projects${qs}`);
  },

  getProjectDetail: async (projectId: string): Promise<Project> => {
    return request(`/projects/${projectId}`);
  },

  updateProject: async (projectId: string, updateData: Partial<Project>): Promise<Project> => {
    return request(`/projects/${projectId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData)
    });
  },

  createProject: async (projectData: Partial<Project>): Promise<Project> => {
    return request('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData)
    });
  },

  // Predict
  predict: async (projectData: any): Promise<Prediction & { stage_breakdown: any[] }> => {
    return request('/predict', {
      method: 'POST',
      body: JSON.stringify(projectData)
    });
  },

  // Alerts
  getAlerts: async (severity?: string, acknowledged?: boolean): Promise<Alert[]> => {
    const sp = new URLSearchParams();
    if (severity) sp.set('severity', severity);
    if (acknowledged !== undefined) sp.set('is_acknowledged', acknowledged.toString());
    const qs = sp.toString() ? `?${sp.toString()}` : '';
    return request(`/alerts${qs}`);
  },

  acknowledgeAlert: async (alertId: number): Promise<Alert> => {
    return request(`/alerts/${alertId}/acknowledge`, { method: 'POST' });
  },

  // Recommendations
  getRecommendations: async (projectId?: string, status?: string): Promise<Recommendation[]> => {
    const sp = new URLSearchParams();
    if (projectId) sp.set('project_id', projectId);
    if (status) sp.set('status', status);
    const qs = sp.toString() ? `?${sp.toString()}` : '';
    return request(`/recommendations${qs}`);
  },

  updateRecommendationStatus: async (recId: number, status: string): Promise<Recommendation> => {
    return request(`/recommendations/${recId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
  },

  // GIS Map
  getMapProjects: async (filters?: {
    state?: string;
    district?: string;
    risk_category?: string;
    project_type?: string;
  }): Promise<{ type: string; count: number; features: GISFeature[] }> => {
    const sp = new URLSearchParams();
    if (filters?.state) sp.set('state', filters.state);
    if (filters?.district) sp.set('district', filters.district);
    if (filters?.risk_category) sp.set('risk_category', filters.risk_category);
    if (filters?.project_type) sp.set('project_type', filters.project_type);
    const qs = sp.toString() ? `?${sp.toString()}` : '';
    return request(`/map/projects${qs}`);
  },

  // Model
  getModelStatus: async (): Promise<ModelStatus> => {
    return request('/model/status');
  },

  retrainModel: async (): Promise<any> => {
    return request('/model/retrain', { method: 'POST' });
  },

  // Admin
  getUsers: async (): Promise<User[]> => {
    return request('/admin/users');
  },

  getAuditLogs: async (limit: number = 50): Promise<AuditLog[]> => {
    return request(`/admin/audit-logs?limit=${limit}`);
  },

  getSystemStats: async (): Promise<any> => {
    return request('/admin/stats');
  },

  // Document Upload
  uploadDocument: async (projectId: string, category: string, file: File): Promise<any> => {
    const formData = new FormData();
    formData.append('project_id', projectId);
    formData.append('category', category);
    formData.append('file', file);

    return request('/documents/upload', {
      method: 'POST',
      body: formData
    });
  }
};
