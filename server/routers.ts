import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { createContactSubmission } from "./db";
import { notifyOwner } from "./_core/notification";
import { z } from "zod";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  contact: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Name is required").max(255),
          email: z.string().email("Invalid email"),
          subject: z.string().min(1, "Subject is required").max(255),
          message: z.string().min(1, "Message is required"),
        })
      )
      .mutation(async ({ input }) => {
        try {
          // Save to database
          await createContactSubmission({
            name: input.name,
            email: input.email,
            subject: input.subject,
            message: input.message,
          });

          // Send email notification to owner
          await notifyOwner({
            title: `New Portfolio Contact: ${input.subject}`,
            content: `From: ${input.name} (${input.email})\n\nMessage:\n${input.message}`,
          });

          return { success: true, message: "Message sent successfully!" };
        } catch (error) {
          console.error("Failed to process contact submission:", error);
          throw new Error("Failed to send message. Please try again.");
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
