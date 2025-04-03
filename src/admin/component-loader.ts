import { ComponentLoader } from 'adminjs';

const componentLoader = new ComponentLoader();

const Components = {
  MyButton: componentLoader.add('MyButton', '../components/Button'),
  Banner: componentLoader.add('Banner', '../components/Banner'),
  UserList: componentLoader.add('UserList', '../components/UserList'),
  RoleBadge: componentLoader.add('RoleBadge', '../components/RoleBadge'),
  MultiCheckbox: componentLoader.add('MultiCheckbox', '../components/MultiCheckbox'),
  FileButtonActions: componentLoader.add('FileButtonActions', '../components/FileActionsButton.tsx'),
  AdminDashboard: componentLoader.add('AdminDashboard', '../components/Dashboard.tsx'),
  CustomInput: componentLoader.add('CustomInput', '../components/CustomInput.tsx'),
  CustomSwitch: componentLoader.add('CustomSwitch', '../components/CustomSwitch.tsx'),
  CustomSelect: componentLoader.add('CustomSelect', '../components/CustomSelect.tsx'),
  CustomLink: componentLoader.add('CustomLink', '../components/Link.tsx'),
  PasswordInput: componentLoader.add('PasswordInput', '../components/PasswordInput.tsx'),
  ListPartners: componentLoader.add('ListPartners', '../components/ListPartners.tsx'),
};

export { componentLoader, Components };
