import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query, country } = body;

    if (!query) {
      return NextResponse.json(
        { error: "Query required" },
        { status: 400 }
      );
    }

    console.log("MOCK MODE ACTIVE");

    const answer = getSmartMockAnswer(query, country);

    return NextResponse.json({ answer });

  } catch (error) {
    console.error("Mock API error:", error);

    return NextResponse.json({
      answer: "Something went wrong in mock mode.",
    });
  }
}

function getSmartMockAnswer(query: string, country: string | null): string {
  const q = query.toLowerCase();

  // 🔹 Handle vague input
  if (q.trim() === "hi" || q.trim() === "hello") {
    return `Tell me what you're planning:

→ Study abroad
→ Work abroad
→ Travel

Or ask something like:
"Can I work part-time in Germany?"`;
  }

  // 🔹 Work + Student
  if (q.includes("work") && q.includes("student")) {
    return `Question: Can you work while studying?

Consequence: Exceeding allowed work hours is a visa violation. This can lead to visa cancellation, deportation, and future bans.

Reality: Germany allows 120 full days/year. UK allows 20 hrs/week. Australia allows 48 hrs/fortnight. Students exceeding limits have been deported mid-course.

What you should do: Track your hours strictly and avoid cash jobs.`;
  }

  // 🔹 Cost / Living
  if (q.includes("cost") || q.includes("living")) {
    return `Question: What is the real cost of living?

Consequence: Underestimating costs leads to running out of money and relying on illegal work.

Reality: Canada (Toronto): ₹1.2L–₹1.8L/month. Rent alone can cross ₹1L. Most students underestimate by 40%.

What you should do: Always keep a 30–40% buffer and don’t trust outdated internet estimates.`;
  }

  // 🔹 PR
  if (q.includes("pr") || q.includes("permanent")) {
    return `Question: Is PR easy?

Consequence: Assuming PR is guaranteed can leave you stuck on temporary visas for years.

Reality: Canada PR is points-based and competitive. Australia PR has strict occupation lists. Many applicants wait 2–5 years.

What you should do: Plan PR as a possibility, not a guarantee. Always have a backup plan.`;
  }

  // 🔹 Housing
  if (q.includes("rent") || q.includes("accommodation") || q.includes("housing")) {
    return `Question: How hard is finding accommodation?

Consequence: Not understanding contracts can lead to scams or losing deposits.

Reality: Cities like Toronto, London, Berlin have severe housing shortages. Deposits can be 2–3 months’ rent.

What you should do: Always verify listings, avoid cash deals, and read contracts carefully.`;
  }

  // 🔹 Visa / Rules
  if (q.includes("visa") || q.includes("illegal") || q.includes("overstay")) {
    return `Question: What happens if you break visa rules?

Consequence: Visa violations can lead to deportation, bans (3–10 years), and rejection of future applications.

Reality: Even small violations like working extra hours are tracked via payslips and tax records.

What you should do: Always follow official rules strictly. Don’t rely on “everyone does it” advice.`;
  }

  // 🔹 Country-specific
  if (country) {
    return `Question: What is life like in ${country}?

Consequence: Not understanding local systems can affect your visa, job, and long-term stay.

Reality: Most Indians struggle with housing, part-time job balance, and legal rules initially.

What you should do: Ask specific questions about ${country} like cost, jobs, or visa rules for clearer guidance.`;
  }

  // 🔹 Default fallback
  return `I need a bit more clarity.

You can ask things like:

→ Can I work part-time in Germany?
→ What is real cost of living in Canada?
→ Is PR easy in Australia?
→ What mistakes do students make abroad?

Tell me your situation and I’ll guide you properly.`;
}