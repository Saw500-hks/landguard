import {
  User, Project, DashboardData, GISFeature, ModelStatus,
  Alert, Recommendation, AuditLog, Prediction,
  SupportTicket, SupportConfig, SupportTicketCreate, SupportTicketStatusResponse
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
  },

  // Support & Helpline
  getSupportConfig: async (): Promise<SupportConfig> => {
    try {
      return await request<SupportConfig>('/support/config');
    } catch {
      const saved = localStorage.getItem('landguard_support_config');
      if (saved) {
        try { return JSON.parse(saved); } catch {}
      }
      return {
        support_phone: '+91 XXXXX XXXXX',
        support_email: 'support@landguard.ai',
        support_hours: 'Monday–Saturday | 9:00 AM–6:00 PM'
      };
    }
  },

  submitSupportTicket: async (data: SupportTicketCreate): Promise<{ ticket_id: string; message: string }> => {
    try {
      return await request<{ ticket_id: string; message: string }>('/support/tickets', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    } catch {
      // Local fallback for offline/preview mode
      const count = parseInt(localStorage.getItem('landguard_ticket_count') || '1', 10);
      const nextNum = String(count).padStart(4, '0');
      const ticketId = `#LG-2026-${nextNum}`;
      localStorage.setItem('landguard_ticket_count', String(count + 1));

      const newTicket: SupportTicket = {
        id: count,
        ticket_id: ticketId,
        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        category: data.category,
        subject: data.subject,
        description: data.description,
        status: 'Request Received',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const existingStr = localStorage.getItem('landguard_support_tickets') || '[]';
      const tickets: SupportTicket[] = JSON.parse(existingStr);
      tickets.unshift(newTicket);
      localStorage.setItem('landguard_support_tickets', JSON.stringify(tickets));

      return {
        ticket_id: ticketId,
        message: `Your support request has been submitted successfully. Your Ticket ID is ${ticketId}. Our support team will contact you soon.`
      };
    }
  },

  checkTicketStatus: async (ticketId: string): Promise<SupportTicketStatusResponse> => {
    const cleanId = ticketId.startsWith('#') ? ticketId : `#${ticketId}`;
    try {
      return await request<SupportTicketStatusResponse>(`/support/tickets/${encodeURIComponent(cleanId)}/status`);
    } catch {
      const existingStr = localStorage.getItem('landguard_support_tickets') || '[]';
      const tickets: SupportTicket[] = JSON.parse(existingStr);
      const found = tickets.find(t => t.ticket_id.toLowerCase() === cleanId.toLowerCase());
      if (found) {
        return {
          ticket_id: found.ticket_id,
          status: found.status,
          category: found.category,
          subject: found.subject,
          created_at: found.created_at,
          updated_at: found.updated_at,
          admin_response: found.admin_response
        };
      }
      throw new Error(`No ticket found with ID ${ticketId}`);
    }
  },

  getAdminTickets: async (filters?: {
    search?: string;
    category?: string;
    status?: string;
    limit?: number;
    offset?: number;
  }): Promise<SupportTicket[]> => {
    const sp = new URLSearchParams();
    if (filters?.search) sp.set('search', filters.search);
    if (filters?.category) sp.set('category', filters.category);
    if (filters?.status) sp.set('status', filters.status);
    if (filters?.limit) sp.set('limit', filters.limit.toString());
    if (filters?.offset) sp.set('offset', filters.offset.toString());
    const qs = sp.toString() ? `?${sp.toString()}` : '';

    try {
      return await request<SupportTicket[]>(`/support/admin/tickets${qs}`);
    } catch {
      const existingStr = localStorage.getItem('landguard_support_tickets') || '[]';
      let tickets: SupportTicket[] = JSON.parse(existingStr);

      if (tickets.length === 0) {
        // Seed default demo tickets
        tickets = [
          {
            id: 1,
            ticket_id: '#LG-2026-0001',
            full_name: 'Rajesh Kumar',
            email: 'rajesh.kumar@example.com',
            phone: '+91 98765 43210',
            category: 'Land Records',
            subject: 'Discrepancy in Survey No 142 area calculation',
            description: 'The Khasra document shows 2.4 hectares while on-ground survey measured 2.15 hectares.',
            status: 'Support Team Assigned',
            assigned_to: 'Field Officer Verma',
            created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
            updated_at: new Date(Date.now() - 86400000 * 1).toISOString(),
            admin_response: 'Revenue inspector assigned to conduct boundary re-verification on Thursday.'
          },
          {
            id: 2,
            ticket_id: '#LG-2026-0002',
            full_name: 'Priya Sharma',
            email: 'priya.sharma@example.com',
            phone: '+91 91234 56789',
            category: 'Application Delay',
            subject: 'Mutation certificate delay beyond 30-day statutory SLA',
            description: 'Application was submitted on Jan 15th with acknowledgment ref MUT-2026-8988. Still pending approval.',
            status: 'Under Review',
            assigned_to: 'Tehsildar Office',
            created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
            updated_at: new Date(Date.now() - 86400000 * 3).toISOString()
          },
          {
            id: 3,
            ticket_id: '#LG-2026-0003',
            full_name: 'Amit Patel',
            email: 'amit.patel@example.com',
            phone: '+91 99887 76655',
            category: 'Document Problems',
            subject: 'Missing Encumbrance Certificate verification',
            description: 'Need assistance verifying Form 15 non-encumbrance status for NH-48 parcel.',
            status: 'Resolved',
            admin_response: 'EC certified copy has been verified against sub-registrar database and updated.',
            created_at: new Date(Date.now() - 86400000 * 7).toISOString(),
            updated_at: new Date(Date.now() - 86400000 * 5).toISOString()
          }
        ];
        localStorage.setItem('landguard_support_tickets', JSON.stringify(tickets));
      }

      if (filters?.search) {
        const s = filters.search.toLowerCase();
        tickets = tickets.filter(t => 
          t.full_name.toLowerCase().includes(s) ||
          t.email.toLowerCase().includes(s) ||
          t.ticket_id.toLowerCase().includes(s) ||
          t.subject.toLowerCase().includes(s)
        );
      }
      if (filters?.category) {
        tickets = tickets.filter(t => t.category === filters.category);
      }
      if (filters?.status) {
        tickets = tickets.filter(t => t.status === filters.status);
      }

      return tickets;
    }
  },

  updateAdminTicket: async (
    ticketId: string,
    update: { status?: string; admin_response?: string; assigned_to?: string }
  ): Promise<SupportTicket> => {
    const cleanId = ticketId.startsWith('#') ? ticketId : `#${ticketId}`;
    try {
      return await request<SupportTicket>(`/support/admin/tickets/${encodeURIComponent(cleanId)}`, {
        method: 'PUT',
        body: JSON.stringify(update)
      });
    } catch {
      const existingStr = localStorage.getItem('landguard_support_tickets') || '[]';
      const tickets: SupportTicket[] = JSON.parse(existingStr);
      const index = tickets.findIndex(t => t.ticket_id.toLowerCase() === cleanId.toLowerCase());
      if (index === -1) throw new Error(`Ticket ${ticketId} not found`);

      if (update.status) tickets[index].status = update.status;
      if (update.admin_response !== undefined) tickets[index].admin_response = update.admin_response;
      if (update.assigned_to !== undefined) tickets[index].assigned_to = update.assigned_to;
      tickets[index].updated_at = new Date().toISOString();

      localStorage.setItem('landguard_support_tickets', JSON.stringify(tickets));
      return tickets[index];
    }
  },

  updateSupportConfig: async (data: Partial<SupportConfig>): Promise<SupportConfig> => {
    try {
      return await request<SupportConfig>('/support/admin/config', {
        method: 'PUT',
        body: JSON.stringify(data)
      });
    } catch {
      const current = await api.getSupportConfig();
      const updated: SupportConfig = {
        ...current,
        ...data
      };
      localStorage.setItem('landguard_support_config', JSON.stringify(updated));
      return updated;
    }
  }
};

