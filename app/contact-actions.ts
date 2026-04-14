'use server'

import fs from 'fs/promises';
import path from 'path';

const LEADS_FILE = path.join(process.cwd(), 'leads.json');

export async function emergencyLeadCapture(data: any) {
    try {
        let leads = [];
        try {
            const content = await fs.readFile(LEADS_FILE, 'utf-8');
            leads = JSON.parse(content);
        } catch (e) {
            // File doesn't exist yet, start fresh
        }

        leads.push({
            ...data,
            id: `local_${Date.now()}`,
            timestamp: new Array(new Date().toISOString()),
            source: 'emergency_fallback'
        });

        await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));
        console.log('✅ EMERGENCY CAPTURE: Lead saved to leads.json');
        return { success: true };
    } catch (error) {
        console.error('❌ CRITICAL FAILURE: Could not save lead even to local file.', error);
        return { success: false };
    }
}
