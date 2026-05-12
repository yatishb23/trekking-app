import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const trek = await prisma.trek.findUnique({
        where: { id: Number(id) },
      });
      if (!trek) {
        return NextResponse.json({ error: "Trek not found" }, { status: 404 });
      }
      return NextResponse.json(trek, { status: 200 });
    }

    const treks = await prisma.trek.findMany();
    return NextResponse.json(treks, { status: 200 });
  } catch (error) {
    console.error("Fetch Treks Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newTrek = await prisma.trek.create({
      data: body,
    });
    return NextResponse.json(newTrek, { status: 201 });
  } catch (error) {
    console.error("Create Trek Error:", error);
    return NextResponse.json(
      { error: "Failed to create trek" },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Trek ID is required" },
        { status: 400 },
      );
    }

    const body = await req.json();
    const updatedTrek = await prisma.trek.update({
      where: { id: Number(id) },
      data: body,
    });
    return NextResponse.json(updatedTrek, { status: 200 });
  } catch (error) {
    console.error("Update Trek Error:", error);
    return NextResponse.json(
      { error: "Failed to update trek" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Trek ID is required" },
        { status: 400 },
      );
    }

    const body = await req.json();
    const updatedTrek = await prisma.trek.update({
      where: { id: Number(id) },
      data: body,
    });
    return NextResponse.json(updatedTrek, { status: 200 });
  } catch (error) {
    console.error("Patch Trek Error:", error);
    return NextResponse.json(
      { error: "Failed to update trek" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Trek ID is required" },
        { status: 400 },
      );
    }

    const deletedTrek = await prisma.trek.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(deletedTrek, { status: 200 });
  } catch (error) {
    console.error("Delete Trek Error:", error);
    return NextResponse.json(
      { error: "Failed to delete trek" },
      { status: 500 },
    );
  }
}
