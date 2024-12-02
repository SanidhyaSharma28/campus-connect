import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const {
      CollegeId,
      Name,
      Company,
      Phone,
      Email,
      LinkedIn,
      Branch,
      Experience,
      Focus,
      rounds,
    } = await req.json();

    const resource = await prisma.resource.create({
      data: {
        CollegeId,
        Name,
        Company,
        Phone,
        Email,
        LinkedIn,
        Branch,
        Experience,
        Focus,
        rounds: {
          create: rounds, // Use create for nested rounds
        },
      },
    });

    return NextResponse.json(resource, { status: 201 });
  } catch (error) {
    console.error("Error creating resource:", error);
    return NextResponse.json({ error: "Failed to create resource" }, { status: 500 });
  }
}
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const company = searchParams.get('company'); // Log this to see if it's correct

    

    if (company) {
      // Fetch all resources that match the company name
      const resources = await prisma.resource.findMany({
        where: { Company: company },
        include: { rounds: true }, // Ensure rounds are included in the fetch
      });

      if (resources.length === 0) {
        return NextResponse.json({ message: "No resources found for this company" }, { status: 404 });
      }

      return NextResponse.json(resources, { status: 200 });
    } else {
      // If no "company" query parameter, return grouped companies with count
      const companies = await prisma.resource.groupBy({
        by: ['Company'],
        _count: {
          Company: true,
        },
      });

      return NextResponse.json(companies, { status: 200 });
    }
  } catch (error) {
    console.error("Error in GET route:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}