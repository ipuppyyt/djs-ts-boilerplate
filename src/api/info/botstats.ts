import { Request, Response } from "express";
import { formatUptime } from "../../utils";
import { Client } from "discord.js";

export default (client: Client) => (req: Request, res: Response) => {
    const ping = client.ws.ping;
    const uptime = formatUptime(client.uptime as number);
    const cpuUsage = (process.cpuUsage().system / 1024 / 1024).toFixed(2);
    const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
    const numServers = client.guilds.cache.size;
    const numUsers = client.users.cache.size;
    const apiLatency = client.ws.ping;
    const discordJSVersion = require('discord.js').version;
    const nodeVersion = process.version;
    const version = require('../../package.json').version;

    res.status(200).json({
        ping,
        uptime,
        cpuUsage: parseFloat(cpuUsage),
        memoryUsage: parseFloat(memoryUsage),
        numServers,
        numUsers,
        apiLatency,
        discordJSVersion,
        nodeVersion,
        version
    });
};