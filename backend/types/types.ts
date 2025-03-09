import { z} from "zod";

export const signUpSchema = z.object({
    name: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(8).max(255),
})

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(255),
})

export const logoutSchema = z.object({
    email: z.string().email(),
})

export const energySchema = z.object({
    stationId: z.number(),
    energyUsed: z.number(),
    userId: z.number()
})

export const EVChargingStationSchema = z.object({
    name: z.string().min(3).max(255),
    location: z.string().min(3).max(255),
    latitude: z.number(),
    longitude: z.number(),
    powerCapacity: z.number(),
    availability: z.boolean(),
    energyUsage: z.number(),
})