import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { verifyAdminSession } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

// Validation Schema for Lead Submission
const leadSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  mobileNumber: z.string().min(10, 'Valid 10-digit mobile number required'),
  whatsappNumber: z.string().optional(),
  location: z.string().min(2, 'Location is required'),
  propertyType: z.string().min(2, 'Property type is required'),
  propertySize: z.string().optional(),
  approxAreaSqFt: z.coerce.number().optional(),
  requiredServices: z.array(z.string()).min(1, 'Select at least one service'),
  budgetRange: z.string().optional(),
  expectedStartDate: z.string().optional(),
  description: z.string().optional(),
});

function generateLeadCode(): string {
  const year = new Date().getFullYear().toString().slice(-2);
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `NS-${year}-${randomNum}`;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Extract text fields
    const rawData = {
      fullName: formData.get('fullName'),
      mobileNumber: formData.get('mobileNumber'),
      whatsappNumber: formData.get('whatsappNumber') || undefined,
      location: formData.get('location'),
      propertyType: formData.get('propertyType'),
      propertySize: formData.get('propertySize') || undefined,
      approxAreaSqFt: formData.get('approxAreaSqFt') || undefined,
      requiredServices: JSON.parse((formData.get('requiredServices') as string) || '[]'),
      budgetRange: formData.get('budgetRange') || undefined,
      expectedStartDate: formData.get('expectedStartDate') || undefined,
      description: formData.get('description') || undefined,
    };

    const validated = leadSchema.parse(rawData);
    const leadCode = generateLeadCode();

    // Create lead record
    const lead = await prisma.lead.create({
      data: {
        leadCode,
        fullName: validated.fullName,
        mobileNumber: validated.mobileNumber,
        whatsappNumber: validated.whatsappNumber || validated.mobileNumber,
        location: validated.location,
        propertyType: validated.propertyType,
        propertySize: validated.propertySize,
        approxAreaSqFt: validated.approxAreaSqFt,
        requiredServices: JSON.stringify(validated.requiredServices),
        budgetRange: validated.budgetRange,
        expectedStartDate: validated.expectedStartDate,
        description: validated.description,
        status: 'NEW',
      },
    });

    // Handle File Uploads (Site photos / plans) using Modular Storage Adapter
    const files = formData.getAll('photos') as File[];
    if (files && files.length > 0) {
      const { saveUploadedPhoto } = await import('@/lib/storage');

      for (const file of files) {
        if (file instanceof File && file.size > 0) {
          const result = await saveUploadedPhoto(file, lead.id);
          if (result) {
            await prisma.leadPhoto.create({
              data: {
                leadId: lead.id,
                fileUrl: result.fileUrl,
                fileSize: result.fileSize,
                mimeType: result.mimeType,
              },
            });
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      leadCode: lead.leadCode,
      leadId: lead.id,
      message: 'Enquiry submitted successfully',
    });
  } catch (error: any) {
    console.error('Error submitting lead:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const leads = await prisma.lead.findMany({
      include: {
        photos: true,
        notes: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, leads });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
