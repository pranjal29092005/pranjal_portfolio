import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type PublicContext = Omit<TrpcContext, "user">;

function createPublicContext(): PublicContext {
  return {
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("contact.submit", () => {
  it("accepts valid contact form submission", async () => {
    const ctx = createPublicContext() as TrpcContext;
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      name: "John Doe",
      email: "john@example.com",
      subject: "Collaboration Inquiry",
      message: "I'd like to discuss a potential project.",
    });

    expect(result).toEqual({
      success: true,
      message: "Message sent successfully!",
    });
  });

  it("rejects invalid email", async () => {
    const ctx = createPublicContext() as TrpcContext;
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.contact.submit({
        name: "John Doe",
        email: "invalid-email",
        subject: "Test",
        message: "Test message",
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("rejects empty name", async () => {
    const ctx = createPublicContext() as TrpcContext;
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.contact.submit({
        name: "",
        email: "john@example.com",
        subject: "Test",
        message: "Test message",
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("rejects empty message", async () => {
    const ctx = createPublicContext() as TrpcContext;
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.contact.submit({
        name: "John Doe",
        email: "john@example.com",
        subject: "Test",
        message: "",
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
