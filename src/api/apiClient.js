
console.log('🚀 apiClient.js LOADED');
console.log('🌍 window.location.hostname:', window.location.hostname);

const API_BASE_URL = (() => {
  // Se c'è variabile d'ambiente, usala
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  
  // Auto-detect in base all'hostname
  const hostname = window.location.hostname;
  
  // Se sei su localhost (PC)
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:8000/api/v1';
  }
  
  // Se sei su IP di rete (telefono)
  return `http://${hostname}:8000/api/v1`;
})();

console.log('🔌 API_BASE_URL finale:', API_BASE_URL);

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('authToken');
  }

  // Set authentication token
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }

  // Get authentication headers
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return headers;
  }

async request(endpoint, options = {}) {
  const url = `${this.baseURL}${endpoint}`;
  
  const config = {
    headers: this.getHeaders(),
    credentials: 'include',
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    // Handle different response types
    if (response.status === 204) {
      return null; // No content
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      // GESTIONE 401/400 DIFFERENZIATA
      if (response.status === 401 || response.status === 400) {
        const sessionEndpoints = [
            '/sessions/validate',
            '/bookings/user/my-bookings',
            '/bookings/user'
        ];
        
        const authEndpoints = ['/auth/register', '/auth/login'];
        
        const isSessionEndpoint = sessionEndpoints.some(ep => endpoint.includes(ep));
        const isAuthEndpoint = authEndpoints.some(ep => endpoint.includes(ep));
        
        if (isSessionEndpoint) {
              // DISTINGUI 400 vs 401 per sessioni
              let errorType = "no_session";
              
              if (response.status === 400) {
                  // 400 = Venue problem
                  if (errorData.detail?.includes("locale non è più attivo")) {
                      errorType = "venue_inactive";
                  }
              } else if (response.status === 401) {
                  // 401 = Session problem  
                  if (errorData.detail?.includes("scaduta")) {
                      errorType = "session_expired";
                  } else {
                      errorType = "no_session";
                  }
              }
              
              return {
                  valid: false,
                  error: errorType,
                  message: errorData.detail || "Errore sessione",
                  bookings: [],
                  remaining_slots: 3,
                  venue: null
              };
        } else if (isAuthEndpoint) {
              // NON fare logout per errori di registrazione/login
              throw new Error(errorData.detail || `HTTP Error ${response.status}`);
        } else {
              // Per altri endpoint DJ: comportamento originale
              this.clearAuth();
              window.dispatchEvent(new CustomEvent('auth:logout'));
              throw new Error(errorData.detail || 'Sessione scaduta. Effettua nuovamente il login.');
        }
      }
      
      throw new Error(errorData.detail || `HTTP Error ${response.status}`);
    }

    // Try to parse JSON, fallback to text
    try {
      return await response.json();
    } catch {
      return await response.text();
    }
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

  // HTTP methods
  async get(endpoint, params = {}) {
    const url = new URL(endpoint, this.baseURL);
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        url.searchParams.append(key, params[key]);
      }
    });
    
    return this.request(url.pathname + url.search);
  }

  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }

  // ==================== AUTH ENDPOINTS ====================

  async register(userData) {
  const response = await this.post('/auth/register', userData);
  
  // 🆕 Solo salva il token se NON richiede verifica
  if (response.token && !response.requires_verification) {
    this.setToken(response.token);
  }
  
  return response;
}

  async requestPasswordReset(email) {
    return this.post('/auth/request-password-reset', { email });
  }

  async resetPassword(resetData) {
    return this.post('/auth/reset-password', resetData);
  }

  async login(credentials) {
    const response = await this.post('/auth/login', credentials);
    if (response.token) {
      this.setToken(response.token);
    }
    return response;
  }

  async logout() {
    const response = await this.post('/auth/logout');
    this.setToken(null);
    return response;
  }

  async getCurrentDj() {
    return this.get('/auth/me');
  }

  async updateCurrentDj(userData) {
    return this.put('/auth/me', userData);
  }

  async changePassword(passwordData) {
    return this.put('/auth/change-password', passwordData);
  }

  async resendVerificationEmail(email) {
  return this.post('/auth/resend-verification', { email });
}

  async deleteAccount() {
  const response = await this.delete('/auth/delete-account');
  this.setToken(null);
  return response;
}

  // ==================== VENUES ENDPOINTS ====================

  async getVenues() {
    return this.get('/venues');
  }

  async createVenue(venueData) {
    return this.post('/venues', venueData);
  }

  async updateVenue(venueId, venueData) {
    return this.put(`/venues/${venueId}`, venueData);
  }

  async deleteVenue(venueId) {
    return this.delete(`/venues/${venueId}`);
  }

  async toggleVenue(venueId) {
    return this.post(`/venues/${venueId}/toggle`);
  }

  // ==================== SONGS ENDPOINTS ====================

  async getSongs(params = {}) {
    return this.get('/songs', params);
  }

  async addSong(songData) {
    return this.post('/songs', songData);
  }

  async bulkAddSongs(songsData) {
    return this.post('/songs/bulk', songsData);
  }

  async deleteSong(songId) {
    return this.delete(`/songs/${songId}`);
  }

  async clearCatalog() {
    return this.delete('/songs');
  }

  async getPublicCatalog(qrCodeId, params = {}) {
    return this.get(`/songs/public/${qrCodeId}`, params);
  }

  async generateExcelCatalog(songs) {
    const response = await fetch(`${this.baseURL}/songs/generate-excel`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ songs }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate Excel file');
    }

    return response.blob();
  }

  // ==================== BOOKINGS ENDPOINTS ====================

  async getBookings(venueId) {
    return this.get('/bookings', { venue_id: venueId });
  }

  async createBooking(bookingData) {
    return this.post('/bookings', bookingData);
  }

  async acceptBooking(bookingId) {
    return this.post(`/bookings/${bookingId}/accept`);
  }

  async rejectBooking(bookingId) {
    return this.post(`/bookings/${bookingId}/reject`);
  }

  async deleteBooking(bookingId) {
    return this.delete(`/bookings/${bookingId}`);
  }

  async deleteVenueBookings(venueId) {
    return this.delete(`/bookings/venue/${venueId}`);
  }

  async deleteAllBookings() {
    return this.delete('/bookings/all');
  }

  // User booking endpoints (with session cookies)
  async createUserBooking(bookingData) {
    const params = new URLSearchParams(bookingData);
    return this.post(`/bookings/user?${params}`);
  }

  async getUserBookings() {
    return this.get('/bookings/user/my-bookings');
  }

  async deleteUserBooking(bookingId) {
    return this.delete(`/bookings/user/${bookingId}`);
  }

  // ==================== SESSIONS ENDPOINTS ====================

  async validateSession(){
    return this.get('/sessions/validate');
  }

  async handleQRFlow(qrCodeId) {
  return this.get(`/sessions/qr-flow/${qrCodeId}`);
}

  async createSession(qrCodeId) {
    return this.post(`/sessions/create/${qrCodeId}`);
  }

  // ==================== SUGGESTIONS ENDPOINTS ====================

  async sendSuggestion(content) {
    return this.post('/suggestions/send-suggestion', { content });
  }

  // ==================== UTILITY METHODS ====================

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.token;
  }

  // Get current auth token
  getAuthToken() {
    return this.token;
  }

  // Clear all auth data
  clearAuth() {
    this.setToken(null);
  }
}


