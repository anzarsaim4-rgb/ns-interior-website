import { del, list, put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';

const GALLERY_PREFIX = 'gallery/';

function getGalleryUrls(
  blobs: Array<{ url: string; pathname: string }>
) {
  return blobs
    .filter((blob) => /\.(png|jpe?g|webp|gif)$/i.test(blob.pathname))
    .sort((a, b) => b.pathname.localeCompare(a.pathname))
    .map((blob) => blob.url);
}

async function getGalleryImages() {
  const result = await list({
    prefix: GALLERY_PREFIX,
    limit: 1000,
  });

  return getGalleryUrls(result.blobs);
}

/**
 * Public:
 * Anyone can view gallery images.
 */
export async function GET() {
  try {
    const images = await getGalleryImages();

    return NextResponse.json({
      success: true,
      images,
    });
  } catch (error) {
    console.error('Gallery fetch error:', error);

    return NextResponse.json(
      {
        success: false,
        images: [],
        message: 'Unable to load gallery',
      },
      { status: 500 }
    );
  }
}

/**
 * Admin only:
 * Upload gallery images.
 */
export async function POST(request: Request) {
  try {
    const admin = await verifyAdminSession();

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: 'Unauthorized. Admin login required.',
        },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const files = formData.getAll('images');

    if (!files.length) {
      return NextResponse.json(
        {
          success: false,
          message: 'No files selected',
        },
        { status: 400 }
      );
    }

    const uploadedUrls: string[] = [];

    for (const item of files) {
      if (!(item instanceof File)) continue;
      if (item.size === 0) continue;
      if (!item.type.startsWith('image/')) continue;

      const originalName =
        item.name || `gallery-${Date.now()}.jpg`;

      const extension = originalName.includes('.')
        ? `.${originalName.split('.').pop()}`
        : '.jpg';

      const safeBaseName = originalName
        .replace(/\.[^/.]+$/, '')
        .replace(/[^a-zA-Z0-9-_]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 80);

      const pathname =
        `${GALLERY_PREFIX}` +
        `${safeBaseName || 'project'}-` +
        `${Date.now()}-` +
        `${Math.random().toString(36).slice(2, 8)}` +
        `${extension}`;

      const blob = await put(pathname, item, {
        access: 'public',
        addRandomSuffix: false,
        contentType: item.type,
        cacheControlMaxAge: 31536000,
      });

      uploadedUrls.push(blob.url);
    }

    if (!uploadedUrls.length) {
      return NextResponse.json(
        {
          success: false,
          message: 'No valid image files were uploaded',
        },
        { status: 400 }
      );
    }

    const images = await getGalleryImages();

    return NextResponse.json({
      success: true,
      images,
    });
  } catch (error) {
    console.error('Gallery upload error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Unable to upload files',
      },
      { status: 500 }
    );
  }
}

/**
 * Admin only:
 * Delete gallery image.
 */
export async function DELETE(request: Request) {
  try {
    const admin = await verifyAdminSession();

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: 'Unauthorized. Admin login required.',
        },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('url');

    if (!imageUrl) {
      return NextResponse.json(
        {
          success: false,
          message: 'No image selected for deletion',
        },
        { status: 400 }
      );
    }

    /*
     * Security:
     * Only allow deletion of an image that actually exists
     * inside our gallery/ Blob prefix.
     */
    const result = await list({
      prefix: GALLERY_PREFIX,
      limit: 1000,
    });

    const galleryBlob = result.blobs.find(
      (blob) => blob.url === imageUrl
    );

    if (!galleryBlob) {
      return NextResponse.json(
        {
          success: false,
          message: 'Image not found in gallery',
        },
        { status: 404 }
      );
    }

    await del(galleryBlob.url);

    const images = await getGalleryImages();

    return NextResponse.json({
      success: true,
      images,
    });
  } catch (error) {
    console.error('Gallery delete error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Unable to delete image',
      },
      { status: 500 }
    );
  }
}