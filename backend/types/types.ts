import { z} from "zod";

export const signUpSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string()
})

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export const logoutSchema = z.object({
    email: z.string()
})

export const energySchema = z.object({
    stationId: z.number(),
    energyUsed: z.number(),
    userId: z.number()
})

export const EVChargingStationSchema = z.object({
    name: z.string(),
    location: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    powerCapacity: z.number(),
    availability: z.boolean(),
    imageUrl: z.string()
})