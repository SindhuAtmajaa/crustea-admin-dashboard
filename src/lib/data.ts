import type { User, Pool, Device, PoolHealthData } from './types';

export const users: User[] = [
  { id: 'usr_1', name: 'Admin User', email: 'admin@aquacontrol.com', role: 'Admin', avatarUrl: 'https://picsum.photos/seed/1/40/40', status: 'Active' },
  { id: 'usr_2', name: 'John Technician', email: 'john.t@aquacontrol.com', role: 'Technician', avatarUrl: 'https://picsum.photos/seed/2/40/40', status: 'Active' },
  { id: 'usr_3', name: 'Jane Viewer', email: 'jane.v@aquacontrol.com', role: 'Viewer', avatarUrl: 'https://picsum.photos/seed/3/40/40', status: 'Inactive' },
  { id: 'usr_4', name: 'Mike Smith', email: 'mike.s@aquacontrol.com', role: 'Technician', avatarUrl: 'https://picsum.photos/seed/4/40/40', status: 'Active' },
  { id: 'usr_5', name: 'Sarah Jones', email: 'sarah.j@aquacontrol.com', role: 'Admin', avatarUrl: 'https://picsum.photos/seed/5/40/40', status: 'Active' },
];

export const devices: Device[] = [
  { id: 'dev_1', name: 'pH Sensor A', type: 'Sensor', status: 'Online', lastSeen: '2 minutes ago', poolId: 'pool_1' },
  { id: 'dev_2', name: 'Chlorine Pump A', type: 'Controller', status: 'Online', lastSeen: '5 minutes ago', poolId: 'pool_1' },
  { id: 'dev_3', name: 'Temp Sensor B', type: 'Sensor', status: 'Offline', lastSeen: '2 hours ago', poolId: 'pool_2' },
  { id: 'dev_4', name: 'Main Controller C', type: 'Controller', status: 'Error', lastSeen: '1 day ago', poolId: 'pool_3' },
  { id: 'dev_5', name: 'TDS Sensor A', type: 'Sensor', status: 'Online', lastSeen: '1 minute ago', poolId: 'pool_1' },
];

export const pools: Pool[] = [
  { id: 'pool_1', name: 'Main Lap Pool', location: 'Building A', size: '75,000L', status: 'Good', devices: ['dev_1', 'dev_2', 'dev_5'] },
  { id: 'pool_2', name: 'Recreation Pool', location: 'Building B', size: '50,000L', status: 'Warning', devices: ['dev_3'] },
  { id: 'pool_3', name: 'Spa Jacuzzi', location: 'Rooftop', size: '5,000L', status: 'Critical', devices: ['dev_4'] },
  { id: 'pool_4', name: 'Kiddie Pool', location: 'Building A', size: '10,000L', status: 'Good', devices: [] },
];

export const poolHealthData: Record<string, PoolHealthData[]> = {
  'pool_1': [
    { timestamp: '2024-07-29T08:00:00Z', pH: 7.4, chlorine: 1.5, temperature: 28, TDS: 450, alkalinity: 100 },
    { timestamp: '2024-07-29T12:00:00Z', pH: 7.5, chlorine: 1.2, temperature: 29, TDS: 455, alkalinity: 102 },
    { timestamp: '2024-07-29T16:00:00Z', pH: 7.3, chlorine: 1.8, temperature: 28.5, TDS: 460, alkalinity: 98 },
    { timestamp: '2024-07-29T20:00:00Z', pH: 7.6, chlorine: 1.1, temperature: 27, TDS: 465, alkalinity: 105 },
    { timestamp: '2024-07-30T00:00:00Z', pH: 7.4, chlorine: 1.6, temperature: 26, TDS: 470, alkalinity: 101 },
  ],
  'pool_2': [
    { timestamp: '2024-07-29T08:00:00Z', pH: 7.8, chlorine: 0.8, temperature: 30, TDS: 600, alkalinity: 130 },
    { timestamp: '2024-07-29T12:00:00Z', pH: 7.9, chlorine: 0.7, temperature: 31, TDS: 610, alkalinity: 135 },
    { timestamp: '2024-07-29T16:00:00Z', pH: 7.7, chlorine: 1.0, temperature: 30.5, TDS: 615, alkalinity: 128 },
    { timestamp: '2024-07-29T20:00:00Z', pH: 8.0, chlorine: 0.5, temperature: 29, TDS: 625, alkalinity: 140 },
    { timestamp: '2024-07-30T00:00:00Z', pH: 7.8, chlorine: 0.9, temperature: 28, TDS: 630, alkalinity: 132 },
  ],
  'pool_3': [
    { timestamp: '2024-07-29T08:00:00Z', pH: 6.8, chlorine: 3.5, temperature: 38, TDS: 800, alkalinity: 70 },
    { timestamp: '2024-07-29T12:00:00Z', pH: 6.7, chlorine: 3.8, temperature: 39, TDS: 810, alkalinity: 65 },
    { timestamp: '2024-07-29T16:00:00Z', pH: 6.9, chlorine: 3.2, temperature: 38.5, TDS: 815, alkalinity: 72 },
    { timestamp: '2024-07-29T20:00:00Z', pH: 6.6, chlorine: 4.0, temperature: 37, TDS: 825, alkalinity: 60 },
    { timestamp: '2024-07-30T00:00:00Z', pH: 6.8, chlorine: 3.6, temperature: 36, TDS: 830, alkalinity: 68 },
  ],
   'pool_4': [],
};

export const dashboardChartData = [
  { date: 'Jul 24', 'Main Lap Pool': 7.4, 'Recreation Pool': 7.8, 'Spa Jacuzzi': 6.8 },
  { date: 'Jul 25', 'Main Lap Pool': 7.5, 'Recreation Pool': 7.9, 'Spa Jacuzzi': 6.7 },
  { date: 'Jul 26', 'Main Lap Pool': 7.3, 'Recreation Pool': 7.7, 'Spa Jacuzzi': 6.9 },
  { date: 'Jul 27', 'Main Lap Pool': 7.6, 'Recreation Pool': 8.0, 'Spa Jacuzzi': 6.6 },
  { date: 'Jul 28', 'Main Lap Pool': 7.4, 'Recreation Pool': 7.8, 'Spa Jacuzzi': 6.8 },
  { date: 'Jul 29', 'Main Lap Pool': 7.5, 'Recreation Pool': 7.9, 'Spa Jacuzzi': 6.7 },
  { date: 'Jul 30', 'Main Lap Pool': 7.4, 'Recreation Pool': 7.8, 'Spa Jacuzzi': 6.8 },
];
