#!/usr/bin/env python3
"""
SaaS MVP Scope Builder — CLI
Swift Tech Co. — https://swifttechco.com
"""

from calculator import VERTICALS, FEATURES, TARGETS, TIMELINES, calculate


def interactive():
    print("\nSaaS MVP Scope Builder")
    print("Swift Tech Co. — https://swifttechco.com")
    print("=" * 48)

    print("\nIndustry vertical:")
    for i, v in enumerate(VERTICALS, 1):
        print(f"  {i}. {v}")
    idx = int(input(f"Select (1-{len(VERTICALS)}): ")) - 1
    vertical = VERTICALS[idx]

    print("\nTarget users:")
    for i, t in enumerate(TARGETS, 1):
        print(f"  {i}. {t}")
    idx = int(input(f"Select (1-{len(TARGETS)}): ")) - 1
    target = TARGETS[idx]

    print("\nTimeline pressure:")
    for i, t in enumerate(TIMELINES, 1):
        print(f"  {i}. {t}")
    idx = int(input(f"Select (1-{len(TIMELINES)}): ")) - 1
    timeline = TIMELINES[idx]

    feat_list = list(FEATURES.keys())
    print("\nCore features for MVP (comma-separated numbers, or leave blank):")
    for i, f in enumerate(feat_list, 1):
        print(f"  {i}. {f}")
    raw = input("Select features: ").strip()
    selected = []
    if raw:
        for n in raw.split(","):
            n = n.strip()
            if n.isdigit():
                selected.append(feat_list[int(n) - 1])

    result = calculate(vertical, target, timeline, selected)

    print("\n" + "=" * 48)
    print("Your MVP Scope")
    print(f"  Estimated cost:     ${result['low_k']}K to ${result['high_k']}K USD")
    print(f"  Timeline to ship:   {result['weeks']} weeks")
    print("\n  Include in MVP:")
    for f in result["essentials"]:
        print(f"    + {f}")
    if result["deferred"]:
        print("\n  Defer to v2 (save time & budget):")
        for f in result["deferred"]:
            print(f"    o {f}")
    print("\nGet a detailed quote: https://swifttechco.com/contact")


if __name__ == "__main__":
    interactive()
