import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

type ApiHandlerContext = {
  params: Record<string, any>;
};

type HandlerFunction = (
  request: NextRequest,
  context: ApiHandlerContext
) => Promise<any>;

const routeHandler =
  (handler: HandlerFunction) =>
  async (request: NextRequest, context: ApiHandlerContext): Promise<any> => {
    try {
      const data = await handler(request, context);

      return NextResponse.json({
        data,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json(
          {
            error: "Bad Request",
            details: error.errors,
          },
          {
            status: 400,
          }
        );
      } else if (error instanceof Prisma.PrismaClientValidationError) {
        return NextResponse.json(
          { error: "Bad Request", details: error.message },
          { status: 400 }
        );
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return NextResponse.json(
          { error: "Internal Server Error", details: error.message },
          {
            status: 500,
          }
        );
      } else {
        console.error("Unexpected error:", error);
        return NextResponse.json(
          {
            error: "Internal Server Error",
            details: "An unexpected error occurred.",
          },
          {
            status: 500,
          }
        );
      }
    }
  };

export default routeHandler;
