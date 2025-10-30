import { uniqueId } from 'lodash';
import {
  IconCalendar,
  IconFileDescription,
  IconChartLine,
  IconShoppingCart,
  IconShield,
  IconChecklist,
  IconUserCheck,
  IconAlertCircle,
  IconChartBar,
  IconBan,
  IconAperture,
} from '@tabler/icons-react';

// EO Menu
export const EOMenuItems = [
  {
    navlabel: true,
    subheader: 'Dashboard',
  },
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconAperture,
    href: '/eo/dashboard',
  },
  {
    navlabel: true,
    subheader: 'Events',
  },
  {
    id: uniqueId(),
    title: 'My Events',
    icon: IconCalendar,
    href: '/eo/events',
  },
  {
    id: uniqueId(),
    title: 'Create Event',
    icon: IconFileDescription,
    href: '/eo/events/create',
  },
  {
    id: uniqueId(),
    title: 'Event Rules',
    icon: IconChecklist,
    href: '/eo/events/rules',
  },
  {
    navlabel: true,
    subheader: 'Finance',
  },
  {
    id: uniqueId(),
    title: 'Payouts & Settlement',
    icon: IconChartLine,
    href: '/eo/payouts',
  },
];

// Tenant Menu
export const TenantMenuItems = [
  {
    navlabel: true,
    subheader: 'Dashboard',
  },
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconAperture,
    href: '/tenant/dashboard',
  },
  {
    navlabel: true,
    subheader: 'Events',
  },
  {
    id: uniqueId(),
    title: 'Browse Events',
    icon: IconShoppingCart,
    href: '/tenant/events',
  },
  {
    id: uniqueId(),
    title: 'Active Events',
    icon: IconCalendar,
    href: '/tenant/events/active',
  },
  {
    navlabel: true,
    subheader: 'Insurance',
  },
  {
    id: uniqueId(),
    title: 'My Claims',
    icon: IconShield,
    href: '/tenant/claims',
  },
];

// Admin Menu
export const AdminMenuItems = [
  {
    navlabel: true,
    subheader: 'Dashboard',
  },
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconAperture,
    href: '/admin/dashboard',
  },
  {
    navlabel: true,
    subheader: 'Payments',
  },
  {
    id: uniqueId(),
    title: 'Payment Management',
    icon: IconShoppingCart,
    href: '/admin/payments',
  },
  {
    navlabel: true,
    subheader: 'Verification',
  },
  {
    id: uniqueId(),
    title: 'Verify EO',
    icon: IconUserCheck,
    href: '/admin/eos',
  },
  {
    navlabel: true,
    subheader: 'Monitoring',
  },
  {
    id: uniqueId(),
    title: 'Event Audit',
    icon: IconAlertCircle,
    href: '/admin/events',
  },
  {
    id: uniqueId(),
    title: 'Fraud Detection',
    icon: IconBan,
    href: '/admin/fraud',
  },
  {
    id: uniqueId(),
    title: 'Payout Tracking',
    icon: IconChartLine,
    href: '/admin/payouts',
  },
  {
    navlabel: true,
    subheader: 'Analytics',
  },
  {
    id: uniqueId(),
    title: 'Analytics',
    icon: IconChartBar,
    href: '/admin/analytics',
  },
];

// Insurer Menu
export const InsurerMenuItems = [
  {
    navlabel: true,
    subheader: 'Dashboard',
  },
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconAperture,
    href: '/insurer/dashboard',
  },
  {
    navlabel: true,
    subheader: 'Claims',
  },
  {
    id: uniqueId(),
    title: 'Claims Inbox',
    icon: IconShield,
    href: '/insurer/claims',
  },
  {
    id: uniqueId(),
    title: 'Statistics',
    icon: IconChartBar,
    href: '/insurer/stats',
  },
];

export const getMenuItemsByRole = (role) => {
  switch (role) {
    case 'EO':
      return EOMenuItems;
    case 'TENANT':
      return TenantMenuItems;
    case 'ADMIN':
      return AdminMenuItems;
    case 'INSURER':
      return InsurerMenuItems;
    default:
      return [];
  }
};

