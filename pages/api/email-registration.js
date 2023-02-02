import path from "path";
import fs from "fs";

function buildPath() {
    return path.join(process.cwd(), "data", "data.json");
}

function extractData(filePath) {
    const jsonData = fs.readFileSync(filePath);
    const data = JSON.parse(jsonData);
    return data;
}

export default function handler(req, res) {
    const { method } = req;

    const filePath = buildPath();
    const { events_categories, allEvents } = extractData(filePath);

    if(!allEvents) {
        return res.status(404).json({
            status: 404,
            message: "Events data not found",
        });
    }

    if(method === "POST") {
        const { email, eventId} = req.body;

        const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if(!email | !email.includes(validRegex)) {
            res.status(404).json({ message: "Invalid email address"});
        }

        const newAllEvents = allEvents.map((ev) => {
            if(ev.id === eventId) {
                if(ev.emails_registered.includes(email)) {
                    res.status(404).json({message: "This email has already been registered"});
                    return ev
                }
                return {
                    ...ev,
                    emails_registered: [...ev.emails_registered, email],
                };
            }
            return ev;
        });

        fs.writeFileSync(filePath, JSON.stringify({ events_categories, allEvents: newAllEvents}));

        res.status(201).json({
            message: `You have been registered successfully with the email: ${email} for the event: ${eventId}`,
        });
    }
}