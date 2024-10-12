// pages/api/events/route.ts

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
export async function GET(req: Request) {
  try {
    const { filter } = await req.json().catch(() => ({})); // Safely handle potential errors in JSON parsing

    const queryConditions: any = {};

    if (filter) {
      const { date, branches } = filter;

      if (date) {
        queryConditions.date = date; // Adjust based on your database schema
      }
      if (branches) {
        queryConditions.branches = { in: branches }; // Use your actual field name
      }
    }

    const events = await prisma.event.findMany({
      where: queryConditions,
    });

    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error("Error getting jobs", error);
    return NextResponse.json({ error: "Failed to get jobs" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { date, company, SPOC, Process, Timings, Mode, Branches, Cutoff, Profile } = await req.json();

    const event = await prisma.event.create({
      data: {
        date: new Date(date), // Ensure the date is in Date format
        company,
        SPOC,
        Process,
        Timings,
        Mode,
        Branches,
        Cutoff,
        Profile,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}
export async function DELETE(req: Request) {
  try {
    const {id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // Delete the event using Prisma
    const deletedEvent = await prisma.event.delete({
      where: { id: id }, // Assuming 'id' is the primary key in your database
    });

    return NextResponse.json({ message: "Deleted successfully", deletedEvent }, { status: 200 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}
