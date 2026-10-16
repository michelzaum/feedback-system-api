export interface IHealthCheck {
  status: 'ok' | 'error';
  database: 'up' | 'down';
  timestamp: string;
  uptimeSeconds: number;
}
