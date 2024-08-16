
const SettingsSection = () => (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Account Settings</h2>
      <div className="bg-white shadow rounded-lg p-4 md:p-6">
        <h3 className="text-xl font-semibold mb-4">Change Password</h3>
        <form className="space-y-4">
          <div>
            <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">Current Password</label>
            <input type="password" id="current-password" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">New Password</label>
            <input type="password" id="new-password" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
            <input type="password" id="confirm-password" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full md:w-auto">Change Password</button>
        </form>
      </div>
    </div>
  );

export default SettingsSection;
