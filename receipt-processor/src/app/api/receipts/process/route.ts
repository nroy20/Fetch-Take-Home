import { v4 as uuidv4 } from 'uuid';

const receipts = new Map();

export async function POST(req: Request) {
    try {
        const id = uuidv4();
        const receipt = await req.json();

        const points = calculatePoints(receipt);
        receipts.set(id, points);

        return new Response(JSON.stringify({ id }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Invalid receipt data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
        });
    }
}

function calculatePoints(receipt: {
    retailer: string;
    total: string;
    purchaseDate: string;
    purchaseTime: string;
    items: { shortDescription: string; price: string }[];
  }): number {
    return receipt.total.length
}