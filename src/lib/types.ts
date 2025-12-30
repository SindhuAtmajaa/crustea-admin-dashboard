export type User = {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Technician' | 'Viewer';
  avatarUrl: string;
  status: 'Active' | 'Inactive';
};

export type Device = {
  id: string;
  name:string;
  type: 'Sensor' | 'Controller';
  status: 'Online' | 'Offline' | 'Error';
  lastSeen: string;
  poolId?: string;
};

export type Pool = {
  id: string;
  name: string;
  location: string;
  size: string; // e.g., "50,000L"
  status: 'Good' | 'Warning' | 'Critical';
  devices: string[]; // array of device IDs
};

export type PoolHealthData = {
  timestamp: string;
  pH: number;
  chlorine: number;
  temperature: number;
  TDS: number;
  alkalinity: number;
};
