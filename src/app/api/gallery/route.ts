import { NextResponse } from 'next/server';
import { mkdir, readdir, unlink, writeFile } from 'fs/promises';
import path from 'path';

const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'gallery');

function getGalleryUrls(files: string[]) {
  return files
    .filter((file) => /\.(png|jpe?g|webp|gif)$/i.test(file))
    .map((file) => `/uploads/gallery/${file}`)
    .sort((a, b) => b.localeCompare(a));
}

export async function GET() {
  try {
    await mkdir(uploadDir, { recursive: true });
    const files = await readdir(uploadDir, { withFileTypes: true });
    const imageNames = files
      .filter((file) => file.isFile())
      .map((file) => file.name);

    return NextResponse.json({ success: true, images: getGalleryUrls(imageNames) });
  } catch (error) {
    console.error('Gallery fetch error:', error);
    return NextResponse.json({ success: true, images: [] });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('images') as File[];

    if (!files.length) {
      return NextResponse.json({ success: false, message: 'No files selected' }, { status: 400 });
    }

    await mkdir(uploadDir, { recursive: true });
    const savedFiles: string[] = [];

    for (const file of files) {
      if (!(file instanceof File) || file.size === 0 || !file.type.startsWith('image/')) {
        continue;
      }

      const originalName = file.name || `gallery-${Date.now()}.jpg`;
      const extension = originalName.includes('.') ? `.${originalName.split('.').pop()}` : '.jpg';
      const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${extension}`;
      const filePath = path.join(uploadDir, safeName);
      const buffer = Buffer.from(await file.arrayBuffer());

      await writeFile(filePath, buffer);
      savedFiles.push(safeName);
    }

    if (!savedFiles.length) {
      return NextResponse.json({ success: false, message: 'No valid image files were uploaded' }, { status: 400 });
    }

    const allFiles = await readdir(uploadDir, { withFileTypes: true });
    const allImageNames = allFiles
      .filter((file) => file.isFile())
      .map((file) => file.name);

    return NextResponse.json({ success: true, images: getGalleryUrls(allImageNames) });
  } catch (error) {
    console.error('Gallery upload error:', error);
    return NextResponse.json({ success: false, message: 'Unable to upload files' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const imageName = searchParams.get('name');

    if (!imageName) {
      return NextResponse.json({ success: false, message: 'No image selected for deletion' }, { status: 400 });
    }

    if (!/\.(png|jpe?g|webp|gif)$/i.test(imageName)) {
      return NextResponse.json({ success: false, message: 'Invalid image name' }, { status: 400 });
    }

    const filePath = path.join(uploadDir, imageName);
    await unlink(filePath);

    const files = await readdir(uploadDir, { withFileTypes: true });
    const imageNames = files
      .filter((file) => file.isFile())
      .map((file) => file.name);

    return NextResponse.json({ success: true, images: getGalleryUrls(imageNames) });
  } catch (error) {
    console.error('Gallery delete error:', error);
    return NextResponse.json({ success: false, message: 'Unable to delete image' }, { status: 500 });
  }
}
