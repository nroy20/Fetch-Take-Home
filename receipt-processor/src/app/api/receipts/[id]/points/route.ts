import { receipts } from "@/utils/receiptStore";


export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    if (receipts.has(id)) {
        const points = receipts.get(id);
        return new Response(JSON.stringify({ points }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    return new Response(JSON.stringify({ error: 'Receipt ID not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
    });
}
