import { ComponentLoader } from 'adminjs';

const componentLoader = new ComponentLoader();

const bundle = (componentName: string, path: string) => componentLoader.add(componentName, path);

const Components = {
  MyButton: bundle('MyButton', '../components/Button'),
  Banner: bundle('Banner', '../components/Banner'),
  UserList: bundle('UserList', '../components/UserList'),
  RoleBadge: bundle('RoleBadge', '../components/RoleBadge'),
  MultiCheckbox: bundle('MultiCheckbox', '../components/MultiCheckbox'),
  FileButtonActions: bundle('FileButtonActions', '../components/FileActionsButton'),
  AdminDashboard: bundle('AdminDashboard', '../components/Dashboard'),
  CustomInput: bundle('CustomInput', '../components/CustomInput'),
  InputMasked: bundle('InputMasked', '../components/InputMasked'),
  CustomSwitch: bundle('CustomSwitch', '../components/CustomSwitch'),
  CustomSelect: bundle('CustomSelect', '../components/CustomSelect'),
  CustomLink: bundle('CustomLink', '../components/Link'),
  PasswordInput: bundle('PasswordInput', '../components/PasswordInput'),
  ListPartners: bundle('ListPartners', '../components/ListPartners'),
};

export { componentLoader, Components };
