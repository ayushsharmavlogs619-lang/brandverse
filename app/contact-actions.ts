// 'use server' (disabled for static export)

import fs from 'fs/promises';
import path from 'path';

const LEADS_FILE = path.join(process.cwd(), 'leads.json');

export async function emergencyLeadCapture(data: any) {
    try {
        // let leads = [];
        // try {
        //     const content = await fs.readFile(LEADS_FILE, 'utf-8');
        //     leads = JSON.parse(content);
        // } catch (e) {}
        // leads.push({...data, id: `local_${Date.now()}`, timestamp: [new Date().toISOString()], source: 'emergency_fallback'});
        // await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));
        console.log('✅ EMERGENCY CAPTURE MOCK: data captured', data);
        return { success: true };
    } catch (error) {
        console.error('❌ CRITICAL FAILURE: Could not save lead even to local file.', error);
        return { success: false };
    }
}
