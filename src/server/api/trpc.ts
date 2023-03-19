/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 */
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";

import { prisma } from "~/server/db";

import jwt from "jsonwebtoken";

type CreateContextOptions = Record<string, never>;

/**
 * This helper generates the "internals" for a tRPC context. If you need to use it, you can export
 * it from here.
 *
 * Examples of things you may need it for:
 * - testing, so we don't have to mock Next.js' req/res
 * - tRPC's `createSSGHelpers`, where we don't have req/res
 *
 * @see https://create.t3.gg/en/usage/trpc#-servertrpccontextts
 */
const createInnerTRPCContext = (_opts: CreateContextOptions) => {
  return {
    prisma,
  };
};

/**
 * This is the actual context you will use in your router. It will be used to process every request
 * that goes through your tRPC endpoint.
 *
 * @see https://trpc.io/docs/context
 */
export const createTRPCContext = (_opts: CreateNextContextOptions) => {
  const { req, res } = _opts;

  // TODO: move this
  function getTokenDataFromHeader() {
    if (!req.headers.authorization) return null;

    const token = req.headers.authorization.split(" ")[1];

    if (!token || token === undefined) {
      return null;
    }

    const payload = jwt.decode(token);
    // verified later in private procedure

    if (!payload || typeof payload === "string") return null;

    return payload;
  }

  function parseCookies() {
    const cookieHeader = req.headers.cookie;
    if (!cookieHeader) {
      return {};
    }

    const cookies: { [key: string]: string } = {};

    const splittedCookieHeader = cookieHeader.split(";");

    splittedCookieHeader.forEach((cookie) => {
      const [name, value] = cookie.split("=");

      if (name && value) {
        cookies[name.trim()] = decodeURIComponent(value);
      }
    });

    return cookies;
  }

  const cookies = parseCookies();

  const tokenData = getTokenDataFromHeader();

  const contextInner = createInnerTRPCContext({});
  return {
    ...contextInner,
    tokenData,
    cookies,
    req,
    res,
  };
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer.
 */
import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */
const isAuthed = t.middleware(async ({ ctx, next }) => {
  if (!ctx.tokenData) throw new TRPCError({ code: "UNAUTHORIZED" });

  return next();
});

const isAdmin = t.middleware(async ({ ctx, next }) => {
  if (!ctx.tokenData) throw new TRPCError({ code: "UNAUTHORIZED" });

  if (ctx.tokenData.role !== "ADMIN")
    throw new TRPCError({ code: "FORBIDDEN" });

  return next();
});

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure;

// "privateProcedure" that requires a user to be logged in
export const privateProcedure = t.procedure.use(isAuthed);

// "adminProcedure" that requires a user to be logged in and have admin role
export const adminProcedure = t.procedure.use(isAdmin);
