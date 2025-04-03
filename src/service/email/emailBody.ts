import { Usuarios } from '@/src/entities/user.entity.js';

export const oportunidadeBody = (urlRedirect: string, userName: string) => {
  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Oportunidade Criada</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #E3F2FD;
            margin: 0;
            padding: 0;
          }
          .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          .email-header {
            background-color: #1976D2;
            color: #ffffff;
            text-align: center;
            padding: 20px;
          }
          .email-body {
            padding: 20px;
            color: #333333;
            line-height: 1.6;
          }
          .email-footer {
            background-color: #E3F2FD;
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #555555;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            background-color: #1976D2;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
          }
          .button:hover {
            background-color: #1565C0;
          }
        </style>
      </head>
      <body>
        <div class="email-container" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
  <div class="email-header" style="text-align: center; background-color: #007bff; padding: 20px; color: white; border-radius: 8px 8px 0 0;">
    <h1 style="margin: 0;">🎉 Oportunidade Para Você</h1>
  </div>
  <div class="email-body" style="background-color: white; padding: 20px; border-radius: 0 0 8px 8px; line-height: 1.6;">
    <p>Olá, <strong>${userName || 'Parceiro'}</strong>! 👋</p>
    <p>Uma nova oportunidade foi enviada para você no <strong>Sistema de Parceiros</strong>. Confira os detalhes e aproveite esta oportunidade!</p>
    
    <div style="text-align: center; margin: 20px 0;">
      <a href=${urlRedirect} class="button" style="background-color: #007bff; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px; display: inline-block;">
        🔍 Ver Oportunidade
      </a>
    </div>
    
    <p>Se precisar de ajuda, estamos à disposição!</p>
    <p>Atenciosamente,</p>
    <p><strong>Equipe do Sistema de Parceiros</strong></p>
  </div>
  <div class="email-footer" style="text-align: center; font-size: 12px; color: #777; margin-top: 20px;">
    <p>Este é um email automático. Por favor, não responda.</p>
    <p>&copy; 2025 Sistema de Parceiros. Todos os direitos reservados.</p>
  </div>
</div>
      </body>
      </html>
    `;
};

export const newUserBody = (urlRedirect: string, user: Usuarios) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Conta Criada</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #E3F2FD;
          margin: 0;
          padding: 0;
        }
        .email-container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .email-header {
          background-color: #1976D2;
          color: #ffffff;
          text-align: center;
          padding: 20px;
        }
        .email-body {
          padding: 20px;
          color: #333333;
          line-height: 1.6;
        }
        .email-footer {
          background-color: #E3F2FD;
          text-align: center;
          padding: 10px;
          font-size: 12px;
          color: #555555;
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          margin-top: 20px;
          background-color: #1976D2;
          color: #ffffff;
          text-decoration: none;
          border-radius: 5px;
        }
        .button:hover {
          background-color: #1565C0;
        }
      </style>
    </head>
    <body>
     <div class="email-header" style="text-align: center; background-color: #007bff; padding: 20px; color: white; border-radius: 8px 8px 0 0;">
      <h1>🎉 Sua Conta Foi Criada com Sucesso!</h1>
    </div>
    <div class="email-body" style="background-color: white; padding: 20px; border-radius: 0 0 8px 8px;">
      <p>Olá, <strong>${user.name || 'Usuário'}</strong>! 👋</p>
      <p>Bem-vindo ao <strong>Sistema de Parceiros</strong>! Sua conta já está ativa e pronta para uso.</p>
      <p><strong>Seu email:</strong> ${user.email}</p>
      <p><strong>Sua senha temporária:</strong> ${user.password}</p>
      <p>Para garantir sua segurança, recomendamos que você altere sua senha agora mesmo. Basta clicar no botão abaixo:</p>
      
      <div style="text-align: center; margin: 20px 0;">
        <a href="${urlRedirect}" class="button" style="background-color: #007bff; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px; display: inline-block;">
          🔒 Alterar Senha
        </a>
      </div>

      <p>Se precisar de ajuda, estamos à disposição!</p>
      <p>Atenciosamente,</p>
      <p><strong>Equipe do Sistema de Parceiros</strong></p>
    </div>
    <div class="email-footer" style="text-align: center; font-size: 12px; color: #777; margin-top: 20px;">
      <p>Este é um email automático. Por favor, não responda.</p>
      <p>&copy; 2025 Sistema de Parceiros. Todos os direitos reservados.</p>
    </div>
  </div>
    </body>
    </html>
  `;
};
