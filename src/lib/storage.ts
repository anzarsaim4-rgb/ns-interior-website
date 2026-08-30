import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export interface StorageUploadResult {
  fileUrl: string;
  fileSize: number;
  mimeType: string;
}

/**
 * Modular Storage Adapter for Lead Photo Uploads.
 * - In local dev (STORAGE_PROVIDER !== 'cloudinary' and !== 'supabase'): Saves to local /public/uploads/
 * - In production: Uploads to Cloudinary or Supabase Storage bucket and returns persistent HTTPS URL.
 */
export async function saveUploadedPhoto(
  file: File,
  leadId: string
): Promise<StorageUploadResult | null> {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
  if (!allowedTypes.includes(file.type)) return null;
  if (file.size > 10 * 1024 * 1024) return null; // 10MB limit

  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = file.name.split('.').pop() || 'jpg';
  const provider = process.env.STORAGE_PROVIDER || 'local';

  // 1. Production Option A: Cloudinary Storage Adapter
  if (provider === 'cloudinary' && process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_UPLOAD_PRESET) {
    try {
      const formData = new FormData();
      formData.append('file', new Blob([buffer], { type: file.type }), file.name);
      formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET);
      formData.append('folder', 'ns-interior-leads');

      const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        return {
          fileUrl: data.secure_url,
          fileSize: file.size,
          mimeType: file.type,
        };
      }
    } catch (err) {
      console.error('Cloudinary upload error, falling back to local/signed upload', err);
    }
  }

  // 2. Production Option B: Supabase Storage Adapter
  if (provider === 'supabase' && process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
    try {
      const filename = `leads/${leadId}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}.${ext}`;
      const supabaseUrl = process.env.SUPABASE_URL;
      const res = await fetch(`${supabaseUrl}/storage/v1/object/ns-interior-uploads/${filename}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
          'apiKey': process.env.SUPABASE_ANON_KEY,
          'Content-Type': file.type,
        },
        body: buffer,
      });

      if (res.ok) {
        const publicUrl = `${supabaseUrl}/storage/v1/object/public/ns-interior-uploads/${filename}`;
        return {
          fileUrl: publicUrl,
          fileSize: file.size,
          mimeType: file.type,
        };
      }
    } catch (err) {
      console.error('Supabase storage upload error', err);
    }
  }

  // 3. Default Local Storage (For Development & Local Testing)
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  await mkdir(uploadDir, { recursive: true });

  const filename = `${leadId}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}.${ext}`;
  const filePath = path.join(uploadDir, filename);

  await writeFile(filePath, buffer);

  return {
    fileUrl: `/uploads/${filename}`,
    fileSize: file.size,
    mimeType: file.type,
  };
}
