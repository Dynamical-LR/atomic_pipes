import random


def devide_to_random_parts(parts_to_devide: int, total_count: int) -> list[int]:
    initial = [
        random.randint(0, total_count // parts_to_devide - 1)
        for _ in range(parts_to_devide)
    ]

    while sum(initial) < total_count:
        initial[random.randint(0, parts_to_devide - 1)] += 1

    return initial


initial = devide_to_random_parts(30, 1000)
print(initial, sum(initial))

print(
    [
        {"day": idx + 1, "defects": devide_to_random_parts(5, defects)}
        for idx, defects in enumerate(initial)
    ]
)
