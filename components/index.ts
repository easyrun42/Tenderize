import dynamic from 'next/dynamic';

export const DynamicDashboard = dynamic(
    () => import('./Dashboard/Dashboard'),
    { ssr: false }
)