// Export singleton instance
export const apiClient = new ApiClient();

// Export class for testing
export { ApiClient };

// Legacy compatibility with Base44 SDK structure
// export const base44 = {
//   auth: {
//     login: (credentials) => apiClient.login(credentials),
//     register: (userData) => apiClient.register(userData),
//     logout: () => apiClient.logout(),
//     getCurrentUser: () => apiClient.getCurrentDj(),
//   },
//   entities: {
//     venues: {
//       list: () => apiClient.getVenues(),
//       create: (data) => apiClient.createVenue(data),
//       update: (id, data) => apiClient.updateVenue(id, data),
//       delete: (id) => apiClient.deleteVenue(id),
//     },
//     songs: {
//       list: (params) => apiClient.getSongs(params),
//       create: (data) => apiClient.addSong(data),
//       bulkCreate: (data) => apiClient.bulkAddSongs(data),
//       delete: (id) => apiClient.deleteSong(id),
//     },
//     bookings: {
//       list: (venueId) => apiClient.getBookings(venueId),
//       create: (data) => apiClient.createBooking(data),
//       update: (id, action) => {
//         if (action === 'accept') return apiClient.acceptBooking(id);
//         if (action === 'reject') return apiClient.rejectBooking(id);
//         throw new Error(`Unknown booking action: ${action}`);
//       },
//       delete: (id) => apiClient.deleteBooking(id),
//     },
//   },
// };

export default apiClient;