import { setupWorker } from "msw";
import handlers from "@/lib/mocks/handlers";

export const worker = setupWorker(...handlers);
