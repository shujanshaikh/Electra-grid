import { Router } from "express";
import prisma from "../db";
import { EVChargingStationSchema } from "../types/types";

export const evStation = Router();



evStation.get("/stations", async (req, res) => {
    try {
        const evStation = await prisma.eVChargingStation.findMany({
            where : {
                availability : true
            }            
        });
        res.json({
            evStation
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

evStation.post("/stations", async (req, res) => {
    const parsedData = EVChargingStationSchema.safeParse(req.body);
    if(!parsedData.success) {
        res.status(400).json({
            message : "Invalid data"
        })
        return
    }
    try {
        const evStation = await prisma.eVChargingStation.create({
            data : {
                name : parsedData.data.name!,
                location : parsedData.data.location!,
                latitude : parsedData.data.latitude!,
                longitude : parsedData.data.longitude!,
                powerCapacity : parsedData.data.powerCapacity!,
                availability : parsedData.data.availability!
            }
        })
        res.json({
            evStation
        })
    } catch (error) {
        res.status(500).json({
            message : "Internal server error"
        })
    }
})

evStation.get("/stations/:id", async (req, res) => {
    try {
        const evStation = await prisma.eVChargingStation.findUnique({
            where : {
                id : parseInt(req.params.id)
            }
        })
        res.json({
            evStation : evStation?.id
        })
    } catch (error) {
        res.status(500).json({
            message : "Internal server error"
        })
    }
})

evStation.put("/stations/:id", async (req, res) => {
    const parsedData = EVChargingStationSchema.safeParse(req.body);
    if(!parsedData.success) {
        res.status(400).json({
            message : "Invalid data"
        })
        return
    }
    try {
        const evStation = await prisma.eVChargingStation.update({
            where : {
                id : parseInt(req.params.id)
            },
            data : {
                name : parsedData.data.name!,
                location : parsedData.data.location!,
                latitude : parsedData.data.latitude!,
                longitude : parsedData.data.longitude!,
                powerCapacity : parsedData.data.powerCapacity!,
                availability : parsedData.data.availability!
            }
        })
        res.json({
            evStation : evStation.id
        })
    } catch (error) {
        res.status(500).json({
            message : "Internal server error"
        })
    }
})

evStation.delete("/stations/:id", async (req, res) => {
    try {
        const evStation = await prisma.eVChargingStation.delete({
            where : {
                id : parseInt(req.params.id)
            }
        })
        res.json({
            evStation : evStation.id
        })
    } catch (error) {
        res.status(500).json({
            message : "Internal server error"
        })
    }
})
