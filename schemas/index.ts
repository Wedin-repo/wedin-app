import { boolean, z } from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Tu email no puede estar vacío' })
    .email('Email inválido'),
  password: z
    .string()
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    .max(255, { message: `Slow down cowboy, you're not Julian Assange` }),
});

export const MagicLoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Tu email no puede estar vacío' })
    .email('Email inválido'),
});

export const RegisterSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: 'Tu email no puede estar vacío' })
      .email('Email inválido'),
    password: z
      .string()
      .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
      .max(255, { message: "Slow down cowboy, you're not Julian Assange" }),
    passwordConfirmation: z.string().min(1).max(255),
    eventType: z.string().optional(),
  })
  .refine(data => data.password === data.passwordConfirmation, {
    message: 'Las contraseñas no coinciden',
    path: ['passwordConfirmation'], // This specifies which field the error message should be associated with
  });

export const PasswordResetSchema = LoginSchema.pick({ email: true });
export const NewPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
      .max(255, { message: "Slow down cowboy, you're not Julian Assange" }),
    passwordConfirmation: z.string().min(1).max(255),
  })
  .refine(data => data.password === data.passwordConfirmation, {
    message: 'Las contraseñas no coinciden',
    path: ['passwordConfirmation'], // This specifies which field the error message should be associated with
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

export const StepTwoSchema = z.object({
  weddingCountry: z.string().optional(),
  weddingCity: z.string().optional(),
  isDecidingWeddingCountryCity: boolean(),
  hasPYbankAccount: z.boolean(),
});
