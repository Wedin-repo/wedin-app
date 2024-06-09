import { fail } from 'assert';
import { Zeyada } from 'next/font/google';
import { type ZodType, z } from 'zod';

export const GiftFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'El nombre del regalo no puede estar vacío' })
    .max(60, { message: 'El nombre del regalo es demasiado largo' }),
  categoryId: z.string().min(1, { message: 'Debes seleccionar una categoría' }),
  price: z
    .string()
    .min(4, { message: 'Precio tiene que ser mayor a 999 guaranies' })
    .max(10, {
      message: 'El precio no puede ser mayor de PYG 99,999,999',
    }),
  isDefault: z.boolean().default(false),
  sourceGiftId: z.string(),
  isEditedVersion: z.boolean().default(false),
  eventId: z.string().min(1, { message: 'No se encontro un event ID' }),

  image: z.any().optional() as ZodType<File>,
  imageUrl: z.string(),

  wishlistId: z.string().min(1, { message: 'No se encontro un wishlist ID' }), // wishlistGiftPostSchema
  isFavoriteGift: z.boolean().default(false), // wishlistGiftPostSchema
  isGroupGift: z.boolean().default(false), // wishlistGiftPostSchema
});

// We want to ignore the imageUrl field when creating/editing a gift
export const GiftPostSchema = GiftFormSchema.omit({ image: true });

export const GiftEditSchema = GiftPostSchema.pick({
  name: true,
  categoryId: true,
  price: true,
});

export const GiftCreateSchema = GiftPostSchema.pick({
  name: true,
  categoryId: true,
  price: true,
  isDefault: true,
  isEditedVersion: true,
  eventId: true,
  imageUrl: true,
});

export const WishlistGiftCreateSchema = z.object({
  wishlistId: z.string().min(1, { message: 'No se encontro un wishlist ID' }),
  eventId: z.string().min(1, { message: 'No se encontro un event ID' }),
  giftId: z.string().min(1, { message: 'No se encontro un gift ID' }),
  isFavoriteGift: z.boolean().default(false),
  isGroupGift: z.boolean().default(false),
});

export const WishlistGiftsCreateSchema = z.object({
  wishlistId: z.string().min(1, { message: 'No se encontro un wishlist ID' }),
  giftIds: z.array(z.string().min(1, { message: 'No se encontro un gift ID' })),
  eventId: z.string().min(1, { message: 'No se encontro un event ID' }),
});

export const WishlistGiftEditSchema = z.object({
  wishlistGiftId: z.string().min(1, { message: 'No se encontro un ID' }),
  wishlistId: z.string().min(1, { message: 'No se encontro un wishlist ID' }),
  giftId: z.string().min(1, { message: 'No se encontro un gift ID' }),
  isFavoriteGift: z.boolean().default(false),
  isGroupGift: z.boolean().default(false),
});

export const WishlistGiftDeleteSchema = z.object({
  wishlistId: z.string().min(1, { message: 'No se encontro un wishlist ID' }),
  giftId: z.string().min(1, { message: 'No se encontro un gift ID' }),
});

export const TransactionCreateSchema = z.object({
  amount: z
    .string()
    .min(4, { message: 'El precio debe ser mayor a 999 guaraníes' })
    .max(10, {
      message: 'El precio no puede ser mayor de PYG 99,999,999',
    }),
});

// Define the TransactionStatus enum to match your Prisma schema
const TransactionStatus = z.enum([
  'OPEN',
  'PENDING',
  'COMPLETED',
  'FAILED',
  'REFUNDED',
]);

export const TransactionEditSchema = z.object({
  status: TransactionStatus,
  notes: z.string().optional(),
});

export const TransactionStatusLogUpdateSchema = z.object({
  transaction: z.object({
    id: z.string().min(1, { message: 'No se encontró un ID de transacción' }),
    status: TransactionStatus, // This is the previous status
  }),
  status: TransactionStatus, // This is the new status
  changedById: z
    .string()
    .min(1, { message: 'No se encontró un ID de usuario' }),
  changedAt: z.string().transform(str => new Date(str)), // Ensure changedAt is a valid Date
});

export const EventDetailsFormSchema = z.object({
  eventId: z.string(),
  eventType: z
    .string()
    .min(1, { message: 'Debes seleccionar un tipo de evento' }),
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
  partnerEmail: z.string(),
  eventCity: z.string().optional(),
  eventCountry: z.string().optional(),
  eventGuests: z.string().optional(),
});

export const EventUrlFormSchema = z.object({
  eventId: z.string(),
  eventUrl: z
    .string()
    .min(1, { message: 'La dirección de tu evento no puede estar vacío' })
    .min(3, {
      message: 'La dirección de tu evento debe contener al menos 3 caracteres',
    })
    .max(255, {
      message:
        'La dirección de tu evento debe contener un máximo de 255 caracteres',
    })
    .refine(value => /^[a-zA-Z0-9-]*$/.test(value), {
      message:
        'La dirección de tu evento no puede contener caracteres especiales (.*%$#&...)',
    }),
});

export const EventCoverImageFormSchema = z.object({
  eventId: z.string(),
  eventCoverImage: z.any().nullable() as ZodType<File>,
  eventCoverImageUrl: z.string(),
});

export const EventCoverMessageFormSchema = z.object({
  eventId: z.string(),
  eventCoverMessage: z
    .string()
    .min(1, { message: 'El mensaje para tus invitados no puede esta vacío' })
    .min(3, {
      message:
        'El mensaje para tus invitados debe contener al menos 3 caracteres',
    })
    .max(255, {
      message:
        'El mensaje para tus invitados debe contener un máximo de 255 caracteres',
    }),
});

export const EventDateFormSchema = z.object({
  eventId: z.string(),
  eventDate: z.date().nullable(),
});

export const BankDetailsFormSchema = z.object({
  eventId: z.string(),
  bankName: z.string().min(1, { message: 'Debe seleccionar una entidad' }),
  accountHolder: z
    .string()
    .min(1, { message: 'Nombre y apellido no puede estar vacío' })
    .min(2, { message: 'Nombre y Apellido muy corto' })
    .max(255, { message: 'Nombre y Apellido muy largo' }),
  accountNumber: z
    .string()
    .min(1, { message: 'Número de cuenta no puede estar vacío' })
    .max(24, { message: 'Número de cuenta muy largo' }),
  accountType: z.string().min(1, { message: 'Debe seleccionar una moneda' }),
  identificationType: z
    .string()
    .min(1, { message: 'Debe seleccionar un documento' }),
  identificationNumber: z
    .string()
    .min(1, { message: 'Número de documento no puede estar vacío' })
    .max(12, { message: 'Número de documento muy largo' }),
  razonSocial: z.string().optional(),
  ruc: z.string().optional(),
});

export const GiftAmountsFormSchema = z.object({
  eventId: z.string(),
  giftAmount1: z.string(),
  giftAmount2: z.string(),
  giftAmount3: z.string(),
});
