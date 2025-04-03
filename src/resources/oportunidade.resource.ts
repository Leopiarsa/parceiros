import 'dotenv/config';
import { In } from 'typeorm';
import { Components } from '../admin/component-loader.js';
import { Oportunidades } from '../entities/oportunidade.entity.js';
import { Parceiros } from '../entities/parceiro.entity.js';
import { Roles } from '../enums/roles.enum.js';

const OportunidadeResource = {
  resource: Oportunidades,
  options: {
    navigation: {
      icon: 'Anchor',
    },
    name: 'Oportunidades',
    properties: {
      id: {
        isVisible: { list: false, show: false, edit: false, filter: false },
      },
      arquivo: {
        isVisible: { list: false, show: true, edit: true, filter: false },

        components: {
          edit: Components.FileButtonActions,
          new: Components.FileButtonActions,
          show: Components.CustomLink,
        },
        custom: {
          label: 'Url do arquivo',
        },
      },
      nome: {
        type: 'string',
        components: {
          edit: Components.CustomInput,
          new: Components.CustomInput,
        },
        custom: {
          label: 'Nome',
        },
      },
      telefone: {
        type: 'string',
        components: {
          edit: Components.CustomInput,
          new: Components.CustomInput,
        },
        custom: {
          label: 'Telefone',
        },
      },
      endereco: {
        isVisible: { list: true, show: true, edit: true, filter: false },
        type: 'string',
        components: {
          edit: Components.CustomInput,
          new: Components.CustomInput,
        },
        custom: {
          label: 'Endereço',
        },
      },
      tipoDeContato: {
        custom: {
          label: 'Tipo de contato',
        },
        isVisible: { list: true, show: true, edit: true, filter: false },
        type: 'string',
        components: {
          edit: Components.CustomInput,
          new: Components.CustomInput,
        },
      },
      fonte: {
        custom: {
          label: 'Fonte',
        },
        isVisible: { list: true, show: true, edit: true, filter: false },
        type: 'string',
        components: {
          edit: Components.CustomInput,
          new: Components.CustomInput,
        },
      },
      tipoDeAcao: {
        custom: {
          label: 'Tipo de ação',
        },
        isVisible: { list: false, show: true, edit: true, filter: false },
        type: 'string',
        components: {
          edit: Components.CustomInput,
          new: Components.CustomInput,
        },
      },
      cpf: {
        custom: {
          label: 'CPF',
        },
        isVisible: { list: true, show: true, edit: true, filter: false },
        type: 'string',
        components: {
          edit: Components.CustomInput,
          new: Components.CustomInput,
        },
      },
      comentario: {
        custom: {
          label: 'Comentário',
        },
        isVisible: { list: false, show: true, edit: true, filter: false },
        type: 'string',
        components: {
          edit: Components.CustomInput,
          new: Components.CustomInput,
        },
      },
      parceiros: {
        isAccessible: ({ currentAdmin }) => currentAdmin.role !== Roles.Administrador,
        isVisible: {
          list: false,
          show: true,
          edit: true,
          filter: false,
        },
        reference: 'Parceiros',
        isArray: true,
        components: {
          edit: Components.MultiCheckbox,
          new: Components.MultiCheckbox,
          show: Components.ListPartners,
        },
        custom: {
          label: 'Parceiros',
        },
      },
      createdAt: {
        isVisible: { list: false, show: true, edit: false, filter: true },
      },
      updatedAt: {
        isVisible: { list: false, show: true, edit: false, filter: false },
      },
    },
    actions: {
      list: {
        isVisible: { list: true, show: true, edit: true, filter: false, delete: false },
        isAccessible: true,
        after: async (response, req) => {
          const currentUser = req.session.adminUser;

          if (response.records) {
            const oportunidadeIds = response.records.map((record) => record.params.id);

            const oportunidadesComParceiros = await Oportunidades.find({
              where: { id: In(oportunidadeIds) },
              relations: ['parceiros'],
            });

            if (currentUser.role === Roles.Administrador) {
              response.records = response.records.filter((record) =>
                oportunidadesComParceiros.some((o) => o.id === record.params.id)
              );
            } else if (currentUser.role === Roles.Parceiro) {
              response.records = response.records.filter((record) => {
                const oportunidade = oportunidadesComParceiros.find(
                  (oportunidade) => oportunidade.id === record.params.id
                );

                return (
                  oportunidade &&
                  oportunidade.parceiros.some((parceiro) => Number(parceiro.userID) === Number(currentUser._id))
                );
              });
            }
          }

          return response;
        },
      },
      show: {
        isAccessible: true,
        after: async (response, req) => {
          const currentUser = req.session.adminUser;

          if (response.record && response.record.params.id) {
            const oportunidade = await Oportunidades.findOne({
              where: { id: response.record.params.id },
              relations: ['parceiros'],
            });

            if (oportunidade && currentUser.role !== Roles.Parceiro) {
              response.record.params.parceiros = oportunidade.parceiros;
            }
          }

          return response;
        },
      },
      edit: {
        isAccessible: ({ currentAdmin }) => currentAdmin.role !== Roles.Parceiro,
        before: async (request) => {
          const partnerKeys = Object.keys(request.payload).filter((key) => key.startsWith('parceiros.'));
          const formatedUserIds = partnerKeys.map((key) => Number(request.payload[key]));

          if (request.payload['arquivo.fileName']) {
            const latestFile = await Oportunidades.findOne({ where: { arquivo: request.payload.arquivo } });

            if (latestFile) {
              //delete latest , put the new
            }
          }

          const partnerKeysFromDB = await Parceiros.find({ where: { id: In(formatedUserIds) } });

          if (partnerKeysFromDB) {
            request.payload = {
              nome: request.payload.nome,
              telefone: request.payload.telefone,
              endereco: request.payload.endereco,
              arquivo: request.payload.arquivo,
              tipoDeContato: request.payload.tipoDeContato,
              fonte: request.payload.fonte,
              tipoDeAcao: request.payload.tipoDeAcao,
              cpf: request.payload.cpf,
              comentario: request.payload.comentario,
              parceiros: partnerKeysFromDB,
            };
          }

          return request;
        },
        after: async (response) => {
          if (response.record && response.record.params.id) {
            const oportunidade = await Oportunidades.findOne({
              where: { id: response.record.params.id },
              relations: ['parceiros'],
            });

            if (oportunidade) {
              response.record.params.parceiros = oportunidade.parceiros;
            }
          }

          return response;
        },
      },
      delete: {
        isAccessible: ({ currentAdmin }) => currentAdmin.role !== Roles.Parceiro,
        isVisible: ({ currentAdmin }) => currentAdmin.role !== Roles.Parceiro,
      },
      bulkDelete: {
        isAccessible: ({ currentAdmin }) => currentAdmin.role !== Roles.Parceiro,
        isVisible: ({ currentAdmin }) => currentAdmin.role !== Roles.Parceiro,
      },
      new: {
        isAccessible: ({ currentAdmin }) => currentAdmin.role !== Roles.Parceiro,
        before: async (request) => {
          console.log('FILE: ', request.payload);

          console.log('FILE name: ', request.payload['arquivo.fileName']);

          if (request.payload['arquivo.fileName']) {
            const file = {
              fileName: request.payload['arquivo.fileName'],
              mimeType: request.payload['arquivo.mimeType'],
              fileBuffer: request.payload['arquivo.fileBuffer'],
            };

            try {
              const response = await fetch(`${process.env.DOMAIN}/files/edit`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(file),
              });

              const result = await response.json();

              request.payload.arquivo = result.url;
            } catch (error) {
              console.error(error);
              throw new Error('Erro');
            }
          }

          const partnerKeys = Object.keys(request.payload).filter((key) => key.startsWith('parceiros.'));
          const formatedUserIds = partnerKeys.map((key) => Number(request.payload[key]));

          const partnerKeysFromDB = await Parceiros.find({ where: { id: In(formatedUserIds) } });

          request.payload = {
            nome: request.payload.nome,
            telefone: request.payload.telefone,
            endereco: request.payload.endereco,
            arquivo: request.payload.arquivo,
            tipoDeContato: request.payload.tipoDeContato,
            fonte: request.payload.fonte,
            tipoDeAcao: request.payload.tipoDeAcao,
            cpf: request.payload.cpf,
            comentario: request.payload.comentario,
            parceiros: partnerKeysFromDB,
          };
          return request;
        },
      },
    },
  },
};

export default OportunidadeResource;
