// Google Sheets Service - Real lead logging and interaction tracking
// Handles logging all calls, bookings, and interactions to Google Sheets

export class GoogleSheetsService {
  constructor(env) {
    this.env = env;
    this.baseURL = 'https://sheets.googleapis.com/v4/spreadsheets';
  }

  // Get Google Sheets access token
  async getAccessToken() {
    try {
      // Use service account authentication (same as calendar)
      const header = {
        alg: 'RS256',
        typ: 'JWT'
      };

      const now = Math.floor(Date.now() / 1000);
      const claim = {
        iss: this.env.GOOGLE_CLIENT_EMAIL,
        scope: 'https://www.googleapis.com/auth/spreadsheets',
        aud: 'https://www.googleapis.com/oauth2/v4/token',
        exp: now + 3600,
        iat: now
      };

      // Create JWT
      const jwt = await this.createJWT(header, claim);
      
      const tokenResponse = await fetch('https://www.googleapis.com/oauth2/v4/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
          assertion: jwt
        })
      });

      const tokenData = await tokenResponse.json();
      return tokenData.access_token;
    } catch (error) {
      console.error('Error getting Google Sheets access token:', error);
      throw new Error('Failed to authenticate with Google Sheets');
    }
  }

  // Create JWT for Google service account
  async createJWT(header, claim) {
    try {
      // Import crypto for signing
      const encoder = new TextEncoder();
      const privateKey = this.env.GOOGLE_PRIVATE_KEY;
      
      // Clean up the private key format
      const cleanPrivateKey = privateKey
        .replace(/-----BEGIN PRIVATE KEY-----/g, '')
        .replace(/-----END PRIVATE KEY-----/g, '')
        .replace(/\s/g, '');
      
      // Create JWT header and payload
      const encodedHeader = this.base64UrlEncode(JSON.stringify(header));
      const encodedPayload = this.base64UrlEncode(JSON.stringify(claim));
      
      // Create signature input
      const signatureInput = `${encodedHeader}.${encodedPayload}`;
      
      // Import private key for signing
      const keyData = this.base64Decode(cleanPrivateKey);
      const privateKeyData = await crypto.subtle.importKey(
        'pkcs8',
        keyData,
        {
          name: 'RSASSA-PKCS1-v1_5',
          hash: 'SHA-256',
        },
        false,
        ['sign']
      );
      
      // Sign the JWT
      const signature = await crypto.subtle.sign(
        'RSASSA-PKCS1-v1_5',
        privateKeyData,
        encoder.encode(signatureInput)
      );
      
      // Encode signature
      const encodedSignature = this.base64UrlEncode(
        String.fromCharCode(...new Uint8Array(signature))
      );
      
      return `${signatureInput}.${encodedSignature}`;
    } catch (error) {
      console.error('JWT creation error:', error);
      throw new Error('Failed to create JWT for Google authentication');
    }
  }

  // Base64 URL encode helper
  base64UrlEncode(str) {
    return btoa(str)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  // Base64 decode helper
  base64Decode(base64) {
    const cleaned = base64.replace(/-/g, '+').replace(/_/g, '/');
    const padded = cleaned + '='.repeat((4 - cleaned.length % 4) % 4);
    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  }

  // Ensure worksheet exists and has headers
  async ensureWorksheet(sheetId, worksheetName = 'Interactions') {
    try {
      const accessToken = await this.getAccessToken();
      
      // Get spreadsheet info
      const response = await fetch(`${this.baseURL}/${sheetId}?includeGridData=false`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to access spreadsheet: ${response.status}`);
      }

      const spreadsheet = await response.json();
      
      // Check if worksheet exists
      const worksheet = spreadsheet.sheets.find(sheet => sheet.properties.title === worksheetName);
      
      if (!worksheet) {
        // Create new worksheet
        await this.createWorksheet(sheetId, worksheetName);
        await this.addHeaders(sheetId, worksheetName);
      } else {
        // Check if headers exist
        await this.ensureHeaders(sheetId, worksheetName);
      }

      return true;
    } catch (error) {
      console.error('Error ensuring worksheet:', error);
      throw new Error('Failed to prepare worksheet');
    }
  }

  // Create new worksheet
  async createWorksheet(sheetId, worksheetName) {
    try {
      const accessToken = await this.getAccessToken();
      
      const response = await fetch(`${this.baseURL}/${sheetId}:batchUpdate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          requests: [{
            addSheet: {
              properties: {
                title: worksheetName,
                gridProperties: {
                  rowCount: 1000,
                  columnCount: 15
                }
              }
            }
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to create worksheet: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating worksheet:', error);
      throw new Error('Failed to create worksheet');
    }
  }

  // Add headers to worksheet
  async addHeaders(sheetId, worksheetName) {
    try {
      const accessToken = await this.getAccessToken();
      
      const headers = [
        'Date',
        'Time',
        'Client ID',
        'Name',
        'Phone',
        'Email',
        'Channel',
        'Intent',
        'Status',
        'Service',
        'Requested Time',
        'Booked Time',
        'Outcome',
        'Notes',
        'Duration',
        'Follow Up Required'
      ];

      const response = await fetch(`${this.baseURL}/${sheetId}/values/${worksheetName}!A1:P1?valueInputOption=USER_ENTERED`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          values: [headers]
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to add headers: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error adding headers:', error);
      throw new Error('Failed to add headers');
    }
  }

  // Ensure headers exist (check first row)
  async ensureHeaders(sheetId, worksheetName) {
    try {
      const accessToken = await this.getAccessToken();
      
      const response = await fetch(`${this.baseURL}/${sheetId}/values/${worksheetName}!A1:P1`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to check headers: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.values || data.values.length === 0) {
        await this.addHeaders(sheetId, worksheetName);
      }

      return true;
    } catch (error) {
      console.error('Error ensuring headers:', error);
      throw new Error('Failed to ensure headers');
    }
  }

  // Log interaction to Google Sheets
  async logInteraction(sheetId, interactionData) {
    try {
      await this.ensureWorksheet(sheetId);
      
      const accessToken = await this.getAccessToken();
      
      // Prepare row data
      const rowData = [
        interactionData.date || new Date().toLocaleDateString(),
        interactionData.time || new Date().toLocaleTimeString(),
        interactionData.clientId || '',
        interactionData.name || '',
        interactionData.phone || '',
        interactionData.email || '',
        interactionData.channel || '',
        interactionData.intent || '',
        interactionData.status || '',
        interactionData.service || '',
        interactionData.requestedTime || '',
        interactionData.bookedTime || '',
        interactionData.outcome || '',
        interactionData.notes || '',
        interactionData.duration || '',
        interactionData.followUpRequired || 'Yes'
      ];

      // Find next available row
      const nextRow = await this.getNextAvailableRow(sheetId);
      
      const response = await fetch(`${this.baseURL}/${sheetId}/values/Interactions!A${nextRow}:P${nextRow}?valueInputOption=USER_ENTERED`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          values: [rowData]
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to log interaction: ${response.status}`);
      }

      return {
        success: true,
        row: nextRow,
        message: 'Interaction logged successfully'
      };
    } catch (error) {
      console.error('Error logging interaction:', error);
      return {
        success: false,
        error: 'Failed to log interaction',
        message: error.message
      };
    }
  }

  // Get next available row
  async getNextAvailableRow(sheetId) {
    try {
      const accessToken = await this.getAccessToken();
      
      const response = await fetch(`${this.baseURL}/${sheetId}/values/Interactions!A:A`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to get next row: ${response.status}`);
      }

      const data = await response.json();
      const rowCount = data.values ? data.values.length : 0;
      
      // Add 2 (1 for header, 1 for next available row)
      return rowCount + 2;
    } catch (error) {
      console.error('Error getting next row:', error);
      return 2; // Default to row 2 if there's an error
    }
  }

  // Get recent interactions
  async getRecentInteractions(sheetId, limit = 50) {
    try {
      const accessToken = await this.getAccessToken();
      
      const response = await fetch(`${this.baseURL}/${sheetId}/values/Interactions!A2:P${limit + 1}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to get interactions: ${response.status}`);
      }

      const data = await response.json();
      const interactions = [];

      if (data.values) {
        const headers = [
          'date', 'time', 'clientId', 'name', 'phone', 'email', 'channel',
          'intent', 'status', 'service', 'requestedTime', 'bookedTime', 
          'outcome', 'notes', 'duration', 'followUpRequired'
        ];

        data.values.forEach(row => {
          const interaction = {};
          headers.forEach((header, index) => {
            interaction[header] = row[index] || '';
          });
          interactions.push(interaction);
        });
      }

      return {
        success: true,
        interactions: interactions.reverse() // Most recent first
      };
    } catch (error) {
      console.error('Error getting interactions:', error);
      return {
        success: false,
        error: 'Failed to get interactions',
        message: error.message
      };
    }
  }

  // Get interactions by date range
  async getInteractionsByDateRange(sheetId, startDate, endDate) {
    try {
      const accessToken = await this.getAccessToken();
      
      // Get all interactions (for now - could optimize with query)
      const response = await fetch(`${this.baseURL}/${sheetId}/values/Interactions!A:P`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to get interactions: ${response.status}`);
      }

      const data = await response.json();
      const filteredInteractions = [];

      if (data.values && data.values.length > 1) {
        const headers = data.values[0];
        const rows = data.values.slice(1);

        rows.forEach(row => {
          const interactionDate = row[0]; // Date column
          
          if (interactionDate) {
            // Simple date comparison (could be improved)
            if (interactionDate >= startDate && interactionDate <= endDate) {
              const interaction = {};
              headers.forEach((header, index) => {
                interaction[header.toLowerCase().replace(' ', '')] = row[index] || '';
              });
              filteredInteractions.push(interaction);
            }
          }
        });
      }

      return {
        success: true,
        interactions: filteredInteractions
      };
    } catch (error) {
      console.error('Error getting interactions by date range:', error);
      return {
        success: false,
        error: 'Failed to get interactions by date range',
        message: error.message
      };
    }
  }

  // Update interaction (for follow-up status, etc.)
  async updateInteraction(sheetId, rowNumber, updateData) {
    try {
      const accessToken = await this.getAccessToken();
      
      // Get current row data
      const currentResponse = await fetch(`${this.baseURL}/${sheetId}/values/Interactions!A${rowNumber}:P${rowNumber}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!currentResponse.ok) {
        throw new Error(`Failed to get current row: ${currentResponse.status}`);
      }

      const currentData = await currentResponse.json();
      const currentRow = currentData.values[0] || [];

      // Update specific columns
      const headers = [
        'date', 'time', 'clientId', 'name', 'phone', 'email', 'channel',
        'intent', 'status', 'service', 'requestedTime', 'bookedTime', 
        'outcome', 'notes', 'duration', 'followUpRequired'
      ];

      headers.forEach((header, index) => {
        if (updateData[header] !== undefined) {
          currentRow[index] = updateData[header];
        }
      });

      // Update the row
      const updateResponse = await fetch(`${this.baseURL}/${sheetId}/values/Interactions!A${rowNumber}:P${rowNumber}?valueInputOption=USER_ENTERED`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          values: [currentRow]
        })
      });

      if (!updateResponse.ok) {
        throw new Error(`Failed to update interaction: ${updateResponse.status}`);
      }

      return {
        success: true,
        message: 'Interaction updated successfully'
      };
    } catch (error) {
      console.error('Error updating interaction:', error);
      return {
        success: false,
        error: 'Failed to update interaction',
        message: error.message
      };
    }
  }
}
