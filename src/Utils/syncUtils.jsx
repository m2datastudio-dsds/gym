import localforage from 'localforage';

export const saveToLocalForage = async (key, value) => {
  try {
    await localforage.setItem(key, value);
  } catch (error) {
    console.error(`Error saving ${key} to localForage:`, error);
  }
};

export const getFromLocalForage = async (key) => {
  try {
    return await localforage.getItem(key);
  } catch (error) {
    console.error(`Error getting ${key} from localForage:`, error);
    return null;
  }
};

export const removeFromLocalForage = async (key) => {
  try {
    await localforage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key} from localForage:`, error);
  }
};

export const syncData = async (key, url, method = 'POST') => {
  const data = await getFromLocalForage(key);
  if (data) {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.code === 200 || result.code === 201) {
        await removeFromLocalForage(key);
      } else {
        console.error('Failed to sync data:', result.message);
      }
    } catch (error) {
      console.error('Error syncing data:', error);
    }
  }
};

export const syncAllData = async () => {
  const keys = await localforage.keys();
  for (const key of keys) {
    if (key.startsWith('staff_')) {
      await syncData(key, 'https://5od4qppwlj.execute-api.us-east-1.amazonaws.com/dev/api/staff/savestaff');
    }
    if (key.startsWith('edit_staff_')) {
      await syncData(key, `https://5od4qppwlj.execute-api.us-east-1.amazonaws.com/dev/api/staff/updatestaff/${key.split('_')[2]}`, 'PUT');
    }
    if (key.startsWith('delete_staff_')) {
      await syncData(key, `https://5od4qppwlj.execute-api.us-east-1.amazonaws.com/dev/api/staff/deletestaff/${key.split('_')[2]}`, 'DELETE');
    }
    if (key.startsWith('offline-member-')) {
      await syncData(key, 'https://5od4qppwlj.execute-api.us-east-1.amazonaws.com/dev/api/member/savemember');
    }
    if (key.startsWith('offline-update-member-')) {
      await syncData(key, `https://5od4qppwlj.execute-api.us-east-1.amazonaws.com/dev/api/member/updatemember/${key.split('-')[2]}`, 'PUT');
    }
    if (key.startsWith('delete_member_')) {
      await syncData(key, `https://5od4qppwlj.execute-api.us-east-1.amazonaws.com/dev/api/member/deletemember/${key.split('-')[2]}`, 'DELETE');
    }
  }
};

window.addEventListener('online', syncAllData);
