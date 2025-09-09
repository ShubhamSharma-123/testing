import React from 'react';
import { Settings as SettingsIcon, Users, Shield, Globe } from 'lucide-react';

const Settings = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">System Settings</h1>
        <p className="text-slate-600 dark:text-slate-400">Configure system preferences and permissions</p>
      </div>

      {/* Coming Soon Message */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-12 border border-white/20 dark:border-slate-700/20 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-slate-500 to-slate-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <SettingsIcon className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">System Configuration</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
          Comprehensive system settings and configuration management for administrators.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
            <Users className="w-8 h-8 text-slate-500 mx-auto mb-3" />
            <h3 className="font-semibold text-slate-800 dark:text-white mb-2">User Management</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Manage user accounts and roles</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
            <Shield className="w-8 h-8 text-blue-500 mx-auto mb-3" />
            <h3 className="font-semibold text-slate-800 dark:text-white mb-2">Security Settings</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Configure security and permissions</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
            <Globe className="w-8 h-8 text-purple-500 mx-auto mb-3" />
            <h3 className="font-semibold text-slate-800 dark:text-white mb-2">System Preferences</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Timezone, currency, and localization</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;