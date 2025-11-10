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
    href: '/app/eo/dashboard',
  },
  {
    navlabel: true,
    subheader: 'Events',
  },
  {
    id: uniqueId(),
    title: 'My Events',
    icon: IconCalendar,
    href: '/app/eo/events',
  },
  {
    id: uniqueId(),
    title: 'Create Event',
    icon: IconFileDescription,
    href: '/app/eo/events/create',
  },
  // {
  //   id: uniqueId(),
  //   title: 'Event Rules',
  //   icon: IconChecklist,
  //   href: '/eo/events/rules',
  // },
  {
    navlabel: true,
    subheader: 'Finance',
  },
  {
    id: uniqueId(),
    title: 'Payouts & Settlement',
    icon: IconChartLine,
    href: '/app/eo/payouts',
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
    href: '/app/tenant/dashboard',
  },
  {
    navlabel: true,
    subheader: 'Events',
  },
  {
    id: uniqueId(),
    title: 'Browse Events',
    icon: IconShoppingCart,
    href: '/app/tenant/events',
  },
  {
    id: uniqueId(),
    title: 'Active Events',
    icon: IconCalendar,
    href: '/app/tenant/events/active',
  },
  {
    navlabel: true,
    subheader: 'Insurance',
  },
  {
    id: uniqueId(),
    title: 'My Claims',
    icon: IconShield,
    href: '/app/tenant/claims',
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
    href: '/app/admin/dashboard',
  },
  {
    navlabel: true,
    subheader: 'Payments',
  },
  {
    id: uniqueId(),
    title: 'Payment Management',
    icon: IconShoppingCart,
    href: '/app/admin/payments',
  },
  {
    navlabel: true,
    subheader: 'Verification',
  },
  {
    id: uniqueId(),
    title: 'Verify EO',
    icon: IconUserCheck,
    href: '/app/admin/eos',
  },
  {
    navlabel: true,
    subheader: 'Monitoring',
  },
  {
    id: uniqueId(),
    title: 'Event Audit',
    icon: IconAlertCircle,
    href: '/app/admin/events',
  },
  {
    id: uniqueId(),
    title: 'Fraud Detection',
    icon: IconBan,
    href: '/app/admin/fraud',
  },
  {
    id: uniqueId(),
    title: 'Payout Tracking',
    icon: IconChartLine,
    href: '/app/admin/payouts',
  },
  {
    navlabel: true,
    subheader: 'Analytics',
  },
  {
    id: uniqueId(),
    title: 'Analytics',
    icon: IconChartBar,
    href: '/app/admin/analytics',
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
    href: '/app/insurer/dashboard',
  },
  {
    navlabel: true,
    subheader: 'Claims',
  },
  {
    id: uniqueId(),
    title: 'Claims Inbox',
    icon: IconShield,
    href: '/app/insurer/claims',
  },
  {
    id: uniqueId(),
    title: 'Statistics',
    icon: IconChartBar,
    href: '/app/insurer/stats',
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

