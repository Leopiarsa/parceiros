import { Usuarios } from '@/src/entities/user.entity.js';
import sgMail from '@sendgrid/mail';
import { newUserBody, oportunidadeBody } from './emailBody.js';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendNewOpportunityEmail = async (userName: string, oportunidadeId: number, to?: string[]) => {
  const urlRedirect = `${process.env.DOMAIN}/admin/resources/Oportunidades/records/${oportunidadeId}/show`;

  const html = oportunidadeBody(urlRedirect, userName);

  const msgs = to.map((email) => {
    return {
      to: email,
      from: process.env.EMAIL_FROM,
      subject: 'Uma oportunidade foi criada',
      text: 'Oportunidade criada',
      html: html,
    };
  });

  sgMail
    .send(msgs)
    .then((response) => {
      console.log('SUCESSO DO SENDGRID');
    })
    .catch((error) => {
      console.error('ERRO DO SENDGRID', error);
    });
};

export const sendNewUserEmail = async (user: Usuarios, to?: string, subject?: string, text?: string) => {
  const urlRedirect = `${process.env.DOMAIN}/admin/resources/Usuarios/records/${user.id}/edit`;

  const html = newUserBody(urlRedirect, user);
  const msg = {
    to: to,
    from: process.env.EMAIL_FROM,
    subject: subject ?? 'Sua conta foi criada',
    text: text ?? 'Sua foi conta criada no Sistema de Parceiros',
    html: html,
  };

  sgMail
    .send(msg)
    .then((response) => {
      console.log('SUCESSO DO SENDGRID');
    })
    .catch((error) => {
      console.error('ERRO DO SENDGRID', error);
    });
};
