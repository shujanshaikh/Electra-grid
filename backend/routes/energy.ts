import { Router } from "express";
import prisma from "../db";
import { energySchema } from "../types/types";
import express from "express";

export const energyRouter = Router();
energyRouter.use(express.json())



energyRouter.get("/energy", async (req, res) => {
    try {
        const energy = await prisma.energyUsage.findMany({
            include : {
                user : true,
                station : true
            }
        });
        res.json({
            energy
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

energyRouter.post("/energy", async (req, res) => {  
    console.log("user reached here from energy")
    const parsedData = energySchema.safeParse(req.body);
    if(!parsedData.success) {
        res.status(400).json({
            message : "Invalid data"
        })
        console.log(parsedData.error.errors);
        return
    }
  
    console.log("user reached here")
    try {
        const energy = await prisma.energyUsage.create({
            data : {
                userId : parsedData.data.userId,
                stationId : parsedData.data.stationId,
                energyUsed : parsedData.data.energyUsed,
            } , 
            include : {
                user : true,
            }
        })
        res.json({
            energy
        })
    } catch (error) {
        res.status(500).json({
            message : "Internal server error"
        })
    }
})


energyRouter.get("/energy/:id", async (req, res) => {
    try {
        const energy = await prisma.energyUsage.findUnique({
            where : {
                id : parseInt(req.params.id)
            }
        })
        res.json({
            energy
        })
    } catch (error) {
        res.status(500).json({
            message : "Internal server error"
        })
    }
})