// pages/api/events/route.ts

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
export async function GET(req: Request) {
  try {
    // Get the URL and extract the search parameters
    const url = new URL(req.url);
    const date = url.searchParams.get("date");

    // Fetch all events
    let events = await prisma.event.findMany();

    // Filter events by date if a date is provided
    if (date) {
      const targetDate = new Date(date);
      events = events.filter((event) => {
        const eventDate = new Date(event.date);
        return (
          eventDate.toISOString().split("T")[0] === targetDate.toISOString().split("T")[0]
        );
      });
    }

    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error("Error getting events", error);
    return NextResponse.json({ error: "Failed to get events" }, { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    const { date, company, SPOC, Process, Timings, Mode, Branches, Cutoff, Profile,For } = await req.json();

    const event = await prisma.event.create({
      data: {
        date: new Date(date), // Ensure the date is in Date format
        company,
        SPOC,
        For,
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
