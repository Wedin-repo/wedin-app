import * as z from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Tu email no puede estar vacío' })
    .email('Email inválido'),
  password: z
    .string()
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    .max(255, { message: `Slow down cowboy, you're not Julian Assange` }),
  eventType: z.string().optional(),
});

export const StepOneSchema = z.object({
  weddingUrl: z
    .string()
    .min(1, { message: 'La dirección de tu espacio no puede estar vacío' })
    .min(3, {
      message: 'La dirección de tu espacio debe contener al menos 3 caracteres',
    })
    .max(255, {
      message:
        'La dirección de tu espacio debe contener un máximo de 255 caracteres',
    }),
  name: z
    .string()
    .min(1, { message: 'El nombre no puede estar vacío' })
    .min(2, { message: 'Nombre muy corto' })
    .max(255, { message: 'Nombre muy largo' }),
  lastName: z
    .string()
    .min(1, { message: 'El apellido no puede estar vacío' })
    .min(2, { message: 'Apellido muy corto' })
    .max(255, { message: 'Apellido muy largo' }),
  partnerName: z
    .string()
    .min(1, { message: 'El nombre de tu pareja no puede estar vacío' })
    .min(2, { message: 'Nombre muy corto' })
    .max(255, { message: 'Nombre muy largo' }),
  partnerLastName: z
    .string()
    .min(1, { message: 'El apellido de tu pareja no puede estar vacío' })
    .min(2, { message: 'Apellido muy corto' })
    .max(255, { message: 'Apellido muy largo' }),
  partnerEmail: z
    .string()
    .min(1, { message: 'El email de tu pareja no puede estar vacío' })
    .email('Email inválido'),
  weddingDate: z.date().optional(),
  isDecidingWeddingDate: z.boolean(),
});
