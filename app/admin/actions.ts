"use server"

import prisma from "@/lib/prisma";
import { prompt_configuration } from "@prisma/client";


export async function setPromptConfiguration(promptConfig: prompt_configuration) {
    await prisma.prompt_configuration.deleteMany()
    return await prisma.prompt_configuration.create({ data: promptConfig })
}

export async function getPromptConfiguration() {
    return await prisma.prompt_configuration.findFirst()
}