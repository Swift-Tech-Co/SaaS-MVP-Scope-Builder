"""
SaaS MVP Scope Builder
Swift Tech Co. — https://swifttechco.com

Builds an MVP scope with recommended features, timeline, and cost range for SaaS products.
"""

VERTICALS = [
    "B2B SaaS", "HR & Payroll", "Healthcare", "E-Commerce",
    "EdTech", "FinTech", "Logistics", "CRM / Sales", "Analytics / BI", "Other",
]

FEATURES = {
    "User authentication & roles":    1.5,
    "Billing & subscriptions":        2.5,
    "Dashboard & analytics":          2.0,
    "REST API / webhooks":            2.0,
    "File uploads & storage":         1.0,
    "Notifications (email/SMS/push)": 1.5,
    "Admin panel":                    2.0,
    "Multi-tenant architecture":      3.0,
    "Third-party integrations":       2.5,
    "AI / ML features":               4.0,
}

TARGETS = [
    "B2B (business customers)",
    "B2C (consumers)",
    "Internal tool (team use only)",
]
TARGET_CPW = {
    "B2B (business customers)":    2800,
    "B2C (consumers)":             2200,
    "Internal tool (team use only)": 1600,
}

TIMELINES = [
    "ASAP: < 3 months",
    "Standard: 3 to 6 months",
    "Flexible: 6+ months",
]


def calculate(vertical: str, target: str, timeline: str, selected_features: list) -> dict:
    """
    Returns MVP scope: cost range, timeline, recommended and deferred features.

    Args:
        vertical: One of VERTICALS.
        target: One of TARGETS.
        timeline: One of TIMELINES.
        selected_features: List of feature strings from FEATURES.

    Returns:
        dict with keys: weeks, low_k, high_k, essentials, deferred
    """
    if vertical not in VERTICALS:
        raise ValueError(f"Unknown vertical: {vertical}")
    if target not in TARGETS:
        raise ValueError(f"Unknown target: {target}")
    if timeline not in TIMELINES:
        raise ValueError(f"Unknown timeline: {timeline}")

    speed_mult = 0.7 if "< 3" in timeline else 1.0
    total_weight = sum(FEATURES.get(f, 1.5) for f in selected_features)
    weeks = round(4 + total_weight * speed_mult)

    cpw = TARGET_CPW[target]
    low_k  = round(weeks * cpw * 0.85 / 1000)
    high_k = round(weeks * cpw * 1.25 / 1000)

    essentials = selected_features if selected_features else ["User authentication & roles", "Dashboard & analytics"]
    deferred   = [f for f in FEATURES if f not in selected_features][:3]

    return {
        "weeks":      weeks,
        "low_k":      low_k,
        "high_k":     high_k,
        "essentials": essentials,
        "deferred":   deferred,
    }
