import { NextRequest, NextResponse } from 'next/server';

const PAKASIR_BASE_URL = 'https://app.pakasir.com';
const PAKASIR_SLUG = 'lanlan-store';
const PAKASIR_API_KEY = 'XEtPPaWnwfkRqM3HgomqgCZqORekNpZD';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { package_type, duration, price, customer_name, customer_email, notes } = body;

    // Create payment in Pakasir
    const response = await fetch(`${PAKASIR_BASE_URL}/api/v1/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PAKASIR_API_KEY}`,
      },
      body: JSON.stringify({
        slug: PAKASIR_SLUG,
        amount: price,
        customer_name: customer_name || 'Customer',
        customer_email: customer_email || 'customer@lanlan.store',
        description: `LANLAN STORE - Paket ${package_type} - ${duration}`,
        notes: notes || '',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to create payment', details: data },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      payment_url: data.payment_url || data.checkout_url || `${PAKASIR_BASE_URL}/${PAKASIR_SLUG}`,
      transaction_id: data.id || data.transaction_id,
    });
  } catch (error) {
    console.error('Payment error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
