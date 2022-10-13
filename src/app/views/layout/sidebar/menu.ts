import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Panel Administrador',
    icon: 'home',
    link: '/dashboard'
  },
  {
    label: 'Configuración',
    icon: 'settings',
    link: '/configuration'
  },
  {
    label: 'Ajustes',
    icon: 'sliders',
    link: '/settings'
  },
  {
    label: 'Información',
    isTitle: true
  },
  {
    label: 'Pedidos',
    icon: 'shopping-bag',
    link: '/orders',
  },
  {
    label: 'Artículos',
    icon: 'box',
    link: '/articles/data-table',
  },
  {
    label: 'Comerciales',
    icon: 'user',
    link: '/sellers/data-table',
  },
  {
    label: 'Clientes',
    icon: 'users',
    link: '/customers/data-table',
  },
];
