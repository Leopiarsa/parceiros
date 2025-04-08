import { Usuarios } from '../entities/user.entity.js';
import { Roles } from '../enums/roles.enum.js';

export async function seed() {
  // checa se tem o admin principal, usuario T

  const usuarios = await Usuarios.findBy({ email: 't', password: 't' });
  if (Array.isArray(usuarios) && usuarios.length === 0) {
    console.log('Usuario admin não encontrado, iniciando seed...');
    try {
      await Usuarios.insert({
        email: 't',
        password: 't',
        name: 't',
        telefone: 't',
        role: Roles.Administrador,
        createdAt: new Date(),
      });
      console.log('Usuario admin criado com sucesso!');
    } catch (error) {
      console.error('Falha no seed');
      console.error(error);
    }
  }
}
