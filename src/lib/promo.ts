import { createServerFn } from '@tanstack/react-start';

const PROMOS: Record<string, number> = { VELORE10: 10, LUXE20: 20, NOIR15: 15 };

export const validatePromo = createServerFn()
  .validator((code: string) => code.trim().toUpperCase())
  .handler(async ({ data: code }) => {
    // Artificial delay to prevent brute-forcing
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    if (PROMOS[code]) {
      return { success: true as const, pct: PROMOS[code], code };
    }
    return { success: false as const, error: 'رمز الخصم غير صحيح أو منتهي الصلاحية' };
  });
