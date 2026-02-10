import { adminDb } from '@/lib/firebase/admin';
import Link from 'next/link';

async function getUsers() {
    const snapshot = await adminDb.collection('portal_users').limit(50).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export default async function AdminUsersPage() {
    const users = await getUsers();

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Portal Users</h1>
                    <p className="opacity-60">Manage across all tenant clients</p>
                </div>
            </div>

            <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                            <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">User</th>
                            <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">Client ID</th>
                            <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">Role</th>
                            <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {users.map((user: any) => (
                            <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
                                            {user.email?.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-medium">{user.email}</p>
                                            <p className="text-xs opacity-50">{user.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm opacity-80">
                                    <Link href={`/admin/clients/${user.clientId}`} className="hover:text-blue-400 underline decoration-blue-500/30">
                                        {user.clientId}
                                    </Link>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === 'admin' ? 'bg-purple-500/10 text-purple-400' : 'bg-blue-500/10 text-blue-400'
                                        }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400">
                                        Active
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
                                        Manage
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center opacity-40">
                                    No users found in the system.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
